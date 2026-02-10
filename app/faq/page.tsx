import { Card, Section } from '../../components';

const faqs = [
  {
    question: 'Do I need Spotify?',
    answer: 'No. Bynoral runs independently, so there is no need for Spotify or playlist management tools.'
  },
  {
    question: 'Is it legally safe for my business?',
    answer:
      'Yes. Bynoral is designed for commercial settings with continuous soundscapes made for business environments.'
  },
  {
    question: 'Do I need PRS/PPL?',
    answer: 'No PRS/PPL is required for Bynoral soundscapes.'
  },
  {
    question: 'What do I play it on?',
    answer: 'You can play Bynoral on an iPad, laptop, or through connected speakers in your space.'
  },
  {
    question: 'Does it work if Wi-Fi drops?',
    answer: 'Offline mode is planned as an add-on for resilient playback when connectivity is interrupted.'
  },
  {
    question: 'Can staff change it?',
    answer: 'Yes. Staff can adjust vibe and intensity settings, while the core system stays simple and consistent.'
  },
  {
    question: 'Can I use it in multiple locations?',
    answer: 'Yes. The Multi-Location plan supports up to 5 locations with central control.'
  }
];

export default function FaqPage() {
  return (
    <>
      <Section className="pb-6 pt-20 sm:pt-24 lg:pt-32">
        <div className="space-y-5">
          <h1 className="max-w-3xl font-heading text-5xl leading-tight tracking-tight text-text-primary sm:text-6xl">
            FAQ
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Answers to common questions before you start playing.
          </p>
        </div>
      </Section>

      <Section>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <Card
              key={faq.question}
              className="space-y-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,30,30,0.08)]"
            >
              <h2 className="text-2xl leading-tight">{faq.question}</h2>
              <p className="text-base leading-relaxed text-text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
