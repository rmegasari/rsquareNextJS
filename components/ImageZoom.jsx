"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function ImageZoom({ src, alt, width, height, className = "" }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isZoomed) {
      // Prevent body scroll when zoomed
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className={`relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-[300px] rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-gray-500 dark:text-gray-400">Gambar tidak dapat dimuat</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{src}</p>
        </div>
      </div>
    );
  }

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
          onError={handleImageError}
          unoptimized={src.startsWith('/uploads')}
        />
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-black/80 transition-colors">
          🔍 Klik untuk zoom
        </div>
      </div>

      {/* Modal Zoom - Using Portal to render outside parent containers */}
      {isZoomed && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={toggleZoom}
          style={{ margin: 0 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-colors z-10 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            aria-label="Tutup zoom"
          >
            ✕
          </button>

          {/* Zoomed Image - Fit to screen */}
          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '90vh', maxWidth: '95vw' }}
            />
          </div>

          {/* Instruction */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm pointer-events-none">
            Klik di luar gambar atau tombol ✕ untuk keluar
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
