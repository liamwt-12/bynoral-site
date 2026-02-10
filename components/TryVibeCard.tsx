'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Card } from './Card';

const previewVibes = [
  { name: 'Still', hint: 'Quiet, minimal, low stimulation' },
  { name: 'Warmth', hint: 'Social, inviting, comfortable energy' },
  { name: 'Focus', hint: 'Softly masks distractions and chatter' }
] as const;

export function TryVibeCard() {
  const [selectedVibe, setSelectedVibe] = useState<(typeof previewVibes)[number]['name']>('Warmth');

  const selectedDetail = useMemo(
    () => previewVibes.find((vibe) => vibe.name === selectedVibe)?.hint ?? '',
    [selectedVibe]
  );

  return (
    <Card className="border-white/20 bg-white/45 p-5 shadow-[0_24px_70px_rgba(19,30,27,0.14)] backdrop-blur-xl sm:p-7">
      <div className="space-y-5">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-text-muted">Try a vibe</p>
        <h2 className="text-2xl leading-tight sm:text-3xl">Preview the mood in one tap.</h2>

        <div className="flex flex-wrap gap-2">
          {previewVibes.map((vibe) => (
            <button
              key={vibe.name}
              type="button"
              onClick={() => setSelectedVibe(vibe.name)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 ${
                selectedVibe === vibe.name
                  ? 'border-accent/50 bg-accent/12 text-accent'
                  : 'border-border/80 bg-surface/70 text-text-muted hover:border-accent/30 hover:text-text-primary'
              }`}
              aria-pressed={selectedVibe === vibe.name}
            >
              {vibe.name}
            </button>
          ))}
        </div>

        <p className="text-sm text-text-muted sm:text-base">{selectedDetail}</p>

        <Link
          href={`/player?vibe=${encodeURIComponent(selectedVibe)}`}
          className="hero-cta inline-flex w-full items-center justify-center rounded-full border border-accent/70 bg-gradient-to-b from-accent to-accent/85 px-6 py-3 text-sm font-semibold text-surface shadow-[0_10px_30px_rgba(47,111,94,0.25)] transition duration-250 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(47,111,94,0.36)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 sm:w-auto"
        >
          Start playing
        </Link>

        <p className="text-sm leading-relaxed text-text-muted">
          Press play. Your space instantly feels more considered.
        </p>
      </div>
    </Card>
  );
}
