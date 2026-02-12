const trustSignals = ['Built in the UK', 'Designed for independent cafés', 'Founder-led'];

export function TrustStack() {
  return (
    <ul className="grid max-w-2xl gap-2 pt-3 text-sm text-text-muted sm:grid-cols-3">
      {trustSignals.map((signal) => (
        <li key={signal} className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/80" />
          <span>{signal}</span>
        </li>
      ))}
    </ul>
  );
}
