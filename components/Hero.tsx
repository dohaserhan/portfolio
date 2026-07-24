import Image from "next/image";
import CTAButton from "./CTAButton";
import ParticleBackground from "./ParticleBackground";
import { profile } from "@/data/profile";
import { heroData } from "@/data/hero";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden flex min-h-screen flex-col justify-center bg-[radial-gradient(circle_at_50%_25%,var(--color-accent-purple-glow)_0%,rgba(157,124,255,0.06)_25%,transparent_60%),linear-gradient(180deg,var(--color-bg-dark)_0%,var(--color-bg-card)_100%)] px-6 pt-24 pb-12 text-white sm:pt-28 lg:px-12 lg:pb-16"
    >
      {/* Background effect layer (isolated overflow clipping) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParticleBackground />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[280px] w-[280px] rounded-full bg-accent-purple/20 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1540px] items-center gap-8 py-4 lg:grid-cols-2 lg:gap-12 lg:py-6">
        {/* Left content */}
        <div className="pl-0 text-left lg:pl-8">
          <span className="inline-flex items-center rounded-full border border-accent-purple/20 bg-accent-purple/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.25em]">
             {profile.role}
          </span>

          <h1 className="mt-5 max-w-3xl text-3xl font-normal leading-[1.1] tracking-[-0.03em] sm:mt-6 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            {heroData.headline}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-base md:text-lg">
              {heroData.description}
          </p>

          <div className="mt-6 flex flex-col gap-3.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <CTAButton href="#contact" className="w-full sm:w-auto">
             {heroData.primaryButtonText}
            </CTAButton>

            <a
              href={profile.cvPath}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto sm:text-sm"
            >
             {heroData.secondaryButtonText}
            </a>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative flex justify-center lg:justify-end">
          <Image
            src="/images/doha-developer-v1.png"
            alt="Illustration of Doha Serhan working on a laptop"
            width={620}
            height={620}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
            className="relative z-10 h-auto w-full max-w-[320px] rounded-[24px] ring-1 ring-white/10 sm:max-w-[440px] sm:rounded-[28px] lg:max-w-[480px] xl:max-w-[540px]"
          />
        </div>
      </div>
    </section>
  );
}
