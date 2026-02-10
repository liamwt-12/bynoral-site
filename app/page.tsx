import Link from 'next/link';

import { Card, Pill, PricingCard, Section } from '../components';

const problemPoints = [
  {
    icon: '↻',
    title: 'Playlists repeat',
    body: 'Playlists repeat — and staff change them every shift'
  },
  {
    icon: '•',
    title: 'Ads slip in',
    body: 'Ads slip in at the worst moments'
  },
  {
    icon: '≈',
    title: 'Vibe drifts',
    body: 'The vibe is inconsistent day to day'
  },
  {
    icon: '✓',
    title: 'Licensing risk',
    body: 'Licensing is unclear and easy to get wrong'
  }
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

const audiences = ['Cafés', 'Yoga & Pilates', 'Barbers & salons', 'Boutiques', 'Clinics', 'Co-working'];

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

const demoStrip = [
  { name: 'Still', detail: 'Low stimulation for quieter moments.' },
  { name: 'Warmth', detail: 'Social, inviting tone for welcoming spaces.' },
  { name: 'Focus', detail: 'Helps reduce chatter in busy environments.' }
];

export default function Home() {
  return (
    <>
      <Section className="relative overflow-hidden pb-14 pt-24 sm:pt-28 lg:pb-20 lg:pt-32" containerClassName="max-w-[84rem]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-ambient absolute left-1/2 top-8 h-[34rem] w-[90%] max-w-6xl -translate-x-1/2 rounded-[50%]" />
        </div>

        <div className="space-y-14 lg:space-y-16">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Commercial sound, simplified</p>
            <h1 className="max-w-4xl font-heading text-5xl leading-[1.04] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              <span className="inline">Sound </span>
              <span className="inline bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent">
                designed
              </span>{' '}
              <span className="inline">for spaces.</span>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-text-muted lg:text-xl">
              Calm, consistent background sound for cafés, studios and workspaces — without playlists,
              ads or licensing stress.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/player"
                className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-7 py-3.5 text-sm font-medium text-surface transition duration-200 hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
              >
                Start playing
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-text-muted transition duration-200 hover:text-text-primary focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-text-primary/15"
              >
                See how it works
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs uppercase tracking-[0.18em] text-text-muted">
              <Pill className="!border-border/70 !bg-surface/80 !text-text-muted">No ads</Pill>
              <Pill className="!border-border/70 !bg-surface/80 !text-text-muted">No vocals</Pill>
              <Pill className="!border-border/70 !bg-surface/80 !text-text-muted">No repetition</Pill>
              <Pill className="!border-border/70 !bg-surface/80 !text-text-muted">No PRS/PPL required</Pill>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {demoStrip.map((item) => (
              <Card
                key={item.name}
                className="space-y-2 border-border/80 bg-surface/85 p-5 shadow-[0_14px_36px_rgba(30,30,30,0.06)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{item.name}</p>
                <p className="text-sm leading-relaxed text-text-primary">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-12 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Card className="space-y-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]">
            <h2 className="max-w-lg text-3xl leading-tight sm:text-4xl">Most spaces are winging it.</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {problemPoints.map((item) => (
                <div key={item.body} className="rounded-2xl border border-border/80 bg-background/50 p-4">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-sm text-text-primary">
                    <span aria-hidden="true">{item.icon}</span>
                  </div>
                  <p className="text-sm font-medium text-text-primary">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-base text-text-primary">Sound shouldn’t be another thing to manage.</p>
          </Card>

          <Card className="space-y-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]">
            <h2 className="max-w-lg text-3xl leading-tight sm:text-4xl">
              Bynoral isn’t music. It’s sound infrastructure.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              Continuous, non-repeating sound designed to support your space — not distract from it.
              No tracks. No artists. No decisions. Just press play.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="space-y-10 lg:space-y-12">
          <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">How it works</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative">
                {idx < steps.length - 1 ? (
                  <span
                    className="pointer-events-none absolute left-[2.35rem] top-12 hidden h-px w-[calc(100%-1rem)] bg-border md:block"
                    aria-hidden="true"
                  />
                ) : null}
                <Card className="relative space-y-4 border-border/80">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-text-primary">
                    {idx + 1}
                  </div>
                  <h3 className="text-2xl leading-snug">{step.title}</h3>
                  <p className="text-sm leading-relaxed sm:text-base">{step.body}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-10 lg:space-y-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">Vibes for every part of the day</h2>
            <div className="hidden rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted md:block">
              Optional toggle: Reduce background chatter
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => (
              <Card
                key={vibe.name}
                className="space-y-3 border-border/80 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_20px_44px_rgba(47,111,94,0.14)]"
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
        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-3xl leading-tight sm:text-4xl">Who it&apos;s for</h2>
          <div className="flex max-w-4xl flex-wrap gap-3">
            {audiences.map((audience) => (
              <Pill key={audience} className="!bg-surface !px-4 !py-2 !text-sm !normal-case !tracking-normal">
                {audience}
              </Pill>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-8 lg:space-y-10">
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

      <Section className="pt-10">
        <Card className="space-y-6 py-14 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl leading-tight sm:text-4xl">
            Sound your space once. Never think about it again.
          </h2>
          <div>
            <Link
              href="/player"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-surface transition duration-200 hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
            >
              Start playing
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
