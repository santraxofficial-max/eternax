import * as React from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { FAQ1 } from "@/components/ui/faq-monocrhome"
import { motion } from "motion/react"

const testimonials = [
  {
    text: "Eterna's luxury apparel packaging elevated our unboxing experience and instantly reinforced our premium positioning.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Mitchell",
    role: "Creative Director, Maison Aurelia",
  },
  {
    text: "Our silk garments now arrive crease-free and perfectly protected. The attention to detail is exceptional.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Chen",
    role: "Operations Lead, Lune Atelier",
  },
  {
    text: "The structural integrity of the gown boxes reduced transit damage for couture deliveries across regions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Priya Sharma",
    role: "Head of Production, Velora Couture",
  },
  {
    text: "Color and texture matching made our packaging feel like a natural extension of the collection itself.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "James Rodriguez",
    role: "Brand Manager, Noir & Co.",
  },
  {
    text: "Sustainable materials that still look and feel luxurious were a non-negotiable for us. Eterna delivered.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Emma Thompson",
    role: "Marketing Director, Atelier Véra",
  },
  {
    text: "Outerwear now ships without scuffs or compression marks. Our logistics team loves the durability.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Ahmed Hassan",
    role: "Supply Chain Manager, Élan Studio",
  },
  {
    text: "The dust bags and inserts feel bespoke. Customers keep them, which says everything.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Wang",
    role: "Brand Director, Soleil Luxe",
  },
  {
    text: "Low MOQs for capsule collections let us test new product lines without compromising quality.",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    name: "Michael Torres",
    role: "Product Development Lead, Atelier One",
  },
  {
    text: "The onboarding flow is clear and the design studio handoff feels seamless for every product.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    name: "Rachel Kim",
    role: "Merchandising Director, Étoile House",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
            What our partners say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our partners have to say about us.
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

const FAQ = () => {
    return <FAQ1 />
}

const DemoComponents = {
    Testimonials,
    FAQ
}

export default DemoComponents