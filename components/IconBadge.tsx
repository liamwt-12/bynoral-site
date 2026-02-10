import type { ReactNode } from 'react';

type IconBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function IconBadge({ children, className = '' }: IconBadgeProps) {
  return (
    <span
      className={[
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/80 text-sm text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
        className
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  );
}
