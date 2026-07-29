"use client";

import Link from "next/link";
import { navigationLinks } from "@/data/navigation";
import { profile } from "@/data/profile";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-[1540px] px-6 lg:px-12">
      <div className="border-t border-border-color py-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-xs sm:text-sm text-text-secondary select-none">
          
          {/* Left: Copyright and Stack info */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-semibold text-text-primary">
              © {currentYear} {profile.name}
            </span>
            <span className="text-text-secondary/70 text-[11px] sm:text-xs">
              Built with Next.js and Tailwind CSS
            </span>
          </div>

          {/* Right: Navigation Links & Socials */}
          <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8 md:pr-16 lg:pr-20">
            
            {/* Quick Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Socials & Top Action */}
            <div className="flex items-center gap-4 border-t border-border-color/50 pt-4 w-full justify-center md:border-t-0 md:pt-0 md:w-auto">
              
              {/* LinkedIn */}
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text-primary"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text-primary"
                title="GitHub Repositories"
                aria-label="GitHub Repositories"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
