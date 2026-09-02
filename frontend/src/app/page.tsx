import Link from "next/link";
import Arc from "@/components/Arc";
import Testimonials from "@/components/user-review";

const services = [
  {
    name: "Sports injury recovery",
    detail: "Targeted rehab plans to get you back to training and competing.",
  },
  {
    name: "Post-surgical rehabilitation",
    detail: "Guided, progressive recovery following orthopaedic surgery.",
  },
  {
    name: "Chronic pain & posture",
    detail: "Long-term relief for back, neck, and joint pain from daily strain.",
  },
  {
    name: "Mobility for older adults",
    detail: "Balance, strength, and confidence for everyday movement.",
  },
];

const steps = [
  { title: "Book online", detail: "Pick a service and a time that works for you." },
  { title: "We confirm on WhatsApp", detail: "You'll hear back within the same day to lock in your slot." },
  { title: "First session", detail: "A full assessment and the start of your recovery plan." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.78fr)] lg:items-center lg:gap-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sage)]">
                <Arc className="h-5 w-10" />
                <span>One-on-one physiotherapy</span>
              </div>
              <h1 className="mt-7 max-w-xl font-display text-5xl leading-[0.98] tracking-[-0.04em] text-[var(--ink)] md:text-7xl">
                Movement,
                <br />
                <span className="text-[var(--accent)]">restored.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl">
                Get back to moving without thinking about it. Personalised care
                for pain relief, injury recovery, and rebuilding strength.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/appointment"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-semibold text-white shadow-lg shadow-[rgba(13,122,107,0.18)] transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  Book an appointment
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center rounded-full border border-[var(--line)] px-5 text-[15px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  Explore services
                </Link>
              </div>
              <p className="mt-5 text-sm text-[var(--ink-soft)]">
                Preferred time collected online · confirmation via WhatsApp the same day
              </p>
            </div>

            <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-[var(--ink)] p-7 text-white shadow-xl shadow-[rgba(15,43,42,0.12)] md:min-h-[27rem] md:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full border border-white/10" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Your recovery plan</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">01 / 03</span>
                </div>
                <div className="py-10">
                  <Arc className="h-10 w-20 brightness-0 invert opacity-90" />
                  <p className="mt-6 max-w-xs font-display text-3xl leading-tight md:text-4xl">
                    Clear steps. Confident movement.
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
                    Assessment-led care that meets you where you are and builds toward where you want to be.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/15 pt-5 text-sm">
                  <span className="text-white/65">Tailored to your body</span>
                  <Link href="/appointment">
                  <span className="font-semibold text-[var(--accent-light)]">Start today →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 border-t border-[var(--line)] pt-6 text-sm sm:grid-cols-3 md:mt-20">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--ink-soft)]"><strong className="font-semibold text-[var(--ink)]">15+ years</strong> of clinical experience</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--ink-soft)]"><strong className="font-semibold text-[var(--ink)]">One-on-one</strong> sessions, every time</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--ink-soft)]"><strong className="font-semibold text-[var(--ink)]">Same-day</strong> WhatsApp confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl text-[var(--ink)] md:text-3xl">
              How we can help
            </h2>
            <Link href="/services" className="hidden text-sm text-[var(--ink-soft)] underline underline-offset-4 hover:text-[var(--ink)] md:inline">
              View all services
            </Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
            {services.map((s) => (
              <div key={s.name} className="bg-[var(--surface)] p-8">
                <p className="font-display text-lg text-[var(--ink)]">{s.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* How booking works */}
      <section id="booking" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl text-[var(--ink)] md:text-3xl">
          Booking takes three steps
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title}>
              <div className="flex items-center gap-3">
                <Arc className="h-4 w-8" />
                <span className="text-sm text-[var(--ink-soft)]">Step {i + 1}</span>
              </div>
              <p className="mt-3 font-display text-lg text-[var(--ink)]">{s.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <p className="font-display text-2xl text-white md:text-3xl">
            Ready to start feeling better?
          </p>
          <Link
            href="/appointment"
            className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Book your first session
          </Link>
        </div>
      </section>
    </div>
  );
}
