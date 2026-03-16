export interface TechItem {
  name: string;
  category: string;
  logoUrl: string | null;
}

export interface TechStackDict {
  title: string;
  items: TechItem[];
}
