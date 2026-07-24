export type Technology = {
  name: string;
  icon: string;
  offsetY: number;
  delay: number;
  duration: number;
  gap: string;
  px: string;
};

export const row1Technologies: Technology[] = [
  { name: "Laravel", icon: "/tech/laravel.svg", offsetY: -4, delay: 0, duration: 6.2, gap: "gap-3.5", px: "px-6" },
  { name: "Django", icon: "/tech/django.svg", offsetY: 4, delay: 0.8, duration: 6.8, gap: "gap-3", px: "px-5" },
  { name: "Django REST Framework", icon: "/tech/drf.svg", offsetY: -5, delay: 1.5, duration: 6.5, gap: "gap-4", px: "px-[26px]" },
  { name: "PostgreSQL", icon: "/tech/postgresql.svg", offsetY: 3, delay: 0.3, duration: 7.2, gap: "gap-3.5", px: "px-6" },
  { name: "SQLite", icon: "/tech/sqlite.svg", offsetY: -3, delay: 1.2, duration: 6.6, gap: "gap-3", px: "px-[22px]" },
];

export const row2Technologies: Technology[] = [
  { name: "MySQL", icon: "/tech/mysql.svg", offsetY: -3, delay: 2.1, duration: 5.8, gap: "gap-3", px: "px-5" },
  { name: "SQLite", icon: "/tech/sqlite.svg", offsetY: 4, delay: 1.2, duration: 6.6, gap: "gap-3", px: "px-[22px]" },
  { name: "React", icon: "/tech/react.svg", offsetY: -5, delay: 0.6, duration: 6.0, gap: "gap-3.5", px: "px-6" },
  { name: "Laravel", icon: "/tech/laravel.svg", offsetY: 3, delay: 0, duration: 6.2, gap: "gap-3.5", px: "px-6" },
  { name: "PostgreSQL", icon: "/tech/postgresql.svg", offsetY: -4, delay: 0.3, duration: 7.2, gap: "gap-3.5", px: "px-6" },
];
