"use client";

import { useState, useRef, useEffect } from "react";
import { useSite } from "@/contexts/SiteContext";
import { t } from "@/locales/site";

const VIDEOS = [
  {
    title: "Template Personal Budgeting",
    url: "https://www.youtube.com/embed/FS5Fs4UoLAk?si=ZyKQaQfPzAjTO4kv&enablejsapi=1",
  },
  {
    title: "Template Content Calendar",
    url: "https://www.youtube.com/embed/BfHNr29C6yo?si=bXpmbzRZBlal8s_p&enablejsapi=1",
  },
  {
    title: "Template My To-Do List",
    url: "https://www.youtube.com/embed/i3NxKIfiHX8?si=f-t4z601hTLYKBIJ&enablejsapi=1",
  },
  {
    title: "Template Goal Planner",
    url: "https://www.youtube.com/embed/OWwID0f8vSE?enablejsapi=1",
  },
  {
    title: "Template Perencanaan Anggaran Acara",
    url: "https://www.youtube.com/embed/uk8scHNKWz4?enablejsapi=1",
  },
  {
    title: "Template Tracking Lamaran Kerja",
    url: "https://www.youtube.com/embed/XD8ImBgaamc?enablejsapi=1",
  },
];

export default function VideoShowcase() {
  const { language } = useSite();
  const [currentIndex, setCurrentIndex] = useState(0);
  const iframeRef = useRef(null);

  // Fungsi untuk pause video saat slide berubah
  const pauseCurrentVideo = () => {
    if (iframeRef.current) {
      try {
        // Kirim command pause ke YouTube iframe API
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      } catch (error) {
        console.log("Could not pause video:", error);
      }
    }
  };

  const handlePrevious = () => {
    pauseCurrentVideo();
    setCurrentIndex((prev) => (prev === 0 ? VIDEOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    pauseCurrentVideo();
    setCurrentIndex((prev) => (prev === VIDEOS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    // Pause video saat index berubah
    pauseCurrentVideo();
  }, [currentIndex]);

  return (
    <section id="youtube" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-900">{t("videoTitle", language)}</h2>
          <p className="text-gray-600 mt-4">
            {t("videoSubtitle", language)}
          </p>
        </div>

        {/* Video Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Video Frame */}
          <div className="card rounded-2xl overflow-hidden" data-animate-on-scroll>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full"
                src={VIDEOS[currentIndex].url}
                title={VIDEOS[currentIndex].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                {VIDEOS[currentIndex].title}
              </h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-orange-500 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center font-bold text-xl z-10"
            aria-label="Previous video"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-orange-500 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center font-bold text-xl z-10"
            aria-label="Next video"
          >
            ›
          </button>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {VIDEOS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  pauseCurrentVideo();
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
