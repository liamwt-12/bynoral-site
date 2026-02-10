import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className = '' }: SectionHeadingProps) {
  return (
    <div className={['space-y-4', className].join(' ').trim()}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="max-w-3xl text-4xl leading-[1.12] tracking-tight text-text-primary sm:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
