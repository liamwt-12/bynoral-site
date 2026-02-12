const marketStats = [
  {
    value: '10,199',
    descriptor: 'branded coffee shop outlets (UK)',
    label: 'Market footprint'
  },
  {
    value: '£5.3bn',
    descriptor: 'market value',
    label: 'Category scale'
  },
  {
    value: '+3.6%',
    descriptor: 'outlet growth (last 12 months)',
    label: 'Momentum'
  }
];

export function StatsStrip() {
  return (
    <div className="grid gap-4 rounded-2xl border border-border-light/90 bg-surface p-5 shadow-[0_12px_26px_-20px_rgba(18,22,28,0.45)] sm:grid-cols-3 sm:p-6">
      {marketStats.map((stat) => (
        <div key={stat.label} className="space-y-1 border-b border-border-light/80 pb-3 last:border-b-0 last:pb-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 sm:last:border-r-0 sm:last:pr-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-light-muted">{stat.label}</p>
          <p className="text-3xl font-heading leading-none text-text-light-primary">{stat.value}</p>
          <p className="text-sm text-text-light-muted">{stat.descriptor}</p>
        </div>
      ))}
    </div>
  );
}
