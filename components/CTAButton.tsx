import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function CTAButton({
  href,
  children,
  className = "",
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-[linear-gradient(90deg,var(--accent-start),var(--accent-middle),var(--accent-end))]
        px-9
        py-4
        text-[15px]
        font-semibold
        uppercase
        tracking-[0.02em]
        text-[var(--cta-text)]
        shadow-[0_12px_35px_var(--accent-shadow)]
        transition-[color,box-shadow,transform]
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:scale-[1.015]
        hover:text-[var(--accent-text)]
        hover:shadow-[0_18px_55px_var(--accent-shadow-hover)]
        ${className}
      `}
    >
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-[-75%]
          w-[45%]
          skew-x-[-20deg]
          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)]
          blur-[2px]
          transition-[left]
          duration-[1800ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:left-[135%]
        "
      />

      <span className="relative z-10">{children}</span>
    </Link>
  );
}