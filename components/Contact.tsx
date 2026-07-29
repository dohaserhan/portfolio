"use client";

import { useState } from "react";
import { Mail, FileText, Copy, Check, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { contactData } from "@/data/contact";
import CTAButton from "./CTAButton";

function parseBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = profile.email;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-16 text-white lg:px-12 lg:py-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center scroll-mt-24"
    >
      {/* Background glow centered behind the card */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent-purple/[0.06] blur-[130px] -z-10" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Main Unified Card Container */}
        <div className="group relative bg-bg-card/60 bg-gradient-to-b from-bg-card/80 to-bg-dark/60 p-8 sm:p-10 lg:p-12 overflow-hidden rounded-3xl border border-white/[0.06] shadow-[0_24px_60px_rgba(0,0,0,0.4)] hover:border-white/[0.12] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* Subtle backdrop purple glow */}
          <div className="absolute inset-0 bg-radial from-accent-purple/5 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-all duration-500" />

          {/* Developer Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

          {/* Grid Layout inside the Card */}
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left Column: Heading, Actions, Core Stack */}
            <div className="flex flex-col justify-between h-full space-y-8">
              <div>
                <span className="inline-flex items-center rounded-full border border-accent-purple/20 bg-accent-purple/5 px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent-purple">
                  {contactData.badge}
                </span>

                <h2 className="mt-6 text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl text-[#211e24]">
                  Let's Build Something Great <span className="text-accent-purple font-semibold">Together.</span>
                </h2>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-text-secondary/90">
                  {parseBoldText(contactData.description)}
                </p>

                {/* Quick Highlights / Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-2xl border border-border-color bg-[#fafaf8] backdrop-blur-sm flex flex-col justify-center transition-all duration-300 hover:border-accent-purple/20 hover:shadow-[0_4px_12px_rgba(98,86,125,0.04)]">
                    <span className="text-2xl sm:text-3xl font-extrabold text-accent-purple">4+</span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary/60 leading-tight">Production Projects</span>
                  </div>
                  <div className="p-4 rounded-2xl border border-border-color bg-[#fafaf8] backdrop-blur-sm flex flex-col justify-center transition-all duration-300 hover:border-accent-purple/20 hover:shadow-[0_4px_12px_rgba(98,86,125,0.04)]">
                    <span className="text-2xl sm:text-3xl font-extrabold text-accent-purple">3+</span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary/60 leading-tight">Backend Frameworks</span>
                  </div>
                </div>
              </div>

              {/* Main Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <CTAButton
                  href={`mailto:${emailAddress}`}
                  className="w-full sm:w-auto"
                >
                  Send Me an Email
                </CTAButton>

                <button
                  onClick={handleCopy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.03em] text-text-primary bg-white/50 border border-[rgba(60,50,70,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-[10px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-0.5 hover:bg-white/80 hover:border-[rgba(111,90,145,0.25)] sm:w-auto sm:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Email Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>


            </div>

            {/* Right Column: Stack of Connection Cards */}
            {/* Right Column: Stack of Connection Cards */}
            <div className="flex flex-col gap-4 w-full">
              {/* Email Card */}
              <a
                href={`mailto:${emailAddress}`}
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-border-color bg-white hover:-translate-y-[3px] hover:border-accent-purple/25 hover:bg-[#fafaf8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(30,27,24,0.04)]"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60">
                    Email
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-text-primary group-hover/card:text-accent-purple transition-colors duration-500">
                    {emailAddress}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] text-accent-purple shadow-[0_2px_4px_rgba(0,0,0,0.02)] group-hover/card:border-accent-purple group-hover/card:bg-accent-purple group-hover/card:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <Mail className="h-4 w-4" />
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-border-color bg-white hover:-translate-y-[3px] hover:border-accent-purple/25 hover:bg-[#fafaf8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(30,27,24,0.04)]"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60">
                    LinkedIn
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-text-primary group-hover/card:text-accent-purple transition-colors duration-500">
                    {profile.name}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] text-accent-purple shadow-[0_2px_4px_rgba(0,0,0,0.02)] group-hover/card:border-accent-purple group-hover/card:bg-accent-purple group-hover/card:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-border-color bg-white hover:-translate-y-[3px] hover:border-accent-purple/25 hover:bg-[#fafaf8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(30,27,24,0.04)]"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60">
                    GitHub
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-text-primary group-hover/card:text-accent-purple transition-colors duration-500">
                    {profile.socials.github.split("/").pop()}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] text-accent-purple shadow-[0_2px_4px_rgba(0,0,0,0.02)] group-hover/card:border-accent-purple group-hover/card:bg-accent-purple group-hover/card:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
              </a>

              {/* CV Card */}
              <a
                href={profile.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-border-color bg-white hover:-translate-y-[3px] hover:border-accent-purple/25 hover:bg-[#fafaf8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(30,27,24,0.04)]"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60">
                    Curriculum Vitae
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-text-primary group-hover/card:text-accent-purple transition-colors duration-500 flex items-center gap-1.5">
                    Download CV (PDF)
                    <span className="inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-1 opacity-0 w-0 group-hover/card:w-3 group-hover/card:opacity-100 group-hover/card:translate-x-2">
                      ↓
                    </span>
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] text-accent-purple shadow-[0_2px_4px_rgba(0,0,0,0.02)] group-hover/card:border-accent-purple group-hover/card:bg-accent-purple group-hover/card:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <FileText className="h-4 w-4" />
                </div>
              </a>

              {/* Availability Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl border border-border-color bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60">
                    Availability
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-accent-purple">
                    Available for Full-Time Roles
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
