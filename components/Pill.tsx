import type { ReactNode } from 'react';

type PillProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className = '' }: PillProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent',
        className
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  );
}
