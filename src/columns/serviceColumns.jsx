
export const serviceColumns = ({ onEdit, onDelete }) => [
    {
        accessorKey: "serviceType",
        header: "Service",
    },


    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-75 truncate">
                {row.original.description}
            </div>
        ),
    },

    {
        id: "actions",
        header: "Actions",

        cell: ({ row }) => {
            const service = row.original

            return (
                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() => onEdit(service)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(service)}
                    >
                        Delete
                    </button>

                </div>
            )
        },
    },
]