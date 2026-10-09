import { Button } from "@/components/ui/button"

const truncateMessage = (message, length = 70) => {
  if (!message) return ""

  if (message.length <= length) {
    return message
  }

  return `${message.slice(0, length)}...`
}

export const messageColumns = ({
  onView,
  onDelete,
}) => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-[12px] text-ink">
        {row.original.name}
      </span>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-[11px] text-ink-muted">
        {row.original.email}
      </span>
    ),
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <span
        className="block max-w-70 truncate text-[11px] text-ink-muted"
        title={row.original.message}
      >
        {truncateMessage(row.original.message)}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isRead = row.original.status === "read"

      return (
        <span
          className={
            isRead
              ? "text-[10px] text-ink-muted"
              : "text-[10px] font-medium text-accent"
          }
        >
          {isRead ? "READ" : "UNREAD"}
        </span>
      )
    },
  },

  {
    accessorKey: "replied",
    header: "Replied",
    cell: ({ row }) => (
      <span
        className={
          row.original.replied
            ? "text-[10px] text-accent"
            : "text-[10px] text-ink-muted"
        }
      >
        {row.original.replied ? "YES" : "NO"}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Received",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)

      return (
        <span className="text-[10px] text-ink-muted">
          {date.toLocaleDateString()}
        </span>
      )
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onView(row.original)}
          className="
            rounded-none
            border-edge
            text-[10px]
            text-ink
            h-7
            px-3
          "
        >
          VIEW
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => onDelete(row.original)}
          className="
            rounded-none
            border-edge
            text-[10px]
            text-ink-muted
            h-7
            px-3
          "
        >
          DELETE
        </Button>
      </div>
    ),
  },
]