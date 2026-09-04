import Link from "next/link";
import Arc from "@/components/Arc";
import Testimonials from "@/components/user-review";
import BookingButton from "@/components/BookingButton";
import Image from "next/image";
import { AvatarGroup, Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PhysiotherapyServicesAccordion from "@/components/PhysiotherapyServicesAccordion";

const services = [
  {
    id: "sports-injury",
    number: "01",
    title: "Sports Injury Recovery",
    detail: "Specialized treatment for sports-related injuries including muscle strains, joint sprains, and overuse injuries. Get back to your game stronger than before.",
  },
  {
    id: "post-surgical",
    number: "02", 
    title: "Post-Surgical Rehabilitation",
    detail: "Comprehensive recovery programs following orthopedic surgeries. Regain mobility, strength, and function through evidence-based rehabilitation techniques.",
  },
  {
    id: "chronic-pain",
    number: "03",
    title: "Chronic Pain & Posture",
    detail: "Long-term pain management and postural correction for conditions like lower back pain, neck pain, and repetitive strain injuries.",
  },
  {
    id: "mobility-seniors",
    number: "04",
    title: "Mobility for Older Adults", 
    detail: "Age-specific physiotherapy focused on maintaining independence, preventing falls, and managing age-related conditions like arthritis.",
  },
];

const steps = [
  { title: "Choose your service", detail: "Browse our specialized treatments for sports injuries, chronic pain, or post-surgical recovery." },
  { title: "Book your appointment", detail: "Select a convenient time — we confirm your slot via WhatsApp the same day." },
  { title: "Begin your recovery", detail: "Join 500+ patients on their journey back to full mobility." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden bg-[var(--ink)]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-image.webp"
            alt="Yoga practice"
            width={2000}
            height={1125}
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" /> */}
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Social Proof - Top */}
          
          {/* Hero Heading */}
          <h1 className=" max-w-2xl font-display text-3xl leading-[1.1] text-white md:text-5xl lg:text-9xl">
            <span className="inline-block px-4">Movement,</span> <span className="inline-block px-4">restored.</span>
          </h1>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <BookingButton text="Book Appointment" />
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 text-[15px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
            >
              View Our Services
            </Link>
          </div>

          {/* Video Card - Bottom */}
          
              

          {/* Social Proof - Bottom Right */}
          <div className="absolute bottom-20 right-6 flex items-center gap-3 md:bottom-28">
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://cdn.prod.website-files.com/69f9a1d4ec8c14c23cb89d30/69fa07b9983163bc891d968c_Student%201.webp" alt="Student 1" />
                <AvatarFallback>S1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://cdn.prod.website-files.com/69f9a1d4ec8c14c23cb89d30/69fa07b89aba25bae00bd8ff_b46c8d3675ae2e48dd740722e1ffc82c_Student%202.webp" alt="Student 2" />
                <AvatarFallback>S2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://cdn.prod.website-files.com/69f9a1d4ec8c14c23cb89d30/69fa07b8efc6c1439da361f0_Student%203.webp" alt="Student 3" />
                <AvatarFallback>S3</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <p className="text-sm text-white/90">500+ patients treated successfully</p>
          </div>
        </div>
      </section>

      {/* Services accordion */}
      <section className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="flex items-end justify-between gap-6 mb-12">
            <h2 className="font-display text-2xl text-[var(--ink)] md:text-3xl">
              Our Services
            </h2>
            <Link href="/services" className="hidden text-sm text-[var(--ink-soft)] underline underline-offset-4 hover:text-[var(--ink)] md:inline">
              All services
            </Link>
          </div>
          <PhysiotherapyServicesAccordion services={services} />
        </div>
      </section>

      <Testimonials />

      {/* How booking works */}
      <section id="booking" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl text-[var(--ink)] md:text-3xl">
          How to get started
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
            Ready to start your recovery?
          </p>
          <BookingButton text="Book your consultation" />
        </div>
      </section>
    </div>
  );
}
