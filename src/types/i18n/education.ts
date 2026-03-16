export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
}

export interface EducationDict {
  title: string;
  items: EducationItem[];
}
