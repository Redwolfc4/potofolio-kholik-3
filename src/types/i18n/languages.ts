export interface LanguageItem {
  name: string;
  level: string;
  proficiency: string;
  icon?: string;
}

export interface LanguagesDict {
  title: string;
  items: LanguageItem[];
}
