import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-border bg-surface p-8 shadow-[0_10px_40px_rgba(30,30,30,0.06)]',
        className
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </div>
  );
}
