"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Card } from '../../components';

const vibes = ['Still', 'Balanced', 'Warmth', 'Focus', 'Lift', 'Dusk'] as const;

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedVibe, setSelectedVibe] = useState<(typeof vibes)[number]>('Balanced');
  const [intensity, setIntensity] = useState(50);
  const [reduceChatter, setReduceChatter] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const status = useMemo(() => `Running for ${formatElapsed(elapsedSeconds)}`, [elapsedSeconds]);

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-2xl space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-2xl tracking-tight text-text-primary transition duration-200 hover:text-text-muted"
          >
            Bynoral
          </Link>
          <Link
            href="/"
            className="text-sm text-text-muted transition duration-200 hover:text-text-primary"
          >
            ← Back
          </Link>
        </div>

        <Card className="space-y-8 p-8 sm:p-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex h-28 w-28 items-center justify-center rounded-full border border-accent/20 bg-accent text-lg font-medium text-surface shadow-[0_14px_35px_rgba(47,111,94,0.24)] transition duration-200 hover:bg-accent/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <p className="text-sm text-text-muted">{status}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Vibe</p>
            <div className="flex flex-wrap gap-2.5">
              {vibes.map((vibe) => {
                const selected = selectedVibe === vibe;
                return (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => setSelectedVibe(vibe)}
                    className={[
                      'rounded-full border px-4 py-2 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-4',
                      'hover:-translate-y-0.5 active:translate-y-0',
                      selected
                        ? 'border-accent bg-accent text-surface focus-visible:ring-accent/30'
                        : 'border-border bg-surface text-text-muted hover:border-border/80 hover:text-text-primary focus-visible:ring-text-primary/15'
                    ]
                      .join(' ')
                      .trim()}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-text-primary">Intensity</span>
              <span className="text-text-muted">{intensity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
              aria-label="Intensity"
            />
            <div className="flex justify-between text-xs text-text-muted">
              <span>Quiet</span>
              <span>Full</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3">
            <span className="text-sm text-text-primary">Reduce background chatter</span>
            <button
              type="button"
              role="switch"
              aria-checked={reduceChatter}
              onClick={() => setReduceChatter((prev) => !prev)}
              className={[
                'relative inline-flex h-6 w-11 items-center rounded-full border transition duration-200 focus-visible:outline-none focus-visible:ring-4',
                reduceChatter
                  ? 'border-accent bg-accent focus-visible:ring-accent/30'
                  : 'border-border bg-border focus-visible:ring-text-primary/15'
              ]
                .join(' ')
                .trim()}
            >
              <span
                className={[
                  'h-4 w-4 rounded-full bg-surface transition duration-200',
                  reduceChatter ? 'translate-x-5' : 'translate-x-1'
                ]
                  .join(' ')
                  .trim()}
              />
            </button>
          </div>

          <p className="text-center text-xs text-text-muted">No ads. No vocals. Designed for spaces.</p>
        </Card>
      </div>
    </section>
  );
}
