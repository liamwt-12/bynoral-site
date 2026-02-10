import type { ReactNode } from 'react';

import { Container } from './Container';

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  children,
  className = '',
  containerClassName = ''
}: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
