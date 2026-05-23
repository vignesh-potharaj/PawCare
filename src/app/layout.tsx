import type { Metadata } from "next";
import { inter, merriweather } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "VetCare | Premium, Compassionate Veterinary Clinic",
  description: "Experience premium scrollytelling for a world-class veterinary clinic. Empathy, trust, and advanced care for your best friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased text-[#1A202C] bg-[#F9F8F6] selection:bg-[#4FD1C5]/30`}
      >
        {children}
      </body>
    </html>
  );
}
