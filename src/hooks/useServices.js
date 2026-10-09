import { getServices } from "@/api/servicesApi"
import { useQuery } from "@tanstack/react-query"

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: 1000 * 60 * 5,
  })
}