"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageZoom({ src, alt, width, height, className = "" }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* Gambar Normal */}
      <div className={`relative cursor-zoom-in ${className}`} onClick={toggleZoom}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-contain rounded-lg"
          priority
        />
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          🔍 Klik untuk zoom
        </div>
      </div>

      {/* Modal Zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={toggleZoom}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-colors z-10"
            onClick={toggleZoom}
          >
            ✕
          </button>

          {/* Zoomed Image */}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="object-contain max-w-full max-h-full"
              quality={100}
            />
          </div>

          {/* Instruction */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm">
            Klik di mana saja untuk keluar
          </div>
        </div>
      )}
    </>
  );
}
