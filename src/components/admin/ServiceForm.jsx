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

const serviceSchema = z.object({
  serviceType: z
    .string()
    .min(1, "Service type is required"),

  description: z
    .string()
    .min(1, "Service description is required"),
})

const defaultValues = {
  serviceType: "",
  description: "",
}

const ServiceForm = ({
  open,
  onOpenChange,
  onSubmit,
  service = null,
  loading = false,
}) => {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  })

  // Populate form when editing
  useEffect(() => {
    if (service) {
      form.reset({
        serviceType: service.serviceType ?? "",
        description: service.description ?? "",
      })
    } else {
      form.reset(defaultValues)
    }
  }, [service, open])

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
            {service ? "Edit Service" : "Add New Service"}
          </DialogTitle>

          <DialogDescription className="text-[11px] text-ink-muted">
            {service
              ? "Update the service information below."
              : "Add a new service to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Service Type */}
          <Field
            data-invalid={
              !!form.formState.errors.serviceType
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="serviceType"
              className="text-[11px] text-ink"
            >
              Service Type
            </FieldLabel>

            <Input
              id="serviceType"
              placeholder="e.g. Web Development"
              {...form.register("serviceType")}
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

            {form.formState.errors.serviceType && (
              <FieldError className="text-[10px]">
                {form.formState.errors.serviceType.message}
              </FieldError>
            )}
          </Field>

          {/* Description */}
          <Field
            data-invalid={
              !!form.formState.errors.description
            }
            className="gap-2"
          >
            <FieldLabel
              htmlFor="description"
              className="text-[11px] text-ink"
            >
              Description
            </FieldLabel>

            <Textarea
              id="description"
              placeholder="Describe this service..."
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
              {...form.register("description")}
            />

            {form.formState.errors.description && (
              <FieldError className="text-[10px]">
                {form.formState.errors.description.message}
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
                : service
                  ? "UPDATE SERVICE"
                  : "ADD SERVICE"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceForm

