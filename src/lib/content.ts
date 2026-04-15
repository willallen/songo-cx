export type ContentType = 'case-study' | 'article';

export interface WorkItem {
  slug: string;
  type: ContentType;
  title: string;
  date: string;
  dateISO: string; // ISO 8601 for JSON-LD
  tag: string;
  readTime: string;
  excerpt: string;
  outcome?: string; // case studies only
}

export const workItems: WorkItem[] = [
  // ── Case Studies ──────────────────────────────────────────
  {
    slug: 'pureconnect-migration-financial-services',
    type: 'case-study',
    title: 'Moving a 300-Agent Contact Center off PureConnect in 90 Days',
    date: 'Q1 2026',
    dateISO: '2026-01-01',
    tag: 'Financial Services · Migration',
    readTime: '6 min read',
    excerpt:
      'A stalled migration inherited from a prior SI. Ninety days to go-live. Here\'s how we completed the Architect flow rebuild, BYOC cutover, and WFM migration on schedule.',
    outcome: 'Go-live Day 87 · Zero carrier outages on cutover',
  },
  {
    slug: 'byoc-e911-healthcare',
    type: 'case-study',
    title: 'BYOC Cloud with Multi-Site E911 Compliance Across Four Facilities',
    date: 'Q4 2025',
    dateISO: '2025-10-01',
    tag: 'Healthcare · Carrier Architecture',
    readTime: '7 min read',
    excerpt:
      'Complex BYOC Cloud deployment with strict E911 requirements across four geographically dispersed facilities. SBC certification, SIP trunk redundancy, and a compliance deadline.',
    outcome: 'Full E911 compliance · 99.99% voice uptime achieved',
  },
  {
    slug: 'salesforce-screenpop-retail',
    type: 'case-study',
    title: 'Real-Time Salesforce Screen Pop for a 150-Agent Service Team',
    date: 'Q3 2025',
    dateISO: '2025-07-01',
    tag: 'Retail · Integrations',
    readTime: '5 min read',
    excerpt:
      'A 150-agent team answering calls blind — no context, no case history at answer. We built Genesys Cloud Data Actions to pull live Salesforce data on inbound, cutting AHT by 18%.',
    outcome: 'AHT reduced 18% · Zero custom middleware required',
  },

  // ── Articles ──────────────────────────────────────────────
  {
    slug: 'call-transcript-analytics',
    type: 'article',
    title: 'Extracting Structured Data from Call Transcripts in Genesys Cloud',
    date: 'April 2026',
    dateISO: '2026-04-01',
    tag: 'Analytics & AI',
    readTime: '8 min read',
    excerpt:
      'Genesys Cloud transcription gives you raw text. Here\'s how to turn that into structured data — sentiment scores, compliance flags, QA scorecards — automatically, at scale.',
  },
  {
    slug: 'multi-region-disaster-recovery',
    type: 'article',
    title: 'Custom Disaster Recovery Middleware for Multi-Region Genesys Cloud',
    date: 'March 2026',
    dateISO: '2026-03-01',
    tag: 'Architecture',
    readTime: '10 min read',
    excerpt:
      "Genesys Cloud is region-bound. If your region goes down, so does your contact center. Here's the middleware architecture we use to build active/passive DR that actually works.",
  },
  {
    slug: 'voice-ai-sip-integration',
    type: 'article',
    title: 'Connecting AI Voice Agents to Genesys Cloud via SIP: VAPI, Dialogflow, and LiveKit',
    date: 'February 2026',
    dateISO: '2026-02-01',
    tag: 'Voice AI',
    readTime: '12 min read',
    excerpt:
      'VAPI, Google Dialogflow CX, and LiveKit all speak SIP. Genesys Cloud speaks SIP. Here\'s how to wire them together so AI agents handle calls inside your existing contact center infrastructure.',
  },
];

export function getWorkItem(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}

export function getCaseStudies(): WorkItem[] {
  return workItems.filter((item) => item.type === 'case-study');
}

export function getArticles(): WorkItem[] {
  return workItems.filter((item) => item.type === 'article');
}
