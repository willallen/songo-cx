import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { workItems, getWorkItem } from '@/lib/content';

// Case studies
import PureConnectMigration from '@/content/work/pureconnect-migration-financial-services';
import ByocE911 from '@/content/work/byoc-e911-healthcare';
import SalesforceScreenpop from '@/content/work/salesforce-screenpop-retail';
// Articles
import TranscriptAnalytics from '@/content/blog/transcript-analytics';
import DisasterRecovery from '@/content/blog/disaster-recovery';
import VoiceAiSip from '@/content/blog/voice-ai-sip';

const contentMap: Record<string, React.ComponentType> = {
  'pureconnect-migration-financial-services': PureConnectMigration,
  'byoc-e911-healthcare': ByocE911,
  'salesforce-screenpop-retail': SalesforceScreenpop,
  'call-transcript-analytics': TranscriptAnalytics,
  'multi-region-disaster-recovery': DisasterRecovery,
  'voice-ai-sip-integration': VoiceAiSip,
};

export async function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) return {};
  return {
    title: { absolute: `${item.title} | Songo CX` },
    description: item.excerpt,
  };
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) notFound();

  const Content = contentMap[slug];
  if (!Content) notFound();

  const isCaseStudy = item.type === 'case-study';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': isCaseStudy ? 'Article' : 'TechArticle',
    headline: item.title,
    description: item.excerpt,
    datePublished: item.dateISO,
    author: {
      '@type': 'Organization',
      name: 'Songo CX',
      url: 'https://www.songocx.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Songo CX',
      url: 'https://www.songocx.com',
    },
    url: `https://www.songocx.com/work/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.songocx.com/work/${slug}`,
    },
  };

  return (
    <div className="pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Header */}
      <div className="relative hero-bg py-24 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="relative max-w-3xl mx-auto px-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All work
          </Link>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold text-cx bg-white/10 px-3 py-1 rounded-full">
              {isCaseStudy ? 'Case Study' : 'Article'} · {item.tag}
            </span>
            <span className="text-white/40 text-xs">{item.date}</span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/40 text-xs">{item.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            {item.title}
          </h1>
          {item.outcome && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-cx" />
              <span className="text-white/70 text-sm font-medium">{item.outcome}</span>
            </div>
          )}
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Content />

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="bg-surface rounded-2xl p-10 text-center">
            <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-3">Work with us</p>
            <h2 className="text-2xl font-bold text-navy mb-4 tracking-tight">
              {isCaseStudy
                ? 'Working through something similar?'
                : 'Want to build something like this?'}
            </h2>
            <p className="text-body mb-8 max-w-lg mx-auto">
              {isCaseStudy
                ? "We're happy to talk through your specific situation. No sales pitch — just an honest conversation about whether we're the right fit."
                : "We implement these architectures for contact centers. If you're evaluating any of the approaches described here, we're happy to talk through your specific setup."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-semibold bg-navy text-white hover:bg-cx transition-all duration-300"
              >
                Schedule a call
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-semibold border border-gray-200 text-body hover:border-cx hover:text-navy transition-all duration-300"
              >
                Send a message
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/work" className="text-body/50 hover:text-cx text-sm transition-colors">
            ← Back to all work
          </Link>
        </div>
      </div>
    </div>
  );
}
