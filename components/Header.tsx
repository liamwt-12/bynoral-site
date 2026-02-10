import Link from 'next/link';

import { Button } from './Button';
import { Container } from './Container';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-heading text-xl tracking-tight text-text-primary">
          Bynoral
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-text-muted transition hover:text-text-primary">
            Home
          </Link>
          <Link href="/" className="text-sm text-text-muted transition hover:text-text-primary">
            Components
          </Link>
          <Link href="/" className="text-sm text-text-muted transition hover:text-text-primary">
            Pricing
          </Link>
        </nav>

        <Button variant="secondary">Sign in</Button>
      </Container>
    </header>
  );
}
