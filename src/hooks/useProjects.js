import { getProjects } from "@/api/projectsApi"
import { useQuery } from "@tanstack/react-query"

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5,
  })
}