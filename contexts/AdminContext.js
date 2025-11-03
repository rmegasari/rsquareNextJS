"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("id");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("admin-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Load language from localStorage
    const savedLanguage = localStorage.getItem("admin-language") || "id";
    setLanguage(savedLanguage);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "id" ? "en" : "id";
    setLanguage(newLanguage);
    localStorage.setItem("admin-language", newLanguage);
  };

  return (
    <AdminContext.Provider value={{ theme, language, toggleTheme, toggleLanguage }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
