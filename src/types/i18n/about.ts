export interface AboutDict {
  title: string;
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
}
