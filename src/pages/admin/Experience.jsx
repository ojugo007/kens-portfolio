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

import {
  addExperience,
  updateExperience,
  deleteExperience,
} from "@/api/experienceApi"
import ExperienceForm from "@/components/admin/ExperienceForm"
import { experienceColumns } from "@/columns/experienceColumns"
import { useExperience } from "@/hooks/useExperience"


const Experience = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, isError} = useExperience()
  const experience = data?.data ?? []

  const [formOpen, setFormOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedDeleteExperience, setSelectedDeleteExperience] = useState(null)

// to activate dialog with add form from dashboard page 
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      handleAdd() 
      setSearchParams({}, { replace: true }) 
    }
  }, [])
  
  const addMutation = useMutation({
    mutationFn: addExperience,

    onSuccess: () => {
      toast.success("Experience added successfully")

      queryClient.invalidateQueries({
        queryKey: ["experience"],
      })

      setFormOpen(false)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to add work"
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateExperience,

    onSuccess: () => {
      toast.success("work updated successfully")

      queryClient.invalidateQueries({
        queryKey: ["experience"],
      })

      setFormOpen(false)
      setSelectedExperience(null)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to update work"
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteExperience,

    onSuccess: () => {
      toast.success("work deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["experience"],
      })

      setDeleteOpen(false)
      setSelectedDeleteExperience(null)
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete work"
      )
    },
  })

  const handleDeleteExperience = () => {
    deleteMutation.mutate(selectedDeleteExperience._id)
  }

  const handleAdd = () => {
    setSelectedExperience(null)
    setFormOpen(true)
  }

  const handleSubmit = (values) => {
    if (selectedExperience) {
      updateMutation.mutate({
        id: selectedExperience._id,
        values,
      })
    } else {
      addMutation.mutate(values)
    }
  }

  const handleEdit = (experience) => {
    setSelectedExperience(experience)
    setFormOpen(true)
  }

  const handleDelete = (experience) => {
    setSelectedDeleteExperience(experience)
    setDeleteOpen(true)
  }

  const columns = experienceColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })
  return (
    <section className="w-full h-full">

      <div className="flex items-center justify-between mb-6 text-left ">

        <div>
          <h1 className="text-xl font-semibold text-ink">
            Work History
          </h1>

          <p className="text-[12px] text-ink-muted mt-1">
            Manage your Work history.
          </p>
        </div>

        {/* FORM */}
        <ExperienceForm
          open={formOpen}
          onOpenChange={setFormOpen}
          experience={selectedExperience}
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
            setSelectedExperience(null)
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
              Delete from Work History?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[12px] text-ink-muted">
              Are you sure you want to delete work experience with{" "}
              <span className="font-semibold text-ink">
                {selectedDeleteExperience?.company}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-none text-[11px]"
              onClick={() => {
                setSelectedDeleteExperience(null)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[11px]"
              onClick={handleDeleteExperience}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isError ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-red-500">
            Failed to load work history.
          </p>
        </div>
      ) : isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-ink-muted">
            Loading work history...
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={experience} />
      )}

    </section>
  )
}

export default Experience