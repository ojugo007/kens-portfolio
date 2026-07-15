import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext({ dark: "dark", setDark: () => {} });

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark === "dark");
    localStorage.setItem("theme", dark);
  }, [dark]);

  return (
    <ThemeCtx.Provider value={{ dark, setDark }}>
      {children}
    </ThemeCtx.Provider>
  );
};

export const useTheme = () => useContext(ThemeCtx);