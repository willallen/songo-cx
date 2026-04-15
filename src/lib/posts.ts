export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  readTime: string;
  excerpt: string;
}

export const posts: Post[] = [
  {
    slug: 'call-transcript-analytics',
    title: 'Extracting Structured Data from Call Transcripts in Genesys Cloud',
    date: 'April 2026',
    tag: 'Analytics & AI',
    readTime: '8 min read',
    excerpt:
      'Genesys Cloud transcription gives you raw text. Here\'s how to turn that into structured data — sentiment scores, compliance flags, QA scorecards — automatically, at scale.',
  },
  {
    slug: 'multi-region-disaster-recovery',
    title: 'Custom Disaster Recovery Middleware for Multi-Region Genesys Cloud',
    date: 'March 2026',
    tag: 'Architecture',
    readTime: '10 min read',
    excerpt:
      "Genesys Cloud is region-bound. If your region goes down, so does your contact center. Here's the middleware architecture we use to build active/passive DR that actually works.",
  },
  {
    slug: 'voice-ai-sip-integration',
    title: 'Connecting AI Voice Agents to Genesys Cloud via SIP: VAPI, Dialogflow, and LiveKit',
    date: 'February 2026',
    tag: 'Voice AI',
    readTime: '12 min read',
    excerpt:
      'VAPI, Google Dialogflow CX, and LiveKit all speak SIP. Genesys Cloud speaks SIP. Here\'s how to wire them together so AI agents handle calls inside your existing contact center infrastructure.',
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
