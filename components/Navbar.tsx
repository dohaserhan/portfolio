"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import CTAButton from "./CTAButton";
import { navigationLinks } from "@/data/navigation";
import { profile } from "@/data/profile";


export default function Navbar() {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("#hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["hero", "about", "projects", "contact"];
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          setActiveSection(id);
          if (typeof window !== "undefined" && window.location.hash !== id) {
            window.history.replaceState(null, "", id);
          }
        }
      });
    };

    const observerOptions = {
      rootMargin: "-30% 0px -50% 0px", // Trigger when section occupies the upper-middle region
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  function handleLinkClick(href: string) {
    setActiveSection(href);
    setIsMenuOpen(false);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 
    border-b border-white/10 
    bg-bg-card/65
     backdrop-blur-xl
     backdrop-saturate-150
      shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto max-w-[1540px] px-6 py-5 lg:px-12">
        <div className="flex items-center justify-between h-9">
          <Link
            href="#hero"
            onClick={() => handleLinkClick("#hero")}
            className="flex flex-col lg:ml-8"
          >
            <span className="text-lg font-bold tracking-[0.25em] text-white sm:text-2xl sm:tracking-[0.35em]">
              {profile.name.toUpperCase()}
            </span>

            <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-text-muted sm:mt-1 sm:text-xs sm:tracking-[0.4em]">
              {profile.title.toUpperCase()}
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden items-center rounded-full border border-white/5 bg-bg-card/90 p-2 backdrop-blur-xl md:flex"
          >
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.href;

              const shouldShowPill =
                hoveredHref === link.href || (hoveredHref === null && isActive);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className="relative rounded-full px-7 py-3 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {shouldShowPill && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <CTAButton href="#contact">GET IN TOUCH</CTAButton>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-bg-card text-white md:hidden"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mt-4 rounded-3xl border border-white/10 bg-bg-card/95 p-4 md:hidden"
          >
            <div className="flex flex-col">
              {navigationLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`rounded-2xl px-5 py-4 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 border-t border-white/10 pt-4">
              <CTAButton href="#contact">GET IN TOUCH</CTAButton>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
