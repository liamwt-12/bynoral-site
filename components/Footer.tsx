import { Container } from './Container';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-white/55">
      <Container className="py-10">
        <p className="text-center text-sm tracking-[0.08em] text-text-muted">
          Commercially safe soundscapes for modern spaces. No ads. No vocals.
        </p>
      </Container>
    </footer>
  );
}
