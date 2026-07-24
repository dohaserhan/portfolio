import AboutCard from "./AboutCard";
import { aboutCards } from "@/data/about";


export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_50%,var(--color-accent-purple-glow)_0%,rgba(157,124,255,0.06)_25%,transparent_60%),linear-gradient(180deg,var(--color-bg-card)_0%,var(--color-bg-dark)_100%)] pt-20 pb-12 sm:pt-24 sm:pb-16 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-10 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-accent-purple/20 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[130px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent-purple">
            About
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Building Reliable Backend Systems
            <br />
            for Real Products
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-muted">
            I'm a backend developer passionate about designing secure, scalable,
            and maintainable web applications. With experience across
            healthcare, education, and municipality platforms, I enjoy
            transforming complex business requirements into reliable software
            using Laravel, Django, and modern web technologies.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {aboutCards.map((card) => (
            <AboutCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
