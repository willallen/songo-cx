import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Differentiators from '@/components/home/Differentiators';
import ServiceCards from '@/components/home/ServiceCards';
import SocialProof from '@/components/home/SocialProof';
import CTABanner from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: {
    absolute: 'Songo CX | Genesys Cloud Consulting | BYOC, Migrations & Integrations',
  },
  description:
    'Expert Genesys Cloud consulting for contact centers. PureConnect migrations, BYOC carrier architecture, Architect flows, and deep CRM integrations. Serving nationwide.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentiators />
      <ServiceCards />
      <SocialProof />
      <CTABanner />
    </>
  );
}
