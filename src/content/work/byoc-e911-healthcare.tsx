export default function ByocE911Healthcare() {
  return (
    <article className="prose-custom">
      <p className="lead">
        E911 compliance for a multi-site healthcare organization is not a configuration task —
        it&apos;s a project with legal exposure attached to every decision. When a 911 call from
        a nurse station routes to the wrong PSAP, or when the dispatchable location is a building
        address instead of a floor and wing, the consequences are not a failed audit. They&apos;re
        worse. We had six weeks to get this right across four facilities.
      </p>

      <h2>The client and the problem</h2>
      <p>
        A regional healthcare system with four facilities — two hospitals, one outpatient surgery
        center, and one administrative campus — had decided to move their voice infrastructure to
        Genesys Cloud BYOC Cloud. Their existing on-premise PBX handled E911 through a dedicated
        ELIN (Emergency Location Identification Number) configuration that had taken their prior
        vendor two years to get right.
      </p>
      <p>
        Moving to BYOC meant taking ownership of E911 compliance that had previously been a
        vendor responsibility. The healthcare system&apos;s legal and compliance team had reviewed
        Kari&apos;s Law and Ray Baum&apos;s Act requirements and flagged this as a project blocker. No
        BYOC go-live without certified E911 compliance across all four sites.
      </p>
      <p>
        Additional constraint: two of the four facilities shared a carrier trunk group and could
        not be migrated independently. They had to cut over together.
      </p>

      <h2>E911 requirements for BYOC Cloud</h2>
      <p>
        For readers less familiar with the regulatory landscape: Kari&apos;s Law (effective 2020)
        requires that multi-line telephone systems allow direct 911 dialing without a prefix, and
        that a notification be sent to a central location within the facility when 911 is dialed.
        Ray Baum&apos;s Act (phased in through 2021–2022) requires that the dispatchable location —
        not just the street address, but the floor, wing, or room — be transmitted with the 911
        call to the PSAP.
      </p>
      <p>
        In a BYOC Cloud deployment, E911 compliance requires:
      </p>
      <ul>
        <li>
          <strong>A 911 service provider</strong> with a location database — Bandwidth, Intrado, or
          Lumen are the common choices. This provider maps DIDs and ERLs (Emergency Response
          Locations) to PSAPs and dispatchable locations.
        </li>
        <li>
          <strong>ERL configuration</strong> at a granularity that satisfies Ray Baum&apos;s Act. For
          healthcare facilities, this typically means per-floor, per-wing ERLs rather than
          per-building.
        </li>
        <li>
          <strong>SBC configuration</strong> to correctly handle 911 calls — passing the correct
          ELIN or providing the P-Asserted-Identity header that maps to the right ERL.
        </li>
        <li>
          <strong>On-site notification</strong> — a system that alerts a security desk or
          designated safety officer within the facility when 911 is dialed from any extension.
        </li>
        <li>
          <strong>Testing and PSAP coordination</strong> — actual test calls to each serving PSAP
          to confirm correct routing and location delivery.
        </li>
      </ul>

      <h2>ERL design</h2>
      <p>
        The most labor-intensive part of the project was ERL design — mapping every telephone
        location to an emergency response location with a dispatchable address. For the two
        hospitals, this meant working through floor plans to define ERLs at wing/floor granularity.
        Hospital 1 had 47 distinct ERLs. Hospital 2 had 31. The outpatient surgery center and
        administrative campus each had a small number of ERLs by building section.
      </p>
      <p>
        We worked with the facilities management team at each site to get accurate floor plans and
        confirm that the ERL boundaries made sense operationally — that a dispatcher receiving
        &ldquo;Hospital 1, Floor 3, North Wing&rdquo; would be able to direct emergency services to the
        right place. This is not a technical question; it&apos;s a facilities and operations question that
        technical teams frequently get wrong by defining ERLs based on network topology rather than
        physical navigation.
      </p>
      <p>
        Once ERL design was complete, we provisioned the location database with the 911 service
        provider, mapping each ERL to the correct PSAP and dispatchable location address.
      </p>

      <h2>SBC configuration for E911</h2>
      <p>
        The SBC configuration for E911 in a BYOC Cloud deployment has a specific requirement:
        911 calls must not be routed through the Genesys Cloud media path. They must route
        directly from the SBC to the 911 service provider, bypassing Genesys Cloud entirely.
        This is both a regulatory requirement and a reliability requirement — you don&apos;t want a
        cloud platform availability event to affect 911 call routing.
      </p>
      <p>
        We configured the SBC with a dedicated 911 route that matched on the dialed number (911,
        9911 for systems requiring a prefix, and the full 10-digit emergency numbers for local
        PSAPs) and routed directly to the Bandwidth SIP trunk. The Genesys Cloud trunk was
        explicitly excluded from the 911 routing path.
      </p>
      <p>
        The P-Asserted-Identity header on outbound 911 calls was set to the ELIN associated
        with the originating extension&apos;s ERL — a SBC routing table lookup that mapped extension
        ranges to ERLs. For shared-line scenarios (conference rooms, nurse stations with multiple
        handsets), we assigned a dedicated ELIN per physical location rather than per extension.
      </p>

      <h2>On-site notification system</h2>
      <p>
        Kari&apos;s Law&apos;s notification requirement was implemented via a combination of the SBC and a
        lightweight notification service. When the SBC detects a 911 call originating from a
        facility, it sends a SIP NOTIFY to a small service that translates it to a notification
        to the facility&apos;s security desk — an IP phone call and an SMS to the on-call safety officer.
      </p>
      <p>
        The notification includes the originating extension, the ERL (human-readable location),
        and a timestamp. The security desk can then dispatch an internal safety response
        concurrently with the 911 response.
      </p>

      <h2>PSAP testing</h2>
      <p>
        Coordinating 911 test calls with PSAPs requires advance scheduling — PSAPs need to know
        that test calls are coming so they don&apos;t dispatch emergency services. We coordinated
        with four PSAPs across the service area, scheduling test windows on weekday mornings
        when PSAP activity is typically lower.
      </p>
      <p>
        Each test call verified: correct PSAP routing (call went to the right PSAP for the
        facility&apos;s jurisdiction), correct dispatchable location delivery (PSAP confirmed receiving
        the floor/wing information), and correct on-site notification (security desk confirmed
        receiving the internal alert).
      </p>
      <p>
        We ran 23 test calls across all four facilities and all PSAP jurisdictions. Two calls
        required SBC routing adjustments — one PSAP had a non-standard SIP implementation that
        required a specific From header format, and one ERL had been provisioned with an incorrect
        floor designation that was corrected in the location database.
      </p>
      <p>
        All 23 calls passed on the final test run. The compliance team signed off. Go-live
        proceeded with E911 certification in place.
      </p>

      <h2>Voice uptime since go-live</h2>
      <p>
        The deployment has been running for six months post-go-live. Voice uptime has been 99.99%,
        with the single availability event being a 4-minute SIP trunk degradation during a carrier
        maintenance window that had been communicated in advance. The SBC failover to the redundant
        trunk path activated automatically; no calls were dropped.
      </p>
      <p>
        The 911 system has been tested quarterly per the healthcare system&apos;s internal safety
        policy. All test calls have routed and delivered location data correctly.
      </p>
    </article>
  );
}
