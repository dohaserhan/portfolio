export const aboutHeader = {
  badge: "About",
  title: "Building Reliable Full-Stack Solutions\nfor Real Products",
  description: "I'm a junior full stack developer with a strong focus on backend systems, passionate about designing secure, scalable, and maintainable web applications. With experience across healthcare, education, and microservices platforms, I enjoy bringing user interfaces to life with React while structuring robust backends with Laravel and Django.",
};

export interface AboutCardItem {
  title: string;
  description: string;
  icon: string; // Separated from TSX
  skills: string[];
  buttonText: string;
  href: string;
}

export const aboutCards: AboutCardItem[] = [
  {
    title: "Scalable Backend Systems",
    description:
      "Building secure and maintainable backend applications using Laravel and Django.",
    icon: "backend",
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
    title: "Robust Database Design",
    description:
      "Designing reliable relational databases that support structured and scalable applications.",
    icon: "database",
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
    title: "Efficient Development Workflow",
    description:
      "Using modern tools and collaborative practices to maintain an organized development process.",
    icon: "git",
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
    title: "Continuous Technical Growth",
    description:
      "Continuously improving my technical knowledge through real-world development and independent learning.",
    icon: "rocket",
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
