import { Button } from "@/components/ui/button"

export const testimonialColumns = ({
  onEdit,
  onDelete,
}) => [
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-[12px] text-ink">
        {row.original.fullName}
      </div>
    ),
  },

  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className="text-[12px] text-ink-muted">
        {row.original.position}
      </div>
    ),
  },

  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="text-[12px] text-ink">
        {row.original.rating}/5
      </div>
    ),
  },

  {
    accessorKey: "testimonial",
    header: "Testimonial",
    cell: ({ row }) => (
      <div className="max-w-75 truncate text-[12px] text-ink-muted">
        {row.original.testimonial}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => onEdit(row.original)}
          className="
            rounded-none
            text-[10px]
            border-edge
          "
        >
          Edit
        </Button>

        <Button
          variant="outline"
          onClick={() => onDelete(row.original)}
          className="
            rounded-none
            text-[10px]
            border-edge
          "
        >
          Delete
        </Button>
      </div>
    ),
  },
]