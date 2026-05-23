"use client";

import { ShieldCheck, Stethoscope, Sparkles, Scissors, ArrowRight } from "lucide-react";

export default function Services() {
  const specialties = [
    {
      title: "Vaccinations & Wellness",
      description: "Preventative care tailored to your pet's lifestyle, including comprehensive check-ups, vaccines, and parasite prevention.",
      icon: ShieldCheck,
      color: "text-clinic-teal bg-clinic-teal/10",
      accent: "bg-clinic-teal",
    },
    {
      title: "Advanced Surgery",
      description: "State-of-the-art surgical suites offering routine spay/neuter, complex soft-tissue, and orthopaedic procedures.",
      icon: Stethoscope,
      color: "text-clinic-blue bg-clinic-blue/10",
      accent: "bg-clinic-blue",
    },
    {
      title: "Dental Care & Hygiene",
      description: "Full oral health assessments, professional scaling, polishing, and restorative dental therapies for fresh breath and health.",
      icon: Sparkles,
      color: "text-amber-600 bg-amber-500/10",
      accent: "bg-amber-500",
    },
    {
      title: "Professional Grooming",
      description: "Premium baths, breed-specific haircuts, nail trims, and ear cleaning to keep your companion looking and feeling their best.",
      icon: Scissors,
      color: "text-indigo-600 bg-indigo-500/10",
      accent: "bg-indigo-500",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-warm-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="text-xs font-semibold text-clinic-teal uppercase tracking-widest block mb-3">
            Our Specialties
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-navy-800 leading-tight mb-4">
            World-class medical care designed with warmth.
          </h2>
          <p className="text-navy-800/60 font-sans text-lg leading-relaxed">
            From routine checkups to emergency surgeries, our modern facilities and empathetic team ensure your pet receives exceptional treatment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {specialties.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#FDFDFD] border border-warm-300/40 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-in-out overflow-hidden"
            >
              {/* Colored bottom accent line that expands on hover */}
              <div
                className={`absolute bottom-0 left-0 h-1.5 w-0 ${item.accent} transition-all duration-500 ease-in-out group-hover:w-full`}
              />

              <div className="flex flex-col gap-6">
                {/* Icon Wrapper */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} transition-all duration-300 group-hover:scale-110`}
                >
                  <item.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif font-bold text-2xl text-navy-800 mb-3 group-hover:text-clinic-teal transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-navy-800/60 font-sans text-base leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Link */}
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-navy-800 font-semibold text-sm group-hover:text-clinic-teal transition-colors duration-300 mt-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
