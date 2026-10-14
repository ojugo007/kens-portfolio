import {
  FolderKanban,
  Layers,
  GraduationCap,
  Briefcase,
  Wrench,
  Quote,
  Mail,
} from "lucide-react"

import StatCard from "@/components/admin/StatCard"

import { useProjects } from "@/hooks/useProjects"
import { useStacks } from "@/hooks/useStacks"
import { useEducation } from "@/hooks/useEducation"
import { useExperience } from "@/hooks/useExperience"
import { useServices } from "@/hooks/useServices"
import { useTestimonials } from "@/hooks/useTestimonials"
import { useUnreadCount } from "@/hooks/useMessages"

const toList = (res) =>
  Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : []

const Dashboard = () => {
  const projects = useProjects()
  const stacks = useStacks()
  const education = useEducation()
  const experience = useExperience()
  const services = useServices()
  const testimonials = useTestimonials()
  const { unread, total, isLoading: msgLoading, isError: msgError } =
    useUnreadCount()

  const cards = [
    {
      title: "Projects",
      icon: FolderKanban,
      to: "/admin/projects",
      addLabel: "ADD PROJECT",
      query: projects,
    },
    {
      title: "Stack",
      icon: Layers,
      to: "/admin/stack",
      addLabel: "ADD STACK",
      query: stacks,
    },
    {
      title: "Education / Certifications",
      icon: GraduationCap,
      to: "/admin/education",
      addLabel: "ADD EDUCATION",
      query: education,
    },
    {
      title: "Work History",
      icon: Briefcase,
      to: "/admin/experience",
      addLabel: "ADD EXPERIENCE",
      query: experience,
    },
    {
      title: "Services",
      icon: Wrench,
      to: "/admin/services",
      addLabel: "ADD SERVICE",
      query: services,
    },
    {
      title: "Testimonials",
      icon: Quote,
      to: "/admin/testimonials",
      addLabel: "ADD TESTIMONIAL",
      query: testimonials,
    },
  ]

  return (
    <div>
      <div className="mb-6 text-left">
        <h1 className="text-xl font-semibold text-ink">Dashboard</h1>

        <p className="text-[12px] text-ink-muted mt-1">
          Overview of your portfolio content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ query, ...card }) => (
          <StatCard
            key={card.title}
            {...card}
            value={toList(query.data).length}
            loading={query.isLoading}
            error={query.isError}
          />
        ))}

        <StatCard
          title="Unread Messages"
          icon={Mail}
          to="/admin/messages"
          value={`${unread}/${total}`}
          highlight={unread > 0}
          loading={msgLoading}
          error={msgError}
        />
      </div>
    </div>
  )
}

export default Dashboard