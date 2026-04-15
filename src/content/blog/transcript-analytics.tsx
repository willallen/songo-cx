export default function TranscriptAnalytics() {
  return (
    <article className="prose-custom">
      <p className="lead">
        Genesys Cloud&apos;s Voice Transcription feature gives you raw text for every call. Most
        organizations stop there — transcripts sitting in a reporting tab, occasionally reviewed by a
        supervisor. That&apos;s leaving most of the value on the table.
      </p>
      <p>
        With a lightweight processing layer, those transcripts become structured data: sentiment
        curves, compliance phrase detection, automatic QA scorecards, escalation signals, product
        mention tracking. All of it without a human listening to a single call.
      </p>

      <h2>How transcripts get out of Genesys Cloud</h2>
      <p>
        Genesys Cloud fires a <code>v2.conversations.transcripts</code> notification event when a
        transcript is ready. Subscribe to this via the Notifications API (WebSocket) or — more
        practically for production — configure an AWS EventBridge or webhook integration to catch it
        and hand it to a processing function.
      </p>
      <p>The event payload includes the conversation ID. From there you make two API calls:</p>
      <ol>
        <li>
          <code>GET /api/v2/conversations/{'{conversationId}'}</code> — to pull metadata (queue,
          agent, direction, duration, handle time)
        </li>
        <li>
          <code>GET /api/v2/conversations/{'{conversationId}'}/transcripts</code> — to pull the
          transcript body, which is segmented by speaker (customer vs. agent) with timestamps
        </li>
      </ol>
      <p>
        The transcript comes back as a JSON array of utterances. Each utterance has a speaker
        designation, start/end time, confidence score, and the text. This structure is what makes
        extraction clean — you already know who said what.
      </p>

      <h2>Extracting structured data points</h2>
      <p>
        Once you have the utterances, you can go two routes: rule-based extraction for things you
        know exactly (compliance phrases, required disclosures, specific product names) and
        LLM-based extraction for everything that requires judgment.
      </p>

      <h3>Rule-based extraction</h3>
      <p>
        For compliance use cases, rules are more reliable and auditable than a language model.
        Build a phrase library and run each transcript through it:
      </p>
      <ul>
        <li>
          <strong>Required disclosures:</strong> Did the agent say &ldquo;this call may be recorded&rdquo;
          within the first 30 seconds? Did they confirm the account holder&apos;s identity with two
          verification factors?
        </li>
        <li>
          <strong>Prohibited language:</strong> Did the agent use any language on your banned list
          (guarantee, promise, definitely)?
        </li>
        <li>
          <strong>Product mentions:</strong> Track which products or services came up in the
          conversation and whether they were mentioned by the customer or proposed by the agent.
        </li>
      </ul>
      <p>
        Match against agent utterances only for agent requirements, customer utterances only for
        intent signals. The speaker segmentation in the Genesys transcript makes this trivial.
      </p>

      <h3>LLM-based extraction</h3>
      <p>
        For anything requiring judgment — sentiment, call reason classification, escalation risk,
        summary — pass the full transcript to a language model with a structured output schema.
        Using Claude or GPT-4o with JSON mode, a single prompt can return:
      </p>
      <ul>
        <li>Call reason (categorized, e.g. &ldquo;billing dispute&rdquo;, &ldquo;product defect&rdquo;, &ldquo;new purchase&rdquo;)</li>
        <li>Customer sentiment arc (positive/neutral/negative at start, middle, and end)</li>
        <li>Resolution status (resolved, unresolved, escalated, transferred)</li>
        <li>Agent empathy score (1–5, with reasoning)</li>
        <li>Key action items mentioned (what the agent promised to do)</li>
        <li>One-sentence call summary</li>
      </ul>
      <p>
        Prompt structure matters. Give the model the transcript formatted as{' '}
        <code>AGENT: [utterance]</code> / <code>CUSTOMER: [utterance]</code>, define your output
        schema explicitly, and include a few examples of edge cases in the system prompt. You&apos;ll
        get consistent JSON back that you can insert directly into your data store.
      </p>
      <p>
        Cost at scale: a typical 5-minute call transcript is roughly 800–1,200 tokens. At GPT-4o
        pricing, processing 1,000 calls per day costs around $3–5. Claude Haiku is cheaper still.
        This is not a budget concern for most contact centers.
      </p>

      <h2>QA automation</h2>
      <p>
        Manual QA typically samples 2–5% of calls. Automated QA can score 100% of them. The
        architecture is simple once extraction is running:
      </p>
      <ol>
        <li>
          Define your QA rubric as a scored checklist — required behaviors (did the agent verify
          identity?), prohibited behaviors (did the agent interrupt the customer?), soft skills
          (was the resolution clearly communicated?).
        </li>
        <li>
          Map each rubric item to either a rule-based check or an LLM judgment. Compliance items
          stay rule-based. Soft-skill items go to the LLM.
        </li>
        <li>
          Compute a composite score per call. Flag anything below your threshold for human review.
          Surface only the 2–3% of calls that actually need attention.
        </li>
      </ol>
      <p>
        The output is a QA record per conversation, stored alongside the conversation metadata in
        your data warehouse. You can now answer questions that were previously unanswerable: which
        agents have the highest empathy scores on escalated calls? Which call reason has the lowest
        first-call resolution rate? What does your compliance phrase adherence look like by queue?
      </p>

      <h2>The practical architecture</h2>
      <p>Here&apos;s the stack we typically deploy for this:</p>
      <ul>
        <li>
          <strong>Trigger:</strong> Genesys Cloud notification → AWS EventBridge or a webhook to a
          Supabase Edge Function / Vercel serverless function
        </li>
        <li>
          <strong>Fetch:</strong> Pull transcript + conversation metadata via Genesys Cloud API
          (OAuth client credentials grant, service account)
        </li>
        <li>
          <strong>Process:</strong> Rule-based checks in the function itself; LLM calls to Claude
          or GPT-4o with structured output schema
        </li>
        <li>
          <strong>Store:</strong> Insert structured output into Postgres (Supabase) or your data
          warehouse (Snowflake, BigQuery)
        </li>
        <li>
          <strong>Surface:</strong> Build a lightweight dashboard (Retool, Metabase, or a custom
          Next.js app) that queries the structured table
        </li>
      </ul>
      <p>
        End-to-end latency from call end to processed record is typically 3–8 minutes, depending
        on transcript generation time and LLM response time. For QA purposes this is perfectly
        acceptable. If you need real-time signals (escalation risk mid-call), that&apos;s a
        different architecture — SIPREC-based streaming rather than post-call transcript processing.
      </p>

      <h2>What you actually get</h2>
      <p>
        Contact centers that run this pipeline stop flying blind. Instead of supervisors listening
        to random calls hoping to catch problems, you have a system that surfaces every compliance
        miss, every unresolved escalation, every agent who needs coaching — automatically, the
        same day the call happens.
      </p>
      <p>
        The setup takes 2–4 weeks depending on the complexity of your QA rubric and how clean your
        Genesys Cloud API access is. It&apos;s one of the highest-ROI projects we run for clients.
      </p>
    </article>
  );
}
