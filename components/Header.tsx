'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Container } from './Container';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0B1018]/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent backdrop-blur-0'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="font-heading text-xl tracking-tight text-[#E7EBF2] transition-colors hover:text-[#F2F5FA] focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          Bynoral
        </Link>

        <Link
          href="/founding-50"
          className="text-sm font-medium tracking-[0.08em] text-[#C9D2E3] uppercase transition-colors hover:text-[#F0F4FA] focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          Apply
        </Link>
      </Container>
    </header>
  );
}
