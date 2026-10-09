import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

export const stackColumns = ({
  onEdit,
  onDelete,
}) => [
  {
    accessorKey: "technology",
    header: "Technology",
  },
  {
    accessorKey: "efficiency",
    header: "Efficiency",
    cell: ({ row }) => `${row.original.efficiency}%`,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const stack = row.original

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(stack)}
          >
            <Pencil />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(stack)}
          >
            <Trash2 />
          </Button>
        </div>
      )
    },
  },
]