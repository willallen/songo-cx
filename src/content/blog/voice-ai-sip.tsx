export default function VoiceAiSip() {
  return (
    <article className="prose-custom">
      <p className="lead">
        AI voice agents have crossed into production viability. VAPI, Google Dialogflow CX, and
        LiveKit all support SIP — the same protocol Genesys Cloud uses for voice. That means you
        can connect an AI agent directly to your Genesys Cloud contact center and have it handle
        real calls, with a warm transfer to a human agent when needed. Here&apos;s the architecture.
      </p>

      <h2>Why SIP is the right integration layer</h2>
      <p>
        Every AI voice platform eventually exposes a SIP interface because SIP is the lingua franca
        of telephony. It&apos;s how calls move between systems. Rather than integrating AI agents via
        API (which means intercepting and proxying audio streams, with all the latency that
        implies), SIP lets you treat the AI agent as another endpoint in your call routing graph
        — just like a physical phone or a softphone client.
      </p>
      <p>
        From Genesys Cloud&apos;s perspective, a SIP-connected AI agent looks like a SIP endpoint.
        Architect flows can transfer calls to it, receive transfers back from it, and handle the
        call after the AI completes its interaction. The integration point is clean and the call
        audio quality is native — no web RTC translation layers, no quality degradation.
      </p>

      <h2>The Genesys Cloud side: Architect flow design</h2>
      <p>
        The Genesys Cloud configuration is straightforward. The AI agent receives calls via a
        Blind Transfer or a Consultative Transfer action in an Architect flow. The key decision is
        how to pass context.
      </p>
      <p>
        For a blind transfer, context travels as SIP headers. You can set custom SIP headers in
        Architect using the &ldquo;Set SIP Headers&rdquo; action before the transfer — passing the customer&apos;s
        ANI, account number (if you&apos;ve already done a data action lookup), the queue they were
        destined for, or any other variable you&apos;ve collected in the flow. The receiving AI platform
        needs to read these headers and use them to personalize the conversation.
      </p>
      <p>
        For a warm transfer back to a human agent, the AI platform initiates a SIP REFER or a new
        outbound call to a Genesys Cloud DID, optionally passing conversation context back via SIP
        headers or a URL to a context record. The Architect flow at the receiving end can read
        those headers and route accordingly — landing the call in the right queue, with screen pop
        data pre-loaded.
      </p>

      <h2>VAPI</h2>
      <p>
        VAPI is purpose-built for AI voice agents and has the most straightforward SIP configuration
        of the three platforms. To connect VAPI to Genesys Cloud:
      </p>
      <ol>
        <li>
          In VAPI, create a SIP trunk under Settings → Phone Numbers → Import SIP Trunk. VAPI will
          give you a SIP URI in the format <code>sip:yourorg@sip.vapi.ai</code>.
        </li>
        <li>
          In Genesys Cloud, add a SIP trunk pointing to VAPI&apos;s SIP endpoint. Use a BYOC Premises
          or BYOC Cloud trunk configuration depending on whether you&apos;re routing through your own
          SBC first.
        </li>
        <li>
          Create a DID in VAPI associated with the assistant you want to invoke for inbound calls.
          For Genesys-originated transfers, VAPI uses the called number (To header) to determine
          which assistant handles the call.
        </li>
        <li>
          In your Architect flow, use a Transfer to External action with the VAPI SIP URI as the
          target, and set any context SIP headers before the transfer action.
        </li>
      </ol>
      <p>
        VAPI&apos;s assistant configuration handles the LLM (you choose: GPT-4o, Claude, Gemini),
        STT (Deepgram is the default), and TTS (ElevenLabs, PlayHT, or others). Latency is
        typically 800–1200ms end-to-end for the AI response turn, which is on the edge of
        acceptable for most use cases. VAPI has been improving this steadily.
      </p>
      <p>
        VAPI also exposes a webhook for call events — you can log every turn of the AI conversation
        and the final outcome back to your data infrastructure, keeping Genesys Cloud as the system
        of record for the overall call while VAPI handles the AI interaction detail.
      </p>

      <h2>Google Dialogflow CX</h2>
      <p>
        Dialogflow CX integrates with Genesys Cloud via two paths: the Genesys native Dialogflow
        bot integration (which runs inside Architect flows for digital channels and voice) and a
        direct SIP integration via Dialogflow CX&apos;s Telephony Gateway or CCAI Platform.
      </p>
      <p>
        The native Genesys integration is the easier path for most use cases — Architect calls the
        Dialogflow CX agent via the built-in bot action, the bot handles the conversation turn, and
        control returns to Architect when the bot&apos;s flow terminates. This works well for structured
        IVR-style interactions where the bot collects specific inputs (intent, account number, issue
        type) and hands off.
      </p>
      <p>
        The SIP path via CCAI Platform (Google&apos;s Contact Center AI product) is more powerful
        but significantly more complex. CCAI Platform acts as a full telephony intermediary — calls
        route to Google&apos;s infrastructure, Dialogflow CX handles the conversation, and CCAI
        Platform manages the call lifecycle including transfers back to your Genesys queues. This
        gives you Google&apos;s STT/TTS quality (which is excellent) and full CCAI feature access, but
        it effectively moves your call routing control plane to Google for any calls that enter the
        AI flow.
      </p>
      <p>
        For pure Genesys-integrated deployments, the native bot integration is the right choice.
        For organizations that want to use Google&apos;s telephony infrastructure as a primary layer
        with Genesys as an agent desktop and queue manager, CCAI Platform makes sense.
      </p>

      <h2>LiveKit</h2>
      <p>
        LiveKit is an open-source real-time communication framework (WebRTC-based) that has added
        SIP support and a purpose-built Agents framework for AI voice applications. The key
        differentiator is that you can self-host the entire stack — your calls don&apos;t touch a
        third-party AI voice platform&apos;s infrastructure.
      </p>
      <p>
        The LiveKit SIP integration with Genesys Cloud works via LiveKit&apos;s SIP server, which you
        deploy on your own infrastructure. Configuration steps:
      </p>
      <ol>
        <li>
          Deploy LiveKit server and the LiveKit SIP bridge (both available as Docker images or
          Kubernetes Helm charts).
        </li>
        <li>
          Configure a SIP trunk in Genesys Cloud pointing to your LiveKit SIP bridge endpoint.
          Assign a DID for inbound calls from Genesys.
        </li>
        <li>
          Build your AI agent using the LiveKit Agents Python SDK. The framework handles STT (via
          Deepgram, AssemblyAI, or Whisper), LLM (Claude, GPT-4o, or any API-compatible model),
          and TTS (ElevenLabs, Cartesia, or others) with a pipeline abstraction that manages turn
          detection and interruption handling.
        </li>
        <li>
          The agent runs as a LiveKit participant in a room. When a SIP call arrives, LiveKit
          dispatches an agent instance to handle it.
        </li>
      </ol>
      <p>
        The self-hosted nature means your audio never leaves your infrastructure — a requirement
        for certain regulated industries (healthcare, financial services). The tradeoff is
        operational overhead: you&apos;re running and scaling the LiveKit infrastructure yourself.
        LiveKit Cloud (their managed offering) removes this burden but reintroduces third-party
        audio routing.
      </p>
      <p>
        LiveKit&apos;s latency characteristics depend heavily on your STT and LLM choices. With
        streaming STT (Deepgram Nova-2) and a small fast model (Claude Haiku, GPT-4o mini),
        response latency can get to 600–800ms — better than VAPI for straightforward interactions.
      </p>

      <h2>Use cases that work well today</h2>
      <p>
        Not every call is a good AI voice candidate. The patterns that work in production:
      </p>
      <ul>
        <li>
          <strong>After-hours handling:</strong> AI agent takes the call after business hours,
          collects issue type and contact info, creates a callback record. No attempt to resolve —
          just capture and acknowledge. High success rate, low complexity.
        </li>
        <li>
          <strong>Overflow handling:</strong> When queue depth exceeds a threshold, Architect
          routes overflow to an AI agent that offers a callback or handles simple inquiries. The
          AI resolves what it can; anything complex gets a callback scheduled.
        </li>
        <li>
          <strong>Authenticated self-service:</strong> Post-authentication (handled in Architect
          via a data action lookup), transfer to an AI agent with customer context pre-loaded. The
          AI handles account inquiries, status lookups, simple transactions.
        </li>
        <li>
          <strong>First-level triage and routing:</strong> AI agent replaces a DTMF IVR menu with
          a conversational interaction. &ldquo;What can I help you with today?&rdquo; — intent classification
          routes to the right queue with context attached.
        </li>
      </ul>

      <h2>What to build for before you start</h2>
      <p>
        The most common failure mode in AI voice deployments is underestimating the edge case
        surface. The demo works great. Production traffic exposes: heavy accents the STT
        misrecognizes, customers who don&apos;t follow conversational norms, background noise on mobile
        calls, customers who ask questions outside the agent&apos;s defined scope.
      </p>
      <p>
        Before going live, define explicit handoff conditions — the set of signals that trigger an
        immediate transfer to a human. Include: detected frustration (multiple rephrasing attempts,
        raised voice via sentiment detection), explicit human request (&ldquo;let me talk to someone&rdquo;),
        topics outside the agent&apos;s knowledge scope (LLM should be instructed to escalate rather
        than hallucinate), and a session time limit.
      </p>
      <p>
        A graceful, fast handoff to a human with context is far better than an AI agent that
        overstays its welcome. Design the exit conditions first.
      </p>
    </article>
  );
}
