import { useQuery } from "@tanstack/react-query";

export interface TechItem {
  name: string;
  category: string;
  logoUrl?: string;
  logoText?: string;
  logoBgClass?: string;
}

const techStack: TechItem[] = [
  {
    name: "Next.js",
    category: "Frontend",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "React",
    category: "Frontend",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    category: "Backend",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Java",
    category: "Language",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    category: "DevOps",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
];

export const useTechstack = () => {
  return useQuery({
    queryKey: ["techstack"],
    queryFn: async () => techStack,
    staleTime: 5 * 60 * 1000,
  });
};
