export interface EducationMedia {
  thumbnailUrl: string;
  linkUrl: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  activities?: string;
  responsibilities?: string;
  skills?: string;
  media?: EducationMedia[];
  imageUrl: string;
  websiteUrl: string;
}

export interface EducationDict {
  title: string;
  activitiesLabel?: string;
  skillsLabel?: string;
  items: EducationItem[];
}
