'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Section, StatsStrip, TrustStack } from '../components';

type SessionMode = 'Morning' | 'Midday' | 'After Hours';

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
  }
];

function getServiceWindow(hour: number): SessionMode {
  if (hour >= 7 && hour < 11) return 'Morning';
  if (hour >= 11 && hour < 19) return 'Midday';
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
        className="relative min-h-[100svh] overflow-hidden bg-background pb-16 pt-10 text-text-primary sm:pt-16"
        containerClassName="max-w-6xl"
      >
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-58"
          autoPlay={!prefersReducedMotion}
          loop={!prefersReducedMotion}
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/cafe-loop.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,20,25,0.45),rgba(15,20,25,0.78))]" />
        <div className="pointer-events-none absolute inset-0 bg-[rgba(198,147,74,0.06)]" />

        <audio
          ref={audioRef}
          src={selectedTrackPath}
          preload="auto"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-5xl flex-col justify-center gap-12 sm:gap-14">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-4xl leading-[1.03] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
              Music for cafés.
              <br />
              Done properly.
            </h1>

            <p className="max-w-2xl text-base text-white/85 sm:text-xl">Set it once. Let it run all day.</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className="hero-cta inline-flex items-center justify-center rounded-full border border-accent bg-accent px-7 py-3 text-sm font-semibold tracking-[0.12em] text-[#12161c] transition duration-200 hover:brightness-105 active:scale-[0.99]"
              >
                Start session
              </button>
              <div className="space-y-1">
                <Link
                  href="/founding-50"
                  className="hero-cta inline-flex items-center justify-center rounded-full border border-border-dark bg-white/[0.02] px-7 py-3 text-sm font-semibold tracking-[0.12em] text-white transition duration-200 hover:bg-white/[0.08] hover:border-white/40 active:scale-[0.99]"
                >
                  Apply for founding 50
                </Link>
                <p className="text-xs text-white/72">3 months free. No card required.</p>
              </div>
            </div>

            <p className="text-xs tracking-[0.08em] text-white/72 sm:text-sm">
              Built in the UK <span className="px-2 text-white/40">•</span> Designed for independent cafés{' '}
              <span className="px-2 text-white/40">•</span> Founder-led
            </p>

            <TrustStack />
          </div>

          <div
            id="homepage-player"
            className="mobile-player-alive relative max-w-lg overflow-hidden rounded-3xl border border-border-dark bg-[rgba(15,20,25,0.72)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-10px_26px_rgba(0,0,0,0.2),0_22px_40px_-28px_rgba(0,0,0,0.7)] backdrop-blur-md transition duration-300 md:hover:-translate-y-0.5 md:hover:border-white/20 sm:p-7"
          >
            <div className={`pointer-events-none absolute inset-0 transition-all duration-700 ${modeTint[sessionMode]}`} />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.17em] text-text-muted">Current mode</p>
                  <p className="mt-1 text-2xl text-white">{sessionMode}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.15em] text-text-muted">{isPlaying ? 'System live' : 'System ready'}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(sessionModeTracks) as SessionMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSessionMode(mode)}
                    className={`rounded-lg border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-400 active:scale-[0.98] ${
                      mode === sessionMode
                        ? 'border-white/30 bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_0_1px_rgba(198,147,74,0.08)]'
                        : 'border-border-dark text-text-muted hover:border-white/25 hover:bg-white/[0.03] hover:text-white'
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
                  className="rounded-full border border-accent bg-accent/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f2d8b1] transition duration-200 hover:bg-accent/20 active:scale-[0.98]"
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
                  <p className="mt-1 text-xs text-text-muted">Balancing background chatter in real time.</p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={roomBalanceEnabled}
                  onClick={() => setRoomBalanceEnabled((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-2 py-1 text-xs uppercase tracking-[0.15em] text-text-muted transition hover:border-white/30"
                >
                  <span
                    className={`relative inline-flex h-6 w-11 rounded-full border transition ${
                      roomBalanceEnabled
                        ? 'border-accent/70 bg-accent/25 shadow-[0_0_10px_rgba(198,147,74,0.3)]'
                        : 'border-white/20 bg-white/10'
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
        </div>
      </Section>

      <Section className="bg-surface py-20 text-text-light-primary sm:py-28" containerClassName="max-w-5xl">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-light-muted">Why Bynoral exists</p>
          <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">
            Staff shouldn’t have to DJ the room.
          </h2>
          <div className="max-w-3xl space-y-3 text-lg leading-relaxed text-text-light-muted">
            <p>Phones disconnect. Shifts change. The atmosphere drifts.</p>
            <p>Bynoral keeps the room steady, from first coffees to late-afternoon wind-down.</p>
            <p>Built to run consistently through service.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface py-16 text-text-light-primary sm:py-24" containerClassName="max-w-5xl">
        <div className="space-y-8 border-y border-border-light py-8 sm:py-10">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">Better than a playlist.</h2>
          <ul className="space-y-2 text-lg text-text-light-muted">
            <li>• No ads</li>
            <li>• No vocals</li>
            <li>• No awkward gaps</li>
            <li>• Built for public spaces</li>
            <li>• Runs automatically</li>
          </ul>
          <StatsStrip />
        </div>
      </Section>

      <Section className="bg-surface py-16 text-text-light-primary sm:py-24" containerClassName="max-w-5xl">
        <div className="space-y-8 rounded-3xl border border-border-light bg-[#F4F1EC] p-8 sm:p-10">
          <div className="space-y-3">
            <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">
              Trusted by independent cafés across the UK.
            </h2>
            <p className="text-base text-text-light-muted sm:text-lg">
              Built specifically for commercial hospitality environments.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border-light bg-white/55 p-4">
              <p className="text-2xl text-text-light-primary">50</p>
              <p className="text-sm text-text-light-muted">cafés onboarding</p>
            </div>
            <div className="rounded-2xl border border-border-light bg-white/55 p-4">
              <p className="text-2xl text-text-light-primary">100%</p>
              <p className="text-sm text-text-light-muted">commercially safe</p>
            </div>
            <div className="rounded-2xl border border-border-light bg-white/55 p-4">
              <p className="text-2xl text-text-light-primary">0 ads. 0 vocals.</p>
              <p className="text-sm text-text-light-muted">steady atmosphere</p>
            </div>
            <div className="rounded-2xl border border-border-light bg-white/55 p-4">
              <p className="text-2xl text-text-light-primary">Designed in the UK</p>
              <p className="text-sm text-text-light-muted">for independent teams</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-background py-20 text-text-primary sm:py-28" containerClassName="max-w-5xl">
        <div className="space-y-7">
          <div className="max-w-3xl rounded-2xl border border-border-dark bg-[rgba(15,20,25,0.72)] p-6 text-sm text-text-muted shadow-[0_18px_35px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-8">
            <h3 className="text-2xl text-white">Commercial use. Covered.</h3>
            <ul className="mt-4 space-y-2 text-base">
              <li>No mainstream catalogue</li>
              <li>No ads</li>
              <li>No vocal interruptions</li>
              <li>Built for licensed public spaces</li>
            </ul>
            <p className="mt-5 text-sm text-white/72">Designed to run quietly in the background of real businesses.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface py-20 text-text-light-primary sm:py-32" containerClassName="max-w-5xl">
        <div className="space-y-5 rounded-3xl border border-border-light bg-[#faf8f4] p-8 shadow-[0_20px_34px_-30px_rgba(18,22,28,0.45)] sm:p-12">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">Founding 50 cafés.</h2>
          <p className="max-w-2xl text-lg text-text-light-muted">
            We’re onboarding 50 independent cafés and shaping Bynoral with them.
          </p>
          <div className="space-y-1">
            <Link
              href="/founding-50"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#12161c] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-12px_rgba(18,22,28,0.65)] hover:brightness-105 active:translate-y-0 active:scale-[0.99]"
            >
              Apply for founding 50 <span aria-hidden="true">→</span>
            </Link>
            <p className="text-xs text-text-light-muted">3 months free. No card required.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface pt-0 text-text-light-primary sm:pt-0" containerClassName="max-w-5xl">
        <div className="space-y-5 border-t border-border-light pt-8 sm:pt-10">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] text-text-light-primary sm:text-4xl">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border-light bg-surface p-5 sm:p-6">
                <h3 className="text-xl text-text-light-primary">{faq.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-text-light-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
