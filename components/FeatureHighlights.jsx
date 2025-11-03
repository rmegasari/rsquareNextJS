"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useSite } from "../contexts/SiteContext";
import { t } from "../locales/site";

export default function FeatureHighlights() {
  const { language } = useSite();

  const FEATURES = useMemo(
    () => [
      {
        id: "feature1",
        title: t("feature1Title", language),
        description: t("feature1Desc", language),
        image: "/Restorer-pana.png",
        align: "left",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        ),
      },
      {
        id: "feature2",
        title: t("feature2Title", language),
        description: t("feature2Desc", language),
        image: "/Rocket-pana.png",
        align: "right",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        id: "feature3",
        title: t("feature3Title", language),
        description: t("feature3Desc", language),
        image: "/Artificial intelligence-pana.png",
        align: "left",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
      },
      {
        id: "feature4",
        title: t("feature4Title", language),
        description: t("feature4Desc", language),
        image: "/Video tutorial-rafiki.png",
        align: "right",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
    [language]
  );

  return (
    <section className="py-24 dark:bg-gray-900">
      <div className="container mx-auto px-6 space-y-16">
        {FEATURES.map((feature, index) => {
          const isRightAligned = feature.align === "right";
          const content = (
            <div className="w-full md:w-5/12 space-y-3" data-animate-on-scroll key={`${feature.id}-content`}>
              <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          );
          const image = (
            <div className="hidden md:block md:w-5/12" data-animate-on-scroll key={`${feature.id}-image`}>
              <Image
                src={feature.image}
                alt={feature.title}
                width={480}
                height={360}
                className="w-full h-auto rounded-lg shadow-lg"
                priority={index === 0}
              />
            </div>
          );

          return (
            <div className="relative mb-16" key={feature.id}>
              <div className="md:flex items-center md:justify-between">
                {isRightAligned ? content : image}
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-full font-bold shadow-lg absolute left-6 top-0 -translate-x-1/2 md:static md:translate-x-0">
                  {feature.icon}
                </div>
                {isRightAligned ? image : content}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
