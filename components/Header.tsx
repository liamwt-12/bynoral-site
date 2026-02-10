import Link from 'next/link';

import { Container } from './Container';

const navLinks = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-heading text-xl tracking-tight text-text-primary">
          Bynoral
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition duration-200 hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/player"
          className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-surface transition duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
        >
          Start playing
        </Link>
      </Container>
    </header>
  );
}
