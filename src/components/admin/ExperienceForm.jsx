import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const experienceSchema = z.object({
    company: z
        .string()
        .min(1, "Company name is required"),

    role: z
        .string()
        .min(1, "Role is required"),

    desc: z
        .string()
        .min(1, " short description is required"),

    period: z
        .string()
        .min(1, "period is required"),

    order: z.coerce
        .number()
        .min(0, "Order cannot be negative"),
})

const defaultValues = {
    company: "",
    desc: "",
    role: "",
    order: 0,
    period: ""
}


const ExperienceForm = ({
    open,
    onOpenChange,
    onSubmit,
    experience = null,
    loading = false,
}) => {
    const form = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues,
    })

    useEffect(() => {
        if (experience) {
            form.reset({
                company: experience.company ?? "",
                desc: experience.desc ?? "",
                role: experience.role ?? "",
                period: experience.period ?? "",
                order: experience.order ?? 0,
            })
        } else {
            form.reset(defaultValues)
        }
    }, [experience, open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
          w-[calc(100vw-2rem)]
          sm:max-w-125
          max-h-[85vh]
          overflow-y-auto
          rounded-none
          bg-card
          border-edge
          text-ink
          p-6
        "
            >
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-[15px] font-semibold text-ink">
                        {experience ? "Edit Work History" : "Add New Work History"}
                    </DialogTitle>

                    <DialogDescription className="text-[11px] text-ink-muted">
                        {experience
                            ? "Update work history below."
                            : "Add a new work history to portfolio."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* company */}
                    <Field
                        data-invalid={
                            !!form.formState.errors.company
                        }
                        className="gap-2"
                    >
                        <FieldLabel
                            htmlFor="company"
                            className="text-[11px] text-ink"
                        >
                            Company
                        </FieldLabel>

                        <Input
                            id="company"
                            placeholder="e.g. Google inc"
                            {...form.register("company")}
                            className="
                rounded-none
                border-edge
                bg-background
                text-[12px]
                text-ink
                placeholder:text-ink-muted
                bg-card-alt 
                border-0 
                outline-none 
                focus:outline-none 
                focus-visible:ring-0 
                focus-visible:outline-none
              "
                        />

                        {form.formState.errors.company && (
                            <FieldError className="text-[10px]">
                                {form.formState.errors.company.message}
                            </FieldError>
                        )}
                    </Field>


                    {/* period */}
                    <Field
                        data-invalid={
                            !!form.formState.errors.period
                        }
                        className="gap-2"
                    >
                        <FieldLabel
                            htmlFor="period"
                            className="text-[11px] text-ink"
                        >
                            Period
                        </FieldLabel>

                        <Input
                            id="institution"
                            placeholder="e.g. Dec 2020"
                            {...form.register("period")}
                            className="
                rounded-none
                border-edge
                bg-background
                text-[12px]
                text-ink
                placeholder:text-ink-muted
                bg-card-alt 
                border-0 
                outline-none 
                focus:outline-none 
                focus-visible:ring-0 
                focus-visible:outline-none
              "
                        />

                        {form.formState.errors.period && (
                            <FieldError className="text-[10px]">
                                {form.formState.errors.period.message}
                            </FieldError>
                        )}
                    </Field>


                    {/* role */}
                    <Field
                        data-invalid={
                            !!form.formState.errors.role
                        }
                        className="gap-2"
                    >
                        <FieldLabel
                            htmlFor="role"
                            className="text-[11px] text-ink"
                        >
                            Role
                        </FieldLabel>

                        <Input
                            id="role"
                            placeholder="e.g. Student"
                            {...form.register("role")}
                            className="
                rounded-none
                border-edge
                bg-background
                text-[12px]
                text-ink
                placeholder:text-ink-muted
                bg-card-alt 
                border-0 
                outline-none 
                focus:outline-none 
                focus-visible:ring-0 
                focus-visible:outline-none
              "
                        />

                        {form.formState.errors.role && (
                            <FieldError className="text-[10px]">
                                {form.formState.errors.role.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* order */}
                    <Field
                        data-invalid={
                            !!form.formState.errors.order
                        }
                        className="gap-2"
                    >
                        <FieldLabel
                            htmlFor="order"
                            className="text-[11px] text-ink"
                        >
                            Order
                        </FieldLabel>

                        <Input
                            id="order"
                            placeholder="e.g. 1"
                            {...form.register("order")}
                            className="
                rounded-none
                border-edge
                bg-background
                text-[12px]
                text-ink
                placeholder:text-ink-muted
                bg-card-alt 
                border-0 
                outline-none 
                focus:outline-none 
                focus-visible:ring-0 
                focus-visible:outline-none
              "
                        />

                        {form.formState.errors.order && (
                            <FieldError className="text-[10px]">
                                {form.formState.errors.order.message}
                            </FieldError>
                        )}
                    </Field>
                    {/* decription*/}
                    <Field
                        data-invalid={
                            !!form.formState.errors.desc
                        }
                        className="gap-2"
                    >
                        <FieldLabel
                            htmlFor="desc"
                            className="text-[11px] text-ink"
                        >
                            Description
                        </FieldLabel>

                        <Textarea
                            placeholder="short description of work done"
                            {...form.register("desc")}
                            className="
                                rounded-none
                                bg-card-alt
                                border-0
                                text-[12px]
                                focus-visible:ring-0
                            "
                        />

                        {form.formState.errors.desc && (
                            <FieldError className="text-[10px]">
                                {form.formState.errors.desc.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="rounded-none text-[11px]border-edge"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-none bg-accenttext-[#382400] text-[11px] hover:bg-accent/90"
                        >
                            {loading
                                ? "Saving..."
                                : experience
                                    ? "UPDATE WORK HISTORY"
                                    : "ADD WORK HISTORY"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ExperienceForm