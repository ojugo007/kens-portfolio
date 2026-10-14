import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  getMessages,
  getMessage,
  generateMessage,
  sendResponse,
  deleteMessage,
  sendMessage,
} from "@/api/messageApi"

// PUBLIC CONTACT FORM
export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  })
}

export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    staleTime: 1000 * 60 * 5,
  })
}

export const useMessage = (id) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessage(id),
    enabled: !!id,
  })
}

export const useGenerateMessage = () => {
  return useMutation({
    mutationFn: generateMessage,
  })
}

export const useSendResponse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      })
    },
  })
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      })
    },
  })
}

export const useUnreadCount = () => {
  const query = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
  })

  const messages = query.data?.data ?? []

  return {
    unread: messages.filter((m) => !m.replied).length,
    total: messages.length,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}