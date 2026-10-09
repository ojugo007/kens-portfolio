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

const educationSchema = z.object({
  institution: z
    .string()
    .min(1, "Institution is required"),

  role: z
    .string()
    .min(1, "Role is required"),

  course: z
    .string()
    .min(1, "course is required"),

  period: z
    .string()
    .min(1, "period is required"),

  order: z.coerce
    .number()
    .min(0, "Order cannot be negative"),
})

const defaultValues = {
  institution: "",
  course: "",
  role: "",
  order: 0,
  period: ""
}


const EducationForm = ({    
    open,
    onOpenChange,
    onSubmit,
    education = null,
    loading = false,
}) => {
  const form = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues,
  })

 useEffect(() => {
    if (education) {
      form.reset({
        institution: education.institution ?? "",
        course: education.course ?? "",
        role: education.role ?? "",
        period: education.period ?? "",
        order: education.order ?? 0,
      })
    } else {
      form.reset(defaultValues)
    }
  }, [education, open])

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
            {education ? "Edit Education/Certification" : "Add New Education/Certification"}
          </DialogTitle>

          <DialogDescription className="text-[11px] text-ink-muted">
            {education
              ? "Update the education information below."
              : "Add a new education to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* institution */}
          <Field
            data-invalid={
              !!form.formState.errors.institution
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="institution"
              className="text-[11px] text-ink"
            >
              Institution
            </FieldLabel>

            <Input
              id="institution"
              placeholder="e.g. AltSchool Africa"
              {...form.register("institution")}
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

            {form.formState.errors.institution && (
              <FieldError className="text-[10px]">
                {form.formState.errors.institution.message}
              </FieldError>
            )}
          </Field>

          {/* course */}
          <Field
            data-invalid={
              !!form.formState.errors.course
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="course"
              className="text-[11px] text-ink"
            >
              Course
            </FieldLabel>

            <Input
              id="institution"
              placeholder="e.g. DevOps"
              {...form.register("course")}
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

            {form.formState.errors.course && (
              <FieldError className="text-[10px]">
                {form.formState.errors.course.message}
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

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="
                rounded-none
                text-[11px]
                border-edge
              "
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
                hover:bg-accent/90
              "
            >
              {loading
                ? "Saving..."
                : education
                  ? "UPDATE EDUCATION"
                  : "ADD EDUCATION"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EducationForm