import { CodeXml, Database, GitBranch, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
export type AboutCardItem = {
    title: string;
    description: string;
    icon: LucideIcon;
    skills: string[];
    buttonText: string;
    href: string;
}; 

export const aboutCards: AboutCardItem[] = [
     {
    title: "Backend Development",
    description:
      "Building secure and maintainable backend applications using Laravel and Django.",
    icon: CodeXml,
    skills: [
      "Laravel & Django",
      "RESTful APIs",
      "Authentication & Authorization",
      "Business Logic",
    ],
    buttonText: "Explore My Work",
    href: "#projects",
  },
  {
    title: "Database Engineering",
    description:
      "Designing reliable relational databases that support structured and scalable applications.",
    icon: Database,
    skills: [
      "PostgreSQL & MySQL",
      "Schema Design",
      "Model Relationships",
      "Database Queries",
    ],
    buttonText: "See My Projects",
    href: "#projects",
  },
  {
    title: "Development Workflow",
    description:
      "Using modern tools and collaborative practices to maintain an organized development process.",
    icon: GitBranch,
    skills: [
      "Git Version Control",
      "Docker Exposure",
      "API Testing with Postman",
      "Team Collaboration",
    ],
    buttonText: "View My Workflow",
    href: "#projects",
  },
  {
    title: "Continuous Learning",
    description:
      "Continuously improving my technical knowledge through real-world development and independent learning.",
    icon: Rocket,
    skills: [
      "Learning Every Day",
      "Exploring New Technologies",
      "Clean Architecture",
      "Problem Solving",
    ],
    buttonText: "Let's Connect",
    href: "#contact",
  },
];