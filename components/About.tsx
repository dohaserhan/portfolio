"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import AboutCard from "./AboutCard";
import { aboutHeader, aboutCards } from "@/data/about";
import { CodeXml, Database, GitBranch, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map string keys to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  backend: CodeXml,
  database: Database,
  git: GitBranch,
  rocket: Rocket,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function About() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.15 }}
      id="about"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_50%,var(--color-accent-purple-glow)_0%,rgba(157,124,255,0.06)_25%,transparent_60%),linear-gradient(180deg,var(--color-bg-card)_0%,var(--color-bg-dark)_100%)] pt-20 pb-12 sm:pt-24 sm:pb-16 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-10 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-accent-purple/20 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[130px]" />
        {/* Large centered faint glow behind the cards */}
        <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-accent-purple/[0.04] blur-[100px] sm:h-[500px] sm:w-[1000px] sm:blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <motion.p
            variants={itemVariants}
            className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent-purple"
          >
            {aboutHeader.badge}
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl whitespace-pre-line animate-text-purple-shimmer pb-1"
          >
            {aboutHeader.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-text-muted"
          >
            {aboutHeader.description}
          </motion.p>
        </motion.header>

        {/* Subtle divider transition */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="relative mx-auto mb-14 h-px w-36"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/50 blur-[1px]" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {aboutCards.map((card) => {
            const IconComponent = iconMap[card.icon] || CodeXml;
            return (
              <motion.div key={card.title} variants={cardVariants} className="flex flex-col h-full">
                <AboutCard {...card} icon={IconComponent} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
