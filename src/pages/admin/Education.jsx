import { useState } from "react"
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

import { educationColumns } from "@/columns/educationColumns"

import { useEducation } from "@/hooks/useEducation"

import {
  addEducation,
  updateEducation,
  deleteEducation,
} from "@/api/educationApi"
import EducationForm from "@/components/admin/EducationForm"


const Education = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, isError} = useEducation()
  const education = data?.data ?? []

  const [formOpen, setFormOpen] = useState(false)
  const [selectedEducation, setSelectedEducation] = useState(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedDeleteEducation, setSelectedDeleteEducation] = useState(null)

  const addMutation = useMutation({
    mutationFn: addEducation,

    onSuccess: () => {
      toast.success("Education added successfully")

      queryClient.invalidateQueries({
        queryKey: ["education"],
      })

      setFormOpen(false)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to add education"
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateEducation,

    onSuccess: () => {
      toast.success("Education updated successfully")

      queryClient.invalidateQueries({
        queryKey: ["education"],
      })

      setFormOpen(false)
      setSelectedEducation(null)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to update education"
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteEducation,

    onSuccess: () => {
      toast.success("Education deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["education"],
      })

      setDeleteOpen(false)
      setSelectedDeleteEducation(null)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete education"
      )
    },
  })

  const handleDeleteEducation = () => {
    deleteMutation.mutate(selectedDeleteEducation._id)
  }

  const handleAdd = () => {
    setSelectedEducation(null)
    setFormOpen(true)
  }

  const handleSubmit = (values) => {
    if (selectedEducation) {
      updateMutation.mutate({
        id: selectedEducation._id,
        values,
      })
    } else {
      addMutation.mutate(values)
    }
  }

  const handleEdit = (education) => {
    setSelectedEducation(education)
    setFormOpen(true)
  }

  const handleDelete = (education) => {
    setSelectedDeleteEducation(education)
    setDeleteOpen(true)
  }

  const columns = educationColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })
  return (
    <section className="w-full h-full">

      <div className="flex items-center justify-between mb-6 text-left ">

        <div>
          <h1 className="text-xl font-semibold text-ink">
            Education /Certification
          </h1>

          <p className="text-[12px] text-ink-muted mt-1">
            Manage your portfolio education/ certification.
          </p>
        </div>

        {/* FORM */}
        <EducationForm
          open={formOpen}
          onOpenChange={setFormOpen}
          education={selectedEducation}
          onSubmit={handleSubmit}
          loading={
            addMutation.isPending ||
            updateMutation.isPending
          }
        />

        {/* ADD BUTTON */}
        <Button
          type="button"
          onClick={() => {
            setSelectedEducation(null)
            setFormOpen(true)
          }}
          className="rounded-none bg-accent text-[#382400]"
        >
          <Plus size={14} />
          Add New
        </Button>

      </div>
      <AlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <AlertDialogContent className="rounded-none bg-card border-edge">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[15px]">
              Delete Education /Certification?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[12px] text-ink-muted">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-ink">
                {selectedDeleteEducation?.course}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-none text-[11px]"
              onClick={() => {
                setSelectedDeleteEducation(null)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[11px]"
              onClick={handleDeleteEducation}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isError ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-red-500">
            Failed to load education history.
          </p>
        </div>
      ) : isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-ink-muted">
            Loading education history...
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={education} />
      )}

    </section>
  )
}

export default Education