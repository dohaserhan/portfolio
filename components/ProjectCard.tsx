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

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-[#06101d]/60 to-[#040b14]/40 backdrop-blur-md lg:grid-cols-[1.1fr_1.3fr] shadow-[0_24px_60px_rgba(0,0,0,0.35)] hover:border-white/[0.12] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Visual / Editor Side */}
      <div className="relative min-h-[380px] bg-white/[0.01] flex items-center justify-center p-6 sm:p-8 lg:p-10 lg:min-h-0 overflow-hidden border-b border-white/[0.06] lg:border-b-0 lg:border-r lg:border-white/[0.06]">
        {/* Soft backdrop radial purple glow */}
        <div className="absolute inset-0 bg-radial from-accent-purple/15 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

        {/* Developer Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-60" />

        {/* Code window mock */}
        <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#030d1a] shadow-[0_4px_12px_rgba(0,0,0,0.5),0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] group-hover:border-white/[0.16] group-hover:shadow-accent-purple/5">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.01] select-none">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
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
          <div className="p-4 font-mono text-[10px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre max-h-[280px]">
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
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {project.description}
          </p>

          {/* Key Contributions */}
          <div className="mt-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Key Contributions
            </h4>

            <ul className="mt-2.5 space-y-1.5">
              {project.contributions.map((contribution) => (
                <li
                  key={contribution}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-purple/80" />
                  {contribution}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mt-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Technologies
            </h4>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs text-white/70 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent-purple/50 hover:bg-accent-purple/10 hover:text-white"
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

          <p className="mt-1.5 text-sm leading-relaxed text-white/75">
            {project.challenge}
          </p>
        </div>
      </div>
    </article>
  );
}
