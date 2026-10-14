import { Link, useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const StatCard = ({
  title,
  value,
  icon: Icon,
  to,
  addLabel,
  loading,
  error,
  highlight,
}) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card border border-edge p-5 text-left flex flex-col justify-between gap-6">
      <Link to={to} className="block group">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-ink-muted uppercase tracking-wider">
            {title}
          </p>

          {Icon && <Icon className="h-4 w-4 text-ink-muted" />}
        </div>

        <p
          className={cn(
            "mt-3 text-2xl font-semibold text-ink group-hover:text-accent transition-colors",
            highlight && "text-accent"
          )}
        >
          {loading ? "..." : error ? "—" : value}
        </p>

        {error && (
          <p className="mt-1 text-[10px] text-destructive">
            Unable to load
          </p>
        )}
      </Link>

      <div className="flex items-center justify-between">
        <Link
          to={to}
          className="text-[11px] text-ink-muted hover:text-ink transition-colors"
        >
          View all
        </Link>

        {addLabel && (
          <Button
            type="button"
            size="sm"
            onClick={() => navigate(`${to}?new=true`)}
            className="rounded-none bg-accent text-[#382400] text-[11px] hover:bg-accent/90"
          >
            <Plus className="mr-1 h-3 w-3" />
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default StatCard