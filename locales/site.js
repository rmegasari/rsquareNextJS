export const translations = {
  id: {
    // Navbar
    navHome: "Beranda",
    navTemplates: "Templates",
    navContact: "Kontak",

    // Announcement Bar
    announcementVoucher: "Kode Voucher Bulan Ini:",
    announcementMessage: "untuk mendapatkan Diskon semua Templates",
    announcementClaim: "Klaim Sekarang →",

    // Home Hero
    heroTitle: "Template Google Sheets Premium untuk Produktivitas Kamu",
    heroDescription: "Ubah cara Kamu mengelola data. Hemat waktu, kurangi stres, dan ambil",
    heroDescriptionHighlight: "keputusan cerdas",
    heroDescriptionEnd: "dengan solusi siap pakai dari RSQUARE.",
    heroCTAExplore: "Jelajahi Template",
    heroCTADemo: "Lihat Demo",
    heroStat1Value: "500+",
    heroStat1Label: "Tim & individu terbantu",
    heroStat2Value: "⭐ 4.9/5",
    heroStat2Label: "Rating pelanggan rata-rata",

    // Feature Highlights
    feature1Title: "Desain Intuitif & Estetis",
    feature1Desc: "Setiap template dirancang dengan fokus pada kemudahan penggunaan dan tampilan visual yang bersih.",
    feature2Title: "Langsung Siap Pakai",
    feature2Desc: "Tidak perlu lagi membuat spreadsheet dari nol. Template kami adalah solusi jadi yang menghemat puluhan jam waktu berharga Kamu.",
    feature3Title: "Otomatisasi Canggih",
    feature3Desc: "Template kami ditenagai oleh Google Apps Script untuk fitur-fitur canggih yang mempermudah pekerjaan Kamu.",
    feature4Title: "Panduan & Dukungan",
    feature4Desc: "Setiap template dilengkapi instruksi yang jelas. Bingung? Tonton video demo kami di YouTube untuk melihat cara kerjanya.",

    // Footer
    footerTagline: "Template Google Sheets premium untuk produktivitas Kamu.",
    footerQuickLinks: "Tautan Cepat",
    footerLegal: "Legal",
    footerHome: "Beranda",
    footerTemplates: "Templates",
    footerContact: "Kontak",
    footerFeedback: "Kirim Masukan",
    footerPrivacy: "Kebijakan Privasi",
    footerTerms: "Syarat & Ketentuan",
    footerCopyright: "RSQUARE. Dirancang dengan Penuh Semangat.",

    // Theme/Language Toggle
    switchToDark: "Beralih ke Mode Gelap",
    switchToLight: "Beralih ke Mode Terang",
    language: "Bahasa",
    languageToggle: "ID/EN",
  },
  en: {
    // Navbar
    navHome: "Home",
    navTemplates: "Templates",
    navContact: "Contact",

    // Announcement Bar
    announcementVoucher: "This Month's Voucher Code:",
    announcementMessage: "to get Discount on all Templates",
    announcementClaim: "Claim Now →",

    // Home Hero
    heroTitle: "Premium Google Sheets Templates for Your Productivity",
    heroDescription: "Transform the way you manage data. Save time, reduce stress, and make",
    heroDescriptionHighlight: "smart decisions",
    heroDescriptionEnd: "with ready-to-use solutions from RSQUARE.",
    heroCTAExplore: "Explore Templates",
    heroCTADemo: "Watch Demo",
    heroStat1Value: "500+",
    heroStat1Label: "Teams & individuals helped",
    heroStat2Value: "⭐ 4.9/5",
    heroStat2Label: "Average customer rating",

    // Feature Highlights
    feature1Title: "Intuitive & Aesthetic Design",
    feature1Desc: "Every template is designed with a focus on ease of use and clean visual appearance.",
    feature2Title: "Ready to Use Instantly",
    feature2Desc: "No need to create spreadsheets from scratch anymore. Our templates are ready-made solutions that save you dozens of precious hours.",
    feature3Title: "Advanced Automation",
    feature3Desc: "Our templates are powered by Google Apps Script for advanced features that make your work easier.",
    feature4Title: "Guides & Support",
    feature4Desc: "Each template comes with clear instructions. Confused? Watch our demo videos on YouTube to see how it works.",

    // Footer
    footerTagline: "Premium Google Sheets templates for your productivity.",
    footerQuickLinks: "Quick Links",
    footerLegal: "Legal",
    footerHome: "Home",
    footerTemplates: "Templates",
    footerContact: "Contact",
    footerFeedback: "Send Feedback",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms & Conditions",
    footerCopyright: "RSQUARE. Designed with Passion.",

    // Theme/Language Toggle
    switchToDark: "Switch to Dark Mode",
    switchToLight: "Switch to Light Mode",
    language: "Language",
    languageToggle: "EN/ID",
  },
};

export function t(key, lang = "id", replacements = {}) {
  let text = translations[lang]?.[key] || translations["id"][key] || key;

  // Replace placeholders like {{placeholder}}
  Object.keys(replacements).forEach((placeholder) => {
    text = text.replace(`{{${placeholder}}}`, replacements[placeholder]);
  });

  return text;
}
