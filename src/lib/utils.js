import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function NameInnitial(name) {
  if (!name || typeof name !== "string") return ""

  const nameArray = name.trim().split(/\s+/).filter(Boolean)

  if (nameArray.length === 0) return ""
  if (nameArray.length === 1) return nameArray[0][0].toUpperCase()

  return (nameArray[0][0] + nameArray[1][0]).toUpperCase()
}