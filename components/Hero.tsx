import Image from "next/image";
import CTAButton from "./CTAButton";
import ParticleBackground from "./ParticleBackground";
import { profile } from "@/data/profile";
import { heroData } from "@/data/hero";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden flex min-h-screen flex-col justify-center bg-[radial-gradient(circle_at_50%_25%,var(--color-accent-purple-glow)_0%,rgba(157,124,255,0.06)_25%,transparent_60%),linear-gradient(180deg,var(--color-bg-dark)_0%,var(--color-bg-card)_100%)] px-6 pt-24 pb-12 text-text-primary sm:pt-28 lg:px-12 lg:pb-16"
    >
      {/* Background effect layer (isolated overflow clipping) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParticleBackground />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[280px] w-[280px] rounded-full bg-accent-purple/20 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1540px] items-center gap-8 py-4 lg:grid-cols-2 lg:gap-12 lg:py-6">
        {/* Left content */}
        <div className="pl-0 text-left lg:pl-8">
          <span className="inline-flex items-center rounded-full border border-[#c5b3d3]/45 bg-[#c5b3d3]/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#63577d] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.25em]">
            {profile.role}
          </span>

          <h1 className="mt-5 max-w-3xl text-3xl font-normal leading-[1.1] tracking-[-0.03em] sm:mt-6 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            {heroData.headline}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-base md:text-lg">
            {heroData.description}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
            <CTAButton href="#contact" className="w-full sm:w-auto">
              {heroData.primaryButtonText}
            </CTAButton>

            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cv inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.03em] text-text-primary bg-white/50 border border-[rgba(60,50,70,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-[10px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:-translate-y-0.5 hover:bg-white/80 hover:border-[rgba(111,90,145,0.25)] sm:w-auto sm:text-sm"
            >
              <span className="flex items-center gap-1.5">
                {heroData.secondaryButtonText}
                <span className="inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-1 opacity-0 w-0 group-hover/cv:w-3 group-hover/cv:opacity-100 group-hover/cv:translate-x-2">
                  ↓
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Decorative aura behind the card - a large, highly diffused radial purple glow with 8% opacity to tie into the brand subtly */}
          <div className="absolute -inset-20 rounded-full bg-accent-purple/8 blur-[100px] pointer-events-none" />

          {/* Showcase frame */}
          <div className="relative z-10 w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[480px] xl:max-w-[540px] rounded-[16px] sm:rounded-[24px] bg-gradient-to-b from-white/16 to-white/5 backdrop-blur-md p-1 border border-white/12 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_20px_60px_5px_rgba(30,27,24,0.12),0_0_50px_rgba(98,86,125,0.08),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_30px_80px_10px_rgba(30,27,24,0.18),0_0_60px_rgba(98,86,125,0.15),inset_0_1px_0_rgba(255,255,255,0.22)]">
            <Image
              src="/images/doha-developer-v1.png"
              alt="Illustration of Doha Serhan working on a laptop"
              width={620}
              height={620}
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
              className="h-auto w-full rounded-[12px] sm:rounded-[20px] border border-border-color/10 object-cover contrast-[1.04] saturate-[1.025]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
