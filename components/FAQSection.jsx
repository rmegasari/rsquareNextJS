"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "Bagaimana cara mendapatkan template yang saya beli?",
    answer:
      "Setelah pembayaran berhasil, Kamu akan menerima link akses instan ke template Google Sheets. Klik link tersebut dan pilih “Make a copy” untuk menyimpannya ke Google Drive Kamu.",
  },
  {
    question: "Apakah saya membutuhkan akun Google Workspace berbayar?",
    answer:
      "Tidak perlu. Semua template RSQUARE kompatibel dengan akun Google gratis. Kamu hanya perlu login ke Google untuk membuat salinan.",
  },
  {
    question: "Bisakah saya meminta kustomisasi pada template yang ada?",
    answer:
      "Bisa! Kamu dapat menghubungi kami melalui halaman Kontak untuk request kustomisasi sesuai kebutuhan alur kerja Kamu.",
  },
  {
    question: "Apakah ada panduan penggunaan?",
    answer:
      "Setiap template dilengkapi panduan tertulis. Banyak template juga memiliki video demo di channel YouTube kami.",
  },
  {
    question: "Apa saja yang boleh & tidak boleh saya lakukan dengan template ini?",
    answer:
      "Kamu bebas memakai template untuk kebutuhan pribadi atau bisnis sendiri. Namun, Kamu tidak boleh menjual kembali, mempublikasikan ulang, atau membagikannya secara gratis.",
  },
  {
    question: "Apakah saya akan mendapatkan update & dukungan?",
    answer:
      "Ya, Kamu akan mendapatkan update perbaikan bug gratis. Untuk penambahan fitur besar, akan ada biaya tambahan. Dukungan tersedia pada hari dan jam kerja melalui halaman Kontak.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-900">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-600 mt-4">
            Jawaban singkat untuk membantu Kamu memahami cara kerja layanan RSQUARE.
          </p>
        </div>
        <div className="space-y-4" data-animate-on-scroll>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="card rounded-xl" key={item.question}>
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
