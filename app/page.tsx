'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Section } from '../components';

type SessionMode = 'Morning Service' | 'Midday Flow' | 'After Hours';

const sessionModes: SessionMode[] = ['Morning Service', 'Midday Flow', 'After Hours'];

const sessionModeTracks: Record<SessionMode, string> = {
  'Morning Service': '/audio/morning-service.mp3',
  'Midday Flow': '/audio/midday-flow.mp3',
  'After Hours': '/audio/after-hours.mp3'
};

const faqItems = [
  {
    question: 'Is this just Spotify?',
    answer: 'No. Bynoral is built for café service, with timed day-part playback and consistent atmosphere control.'
  },
  {
    question: 'What do I need to run it?',
    answer: 'A phone, tablet, or laptop connected to your café speaker setup. That is enough to run the full day.'
  },
  {
    question: 'Can staff change it?',
    answer: 'Yes. Staff can manually switch mode when needed, then return to the default schedule.'
  },
  {
    question: 'Does it run all day?',
    answer: 'Yes. Once started, it follows the café rhythm from morning through close.'
  }
];

function getServiceWindow(hour: number): SessionMode {
  if (hour >= 6 && hour < 11) return 'Morning Service';
  if (hour >= 11 && hour < 16) return 'Midday Flow';
  return 'After Hours';
}

function getLocalClock(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [sessionMode, setSessionMode] = useState<SessionMode>(() => getServiceWindow(new Date().getHours()));
  const [manualOverride, setManualOverride] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playError, setPlayError] = useState('');
  const [playStartedAt, setPlayStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (!manualOverride) {
        setSessionMode(getServiceWindow(now.getHours()));
      }
    }, 60000);

    return () => window.clearInterval(timer);
  }, [manualOverride]);

  useEffect(() => {
    if (!isPlaying || !playStartedAt) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - playStartedAt) / 1000)));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying, playStartedAt]);

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
        if (!playStartedAt) setPlayStartedAt(Date.now());
      })
      .catch(() => {
        setIsPlaying(false);
        setPlayError('Tap again to start audio');
      });
  }, [selectedTrackPath, playStartedAt]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setPlayError('');
        setPlayStartedAt(Date.now());
      } catch {
        setIsPlaying(false);
        setPlayError('Tap again to start audio');
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handleModeOverride = (mode: SessionMode) => {
    setManualOverride(true);
    setSessionMode(mode);
  };

  const statusLine = `${getLocalClock(currentTime)} — ${sessionMode}`;

  return (
    <>
      <Section className="relative min-h-[100svh] overflow-hidden bg-[#0b0f14] pb-20 pt-16 sm:pt-20" containerClassName="max-w-6xl">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/cafe-loop.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,transparent_22%,rgba(0,0,0,0.66)_100%)]" />

        <audio
          ref={audioRef}
          src={selectedTrackPath}
          preload="auto"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-5xl flex-col justify-center gap-8">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl leading-[0.93] tracking-[-0.02em] text-[#f5f5f3] sm:text-6xl lg:text-7xl">
              Music for cafés.
              <br />
              Done properly.
            </h1>

            <p className="max-w-2xl text-lg text-[#ddd9cf] sm:text-xl">Set it once. Let it run all day.</p>
            <p className="text-sm text-[#c7c1b5]">It follows the rhythm of a café day — automatically.</p>

            <div className="space-y-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#c5beaf]">
              <p>{statusLine}</p>
              <p>{isPlaying ? 'Active' : 'System ready.'}</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => void togglePlayback()}
              className={[
                'hero-machine-button relative inline-flex min-w-[170px] items-center justify-center rounded-full border border-[#c18745] px-9 py-4 text-sm font-semibold tracking-[0.22em] text-[#f5f1e8] transition',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c18745]/30 active:scale-[0.98]',
                isPlaying
                  ? 'bg-[#b67f42] text-[#1b1309] shadow-[0_0_0_1px_rgba(193,135,69,0.24),0_0_30px_rgba(193,135,69,0.32)] playing-breath'
                  : 'bg-[#2a2116] hover:bg-[#362818]'
              ]
                .join(' ')
                .trim()}
              aria-label={isPlaying ? 'Stop playback' : 'Start playback'}
            >
              {isPlaying ? 'LIVE' : 'START'}
            </button>
            {playError ? <p className="mt-3 text-xs text-[#dbb78d]">{playError}</p> : null}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-sm sm:max-w-md">
            <div className="space-y-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#b8b1a4]">homepage preview player</p>
                <p className="mt-1 text-lg text-[#f5f5f3]">{sessionMode}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-[#c5beaf]">{isPlaying ? 'Active' : 'System ready'}</p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => void togglePlayback()}
                  className="rounded-full border border-[#c18745] bg-[#241b12] px-6 py-2 text-xs font-semibold tracking-[0.2em] text-[#f5e6cf] transition hover:bg-[#322416]"
                >
                  {isPlaying ? 'LIVE' : 'START'}
                </button>
                <p className="text-[0.68rem] uppercase tracking-[0.14em] text-[#aaa193]">Room Balance — Active</p>
              </div>

              <div className="space-y-2 text-xs text-[#d9d3c9]">
                <p className="uppercase tracking-[0.14em] text-[#b8b1a4]">mode override</p>
                <div className="flex flex-wrap items-center gap-2">
                  {sessionModes.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleModeOverride(mode)}
                      className={`rounded-full border px-3 py-1 transition ${
                        sessionMode === mode
                          ? 'border-[#c18745] text-[#e9c69b]'
                          : 'border-white/20 text-[#d3cdc2] hover:border-white/40'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                  {manualOverride ? (
                    <button
                      type="button"
                      onClick={() => {
                        setManualOverride(false);
                        setSessionMode(getServiceWindow(new Date().getHours()));
                      }}
                      className="text-[0.65rem] uppercase tracking-[0.16em] text-[#bcab8f] underline underline-offset-4"
                    >
                      return to automatic
                    </button>
                  ) : null}
                </div>
              </div>

              {isPlaying ? (
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[#bfb8ac]">
                  Running {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:
                  {String(elapsedSeconds % 60).padStart(2, '0')}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#11161d] py-20 text-[#f5f5f3] sm:py-24" containerClassName="max-w-5xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">When music depends on staff, your atmosphere does too.</h2>
          <ul className="space-y-3 text-lg text-[#d1cabd]">
            <li>Playlists repeat before lunch.</li>
            <li>Mood shifts with whoever is on shift.</li>
            <li>Openers forget to start playback.</li>
            <li>Awkward gaps break the room.</li>
          </ul>
        </div>
      </Section>

      <Section className="bg-[#0b0f14] py-20 text-[#f5f5f3] sm:py-24" containerClassName="max-w-5xl">
        <div className="space-y-5">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Bynoral handles it.</h2>
          <p className="text-2xl text-[#dad3c6] sm:text-3xl">Switch on.</p>
          <p className="text-2xl text-[#dad3c6] sm:text-3xl">Let it run all day.</p>
          <p className="text-2xl text-[#dad3c6] sm:text-3xl">Close at night.</p>
        </div>
      </Section>

      <Section className="bg-[#121821] py-20 text-[#f5f5f3] sm:py-24" containerClassName="max-w-5xl">
        <div className="rounded-2xl border border-[#c18745]/35 bg-[#1a120b] p-8 sm:p-10">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">founding 50</h2>
          <p className="mt-4 text-lg text-[#e6d2b3]">3 months free. No card. Honest feedback expected.</p>
          <Link
            href="/founding-50"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#c18745] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#f5e6cf] transition hover:bg-[#2d2115]"
          >
            apply now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section className="bg-[#0b0f14] py-16 text-[#f5f5f3] sm:py-20" containerClassName="max-w-5xl">
        <div className="space-y-2">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">£29 / month per café. Cancel anytime.</h2>
        </div>
      </Section>

      <Section className="bg-[#11161d] pb-24 pt-20 text-[#f5f5f3] sm:pt-24" containerClassName="max-w-5xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="border-b border-white/10 pb-3">
                <summary className="cursor-pointer list-none py-2 text-lg text-[#ece7de] [&::-webkit-details-marker]:hidden">{item.question}</summary>
                <p className="pt-1 text-sm leading-relaxed text-[#cfc8bb]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
