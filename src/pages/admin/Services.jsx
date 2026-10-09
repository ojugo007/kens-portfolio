import ServiceForm from '@/components/admin/ServiceForm'
import { Button } from '@/components/ui/button'
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
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
import DataTable from '@/components/admin/DataTable'
import { serviceColumns } from '@/columns/serviceColumns'
import { useServices } from '@/hooks/useServices'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addService, deleteService, updateService } from '@/api/servicesApi'


const Services = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedDeleteService, setSelectedDeleteService] = useState(null)

  const queryClient = useQueryClient()

  // gets service
  const { data, isLoading, isError } = useServices()
  const services = data?.data ?? []


  const addMutation = useMutation({
    mutationFn: addService,

    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message)

        setFormOpen(false)
        setSelectedService(null)

        queryClient.invalidateQueries({
          queryKey: ["services"],
        })
      }
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add service"
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateService,

    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message)

        setFormOpen(false)
        setSelectedService(null)

        queryClient.invalidateQueries({
          queryKey: ["services"],
        })
      }
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update service"
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteService,

    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message)

        setDeleteOpen(false)
        setSelectedDeleteService(null)

        queryClient.invalidateQueries({
          queryKey: ["services"],
        })
      }
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete service"
      )
    },
  })


  const handleDeleteService = () => {
    deleteMutation.mutate(selectedDeleteService._id)
  }
  const handleSubmit = (values) => {
    if (selectedService) {
      updateMutation.mutate({
        id: selectedService._id,
        values,
      })
    } else {
      addMutation.mutate(values)
    }
  }


  const handleEdit = (service) => {
    setSelectedService(service)
    setFormOpen(true)
  }

  const handleDelete = (service) => {
    setSelectedDeleteService(service)
    setDeleteOpen(true)
  }

  const columns = serviceColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })


  return (
    <section className="w-full h-full">

      <div className="flex items-center justify-between mb-6 text-left ">

        <div>
          <h1 className="text-xl font-semibold text-ink">
            services
          </h1>

          <p className="text-[12px] text-ink-muted mt-1">
            Manage your portfolio services.
          </p>
        </div>

        {/* FORM */}
        <ServiceForm
          open={formOpen}
          onOpenChange={setFormOpen}
          service={selectedService}
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
            setSelectedService(null)
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
              Delete Service?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[12px] text-ink-muted">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-ink">
                {selectedDeleteService?.serviceType}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-none text-[11px]"
              onClick={() => {
                setSelectedDeleteService(null)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[11px]"
              onClick={handleDeleteService}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isError ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-red-500">
            Failed to load services.
          </p>
        </div>
      ) : isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-[12px] text-ink-muted">
            Loading services...
          </p>
        </div>
      ) : (
        <DataTable columns={columns} data={services} />
      )}

    </section>
  )
}

export default Services