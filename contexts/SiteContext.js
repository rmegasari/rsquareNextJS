"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("site-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    // Add/remove 'dark' class for Tailwind dark mode
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load language from localStorage
    const savedLanguage = localStorage.getItem("site-language") || "id";
    setLanguage(savedLanguage);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("site-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    // Add/remove 'dark' class for Tailwind dark mode
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "id" ? "en" : "id";
    setLanguage(newLanguage);
    localStorage.setItem("site-language", newLanguage);
  };

  return (
    <SiteContext.Provider value={{ theme, language, toggleTheme, toggleLanguage, mounted }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return context;
}

// Keep AdminContext exports for backward compatibility
export const AdminProvider = SiteProvider;
export const useAdmin = useSite;
