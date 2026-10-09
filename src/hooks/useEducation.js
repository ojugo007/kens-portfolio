import { useQuery } from "@tanstack/react-query"
import { getEducation } from "@/api/educationApi"

export const useEducation = () => {
  return useQuery({
    queryKey: ["education"],
    queryFn: getEducation,
    staleTime: 1000 * 60 * 5,
  })
}