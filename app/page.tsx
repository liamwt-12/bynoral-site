import Link from 'next/link';

import {
  GlassCard,
  Glow,
  GradientText,
  IconBadge,
  Motion,
  Pill,
  PricingCard,
  Section,
  SectionHeading
} from '../components';

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
  { name: 'Still', detail: 'Low stimulation, soft textures for quieter moments.' },
  { name: 'Balanced', detail: 'Neutral, all-day default for most spaces.' },
  { name: 'Warmth', detail: 'Social, inviting tone that feels naturally welcoming.' },
  { name: 'Focus', detail: 'Designed to support concentration during busier hours.' },
  { name: 'Lift', detail: 'Subtle energy, no stress, ideal for afternoon momentum.' },
  { name: 'Dusk', detail: 'Slower, softer, settled atmosphere for evening wind-down.' }
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

const trustPoints = ['No ads', 'No vocals', 'No repetition', 'No PRS/PPL required'];

export default function Home() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-24" containerClassName="max-w-[88rem]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Motion preset="fadeUp" className="space-y-8">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Commercial sound, simplified</p>
            <h1 className="max-w-4xl text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.1rem]">
              Sound <GradientText>designed</GradientText> for spaces.
            </h1>
            <p className="max-w-[62ch] text-lg leading-relaxed text-text-muted lg:text-xl">
              Calm, consistent background sound for cafés, studios and workspaces — without playlists,
              ads or licensing stress.
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
            <div className="flex flex-wrap gap-2.5 pt-1">
              {trustPoints.map((item) => (
                <Pill key={item} className="!border-border/70 !bg-white/75 !text-text-muted !normal-case !tracking-[0.08em]">
                  {item}
                </Pill>
              ))}
            </div>
          </Motion>

          <Motion preset="fadeUp" className="relative">
            <Glow className="-left-10 top-4 h-72 w-72" />
            <GlassCard className="relative overflow-hidden border-white/50 bg-white/74 p-7 sm:p-8">
              <Motion preset="shimmer" className="absolute inset-0 opacity-60" />
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Player preview</p>
                  <Pill className="!normal-case !tracking-normal">Balanced</Pill>
                </div>
                <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
                  <Glow className="left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2" />
                  <Motion
                    preset="slowPulse"
                    className="relative z-10 inline-flex h-28 w-28 items-center justify-center rounded-full border border-accent/40 bg-accent text-xl font-medium text-surface shadow-[0_20px_40px_rgba(47,111,94,0.28)]"
                  >
                    Play
                  </Motion>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-text-muted">
                    <span>Intensity</span>
                    <span>62%</span>
                  </div>
                  <div className="h-2 rounded-full bg-border/70">
                    <div className="h-full w-[62%] rounded-full bg-accent" />
                  </div>
                </div>
                <p className="text-sm text-text-primary">Now playing: Balanced — neutral, all-day default.</p>
              </div>
            </GlassCard>
          </Motion>
        </div>
      </Section>

      <Section className="pt-24 lg:pt-28">
        <div className="space-y-12">
          <SectionHeading
            eyebrow="The problem"
            title="Most spaces are still winging it."
            description="Sound shouldn’t be another thing to manage, yet most teams patch it together with playlists and workarounds."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problemPoints.map((item) => (
              <GlassCard key={item.title} className="space-y-4 p-6 transition duration-300 hover:-translate-y-1">
                <IconBadge>{item.icon}</IconBadge>
                <p className="text-lg text-text-primary">{item.title}</p>
                <p className="text-sm leading-relaxed text-text-muted">{item.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <GlassCard className="mx-auto max-w-5xl p-10 text-center sm:p-14">
          <p className="mx-auto max-w-4xl text-3xl leading-tight text-text-primary sm:text-4xl lg:text-5xl">
            Bynoral isn’t music. It’s sound infrastructure.
          </p>
          <p className="mx-auto mt-5 max-w-[68ch] text-base leading-relaxed text-text-muted sm:text-lg">
            Continuous, non-repeating sound designed to support your space — not distract from it. No
            tracks. No artists. No decisions. Just press play.
          </p>
        </GlassCard>
      </Section>

      <Section>
        <div className="space-y-12">
          <SectionHeading eyebrow="Simple workflow" title="How it works" />
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, idx) => (
              <GlassCard key={step.title} className="space-y-5 p-7">
                <p className="text-5xl leading-none text-text-primary/30">{String(idx + 1).padStart(2, '0')}</p>
                <div className="premium-divider" />
                <h3 className="text-2xl leading-snug">{step.title}</h3>
                <p className="text-sm leading-relaxed sm:text-base">{step.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-12">
          <SectionHeading
            eyebrow="Designed atmospheres"
            title="Vibes for every part of the day"
            description="Every mode is tuned for commercial spaces and transitions naturally as your day shifts."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => (
              <GlassCard
                key={vibe.name}
                className="space-y-3 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(47,111,94,0.14)]"
              >
                <h3 className="text-2xl">{vibe.name}</h3>
                <p className="text-sm leading-relaxed sm:text-base">{vibe.detail}</p>
              </GlassCard>
            ))}
            <GlassCard className="relative overflow-hidden border-accent/35 bg-accent/10 p-6 md:col-span-2 lg:col-span-1">
              <Glow className="-right-10 -top-10 h-52 w-52" />
              <p className="relative z-10 text-xs uppercase tracking-[0.16em] text-text-muted">Optional control</p>
              <p className="relative z-10 mt-3 text-2xl leading-snug text-text-primary">Reduce background chatter</p>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-text-muted">
                Enable a focused profile whenever your room gets loud.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Pricing preview"
            title="Transparent plans for one space or many"
            description="Start simple, then scale your sound across locations when you’re ready."
          />
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

      <Section className="pb-10 pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Sound your space once.
            <br />
            <span className="text-text-primary/70">Never think about it again.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-text-muted">
            Premium background sound, designed for commercial use from day one.
          </p>
          <div className="mt-10">
            <Link
              href="/player"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-8 py-3.5 text-sm font-medium text-surface transition duration-200 hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
            >
              Start playing
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
