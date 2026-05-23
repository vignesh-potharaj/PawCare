"use client";

import React, { useState } from "react";
import { HeartPulse, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setFormSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="bg-navy-900 text-navy-100 pt-20 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Upper Footer: CTA & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-navy-800 items-start">
          {/* Brand and contact info */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-clinic-teal flex items-center justify-center text-white shadow-md shadow-clinic-teal/20">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Vet<span className="text-clinic-teal">Care</span>
              </span>
            </a>
            <p className="text-navy-200/70 font-sans text-base max-w-md leading-relaxed">
              We provide empathetic care, advanced medical services, and a warm, inviting environment for your beloved pets. Reach out to book your visit or consultation today.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-clinic-teal">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-200/50 uppercase tracking-wider font-sans">Emergency & Booking Line</p>
                  <a href="tel:+15552347890" className="text-lg font-serif font-bold text-white hover:text-clinic-teal transition-colors">
                    +1 (555) 234-7890
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-clinic-blue">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-200/50 uppercase tracking-wider font-sans">General Inquiries</p>
                  <a href="mailto:hello@vetcareclinic.com" className="text-base text-white hover:text-clinic-teal transition-colors">
                    hello@vetcareclinic.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-clinic-teal">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-200/50 uppercase tracking-wider font-sans">Our Address</p>
                  <span className="text-base text-white">
                    104 Care Lane, San Francisco, CA 94107
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Appointment / News Sign Up Form */}
          <div className="lg:col-span-6 bg-navy-800 p-8 rounded-3xl border border-navy-800 shadow-xl">
            <h3 className="font-serif font-bold text-2xl text-white mb-2">Book a Visit</h3>
            <p className="text-navy-200/60 font-sans text-sm mb-6">
              Enter your email below. Our veterinary coordinators will reach out immediately to schedule your pet&apos;s appointment.
            </p>

            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-6 text-center bg-clinic-teal/10 rounded-2xl border border-clinic-teal/20 text-clinic-teal gap-3">
                <CheckCircle2 className="w-10 h-10" />
                <h4 className="font-serif font-bold text-lg text-white">Request Received!</h4>
                <p className="text-sm text-navy-200/80 px-6 font-sans">
                  Thank you. We will contact you at your email address within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="yourname@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-navy-900 border border-navy-800 rounded-xl text-white placeholder-navy-200/30 focus:outline-none focus:border-clinic-teal transition-colors font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-clinic-teal hover:bg-clinic-tealHover text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-clinic-teal/10 transition-colors duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  Request Appointment
                </button>
              </form>
            )}

            <div className="flex gap-3 items-start mt-6 text-xs text-navy-200/40 font-sans leading-relaxed">
              <Clock className="w-4 h-4 flex-shrink-0 text-clinic-blue" />
              <div>
                <span className="text-navy-200/60 font-semibold block">Clinic Hours:</span>
                Mon – Fri: 7:00 AM – 9:00 PM | Sat & Sun: 8:00 AM – 6:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer: Navigation & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 items-center text-xs text-navy-200/50 font-sans">
          <div>
            <p>© {new Date().getFullYear()} VetCare Clinic. All rights reserved. Empathy & Excellence in Veterinary Science.</p>
          </div>
          <div className="flex gap-6 md:justify-end">
            <a href="#services" className="hover:text-clinic-teal transition-colors">Services</a>
            <a href="#about" className="hover:text-clinic-teal transition-colors">Our Team</a>
            <a href="#" className="hover:text-clinic-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-clinic-teal transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
