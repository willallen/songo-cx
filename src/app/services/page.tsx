import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Services | Songo CX — Genesys Cloud Consulting' },
  description:
    'Genesys Cloud migration, BYOC carrier architecture, Architect flow development, Data Actions, WFM configuration, and ongoing retainer support.',
};

const services = [
  {
    id: 'migration',
    title: 'PureConnect → Genesys Cloud Migration',
    description:
      'Full migration planning and execution. Call flow audit, IVR logic mapping, queue design, WFM migration, carrier cutover, and post-go-live stabilization.',
    forWho:
      'Organizations on PureConnect/Interaction Manager planning or mid-way through a cloud migration.',
    differentiator:
      "We've operated both platforms. We translate legacy handler logic into cloud-native Architect flows without a separate PureConnect specialist.",
    highlights: ['Call flow audit', 'IVR logic mapping', 'Queue design', 'WFM migration', 'Carrier cutover'],
  },
  {
    id: 'carrier',
    title: 'Carrier Connectivity & BYOC Architecture',
    description:
      'BYOC Cloud and BYOC Premises design and implementation. SBC configuration and certification, SIP trunk setup, number porting project management, E911 compliance, disaster recovery architecture.',
    forWho:
      'Organizations bringing their own carrier to Genesys Cloud, or those with complex voice routing requirements.',
    differentiator: "Most GC architects don't touch carrier architecture. We do.",
    highlights: ['SBC configuration', 'SIP trunking', 'Number porting', 'E911 compliance', 'DR architecture'],
  },
  {
    id: 'flows',
    title: 'Architect Flows & Bot Development',
    description:
      'Complex inbound/outbound call flow design and build. Bot integrations (Google CCAI, Amazon Lex, Genesys Dialog Engine). Digital flows: chat, email, SMS, WhatsApp.',
    forWho:
      'Organizations with complex routing logic, self-service automation goals, or failed/incomplete flow implementations.',
    differentiator:
      'We build flows that actually handle edge cases — not just the happy path. Every flow ships with documentation your team can maintain.',
    highlights: ['Inbound/outbound flows', 'Bot integrations', 'Chat & SMS', 'Email routing', 'WhatsApp'],
  },
  {
    id: 'integrations',
    title: 'Data Actions, APIs & CRM Integrations',
    description:
      'Genesys Cloud Data Actions, REST API integrations, Salesforce/ServiceNow/Zendesk connectors, custom automation, Terraform/CLI configuration-as-code.',
    forWho:
      'Organizations needing to connect Genesys Cloud to their CRM, ITSM, or custom backend systems.',
    differentiator:
      'We build integrations that are maintainable — documented, testable, and handed off with your team trained to own them.',
    highlights: ['Data Actions', 'REST APIs', 'CRM connectors', 'Terraform IaC', 'Custom automation'],
  },
  {
    id: 'wfm',
    title: 'WFM & Analytics',
    description:
      'Workforce management configuration (forecasting, scheduling, adherence), custom dashboards, real-time analytics, performance reporting frameworks.',
    forWho:
      'Operations leaders who need WFM working correctly from day one and reporting that reflects actual contact center performance.',
    differentiator:
      'We configure WFM around how your contact center actually operates — not the default settings that require six months of manual tuning.',
    highlights: ['Forecasting', 'Scheduling', 'Adherence', 'Custom dashboards', 'Performance reporting'],
  },
];

const engagementModels = [
  {
    title: 'Project-Based',
    description:
      'Defined scope, timeline, and deliverables. Fixed or T&M pricing. Best for migrations, new implementations, and integration builds.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: 'Advisory & Assessment',
    description:
      'Paid discovery engagement to document your current state, identify gaps, and produce a prioritized roadmap with budget estimates.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Monthly Retainer',
    description:
      'Ongoing senior-level support for Architect flow changes, troubleshooting, carrier management, and platform optimization.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M4.031 9.865V4.873" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      {/* Page header */}
      <div className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-24 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[400px] h-[300px] bg-cx/8 rounded-full blur-[100px]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-4">Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">What We Do</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Specialized Genesys Cloud delivery across migrations, carrier architecture, flow
            development, integrations, and workforce management.
          </p>
        </div>
      </div>

      {/* Service detail sections */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="space-y-32">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-cx text-sm font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-cx/30 to-transparent" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-5 tracking-tight">{svc.title}</h2>
                <p className="text-body leading-relaxed mb-8">{svc.description}</p>
                <div className="space-y-4">
                  <div className="bg-cx-lighter rounded-xl p-5">
                    <p className="text-xs font-semibold text-cx uppercase tracking-wider mb-2">Who it&apos;s for</p>
                    <p className="text-body text-sm leading-relaxed">{svc.forWho}</p>
                  </div>
                  <div className="bg-surface rounded-xl p-5 border-l-[3px] border-cx">
                    <p className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">What makes us different</p>
                    <p className="text-body text-sm leading-relaxed">{svc.differentiator}</p>
                  </div>
                </div>
              </div>

              {/* Visual accent — capability tags */}
              <div className="relative">
                <div className="bg-gradient-to-br from-surface to-cx-lighter rounded-2xl p-10 border border-cx/10">
                  <p className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-6">Capabilities</p>
                  <div className="flex flex-wrap gap-3">
                    {svc.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-lg bg-white text-navy text-sm font-medium border border-gray-100 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Decorative corner */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-cx/5 rounded-full blur-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Models */}
      <div className="bg-surface py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-3">How We Engage</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 tracking-tight">Engagement Models</h2>
            <p className="text-body max-w-lg mx-auto">
              We work with clients in the model that fits their situation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {engagementModels.map((model) => (
              <div key={model.title} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
                <div className="w-14 h-14 rounded-xl bg-cx-lighter flex items-center justify-center text-cx mb-6">
                  {model.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{model.title}</h3>
                <p className="text-body text-sm leading-relaxed mb-6">{model.description}</p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-cx font-semibold text-sm hover:text-navy transition-colors"
                >
                  Get a Quote
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
