import { Card, Section } from '../../components';

const sections = [
  {
    title: 'Press play',
    body: 'Runs all day with consistent output, so your atmosphere stays steady from open to close.'
  },
  {
    title: 'Designed moods',
    body: 'No tracks, no playlists. Just continuous sound designed to suit real spaces and real routines.'
  },
  {
    title: 'Chatter reduction',
    body: 'Optional mode to gently reduce perceived background chatter during busy periods.'
  },
  {
    title: 'Commercially safe',
    body: 'No PRS/PPL required, with soundscapes designed for business use without licensing uncertainty.'
  },
  {
    title: 'Setup',
    body: 'Use an iPad, laptop, or connected speakers and get started in minutes.'
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pb-6 pt-20 sm:pt-24 lg:pt-32">
        <div className="space-y-5">
          <h1 className="max-w-3xl font-heading text-5xl leading-tight tracking-tight text-text-primary sm:text-6xl">
            How it works
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Calm atmosphere, fewer decisions, and reliable playback for your whole day.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((item) => (
            <Card
              key={item.title}
              className="space-y-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]"
            >
              <h2 className="text-3xl leading-tight">{item.title}</h2>
              <p className="text-base leading-relaxed text-text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
