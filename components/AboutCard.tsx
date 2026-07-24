import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type AboutCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
  buttonText: string;
  href: string;
};

export default function AboutCard({
  title,
  description,
  icon: Icon,
  skills,
  buttonText,
  href,
}: AboutCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-accent-purple/15 bg-gradient-to-b from-bg-card/90 to-bg-dark/50 p-10 pb-11 backdrop-blur-sm transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-accent-purple/45 hover:shadow-[0_20px_40px_-20px_rgba(157,124,255,0.18)]">
      {/* Soft hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-purple/8 via-transparent to-accent-purple/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Small decorative light */}
      <span className="absolute right-10 top-10 h-2 w-2 rounded-full bg-accent-purple/65 shadow-[0_0_10px_var(--color-accent-purple)] opacity-45 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-accent-purple group-hover:shadow-[0_0_14px_var(--color-accent-purple)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.2)] transition-colors duration-500">
          <Icon
            className="h-8 w-8 text-accent-purple transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-white/95">
          {title}
        </h3>

        <p className="mt-5 text-[15px] leading-relaxed text-text-muted/90">{description}</p>

        <a
          href={href}
          className="mt-auto mt-10 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white/90 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:border-accent-purple/30 group-hover:bg-accent-purple/10 group-hover:text-white hover:!border-accent-purple/60 hover:!bg-accent-purple/20"
        >
          {buttonText}

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
