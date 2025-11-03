"use client";

import { useState } from "react";
import { useSite } from "@/contexts/SiteContext";
import { t } from "@/locales/site";

export default function FAQSection() {
  const { language } = useSite();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const FAQS = [
    {
      question: t("faq1Q", language),
      answer: t("faq1A", language),
    },
    {
      question: t("faq2Q", language),
      answer: t("faq2A", language),
    },
    {
      question: t("faq3Q", language),
      answer: t("faq3A", language),
    },
    {
      question: t("faq4Q", language),
      answer: t("faq4A", language),
    },
    {
      question: t("faq5Q", language),
      answer: t("faq5A", language),
    },
    {
      question: t("faq6Q", language),
      answer: t("faq6A", language),
    },
  ];

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-900">{t("faqTitle", language)}</h2>
          <p className="text-gray-600 mt-4">
            {t("faqSubtitle", language)}
          </p>
        </div>
        <div className="space-y-4" data-animate-on-scroll>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="card rounded-xl" key={index}>
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="faq-question w-full flex justify-between items-center text-left p-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-lg text-gray-800">{item.question}</span>
                  <svg
                    className={`faq-icon w-6 h-6 text-orange-500 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`faq-answer overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="p-6 pt-0 text-gray-600">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
