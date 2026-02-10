"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { GlassCard, Glow, Motion } from '../../components';

const vibes = ['Still', 'Balanced', 'Warmth', 'Focus', 'Lift', 'Dusk'] as const;

const vibeDescriptions: Record<(typeof vibes)[number], string> = {
  Still: 'low stimulation, soft textures',
  Balanced: 'neutral, all-day default',
  Warmth: 'social, inviting',
  Focus: 'reduces background chatter',
  Lift: 'subtle energy, no stress',
  Dusk: 'slower, softer, settled'
};

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
    <section className="flex min-h-[calc(100vh-11rem)] items-center justify-center px-6 py-14 sm:py-20">
      <Motion preset="fadeUp" className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl tracking-tight text-text-primary">
            bynoral
          </Link>
          <Link
            href="/"
            className="text-sm text-text-muted transition duration-200 hover:text-text-primary focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-text-primary/15"
          >
            ← Back
          </Link>
        </div>

        <GlassCard className="relative overflow-hidden border-white/55 bg-white/78 p-8 sm:p-10">
          <Glow className="-right-16 -top-14 h-72 w-72" />
          <div className="relative z-10 space-y-9">
            <div className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
                className={[
                  'relative inline-flex h-40 w-40 items-center justify-center rounded-full border text-xl font-medium text-surface transition duration-300',
                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30',
                  isPlaying
                    ? 'border-accent bg-accent shadow-[0_24px_58px_rgba(47,111,94,0.35)]'
                    : 'border-accent/35 bg-accent shadow-[0_18px_42px_rgba(47,111,94,0.26)] hover:bg-accent/90'
                ]
                  .join(' ')
                  .trim()}
              >
                {isPlaying ? (
                  <span
                    className="pointer-events-none absolute inset-[-13px] rounded-full border border-accent/30 animate-[pulse-ring_2.4s_ease-out_infinite]"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-10">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-text-muted">Now playing</p>
              <p className="mt-2 text-base text-text-primary sm:text-lg">
                {selectedVibe} — {vibeDescriptions[selectedVibe]}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
                <span className="flex items-end gap-1" aria-hidden="true">
                  <span
                    className={[
                      'equalizer-dot',
                      isPlaying ? 'animate-[eq-dot_1s_ease-in-out_infinite]' : 'opacity-35'
                    ]
                      .join(' ')
                      .trim()}
                  />
                  <span
                    className={[
                      'equalizer-dot',
                      isPlaying ? 'animate-[eq-dot_1.15s_ease-in-out_infinite_0.14s]' : 'opacity-35'
                    ]
                      .join(' ')
                      .trim()}
                  />
                  <span
                    className={[
                      'equalizer-dot',
                      isPlaying ? 'animate-[eq-dot_0.95s_ease-in-out_infinite_0.24s]' : 'opacity-35'
                    ]
                      .join(' ')
                      .trim()}
                  />
                </span>
                <span>{status}</span>
              </div>
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
                        'rounded-full border px-4 py-2.5 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-4',
                        'active:translate-y-[1px]',
                        selected
                          ? 'border-accent/85 bg-accent text-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_9px_16px_rgba(47,111,94,0.23)] focus-visible:ring-accent/30'
                          : 'border-border bg-white/80 text-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] hover:border-border/80 hover:text-text-primary focus-visible:ring-text-primary/15'
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
                className="range-slider w-full cursor-pointer"
                aria-label="Intensity"
              />
              <div className="flex justify-between text-xs text-text-muted">
                <span>Quiet</span>
                <span>Full</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/85 bg-background/60 px-4 py-3.5">
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
                    'h-4 w-4 rounded-full bg-surface shadow-[0_2px_8px_rgba(30,30,30,0.15)] transition duration-200',
                    reduceChatter ? 'translate-x-5' : 'translate-x-1'
                  ]
                    .join(' ')
                    .trim()}
                />
              </button>
            </div>

            <p className="text-center text-xs uppercase tracking-[0.12em] text-text-muted">No ads. No vocals. Designed for spaces.</p>
          </div>
        </GlassCard>
      </Motion>
    </section>
  );
}
