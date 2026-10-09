
export const educationColumns = ({ onEdit, onDelete }) => [
    {
        accessorKey: "institution",
        header: "Institution",
    },

    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "period",
        header: "Period",
    },
    {
        accessorKey: "course",
        header: "Course",
    },
    {
        accessorKey: "order",
        header: "Order",
    },

    {
        id: "actions",
        header: "Actions",

        cell: ({ row }) => {
            const education = row.original

            return (
                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() => onEdit(education)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(education)}
                    >
                        Delete
                    </button>

                </div>
            )
        },
    },
]