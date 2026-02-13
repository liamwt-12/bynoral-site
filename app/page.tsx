'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Section } from '../components';

type SessionMode = 'Morning' | 'Midday' | 'After Hours';
type ModeOverride = { mode: SessionMode; expiresAt: number };

const sessionModeTracks: Record<SessionMode, string> = {
  Morning: '/audio/morning-service.mp3',
  Midday: '/audio/midday-flow.mp3',
  'After Hours': '/audio/after-hours.mp3'
};

const modeTint: Record<SessionMode, string> = {
  Morning: 'bg-[rgba(255,255,255,0.08)]',
  Midday: 'bg-[rgba(15,20,25,0.2)]',
  'After Hours': 'bg-[rgba(15,20,25,0.34)]'
};

const MODE_OVERRIDE_KEY = 'bynoral-mode-override-v1';
const OVERRIDE_DURATION_MS = 12 * 60 * 60 * 1000;

const howItWorks = [
  'Start a session and Bynoral sets a steady background instantly.',
  'Auto mode follows the day so the room feels right from opening through evening.',
  'Staff can override anytime, then return to auto when service settles.'
];

const benefits = [
  'Founding 50: onboarding now',
  'Commercial use ready: no ads, no vocals, no mainstream catalogue',
  'Designed in the UK'
];

const faqs = [
  {
    question: 'What do I play it on?',
    answer: 'Any device with a browser and your speaker setup — iPad, laptop, or front-counter terminal.'
  },
  {
    question: 'Can staff control it quickly?',
    answer: 'Yes. Start/stop, room balance, and service mode can be adjusted in seconds.'
  },
  {
    question: 'Can this fit a licensed venue?',
    answer: 'Yes. Bynoral is designed to sit calmly alongside venues that already run a public music licence.'
  },
  {
    question: 'Is this replacing my normal playlists?',
    answer: 'It can, or it can run only during core service hours when you want the room to stay consistent.'
  }
];

function getModeForDate(date: Date): SessionMode {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  if (totalMinutes >= 7 * 60 && totalMinutes <= 11 * 60 + 29) return 'Morning';
  if (totalMinutes >= 11 * 60 + 30 && totalMinutes <= 16 * 60 + 59) return 'Midday';
  return 'After Hours';
}

function getNextBoundary(date: Date): Date {
  const next = new Date(date);
  const minutes = date.getHours() * 60 + date.getMinutes();

  if (minutes < 7 * 60) {
    next.setHours(7, 0, 0, 0);
    return next;
  }

  if (minutes < 11 * 60 + 30) {
    next.setHours(11, 30, 0, 0);
    return next;
  }

  if (minutes < 17 * 60) {
    next.setHours(17, 0, 0, 0);
    return next;
  }

  next.setDate(next.getDate() + 1);
  next.setHours(7, 0, 0, 0);
  return next;
}

function readModeOverride(now: number): ModeOverride | null {
  const saved = window.localStorage.getItem(MODE_OVERRIDE_KEY);
  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved) as Partial<ModeOverride>;

    if (!parsed.mode || !parsed.expiresAt || parsed.expiresAt <= now) {
      window.localStorage.removeItem(MODE_OVERRIDE_KEY);
      return null;
    }

    return { mode: parsed.mode as SessionMode, expiresAt: parsed.expiresAt };
  } catch {
    window.localStorage.removeItem(MODE_OVERRIDE_KEY);
    return null;
  }
}

export default function Home() {
  const [sessionMode, setSessionMode] = useState<SessionMode>(() => getModeForDate(new Date()));
  const [modeOverride, setModeOverride] = useState<ModeOverride | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playError, setPlayError] = useState('');
  const [roomBalanceEnabled, setRoomBalanceEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const now = Date.now();
    const activeOverride = readModeOverride(now);
    setModeOverride(activeOverride);
    setSessionMode(activeOverride?.mode ?? getModeForDate(new Date()));
  }, []);

  useEffect(() => {
    const now = Date.now();

    if (modeOverride) {
      const timeout = window.setTimeout(() => {
        window.localStorage.removeItem(MODE_OVERRIDE_KEY);
        setModeOverride(null);
        setSessionMode(getModeForDate(new Date()));
      }, Math.max(modeOverride.expiresAt - now, 0));

      return () => window.clearTimeout(timeout);
    }

    const nextBoundary = getNextBoundary(new Date());
    const timeout = window.setTimeout(() => {
      setSessionMode(getModeForDate(new Date()));
    }, nextBoundary.getTime() - now + 1000);

    return () => window.clearTimeout(timeout);
  }, [modeOverride, sessionMode]);

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

  const setManualMode = (mode: SessionMode) => {
    const override: ModeOverride = {
      mode,
      expiresAt: Date.now() + OVERRIDE_DURATION_MS
    };

    window.localStorage.setItem(MODE_OVERRIDE_KEY, JSON.stringify(override));
    setModeOverride(override);
    setSessionMode(mode);
  };

  const clearManualMode = () => {
    window.localStorage.removeItem(MODE_OVERRIDE_KEY);
    setModeOverride(null);
    setSessionMode(getModeForDate(new Date()));
  };

  return (
    <>
      <Section className="relative overflow-hidden bg-background pb-16 pt-24 text-text-primary sm:pb-20 sm:pt-32" containerClassName="max-w-5xl">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          autoPlay={!prefersReducedMotion}
          loop={!prefersReducedMotion}
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/cafe-loop.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(250,247,241,0.36),rgba(246,241,233,0.58))]" />

        <audio
          ref={audioRef}
          src={selectedTrackPath}
          preload="auto"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="relative z-10 mx-auto max-w-3xl space-y-8 sm:space-y-10">
          <h1 className="text-4xl leading-[1.03] tracking-[-0.02em] text-text-primary sm:text-6xl">Music for cafés. Done properly.</h1>
          <p className="max-w-xl text-base text-text-primary/80 sm:text-lg">Set it once. Let it run all day with calm, service-aware control.</p>

          <div className="space-y-3">
            <div className="flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className="hero-cta inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold tracking-[0.11em] text-[#12161c] transition duration-200 hover:brightness-105"
              >
                Start session
              </button>
              <Link
                href="/founding-50"
                className="text-sm font-medium text-text-primary/80 underline decoration-text-primary/35 underline-offset-4 transition hover:text-text-primary"
              >
                Apply for founding 50
              </Link>
            </div>
            <p className="pl-1 text-xs text-text-primary/75">3 months free for founding cafés. No card required.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface pb-14 text-text-primary sm:pb-20" containerClassName="max-w-5xl">
        <div
          id="homepage-player"
          className="relative max-w-2xl overflow-hidden rounded-3xl border border-border-dark bg-[rgba(15,20,25,0.8)] p-5 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-7"
        >
          <div className={`pointer-events-none absolute inset-0 transition-all duration-700 ${modeTint[sessionMode]}`} />
          <div className="relative space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.17em] text-text-muted">Current mode</p>
                <p className="mt-1 text-2xl text-white">{sessionMode}</p>
                <p className="mt-1 text-xs text-white/60">{modeOverride ? 'Manual override' : 'Auto mode'}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-text-muted">{isPlaying ? 'LIVE' : 'Ready'}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(Object.keys(sessionModeTracks) as SessionMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setManualMode(mode)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition active:scale-[0.98] ${
                    mode === sessionMode
                      ? 'border-white/35 bg-white/10 text-white'
                      : 'border-white/15 text-text-muted hover:border-white/30 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
              {modeOverride ? (
                <button
                  type="button"
                  onClick={clearManualMode}
                  className="px-1 text-xs text-white/65 underline decoration-white/30 underline-offset-4 transition hover:text-white"
                >
                  Return to Auto
                </button>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-4 border-y border-white/10 py-4">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className="rounded-full border border-accent bg-accent/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f2d8b1] transition hover:bg-accent/20"
              >
                {isPlaying ? 'Stop' : 'Start'}
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${isPlaying ? 'live-badge bg-accent shadow-[0_0_8px_rgba(198,147,74,0.8)]' : 'bg-white/35'}`}
                  aria-hidden="true"
                />
                {isPlaying ? 'Live' : 'Ready'}
              </div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white">Room Balance</p>
                <p className="mt-1 text-xs text-text-muted">Balancing background chatter.</p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={roomBalanceEnabled}
                onClick={() => setRoomBalanceEnabled((current) => !current)}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-2 py-1 text-xs uppercase tracking-[0.15em] text-text-muted"
              >
                <span
                  className={`relative inline-flex h-6 w-11 rounded-full border transition ${
                    roomBalanceEnabled ? 'border-accent/70 bg-accent/25' : 'border-white/20 bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-[1.125rem] w-[1.125rem] rounded-full bg-white transition ${
                      roomBalanceEnabled ? 'left-[1.45rem]' : 'left-0.5'
                    }`}
                  />
                </span>
              </button>
            </div>

            {playError ? <p className="text-xs text-[#f5d0a0]">{playError}</p> : null}
          </div>
        </div>
      </Section>

      <Section className="bg-surface py-14 text-text-light-primary sm:py-20" containerClassName="max-w-5xl">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">How it works</h2>
          <ol className="space-y-4 text-base leading-relaxed text-text-light-muted sm:text-lg">
            {howItWorks.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 text-sm text-text-light-muted">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-surface py-14 text-text-light-primary sm:py-20" containerClassName="max-w-5xl">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs tracking-[0.1em] text-text-light-primary sm:text-sm">Built in the UK · Designed for independent cafés · Founder-led</p>
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Built for calm commercial service</h2>
          <p className="text-base text-text-light-muted sm:text-lg">
            Bynoral is designed for public-space ambience without mainstream catalogue dependence.
          </p>
          <ul className="space-y-3 text-base text-text-light-muted sm:text-lg">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <span aria-hidden="true" className="text-text-light-muted">
                  •
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface py-14 text-text-light-primary sm:py-20" containerClassName="max-w-5xl">
        <div className="max-w-3xl space-y-5 rounded-3xl border border-border-light bg-[#faf8f4] p-8 sm:p-10">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Founding 50 cafés</h2>
          <p className="text-base text-text-light-muted sm:text-lg">
            We’re onboarding 50 independent cafés and shaping Bynoral together.
          </p>
          <div className="space-y-1">
            <Link
              href="/founding-50"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#12161c] transition duration-200 hover:brightness-105"
            >
              Apply for founding 50 <span aria-hidden="true">→</span>
            </Link>
            <p className="text-xs text-text-light-muted">3 months free. No card required.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface pb-16 pt-4 text-text-light-primary sm:pb-20" containerClassName="max-w-5xl">
        <div className="max-w-3xl space-y-5 border-t border-border-light pt-8">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-border-light pb-4">
                <summary className="cursor-pointer list-none text-lg text-text-light-primary marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-2 text-base leading-relaxed text-text-light-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="pt-2 text-xs text-text-light-muted">Market context: UK coffee shops: ~10k outlets (industry estimate).</p>
        </div>
      </Section>
    </>
  );
}
