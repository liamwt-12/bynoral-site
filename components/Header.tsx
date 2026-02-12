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
        scrolled ? 'border-b border-white/10 bg-black/60 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="text-xl tracking-tight text-[#f5f5f3] transition hover:text-[#f5f5f3] hover:underline hover:decoration-[#c18745] hover:underline-offset-4 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          bynoral
        </Link>

        <Link
          href="/founding-50"
          className="text-sm font-medium uppercase tracking-[0.08em] text-[#ebe6dc] transition hover:text-[#f5f5f3] hover:underline hover:decoration-[#c18745] hover:underline-offset-4 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          founding 50
        </Link>
      </Container>
    </header>
  );
}
