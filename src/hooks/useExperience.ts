import { useQuery } from "@tanstack/react-query";
import { linkedinService } from "@/services/linkedin.service";

export const useExperience = () => {
  return useQuery({
    queryKey: ["experience"],
    queryFn: () => linkedinService.getExperience(),
    staleTime: 5 * 60 * 1000,
  });
};
