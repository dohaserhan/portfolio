import type { LucideIcon } from "lucide-react";
import Link from "next/link";

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
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border-color bg-gradient-to-b from-white to-bg-dark/40 p-10 pb-11 backdrop-blur-sm shadow-[0_4px_20px_rgba(92,85,87,0.02),0_1px_3px_rgba(92,85,87,0.01)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:border-accent-purple/35 hover:shadow-[0_20px_40px_rgba(30,27,24,0.08),0_10px_25px_rgba(98,86,125,0.05)] cursor-pointer"
    >
      {/* Soft hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-purple/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Small decorative gold dot */}
      <span className="absolute right-10 top-10 h-1.5 w-1.5 rounded-full bg-gold-accent/60 shadow-[0_0_8px_var(--gold-accent)] opacity-50 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-gold-accent group-hover:shadow-[0_0_12px_var(--gold-accent)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border-color bg-gradient-to-b from-[#fafaf8] to-bg-card shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:bg-accent-purple/10 group-hover:border-accent-purple/30">
          <Icon
            className="h-8 w-8 text-accent-purple transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-text-primary transition-colors duration-500 group-hover:text-accent-purple">
          {title}
        </h3>

        <p className="mt-5 text-[15px] leading-relaxed text-text-secondary/90">{description}</p>
      </div>
    </Link>
  );
}
