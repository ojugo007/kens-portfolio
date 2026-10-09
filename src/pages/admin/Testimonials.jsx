import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { testimonialColumns } from "@/columns/testimonialColumns";
import {
  useTestimonials,
  useAddTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
} from "@/hooks/useTestimonials"
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

const Testimonials = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedDeleteTestimonial, setSelectedDeleteTestimonial] =
    useState(null)

  const {
    data,
    isLoading,
    isError,
  } = useTestimonials()

  const addMutation = useAddTestimonial()
  const updateMutation = useUpdateTestimonial()
  const deleteMutation = useDeleteTestimonial()

  const testimonials = data?.data ?? data ?? []

  const handleSubmit = async (values) => {
    if (selectedTestimonial) {
      await updateMutation.mutateAsync({
        id: selectedTestimonial._id,
        values,
      })
    } else {
      await addMutation.mutateAsync(values)
    }

    setFormOpen(false)
    setSelectedTestimonial(null)
  }

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setFormOpen(true)
  }

  const handleDelete = (testimonial) => {
    setSelectedDeleteTestimonial(testimonial)
    setDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedDeleteTestimonial) return

    await deleteMutation.mutateAsync(
      selectedDeleteTestimonial._id
    )

    setDeleteOpen(false)
    setSelectedDeleteTestimonial(null)
  }

  const columns = testimonialColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 text-left">
        <div>
          <h1 className="text-xl font-semibold text-ink">
            Testimonials
          </h1>

          <p className="text-[12px] text-ink-muted mt-1">
            Manage your client testimonials.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedTestimonial(null)
            setFormOpen(true)
          }}
          className="
            rounded-none
            bg-accent
            text-[#382400]
            text-[11px]
            hover:bg-accent/90
          "
        >
          ADD TESTIMONIAL
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-[12px] text-ink-muted">
          Loading testimonials...
        </p>
      ) : isError ? (
        <p className="text-[12px] text-destructive">
          Failed to load testimonials.
        </p>
      ) : (
        <DataTable
          columns={columns}
          data={testimonials}
        />
      )}

      {/* Add / Edit */}
      <TestimonialForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)

          if (!open) {
            setSelectedTestimonial(null)
          }
        }}
        onSubmit={handleSubmit}
        testimonial={selectedTestimonial}
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
              Delete Testimonial?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[12px] text-ink-muted">
              This will permanently delete{" "}
              <strong className="text-ink">
                {selectedDeleteTestimonial?.fullName}
              </strong>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none text-[11px]">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[11px]"
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

export default Testimonials