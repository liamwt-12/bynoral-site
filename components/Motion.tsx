import type { ReactNode } from 'react';

type MotionPreset = 'fade' | 'slide-up' | 'shimmer';

export type MotionProps = {
  children?: ReactNode;
  className?: string;
  preset?: MotionPreset;
};

const presetClasses: Record<MotionPreset, string> = {
  fade: 'animate-[page-enter_0.45s_ease-out]',
  'slide-up': 'animate-[page-enter_0.5s_ease-out]',
  shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:animate-[shimmer_1.5s_ease-in-out_infinite]'
};

export function Motion({ children, className = '', preset = 'fade' }: MotionProps) {
  return <div className={[presetClasses[preset], className].join(' ').trim()}>{children}</div>;
}
