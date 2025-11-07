"use client";

import { useEffect, useState } from "react";
import CardStack from "@/components/CardStack";
import { useSite } from "@/contexts/SiteContext";
import { t } from "@/locales/site";

export default function FeaturedTemplatesSection() {
  const { language } = useSite();
  const [featured, setFeatured] = useState([]);
  const [free, setFree] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        // Use optimized endpoints for better performance
        const [featuredResponse, freeResponse] = await Promise.all([
          fetch("/api/products/featured"),
          fetch("/api/products/free")
        ]);

        const [featuredProducts, freeProducts] = await Promise.all([
          featuredResponse.json(),
          freeResponse.json()
        ]);

        setFeatured(Array.isArray(featuredProducts) ? featuredProducts : []);
        setFree(Array.isArray(freeProducts) ? freeProducts : []);
      } catch (error) {
        console.error("Error loading products:", error);
        setFeatured([]);
        setFree([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold mb-4">
            {t("featuredBadge", language)}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t("featuredTitle", language)}
          </h2>
          <p className="text-gray-600">
            {t("featuredDescription", language)}
          </p>
        </div>

        {featured.length > 0 && (
          <CardStack
            products={featured}
            label={t("featuredLabel", language)}
            ctaLabel={t("ctaViewTemplate", language)}
          />
        )}

        {free.length > 0 && (
          <div className="mt-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-600 font-semibold mb-4">
                {t("freeBadge", language)}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t("freeTitle", language)}
              </h3>
              <p className="text-gray-600">
                {t("freeDescription", language)}
              </p>
            </div>
            <CardStack
              products={free}
              label={t("freeLabel", language)}
              ctaLabel={t("ctaGetTemplate", language)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
