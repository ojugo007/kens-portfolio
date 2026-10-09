import { useQuery } from "@tanstack/react-query"
import  {getStacks}  from "../api/stackApi"

export const useStacks = () => {
  return useQuery({
    queryKey: ["stacks"],
    queryFn: getStacks,
    staleTime: 1000 * 60 * 5,
  })
}