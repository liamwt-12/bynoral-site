import Link from 'next/link';

import { AnimatedBackground, Card, Marquee, Pill, PricingCard, Section, TryVibeCard } from '../components';

const quickPayoffCards = [
  {
    title: 'No playlist upkeep',
    body: 'Your space stays consistent without daily staff decisions or repeated tracks.'
  },
  {
    title: 'Commercially safe by default',
    body: 'Designed for business use, so licensing stress does not interrupt your day.'
  },
  {
    title: 'Sound that adapts',
    body: 'Choose a vibe and intensity in seconds, then let it run reliably in the background.'
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

const spaces = ['Cafés', 'Barbers', 'Pilates', 'Boutiques', 'Clinics', 'Co-working', 'Studios'];

export default function Home() {
  return (
    <>
      <Section className="relative overflow-hidden pb-8 pt-14 sm:pt-20 lg:pb-16 lg:pt-24" containerClassName="max-w-[84rem]">
        <AnimatedBackground />

        <div className="space-y-10 lg:space-y-14">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,430px)] lg:gap-12">
            <div className="space-y-6 sm:space-y-7">
              <p className="hero-reveal text-xs uppercase tracking-[0.2em] text-text-muted">Commercial sound, simplified</p>
              <h1 className="hero-reveal max-w-4xl font-heading text-4xl leading-[0.98] tracking-tight text-text-primary sm:text-6xl lg:text-[4.6rem]">
                <span className="inline bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text text-transparent">
                  Sound
                </span>{' '}
                <span className="inline">designed for spaces.</span>
              </h1>
              <p className="hero-reveal max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg lg:text-xl">
                Calm, consistent background sound for cafés, studios and workspaces — without playlists, ads
                or licensing stress.
              </p>
              <div className="hero-reveal flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
                <Link
                  href="/player"
                  className="hero-cta inline-flex items-center justify-center rounded-full border border-accent/70 bg-gradient-to-b from-accent to-accent/85 px-6 py-3 text-sm font-semibold text-surface shadow-[0_10px_30px_rgba(47,111,94,0.25)] transition duration-250 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(47,111,94,0.36)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
                >
                  <span className="relative z-10">Start playing</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center rounded-full border border-border/80 bg-surface/70 px-4 py-2.5 text-sm font-medium text-text-muted transition duration-250 hover:-translate-y-0.5 hover:border-accent/40 hover:text-text-primary focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-text-primary/15 sm:px-5 sm:py-3"
                >
                  See how it works
                </Link>
              </div>
              <div className="hero-reveal flex flex-wrap items-center gap-2 pt-1 text-[0.65rem] uppercase tracking-[0.16em] text-text-muted sm:text-xs">
                <Pill className="!border-border/80 !bg-surface/80 !px-3 !py-1.5 !text-text-muted">No ads</Pill>
                <Pill className="!border-border/80 !bg-surface/80 !px-3 !py-1.5 !text-text-muted">No vocals</Pill>
                <Pill className="!border-border/80 !bg-surface/80 !px-3 !py-1.5 !text-text-muted">No repetition</Pill>
                <Pill className="!border-border/80 !bg-surface/80 !px-3 !py-1.5 !text-text-muted">No PRS/PPL required</Pill>
              </div>
            </div>

            <Card className="hero-reveal relative space-y-5 border-white/20 bg-white/45 p-5 shadow-[0_24px_70px_rgba(19,30,27,0.14)] backdrop-blur-xl sm:p-7">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-text-muted">Quick payoff</p>
              <h2 className="text-2xl leading-tight sm:text-3xl">Make the room feel right in under 10 seconds.</h2>
              <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                Choose a vibe, press play, and keep your atmosphere consistent all day.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 sm:gap-2">
                {['Still', 'Warmth', 'Focus'].map((vibe) => (
                  <div key={vibe} className="rounded-2xl border border-border/80 bg-surface/70 px-3 py-2 text-center text-xs text-text-primary">
                    {vibe}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="hero-reveal rounded-full border border-border/75 bg-surface/70 px-4 py-3 backdrop-blur-sm sm:px-6">
            <Marquee items={spaces} label="Loved by spaces like yours" />
          </div>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-2 lg:pt-4">
        <TryVibeCard />
      </Section>

      <Section className="pt-8 lg:pt-12">
        <div className="space-y-8 lg:space-y-10">
          <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">Why teams switch quickly</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {quickPayoffCards.map((item) => (
              <Card key={item.title} className="space-y-3 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]">
                <h3 className="text-xl leading-snug">{item.title}</h3>
                <p className="text-sm leading-relaxed sm:text-base">{item.body}</p>
              </Card>
            ))}
          </div>
          <details className="rounded-3xl border border-border bg-surface/70 p-6 shadow-[0_10px_30px_rgba(30,30,30,0.06)]">
            <summary className="cursor-pointer list-none text-sm font-medium uppercase tracking-[0.14em] text-text-muted [&::-webkit-details-marker]:hidden">
              Deep dive: how this differs from normal playlists
            </summary>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted sm:text-base">
              <p>
                Bynoral is not a track library. It generates continuous, non-repeating soundscapes designed for physical spaces,
                so the atmosphere stays coherent from open to close.
              </p>
              <p>
                You control the overall emotional direction with vibe and intensity, then let it run in the background without
                the maintenance burden of finding, rotating, and policing playlists.
              </p>
            </div>
          </details>
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

      <Section className="pb-28 pt-10 sm:pb-20">
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
