"use client";

import { useSite } from "@/contexts/SiteContext";
import { t } from "@/locales/site";

export default function KontakPage() {
  const { language } = useSite();

  return (
    <div className="py-20 px-6 dark:bg-gray-900">
      <div className="container mx-auto max-w-2xl">
        <header className="text-center mb-12" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text pb-2">
            {t("contactTitle", language)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("contactDescription", language)}
          </p>
        </header>
        <div className="card p-8 md:p-10 rounded-2xl" data-animate-on-scroll>
          <form
            name="kontak"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="kontak" />
            <p className="hidden">
              <label>
                Jangan diisi: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t("contactFormName", language)}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t("contactFormEmail", language)}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t("contactFormMessage", language)}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button type="submit" className="btn-primary btn-shiny w-full px-6 py-3 rounded-lg font-semibold text-white">
              {t("contactFormSubmit", language)}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {t("contactFormSuccess", language)}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
