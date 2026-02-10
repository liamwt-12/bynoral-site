import Link from 'next/link';

import { Card, Pill, PricingCard, Section } from '../components';

const problemPoints = [
  'Playlists repeat — and staff change them every shift',
  'Ads slip in at the worst moments',
  'The vibe is inconsistent day to day',
  'Licensing is unclear and easy to get wrong'
];

const steps = [
  {
    title: 'Choose a vibe',
    body: 'Calm, warm, focused or energised (designed for real spaces)'
  },
  {
    title: 'Set intensity',
    body: 'Quiet mornings. Busy afternoons. Softer evenings.'
  },
  {
    title: 'Press play',
    body: 'Runs all day, reliably and legally.'
  }
];

const vibes = [
  { name: 'Still', detail: 'low stimulation, soft textures' },
  { name: 'Balanced', detail: 'neutral, all-day default' },
  { name: 'Warmth', detail: 'social, inviting' },
  { name: 'Focus', detail: 'reduces background chatter' },
  { name: 'Lift', detail: 'subtle energy, no stress' },
  { name: 'Dusk', detail: 'slower, softer, settled' }
];

const benefits = [
  'No licensing stress — commercially safe soundscapes, no PRS/PPL needed',
  'No repetition — never loops or plays recognisable tracks',
  'Staff-proof — no playlists, no ads, no arguments'
];

const audiences = [
  'Cafés',
  'Yoga & Pilates',
  'Barbers & salons',
  'Boutiques',
  'Clinics',
  'Co-working'
];

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

export default function Home() {
  return (
    <>
      <Section className="pb-10 pt-20 sm:pt-24 lg:pt-32">
        <div className="space-y-10 lg:space-y-14">
          <div className="space-y-6">
            <h1 className="max-w-3xl bg-gradient-to-b from-text-primary via-text-primary to-text-muted/70 bg-clip-text font-heading text-5xl leading-[1.04] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Sound designed for spaces.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
              Calm, consistent background sound for cafés, studios and workspaces — without
              playlists, ads or licensing stress.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/player"
                className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-surface transition duration-200 hover:-translate-y-0.5 hover:bg-accent/90"
              >
                Start playing
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-text-muted transition duration-200 hover:text-text-primary"
              >
                See how it works
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-3 text-xs uppercase tracking-[0.18em] text-text-muted">
              <Pill className="!border-border/70 !bg-surface !text-text-muted">No ads</Pill>
              <Pill className="!border-border/70 !bg-surface !text-text-muted">No vocals</Pill>
              <Pill className="!border-border/70 !bg-surface !text-text-muted">No repetition</Pill>
              <Pill className="!border-border/70 !bg-surface !text-text-muted">No PRS/PPL required</Pill>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Card className="space-y-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]">
            <h2 className="text-3xl leading-tight">Most spaces are winging it.</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-text-muted sm:text-base">
              {problemPoints.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-base text-text-primary">Sound shouldn’t be another thing to manage.</p>
          </Card>

          <Card className="space-y-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]">
            <h2 className="text-3xl leading-tight">Bynoral isn’t music. It’s sound infrastructure.</h2>
            <p className="text-base leading-relaxed text-text-muted sm:text-lg">
              Continuous, non-repeating sound designed to support your space — not distract from it.
              No tracks. No artists. No decisions. Just press play.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="space-y-10">
          <h2 className="text-3xl leading-tight sm:text-4xl">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => (
              <Card
                key={step.title}
                className="space-y-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Step {idx + 1}</p>
                <h3 className="text-2xl leading-snug">{step.title}</h3>
                <p className="text-sm leading-relaxed sm:text-base">{step.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl leading-tight sm:text-4xl">Vibes for every part of the day</h2>
            <div className="hidden rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted md:block">
              Optional toggle: Reduce background chatter
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => (
              <Card
                key={vibe.name}
                className="space-y-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]"
              >
                <h3 className="text-2xl">{vibe.name}</h3>
                <p className="text-sm sm:text-base">{vibe.detail}</p>
              </Card>
            ))}
          </div>
          <p className="md:hidden rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted">
            Optional toggle: Reduce background chatter
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card
              key={benefit}
              className="transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]"
            >
              <p className="text-base leading-relaxed text-text-primary">{benefit}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight sm:text-4xl">Who it&apos;s for</h2>
          <div className="flex flex-wrap gap-3">
            {audiences.map((audience) => (
              <Pill key={audience} className="!bg-surface !px-4 !py-2 !text-sm !normal-case !tracking-normal">
                {audience}
              </Pill>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-8">
          <h2 className="text-3xl leading-tight sm:text-4xl">Pricing preview</h2>
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
        </div>
      </Section>

      <Section className="pt-8">
        <Card className="space-y-6 py-12 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl leading-tight sm:text-4xl">
            Sound your space once. Never think about it again.
          </h2>
          <div>
            <Link
              href="/player"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-surface transition duration-200 hover:-translate-y-0.5 hover:bg-accent/90"
            >
              Start playing
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
