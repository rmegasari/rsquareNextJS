-- RSQUARE Data Migration SQL
-- Generated: 2025-11-04T01:45:12.512Z
-- Run this in Supabase SQL Editor after creating the schema

-- Disable triggers and foreign keys temporarily
SET session_replication_role = 'replica';


-- Insert products
INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'content-calendar',
  'Template Content Calendar',
  'Template ini dirancang untuk membantu Kamu konsisten, meningkatkan engagement, dan membangun audiens setia.',
  0,
  '/photos/produk/content-calendar/template-content-calendar.png',
  false,
  '2025-10-31 02:50:37',
  '2025-10-31 02:50:37'
);

INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'goal-planner',
  'Goal Planner',
  'Rencanakan dan lacak semua tujuan Kamu dengan dasbor interaktif, rencana bulanan, daftar tugas prioritas, dan kalender cerdas.',
  35000,
  '/photos/produk/goal-planner/goal-planner-thumbnail.png',
  false,
  '2025-10-31 02:50:37',
  '2025-10-31 02:50:37'
);

INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'invoice-maker',
  'Invoice Maker',
  'Buat faktur profesional secara otomatis. Cukup masukkan data klien dan item, lalu simpan sebagai PDF langsung ke Google Drive Kamu.',
  0,
  '/photos/produk/invoice-maker/invoice-maker-thumbnail.png',
  true,
  '2025-10-31 02:50:37',
  '2025-11-03 03:29:10'
);

INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'my-to-do-list',
  'Template My To-Do List',
  'Template ini sangat cocok untuk pelajar, freelancer, manajer proyek, dan siapa saja yang ingin mengubah daftar tugas mereka dari sekadar catatan menjadi sebuah sistem yang proaktif.',
  0,
  '/photos/produk/my-to-do-list/template-my-to-do-list-.png',
  false,
  '2025-10-31 02:50:37',
  '2025-10-31 02:50:37'
);

INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'perencanaan-acara',
  'Perencanaan Anggaran Acara',
  'Kelola semua aspek keuangan acara Kamu, mulai dari anggaran, vendor, hingga jadwal pembayaran dalam satu dasbor terpusat.',
  25000,
  '/photos/produk/anggaran-acara/anggaran-acara-thumbnail.png',
  true,
  '2025-10-31 02:50:37',
  '2025-10-31 02:50:37'
);

INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'personal-budgeting',
  'Personal Budgeting',
  'Template ini dirancang secara cermat untuk mengubah data transaksi yang rumit menjadi sebuah dashboard yang visual, intuitif, dan mudah dipahami.',
  35000,
  '/photos/produk/personal-budgeting/personal-budgeting-thumbnail.png',
  true,
  '2025-10-31 02:50:37',
  '2025-11-03 09:10:42'
);

INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (
  'tracking-lamaran',
  'Tracking Lamaran Kerja',
  'Lacak setiap lamaran kerja, kelola database lowongan, cari peluang, dan atur jadwal interview Kamu dalam satu template terpadu.',
  20000,
  '/photos/produk/tracking-lamaran/tracking-lamaran-thumbnail.png',
  false,
  '2025-10-31 02:50:37',
  '2025-10-31 02:50:37'
);


-- Insert product details
INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'content-calendar',
  'photos/produk/content-calendar/sheet-calendar.png',
  'Template Kalender Konten ini adalah solusi lengkap untuk Kamu yang ingin mengelola strategi konten dengan lebih terstruktur, efisien, dan tanpa pusing yang membantu Kamu konsisten, meningkatkan engagement, dan membangun audiens setia. Dengan fitur-fitur yang canggih, mengelola konten bukan lagi beban, melainkan proses yang menyenangkan dan produktif.',
  NULL,
  NULL,
  'https://www.youtube.com/embed/BfHNr29C6yo?si=VONarwlhd3BxMBDF',
  NULL
);

INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'goal-planner',
  '/photos/produk/goal-planner/Dashboard Goal Planner.png',
  'Perkenalkan Template Goal Planner Cerdas—sebuah sistem terintegrasi yang mengubah tujuan besar Anda menjadi aksi harian yang terukur. Dilengkapi Dashboard Interaktif, Asisten Pengingat Cerdas di Kalender, dan Progress Bar Otomatis, template ini adalah partner Anda untuk merencanakan dengan cerdas dan mencapai lebih banyak hal.',
  'content/template-preview.html?product=goal-planner',
  NULL,
  'https://www.youtube.com/embed/OWwID0f8vSE?enablejsapi=1',
  NULL
);

INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'my-to-do-list',
  '/photos/produk/my-to-do-list/to-do-list.png',
  'Bosan dengan to-do list yang biasa saja? Ubah Google Sheets Kamu menjadi sistem manajemen tugas yang cerdas, estetik, dan sepenuhnya otomatis!

Template ini sangat cocok untuk **pelajar**, **freelancer**, **manajer proyek**, dan siapa saja yang ingin mengubah daftar tugas mereka dari sekadar catatan menjadi sebuah sistem yang proaktif.',
  NULL,
  NULL,
  'https://www.youtube.com/embed/i3NxKIfiHX8?si=f-t4z601hTLYKBIJ',
  NULL
);

INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'perencanaan-acara',
  '/photos/produk/anggaran-acara/dashboard.jpeg',
  'Pusat kendali acara Kamu, tempat di mana Kamu bisa memantau semua metrik penting dalam sekejap untuk membuat keputusan yang lebih baik.',
  'content/template-preview.html?product=perencanaan-acara',
  NULL,
  'https://www.youtube.com/embed/uk8scHNKWz4?enablejsapi=1',
  NULL
);

INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'tracking-lamaran',
  '/photos/produk/tracking-lamaran/dashboard.jpeg',
  'Template ini dibuat untuk membantumu mencatat dan memantau semua proses lamaran kerja dengan mudah dan rapi. Di dalamnya, kamu bisa melihat daftar lowongan yang pernah kamu lamar, statusnya (seperti dipanggil interview, tes, diterima, atau ditolak), hingga progress secara visual. Semua data akan tersusun otomatis dan bisa kamu update dengan cepat. ',
  'content/template-preview.html?product=tracking-lamaran',
  NULL,
  'https://www.youtube.com/embed/XD8ImBgaamc?enablejsapi=1',
  NULL
);

INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'invoice-maker',
  '/photos/produk/invoice-maker/Invoice.png',
  'Lihat lebih dekat setiap fitur dan sheet yang akan Kamu dapatkan dalam template Invoice Maker gratis ini.',
  'content/template-preview.html?product=invoice-maker',
  NULL,
  'https://www.youtube.com/embed/2nptWANixos?enablejsapi=1',
  NULL
);

INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (
  'personal-budgeting',
  '/photos/produk/personal-budgeting/Dashboard.png',
  'Template ini dirancang secara cermat untuk mengubah data transaksi yang rumit menjadi sebuah dashboard yang visual, intuitif, dan mudah dipahami. Lacak setiap pemasukan dan pengeluaran, monitor progres pelunasan utang, dan lihat tabungan impian Kamu bertumbuh—semuanya dalam satu sistem yang terintegrasi dan otomatis. Berhentilah merasa cemas dan mulailah membuat keputusan finansial yang cerdas hari ini.',
  'content/template-preview.html?product=personal-budgeting',
  'https://rsquareidea.myr.id/pl/Personal-Budgeting-33997',
  'https://www.youtube.com/embed/FS5Fs4UoLAk?si=ZyKQaQfPzAjTO4kv',
  NULL
);


-- Insert product links
INSERT INTO product_links (product_id, platform, url) VALUES (
  'content-calendar',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/d198611x6lld'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'content-calendar',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/template-content-calendar'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'goal-planner',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/2xr97n07n0p1'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'goal-planner',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/template-goal-planner'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'my-to-do-list',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/zk9og654n96e'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'my-to-do-list',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/template-my-to-do-list'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'perencanaan-acara',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/kl0gk33q81zd'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'perencanaan-acara',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/template-perencanaan-anggaran-acara-v10'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'tracking-lamaran',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/2v4r09xe6y90'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'tracking-lamaran',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/template-tracking-lamaran'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'invoice-maker',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/rqrl1zr2jqn0'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'invoice-maker',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/racikan-jamu-invoice'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'personal-budgeting',
  'Lynk.ID',
  'https://lynk.id/rsquareidea/8jq7zeq8m1kl'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'personal-budgeting',
  'KaryaKarsa',
  'https://karyakarsa.com/rsquare/template-personal-budget'
);

INSERT INTO product_links (product_id, platform, url) VALUES (
  'personal-budgeting',
  'youtube',
  'https://www.youtube.com/'
);


-- Insert product gallery
INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'content-calendar',
  '🗓️ CALENDAR',
  '

Pada sheet utama, <b>🗓️ CALENDAR</b>, Kamu akan menemukan kalender konten yang sangat intuitif. Di sini, Kamu bisa merencanakan setiap detail konten, mulai dari ide, topik, platform publikasi (misalnya Instagram, TikTok, YouTube), hingga status pengerjaannya. Semua terorganisir dalam satu tempat, memastikan Kamu tidak lagi bingung atau melewatkan jadwal postingan.<p>Keunggulan utama template ini terletak pada kecanggihan Apps Script yang disematkan di dalamnya, memberikan dua fitur revolusioner:</p> <p><b>Otomatisasi Ajaib!</b> ✨: Sinkronisasi jadwal postingan langsung ke Google Calendar hanya dengan 1 klik!  </p> <p><b>Input Waktu Sat-set</b> ⏱️: Ketik angka (misal 930), otomatis jadi format waktu yang benar. Hemat waktu banget!</p> <p><b>Perencanaan Rapi</b> 🗓️: Semua ide, status, dan platform konten terorganisir di satu tempat.</p>',
  '/photos/produk/content-calendar/sheet-calendar.png',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'content-calendar',
  '⏱️ Fitur Format Waktu',
  'Input Waktu menjadi Cepat dan Efisien dengan hanya input angka saja dan secara otomatis, Apps Script akan mengubahnya menjadi format waktu yang benar untuk bisa masuk ke Google Calendar.<p>(misalnya : Input angka <b>930</b> menjadi <b>09:30</b> atau angka <b>16</b> menjadi <b>16:00</b>).</p>',
  '/photos/produk/content-calendar/format-waktu.png',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'content-calendar',
  '✨ Fitur Google Calendar',
  'Fitur ini akan menjadwalkan konten dari sheet <b>Calendar</b> ke Google Calendar secara automatis tanpa perlu kita repot input ulang lagi setelah pengaktifan awal fiturnya di menu <b>Fitur Kalender</b>',
  '/photos/produk/content-calendar/template-content-calendar-1-.png',
  2
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'content-calendar',
  '📅 Google Calendar',
  'Jadwal konten yang Kamu susun di spreadsheet akan langsung tersinkronisasi ke Google Calendar pribadi Kamu. Kamu dapat memvisualisasikan jadwal postingan dengan jelas dan mendapatkan notifikasi, membuat manajemen waktu menjadi sangat mudah.',
  '/photos/produk/content-calendar/template-content-calendar-2-.png',
  3
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'goal-planner',
  '🎯 Dashboard',
  'Ini adalah layar utama tempat Kamu memulai hari. Dapatkan gambaran besar dari semua tujuan, progres, dan tugas terpenting Kamu dalam satu halaman yang dinamis dan interaktif.<br><strong class=''font-bold text-gray-800''>🌟 Laporan Bulanan Cerdas:</strong> Pilih Bulan dan Tahun, dan saksikan seluruh dashboard berubah untuk menampilkan fokus aksi dan performa Kamu khusus untuk periode tersebut.<br><strong class=''font-bold text-gray-800''>📊 Kartu Progres Dinamis:</strong> Pantau progres keseluruhan dari setiap tujuan utama yang sedang Kamu kerjakan di bulan terpilih.<br><strong class=''font-bold text-gray-800''>⚡Tugas Prioritas Otomatis:</strong> Daftar tugas harian paling mendesak akan muncul secara otomatis di sini.',
  '/photos/produk/goal-planner/Dashboard Goal Planner.png',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'goal-planner',
  '🥅 Input Tujuan Utama',
  'Di sinilah Kamu meletakkan fondasi kesuksesan Kamu dengan mendefinisikan mimpi dan tujuan jangka panjang secara jelas.<br><strong class=''font-bold text-gray-800''>🔥 ID Tujuan Otomatis:</strong> Cukup pilih kategori, dan sistem akan membuatkan ID unik untuk setiap tujuan Kamu.<br><strong class=''font-bold text-gray-800''>✨ Kutipan Inspiratif Harian:</strong> Dapatkan suntikan motivasi baru setiap pagi dari kutipan yang berganti secara otomatis.<br><strong class=''font-bold text-gray-800''>⛓️ Terpusat & Terstruktur:</strong> Semua tujuan besar Kamu tersimpan rapi di satu tempat.',
  '/photos/produk/goal-planner/list.jpeg',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'goal-planner',
  '📝 Rencana & Review Bulanan',
  'Sheet ini adalah jantung dari strategi Kamu. Terjemahkan tujuan besar menjadi target-target bulanan yang konkret, lalu lakukan review mendalam untuk belajar dan berkembang.<br><strong class=''font-bold text-gray-800''>📕 Sistem Blok Bulanan:</strong> Desain ''jurnal panjang'' yang intuitif untuk melihat histori dan rencana dari bulan ke bulan.<br><strong class=''font-bold text-gray-800''>🗂️ Kartu Review Terstruktur:</strong> Fasilitasi refleksi dengan tiga area khusus: capaian, tantangan, dan prioritas.<br><strong class=''font-bold text-gray-800''>⏳ Widget Countdown Cerdas:</strong> Hitung mundur yang dinamis dan sadar waktu.',
  '/photos/produk/goal-planner/review.jpeg',
  2
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'goal-planner',
  '📋 Tugas Prioritas',
  'Kelola semua tugas harian Kamu dalam satu daftar yang simpel, bersih, dan efektif.<br><strong class=''font-bold text-gray-800''>📊 Dashboard Mini Otomatis:</strong> Progress bar dan pesan motivasi cerdas akan ter-update secara real-time.<br><strong class=''font-bold text-gray-800''>💥 Prioritas & Deadline:</strong> Atur prioritas (Tinggi, Sedang, Rendah) dan batas waktu untuk setiap tugas.<br><strong class=''font-bold text-gray-800''>⌨️ Terintegrasi Penuh:</strong> Terhubung langsung dengan Dashboard utama dan Kalender.',
  '/photos/produk/goal-planner/tugas-prioritas.jpeg',
  3
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'goal-planner',
  '🗓️ Kalender',
  'Lihat jadwal dan deadline tugas Kamu dalam format kalender bulanan yang bersih. Bukan hanya kalender biasa, ia dilengkapi dengan ''Asisten Cerdas'' pribadi Kamu.<br><strong class=''font-bold text-gray-800''>🤖 Asisten Pengingat Cerdas:</strong> Sebuah pesan otomatis di atas kalender yang akan mengingatkan Kamu tugas paling penting.<br><strong class=''font-bold text-gray-800''>🎨 Desain Visual Dinamis:</strong> Tanggal dari bulan lain akan otomatis meredup, membantu mata Kamu untuk fokus.',
  '/photos/produk/goal-planner/kalender.jpeg',
  4
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'invoice-maker',
  '📝 INPUT',
  'Di sinilah Kamu memasukkan semua data yang diperlukan untuk membuat faktur secara otomatis.<br><strong>Informasi Klien & Perusahaan</strong> 🏢: Masukkan detail klien dan informasi perusahaan Kamu.<br><strong>Detail Item/Jasa</strong> 🛍️: Tuliskan semua item atau jasa yang dibeli klien.<br><strong>Pengaturan Faktur</strong> ⚙️: Atur nomor faktur, tanggal, dan ketentuan pembayaran.',
  '/photos/produk/invoice-maker/Invoice-Input.png',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'invoice-maker',
  '🧾 INVOICE',
  'Sheet ini secara otomatis akan menghasilkan faktur yang rapi dan profesional berdasarkan data dari sheet ''INPUT''.<br><strong>Tampilan Profesional</strong> ✨: Faktur yang siap cetak atau dikirim, lengkap dengan logo.<br><strong>Rincian Otomatis</strong> 🤖: Semua detail pesanan dan total biaya akan terhitung secara otomatis.<br><strong>Siap Kirim</strong> 📤: Cukup klik menu ''<b>Invoice Tool</b>'' lalu ''<b>Simpan Invoice</b>'' maka PDF akan tersimpan otomatis.',
  '/photos/produk/invoice-maker/Invoice.png',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'my-to-do-list',
  'To-Do List ✨',
  'Ini adalah pusat kendali utama Kamu. Di sinilah semua tugas direncanakan, dijadwalkan, dan dieksekusi. Tampilannya dirancang agar bersih dan intuitif, memungkinkan Kamu melihat semua informasi penting dalam satu pKamungan.

**Fitur Utama:**

* ✅ **Jadwal Otomatis ke Google Calendar:** Cukup centang tugas, jadwal langsung terbuat di kalender Kamu. Hapus centang untuk membatalkan.
* 🎨 **Pop-up Profesional:** Dapatkan notifikasi custom dengan logo brand Kamu dan tautan langsung ke Google Calendar.
* 📊 **Dashboard Dinamis:** Pantau progres secara *real-time* dengan statistik, *progress bar* visual, dan motivasi otomatis.

Kartu **dashboard**, ***progress bar***, dan **kata-kata motivasi** di bagian atas template akan diperbarui secara *real-time* setiap kali Kamu menyelesaikan sebuah tugas.',
  '/photos/produk/my-to-do-list/to-do-list.png',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'my-to-do-list',
  'Penjadwalan Otomatis ke Google Calendar 🗓️',
  'Fitur ini secara ajaib mengirimkan detail tugas Kamu ke Google Calendar hanya dengan satu klik. Kamu tidak perlu lagi membuka aplikasi kalender dan mengetik ulang jadwal secara manual.\
\
Cukup isi detail tugas, lalu **centang checkbox** di sebelahnya. Script akan langsung membuatkan acara di kalender Kamu.',
  '/photos/produk/my-to-do-list/fitur-1.png',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'my-to-do-list',
  'Pembatalan Otomatis dari Google Calendar 🗓️',
  'Jika ada perubahan rencana, Kamu bisa membatalkan jadwal di kalender sama mudahnya seperti saat membuatnya.\
\
Cukup **hapus centang (uncheck)** dari tugas yang bersangkutan. Script akan otomatis mencari dan menghapus acara tersebut dari Google Calendar Kamu.',
  '/photos/produk/my-to-do-list/fitur-2.png',
  2
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'my-to-do-list',
  'Format Waktu Cerdas 🕰️',
  'Menghemat waktu Kamu saat memasukkan jam. Tidak perlu mengetik titik dua (:) atau format yang rumit.

Cukup ketik angka di kolom **Waktu** (contoh: `730` akan menjadi 07:30, `15` akan menjadi 15:00). Script akan langsung mengubahnya ke format jam yang benar.',
  '/photos/produk/my-to-do-list/fitur-3.png',
  3
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'my-to-do-list',
  'Google Calendar 🗓️',
  'Integrasi otomatis dengan Google Calendar memungkinkan Kamu melihat semua tugas yang telah Kamu rencanakan dan jadwalkan langsung di kalender favorit Kamu. Tidak perlu lagi berpindah-pindah aplikasi atau khawatir ada yang terlewat.',
  '/photos/produk/my-to-do-list/calendar1.png',
  4
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'perencanaan-acara',
  '🎉 Dashboard Acara',
  'Pusat kendali acara Kamu untuk memantau semua metrik penting dalam sekejap.<br><strong class=''font-bold text-gray-800''>📊 Ringkasan Anggaran:</strong> Lihat gambaran besar keuangan acara Kamu.<br><strong class=''font-bold text-gray-800''>💰 Sisa Anggaran:</strong> Ketahui sisa dana Kamu secara real-time.<br><strong class=''font-bold text-gray-800''>⏳ Hitung Mundur:</strong> Fitur hitung mundur interaktif menuju hari-H.<br><strong class=''font-bold text-gray-800''>👍 Progres Cerdas:</strong> Dapatkan analisis singkat apakah progres anggaran Kamu di jalur yang benar.',
  '/photos/produk/anggaran-acara/dashboard.jpeg',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'perencanaan-acara',
  '💰 Anggaran Detail',
  'Rinci semua pengeluaran dengan cermat di dalam sheet ini.<br><strong class=''font-bold text-gray-800''>📝 Daftar Rinci:</strong> Catat semua jenis pengeluaran, mulai dari sewa gedung hingga souvenir.<br><strong class=''font-bold text-gray-800''>⚖️ Estimasi vs Aktual:</strong> Bandingkan biaya perkiraan dengan biaya sesungguhnya.<br><strong class=''font-bold text-gray-800''>🚦 Status Pembayaran:</strong> Lacak status setiap tagihan dengan mudah (lunas, DP, belum bayar).<br><strong class=''font-bold text-gray-800''>🗓️ Jatuh Tempo:</strong> Pengingat tanggal jatuh tempo untuk setiap pembayaran.',
  '/photos/produk/anggaran-acara/anggaran.jpeg',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'perencanaan-acara',
  '🤝 Vendor & Kontak',
  'Kelola semua kontak penting Kamu di satu tempat yang rapi dan terorganisir.<br><strong class=''font-bold text-gray-800''>📇 Direktori Vendor:</strong> Simpan informasi lengkap setiap vendor.<br><strong class=''font-bold text-gray-800''>📞 Kontak Darurat:</strong> Dapatkan akses cepat ke nomor telepon dan email.<br><strong class=''font-bold text-gray-800''>💳 Info Pembayaran:</strong> Catat detail rekening bank untuk mempermudah transaksi.<br><strong class=''font-bold text-gray-800''>✍️ Catatan Penting:</strong> Tambahkan catatan khusus untuk setiap vendor.',
  '/photos/produk/anggaran-acara/daftar.jpeg',
  2
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'perencanaan-acara',
  '⚙️ Pengaturan & Kategori',
  'Di sinilah semua keajaiban perencanaan Kamu dimulai dan fondasi acara Kamu diletakkan.<br><strong class=''font-bold text-gray-800''>🏷️ Kategori Anggaran:</strong> Sesuaikan kategori pengeluaran utama (Venue, Katering, dll).<br><strong class=''font-bold text-gray-800''>🗓️ Info Acara:</strong> Tetapkan detail penting seperti nama dan tanggal acara.<br><strong class=''font-bold text-gray-800''>🎯 Target Anggaran:</strong> Masukkan target anggaran awal Kamu sebagai patokan.',
  '/photos/produk/anggaran-acara/kategori.jpeg',
  3
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'personal-budgeting',
  '📈 Laporan (Dashboard Utama)',
  'Pusat komando keuangan pribadi Kamu. Cukup pilih bulan dan tahun, maka seluruh laporan akan ter-update secara otomatis.<br><strong class=''font-bold text-gray-800''>✨ Dashboard Interaktif:</strong> Semua laporan ter-update berdasarkan pilihan Kamu.<br><strong class=''font-bold text-gray-800''>💡 Analisis Cerdas:</strong> Dapatkan feedback instan mengenai level kesehatan finansial Kamu.<br><strong class=''font-bold text-gray-800''>🚦 Progress Bar Anggaran:</strong> Lihat kategori mana yang boros dengan indikator warna.',
  '/photos/produk/personal-budgeting/Dashboard.png',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'personal-budgeting',
  '💰 Budgeting',
  'Pusat komando keuangan pribadi Kamu, tempat semua data transaksi diolah. Atur anggaran yang berbeda untuk setiap bulan dalam setahun.<br><strong class=''font-bold text-gray-800''>🗓️ Rencana 12 Bulan:</strong> Atur anggaran yang berbeda untuk setiap bulan.<br><strong class=''font-bold text-gray-800''>🔀 Budget Fleksibel:</strong> Sangat cocok untuk kebutuhan yang berubah-ubah.<br><strong class=''font-bold text-gray-800''>🔗 Terhubung ke Dashboard:</strong> Anggaran Kamu menjadi tolok ukur otomatis di laporan.',
  '/photos/produk/personal-budgeting/Budgeting.png',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'personal-budgeting',
  '📝 Catatan Transaksi',
  'Jantung dari seluruh sistem. Luangkan 30 detik untuk mencatat setiap pemasukan, pengeluaran, dan transfer di sini.<br><strong class=''font-bold text-gray-800''>⚡ Pencatatan Cepat:</strong> Dilengkapi dropdown untuk mempercepat pengisian.<br><strong class=''font-bold text-gray-800''>↔️ Lacak Transfer:</strong> Catat perpindahan uang antar bank dengan mudah.<br><strong class=''font-bold text-gray-800''>✍️ Input Mudah:</strong> Desain yang simpel dan fokus pada fungsi utama.',
  '/photos/produk/personal-budgeting/Transaksi.png',
  2
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'personal-budgeting',
  '📊 Progress Hutang',
  'Pusat kendali Kamu untuk menaklukkan semua kewajiban finansial. Lacak setiap pembayaran cicilan untuk KPR, kendaraan, hingga PayLater.<br><strong class=''font-bold text-gray-800''>🔗 Satu Tempat untuk Semua:</strong> Pantau semua jenis hutang secara terpusat.<br><strong class=''font-bold text-gray-800''>📈 Progress Bar Pelunasan:</strong> Lihat progres visual yang memuaskan setiap kali membayar.<br><strong class=''font-bold text-gray-800''>🎯 Target Jelas:</strong> Tahu persis sisa saldo utang Kamu secara real-time.',
  '/photos/produk/personal-budgeting/Progress-Hutang.png',
  3
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'personal-budgeting',
  '🎯 Tujuan Tabungan',
  'Ubah semua impian finansial Kamu menjadi sebuah rencana yang terukur dan nyata. Mulai dari dana darurat hingga DP rumah, semuanya terpantau.<br><strong class=''font-bold text-gray-800''>🏆 Tulis Impianmu:</strong> Catat semua tujuan beserta target dana.<br><strong class=''font-bold text-gray-800''>📊 Progress Bar Visual:</strong> Saksikan ''celengan'' digitalmu terisi mendekati 100%.<br><strong class=''font-bold text-gray-800''>💰 Alokasi Dana Cerdas:</strong> Pastikan setiap rupiah tabungan punya misi yang jelas.',
  '/photos/produk/personal-budgeting/Tujuan-Tabungan.png',
  4
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'personal-budgeting',
  '⚙️ Pusat Kontrol',
  '''Ruang mesin'' dari template Kamu yang cukup diatur sekali saja di awal. Daftarkan kategori, akun bank, dan hutang untuk mengotomatiskan seluruh template.<br><strong class=''font-bold text-gray-800''>🔧 Pengaturan Mudah:</strong> Cukup atur sekali, lalu pakai selamanya.<br><strong class=''font-bold text-gray-800''>🏦 Daftarkan Semuanya:</strong> Masukkan daftar kategori, akun bank, dan profil hutang Kamu.<br><strong class=''font-bold text-gray-800''>🤖 Otomatisasi Penuh:</strong> Semua yang Kamu atur menjadi pilihan dropdown di seluruh template.',
  '/photos/produk/personal-budgeting/Pusat-Kontrol.png',
  5
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'tracking-lamaran',
  '📨 TRACKING LAMARAN',
  'Pantau setiap langkah dari proses lamaran kerja Kamu di sini.<br><strong>Dasbor Progres</strong> 📊: Lihat ringkasan jumlah loker yang dilamar, panggilan interview, dan tes.<br><strong>Status Lamaran</strong> 📤: Lacak status setiap lamaran, dari proses hingga ditolak.<br><strong>Catatan Penting</strong> 📝: Tambahkan catatan pribadi untuk setiap lamaran.',
  '/photos/produk/tracking-lamaran/dashboard.jpeg',
  0
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'tracking-lamaran',
  '📑 DATABASE LOWONGAN',
  'Sheet ini adalah pusat data untuk semua lowongan pekerjaan yang Kamu temukan.<br><strong>Pusat Informasi</strong> 🗃️: Semua detail penting tentang lowongan tersimpan di sini.<br><strong>Filter Cepat</strong> ✅/❌: TKamui apakah sebuah lowongan ''Cocok'' atau ''Tidak Cocok'' untuk Kamu.<br><strong>Tautan Langsung</strong> 🔗: Simpan tautan langsung ke halaman lowongan pekerjaan.',
  '/photos/produk/tracking-lamaran/data-base.jpeg',
  1
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'tracking-lamaran',
  '🔎 SEARCH BOX',
  'Gunakan sheet ini untuk mencari dan memfilter lowongan kerja yang ada di database dengan cepat.<br><strong>Pencarian Cerdas</strong> 🕵️: Cari lowongan berdasarkan jabatan, perusahaan, lokasi, atau tipe pekerjaan.<br><strong>Filter per Bulan & Tahun</strong> 🗓️: Saring lowongan berdasarkan periode.<br><strong>Hasil Terperinci</strong> ✨: Hasil pencarian akan menampilkan semua informasi penting.',
  '/photos/produk/tracking-lamaran/loker.jpeg',
  2
);

INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (
  'tracking-lamaran',
  '🗓️ SCHEDULE',
  'Atur semua jadwal interview dan tes Kamu di sini agar tidak ada yang terlewat.<br><strong>Kalender Pribadi</strong> 📅: Lihat semua jadwal Kamu dalam format kalender mingguan.<br><strong>Rincian Jadwal</strong> ⏰: Catat tanggal dan waktu spesifik untuk setiap agenda.<br><strong>Pengingat Semangat</strong> 🌟: Dapatkan kutipan penyemangat setiap hari.',
  '/photos/produk/tracking-lamaran/kalender.jpeg',
  3
);


-- Insert product SEO
INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (
  'content-calendar',
  '    Template Content Calendar Otomatis (Google Sheets) | RSQUARE',
  'Capek bikin konten dadakan? Atur jadwal postingan Instagram, TikTok & Blog Kamu dengan Template Content Calendar Google Sheets. Rencanakan & lacak semua ide jadi mudah!'
);

INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (
  'goal-planner',
  'Template Goal Planner - RSQUARE',
  'Dapatkan Template Goal Planner dari RSQUARE. Rencanakan, lacak, dan capai semua tujuan hidup Kamu dengan metode terstruktur untuk hasil yang maksimal.'
);

INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (
  'my-to-do-list',
  'Otomatiskan Jadwal & Tingkatkan Produktivitas | Template To-Do List Gratis',
  'Ubah Google Sheets menjadi asisten produktivitas. Template To-Do List ini otomatis terhubung ke Google Calendar dengan Apps Script. Gratis dari RSQUARE!'
);

INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (
  'perencanaan-acara',
  'Template Perencanaan Anggaran Acara - RSQUARE',
  'Dapatkan Template Perencanaan Anggaran Acara dari RSQUARE. Kelola budget untuk setiap event dengan mudah, mulai dari pernikahan hingga rapat perusahaan, secara profesional.'
);

INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (
  'tracking-lamaran',
  'Template Tracking Lamaran Kerja - RSQUARE',
  'Dapatkan Template Tracking Lamaran Kerja dari RSQUARE. Organisir semua proses pencarian kerja Kamu, mulai dari lamaran terkirim hingga jadwal wawancara, di satu tempat.'
);

INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (
  'personal-budgeting',
  'Template Personal Budgeting - RSQUARE',
  'Dapatkan Template Personal Budgeting dari RSQUARE. Kelola keuangan pribadi Kamu dengan dasbor interaktif yang dirancang secara profesional untuk melacak pemasukan & pengeluaran'
);


-- Re-enable triggers and foreign keys
SET session_replication_role = 'origin';

-- Migration complete!
