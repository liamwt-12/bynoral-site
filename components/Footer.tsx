import Link from 'next/link';

import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface">
      <Container className="flex flex-col gap-6 py-10 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Bynoral</p>
        <div className="flex items-center gap-6">
          <Link href="/" className="transition hover:text-text-primary">
            Privacy
          </Link>
          <Link href="/" className="transition hover:text-text-primary">
            Terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}
