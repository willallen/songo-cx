export default function SalesforceScreenpop() {
  return (
    <article className="prose-custom">
      <p className="lead">
        Agents were answering 800 calls a day with no context. The customer&apos;s order history,
        open cases, account status — all of it required the agent to ask the caller to wait while
        they looked it up in Salesforce. Average handle time was 7 minutes and 40 seconds.
        The operations director believed 90 seconds of that was pure lookup time. She was right.
        It was closer to 110 seconds.
      </p>

      <h2>The situation</h2>
      <p>
        A specialty retail company with a 150-agent service team handled customer inquiries across
        three queues: order support, product questions, and returns and exchanges. All three queues
        required agents to access Salesforce Service Cloud to handle the interaction effectively.
      </p>
      <p>
        The existing process: call arrives, agent answers, asks for name or order number, manually
        searches Salesforce, pulls up the relevant record, and begins actually addressing the
        customer&apos;s issue — 90 to 120 seconds into the call. For order support and returns
        (roughly 70% of volume), this lookup was unavoidable. The customer always had to identify
        themselves. The agent always had to look them up.
      </p>
      <p>
        The company had been on Genesys Cloud for 14 months and had never implemented any
        Salesforce integration. The IT team had evaluated Genesys&apos;s native Salesforce integration
        but found the documentation insufficient and the setup too opaque. They came to us with
        a clear goal: agents should see the customer&apos;s Salesforce record when they answer the call.
      </p>

      <h2>Deciding on the approach</h2>
      <p>
        There are two ways to get Salesforce data in front of a Genesys Cloud agent: the Genesys
        Cloud for Salesforce managed package (an embedded agent desktop inside Salesforce) and
        Genesys Cloud Data Actions (API calls from Architect flows that attach data to the
        conversation before it reaches an agent).
      </p>
      <p>
        The Salesforce managed package is the right choice when you want Salesforce to be the
        primary agent interface — the agent works in Salesforce, not the Genesys Cloud desktop.
        This client&apos;s agents were already trained on the Genesys Cloud desktop and their supervisor
        tooling (real-time dashboards, coaching, monitoring) was built around it. Switching
        interfaces was off the table.
      </p>
      <p>
        Data Actions was the right approach: use the Architect flow to query Salesforce before
        the call reaches an agent, attach the result to the conversation as attributes, and surface
        those attributes in the agent desktop as a screen pop. The agent sees the customer record
        as the call connects — no switching interfaces, no manual lookup for known callers.
      </p>

      <h2>The Data Actions build</h2>
      <p>
        Genesys Cloud Data Actions use the Genesys Cloud Data Actions integration to make HTTP
        requests to external APIs from within Architect flows. For Salesforce, this means OAuth
        2.0 authentication against the Salesforce REST API and a SOQL query against the relevant
        Salesforce objects.
      </p>
      <p>
        The lookup strategy depended on what we knew about the caller at the point of the data
        action call. We had the ANI (caller phone number) from the inbound call. The flow was:
      </p>
      <ol>
        <li>
          <strong>ANI lookup:</strong> Query Salesforce Contact records where{' '}
          <code>Phone = &apos;{'{ANI}'}&apos;</code> or <code>MobilePhone = &apos;{'{ANI}'}&apos;</code>. If a single
          match is found, we have the contact — attach the contact ID, account ID, account name,
          and open case count to the conversation and route to the agent.
        </li>
        <li>
          <strong>Multiple matches or no match:</strong> If the ANI returns multiple contacts
          (shared number, family account) or no contact at all, collect the caller&apos;s order number
          via IVR prompt, then run a second Data Action querying the Order object:{' '}
          <code>SELECT AccountId, Account.Name, Status FROM Order WHERE OrderNumber = &apos;{'{input}'}&apos;</code>.
        </li>
        <li>
          <strong>Still no match:</strong> Route to agent with a &ldquo;new contact&rdquo; flag that triggers
          a Salesforce screen pop to a new Contact creation form.
        </li>
      </ol>
      <p>
        The Data Action response was configured to extract five fields: Salesforce Contact URL,
        Contact Name, Account Name, Account Status, and Open Case Count. These were stored as
        conversation attributes using Set Participant Data actions in the flow.
      </p>

      <h2>The screen pop configuration</h2>
      <p>
        The Genesys Cloud agent desktop has a built-in screen pop capability that triggers when
        a call connects. We configured it to construct a Salesforce record URL from the Contact
        URL attribute and open it in a new browser tab when the agent answers.
      </p>
      <p>
        For the matching cases (roughly 82% of inbound volume based on a sample before deployment),
        this meant the agent&apos;s Salesforce tab opened to the exact contact record as the call
        connected — no searching, no typing, no waiting. The contact name, account, and open case
        count were also displayed in the agent desktop sidebar via the conversation attribute
        display configuration.
      </p>
      <p>
        For non-matching cases, the screen pop opened a new Salesforce contact creation form
        pre-populated with the ANI as the phone number.
      </p>

      <h2>The Salesforce Data Action authentication challenge</h2>
      <p>
        The most technically complex part of the build was the OAuth configuration. Genesys Cloud
        Data Actions authenticate against Salesforce using a Connected App with OAuth 2.0 JWT
        Bearer Flow (server-to-server, no user interaction). Setting this up required:
      </p>
      <ul>
        <li>
          Creating a Salesforce Connected App with appropriate scopes (api, refresh_token)
        </li>
        <li>
          Generating an RSA key pair and uploading the public certificate to the Connected App
        </li>
        <li>
          Configuring the Genesys Cloud Data Actions integration with the private key, consumer
          key, and the username of the Salesforce service account
        </li>
        <li>
          Setting appropriate Salesforce API query limits for the service account profile to
          handle peak call volume without hitting API governor limits
        </li>
      </ul>
      <p>
        The Salesforce API governor limits required specific attention. At peak volume (roughly
        400 calls per hour), the Data Actions were making up to 800 API calls per hour (two
        per call on average). Salesforce&apos;s limit for the org was 100,000 API calls per 24 hours —
        well within bounds, but worth monitoring. We configured a Salesforce API usage alert at
        50% of the limit.
      </p>

      <h2>Testing and rollout</h2>
      <p>
        We tested against a Salesforce sandbox environment connected to a Genesys Cloud test org
        for three weeks before touching production. Test cases covered: known ANI match,
        multi-match ANI, unknown ANI with valid order number, unknown ANI with invalid order
        number, API timeout behavior (Data Action configured with a 3-second timeout and a
        graceful fallback to &ldquo;no match&rdquo; routing), and high-volume simulation.
      </p>
      <p>
        Production rollout was done queue by queue over two weeks, starting with the smallest
        queue (product questions, 20 agents) to catch any issues before the higher-volume queues.
        No issues emerged in the product questions queue, and the remaining two queues were
        activated together in week two.
      </p>

      <h2>Results</h2>
      <p>
        Measured over 30 days post-full deployment against the 30-day pre-deployment baseline:
      </p>
      <ul>
        <li>
          <strong>Average Handle Time:</strong> 7:40 → 6:23. A reduction of 77 seconds. The
          operations director&apos;s estimate of 90 seconds was close; the actual improvement was
          slightly lower because some agents had developed habits (verifying account details aloud,
          walking through open cases) that took time even with the screen pop. Coaching addressed
          this.
        </li>
        <li>
          <strong>ANI match rate:</strong> 82% on the first lookup, rising to 94% when the order
          number fallback was included. 6% of calls reached an agent with no Salesforce match —
          consistent with new customers and callers using unrecognized numbers.
        </li>
        <li>
          <strong>Agent satisfaction:</strong> Informal survey showed 91% of agents rated the
          screen pop as &ldquo;very useful&rdquo; or &ldquo;extremely useful&rdquo;. The most common feedback: agents
          no longer felt they were making customers wait while they fumbled with a search bar.
        </li>
      </ul>
      <p>
        No custom middleware. No Salesforce managed package installation. No changes to the agent
        desktop interface agents were already trained on. The integration runs entirely in the
        Architect flow using native Genesys Cloud Data Actions.
      </p>
    </article>
  );
}
