import type { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-white/45 bg-white/70 p-8 shadow-[0_18px_50px_rgba(20,20,20,0.09)] backdrop-blur-xl',
        className
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </div>
  );
}
