import { useQuery } from "@tanstack/react-query"
import { getExperiences } from "@/api/experienceApi"

export const useExperience = () => {
  return useQuery({
    queryKey: ["experience"],
    queryFn: getExperiences,
    staleTime: 1000 * 60 * 5,
    enabled: true,
  })
}