export default function DisasterRecovery() {
  return (
    <article className="prose-custom">
      <p className="lead">
        Genesys Cloud is a cloud platform, so it&apos;s resilient by default — right? Mostly. But
        &ldquo;resilient&rdquo; means different things to Genesys and to a contact center director whose
        phone lines just went silent. Understanding exactly what Genesys Cloud protects against —
        and what it doesn&apos;t — is the starting point for any serious DR architecture.
      </p>

      <h2>What Genesys Cloud actually protects against</h2>
      <p>
        Genesys Cloud runs in AWS regions with multi-AZ deployments. This protects against
        individual availability zone failures — a data center fire, a network issue within a
        region. It does not protect against a full AWS region outage, which while rare, happens.
        When AWS us-east-1 has a significant event, every Genesys Cloud customer in that region
        feels it simultaneously.
      </p>
      <p>
        More practically, the region boundary also creates a carrier exposure problem. If your
        PSTN connectivity is tied to your primary Genesys Cloud region — whether via Genesys Cloud
        Voice or BYOC — a regional event can take down your inbound number routing even if the
        problem has nothing to do with Genesys itself.
      </p>
      <p>
        The Genesys Cloud SLA covers the platform. It doesn&apos;t cover your specific RTO when
        something goes wrong. That&apos;s your problem to solve.
      </p>

      <h2>The architecture: middleware between your carriers and Genesys</h2>
      <p>
        The core idea is to insert a session border controller (SBC) layer that you own and control
        between your carrier trunks and Genesys Cloud. Instead of your carrier terminating directly
        into Genesys Cloud, calls route to your SBC first, and your SBC forwards to Genesys Cloud.
        This gives you a control point for failover.
      </p>
      <p>
        The SBC runs health checks against your Genesys Cloud SIP endpoints on a configurable
        interval — typically every 30 seconds using SIP OPTIONS probes. When the probe fails a
        defined threshold (e.g., three consecutive failures), the SBC automatically reroutes
        traffic to the secondary target.
      </p>
      <p>That secondary target can be:</p>
      <ul>
        <li>A second Genesys Cloud region (if you have a secondary org provisioned)</li>
        <li>A legacy PBX or PureConnect environment kept warm for exactly this purpose</li>
        <li>A simple IVR on a third-party platform that plays a message and captures callbacks</li>
        <li>A direct-to-agent routing via a different carrier path</li>
      </ul>
      <p>
        The right choice depends on your RTO requirements and budget for maintaining the secondary
        environment. A warm Genesys secondary org costs money every month. A minimal IVR-and-callback
        failover costs almost nothing but has limited capability.
      </p>

      <h2>SBC selection and configuration</h2>
      <p>
        For BYOC Cloud customers, you&apos;re already running an SBC — this is an extension of
        existing infrastructure. If you&apos;re on Genesys Cloud Voice, you need to migrate to BYOC
        to implement this pattern. That migration is itself a significant project, but it gives you
        carrier portability as a side benefit.
      </p>
      <p>
        The SBCs we deploy most often for this pattern are AudioCodes Mediant (hardware or virtual)
        and Oracle (Acme Packet). Both have mature health-check and failover capabilities. The
        configuration is roughly:
      </p>
      <ul>
        <li>
          <strong>IP Groups:</strong> Define one IP group per SIP target (primary Genesys region,
          secondary target)
        </li>
        <li>
          <strong>Proxy Sets:</strong> Assign health monitoring to each proxy set with OPTIONS
          keepalive enabled
        </li>
        <li>
          <strong>IP-to-IP Routing:</strong> Primary route to Genesys Cloud; failover route to
          secondary, activated on health check failure
        </li>
        <li>
          <strong>Alerting:</strong> Configure SNMP traps or syslog to your monitoring system so
          you know when failover activates
        </li>
      </ul>
      <p>
        The SBC itself needs to be redundant — an active/standby pair, ideally in different
        physical locations or cloud availability zones. An SBC that&apos;s a single point of failure
        defeats the purpose.
      </p>

      <h2>The secondary Genesys Cloud region</h2>
      <p>
        If your RTO requires a functional contact center — real agents, real queues, real reporting
        — in the secondary state, you need a second Genesys Cloud organization in a different
        region. This is the most capable but most expensive option.
      </p>
      <p>
        Maintaining a secondary org requires keeping it synchronized with your primary. Queue
        configuration, skills, wrap-up codes, Architect flows, user accounts — all of it needs to
        match, or close enough that agents can operate in it during an incident.
      </p>
      <p>
        We handle this with a Terraform-based configuration-as-code approach. All Genesys Cloud
        configuration lives in source control as Terraform. Applying it to a second org is a
        pipeline run. When the primary org config changes, the same change gets applied to the
        secondary. The drift between environments stays minimal.
      </p>
      <p>
        Key decisions for the secondary org:
      </p>
      <ul>
        <li>
          <strong>Agent licensing:</strong> Do you license the same agents in both orgs? Named user
          licenses don&apos;t transfer. You need a separate license pool for DR — either duplicate
          licenses or a smaller concurrent license model for the secondary.
        </li>
        <li>
          <strong>Carrier routing:</strong> Your numbers need to be portable to the secondary SBC
          target without a porting event. This is a carrier contract conversation. Some carriers
          support geographic redundancy natively; others require a separate trunk group.
        </li>
        <li>
          <strong>Integrations:</strong> Your CRM and WFM integrations need to work in the
          secondary org. If they&apos;re configured by org ID or environment URL, they need
          separate credentials and config for DR.
        </li>
      </ul>

      <h2>Testing the failover</h2>
      <p>
        A DR architecture that hasn&apos;t been tested is a hypothesis. We require clients to run a
        live failover test before we sign off on a DR implementation. This means:
      </p>
      <ol>
        <li>
          Scheduled maintenance window, carriers notified
        </li>
        <li>
          Manually trigger SBC failover (either by blocking OPTIONS responses from primary or via
          SBC management interface)
        </li>
        <li>
          Confirm calls route to secondary, agents can take calls, IVR flows function
        </li>
        <li>
          Measure actual RTO — from the time the primary goes unhealthy to the time a call is
          answered in the secondary environment
        </li>
        <li>
          Fail back to primary and confirm traffic restores cleanly
        </li>
      </ol>
      <p>
        Typical RTOs with this architecture range from 90 seconds (SBC-level failover, minimal
        secondary) to 8–12 minutes (full secondary org with agent login required). The SBC-level
        failover is fast because it&apos;s just changing where calls route — no human action required.
        The outer bound depends on how quickly your agents can switch environments.
      </p>

      <h2>What this doesn&apos;t solve</h2>
      <p>
        This architecture protects your inbound voice path. It doesn&apos;t protect outbound
        campaigns (which need separate consideration), digital channels (email, chat, messaging —
        these have their own redundancy patterns), or your WFM data (schedule adherence during a
        DR event is a process problem, not a technical one).
      </p>
      <p>
        Scope your DR requirements carefully before you design anything. An RTO of four hours with
        a callback-only secondary is a very different project than a 90-second hot failover with
        full agent capability. Most contact centers don&apos;t need the latter, and the cost difference
        is significant.
      </p>
    </article>
  );
}
