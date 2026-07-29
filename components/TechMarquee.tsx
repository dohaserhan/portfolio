"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { row1Technologies, row2Technologies, type Technology } from "@/data/technologies";

type TechRowProps = {
  technologies: Technology[];
  animationClassName: string;
  duration: string;
  ariaHidden?: boolean;
};

function updateSpotlightPosition(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
}

function TechRow({
  technologies,
  animationClassName,
  duration,
  ariaHidden = false,
}: TechRowProps) {
  return (
    <div
      className={`flex shrink-0 ${animationClassName} items-center justify-around gap-8 min-w-full group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      style={{ animationDuration: duration }}
      aria-hidden={ariaHidden}
    >
      {technologies.map((tech, idx) => (
        <div key={`${ariaHidden ? "dup-" : ""}${tech.name}-${idx}`} className="flex shrink-0">
          <div
            className={`group/item flex items-center ${tech.gap} ${tech.px} rounded-full border border-accent-purple/10 bg-white/60 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_12px_rgba(98,86,125,0.03)] backdrop-blur-md transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-purple/35 hover:bg-white/95 hover:shadow-[0_8px_24px_rgba(98,86,125,0.08)] cursor-default will-change-transform`}
          >
            <div className="relative h-6 w-6 shrink-0 tech-logo-purple opacity-75 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_8px_rgba(157,124,255,0.4)]">
              <Image src={tech.icon} alt={`${tech.name} logo`} fill className="object-contain" />
            </div>
            <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-text-muted transition-colors duration-300 group-hover/item:text-accent-purple">
              {tech.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      onMouseMove={updateSpotlightPosition}
      className="relative overflow-hidden bg-bg-dark py-24 sm:py-32 [--spotlight-opacity:0] hover:[--spotlight-opacity:1]"
    >
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-accent-purple/5 blur-[120px] sm:h-[450px] sm:w-[700px] sm:blur-[140px]" />
        <div className="absolute bottom-[15%] left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-accent-purple/[0.03] blur-[130px] sm:h-[550px] sm:w-[800px]" />
      </div>

      <div
        className="pointer-events-none absolute z-0 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/[0.04] blur-[90px] opacity-[var(--spotlight-opacity)] transition-opacity duration-300"
        style={{ left: "var(--spotlight-x, 50%)", top: "var(--spotlight-y, 50%)" }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mx-auto mb-16 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-purple">
            Core Stack
          </span>
          <h2 className="mt-4 text-3xl font-normal tracking-[-0.03em] text-[#211e24] sm:text-4xl">
            Core Technologies &amp; <span className="text-accent-purple">Database Stack</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted/90 sm:text-base">
            Technologies I use to build secure, scalable, and database-driven backend applications.
          </p>
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 overflow-hidden py-4">
          <div className="absolute top-0 bottom-0 left-0 z-20 w-24 pointer-events-none bg-gradient-to-r from-bg-dark to-transparent md:w-36" />
          <div className="absolute top-0 bottom-0 right-0 z-20 w-24 pointer-events-none bg-gradient-to-l from-bg-dark to-transparent md:w-36" />

          <div className="group relative flex overflow-hidden py-2 select-none">
            <TechRow
              technologies={row1Technologies}
              animationClassName="animate-marquee"
              duration="20s"
            />
            <TechRow
              technologies={row1Technologies}
              animationClassName="animate-marquee"
              duration="20s"
              ariaHidden
            />
          </div>

          <div className="group relative flex overflow-hidden py-2 select-none">
            <TechRow
              technologies={row2Technologies}
              animationClassName="animate-marquee-reverse"
              duration="24s"
            />
            <TechRow
              technologies={row2Technologies}
              animationClassName="animate-marquee-reverse"
              duration="24s"
              ariaHidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
