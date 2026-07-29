import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "nav";
};

export default function CTAButton({
  href,
  children,
  className = "",
  variant = "primary",
}: CTAButtonProps) {
  const isNav = variant === "nav";
  
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
        font-semibold
        uppercase
        tracking-[0.03em]
        transition-all
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        bg-[linear-gradient(135deg,#6f5a91_0%,#55456f_50%,#8b75b1_100%)]
        bg-[size:200%_auto]
        bg-[position:left_center]
        text-white
        border
        border-[rgba(255,255,255,0.15)]
        shadow-[0_8px_22px_rgba(84,65,115,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]
        hover:scale-[1.02]
        hover:-translate-y-0.5
        hover:bg-[position:right_center]
        hover:shadow-[0_15px_35px_rgba(111,90,145,0.35),0_0_20px_rgba(111,90,145,0.15),inset_0_1px_0_rgba(255,255,255,0.22)]
        ${isNav 
          ? "px-7 py-3 text-[12px]"
          : "px-8 py-4 text-xs sm:text-sm"
        }
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}