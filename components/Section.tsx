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
    <section className={`py-20 sm:py-24 lg:py-28 ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
