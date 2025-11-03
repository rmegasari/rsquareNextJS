"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveAssetPath } from "@/lib/assetPaths";
import { useSite } from "@/contexts/SiteContext";
import { t } from "@/locales/site";

const MOBILE_BREAKPOINT = 768;
const MOBILE_MAX_VISIBLE = 3;
const OFFSET_DESKTOP = 50;
const OFFSET_DESKTOP_Y = -15;
const SCALE_STEP = 0.05;
const ANGLE_STEP = 5;
const MOBILE_Y_STEP = 50;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function computeCardStyle(position, isMobile) {
  if (isMobile) {
    const cappedIndex = Math.min(position, MOBILE_MAX_VISIBLE - 1);
    const yOffset = (MOBILE_MAX_VISIBLE - 1 - cappedIndex) * MOBILE_Y_STEP;
    const scale = 1 - cappedIndex * SCALE_STEP;
    return {
      "--x-offset": "0px",
      "--y-offset": `${yOffset}px`,
      "--scale": scale,
      "--angle": "0deg",
      opacity: position < MOBILE_MAX_VISIBLE ? 1 : 0,
      zIndex: 100 - position,
    };
  }

  if (position === 0) {
    return {
      "--x-offset": "0px",
      "--y-offset": "0px",
      "--scale": 1,
      "--angle": "0deg",
      opacity: 1,
      zIndex: 100,
    };
  }

  const xOffset = position * OFFSET_DESKTOP;
  const yOffset = position * OFFSET_DESKTOP_Y;
  const scale = 1 - position * SCALE_STEP;
  const angle = position * ANGLE_STEP;

  return {
    "--x-offset": `${xOffset}px`,
    "--y-offset": `${yOffset}px`,
    "--scale": scale,
    "--angle": `${angle}deg`,
    opacity: position < 3 ? 1 : 0,
    zIndex: 100 - position,
  };
}

export default function CardStack({ products, label, ctaLabel = "Lihat Template" }) {
  const { language } = useSite();
  const [order, setOrder] = useState(() => products.map((_, index) => index));
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitingIndex, setExitingIndex] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setOrder(products.map((_, index) => index));
  }, [products]);

  const orderedProducts = useMemo(
    () => order.map((productIndex) => products[productIndex]).filter(Boolean),
    [order, products],
  );

  const cycleFrontCard = useCallback(() => {
    if (isAnimating || order.length === 0) return;

    setIsAnimating(true);
    const frontCardIndex = order[0];
    setExitingIndex(frontCardIndex);

    setTimeout(() => {
      setOrder((previous) => {
        if (previous.length <= 1) {
          return previous;
        }
        const [first, ...rest] = previous;
        return [...rest, first];
      });
      setExitingIndex(null);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, order]);

  const bringCardToFront = useCallback(
    (position) => {
      if (isAnimating || position === 0) return;

      setIsAnimating(true);
      setOrder((previous) => {
        const updated = [...previous];
        const [selected] = updated.splice(position, 1);
        return [selected, ...updated];
      });

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating],
  );

  if (!products.length) {
    return null;
  }

  return (
    <div className="card-stack-container">
      <div className="card-stack template-section">
        {orderedProducts.map((product, position) => {
          const originalIndex = order[position];
          const imageSrc = resolveAssetPath(
            product.gambar_thumbnail || product.detail?.gambar_utama || "/photos/RSQUARE-LOGO.png",
          );
          const style = computeCardStyle(position, isMobile);
          const isFrontCard = position === 0;
          const isExiting = exitingIndex === originalIndex;

          return (
            <article
              key={product.id}
              style={style}
              className={`card-stack-item featured-card ${isExiting ? "exiting" : ""}`}
              aria-hidden={!isFrontCard}
            >
              <div
                onClick={() => (isFrontCard ? cycleFrontCard() : bringCardToFront(position))}
                className="cursor-pointer"
              >
                <Image
                  src={imageSrc}
                  alt={product.judul}
                  width={640}
                  height={480}
                  className="featured-card-image"
                  loading={position > 0 ? "lazy" : "eager"}
                />
                <div className="featured-card-content">
                  {label && (
                    <span className="label" aria-label={label}>
                      {label}
                    </span>
                  )}
                  <h3>🎯 {product.judul}</h3>
                  <div className="featured-card-description-wrapper">
                    <p className="featured-card-description">{product.deskripsi_singkat}</p>
                  </div>
                </div>
              </div>
              <div className="featured-card-description-wrapper px-6 pb-6">
                <Link
                  href={`/${product.id}`}
                  className="btn-primary-small"
                  onClick={(event) => event.stopPropagation()}
                >
                  {ctaLabel}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-gray-500 italic text-center">
        {t("cardInstruction", language)}
      </p>
    </div>
  );
}
