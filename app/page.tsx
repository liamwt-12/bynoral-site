'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Card, Section } from '../components';

const trustedBy = ['Aster Studio', 'Northline Co.', 'Marlow Clinics', 'Pine & Beam', 'Foundry Coffee', 'Luma Pilates', 'Verde Clinic', 'Atelier North'];

const liveStatuses = ['Shaping ambience…', 'Reducing chatter…', 'Smoothing transitions…'];

const whyItWorks = [
  {
    title: 'Adaptive sound engine',
    body: 'Vibe and intensity flex with your day so your atmosphere never feels static.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M4 15c2.5-4 5.5-6 8-6s5.5 2 8 6" />
        <path d="M4 9c2.5 4 5.5 6 8 6s5.5-2 8-6" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    )
  },
  {
    title: 'Commercially safe',
    body: 'Purpose-built for business playback, so teams can press play without compliance stress.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z" />
        <path d="m9.5 11.5 2 2 3.5-4" />
      </svg>
    )
  },
  {
    title: 'Set and forget reliability',
    body: 'No playlists, no skipped tracks, no awkward transitions when staff changes shifts.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="3" />
        <path d="M8 12h8" />
        <path d="M12 9v6" />
      </svg>
    )
  }
];

const useCases = [
  {
    label: 'Coffee rush',
    copy: 'Lift energy without chaos. Keep queues moving while the room still feels intentional.'
  },
  {
    label: 'Treatment rooms',
    copy: 'Gentle low-stimulation textures that calm nerves before consultations and procedures.'
  },
  {
    label: 'Boutique retail',
    copy: 'Premium atmosphere that supports dwell time and makes the brand feel more elevated.'
  },
  {
    label: 'Morning classes',
    copy: 'Focused momentum for reformer/yoga flows that need clarity and consistency.'
  }
];

export default function Home() {
  const [selectedCase, setSelectedCase] = useState(useCases[0]);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % liveStatuses.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <Section className="relative min-h-[85svh] overflow-hidden pb-36 pt-12 sm:min-h-[78svh] sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(47,111,94,0.32),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(144,166,159,0.26),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(17,32,29,0.28),transparent_52%),linear-gradient(145deg,#f5f2ec_0%,#e8f0ec_42%,#f4eee7_100%)]" />
        <div className="hero-aurora pointer-events-none absolute inset-0" />
        <div className="hero-vignette pointer-events-none absolute inset-0" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-noise pointer-events-none absolute inset-0" />

        <div className="relative z-10 space-y-7">
          <p className="hero-reveal text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">Commercial sound, beautifully automated</p>
          <h1 className="hero-reveal max-w-3xl text-5xl leading-[0.94] tracking-tight text-[#10221c] drop-shadow-[0_2px_0_rgba(255,255,255,0.28)] sm:text-6xl">
            Give your space a{' '}
            <span className="bg-gradient-to-r from-[#1b4a3d] via-[#2f6f5e] to-[#5f9383] bg-clip-text text-transparent">premium pulse</span>.
          </h1>
          <p className="hero-reveal max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Bynoral creates continuous, non-repeating soundscapes for cafés, studios and clinics—so every hour feels on-brand.
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/player"
              className="hero-cta group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-accent/80 bg-gradient-to-b from-accent to-[#245547] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(47,111,94,0.35)] transition duration-300 hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.985]"
            >
              <span className="relative z-10">Start playing</span>
            </Link>
            <Link
              href="/how-it-works"
              className="hero-cta inline-flex items-center rounded-full border border-border/80 bg-white/75 px-5 py-3 text-sm font-medium text-text-primary backdrop-blur transition hover:border-accent/50 active:translate-y-[1px] active:scale-[0.985]"
            >
              Explore product
            </Link>
          </div>

          <div className="hero-reveal flex flex-wrap gap-2 pt-1 text-[0.66rem] uppercase tracking-[0.18em] text-text-muted">
            {['No ads', 'No vocals', 'No repetition', 'No PRS/PPL needed'].map((item) => (
              <span key={item} className="rounded-full border border-white/50 bg-white/55 px-3 py-1.5 backdrop-blur">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section className="-mt-28 pt-0 sm:-mt-16">
        <div className="mobile-player-alive relative overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-b from-white/90 to-white/70 p-5 shadow-[0_24px_65px_rgba(19,30,27,0.15)] backdrop-blur">
          <div className="mb-4 flex items-center justify-between text-xs text-text-muted">
            <span className="uppercase tracking-[0.17em]">Live product preview</span>
            <span>{liveStatuses[statusIndex]}</span>
          </div>
          <div className="rounded-2xl border border-accent/15 bg-[#111a17] p-4 text-white">
            <div className="mb-4 h-32 rounded-xl bg-[radial-gradient(circle_at_20%_30%,rgba(117,168,154,0.36),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(47,111,94,0.48),transparent_45%),linear-gradient(125deg,#172621,#0e1714)] p-3">
              <div className="equalizer playing flex h-full items-end gap-1.5">
                <span style={{ height: '14px' }} />
                <span style={{ height: '24px' }} />
                <span style={{ height: '16px' }} />
                <span style={{ height: '22px' }} />
                <span style={{ height: '18px' }} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Balanced / Midday Lift</p>
                  <p className="text-xs text-emerald-100/75">Intensity 62% • Dynamic mode</p>
                </div>
                <span className="live-badge rounded-full border border-emerald-200/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.16em]">Live</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20">
                <div className="preview-progress h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-200 to-emerald-400" />
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-100/80">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                {liveStatuses[statusIndex]}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Trusted by</p>
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface/70 p-2">
              <div className="marquee-content flex min-w-max items-center gap-2 pr-2">
                {[...trustedBy, ...trustedBy].map((name, index) => (
                  <span key={`${name}-${index}`} className="rounded-full border border-border/80 bg-white/80 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-2 rounded-2xl border border-accent/15 bg-accent/5 p-4 text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent sm:grid-cols-3 sm:text-xs">
            <span className="rounded-full border border-accent/20 bg-white/80 px-3 py-2">PRS/PPL safe</span>
            <span className="rounded-full border border-accent/20 bg-white/80 px-3 py-2">No adverts</span>
            <span className="rounded-full border border-accent/20 bg-white/80 px-3 py-2">Never repeats</span>
          </div>

          <div>
            <h2 className="mb-4 text-3xl leading-tight sm:text-4xl">Why it works</h2>
            <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:[grid-template-columns:repeat(3,minmax(0,1fr))]">
              {whyItWorks.map((item) => (
                <Card key={item.title} className="min-w-[84%] snap-start space-y-3 border-white/65 bg-white/78 p-5 sm:min-w-0">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <h3 className="text-xl leading-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h2 className="text-3xl leading-tight sm:text-4xl">Use cases</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {useCases.map((item) => {
                const active = selectedCase.label === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedCase(item)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active ? 'border-accent bg-accent text-white shadow-[0_8px_20px_rgba(47,111,94,0.3)]' : 'border-border bg-white text-text-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <p key={selectedCase.label} className="mt-4 min-h-[48px] animate-[page-enter_0.25s_ease-out] text-sm leading-relaxed sm:text-base">
              {selectedCase.copy}
            </p>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-10">
        <Card className="space-y-6 border-white/70 bg-gradient-to-b from-white to-[#f0f8f5] py-12 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl">Launch a richer atmosphere in minutes.</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/player"
              className="hero-cta inline-flex items-center justify-center rounded-full border border-accent/80 bg-gradient-to-b from-accent to-[#25584b] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(47,111,94,0.32)] active:translate-y-[1px] active:scale-[0.985]"
            >
              Start free
            </Link>
            <Link href="/how-it-works" className="rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-text-muted">
              See how it works
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
