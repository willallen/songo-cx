'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const showSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid ? 'nav-glass shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
            showSolid ? 'text-navy' : 'text-white'
          }`}
        >
          Songo<span className="font-light ml-0.5">CX</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  showSolid
                    ? isActive
                      ? 'text-navy bg-cx-lighter'
                      : 'text-body hover:text-navy hover:bg-surface'
                    : isActive
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-5 py-2.5 rounded-lg text-sm font-semibold bg-cx text-white hover:bg-navy-light transition-all duration-200 hover:shadow-lg hover:shadow-cx/25"
          >
            Schedule a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            showSolid ? 'text-navy hover:bg-surface' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'text-navy bg-cx-lighter'
                      : 'text-body hover:text-navy hover:bg-surface'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 px-4 py-3 rounded-lg text-sm font-semibold bg-cx text-white text-center hover:bg-navy-light transition-colors"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
