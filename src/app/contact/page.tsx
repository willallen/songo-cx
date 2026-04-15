import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: { absolute: 'Contact | Songo CX' },
  description: 'Schedule a discovery call or send us a message. We respond within one business day.',
};

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      {/* Page header */}
      <div className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-24 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-cx/8 rounded-full blur-[100px]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-cx text-sm font-semibold uppercase tracking-wider mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Tell us what you&apos;re working on. We&apos;ll let you know if we&apos;re the right fit.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: Contact form — takes 3 cols */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-navy mb-8 tracking-tight">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Right: Direct options — takes 2 cols */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-navy mb-8 tracking-tight">Prefer to talk first?</h2>
            <div className="space-y-6">
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full px-8 py-6 rounded-2xl font-semibold bg-gradient-to-br from-navy-dark to-navy text-white hover:from-cx hover:to-navy-light transition-all duration-300 text-center shadow-lg shadow-navy/20"
              >
                <div className="text-lg mb-1">Schedule a 30-min Discovery Call</div>
                <div className="text-white/50 text-sm font-normal">Free, no obligation</div>
              </a>

              <div className="bg-surface rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cx-lighter flex items-center justify-center">
                    <svg className="w-4 h-4 text-cx" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-navy">Email us directly</p>
                </div>
                <a
                  href="mailto:hello@songocx.com"
                  className="text-cx hover:text-navy font-medium transition-colors text-sm"
                >
                  hello@songocx.com
                </a>
              </div>

              <div className="bg-cx-lighter rounded-2xl p-6 border border-cx/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-cx" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-navy">Response time</p>
                </div>
                <p className="text-body text-sm">
                  We respond to all inquiries within one business day.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-body/70 text-sm leading-relaxed italic">
                  We take on a limited number of engagements at a time. If we&apos;re not the right fit or
                  we&apos;re at capacity, we&apos;ll tell you directly rather than string you along.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
