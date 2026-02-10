"use client";

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

import { Card } from '../../components';

const vibes = ['Still', 'Balanced', 'Warmth', 'Focus', 'Lift', 'Dusk'] as const;

const vibeDescriptions: Record<(typeof vibes)[number], string> = {
  Still: 'Low stimulation, soft textures',
  Balanced: 'Neutral, all-day default',
  Warmth: 'Social, inviting',
  Focus: 'Reduces background chatter',
  Lift: 'Subtle energy, no stress',
  Dusk: 'Slower, softer, settled'
};

const demoTrackPath = '/audio/track10-james.mp3';

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedVibe, setSelectedVibe] = useState<(typeof vibes)[number]>('Balanced');
  const [intensity, setIntensity] = useState(50);
  const [reduceChatter, setReduceChatter] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const status = useMemo(() => `Running for ${formatElapsed(currentTime)}`, [currentTime]);
  const nowPlayingLine = useMemo(
    () => `${selectedVibe} — ${vibeDescriptions[selectedVibe]}`,
    [selectedVibe]
  );

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-6 py-16 sm:py-20">
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
            className="text-sm text-text-muted transition duration-200 hover:text-text-primary focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-text-primary/15"
          >
            ← Back
          </Link>
        </div>

        <Card className="space-y-9 rounded-[2rem] border-border/80 bg-surface/95 p-8 shadow-[0_24px_64px_rgba(20,20,20,0.12)] sm:p-11">
          <audio
            ref={audioRef}
            src={demoTrackPath}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          />

          <div className="flex flex-col items-center gap-4 text-center">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
              className={[
                'relative inline-flex h-36 w-36 items-center justify-center rounded-full border text-lg font-medium text-surface transition duration-300',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30',
                isPlaying
                  ? 'border-accent bg-accent shadow-[0_20px_48px_rgba(47,111,94,0.34)]'
                  : 'border-accent/30 bg-accent shadow-[0_16px_36px_rgba(47,111,94,0.22)] hover:bg-accent/90'
              ]
                .join(' ')
                .trim()}
            >
              {isPlaying ? (
                <span
                  className="pointer-events-none absolute inset-[-10px] rounded-full border border-accent/30"
                  aria-hidden="true"
                />
              ) : null}
              {isPlaying ? (
                <span
                  className="pointer-events-none absolute inset-[-10px] rounded-full border border-accent/20 animate-[pulse-ring_2.4s_ease-out_infinite]"
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative z-10">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Now playing</p>
            <p className="text-sm text-text-primary sm:text-base">{nowPlayingLine}</p>

            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span
                className={[
                  'equalizer flex items-end gap-1',
                  isPlaying ? 'opacity-100' : 'opacity-40'
                ]
                  .join(' ')
                  .trim()}
                aria-hidden="true"
              >
                <span className={isPlaying ? 'animate-[eq_1s_ease-in-out_infinite]' : ''} />
                <span className={isPlaying ? 'animate-[eq_1.2s_ease-in-out_infinite_0.12s]' : ''} />
                <span className={isPlaying ? 'animate-[eq_1.1s_ease-in-out_infinite_0.24s]' : ''} />
              </span>
              <span>{status}</span>
            </div>

            <div className="w-full max-w-md space-y-1">
              <input
                type="range"
                min={0}
                max={100}
                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                onChange={(event) => {
                  const audio = audioRef.current;
                  if (!audio || !Number.isFinite(audio.duration)) {
                    return;
                  }
                  const seekTarget = (Number(event.target.value) / 100) * audio.duration;
                  audio.currentTime = seekTarget;
                  setCurrentTime(seekTarget);
                }}
                className="range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-border"
                aria-label="Track progress"
              />
              <div className="flex justify-between text-xs text-text-muted">
                <span>{formatElapsed(currentTime)}</span>
                <span>{formatElapsed(duration)}</span>
              </div>
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
                        ? 'border-accent/80 bg-accent text-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_16px_rgba(47,111,94,0.2)] focus-visible:ring-accent/30'
                        : 'border-border bg-surface text-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:border-border/80 hover:text-text-primary focus-visible:ring-text-primary/15'
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
              className="range-slider h-2.5 w-full cursor-pointer appearance-none rounded-full bg-border"
              aria-label="Intensity"
            />
            <div className="flex justify-between text-xs text-text-muted">
              <span>Quiet</span>
              <span>Full</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border/90 bg-background/70 px-4 py-3.5">
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

          <p className="text-center text-xs text-text-muted">No ads. No vocals. Designed for spaces.</p>
        </Card>
      </div>
    </section>
  );
}
