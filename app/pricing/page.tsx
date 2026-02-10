import { PricingCard, Section } from '../../components';

const plans = [
  {
    name: 'Single Space',
    price: '£19',
    features: ['1 location', '3 vibes']
  },
  {
    name: 'Branded Space',
    price: '£29',
    features: ['1 location', '6–8 vibes', 'time-of-day shifts', 'chatter reduction'],
    highlighted: true,
    footer: 'Most popular'
  },
  {
    name: 'Multi-Location',
    price: '£79',
    features: ['up to 5 locations', 'central control']
  }
];

const addOns = [
  'Extra locations: £10/mo each',
  'Signature sound pack: £99 one-off (coming soon)',
  'Offline mode: £5/mo (coming soon)'
];

export default function PricingPage() {
  return (
    <>
      <Section className="pb-10 pt-20 sm:pt-24 lg:pt-32">
        <div className="space-y-5">
          <h1 className="max-w-3xl font-heading text-5xl leading-tight tracking-tight text-text-primary sm:text-6xl">
            Pricing
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Simple pricing for spaces that care about atmosphere.
          </p>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              highlighted={plan.highlighted}
              footer={plan.footer}
              ctaLabel="Start playing"
              cadence="/mo"
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl space-y-5 rounded-3xl border border-border bg-surface p-8 shadow-[0_10px_40px_rgba(30,30,30,0.06)]">
          <h2 className="text-3xl leading-tight">Add-ons</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-text-muted sm:text-base">
            {addOns.map((addOn) => (
              <li key={addOn} className="flex items-start gap-3">
                <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span>{addOn}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
