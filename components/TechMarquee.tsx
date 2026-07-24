"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { row1Technologies, row2Technologies } from "@/data/technologies";

export default function TechMarquee() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-bg-dark py-24 sm:py-32"
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Layered breathing radial glow backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Upper glow behind heading */}
        <motion.div 
          animate={{ opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-accent-purple/5 blur-[120px] sm:h-[450px] sm:w-[700px] sm:blur-[140px]" 
        />
        {/* Lower glow behind pills */}
        <motion.div 
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 h-[450px] w-[600px] rounded-full bg-accent-purple/[0.03] blur-[130px] sm:h-[550px] sm:w-[800px]" 
        />
      </div>

      {/* Cursor-following spotlight (low-opacity glow) */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/[0.04] blur-[90px] z-0"
          animate={{
            left: mousePos.x,
            top: mousePos.y,
          }}
          transition={{ type: "spring", damping: 35, stiffness: 150 }}
        />
      )}

      {/* Top fading divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      {/* Bottom fading divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Title & Subtitle */}
        <div className="mx-auto max-w-2xl mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-purple">
            Core Stack
          </span>
          <h2 className="mt-4 text-3xl font-normal tracking-[-0.03em] sm:text-4xl text-white">
            Core Technologies &amp; Database Stack
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted/90 max-w-lg mx-auto sm:text-base">
            Technologies I use to build secure, scalable, and database-driven backend applications.
          </p>
        </div>

        {/* Marquees Container (Two opposite scrolling rows) */}
        <div className="flex flex-col gap-6 max-w-5xl mx-auto overflow-hidden relative py-4">
          
          {/* Left/Right Fading Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-36 bg-gradient-to-r from-bg-dark to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-36 bg-gradient-to-l from-bg-dark to-transparent z-20 pointer-events-none" />

          {/* ROW 1: Right to Left */}
          <div className="group relative flex overflow-hidden py-2 select-none">
            {/* Copy 1 */}
            <div 
              className="flex shrink-0 animate-marquee items-center justify-around gap-8 min-w-full group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: "30s" }}
            >
              {row1Technologies.map((tech, idx) => (
                <motion.div
                  key={`row1-${tech.name}-${idx}`}
                  animate={{
                    y: [tech.offsetY, tech.offsetY - 2, tech.offsetY],
                  }}
                  transition={{
                    duration: tech.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: tech.delay,
                  }}
                  className="flex shrink-0"
                >
                  <motion.div
                    whileHover={{
                      y: tech.offsetY - 4,
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(157, 124, 255, 0.15)",
                    }}
                    transition={{
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.35,
                    }}
                    className={`group/item flex items-center ${tech.gap} ${tech.px} rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.1] hover:to-white/[0.04] hover:border-accent-purple/40 backdrop-blur-md py-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.3)] transition-[border-color,background-image,box-shadow] duration-350 cursor-default`}
                  >
                    <div className="relative h-6 w-6 shrink-0 invert opacity-75 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_8px_rgba(157,124,255,0.6)]">
                      <Image src={tech.icon} alt={`${tech.name} logo`} fill className="object-contain" />
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-text-muted transition-colors duration-300 group-hover/item:text-white">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            {/* Copy 2 */}
            <div 
              className="flex shrink-0 animate-marquee items-center justify-around gap-8 min-w-full group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: "30s" }}
              aria-hidden="true"
            >
              {row1Technologies.map((tech, idx) => (
                <motion.div
                  key={`row1-dup-${tech.name}-${idx}`}
                  animate={{
                    y: [tech.offsetY, tech.offsetY - 2, tech.offsetY],
                  }}
                  transition={{
                    duration: tech.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: tech.delay,
                  }}
                  className="flex shrink-0"
                >
                  <motion.div
                    whileHover={{
                      y: tech.offsetY - 4,
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(157, 124, 255, 0.15)",
                    }}
                    transition={{
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.35,
                    }}
                    className={`group/item flex items-center ${tech.gap} ${tech.px} rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.1] hover:to-white/[0.04] hover:border-accent-purple/40 backdrop-blur-md py-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.3)] transition-[border-color,background-image,box-shadow] duration-350 cursor-default`}
                  >
                    <div className="relative h-6 w-6 shrink-0 invert opacity-75 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_8px_rgba(157,124,255,0.6)]">
                      <Image src={tech.icon} alt={`${tech.name} logo`} fill className="object-contain" />
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-text-muted transition-colors duration-300 group-hover/item:text-white">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ROW 2: Left to Right */}
          <div className="group relative flex overflow-hidden py-2 select-none">
            {/* Copy 1 */}
            <div 
              className="flex shrink-0 animate-marquee-reverse items-center justify-around gap-8 min-w-full group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: "36s" }}
            >
              {row2Technologies.map((tech, idx) => (
                <motion.div
                  key={`row2-${tech.name}-${idx}`}
                  animate={{
                    y: [tech.offsetY, tech.offsetY - 2, tech.offsetY],
                  }}
                  transition={{
                    duration: tech.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: tech.delay,
                  }}
                  className="flex shrink-0"
                >
                  <motion.div
                    whileHover={{
                      y: tech.offsetY - 4,
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(157, 124, 255, 0.15)",
                    }}
                    transition={{
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.35,
                    }}
                    className={`group/item flex items-center ${tech.gap} ${tech.px} rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.1] hover:to-white/[0.04] hover:border-accent-purple/40 backdrop-blur-md py-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.3)] transition-[border-color,background-image,box-shadow] duration-350 cursor-default`}
                  >
                    <div className="relative h-6 w-6 shrink-0 invert opacity-75 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_8px_rgba(157,124,255,0.6)]">
                      <Image src={tech.icon} alt={`${tech.name} logo`} fill className="object-contain" />
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-text-muted transition-colors duration-300 group-hover/item:text-white">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            {/* Copy 2 */}
            <div 
              className="flex shrink-0 animate-marquee-reverse items-center justify-around gap-8 min-w-full group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: "36s" }}
              aria-hidden="true"
            >
              {row2Technologies.map((tech, idx) => (
                <motion.div
                  key={`row2-dup-${tech.name}-${idx}`}
                  animate={{
                    y: [tech.offsetY, tech.offsetY - 2, tech.offsetY],
                  }}
                  transition={{
                    duration: tech.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: tech.delay,
                  }}
                  className="flex shrink-0"
                >
                  <motion.div
                    whileHover={{
                      y: tech.offsetY - 4,
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15), 0 0 15px rgba(157, 124, 255, 0.15)",
                    }}
                    transition={{
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.35,
                    }}
                    className={`group/item flex items-center ${tech.gap} ${tech.px} rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.1] hover:to-white/[0.04] hover:border-accent-purple/40 backdrop-blur-md py-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.3)] transition-[border-color,background-image,box-shadow] duration-350 cursor-default`}
                  >
                    <div className="relative h-6 w-6 shrink-0 invert opacity-75 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_8px_rgba(157,124,255,0.6)]">
                      <Image src={tech.icon} alt={`${tech.name} logo`} fill className="object-contain" />
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-text-muted transition-colors duration-300 group-hover/item:text-white">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}