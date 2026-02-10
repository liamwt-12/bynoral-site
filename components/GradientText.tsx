import type { ReactNode } from 'react';

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={[
        'bg-gradient-to-r from-text-primary via-accent/80 to-text-primary bg-clip-text text-transparent',
        className
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  );
}
