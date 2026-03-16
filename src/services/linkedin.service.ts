import { Experience } from "@/types/experience";

export const linkedinService = {
  getExperience: async (): Promise<Experience[]> => {
    // Mock experience for now
    return [
      {
        id: "1",
        company: "Software Solutions Inc.",
        position: "Frontend Developer",
        location: "Remote",
        period: "Jan 2023 - Present",
        description: [
          "Developed and maintained complex user interfaces for a range of web applications using React and Next.js.",
          "Collaborated with cross-functional teams to design and implement new features, ensuring high-quality and performant code.",
          "Optimized application performance and responsiveness, resulting in a 20% improvement in user satisfaction scores.",
        ],
        techStack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      },
      {
        id: "2",
        company: "Tech Innovators Co.",
        position: "Junior Web Developer",
        location: "San Francisco, CA",
        period: "June 2021 - Dec 2022",
        description: [
          "Assisted in the development of various web projects, focusing on frontend technologies like HTML, CSS, and JavaScript.",
          "Worked closely with senior developers to learn best practices and contribute to the success of multiple client projects.",
          "Maintained and updated existing websites, ensuring they remained up-to-date with current web standards.",
        ],
        techStack: ["HTML", "CSS", "JavaScript", "React"],
      },
    ];
  },
};
