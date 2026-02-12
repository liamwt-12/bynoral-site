"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

const sessionModes = ['Morning', 'Midday', 'After Hours'] as const;
type SessionMode = (typeof sessionModes)[number];

const demoTrackPath = '/audio/track-demo.mp3';

const sessionModeTracks: Record<SessionMode, string> = {
  Morning: demoTrackPath,
  Midday: demoTrackPath,
  'After Hours': demoTrackPath
};

const sessionTitles: Record<SessionMode, string> = {
  Morning: 'Morning Service',
  Midday: 'Midday Service',
  'After Hours': 'After Hours'
};

function getDefaultSessionModeByTime(): SessionMode {
  const hour = new Date().getHours();

  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Midday';
  return 'After Hours';
}

function getLocalClock(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export default function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionMode, setSessionMode] = useState<SessionMode>(() => getDefaultSessionModeByTime());
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedTrackPath = useMemo(() => sessionModeTracks[sessionMode], [sessionMode]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

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

  const handleModeChange = async (mode: SessionMode) => {
    const audio = audioRef.current;
    const shouldResumePlayback = Boolean(audio && !audio.paused);

    setSessionMode(mode);

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.src = sessionModeTracks[mode];
    audio.load();

    if (!shouldResumePlayback) {
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0b0f14] px-6 py-14 text-[#f5f5f3]">
      <audio
        ref={audioRef}
        src={selectedTrackPath}
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="w-full max-w-md space-y-10">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-medium tracking-[-0.01em]">{sessionTitles[sessionMode]}</h1>
          <p className="text-sm text-[#d8d2c7]">{getLocalClock(currentTime)} — System Ready</p>
        </header>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={togglePlayback}
            className={[
              'relative inline-flex h-52 w-52 items-center justify-center rounded-full border text-xl font-semibold tracking-[0.06em] transition duration-150',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c18745]/35 active:scale-[0.98] active:translate-y-[1px]',
              isPlaying
                ? 'border-[#c18745] bg-[#b47f3f] text-[#18130d] shadow-[0_16px_38px_rgba(0,0,0,0.52),0_0_0_8px_rgba(193,135,69,0.12),0_0_34px_rgba(193,135,69,0.38)]'
                : 'border-[#8f6e45] bg-[#8a6438] text-[#f5f1e8] shadow-[0_14px_30px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,244,222,0.08)] hover:bg-[#946c3d]'
            ]
              .join(' ')
              .trim()}
            aria-label={isPlaying ? 'Stop playback' : 'Start playback'}
          >
            {isPlaying ? 'STOP' : 'START'}
          </button>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#b9b2a5]">Mode</p>
          <div className="inline-flex items-center gap-2 text-sm text-[#ddd8ce]">
            {sessionModes.map((mode, index) => {
              const selected = sessionMode === mode;

              return (
                <div key={mode} className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void handleModeChange(mode)}
                    className={[
                      'transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c18745]/35 rounded-sm px-1',
                      selected ? 'text-[#c18745]' : 'text-[#ddd8ce] hover:text-[#f5f5f3]'
                    ]
                      .join(' ')
                      .trim()}
                  >
                    {mode}
                  </button>
                  {index < sessionModes.length - 1 ? <span className="text-[#6a6660]">|</span> : null}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs tracking-[0.08em] text-[#9f9a8f]">Room Balance — Active</p>
      </div>
    </section>
  );
}
