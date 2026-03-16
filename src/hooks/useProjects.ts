import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
    staleTime: 5 * 60 * 1000,
  });
};
