import { Button } from "@/components/ui/button"

export const projectColumns = ({ onEdit, onDelete }) => [
    {
        accessorKey: "projectTitle",
        header: "Project",
    },
    {
        accessorKey: "projectDesc",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate">
                {row.original.projectDesc}
            </div>
        ),

    },

    {
        accessorKey: "order",
        header: "Order",
    },

    {
        id: "actions",
        header: "Actions",

        cell: ({ row }) => {
            const project = row.original

            return (
                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() => onEdit(project)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(project)}
                    >
                        Delete
                    </button>

                </div>
            )
        },
    },
]