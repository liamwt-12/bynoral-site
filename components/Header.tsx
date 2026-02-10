import Link from 'next/link';

import { Container } from './Container';
import { GlassCard } from './GlassCard';

const navLinks = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
      <Container>
        <GlassCard className="flex items-center justify-between rounded-2xl border-white/55 bg-white/72 px-5 py-3 shadow-[0_8px_24px_rgba(30,30,30,0.07)] sm:px-6">
          <Link
            href="/"
            className="font-heading text-xl tracking-tight text-text-primary focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-text-primary/15"
          >
            bynoral
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition duration-200 hover:text-text-primary focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-text-primary/15"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/player"
            className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-surface transition duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
          >
            Start playing
          </Link>
        </GlassCard>
      </Container>
    </header>
  );
}
