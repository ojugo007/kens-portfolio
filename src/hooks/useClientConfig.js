import {defaultConfig} from "../constants/data"
import { useEffect, useState } from "react"

export const CONFIG_URL = "https://raw.githubusercontent.com/ojugo007/portfolio-config/main/ken-config.json";

export const useClientConfig = () => {
    const [config, setConfig] = useState(defaultConfig)
    const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(CONFIG_URL)
    .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch config")
        return res.json()
      })
      .then((data) => setConfig(data))
      .catch((err) => {
        console.warn("Falling back to default config:", err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return {config, loading}
}

