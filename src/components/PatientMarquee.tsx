import { Marquee } from "@/components/ui/marquee";

const patientStories = [
  {
    quote: "After six weeks, I could climb stairs without bracing myself.",
    name: "Amelia R.",
    detail: "Knee rehabilitation · Dummy patient story",
  },
  {
    quote: "The plan was clear, practical, and built around my actual routine.",
    name: "Daniel M.",
    detail: "Lower-back pain · Dummy patient story",
  },
  {
    quote: "I returned to weekend tennis feeling stronger and more confident.",
    name: "Priya S.",
    detail: "Sports injury recovery · Dummy patient story",
  },
  {
    quote: "Small, consistent steps made a bigger difference than I expected.",
    name: "Marcus T.",
    detail: "Post-surgical rehabilitation · Dummy patient story",
  },
];

function PatientStory({ story }: { story: (typeof patientStories)[number] }) {
  return (
    <article className="w-[min(20rem,78vw)] shrink-0 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(15,43,42,0.05)] sm:w-80">
      <p className="font-display text-lg leading-snug tracking-[-0.02em] text-[var(--ink)]">“{story.quote}”</p>
      <div className="mt-6 border-t border-[var(--line)] pt-4">
        <p className="text-sm font-semibold text-[var(--ink)]">{story.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{story.detail}</p>
      </div>
    </article>
  );
}

export default function PatientMarquee() {
  return (
    <section aria-labelledby="patient-stories-heading" className="overflow-hidden border-t border-[var(--line)] bg-[var(--bg)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sage)]">Small steps, real progress</p>
            <h2 id="patient-stories-heading" className="mt-3 max-w-xl font-display text-3xl leading-tight tracking-[-0.03em] text-[var(--ink)] md:text-4xl">
              Care that helps you move forward.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">
            Illustrative patient stories shown for layout preview. Replace with approved testimonials before launch.
          </p>
        </div>
      </div>
      <Marquee pauseOnHover className="mt-8 [--duration:48s] [--gap:1rem]" aria-label="Illustrative patient stories">
        {patientStories.map((story) => (
          <PatientStory key={story.name} story={story} />
        ))}
      </Marquee>
    </section>
  );
}
