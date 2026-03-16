export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  projectUrl: string | null;
  github: string | null;
  featured: boolean;
}

export interface ProjectsDict {
  title: string;
  liveDemo: string;
  sourceCode: string;
  items: ProjectItem[];
}
