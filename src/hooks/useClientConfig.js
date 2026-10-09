import { defaultConfig } from "../constants/data"
import { useEffect, useState } from "react"

const RAW_URL = "https://raw.githubusercontent.com/ojugo007/portfolio-config/main/ken-config.json";
const JSDELIVR_URL = "https://cdn.jsdelivr.net/gh/ojugo007/portfolio-config@main/ken-config.json";
const CACHE_KEY = "ken-config";

async function fetchConfig() {
  try {
    const res = await fetch(RAW_URL)
    if (!res.ok) throw new Error("raw fetch failed")
    return await res.json()
  } catch (err) {
    console.warn("raw.githubusercontent.com failed, trying jsDelivr:", err.message)
    const res = await fetch(JSDELIVR_URL)
    if (!res.ok) throw new Error("jsDelivr fetch also failed")
    return await res.json()
  }
}

export const useClientConfig = () => {
  const cached = typeof window !== "undefined" ? localStorage.getItem(CACHE_KEY) : null
  const [config, setConfig] = useState(cached ? JSON.parse(cached) : defaultConfig)
  const [loading, setLoading] = useState(!cached) // skip loading state if we already have cached data

  useEffect(() => {
    fetchConfig()
      .then((data) => {
        setConfig(data)
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
      })
      .catch((err) => console.warn("Falling back to cached/default config:", err.message))
      .finally(() => setLoading(false))
  }, [])

  return { config, loading }
}