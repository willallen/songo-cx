export default function PureConnectMigration() {
  return (
    <article className="prose-custom">
      <p className="lead">
        We inherited this project on day 47 of a 90-day go-live commitment. The prior SI had
        delivered partial IVR documentation, an incomplete queue design, and a carrier cutover plan
        that hadn&apos;t been reviewed by anyone with BYOC experience. The client had already communicated
        the go-live date to their board. We had 43 days.
      </p>

      <h2>The situation</h2>
      <p>
        A 300-agent financial services contact center running on Avaya-acquired PureConnect had
        committed to a Genesys Cloud migration. The driver was a combination of end-of-life
        pressure on their PureConnect version and a strategic shift toward cloud infrastructure
        across the organization. The original SI was terminated after missing two milestone dates
        and failing to deliver a working prototype of even the most basic inbound flows.
      </p>
      <p>
        What we inherited:
      </p>
      <ul>
        <li>A Genesys Cloud org that had been provisioned but not configured</li>
        <li>
          An IVR mapping document that captured roughly 60% of their call flows — the rest existed
          only in the heads of two long-tenured supervisors
        </li>
        <li>
          Six PureConnect handler chains that had been modified over 11 years and had no
          documentation
        </li>
        <li>
          A BYOC carrier arrangement with a tier-2 carrier that the prior SI had never configured
          a SIP trunk for
        </li>
        <li>
          WFM schedules that had been manually managed in spreadsheets for the past 18 months
          because their PureConnect WFM module was broken
        </li>
      </ul>

      <h2>Week one: call flow audit</h2>
      <p>
        Before writing a single Architect flow, we spent the first week on a call flow audit. This
        meant getting on calls with the two supervisors who knew the system, recording everything,
        and building a complete map of every IVR path, queue, skill, and exception condition.
      </p>
      <p>
        The audit revealed three things the prior SI had missed entirely: a collections queue that
        operated on a different schedule and routing logic than the main queues, a compliance
        recording requirement for all calls touching certain account types, and a custom hold music
        arrangement with a licensed vendor that required specific audio file handling.
      </p>
      <p>
        None of these were in the documentation. All of them would have caused a failed go-live if
        discovered after cutover.
      </p>
      <p>
        We documented everything in a flow specification document — not a Visio diagram, but a
        structured spec that mapped every condition, every prompt, every transfer target, and every
        exception path. This became the source of truth for the Architect build.
      </p>

      <h2>The Architect build</h2>
      <p>
        With the spec complete, the Architect flow build took eight days across two architects
        working in parallel on different queue sets. We used a modular approach — shared sub-flows
        for common logic (identity verification, hold treatment, callback offer) called from the
        main queue flows, rather than duplicating logic across every flow.
      </p>
      <p>
        The PureConnect handler logic was a useful reference but not a template. PureConnect
        handlers are procedural; Architect flows are more declarative. We rewrote the logic
        rather than trying to map it one-to-one, which produced cleaner flows that were easier
        to test and that the client&apos;s team could understand and maintain.
      </p>
      <p>
        Testing happened in two phases: flow-level testing against a dedicated test Genesys org
        using simulated calls, then integrated testing against the production org with a small
        group of agents from each queue. We used a spreadsheet of 140 test cases derived from
        the flow spec — every path, every exception, every transfer condition. Nothing went to
        UAT until it passed all 140.
      </p>

      <h2>The BYOC carrier cutover</h2>
      <p>
        The carrier work was the highest-risk part of the project and had received the least
        attention from the prior SI. The client&apos;s carrier used a non-standard SIP implementation
        that required specific SDP handling configuration on the SBC — something that only became
        apparent during initial SIP trunk testing.
      </p>
      <p>
        We worked through three rounds of SBC configuration changes with the carrier&apos;s NOC team
        over a week and a half, ultimately getting stable calls with correct DTMF handling,
        appropriate codec negotiation, and proper fax detection behavior. The carrier had never
        connected to a Genesys Cloud BYOC implementation before. We documented the full
        configuration for their team.
      </p>
      <p>
        The cutover itself was executed on a Sunday at 10 PM. We moved numbers in batches of
        50, testing each batch before moving the next. Total cutover time: 4 hours, 22 minutes.
        No carrier outages. One audio quality issue on the final batch that was resolved with a
        SBC codec priority adjustment during the window.
      </p>

      <h2>WFM migration</h2>
      <p>
        The WFM situation was unusual — agents had been operating without functional WFM for 18
        months. This meant there was no clean data to migrate. We had to rebuild the WFM
        configuration from scratch: work plans, scheduling rules, shift templates, exception types.
      </p>
      <p>
        We did this in parallel with the flow build, working from their HR policies and historical
        spreadsheet schedules. The first Genesys Cloud WFM forecast ran the week before go-live,
        giving supervisors enough time to review it and adjust before the system went live.
      </p>

      <h2>Go-live and stabilization</h2>
      <p>
        Go-live was day 87. We ran a hypercare period for 10 business days post-launch with two
        engineers on call. Issues during hypercare were minor: two routing conditions that behaved
        differently in production than in testing (both fixed same-day), one WFM schedule
        exception type that needed adjustment, and an agent desktop display issue tied to a browser
        version on certain workstations.
      </p>
      <p>
        No calls were dropped. No queues went unmanned. The collections queue — the most
        complex — worked exactly as specified from day one.
      </p>

      <h2>What made it work</h2>
      <p>
        Three things: the call flow audit before building anything, modular Architect flow design
        that made testing tractable, and treating the carrier cutover as a separate project with
        its own timeline rather than assuming it would just work.
      </p>
      <p>
        The prior SI had skipped the audit and assumed the carrier configuration would be
        straightforward. Those two assumptions accounted for most of the 47 days they lost before
        we took over.
      </p>
    </article>
  );
}
