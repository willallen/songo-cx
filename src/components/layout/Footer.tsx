import Link from 'next/link';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cx to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: wordmark + tagline + copyright */}
          <div>
            <div className="text-2xl font-bold tracking-tight mb-1">
              Songo<span className="font-light">CX</span>
            </div>
            <p className="text-white/50 text-sm mb-6">Expert Genesys Cloud delivery.</p>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Songo Partners LLC. All rights reserved.
            </p>
          </div>

          {/* Center: navigation */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Navigate</p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: contact + lore */}
          <div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Contact</p>
            <a
              href="mailto:hello@songocx.com"
              className="text-cx-light hover:text-white text-sm transition-colors duration-200 block mb-2"
            >
              hello@songocx.com
            </a>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white text-sm transition-colors duration-200 block"
            >
              Schedule a call →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
