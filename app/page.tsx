'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Section } from '../components';

type SessionMode = 'Morning' | 'Midday' | 'After Hours';

const sessionModeTracks: Record<SessionMode, string> = {
  Morning: '/audio/morning-service.mp3',
  Midday: '/audio/midday-flow.mp3',
  'After Hours': '/audio/after-hours.mp3'
};

function getServiceWindow(hour: number): SessionMode {
  if (hour >= 6 && hour < 11) return 'Morning';
  if (hour >= 11 && hour < 17) return 'Midday';
  return 'After Hours';
}

export default function Home() {
  const [sessionMode, setSessionMode] = useState<SessionMode>(() => getServiceWindow(new Date().getHours()));
  const [isPlaying, setIsPlaying] = useState(false);
  const [playError, setPlayError] = useState('');
  const [roomBalanceEnabled, setRoomBalanceEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSessionMode(getServiceWindow(new Date().getHours()));
    }, 60000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);

    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  const selectedTrackPath = useMemo(() => sessionModeTracks[sessionMode], [sessionMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldResumePlayback = !audio.paused;
    audio.pause();
    audio.currentTime = 0;
    audio.src = selectedTrackPath;
    audio.load();

    if (!shouldResumePlayback) {
      setIsPlaying(false);
      return;
    }

    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setPlayError('');
      })
      .catch(() => {
        setIsPlaying(false);
        setPlayError('Tap start to begin playback');
      });
  }, [selectedTrackPath]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setPlayError('');
      } catch {
        setIsPlaying(false);
        setPlayError('Tap start to begin playback');
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <Section
        className="relative min-h-[100svh] overflow-hidden bg-background pb-16 pt-14 text-text-primary sm:pt-20"
        containerClassName="max-w-6xl"
      >
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
          autoPlay={!prefersReducedMotion}
          loop={!prefersReducedMotion}
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/cafe-loop.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,20,25,0.55),rgba(15,20,25,0.82))]" />

        <audio
          ref={audioRef}
          src={selectedTrackPath}
          preload="auto"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-5xl flex-col justify-center gap-8 sm:gap-10">
          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl leading-[0.95] tracking-[-0.02em] text-text-primary sm:text-6xl lg:text-7xl">
              Music for cafés.
              <br />
              Done properly.
            </h1>

            <p className="max-w-2xl text-base text-text-muted sm:text-xl">Set it once. Let it run all day.</p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className="hero-cta inline-flex items-center justify-center rounded-full border border-accent bg-accent px-7 py-3 text-sm font-semibold tracking-[0.12em] text-[#121417] transition duration-200 hover:brightness-105 active:scale-[0.99]"
              >
                Start session
              </button>
              <div className="space-y-1">
                <Link
                  href="/founding-50"
                  className="hero-cta inline-flex items-center justify-center rounded-full border border-border-dark px-7 py-3 text-sm font-semibold tracking-[0.12em] text-text-primary transition duration-200 hover:border-white/35 active:scale-[0.99]"
                >
                  Apply for founding 50
                </Link>
                <p className="text-xs text-text-muted">3 months free. No card required.</p>
              </div>
            </div>

            <div className="grid max-w-2xl gap-2 pt-2 text-sm text-text-muted sm:grid-cols-3">
              <p>Built in the UK</p>
              <p>Designed for independent cafés</p>
              <p>Founder-led</p>
            </div>
          </div>

          <div
            id="homepage-player"
            className="mobile-player-alive max-w-lg rounded-2xl border border-border-dark bg-[#11171d]/78 p-5 backdrop-blur-md transition duration-300 md:hover:-translate-y-0.5 md:hover:border-white/20 sm:p-7"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.17em] text-text-muted">Current mode</p>
                  <p className="mt-1 text-2xl text-text-primary">{sessionMode}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.15em] text-text-muted">{isPlaying ? 'System live' : 'System ready'}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(sessionModeTracks) as SessionMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSessionMode(mode)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition duration-200 active:scale-[0.98] ${
                      mode === sessionMode
                        ? 'border-accent bg-accent text-[#121417]'
                        : 'border-border-dark text-text-muted hover:border-white/30 hover:text-text-primary'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 border-y border-border-dark py-4">
                <button
                  type="button"
                  onClick={() => void togglePlayback()}
                  className="rounded-full border border-accent/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f7e3c5] transition duration-200 hover:border-accent active:scale-[0.98]"
                >
                  {isPlaying ? 'Stop' : 'Start'}
                </button>

                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
                  <span className={`h-2.5 w-2.5 rounded-full bg-accent ${isPlaying ? 'live-badge' : ''}`} aria-hidden="true" />
                  LIVE
                </div>
              </div>

              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-primary">Room Balance</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {roomBalanceEnabled ? 'Balancing background chatter' : 'Off'}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={roomBalanceEnabled}
                  onClick={() => setRoomBalanceEnabled((current) => !current)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-muted"
                >
                  <span
                    className={`relative inline-flex h-5 w-10 rounded-full transition ${
                      roomBalanceEnabled ? 'bg-accent/80' : 'bg-white/25'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition ${
                        roomBalanceEnabled ? 'left-[1.3rem]' : 'left-0.5'
                      }`}
                    />
                  </span>
                </button>
              </div>

              {playError ? <p className="text-xs text-[#f5d0a0]">{playError}</p> : null}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface py-16 text-text-light-primary sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-light-muted">Why Bynoral exists</p>
          <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">
            Staff shouldn’t have to DJ the room.
          </h2>
          <div className="space-y-3 text-lg leading-relaxed text-text-light-muted">
            <p>Phones disconnect. Shifts change. The atmosphere drifts.</p>
            <p>Bynoral keeps the room steady, from first coffees to late-afternoon wind-down.</p>
            <p>Quietly reliable. Always on-brand.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-background py-16 text-text-primary sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-7">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Better than a playlist.</h2>
          <ul className="space-y-2 text-lg text-text-muted">
            <li>• No ads</li>
            <li>• No vocals</li>
            <li>• No awkward gaps</li>
            <li>• Built for public spaces</li>
            <li>• Runs automatically</li>
          </ul>

          <div className="rounded-2xl border border-border-dark bg-[#12191f] p-6 text-sm text-text-muted md:hover:-translate-y-0.5 md:hover:border-white/20 md:transition">
            <h3 className="text-xl text-text-primary">Commercial use. Covered.</h3>
            <ul className="mt-4 space-y-2">
              <li>No mainstream catalogue</li>
              <li>No ads</li>
              <li>No vocals</li>
              <li>Built for public spaces</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-surface py-16 text-text-light-primary sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6 rounded-2xl border border-border-light bg-surface p-8 sm:p-10">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Founding 50 cafés.</h2>
          <p className="text-lg text-text-light-muted">
            We’re onboarding 50 independent cafés and shaping Bynoral with them.
          </p>
          <div className="space-y-1">
            <Link
              href="/founding-50"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#121417] transition duration-200 hover:brightness-105 active:scale-[0.99]"
            >
              Apply for founding 50 <span aria-hidden="true">→</span>
            </Link>
            <p className="text-xs text-text-light-muted">3 months free. No card required.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
