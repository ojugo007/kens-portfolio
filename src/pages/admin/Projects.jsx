import { projectColumns } from "@/columns/projectColumns"
import DataTable from "@/components/admin/DataTable"
import ProjectForm from "@/components/admin/ProjectForm"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
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

const Projects = () => {
    const [formOpen, setFormOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedDeleteProject, setSelectedDeleteProject] = useState(null)
    const [deleteOpen, setDeleteOpen] = useState(false)

    console.log("FORM STATE:", {
        formOpen,
        selectedProject
    })
    const API_URL = import.meta.env.VITE_API_URL

    const getProjects = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                `${API_URL}/project/`
            )

            setProjects(response.data.data || [])
        } catch (error) {
            console.error("Failed to fetch projects", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    // ADD
    const handleAddProject = async (values) => {
        try {
            const token = localStorage.getItem("token")

            setSaving(true)

            const formData = new FormData()

            formData.append("projectTitle", values.projectTitle)
            formData.append("projectDesc", values.projectDesc)
            formData.append("order", values.order)

            if (values.projectImage?.[0]) {
                formData.append(
                    "projectImage",
                    values.projectImage[0]
                )
            }

            formData.append(
                "caseStudy",
                JSON.stringify(values.caseStudy)
            )

            const response = await axios.post(
                `${API_URL}/project/new/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.data.success) {
                toast.success(response.data.message)

                setFormOpen(false)
                setSelectedProject(null)

                await getProjects()
            }

        } catch (error) {
            console.error(error)

            toast.error(
                error.response?.data?.message ||
                "Failed to add project"
            )
        } finally {
            setSaving(false)
        }
    }

    // EDIT BUTTON CLICK
    const handleEdit = (project) => {
        setSelectedProject(project)
        setFormOpen(true)
    }

    // UPDATE
    const handleUpdateProject = async (values) => {
        try {
            const token = localStorage.getItem("token")

            setSaving(true)

            const formData = new FormData()

            formData.append("projectTitle", values.projectTitle)
            formData.append("projectDesc", values.projectDesc)
            formData.append("order", values.order)

            if (values.projectImage?.[0]) {
                formData.append(
                    "projectImage",
                    values.projectImage[0]
                )
            }

            formData.append(
                "caseStudy",
                JSON.stringify(values.caseStudy)
            )

            const response = await axios.patch(
                `${API_URL}/project/update/${selectedProject._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (response.data.success) {
                toast.success(response.data.message)

                setFormOpen(false)
                setSelectedProject(null)

                await getProjects()
            }

        } catch (error) {
            console.error(error)

            toast.error(
                error.response?.data?.message ||
                "Failed to update project"
            )
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteProject = async (id) => {
        const token = localStorage.getItem("token")
        try {
            const response = await axios.delete(`${API_URL}/project/delete/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            const { message, success } = response.data
            if (success) {
                toast.success(message)
                await getProjects()
            }
        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete project"
            )
        }
    }
    // DELETE
    const handleDelete = (project) => {
        setSelectedDeleteProject(project)
        setDeleteOpen(true)
    }

    const columns = projectColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
    })

    return (
        <section className="w-full">

            <div className="flex items-center justify-between mb-6">

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
                    onSubmit={
                        selectedProject
                            ? handleUpdateProject
                            : handleAddProject
                    }
                    loading={saving}
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
                            className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[11px]"
                            onClick={() => {
                                handleDeleteProject(
                                    selectedDeleteProject._id
                                )
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {loading ? (
                <div className="h-40 flex items-center justify-center">
                    <p className="text-[12px] text-ink-muted">
                        Loading projects...
                    </p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={projects}
                />
            )}

        </section>
    )
}

export default Projects