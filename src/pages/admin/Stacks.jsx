import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DataTable from "@/components/admin/DataTable"
import StackForm from "@/components/admin/StackForm"
import { stackColumns } from "@/columns/stackColumns"
import { useStacks } from "@/hooks/useStacks"
import {
  addStack,
  updateStack,
  deleteStack,
} from "@/api/stackApi"

const Stacks = () => {
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    isError,
    error,
  } = useStacks()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedStack, setSelectedStack] = useState(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedDeleteStack, setSelectedDeleteStack] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
  if (searchParams.get("new") === "true") {
    handleAdd()
    setSearchParams({}, { replace: true })
  }
}, []) 
  
  const addMutation = useMutation({
    mutationFn: addStack,

    onSuccess: () => {
      toast.success("Stack added successfully")

      queryClient.invalidateQueries({
        queryKey: ["stacks"],
      })

      setFormOpen(false)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to add stack"
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateStack,

    onSuccess: () => {
      toast.success("Stack updated successfully")

      queryClient.invalidateQueries({
        queryKey: ["stacks"],
      })

      setFormOpen(false)
      setSelectedStack(null)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update stack"
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteStack,

    onSuccess: () => {
      toast.success("Stack deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["stacks"],
      })

      setDeleteOpen(false)
      setSelectedDeleteStack(null)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete stack"
      )
    },
  })

  const handleAdd = () => {
    setSelectedStack(null)
    setFormOpen(true)
  }

  const handleEdit = (stack) => {
    setSelectedStack(stack)
    setFormOpen(true)
  }

  const handleDelete = (stack) => {
    setSelectedDeleteStack(stack)
    setDeleteOpen(true)
  }

  const handleSubmit = async (values) => {
    if (selectedStack) {
      updateMutation.mutate({
        id: selectedStack._id,
        values,
      })
    } else {
      addMutation.mutate(values)
    }
  }

  const confirmDelete = () => {
    if (!selectedDeleteStack) return

    deleteMutation.mutate(selectedDeleteStack._id)
  }

  const columns = stackColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 text-left">
        <div>
          <h1 className="text-xl font-semibold text-ink">
            Stacks
          </h1>

          <p className="text-[12px] text-ink-muted mt-1">
            Manage your technology stack.
          </p>
        </div>

        <Button onClick={handleAdd}>
          <Plus />
          Add Stack
        </Button>
      </div>

      {isError && (
        <p className="text-destructive">
          {error?.response?.data?.message ||
            "Failed to load stacks"}
        </p>
      )}

      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />

      <StackForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)

          if (!open) {
            setSelectedStack(null)
          }
        }}
        onSubmit={handleSubmit}
        stack={selectedStack}
        loading={
          addMutation.isPending ||
          updateMutation.isPending
        }
      />

      <AlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <AlertDialogContent className="rounded-none bg-card border-edge">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[15px]">
              Delete stack?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[12px] text-ink-muted">
              This will permanently delete{" "}
              <span className="font-semibold text-ink">
                {selectedDeleteStack?.technology}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Stacks