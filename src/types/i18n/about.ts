export interface AboutDict {
  title: string;
  quote: string;
  summary: {
    title: string;
    content: string;
  };
  focus: {
    title: string;
    content: string;
  };
  highlights: {
    title: string;
    items: string[];
  };
  education: {
    label: string;
    degree: string;
    gpaLabel: string;
    gpaValue: string;
  };
}
