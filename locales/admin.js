export const translations = {
  id: {
    // Sidebar
    dashboard: "Dashboard",
    templates: "Templates",
    addTemplate: "Tambah Template",
    logout: "Logout",
    cms: "Content Management System",

    // Dashboard
    welcomeMessage: "Selamat datang di panel administrasi RSQUARE",
    totalTemplates: "Total Template",
    freeTemplates: "Template Gratis",
    premiumTemplates: "Template Premium",
    featuredTemplates: "Template Unggulan",
    quickActions: "Aksi Cepat",

    // Quick Actions
    addNewTemplate: "Tambah Template Baru",
    addNewTemplateDesc: "Buat template baru untuk ditampilkan di website",
    manageTemplates: "Kelola Template",
    manageTemplatesDesc: "Edit atau hapus template yang sudah ada",
    viewWebsite: "Lihat Website",
    viewWebsiteDesc: "Preview website dari sisi pengunjung",

    // Info Panel
    managementTips: "Tips Mengelola Template",
    tip1: "Pastikan gambar yang diupload berkualitas tinggi (minimal 1200px lebar)",
    tip2: "Gunakan deskripsi yang jelas dan menarik untuk setiap template",
    tip3: 'Set template sebagai "Featured" untuk menampilkannya di halaman utama',
    tip4: "Update harga dan link pembelian secara berkala",

    // Templates Page
    manageTemplatesTitle: "Kelola Template",
    totalCount: "Total {{count}} template",
    searchTemplate: "Cari Template",
    searchPlaceholder: "Masukkan nama template...",
    filterType: "Filter Tipe",
    allTemplates: "Semua Template",
    free: "Gratis",
    premium: "Premium",
    featured: "Featured",

    // Template Actions
    preview: "Preview",
    edit: "Edit",
    delete: "Hapus",

    // Empty State
    noTemplatesFound: "Tidak ada template ditemukan",
    changeFilterOrAdd: "Coba ubah filter atau tambah template baru",

    // Loading
    loading: "Memuat template...",

    // Theme Toggle
    switchToDark: "Switch to Dark Mode",
    switchToLight: "Switch to Light Mode",

    // Language
    language: "Bahasa",
    indonesian: "Indonesia",
    english: "English",
  },
  en: {
    // Sidebar
    dashboard: "Dashboard",
    templates: "Templates",
    addTemplate: "Add Template",
    logout: "Logout",
    cms: "Content Management System",

    // Dashboard
    welcomeMessage: "Welcome to RSQUARE administration panel",
    totalTemplates: "Total Templates",
    freeTemplates: "Free Templates",
    premiumTemplates: "Premium Templates",
    featuredTemplates: "Featured Templates",
    quickActions: "Quick Actions",

    // Quick Actions
    addNewTemplate: "Add New Template",
    addNewTemplateDesc: "Create a new template to display on the website",
    manageTemplates: "Manage Templates",
    manageTemplatesDesc: "Edit or delete existing templates",
    viewWebsite: "View Website",
    viewWebsiteDesc: "Preview website from visitor's perspective",

    // Info Panel
    managementTips: "Template Management Tips",
    tip1: "Ensure uploaded images are high quality (minimum 1200px width)",
    tip2: "Use clear and attractive descriptions for each template",
    tip3: 'Set template as "Featured" to display it on the main page',
    tip4: "Update prices and purchase links regularly",

    // Templates Page
    manageTemplatesTitle: "Manage Templates",
    totalCount: "Total {{count}} templates",
    searchTemplate: "Search Template",
    searchPlaceholder: "Enter template name...",
    filterType: "Filter Type",
    allTemplates: "All Templates",
    free: "Free",
    premium: "Premium",
    featured: "Featured",

    // Template Actions
    preview: "Preview",
    edit: "Edit",
    delete: "Delete",

    // Empty State
    noTemplatesFound: "No templates found",
    changeFilterOrAdd: "Try changing filters or add a new template",

    // Loading
    loading: "Loading templates...",

    // Theme Toggle
    switchToDark: "Switch to Dark Mode",
    switchToLight: "Switch to Light Mode",

    // Language
    language: "Language",
    indonesian: "Indonesian",
    english: "English",
  },
};

export function t(key, lang, replacements = {}) {
  let text = translations[lang]?.[key] || translations["id"][key] || key;

  // Replace placeholders like {{count}}
  Object.keys(replacements).forEach((placeholder) => {
    text = text.replace(`{{${placeholder}}}`, replacements[placeholder]);
  });

  return text;
}
