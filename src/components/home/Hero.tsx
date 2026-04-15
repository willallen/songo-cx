import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light">
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[400px] bg-cx/8 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.08] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cx" />
            <span className="text-white/60 text-xs font-medium tracking-wide uppercase">
              Boutique Genesys Cloud Practice
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Genesys Cloud.
            <br />
            <span className="text-cx">Done right.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            We handle the hard parts — migrations from PureConnect, BYOC carrier architecture,
            complex IVR flows, and deep integrations. The work most implementations get wrong.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-xl font-semibold bg-cx text-white hover:bg-white hover:text-navy transition-all duration-300 text-center shadow-lg shadow-black/20 cta-pulse"
            >
              Schedule a Discovery Call
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/services"
              className="px-8 py-4 rounded-xl font-semibold border border-white/15 text-white/90 hover:bg-white/[0.07] hover:border-white/25 transition-all duration-300 text-center"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
