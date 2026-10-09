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

const testimonialSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required"),

  position: z
    .string()
    .min(1, "Position is required"),

  testimonial: z
    .string()
    .min(1, "Testimonial is required"),

  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  avatar: z
    .any()
    .optional(),
})

const defaultValues = {
  fullName: "",
  position: "",
  testimonial: "",
  rating: 5,
  avatar: null,
}

const TestimonialForm = ({
  open,
  onOpenChange,
  onSubmit,
  testimonial = null,
  loading = false,
}) => {
  const form = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  })

  useEffect(() => {
    if (testimonial) {
      form.reset({
        fullName: testimonial.fullName ?? "",
        position: testimonial.position ?? "",
        testimonial: testimonial.testimonial ?? "",
        rating: testimonial.rating ?? 5,
        avatar: null,
      })
    } else {
      form.reset(defaultValues)
    }
  }, [testimonial, open])

  const handleSubmit = async (values) => {
    await onSubmit(values)
  }

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
            {testimonial
              ? "Edit Testimonial"
              : "Add New Testimonial"}
          </DialogTitle>

          <DialogDescription className="text-[11px] text-ink-muted">
            {testimonial
              ? "Update the testimonial information below."
              : "Add a new testimonial to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {/* Full Name */}
          <Field
            data-invalid={
              !!form.formState.errors.fullName
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="fullName"
              className="text-[11px] text-ink"
            >
              Full Name
            </FieldLabel>

            <Input
              id="fullName"
              placeholder="e.g. John Doe"
              {...form.register("fullName")}
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

            {form.formState.errors.fullName && (
              <FieldError className="text-[10px]">
                {form.formState.errors.fullName.message}
              </FieldError>
            )}
          </Field>

          {/* Position */}
          <Field
            data-invalid={
              !!form.formState.errors.position
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="position"
              className="text-[11px] text-ink"
            >
              Position
            </FieldLabel>

            <Input
              id="position"
              placeholder="e.g. CEO, Founder"
              {...form.register("position")}
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

            {form.formState.errors.position && (
              <FieldError className="text-[10px]">
                {form.formState.errors.position.message}
              </FieldError>
            )}
          </Field>

          {/* Testimonial */}
          <Field
            data-invalid={
              !!form.formState.errors.testimonial
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="testimonial"
              className="text-[11px] text-ink"
            >
              Testimonial
            </FieldLabel>

            <Textarea
              id="testimonial"
              placeholder="Write the testimonial..."
              {...form.register("testimonial")}
              className="
                min-h-35
                resize-none
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

            {form.formState.errors.testimonial && (
              <FieldError className="text-[10px]">
                {form.formState.errors.testimonial.message}
              </FieldError>
            )}
          </Field>

          {/* Rating */}
          <Field
            data-invalid={
              !!form.formState.errors.rating
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="rating"
              className="text-[11px] text-ink"
            >
              Rating
            </FieldLabel>

            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              {...form.register("rating")}
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

            {form.formState.errors.rating && (
              <FieldError className="text-[10px]">
                {form.formState.errors.rating.message}
              </FieldError>
            )}
          </Field>

          {/* Avatar */}
          <Field
            data-invalid={
              !!form.formState.errors.avatar
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="avatar"
              className="text-[11px] text-ink"
            >
              Avatar
            </FieldLabel>

            <Input
              id="avatar"
              type="file"
              accept="image/*"
              {...form.register("avatar")}
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
                file:border-0
                file:bg-transparent
                file:text-[11px]
                file:text-ink
              "
            />

            {testimonial?.avatar && (
              <img
                src={testimonial.avatar}
                alt={testimonial.fullName}
                className="w-12 h-12 object-cover rounded-none mt-2"
              />
            )}

            {form.formState.errors.avatar && (
              <FieldError className="text-[10px]">
                {form.formState.errors.avatar.message}
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
                : testimonial
                  ? "UPDATE TESTIMONIAL"
                  : "ADD TESTIMONIAL"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TestimonialForm