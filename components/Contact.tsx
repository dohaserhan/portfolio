"use client";

import { useState } from "react";
import { Mail, FileText, Copy, Check, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { contactData } from "@/data/contact";

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
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent-purple/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Main Unified Card Container */}
        <div className="group relative bg-[#06101d]/60 bg-gradient-to-b from-[#06101d]/80 to-[#040b14]/60 p-8 sm:p-10 lg:p-12 overflow-hidden rounded-3xl border border-white/[0.06] shadow-[0_24px_60px_rgba(0,0,0,0.4)] hover:border-white/[0.12] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* Subtle backdrop purple glow */}
          <div className="absolute inset-0 bg-radial from-accent-purple/5 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-all duration-500" />

          {/* Developer Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

          {/* Grid Layout inside the Card */}
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left Column: Heading, Actions, Core Stack */}
            <div className="flex flex-col justify-between h-full space-y-8">
              <div>
                <span className="inline-flex items-center rounded-full border border-accent-purple/20 bg-accent-purple/10 px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent-purple">
                  {contactData.badge}
                </span>

                <h2 className="mt-6 text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                  {contactData.heading}
                </h2>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/60">
                 {contactData.description}
                </p>
              </div>

              {/* Main Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#040b14] shadow-[0_12px_24px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.03] hover:bg-white/95"
                >
                  Email Direct
                </a>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/70 transition-all hover:border-white/20 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied Address</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Core Capabilities tags */}
              <div className="border-t border-white/5 pt-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 select-none">
                  Core System Capabilities
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {contactData.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="inline-flex items-center rounded-lg border border-white/[0.04] bg-white/[0.01] px-3.5 py-2 text-[10px] font-semibold text-white/60 select-none transition-colors hover:border-accent-purple/30 hover:text-white"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Stack of Connection Cards */}
            <div className="flex flex-col gap-4 w-full">
              {/* Email Card */}
              <a
                href={`mailto:${emailAddress}`}
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-white/[0.04] bg-[#06101d]/30 hover:border-accent-purple/20 hover:bg-[#06101d]/60 transition-all duration-300"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                    Email
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover/card:text-accent-purple transition-colors">
                    {emailAddress}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 group-hover/card:border-accent-purple/30 group-hover/card:bg-accent-purple/10 group-hover/card:text-accent-purple transition-all">
                  <Mail className="h-4 w-4" />
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-white/[0.04] bg-[#06101d]/30 hover:border-accent-purple/20 hover:bg-[#06101d]/60 transition-all duration-300"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                    LinkedIn
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover/card:text-accent-purple transition-colors">
                    {profile.name}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 group-hover/card:border-accent-purple/30 group-hover/card:bg-accent-purple/10 group-hover/card:text-accent-purple transition-all">
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
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-white/[0.04] bg-[#06101d]/30 hover:border-accent-purple/20 hover:bg-[#06101d]/60 transition-all duration-300"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                    GitHub
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover/card:text-accent-purple transition-colors">
                    {profile.socials.github.split("/").pop()}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 group-hover/card:border-accent-purple/30 group-hover/card:bg-accent-purple/10 group-hover/card:text-accent-purple transition-all">
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
                className="group/card flex items-center justify-between p-5 rounded-2xl border border-white/[0.04] bg-[#06101d]/30 hover:border-accent-purple/20 hover:bg-[#06101d]/60 transition-all duration-300"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                    Curriculum Vitae
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover/card:text-accent-purple transition-colors">
                    Download CV (PDF)
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 group-hover/card:border-accent-purple/30 group-hover/card:bg-accent-purple/10 group-hover/card:text-accent-purple transition-all">
                  <FileText className="h-4 w-4" />
                </div>
              </a>

              {/* Availability Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.04] bg-[#06101d]/30">
                <div className="flex flex-col items-start text-left">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                    Availability
                  </span>
                  <span className="mt-0.5 text-sm sm:text-base font-bold text-emerald-400">
                    Active & Accepting Opportunities
                  </span>
                </div>
                <div className="relative flex h-2 w-2 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
