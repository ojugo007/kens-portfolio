import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { Button } from "@/components/ui/button"

const stackSchema = z.object({
    technology: z
        .string()
        .min(1, "Technology is required"),

    efficiency: z.coerce
        .number()
        .min(0, "Efficiency cannot be below 0")
        .max(100, "Efficiency cannot exceed 100"),
})

const defaultValues = {
    technology: "",
    efficiency: 0,
}

const StackForm = ({
    open,
    onOpenChange,
    onSubmit,
    stack = null,
    loading = false,
}) => {
    const isEditing = Boolean(stack)

    const form = useForm({
        resolver: zodResolver(stackSchema),
        defaultValues,
    })

    useEffect(() => {
        if (stack) {
            form.reset({
                technology: stack.technology ?? "",
                efficiency: stack.efficiency ?? 0,
            })
        } else {
            form.reset(defaultValues)
        }
    }, [stack, open])

    const handleSubmit = async (values) => {
        await onSubmit(values)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-125 max-h-[85vh] overflow-y-auto rounded-none bg-card
              border-edge text-ink p-6">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-[15px] font-semibold text-ink">
                        {stack ? "Edit Stack" : "Add New Stack"}
                    </DialogTitle>

                    <DialogDescription className="text-[11px] text-ink-muted">
                        {stack
                            ? "Update the stack information below."
                            : "Add a technology to your portfolio stack."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-5"
                >
                    {/* Technology */}
                    <Field
                        data-invalid={
                            !!form.formState.errors.technology
                        }
                        className="gap-2"
                    >
                        <FieldLabel htmlFor="technology">
                            Technology
                        </FieldLabel>

                        <Input
                            id="technology"
                            placeholder="e.g. React"
                            {...form.register("technology")}
                            className="rounded-none border-edge bg-background text-[12px] text-ink placeholder:text-ink-muted bg-card-alt border-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                        />

                        {form.formState.errors.technology && (
                            <FieldError>
                                {form.formState.errors.technology.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* Efficiency */}
                    <Field
                        data-invalid={
                            !!form.formState.errors.efficiency
                        }
                        className="gap-2"
                    >
                        <FieldLabel htmlFor="efficiency">
                            Efficiency (%)
                        </FieldLabel>

                        <Input
                            id="efficiency"
                            type="number"
                            min="0"
                            max="100"
                            {...form.register("efficiency")}
                            className="rounded-none border-edge bg-background text-[12px] text-ink placeholder:text-ink-muted bg-card-alt border-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                        />

                        {form.formState.errors.efficiency && (
                            <FieldError>
                                {form.formState.errors.efficiency.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* Actions */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="rounded-none bg-accent text-[#382400] text-[11px] hover:bg-accent/90 cursor-pointer"
                    >
                        {loading
                            ? "Saving..."
                            : isEditing
                                ? "Update Stack"
                                : "Add Stack"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StackForm
