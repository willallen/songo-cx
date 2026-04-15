import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'About | Songo CX — Genesys Cloud Specialists' },
  description:
    'Songo CX is a boutique Genesys Cloud consulting practice with deep expertise in PureConnect migrations, BYOC carrier architecture, and complex contact center integrations.',
};

const expertise = [
  {
    label: '5+ Years on Genesys Cloud CX',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    label: 'Deep PureConnect Background',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    label: 'Carrier & BYOC Architecture',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    label: 'CRM & API Integrations',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.856-2.07a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
      </svg>
    ),
  },
  {
    label: 'Architect Flows & Bot Development',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
];

const certifications = [
  'Genesys Cloud CX Certified Professional',
  'GCX Administrator',
  'GCX Architect',
];

const howWeWork = [
  {
    title: 'Every engagement starts with a paid assessment',
    body: "No guessing at scope. We document what's there, what needs to happen, and what it will cost before any project begins.",
    step: '01',
  },
  {
    title: 'Senior architects on every project',
    body: "We don't hand work off to junior staff. The team that scopes your project delivers it.",
    step: '02',
  },
  {
    title: "We only take work we can deliver excellently",
    body: "Limited availability by design. If we can't commit to doing it right, we say so.",
    step: '03',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      {/* Page header */}
      <div className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-24 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-cx/8 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-4">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">About Songo CX</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            A boutique Genesys Cloud practice built for the work that matters most.
          </p>
        </div>
      </div>

      {/* Firm story */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-px bg-cx" />
          <span className="text-cx text-xs font-semibold uppercase tracking-wider">Our Story</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-10 tracking-tight">Built for the hard problems.</h2>
        <div className="space-y-6 text-body leading-relaxed text-lg">
          <p>
            Songo CX was founded to fill a specific gap in the Genesys Cloud market: senior-level
            delivery on the work that large system integrators overprice and under-staff. We
            specialize in the complex end of the platform — carrier architecture, PureConnect
            migrations, deep integrations, and advanced Architect flows — because that&apos;s where
            contact centers get stuck.
          </p>
          <p>
            Our practice is deliberately small. We don&apos;t scale headcount to win more contracts.
            We take on a limited number of engagements to ensure every client gets senior-level
            attention from start to finish.
          </p>
        </div>
      </section>

      {/* Expertise strip */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-3">Specializations</p>
            <h2 className="text-3xl font-bold text-navy tracking-tight">Our Expertise</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {expertise.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-cx-lighter flex items-center justify-center text-cx flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-navy font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-3">Credentials</p>
          <h2 className="text-3xl font-bold text-navy mb-12 tracking-tight">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="bg-cx-lighter text-navy text-sm font-semibold px-6 py-3.5 rounded-xl border border-cx/20 shadow-sm"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-surface py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">How we work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {howWeWork.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
                <span className="text-cx/20 text-5xl font-bold block mb-4">{item.step}</span>
                <h3 className="text-navy font-bold mb-4 leading-snug">{item.title}</h3>
                <p className="text-body text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light py-24">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-cx/10 rounded-full blur-[100px]" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Ready to talk?</h2>
          <p className="text-white/60 text-lg mb-10">
            We&apos;d rather have a focused 30-minute call than trade a dozen emails.
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold bg-white text-navy hover:bg-cx hover:text-white transition-all duration-300 shadow-xl shadow-black/20"
          >
            Schedule a discovery call
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
