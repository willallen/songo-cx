import Link from 'next/link';

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-6L16.5 15m0 0L12 10.5m4.5 4.5V1.5" />
      </svg>
    ),
    title: 'PureConnect Migrations',
    description: 'Full migration planning and execution — IVR mapping, queue design, WFM, and carrier cutover.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
    title: 'Carrier Connectivity & BYOC',
    description: 'BYOC Cloud and Premises design, SBC configuration, SIP trunking, and E911 compliance.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: 'Architect Flows & Bots',
    description: 'Complex inbound/outbound flows, bot integrations (Google CCAI, Amazon Lex), and digital channels.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.856-2.07a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
      </svg>
    ),
    title: 'Data Actions & Integrations',
    description: 'REST APIs, Salesforce/ServiceNow/Zendesk connectors, and Terraform configuration-as-code.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'WFM & Analytics',
    description: 'Forecasting, scheduling, adherence configuration, custom dashboards, and performance reporting.',
  },
];

export default function ServiceCards() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-3">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">What we do</h2>
          <p className="text-body max-w-xl mx-auto">
            Specialized Genesys Cloud delivery across the full stack — from infrastructure to IVR.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {services.map((svc) => (
            <Link
              key={svc.title}
              href="/services"
              className="group bg-white rounded-2xl border border-gray-100 p-7 card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-cx-lighter flex items-center justify-center text-cx mb-5 group-hover:bg-cx group-hover:text-white transition-colors duration-300">
                {svc.icon}
              </div>
              <h3 className="text-navy font-semibold mb-2 group-hover:text-cx transition-colors duration-200">{svc.title}</h3>
              <p className="text-body text-sm leading-relaxed">{svc.description}</p>
            </Link>
          ))}
          <Link
            href="/services"
            className="group bg-gradient-to-br from-cx-lighter to-white rounded-2xl p-7 flex flex-col items-center justify-center border border-cx/10 hover:border-cx/30 transition-all duration-300 card-hover"
          >
            <div className="w-12 h-12 rounded-full bg-cx/10 flex items-center justify-center mb-4 group-hover:bg-cx/20 transition-colors">
              <svg className="w-5 h-5 text-cx" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <span className="text-cx font-semibold text-sm">View all services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
