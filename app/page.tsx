'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Card, Section } from '../components';

const trustedBy = ['Aster Studio', 'Northline Co.', 'Marlow Clinics', 'Pine & Beam', 'Foundry Coffee', 'Luma Pilates', 'Verde Clinic', 'Atelier North'];

const liveStatuses = ['Shaping ambience…', 'Reducing chatter…', 'Smoothing transitions…'];

const getServiceWindow = (hour: number) => {
  if (hour >= 6 && hour < 11) return 'Morning Service';
  if (hour >= 11 && hour < 16) return 'Midday Flow';
  return 'After Hours';
};

const getLocalClock = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

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
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % liveStatuses.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLine = `${getLocalClock(currentTime)} — ${getServiceWindow(currentTime.getHours())}`;

  return (
    <>
      <Section className="relative min-h-[100svh] overflow-hidden bg-[#0F1115] pb-20 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[#0F1115]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(90%_70%_at_12%_14%,rgba(39,47,66,0.36),transparent_70%),radial-gradient(90%_70%_at_82%_10%,rgba(35,40,54,0.24),transparent_66%),radial-gradient(75%_70%_at_50%_96%,rgba(20,24,33,0.5),transparent_68%)] animate-[aurora-drift_44s_ease-in-out_infinite_alternate]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_40%,rgba(5,7,10,0.44)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.6)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-5xl flex-col justify-center gap-10">
          <div className="space-y-8">
            <h1 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.02em] text-[#F4F6FA] sm:text-6xl lg:text-7xl">
              Music is the mood.
              <br />
              Most businesses treat it as an afterthought.
            </h1>

            <p className="max-w-max font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#A3ACBC]">
              {timeLine}
              <br />
              <span className="text-[#7D8698]">System ready.</span>
            </p>

            <p className="pointer-events-none pl-3 font-['Caveat',cursive] text-xl text-[#C8CEDA]/30 rotate-[-4deg] sm:pl-10">set and forget.</p>
          </div>

          <div className="flex flex-col items-center gap-3 pt-2">
            <Link
              href="/player"
              aria-label="Start Session"
              className="group relative inline-flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_28%,#2B303C_0%,#1A1E27_55%,#141820_100%)] text-[#E7EBF2] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_38px_rgba(113,129,162,0.16),0_18px_48px_rgba(0,0,0,0.48)] transition duration-300 hover:border-white/25"
            >
              <span className="absolute inset-[-8px] rounded-full bg-[radial-gradient(circle,rgba(120,133,160,0.24)_0%,transparent_70%)] opacity-80" />
              <svg viewBox="0 0 24 24" className="relative z-10 h-8 w-8 translate-x-0.5 fill-current" aria-hidden="true">
                <path d="M8 6v12l10-6-10-6Z" />
              </svg>
            </Link>
            <span className="text-xs uppercase tracking-[0.22em] text-[#9AA4B6]">Start Session</span>
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
