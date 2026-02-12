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
      <Section className="relative min-h-[100svh] overflow-hidden bg-[#121417] pb-20 pt-14 text-[#f3f1ec] sm:pt-20" containerClassName="max-w-6xl">
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
        <div className="pointer-events-none absolute inset-0 bg-black/33" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_30%,rgba(8,10,12,0.45)_100%)]" />

        <audio
          ref={audioRef}
          src={selectedTrackPath}
          preload="auto"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-5xl flex-col justify-center gap-10">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl leading-[0.95] tracking-[-0.02em] text-[#f5f4ef] sm:text-6xl lg:text-7xl">
              Music for cafés.
              <br />
              Done properly.
            </h1>

            <p className="max-w-2xl text-lg text-[#e4e1d9] sm:text-xl">Set it once. Let it run all day.</p>
            <p className="text-sm text-[#d4d0c6]">Built for independent cafés. Commercially safe. No ads. No vocals.</p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className="inline-flex items-center justify-center rounded-full border border-[#c18745] bg-[#c18745] px-7 py-3 text-sm font-semibold tracking-[0.14em] text-[#1d140a] transition hover:bg-[#cb9150]"
              >
                Start session
              </button>
              <Link
                href="/founding-50"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-3 text-sm font-semibold tracking-[0.14em] text-[#f3f1ec] transition hover:border-white/60"
              >
                Apply for founding 50
              </Link>
            </div>
          </div>

          <div id="homepage-player" className="max-w-lg rounded-2xl border border-white/15 bg-[#14181d]/80 p-6 backdrop-blur-sm sm:p-7">
            <div className="space-y-5">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.17em] text-[#c8c3b7]">Current mode</p>
                <p className="mt-1 text-2xl text-[#f5f4ef]">{sessionMode}</p>
              </div>

              <div className="flex items-center justify-between gap-4 border-y border-white/10 py-4">
                <button
                  type="button"
                  onClick={() => void togglePlayback()}
                  className="rounded-full border border-[#c18745]/75 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f0d7b5] transition hover:border-[#c18745]"
                >
                  {isPlaying ? 'Stop' : 'Start'}
                </button>

                <button
                  type="button"
                  role="switch"
                  aria-checked={roomBalanceEnabled}
                  onClick={() => setRoomBalanceEnabled((current) => !current)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#d5d1c8]"
                >
                  Room balance
                  <span
                    className={`relative inline-flex h-5 w-10 rounded-full transition ${
                      roomBalanceEnabled ? 'bg-[#c18745]/80' : 'bg-white/25'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-[#121417] transition ${
                        roomBalanceEnabled ? 'left-[1.3rem]' : 'left-0.5'
                      }`}
                    />
                  </span>
                </button>
              </div>

              <p className="text-xs uppercase tracking-[0.15em] text-[#beb8aa]">{isPlaying ? 'Running' : 'System ready'}</p>
              {playError ? <p className="text-xs text-[#efc792]">{playError}</p> : null}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f5f2ec] py-20 text-[#1b1f24] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Why Bynoral exists</h2>
          <div className="space-y-3 text-lg leading-relaxed text-[#2f3338]">
            <p>Most cafés rely on whatever phone is connected. Staff change. Music changes. Mood changes.</p>
            <p>Bynoral runs quietly in the background. Following the rhythm of a café day.</p>
            <p>No drama. No decision fatigue. Just the right atmosphere.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-[#171b20] py-20 text-[#f4f2ed] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Better than a playlist.</h2>
          <ul className="space-y-2 text-lg text-[#ded9ce]">
            <li>• No ads</li>
            <li>• No vocals</li>
            <li>• No awkward gaps</li>
            <li>• Commercial use ready</li>
            <li>• Runs automatically</li>
          </ul>
        </div>
      </Section>

      <Section className="bg-[#f8f6f1] py-20 text-[#1b1f24] sm:py-24" containerClassName="max-w-4xl">
        <div className="space-y-6 rounded-2xl border border-[#c9c2b2] bg-[#f8f6f1] p-8 sm:p-10">
          <h2 className="text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">Founding 50 cafés.</h2>
          <p className="text-lg text-[#2b3036]">We’re onboarding 50 independent cafés. 3 months free. No card required. Honest feedback expected.</p>
          <Link
            href="/founding-50"
            className="inline-flex items-center gap-2 rounded-full border border-[#c18745] bg-[#c18745] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#1f160b] transition hover:bg-[#cb9150]"
          >
            Apply now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <footer className="bg-[#121417] py-8 text-[#b8b3a7]">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="text-sm leading-relaxed">
            Built by a founder obsessed with independent venues and the feeling of a room done properly.
          </p>
        </div>
      </footer>
    </>
  );
}
