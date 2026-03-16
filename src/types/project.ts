export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  projectUrl?: string;
  github?: string;
  featured?: boolean;
}
