import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Zap, Target, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const differentiators = [
  {
    icon: Zap,
    title: "Not Commodity Packaging",
    description:
      "We don't sell generic boxes at bulk rates. Every package we produce is engineered for your specific product and brand requirements.",
  },
  {
    icon: Target,
    title: "Not Resellers",
    description:
      "We manufacture. That means you're working directly with the source—no markups from middlemen, no communication delays, no quality surprises.",
  },
  {
    icon: Layers,
    title: "Design-Led Manufacturing",
    description:
      "Your packaging isn't just functional—it's a brand touchpoint. We combine industrial expertise with design thinking.",
  },
];

const About = () => {
  const missionRef = useRef(null);
  const diffRef = useRef(null);
  const visionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const diffInView = useInView(diffRef, { once: true, margin: "-100px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-copper/5 via-transparent to-transparent" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              About Eterna
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-foreground leading-tight">
              We exist because plastic shouldn't.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Eterna was founded on a simple premise: luxury apparel brands deserve
              premium sustainable packaging. Not compromise solutions. Not
              greenwashing. Real, functional, beautiful alternatives to plastic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Eterna Was Created */}
      <section ref={missionRef} className="py-24 bg-midnight-light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-copper text-sm font-medium uppercase tracking-wider">
                Our Origin
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
                Born from frustration with the status quo.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                We watched innovative luxury apparel brands—those pushing boundaries in
                design, sustainability, and ethics—get stuck with the same plastic
                garment bags as everyone else. Their collections were revolutionary.
                Their packaging wasn't.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Eterna was built to bridge that gap. To give visionary luxury apparel brands
                packaging that matches their ambition. Packaging that protects
                their garments, represents their values, and doesn't end up in
                landfills for centuries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="card-premium p-10">
                <blockquote className="text-xl text-foreground font-medium italic leading-relaxed">
                  "Every year, 8 million tons of plastic enters our oceans.
                  We're here to make sure luxury apparel packaging isn't part of that
                  problem."
                </blockquote>
                <p className="mt-6 text-muted-foreground">
                  — The Eterna Team
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-copper/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section ref={diffRef} className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={diffInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Our Difference
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground">
              Three things we're not.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={diffInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="card-premium p-8 group hover:border-copper/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow">
                  <item.icon size={24} className="text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section ref={visionRef} className="py-24 bg-midnight-light">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Our Vision
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
              Dedicated to luxury apparel's sustainable future.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Today, we're focused entirely on luxury apparel packaging—where the
              need is urgent and the impact is immediate. As the luxury apparel industry
              leads the charge toward sustainability, we're committed to providing
              every luxury apparel brand with packaging that matches their vision for
              a better tomorrow.
            </p>
            <p className="mt-4 text-ash">
              But we're not rushing. We're perfecting.
            </p>

            <Link to="/start-project" className="inline-block mt-10">
              <Button variant="copper" size="lg" className="group">
                Partner With Us
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
