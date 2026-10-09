
export const experienceColumns = ({ onEdit, onDelete }) => [
    {
        accessorKey: "company",
        header: "Company",
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
        accessorKey: "desc",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-75 truncate">
                {row.original.desc}
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
            const experience = row.original

            return (
                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() => onEdit(experience)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(experience)}
                    >
                        Delete
                    </button>

                </div>
            )
        },
    },
]