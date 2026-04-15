import type { Metadata } from 'next';
import Link from 'next/link';
import { getCaseStudies, getArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: { absolute: 'Work | Songo CX — Case Studies & Writing' },
  description:
    'Genesys Cloud case studies, technical architecture posts, and writing from the practice.',
};

export default function WorkPage() {
  const caseStudies = getCaseStudies();
  const articles = getArticles();

  return (
    <div className="pt-[72px]">
      {/* Page header */}
      <div className="relative hero-bg py-24 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-4">Work</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Case Studies & Writing</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Anonymized case studies from client engagements, and technical writing on Genesys Cloud architecture and AI.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

        {/* Case Studies */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div>
              <p className="text-cx text-xs font-semibold uppercase tracking-wider mb-1">Client Work</p>
              <h2 className="text-2xl font-bold text-navy tracking-tight">Case Studies</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover"
              >
                <div className="h-1.5 bg-gradient-to-r from-navy to-cx" />
                <div className="flex flex-col flex-1 p-7">
                  <span className="text-xs font-semibold text-cx bg-cx-lighter px-3 py-1 rounded-full mb-5 self-start">
                    {item.tag}
                  </span>
                  <h3 className="text-navy font-bold leading-snug mb-4 group-hover:text-cx transition-colors duration-200 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed flex-1 mb-6">{item.excerpt}</p>
                  {item.outcome && (
                    <div className="flex items-center gap-2 py-3 border-t border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-cx flex-shrink-0" />
                      <span className="text-navy text-xs font-semibold">{item.outcome}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-body/40 text-xs">{item.date}</span>
                    <span className="text-cx text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* CTA card */}
            <div className="relative bg-gradient-to-br from-navy-dark to-navy rounded-2xl p-7 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cx/10 rounded-full blur-[80px]" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  Work with us on something worth writing about.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Limited engagements per quarter.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative mt-6 group inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold bg-white text-navy hover:bg-cx hover:text-white transition-all duration-300 text-sm shadow-lg"
              >
                Start a conversation
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div>
              <p className="text-cx text-xs font-semibold uppercase tracking-wider mb-1">From the Practice</p>
              <h2 className="text-2xl font-bold text-navy tracking-tight">Technical Writing</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover"
              >
                <div className="h-1.5 bg-gradient-to-r from-cx to-cx-light" />
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-semibold text-cx bg-cx-lighter px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <span className="text-body/40 text-xs">{item.readTime}</span>
                  </div>
                  <h3 className="text-navy font-bold leading-snug mb-4 group-hover:text-cx transition-colors duration-200 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed flex-1 mb-6">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-body/40 text-xs">{item.date}</span>
                    <span className="text-cx text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
