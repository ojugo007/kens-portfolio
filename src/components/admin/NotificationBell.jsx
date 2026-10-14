import { Link } from "react-router-dom"
import { Bell } from "lucide-react"

import { useUnreadCount } from "@/hooks/useMessages"

const NotificationBell = () => {
  const { unread } = useUnreadCount()

  return (
    <Link
      to="/admin/messages"
      aria-label={
        unread > 0
          ? `${unread} unread messages`
          : "No unread messages"
      }
      className="relative inline-flex h-8 w-8 items-center justify-center text-ink-muted hover:text-ink transition-colors"
    >
      <Bell className="h-4 w-4" />

      {unread > 0 && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      )}
    </Link>
  )
}

export default NotificationBell