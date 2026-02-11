'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Section } from '../components';

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

const faqItems = [
  {
    question: 'Is this just Spotify?',
    answer:
      'No. Bynoral is built for café service, with day-part-aware playback that stays consistent without staff curating playlists all shift.'
  },
  {
    question: 'Do I need a PRS/PPL licence?',
    answer:
      'Most UK venues need TheMusicLicence to play commercial music. Bynoral uses royalty-free / properly licensed music, so you can play it without PRS/PPL.'
  },
  {
    question: 'What do I need to run it?',
    answer: 'A tablet or laptop connected to your café speaker system is enough to run a full day of playback.'
  },
  {
    question: 'Can staff change it?',
    answer:
      'Yes. Staff can use an optional override when needed, then return to the default day-part flow for hands-off operation.'
  }
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState(() => new Date());

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

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-5xl flex-col justify-center gap-8">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.02em] text-[#F4F6FA] sm:text-6xl lg:text-7xl">
              Music for cafés.
              <br />
              Done properly.
            </h1>

            <p className="max-w-2xl text-lg text-[#D2D8E4] sm:text-xl">Set it once. Let it run all day.</p>
            <p className="text-sm text-[#9DA7BA]">It follows the rhythm of a café day — automatically.</p>

            <p className="max-w-max font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#A3ACBC]">
              {timeLine.toUpperCase()} + SYSTEM READY
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/player"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#E7EBF2] transition hover:border-white/40 hover:bg-white/[0.04]"
            >
              <span aria-hidden="true">▶</span>
              Start Session
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-[#10141B] py-20 text-[#E8ECF3] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">When music depends on staff, your atmosphere does too.</h2>
          <ul className="space-y-3 text-lg text-[#B8C1D2]">
            <li>Playlists repeat.</li>
            <li>The mood shifts with the rota.</li>
            <li>Someone forgets to put it on.</li>
            <li>Ads / awkward moments creep in.</li>
          </ul>
        </div>
      </Section>

      <Section className="bg-[#0F1115] py-20 text-[#E8ECF3] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Bynoral handles it.</h2>
          <p className="text-2xl leading-relaxed text-[#C4CDDC] sm:text-3xl">Switch it on in the morning.</p>
          <p className="text-2xl leading-relaxed text-[#C4CDDC] sm:text-3xl">Let it run.</p>
          <p className="text-2xl leading-relaxed text-[#C4CDDC] sm:text-3xl">Close the door at night.</p>
        </div>
      </Section>

      <Section className="bg-[#10141B] py-20 text-[#E8ECF3] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Modes</h2>
          <p className="text-lg text-[#B8C1D2]">Default day-part flow with optional staff override.</p>
          <ul className="space-y-4 text-xl text-[#CDD4E1] sm:text-2xl">
            <li>Morning Service — warm, calm, open</li>
            <li>Midday Flow — steady, unobtrusive, consistent</li>
            <li>After Hours — deeper, softer, slower</li>
          </ul>
        </div>
      </Section>

      <Section className="bg-[#0F1115] py-20 text-[#E8ECF3] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Founding 50 Cafés</h2>
          <p className="text-lg text-[#B8C1D2]">Free for 3 months. No card. Honest feedback expected.</p>
          <Link
            href="/founding-50"
            className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#E7EBF2] transition hover:border-white/40 hover:bg-white/[0.04]"
          >
            Apply <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section className="bg-[#10141B] py-20 text-[#E8ECF3] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-2">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">£29 / month per café</h2>
          <p className="text-sm text-[#9DA7BA]">Cancel anytime.</p>
        </div>
      </Section>

      <Section className="bg-[#0F1115] pb-24 pt-20 text-[#E8ECF3] sm:pt-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="border-b border-white/10 pb-3">
                <summary className="cursor-pointer list-none py-2 text-lg text-[#D7DEEA] [&::-webkit-details-marker]:hidden">{item.question}</summary>
                <p className="pt-1 text-sm leading-relaxed text-[#AAB4C6]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
