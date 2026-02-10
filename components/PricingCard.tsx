import type { ReactNode } from 'react';

import { Button } from './Button';
import { GlassCard } from './GlassCard';
import { Glow } from './Glow';
import { Pill } from './Pill';

type PricingCardProps = {
  name: string;
  price: string;
  cadence?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  footer?: ReactNode;
};

export function PricingCard({
  name,
  price,
  cadence = '/month',
  features,
  highlighted = false,
  ctaLabel = 'Select plan',
  footer
}: PricingCardProps) {
  return (
    <GlassCard
      className={[
        'relative flex h-full flex-col gap-8 p-7',
        highlighted ? 'border-accent/40 bg-white/82 shadow-[0_24px_56px_rgba(47,111,94,0.16)]' : ''
      ]
        .join(' ')
        .trim()}
    >
      {highlighted ? <Glow className="-right-12 -top-12 h-56 w-56" /> : null}
      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-heading text-2xl text-text-primary">{name}</h3>
          {highlighted ? <Pill className="!normal-case !tracking-normal">Most popular</Pill> : null}
        </div>
        <p className="font-heading text-4xl leading-none tracking-tight text-text-primary">
          {price}
          <span className="ml-2 font-body text-base font-normal text-text-muted">{cadence}</span>
        </p>
      </div>

      <ul className="relative z-10 space-y-3 text-sm text-text-muted">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto space-y-4">
        <Button variant={highlighted ? 'primary' : 'secondary'} className="w-full">
          {ctaLabel}
        </Button>
        {footer ? <div className="text-sm text-text-muted">{footer}</div> : null}
      </div>
    </GlassCard>
  );
}
