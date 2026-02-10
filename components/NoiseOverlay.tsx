type NoiseOverlayProps = {
  className?: string;
};

export function NoiseOverlay({ className = '' }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'noise-overlay pointer-events-none absolute inset-0',
        className
      ]
        .join(' ')
        .trim()}
    />
  );
}
