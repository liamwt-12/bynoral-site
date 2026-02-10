'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

import { Card } from './Card';

const previewVibes = [
  { name: 'Still', hint: 'Quiet, minimal, low stimulation' },
  { name: 'Warmth', hint: 'Social, inviting, comfortable energy' },
  { name: 'Focus', hint: 'Softly masks distractions and chatter' }
] as const;

const demoTrackPath = '/audio/track10-james.mp3';

function formatTime(timeInSeconds: number) {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return '00:00';
  }

  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function TryVibeCard() {
  const [selectedVibe, setSelectedVibe] = useState<(typeof previewVibes)[number]['name']>('Warmth');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedDetail = useMemo(
    () => previewVibes.find((vibe) => vibe.name === selectedVibe)?.hint ?? '',
    [selectedVibe]
  );

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

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

  const onSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }

    audio.currentTime = (value / 100) * audio.duration;
    setCurrentTime(audio.currentTime);
  };

  return (
    <>
      <Card className="border-white/20 bg-white/45 p-5 shadow-[0_24px_70px_rgba(19,30,27,0.14)] backdrop-blur-xl sm:p-7">
        <div className="space-y-4 sm:space-y-5">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-text-muted">Live product preview</p>
          <h2 className="text-2xl leading-tight sm:text-3xl">Hear the demo atmosphere instantly.</h2>

          <div className="rounded-2xl border mobile-player-alive border-border/80 bg-surface/75 p-4 sm:p-5">
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

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pause demo track' : 'Play demo track'}
                className={[
                  'relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-sm font-semibold text-surface transition duration-300',
                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30',
                  isPlaying
                    ? 'border-accent bg-accent shadow-[0_14px_30px_rgba(47,111,94,0.32)]'
                    : 'border-accent/70 bg-accent/90 shadow-[0_10px_22px_rgba(47,111,94,0.22)] hover:bg-accent'
                ]
                  .join(' ')
                  .trim()}
              >
                {isPlaying ? (
                  <span
                    className="pointer-events-none absolute inset-[-8px] rounded-full border border-accent/30 animate-[pulse-ring_2.4s_ease-out_infinite]"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-10">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate text-sm font-medium text-text-primary">Track 10 — James (demo)</p>
                <p className="text-xs text-text-muted">{selectedVibe} vibe · {selectedDetail}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <input
                type="range"
                min={0}
                max={100}
                value={progressValue}
                onChange={(event) => onSeek(Number(event.target.value))}
                className="range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-border"
                aria-label="Track progress"
              />
              <div className="flex justify-between text-xs text-text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

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
            Open full player
          </Link>
        </div>
      </Card>

      {isPlaying ? (
        <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
          <div className="relative overflow-hidden rounded-2xl border mobile-player-alive border-accent/35 bg-background/90 px-4 py-3 shadow-[0_16px_34px_rgba(19,30,27,0.2)] backdrop-blur-xl">
            <span
              className="pointer-events-none absolute inset-0 opacity-50 [background:linear-gradient(115deg,transparent_10%,rgba(255,255,255,0.32)_35%,transparent_60%)] animate-[player-shimmer_2.8s_ease-in-out_infinite]"
              aria-hidden="true"
            />
            <div className="relative z-10 flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlayback}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-xs font-semibold text-surface"
              >
                Pause
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium uppercase tracking-[0.15em] text-text-muted">Now playing</p>
                <p className="truncate text-sm text-text-primary">Track 10 — James</p>
              </div>
              <span className="text-xs text-text-muted">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
