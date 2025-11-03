"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminProvider, useAdmin } from "../../contexts/AdminContext";
import { t } from "../../locales/admin";

function AdminLayoutContent({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { theme, language, toggleTheme, toggleLanguage } = useAdmin();

  useEffect(() => {
    // Cek apakah user sudah login
    const isLoggedIn = document.cookie.includes("admin_session=authenticated");

    if (!isLoggedIn && !pathname.includes("/login")) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    // Hapus cookie session
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: t("dashboard", language), icon: "📊" },
    { href: "/admin/templates", label: t("templates", language), icon: "📄" },
    { href: "/admin/templates/new", label: t("addTemplate", language), icon: "➕" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="admin-sidebar fixed top-0 left-0 h-full w-64 text-white z-50">
        <div className="p-6">
          <div className="admin-sidebar-header mb-4">
            <h1 className="text-2xl font-bold gradient-text mb-2">RSQUARE Admin</h1>
            <p className="text-xs text-gray-400">{t("cms", language)}</p>
          </div>

          {/* Theme & Language Toggle - Di Sidebar */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex-1 admin-theme-toggle bg-white/10 hover:bg-white/20"
              title={t("language", language)}
            >
              <span className="text-sm font-bold text-white">
                {language === "id" ? "ID" : "EN"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex-1 admin-theme-toggle bg-white/10 hover:bg-white/20"
              title={theme === "light" ? t("switchToDark", language) : t("switchToLight", language)}
            >
              {theme === "light" ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-item flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive ? "active text-white font-semibold" : "text-gray-300"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="admin-logout-btn flex items-center justify-center gap-3"
          >
            <span className="text-xl">🚪</span>
            <span>{t("logout", language)}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
