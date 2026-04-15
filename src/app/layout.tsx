import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.songocx.com'),
  title: {
    default: 'Songo CX | Genesys Cloud Consulting',
    template: '%s | Songo CX',
  },
  description:
    'Expert Genesys Cloud consulting. PureConnect migrations, BYOC carrier architecture, Architect flows, and CRM integrations.',
  keywords: [
    'Genesys Cloud consultant',
    'PureConnect migration',
    'BYOC Genesys Cloud',
    'Genesys Cloud architect',
    'contact center consultant',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.songocx.com',
    siteName: 'Songo CX',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
