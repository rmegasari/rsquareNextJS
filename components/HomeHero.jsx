"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "../contexts/SiteContext";
import { t } from "../locales/site";

export default function HomeHero() {
  const { language } = useSite();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container relative mx-auto px-6 py-28 md:py-36">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-6" data-animate-on-scroll>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
              {t("heroTitle", language)}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("heroDescription", language)}{" "}
              <span className="font-bold gradient-text">{t("heroDescriptionHighlight", language)}</span>{" "}
              {t("heroDescriptionEnd", language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-start justify-center">
              <Link
                href="/templates"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-orange-500 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-orange-400/50"
              >
                <span className="absolute left-0 -translate-x-full transform transition-transform duration-300 ease-out group-hover:translate-x-full">
                  <span className="h-full w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 opacity-30 absolute inset-0" />
                </span>
                <span className="relative flex items-center gap-2">
                  {t("heroCTAExplore", language)}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
              <a
                href="https://www.youtube.com/@RSQUAREIDEA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-hero-cta inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.25 6.75L16.5 12l-6.25 5.25V6.75z" />
                  </svg>
                  {t("heroCTADemo", language)}
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6 text-left">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t("heroStat1Value", language)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("heroStat1Label", language)}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t("heroStat2Value", language)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("heroStat2Label", language)}</p>
              </div>
            </div>
          </div>
          <div className="relative" data-animate-on-scroll>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-200 dark:bg-orange-900/30 rounded-full blur-3xl opacity-40 animate-blob" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-300 dark:bg-orange-800/30 rounded-full blur-3xl opacity-40 animation-delay-2000 animate-blob" />
            <div className="relative">
              <Image
                src="/photos/produk/goal-planner/Dashboard Goal Planner.png"
                alt="Dashboard Goal Planner"
                width={720}
                height={540}
                className="rounded-3xl shadow-2xl animate-float ring-1 ring-orange-200/50 dark:ring-orange-800/50"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
