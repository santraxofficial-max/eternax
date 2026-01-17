import React, { useState } from "react";

const faqs = [
  {
    question: "What makes eterna packaging different from traditional plastic?",
    answer:
      "Our bio-based materials are derived from renewable plant sources and offer superior performance while being fully compostable. Unlike traditional plastics that persist in landfills for centuries, eterna packaging naturally breaks down within months under proper composting conditions.",
    meta: "Materials",
  },
  {
    question: "How do you ensure packaging meets food safety standards?",
    answer:
      "We conduct rigorous testing and maintain certifications for food contact safety, including FDA compliance and EU food contact regulations. Our materials are free from harmful chemicals and undergo comprehensive migration testing to ensure they don't transfer substances to packaged goods.",
    meta: "Quality",
  },
  {
    question: "Can eterna materials handle moisture and temperature variations?",
    answer:
      "Yes, our formulations are specifically engineered for food packaging applications. They provide excellent moisture barriers, temperature resistance, and structural integrity, ensuring products arrive fresh and protected regardless of shipping conditions.",
    meta: "Performance",
  },
  {
    question: "What's the process for developing custom packaging solutions?",
    answer:
      "We start with understanding your product requirements, then work through material selection, prototyping, and testing phases. Our collaborative approach ensures the final solution perfectly matches your brand vision while meeting all functional requirements.",
    meta: "Process",
  },
  {
    question: "How does eterna support brands in meeting sustainability goals?",
    answer:
      "We help brands achieve their environmental targets through measurable reductions in carbon footprint, improved recyclability, and enhanced brand positioning. Our materials typically reduce plastic use by 90-100% compared to traditional packaging.",
    meta: "Sustainability",
  },
  {
    question: "What certifications does eterna packaging carry?",
    answer:
      "Our materials hold multiple certifications including BPI Compostable, FDA Food Contact Safe, and various regional compostability standards. We also provide full documentation for regulatory compliance and marketing claims.",
    meta: "Compliance",
  },
];


function FAQ1() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleQuestion = (index) => setActiveIndex((prev) => (prev === index ? -1 : index));

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">

        <header className="text-center mb-12">
          <p className="text-copper text-sm font-medium uppercase tracking-wider mb-2">Questions</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
            Sustainable packaging, clarified.
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about partnering with eterna for your sustainable packaging solutions.
          </p>
        </header>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;

            return (
              <li
                key={item.question}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5 shadow-sm"
              >

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-6 px-8 py-7 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-muted transition-all duration-500 group-hover:scale-105"
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 border-muted-foreground ${
                        open ? "animate-ping" : ""
                      }`}
                    />
                    <svg
                      className="relative h-5 w-5 transition-transform duration-500 text-foreground"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <h2 className="text-lg font-medium leading-tight sm:text-xl text-foreground">
                        {item.question}
                      </h2>
                      {item.meta && (
                        <span className="inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto text-muted-foreground bg-muted">
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-sm leading-relaxed transition-[max-height] duration-500 ease-out ${
                        open ? "max-h-64" : "max-h-0"
                      } text-muted-foreground`}
                    >
                      <p className="pr-2 text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FAQ1;
export { FAQ1 };
