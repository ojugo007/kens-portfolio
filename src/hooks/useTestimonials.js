import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/api/testimonialApi"

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 1000 * 60 * 5,
  })
}

export const useAddTestimonial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addTestimonial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      })
    },
  })
}

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTestimonial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      })
    },
  })
}

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTestimonial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      })
    },
  })
}