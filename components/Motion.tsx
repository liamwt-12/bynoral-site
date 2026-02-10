import type { ReactNode } from 'react';

type MotionPreset = 'fadeUp' | 'shimmer' | 'slowPulse';

type MotionProps = {
  children: ReactNode;
  as?: 'div' | 'span';
  preset: MotionPreset;
  className?: string;
};

const motionClasses: Record<MotionPreset, string> = {
  fadeUp: 'motion-fade-up',
  shimmer: 'motion-shimmer',
  slowPulse: 'motion-slow-pulse'
};

export function Motion({ children, as = 'div', preset, className = '' }: MotionProps) {
  const Component = as;

  return (
    <Component className={[motionClasses[preset], className].join(' ').trim()}>{children}</Component>
  );
}
