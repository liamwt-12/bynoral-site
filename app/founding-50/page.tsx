'use client';

import { FormEvent, useState } from 'react';

const formFields = [
  { id: 'name', label: 'Name', type: 'text', required: true },
  { id: 'cafeName', label: 'Café name', type: 'text', required: true },
  { id: 'city', label: 'City', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  { id: 'website', label: 'Website/Instagram', type: 'text', required: false }
] as const;

export default function FoundingFiftyPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submission = Object.fromEntries(formData.entries());

    console.log('Founding 50 application', submission);
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="relative overflow-hidden bg-[#0F1115] text-[#E8ECF3]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(90%_70%_at_12%_14%,rgba(39,47,66,0.36),transparent_70%),radial-gradient(90%_70%_at_82%_10%,rgba(35,40,54,0.24),transparent_66%),radial-gradient(75%_70%_at_50%_96%,rgba(20,24,33,0.5),transparent_68%)] animate-[aurora-drift_44s_ease-in-out_infinite_alternate]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.6)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-20 sm:px-10 sm:pt-24">
        <section className="space-y-8 pb-16 sm:pb-20">
          <h1 className="text-5xl font-medium leading-[0.92] tracking-[-0.02em] text-[#F4F6FA] sm:text-6xl">Founding 50 Cafés</h1>
          <p className="max-w-2xl text-lg text-[#D2D8E4] sm:text-xl">3 months free. No card. Honest feedback expected.</p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#E7EBF2] transition hover:border-white/40 hover:bg-white/[0.04]"
          >
            Apply for Founding Access <span aria-hidden="true">↓</span>
          </a>
        </section>

        <div className="space-y-14 sm:space-y-16">
          <section className="space-y-4">
            <h2 className="text-2xl leading-tight tracking-[-0.01em] text-[#F2F5FA] sm:text-3xl">Why we&apos;re doing this</h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#BAC4D4] sm:text-lg">
              Music sets the mood in a café, and that mood shouldn&apos;t depend on who&apos;s on shift. We&apos;re building Bynoral to make the
              atmosphere steady, intentional, and easy to run every day.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl leading-tight tracking-[-0.01em] text-[#F2F5FA] sm:text-3xl">What you get</h2>
            <ul className="space-y-3 text-base text-[#BAC4D4] sm:text-lg">
              <li>3 months free</li>
              <li>Full access</li>
              <li>Early influence on the product</li>
              <li>Direct line to founder</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl leading-tight tracking-[-0.01em] text-[#F2F5FA] sm:text-3xl">What we ask</h2>
            <ul className="space-y-3 text-base text-[#BAC4D4] sm:text-lg">
              <li>Honest feedback</li>
              <li>A short call after month one</li>
              <li>Optional case study if you&apos;re happy</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl leading-tight tracking-[-0.01em] text-[#F2F5FA] sm:text-3xl">Pricing after</h2>
            <p className="text-3xl text-[#DDE3EE] sm:text-4xl">£29 / month per café</p>
          </section>

          <section id="apply" className="scroll-mt-24 space-y-6 pt-4">
            <h2 className="text-2xl leading-tight tracking-[-0.01em] text-[#F2F5FA] sm:text-3xl">Apply form</h2>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {formFields.map((field) => (
                  <label key={field.id} htmlFor={field.id} className="space-y-2">
                    <span className="block text-sm uppercase tracking-[0.09em] text-[#9CA7BA]">{field.label}</span>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      className="w-full border-b border-white/20 bg-transparent pb-2 text-base text-[#E8ECF3] outline-none transition placeholder:text-[#7F8A9E] focus:border-white/55"
                    />
                  </label>
                ))}
              </div>

              <label htmlFor="cafeType" className="space-y-2">
                <span className="block text-sm uppercase tracking-[0.09em] text-[#9CA7BA]">What kind of café are you?</span>
                <input
                  id="cafeType"
                  name="cafeType"
                  type="text"
                  required
                  className="w-full border-b border-white/20 bg-transparent pb-2 text-base text-[#E8ECF3] outline-none transition placeholder:text-[#7F8A9E] focus:border-white/55"
                />
              </label>

              <label htmlFor="musicSetup" className="space-y-2">
                <span className="block text-sm uppercase tracking-[0.09em] text-[#9CA7BA]">What&apos;s your current music setup?</span>
                <input
                  id="musicSetup"
                  name="musicSetup"
                  type="text"
                  required
                  className="w-full border-b border-white/20 bg-transparent pb-2 text-base text-[#E8ECF3] outline-none transition placeholder:text-[#7F8A9E] focus:border-white/55"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#E7EBF2] transition hover:border-white/40 hover:bg-white/[0.04]"
              >
                Send application <span aria-hidden="true">→</span>
              </button>

              {submitted ? <p className="text-sm text-[#BFD4B8]">Thanks — we&apos;ll reply by email.</p> : null}
            </form>
          </section>
        </div>

        <p className="pt-16 text-lg text-[#AFB9CA] italic">— Liam</p>
      </div>
    </div>
  );
}
