import type { Project } from "@/data/projects";
import React from "react";

type ProjectCardProps = {
  project: Project;
};

function highlightCode(code: string, lang: string) {
  if (!code) return [];

  if (lang === "sql") {
    const keywords = [
      "SELECT",
      "FROM",
      "LEFT",
      "JOIN",
      "ON",
      "WHERE",
      "AND",
      "GROUP",
      "BY",
      "ORDER",
      "DESC",
      "AS",
      "ROUND",
      "AVG",
      "SUM",
      "COUNT",
      "DATE_TRUNC",
      "CURRENT_DATE",
    ];

    return code.split("\n").map((line, idx) => {
      if (line.trim().length === 0) {
        return (
          <div key={idx} className="h-5 leading-5 block">
            &nbsp;
          </div>
        );
      }
      if (line.trim().startsWith("--")) {
        return (
          <div key={idx} className="h-5 leading-5 block italic text-white/35">
            {line}
          </div>
        );
      }

      const parts: React.ReactNode[] = [];
      const tokenRegex =
        /(--.*)|('[^']*')|([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)|([^\w\s])/g;
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        const [full, comment, str, word, num] = match;

        if (comment) {
          parts.push(
            <span key={match.index} className="italic text-white/35">
              {full}
            </span>,
          );
        } else if (str) {
          parts.push(
            <span key={match.index} className="text-emerald-400">
              {full}
            </span>,
          );
        } else if (word && keywords.includes(word.toUpperCase())) {
          parts.push(
            <span
              key={match.index}
              className="font-semibold text-accent-purple"
            >
              {full}
            </span>,
          );
        } else if (word) {
          const nextChar = line[tokenRegex.lastIndex] || "";
          if (nextChar === "(") {
            parts.push(
              <span key={match.index} className="text-sky-300">
                {full}
              </span>,
            );
          } else {
            parts.push(
              <span key={match.index} className="text-white/90">
                {full}
              </span>,
            );
          }
        } else if (num) {
          parts.push(
            <span key={match.index} className="text-amber-400">
              {full}
            </span>,
          );
        } else {
          parts.push(
            <span key={match.index} className="text-white/50">
              {full}
            </span>,
          );
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return (
        <div key={idx} className="h-5 leading-5 block">
          {parts.length > 0 ? parts : line}
        </div>
      );
    });
  }

  if (lang === "python") {
    const keywords = [
      "class",
      "def",
      "return",
      "if",
      "not",
      "in",
      "try",
      "except",
      "raise",
      "import",
      "from",
      "and",
      "or",
      "is",
      "None",
    ];

    return code.split("\n").map((line, idx) => {
      if (line.trim().length === 0) {
        return (
          <div key={idx} className="h-5 leading-5 block">
            &nbsp;
          </div>
        );
      }
      if (line.trim().startsWith("#")) {
        return (
          <div key={idx} className="h-5 leading-5 block italic text-white/35">
            {line}
          </div>
        );
      }
      if (
        line.trim().startsWith('"""') ||
        line.trim().endsWith('"""') ||
        line.includes('"""')
      ) {
        return (
          <div
            key={idx}
            className="h-5 leading-5 block italic text-emerald-500/70"
          >
            {line}
          </div>
        );
      }

      const parts: React.ReactNode[] = [];
      const tokenRegex =
        /(#.*)|("[^"]*")|('[^']*')|([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)|([^\w\s])/g;
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        const [full, comment, dstr, sstr, word, num] = match;

        if (comment) {
          parts.push(
            <span key={match.index} className="italic text-white/35">
              {full}
            </span>,
          );
        } else if (dstr || sstr) {
          parts.push(
            <span key={match.index} className="text-emerald-400">
              {full}
            </span>,
          );
        } else if (word && keywords.includes(word)) {
          parts.push(
            <span
              key={match.index}
              className="font-semibold text-accent-purple"
            >
              {full}
            </span>,
          );
        } else if (word) {
          if (word[0] === word[0].toUpperCase()) {
            parts.push(
              <span key={match.index} className="text-teal-300">
                {full}
              </span>,
            );
          } else {
            parts.push(
              <span key={match.index} className="text-white/90">
                {full}
              </span>,
            );
          }
        } else if (num) {
          parts.push(
            <span key={match.index} className="text-amber-400">
              {full}
            </span>,
          );
        } else {
          parts.push(
            <span key={match.index} className="text-white/50">
              {full}
            </span>,
          );
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return (
        <div key={idx} className="h-5 leading-5 block">
          {parts.length > 0 ? parts : line}
        </div>
      );
    });
  }

  if (lang === "php") {
    const keywords = [
      "class",
      "extends",
      "public",
      "function",
      "return",
      "namespace",
      "use",
      "if",
      "elseif",
      "else",
      "foreach",
      "as",
      "compact",
    ];

    return code.split("\n").map((line, idx) => {
      if (line.trim().length === 0) {
        return (
          <div key={idx} className="h-5 leading-5 block">
            &nbsp;
          </div>
        );
      }
      if (
        line.trim().startsWith("//") ||
        line.trim().startsWith("/*") ||
        line.trim().startsWith("*")
      ) {
        return (
          <div key={idx} className="h-5 leading-5 block italic text-white/35">
            {line}
          </div>
        );
      }

      const parts: React.ReactNode[] = [];
      const tokenRegex =
        /(\/\/.*)|(\/\*.*)|('[^']*')|("[^"]*")|(\$[a-zA-Z_][a-zA-Z0-9_]*)|([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)|([^\w\s])/g;
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        const [full, comment1, comment2, sstr, dstr, variable, word, num] =
          match;

        if (comment1 || comment2) {
          parts.push(
            <span key={match.index} className="italic text-white/35">
              {full}
            </span>,
          );
        } else if (sstr || dstr) {
          parts.push(
            <span key={match.index} className="text-emerald-400">
              {full}
            </span>,
          );
        } else if (variable) {
          parts.push(
            <span key={match.index} className="text-sky-300">
              {full}
            </span>,
          );
        } else if (word && keywords.includes(word)) {
          parts.push(
            <span
              key={match.index}
              className="font-semibold text-accent-purple"
            >
              {full}
            </span>,
          );
        } else if (word) {
          if (word[0] === word[0].toUpperCase()) {
            parts.push(
              <span key={match.index} className="text-teal-300">
                {full}
              </span>,
            );
          } else {
            parts.push(
              <span key={match.index} className="text-white/90">
                {full}
              </span>,
            );
          }
        } else if (num) {
          parts.push(
            <span key={match.index} className="text-amber-400">
              {full}
            </span>,
          );
        } else {
          parts.push(
            <span key={match.index} className="text-white/50">
              {full}
            </span>,
          );
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return (
        <div key={idx} className="h-5 leading-5 block">
          {parts.length > 0 ? parts : line}
        </div>
      );
    });
  }

  return code.split("\n").map((line, idx) => (
    <div key={idx} className="h-5 leading-5 block">
      {line}
    </div>
  ));
}

function parseBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function splitContribution(contribution: string) {
  const match = contribution.match(/^([^a-zA-Z0-9\s*#_]{1,2})\s*(.*)$/u);
  if (match) {
    return { emoji: match[1], text: match[2] };
  }
  return { emoji: "⚡", text: contribution };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-border-color bg-gradient-to-b from-white to-bg-dark/40 backdrop-blur-sm lg:grid-cols-[42%_58%] shadow-[0_8px_30px_rgba(92,85,87,0.02),0_1px_3px_rgba(92,85,87,0.01)] hover:border-accent-purple/20 hover:shadow-[0_24px_50px_rgba(30,27,24,0.06)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Visual / Editor Side */}
      <div className="relative min-h-[380px] bg-white/[0.01] flex items-center justify-center p-6 sm:p-8 lg:p-10 lg:min-h-0 overflow-hidden border-b border-border-color lg:border-b-0 lg:border-r lg:border-border-color">
        {/* Soft backdrop radial purple glow */}
        <div className="absolute inset-0 bg-radial from-accent-purple/8 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        {/* Developer Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(98,86,125,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(98,86,125,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-60" />

        {/* Code window mock */}
        <div className="code-editor relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#030d1a] shadow-[0_20px_50px_rgba(3,13,26,0.55),0_4px_20px_rgba(3,13,26,0.3),0_0_40px_rgba(98,86,125,0.06),inset_0_1px_0_rgba(255,255,255,0.12)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] group-hover:border-white/[0.16] group-hover:shadow-[0_30px_70px_rgba(3,13,26,0.65),0_8px_30px_rgba(3,13,26,0.4),0_0_50px_rgba(98,86,125,0.12)]">
          {/* Subtle reflection overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] z-10" />

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.01] select-none relative z-20">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
              <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
              <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-[10px] font-mono font-medium text-white/35 flex items-center gap-1.5">
              <svg
                className="h-3 w-3 text-white/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {project.codeFile}
            </div>
            <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-accent-purple/80">
              {project.codeLanguage}
            </div>
          </div>
          {/* Editor Body */}
          <div className="p-4 font-mono text-[10px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre max-h-[280px] relative z-20">
            <div className="flex items-start">
              {/* Line numbers column */}
              <div className="mr-3 select-none text-right text-white/20 pr-3 border-r border-white/5 font-mono flex flex-col">
                {project.codeSnippet?.split("\n").map((_, i) => (
                  <span key={i} className="h-5 leading-5 block select-none">
                    {i + 1}
                  </span>
                ))}
              </div>
              {/* Code lines */}
              <div className="text-left font-mono text-white/90 block w-full overflow-x-auto">
                {highlightCode(
                  project.codeSnippet || "",
                  project.codeLanguage || "",
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className="flex flex-col p-6 sm:p-7 lg:p-8 justify-between">
        <div>
          {/* Category */}
          <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent-purple/90">
            {project.category}
          </p>

          {/* Title */}
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>

          {/* Metadata Row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-text-secondary/80">
            <span className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-text-secondary/40 text-[9px]">Role</span>
              <span className="text-text-secondary/30 select-none">•</span>
              <span className="font-semibold text-text-primary">{project.role}</span>
            </span>
            <span className="text-text-secondary/30 select-none">│</span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-text-secondary/40 text-[9px]">Duration</span>
              <span className="text-text-secondary/30 select-none">•</span>
              <span className="font-semibold text-text-primary">{project.duration}</span>
            </span>
            <span className="text-text-secondary/30 select-none">│</span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-text-secondary/40 text-[9px]">Domain</span>
              <span className="text-text-secondary/30 select-none">•</span>
              <span className="font-semibold text-text-primary">{project.domain}</span>
            </span>
          </div>

          {/* Description */}
          <p className="mt-3.5 text-sm leading-relaxed text-text-secondary/90">
            {project.description}
          </p>

          {/* Key Contributions */}
          <div className="mt-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">
              Key Contributions
            </h4>

            <ul className="mt-2.5 space-y-1.5">
              {project.contributions.map((contribution) => {
                const { emoji, text } = splitContribution(contribution);
                return (
                  <li
                    key={contribution}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary/90"
                  >
                    <span className="flex-shrink-0 text-base leading-none select-none mt-0.5">{emoji}</span>
                    <span>{parseBoldText(text)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mt-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">
              Technologies
            </h4>

            <div className="mt-2 flex flex-wrap gap-1">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border-color bg-[#fafaf8] px-3 py-1 text-xs text-text-secondary transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent-purple/40 hover:bg-accent-purple/5 hover:text-text-primary"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Engineering Challenge (Premium styled box) */}
        <div className="mt-5 border-l-2 border-accent-purple/30 pl-4 py-0.5">
          <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-accent-purple/90">
            Engineering Challenge
          </h5>

          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary/90">
            {project.challenge}
          </p>
        </div>
      </div>
    </article>
  );
}
