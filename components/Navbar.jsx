"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "../contexts/SiteContext";
import { t } from "../locales/site";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, language, toggleTheme, toggleLanguage, mounted } = useSite();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const NAV_LINKS = [
    { href: "/", label: t("navHome", language) },
    { href: "/templates", label: t("navTemplates", language) },
    { href: "/kontak", label: t("navContact", language) },
  ];

  return (
    <nav className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image
            src="/photos/RSQUARE-LOGO.png"
            alt="RSQUARE Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="text-3xl font-bold gradient-text hidden sm:inline-block">
            RSQUARE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition ${
                  isActive
                    ? "text-orange-600 font-semibold border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Theme & Language Toggles */}
          <div className="flex items-center gap-2 ml-4">
            {/* Language Toggle */}
            {mounted && (
              <button
                onClick={toggleLanguage}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm"
                title={t("language", language)}
                aria-label={t("language", language)}
              >
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  {language === "id" ? "ID" : "EN"}
                </span>
              </button>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm"
                title={theme === "light" ? t("switchToDark", language) : t("switchToLight", language)}
                aria-label={theme === "light" ? t("switchToDark", language) : t("switchToLight", language)}
              >
                {theme === "light" ? (
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme & Language Toggles */}
          {mounted && (
            <>
              <button
                onClick={toggleLanguage}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-all"
                aria-label={t("language", language)}
              >
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                  {language === "id" ? "ID" : "EN"}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-all"
                aria-label={theme === "light" ? t("switchToDark", language) : t("switchToLight", language)}
              >
                {theme === "light" ? (
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block py-2 px-4 text-sm rounded ${
                  isActive
                    ? "text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
