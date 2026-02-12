'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Container } from './Container';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-border-dark bg-[#0f1419]/82 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="text-xl tracking-tight text-text-primary transition hover:text-white hover:underline hover:decoration-accent hover:underline-offset-4 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          bynoral
        </Link>

        <Link
          href="/founding-50"
          className="text-sm font-medium uppercase tracking-[0.08em] text-text-muted transition hover:text-text-primary hover:underline hover:decoration-accent hover:underline-offset-4 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          founding 50
        </Link>
      </Container>
    </header>
  );
}
