"use client";

import Image from "next/image";
import { Heart, Award, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Heart,
      title: "Empathetic Philosophy",
      description: "We treat every animal as if they were our own companion, ensuring stress-free visits.",
    },
    {
      icon: Award,
      title: "Board-Certified Specialists",
      description: "Our diverse veterinary staff holds advanced training in complex surgeries and diagnostics.",
    },
    {
      icon: ShieldAlert,
      title: "Emergency Care",
      description: "Equipped to handle urgent care and trauma with overnight monitoring and critical services.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image with premium styling */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-warm-300/40 bg-white p-4">
              <div className="relative h-[400px] md:h-[550px] w-full rounded-[24px] overflow-hidden">
                <Image
                  src="/images/vet_with_cat.png"
                  alt="Compassionate Veterinarian with Cat"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-w-768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Decorative Floating Card */}
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-warm-300/20 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-clinic-teal flex items-center justify-center text-white flex-shrink-0 animate-bounce">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-navy-800 text-base">Compassionate Care First</h4>
                  <p className="text-xs text-navy-800/60 font-sans">Voted Best Vet Clinic 3 Years Running</p>
                </div>
              </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-clinic-teal/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-clinic-blue/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Column: Empathy Text & Highlights */}
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold text-clinic-blue uppercase tracking-widest block mb-3">
              About Our Clinic
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-navy-800 leading-tight mb-6">
              Caring for them like they are our own family.
            </h2>
            <p className="text-navy-800/70 font-sans text-lg leading-relaxed mb-10">
              We believe veterinary medicine is about more than just medicine—it’s about empathy, trust, and deep respect for the bond between you and your pet. In our warm, quiet environment, your pet will feel safe, calm, and loved.
            </p>

            {/* Highlights List */}
            <div className="flex flex-col gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F3F1ED] flex items-center justify-center text-clinic-teal flex-shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-navy-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-navy-800/60 font-sans text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra assurance badge */}
            <div className="mt-10 flex items-center gap-2 text-clinic-teal text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 fill-clinic-teal/10" />
              <span>AAHA Accredited Hospital — The Standard of Veterinary Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
