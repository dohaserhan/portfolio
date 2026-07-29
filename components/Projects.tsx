"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for previous, 1 for next

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((previousIndex) =>
      previousIndex === projects.length - 1 ? 0 : previousIndex + 1,
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? projects.length - 1 : previousIndex - 1,
    );
  };

  const handleTabClick = (index: number) => {
    if (index > currentIndex) {
      setDirection(1);
    } else if (index < currentIndex) {
      setDirection(-1);
    }
    setCurrentIndex(index);
  };

  // Define sliding animations for the card transition
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 pt-12 pb-20 text-white lg:px-12 lg:pt-16 lg:pb-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent-purple/5 blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent-purple">
              Projects
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-[#211e24]">
              Featured Work
            </h2>

            <p className="mt-4 leading-relaxed text-text-secondary/90 text-sm sm:text-base">
              A selection of projects where I contributed to backend systems,
              APIs, database design, authentication, and real-world business
              workflows.
            </p>
          </div>

          {/* Navigation for mobile / arrow controls fallback */}
          <div className="mt-6 flex items-center justify-between gap-4 md:hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary/40 font-mono">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] text-text-secondary transition-all hover:border-accent-purple/40 hover:bg-accent-purple/5 hover:text-accent-purple"
                aria-label="Previous Project"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-color bg-[#fafaf8] text-text-secondary transition-all hover:border-accent-purple/40 hover:bg-accent-purple/5 hover:text-accent-purple"
                aria-label="Next Project"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Segmented Navigation Tabs for Desktop */}
        <div className="mt-10 hidden md:block">
          <div className="inline-flex rounded-full border border-border-color bg-[#EAE4DC]/30 p-1.5 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            {projects.map((project, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  className={`relative rounded-full px-6 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive 
                      ? "text-accent-purple shadow-[0_1px_3px_rgba(98,86,125,0.05)]" 
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-tab"
                      className="absolute inset-0 rounded-full border border-border-color/30 bg-white shadow-[0_3px_10px_rgba(98,86,125,0.08),0_1px_3px_rgba(0,0,0,0.04)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{project.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project card wrapper with animation */}
        <div className="mt-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(event, info) => {
                const threshold = 70;
                if (info.offset.x < -threshold) {
                  handleNext();
                } else if (info.offset.x > threshold) {
                  handlePrevious();
                }
              }}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <ProjectCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
