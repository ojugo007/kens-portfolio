import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Plus, Pencil, X } from "lucide-react"


/* --------------------------------
   Validation
-------------------------------- */

const projectSchema = z.object({
    projectTitle: z
        .string()
        .min(1, "Project title is required"),

    projectDesc: z
        .string()
        .min(1, "Project description is required"),

    projectImage: z
        .any()
        .optional(),

    order: z.coerce
        .number()
        .min(0, "Order cannot be negative"),

    caseStudy: z.object({
        overview: z.string().optional(),
        challenge: z.string().optional(),
        solution: z.string().optional(),

        workflow: z.array(
            z.string().min(1, "Workflow step cannot be empty")
        ),

        technologies: z.array(
            z.string().min(1, "Technology cannot be empty")
        ),

        results: z.array(
            z.string().min(1, "Result cannot be empty")
        ),

        takeaway: z.string().optional(),
    }),
})


/* --------------------------------
   Default values
-------------------------------- */

const defaultValues = {
    projectTitle: "",
    projectDesc: "",
    projectImage: undefined,
    order: 0,

    caseStudy: {
        overview: "",
        challenge: "",
        solution: "",

        workflow: [""],
        technologies: [""],
        results: [""],

        takeaway: "",
    },
}


const ProjectForm = ({
    open,
    onOpenChange,
    onSubmit,
    project = null,
    loading = false,
}) => {

    const isEditing = Boolean(project)


    const form = useForm({
        resolver: zodResolver(projectSchema),

        defaultValues,
    })


    /* --------------------------------
       Populate form when editing
    -------------------------------- */

    useEffect(() => {

        if (project) {

            form.reset({
                projectTitle: project.projectTitle ?? "",
                projectDesc: project.projectDesc ?? "",
                projectImage: undefined,
                order: project.order ?? 0,

                caseStudy: {
                    overview: project.caseStudy?.overview ?? "",
                    challenge: project.caseStudy?.challenge ?? "",
                    solution: project.caseStudy?.solution ?? "",

                    workflow:
                        project.caseStudy?.workflow?.length
                            ? project.caseStudy.workflow
                            : [""],

                    technologies:
                        project.caseStudy?.technologies?.length
                            ? project.caseStudy.technologies
                            : [""],

                    results:
                        project.caseStudy?.results?.length
                            ? project.caseStudy.results
                            : [""],

                    takeaway: project.caseStudy?.takeaway ?? "",
                },
            })

        } else {

            form.reset(defaultValues)

        }

    }, [project, open])


    /* --------------------------------
       Array helpers
    -------------------------------- */

    const addArrayItem = (field) => {

        const current = form.getValues(`caseStudy.${field}`)

        form.setValue(
            `caseStudy.${field}`,
            [...current, ""]
        )
    }


    const removeArrayItem = (field, index) => {

        const current = form.getValues(`caseStudy.${field}`)

        if (current.length === 1) {
            return
        }

        form.setValue(
            `caseStudy.${field}`,
            current.filter((_, i) => i !== index)
        )
    }


    /* --------------------------------
       Submit
    -------------------------------- */

    const handleSubmit = async (values) => {

        await onSubmit(values)

    }


    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
            w-[calc(100vw-2rem)]
            sm:max-w-[600px]
            max-h-[85vh]
            overflow-y-auto
            rounded-none
            bg-card
            border-edge
            text-ink
            p-6
        "
            >
                {/* Header */}

                <div className="flex items-start justify-between mb-6">

                    <div>

                        <h2 className="text-[16px] font-semibold">
                            {isEditing
                                ? "Edit Project"
                                : "Add New Project"
                            }
                        </h2>

                        <p className="text-[11px] text-ink-muted mt-1">
                            {isEditing
                                ? "Update your project information."
                                : "Add a new project to your portfolio."
                            }
                        </p>

                    </div>

                </div>


                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                >

                    {/* --------------------------------
                        BASIC INFORMATION
                    -------------------------------- */}

                    <div className="space-y-4">

                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent">
                            Project Information
                        </h3>


                        {/* Title */}

                        <Field>

                            <FieldLabel htmlFor="projectTitle">
                                Project Title
                            </FieldLabel>

                            <Input
                                id="projectTitle"
                                placeholder="Lead Automation System"
                                {...form.register("projectTitle")}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                            <FieldError>
                                {form.formState.errors.projectTitle?.message}
                            </FieldError>

                        </Field>


                        {/* Description */}

                        <Field>

                            <FieldLabel htmlFor="projectDesc">
                                Description
                            </FieldLabel>

                            <Textarea
                                id="projectDesc"
                                placeholder="Describe the project..."
                                {...form.register("projectDesc")}
                                className="
                                    min-h-24
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                            <FieldError>
                                {form.formState.errors.projectDesc?.message}
                            </FieldError>

                        </Field>


                        {/* Image */}

                        <Field>

                            <FieldLabel htmlFor="projectImage">
                                Project Image
                            </FieldLabel>

                            <Input
                                id="projectImage"
                                type="file"
                                accept="image/*"
                                {...form.register("projectImage")}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                "
                            />

                            {isEditing && (
                                <p className="text-[10px] text-ink-muted">
                                    Leave empty to keep the current image.
                                </p>
                            )}

                            <FieldError>
                                {form.formState.errors.projectImage?.message}
                            </FieldError>

                        </Field>


                        {/* Order */}

                        <Field>

                            <FieldLabel htmlFor="order">
                                Display Order
                            </FieldLabel>

                            <Input
                                id="order"
                                type="number"
                                {...form.register("order")}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                            <FieldError>
                                {form.formState.errors.order?.message}
                            </FieldError>

                        </Field>

                    </div>


                    {/* --------------------------------
                        CASE STUDY
                    -------------------------------- */}

                    <div className="space-y-4">

                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent">
                            Case Study
                        </h3>


                        {/* Overview */}

                        <Field>

                            <FieldLabel>
                                Overview
                            </FieldLabel>

                            <Textarea
                                placeholder="Give an overview of the project..."
                                {...form.register("caseStudy.overview")}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                        </Field>


                        {/* Challenge */}

                        <Field>

                            <FieldLabel>
                                Challenge
                            </FieldLabel>

                            <Textarea
                                placeholder="What problem did the project solve?"
                                {...form.register("caseStudy.challenge")}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                        </Field>


                        {/* Solution */}

                        <Field>

                            <FieldLabel>
                                Solution
                            </FieldLabel>

                            <Textarea
                                placeholder="Explain your solution..."
                                {...form.register("caseStudy.solution")}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                        </Field>


                        {/* --------------------------------
                            WORKFLOW
                        -------------------------------- */}

                        <ArrayField
                            label="Workflow"
                            field="workflow"
                            values={form.watch("caseStudy.workflow")}
                            register={form.register}
                            addArrayItem={addArrayItem}
                            removeArrayItem={removeArrayItem}
                        />


                        {/* --------------------------------
                            TECHNOLOGIES
                        -------------------------------- */}

                        <ArrayField
                            label="Technologies"
                            field="technologies"
                            values={form.watch("caseStudy.technologies")}
                            register={form.register}
                            addArrayItem={addArrayItem}
                            removeArrayItem={removeArrayItem}
                        />


                        {/* --------------------------------
                            RESULTS
                        -------------------------------- */}

                        <ArrayField
                            label="Results"
                            field="results"
                            values={form.watch("caseStudy.results")}
                            register={form.register}
                            addArrayItem={addArrayItem}
                            removeArrayItem={removeArrayItem}
                        />


                        {/* Takeaway */}

                        <Field>

                            <FieldLabel>
                                Key Takeaway
                            </FieldLabel>

                            <Textarea
                                placeholder="What is the key takeaway?"
                                {...form.register(
                                    "caseStudy.takeaway"
                                )}
                                className="
                                    rounded-none
                                    bg-card-alt
                                    border-0
                                    text-[12px]
                                    focus-visible:ring-0
                                "
                            />

                        </Field>

                    </div>


                    {/* Buttons */}

                    <div className="flex justify-end gap-3 pt-2">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="rounded-none text-[11px]"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="
                                rounded-none
                                bg-accent
                                text-[#382400]
                                text-[11px]
                                uppercase
                                tracking-widest
                            "
                        >
                            {loading
                                ? "Saving..."
                                : isEditing
                                    ? "Update Project"
                                    : "Add Project"
                            }
                        </Button>

                    </div>

                </form>

            </DialogContent>
        </Dialog>
    )
}


/* ==========================================
   Reusable Array Field
========================================== */

const ArrayField = ({
    label,
    field,
    values,
    register,
    addArrayItem,
    removeArrayItem,
}) => {

    return (

        <div className="space-y-3">

            <div className="flex items-center justify-between">

                <FieldLabel>
                    {label}
                </FieldLabel>

                <button
                    type="button"
                    onClick={() => addArrayItem(field)}
                    className="
                        text-accent
                        text-[10px]
                        uppercase
                        tracking-wider
                        hover:opacity-80
                    "
                >
                    + Add
                </button>

            </div>


            <div className="flex flex-col gap-2">

                {values.map((_, index) => (

                    <div
                        key={index}
                        className="flex gap-2"
                    >

                        <Input
                            placeholder={`${label} ${index + 1}`}
                            {...register(
                                `caseStudy.${field}.${index}`
                            )}
                            className="
                                rounded-none
                                bg-card-alt
                                border-0
                                text-[12px]
                                focus-visible:ring-0
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                removeArrayItem(field, index)
                            }
                            className="
                                shrink-0
                                w-9
                                flex
                                items-center
                                justify-center
                                bg-surface-alt
                                text-ink-muted
                                hover:text-red-400
                            "
                        >
                            <X size={14} />

                        </button>

                    </div>

                ))}

            </div>

        </div>
    )
}


export default ProjectForm