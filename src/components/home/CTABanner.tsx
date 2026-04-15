export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light py-24">
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-cx/10 rounded-full blur-[100px]" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-6">Let&apos;s Talk</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
          Most Genesys Cloud implementations hit the same walls.
        </h2>
        <p className="text-xl text-white/60 mb-10">
          We&apos;ve already broken through them.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold bg-white text-navy hover:bg-cx hover:text-white transition-all duration-300 shadow-xl shadow-black/20 cta-pulse"
        >
          Start with a Discovery Call
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
