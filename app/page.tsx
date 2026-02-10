import { Card, Pill, PricingCard, Section } from '../components';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    features: ['Core workflows', 'Email support', 'Basic analytics']
  },
  {
    name: 'Growth',
    price: '$79',
    features: ['Advanced automation', 'Priority support', 'Custom integrations'],
    highlighted: true
  },
  {
    name: 'Scale',
    price: '$149',
    features: ['Dedicated success', 'Security controls', 'Performance reviews']
  }
];

export default function Home() {
  return (
    <>
      <Section className="pb-10 pt-20 sm:pt-24 lg:pt-28">
        <div className="space-y-10">
          <div className="space-y-5">
            <Pill>Design system preview</Pill>
            <h1 className="max-w-2xl font-heading text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Bynoral UI foundations
            </h1>
            <p className="max-w-2xl text-base leading-relaxed sm:text-lg">
              Baseline typography, spacing, and reusable components for upcoming page content.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <h2 className="text-xl">Typography</h2>
              <p className="mt-4 text-sm leading-relaxed">
                Fraunces for headings and Inter for body text.
              </p>
            </Card>
            <Card>
              <h2 className="text-xl">Spacing</h2>
              <p className="mt-4 text-sm leading-relaxed">
                Consistent vertical rhythm, container widths, and card padding.
              </p>
            </Card>
            <Card>
              <h2 className="text-xl">Components</h2>
              <p className="mt-4 text-sm leading-relaxed">
                Shared primitives used across layout, content sections, and pricing blocks.
              </p>
            </Card>
          </div>
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
            />
          ))}
        </div>
      </Section>
    </>
  );
}
