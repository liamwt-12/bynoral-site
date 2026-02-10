type MarqueeProps = {
  label: string;
  items: string[];
};

export function Marquee({ label, items }: MarqueeProps) {
  const looped = [...items, ...items];

  return (
    <div className="flex items-center gap-4 overflow-hidden">
      <p className="shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-text-muted sm:text-xs">
        {label}
      </p>
      <div className="marquee-track flex min-w-0 flex-1 overflow-hidden">
        <div className="marquee-content flex min-w-max items-center gap-3 pr-3 text-xs uppercase tracking-[0.18em] text-text-muted sm:text-sm">
          {looped.map((item, idx) => (
            <span key={`${item}-${idx}`} className="inline-flex items-center gap-3 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-text-muted/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
