type GlowProps = {
  className?: string;
};

export function Glow({ className = '' }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(47,111,94,0.3)_0%,rgba(47,111,94,0.08)_45%,transparent_75%)] blur-2xl',
        className
      ]
        .join(' ')
        .trim()}
    />
  );
}
