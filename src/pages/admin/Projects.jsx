import { projectColumns } from "@/columns/projectColumns"
import DataTable from "@/components/admin/DataTable"
import ProjectForm from "@/components/admin/ProjectForm"
import { Button } from "@/components/ui/button"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useProjects } from "@/hooks/useProjects"
import { addProject, deleteProject, updateProject } from "@/api/projectsApi"

const Projects = () => {
    const [formOpen, setFormOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedDeleteProject, setSelectedDeleteProject] = useState(null)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const queryClient = useQueryClient()

    // gets projects
    const { data, isLoading, isError } = useProjects()
    const projects = data?.data ?? []

    const addMutation = useMutation({
        mutationFn: addProject,

        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message)

                setFormOpen(false)
                setSelectedProject(null)

                queryClient.invalidateQueries({
                    queryKey: ["projects"],
                })
            }
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Failed to add project"
            )
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateProject,

        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message)

                setFormOpen(false)
                setSelectedProject(null)

                queryClient.invalidateQueries({
                    queryKey: ["projects"],
                })
            }
        },

        onError: (error) => {
                console.log("FULL ERROR:", error)
    console.log("ERROR MESSAGE:", error.message)
    console.log("ERROR RESPONSE:", error.response)

            toast.error(
                error.response?.data?.message || "Failed to update project"
            )
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProject,

        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message)

                setFormOpen(false)
                setSelectedProject(null)

                queryClient.invalidateQueries({
                    queryKey: ["projects"],
                })
            }
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Failed to delete project"
            )
        },
    })

    const handleDeleteProject = () => {
        deleteMutation.mutate(selectedDeleteProject._id)
    }

    const handleSubmit = (values) => {
        if (selectedProject) {
            updateMutation.mutate({
                id: selectedProject._id,
                values,
            })
        } else {
            addMutation.mutate(values)
        }
    }

    // DELETE
    const handleDelete = (project) => {
        setSelectedDeleteProject(project)
        setDeleteOpen(true)
    }
    // EDIT BUTTON CLICK
    const handleEdit = (project) => {
        setSelectedProject(project)
        setFormOpen(true)
    }

    const columns = projectColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
    })

    return (
        <section className="w-full h-full">

            <div className="flex items-center justify-between mb-6 text-left ">

                <div>
                    <h1 className="text-xl font-semibold text-ink">
                        Projects
                    </h1>

                    <p className="text-[12px] text-ink-muted mt-1">
                        Manage your portfolio projects.
                    </p>
                </div>

                {/* FORM */}
                <ProjectForm
                    open={formOpen}
                    onOpenChange={setFormOpen}
                    project={selectedProject}
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
                        setSelectedProject(null)
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
                            Delete Project?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-[12px] text-ink-muted">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-ink">
                                {selectedDeleteProject?.projectTitle}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="rounded-none text-[11px]"
                            onClick={() => {
                                setSelectedDeleteProject(null)
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deleteMutation.isPending}
                            className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[11px]"
                            onClick={handleDeleteProject}
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {isError ? (
                <div className="h-40 flex items-center justify-center">
                    <p className="text-[12px] text-red-500">
                        Failed to load projects.
                    </p>
                </div>
            ) : isLoading ? (
                <div className="h-40 flex items-center justify-center">
                    <p className="text-[12px] text-ink-muted">
                        Loading projects...
                    </p>
                </div>
            ) : (
                <DataTable columns={columns} data={projects} />
            )}

        </section>
    )
}

export default Projects