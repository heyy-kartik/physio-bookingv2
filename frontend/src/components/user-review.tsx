"use client" ; 
import { TestimonialsColumn } from "@/components/ui/testimonials";
import { motion } from "motion/react";

// Fictionalized examples for layout/demo purposes; replace with consented patient reviews before publishing.
const testimonials = [
  {
    text: "After a knee injury, I was worried I would not get back to my morning walks. The exercises were explained clearly, and I could feel steady progress every week.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Aditi Deshmukh",
    role: "Physiotherapy patient, Pune",
  },
  {
    text: "The treatment for my shoulder pain was gentle and practical. I also received simple exercises to continue at home, which made a big difference.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rohan Kulkarni",
    role: "Physiotherapy patient, Nashik",
  },
  {
    text: "I had been struggling with back stiffness for months. The sessions helped me move more comfortably and understand how to avoid repeating the problem.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Snehal Patil",
    role: "Physiotherapy patient, Kolhapur",
  },
  {
    text: "The clinic feels welcoming and the care is personalized. My ankle rehabilitation plan was easy to follow, and my confidence improved along with my strength.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    name: "Amol Jadhav",
    role: "Physiotherapy patient, Aurangabad",
  },
  {
    text: "I appreciated the patience during every session. The therapist listened carefully and adjusted the exercises whenever something felt uncomfortable.",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    name: "Mugdha Joshi",
    role: "Physiotherapy patient, Thane",
  },
  {
    text: "My neck pain used to affect my workday. With regular therapy and better posture habits, I can now work with much less discomfort.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Siddharth Bhosale",
    role: "Physiotherapy patient, Mumbai",
  },
  {
    text: "The recovery plan after my sports injury was structured and encouraging. Each milestone was clear, and I always knew what to work on next.",
    image: "https://randomuser.me/api/portraits/women/49.jpg",
    name: "Vaishnavi Shinde",
    role: "Physiotherapy patient, Satara",
  },
  {
    text: "I came in with persistent hip pain and left with a better understanding of my movement. The home routine fit easily into my daily schedule.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Nikhil Sawant",
    role: "Physiotherapy patient, Ratnagiri",
  },
  {
    text: "The sessions helped me regain balance and mobility after a long period of weakness. The supportive approach made rehabilitation feel manageable.",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    name: "Kavita More",
    role: "Physiotherapy patient, Solapur",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;