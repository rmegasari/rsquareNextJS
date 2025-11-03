# 📚 Panduan Admin Panel RSQUARE

## 🎯 Fitur Utama

### ✅ Yang Sudah Tersedia

1. **Authentication System**
   - Login dengan username & password
   - Session management dengan cookie
   - Auto-redirect ke login jika belum login

2. **Dashboard Admin**
   - Statistik real-time template
   - Quick actions menu
   - Tips & panduan

3. **Manajemen Template**
   - List semua template dengan filter & search
   - Tambah template baru
   - Edit template existing
   - Preview template
   - (Delete akan segera tersedia)

4. **Image Zoom Feature**
   - Klik gambar di halaman detail untuk zoom
   - Klik gambar di halaman preview untuk zoom
   - Tampilan fullscreen dengan close button

---

## 🚀 Cara Menggunakan Admin Panel

### 1. Login ke Admin Area

**URL**: `/login`

**Kredensial Default**:
- Username: `rsquareidea`
- Password: `Ultimate704554`

> ⚠️ **PENTING**: Ganti password di file [app/(site)/login/page.jsx](app/(site)/login/page.jsx:6-7)

### 2. Akses Dashboard

Setelah login, Anda akan diarahkan ke `/admin` yang menampilkan:
- Total template
- Jumlah template gratis & premium
- Template unggulan
- Quick actions

### 3. Mengelola Template

#### 📋 Melihat Daftar Template

**URL**: `/admin/templates`

Fitur:
- Search berdasarkan nama template
- Filter: Semua / Gratis / Premium / Featured
- Preview template
- Edit template
- Hapus template (coming soon)

#### ➕ Menambah Template Baru

**URL**: `/admin/templates/new`

**Langkah-langkah**:

1. **Isi Informasi Dasar**:
   - ID Template (lowercase, gunakan dash `-`)
   - Judul Template
   - Deskripsi Singkat
   - Harga (isi 0 untuk gratis)
   - Centang "Featured" jika ingin tampil di homepage

2. **Upload Gambar**:
   - Upload gambar ke folder: `public/photos/produk/[nama-template]/`
   - Isi path gambar thumbnail & gambar utama
   - Format path: `photos/produk/[nama-template]/gambar.png`

3. **Isi Detail Template**:
   - Deskripsi lengkap (bisa pakai Markdown)
   - Link preview detail
   - Link payment gateway
   - File panduan PDF (optional)

4. **Tambah Link Pembelian**:
   - Platform (contoh: Shopee, Tokopedia, dll)
   - URL link pembelian
   - Bisa tambahkan multiple links

5. **Tambah Galeri**:
   - Judul item galeri
   - Deskripsi (optional, bisa pakai Markdown)
   - Path gambar galeri

6. **SEO (Optional)**:
   - Meta Title
   - Meta Description

7. **Simpan**:
   - Klik "💾 Simpan Template"
   - Template akan otomatis tersimpan ke database SQLite
   - Anda akan diarahkan ke halaman daftar template
   - Template baru langsung terlihat tanpa perlu refresh manual

#### ✏️ Mengedit Template

**URL**: `/admin/templates/edit/[id]`

**Langkah-langkah**:

1. Klik tombol "Edit" di daftar template
2. Ubah informasi yang diperlukan
3. Klik "💾 Update Template"
4. Template akan otomatis terupdate di database
5. Perubahan langsung terlihat di website

---

## 🖼️ Cara Upload Gambar

### Struktur Folder

```
public/
└── photos/
    └── produk/
        └── [nama-template]/
            ├── thumbnail.png        # Gambar thumbnail
            ├── main.png             # Gambar utama
            ├── feature-1.png        # Gambar galeri
            ├── feature-2.png        # Gambar galeri
            └── ...
```

### Best Practices

1. **Ukuran Gambar**:
   - Thumbnail: 800x600px (atau rasio 4:3)
   - Gambar utama: 1200x900px (atau rasio 4:3)
   - Galeri: 1200x900px

2. **Format**:
   - Gunakan PNG atau JPG
   - Compress gambar untuk performa lebih baik

3. **Naming Convention**:
   - Lowercase
   - Gunakan dash (`-`) bukan spasi
   - Contoh: `dashboard-goal-planner.png`

---

## 🔍 Fitur Zoom Gambar

### Cara Menggunakan

1. **Di Halaman Detail** (`/[slug]`):
   - Klik gambar utama
   - Klik gambar di galeri
   - Gambar akan tampil fullscreen

2. **Di Halaman Preview** (`/preview/[slug]`):
   - Klik gambar di galeri
   - Gambar akan tampil fullscreen

3. **Menutup Zoom**:
   - Klik tombol X di kanan atas
   - Atau klik di area manapun di luar gambar

---

## 📝 Format Markdown untuk Deskripsi

Anda bisa menggunakan Markdown di:
- Deskripsi Lengkap Template
- Deskripsi Item Galeri

**Contoh**:

```markdown
## Fitur Utama

- **Dashboard Interaktif**: Lihat progress goals Anda sekilas pandang
- **Tracking Harian**: Catat aktivitas harian dengan mudah
- **Analisis Otomatis**: Sistem akan menganalisis progress Anda

### Yang Anda Dapatkan:

1. Template siap pakai
2. Panduan lengkap PDF
3. Tutorial video
4. Support via WhatsApp
```

---

## 🔒 Keamanan

### Authentication

- Login menggunakan session cookie
- Session berlaku selama 24 jam
- Auto-logout setelah menutup browser (jika tidak centang "Remember Me")

### Middleware Protection

File [middleware.js](middleware.js) melindungi semua route `/admin/*` kecuali `/login`

### Cara Ganti Password

**Lokasi File**: `app/(site)/login/page.jsx`

**Langkah-langkah**:

1. Buka file [app/(site)/login/page.jsx](app/(site)/login/page.jsx) dengan text editor
2. Cari baris 6-7 yang berisi:
   ```javascript
   const ADMIN_USERNAME = "rsquareidea";
   const ADMIN_PASSWORD = "Ultimate704554";
   ```
3. Ganti dengan username dan password baru Anda:
   ```javascript
   const ADMIN_USERNAME = "username-baru-anda";
   const ADMIN_PASSWORD = "password-baru-anda";
   ```
4. Simpan file
5. Restart development server (tekan Ctrl+C di terminal, lalu jalankan `npm run dev` lagi)
6. Login dengan kredensial baru di `/login`

> ⚠️ **SECURITY WARNING**: Untuk production, gunakan environment variables dan hash password!

**Contoh untuk Production (Recommended)**:

1. Buat file `.env.local` di root project:
   ```env
   NEXT_PUBLIC_ADMIN_USERNAME=username_anda
   NEXT_PUBLIC_ADMIN_PASSWORD=password_anda
   ```

2. Update file `app/(site)/login/page.jsx`:
   ```javascript
   const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "rsquareidea";
   const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Ultimate704554";
   ```

3. Tambahkan `.env.local` ke `.gitignore` agar tidak ter-commit ke repository

---

## 💾 Sistem Database

### Tentang Database

Sejak versi terbaru, RSQUARE menggunakan **SQLite database** untuk menyimpan data template. Ini berarti:

✅ **Tidak perlu download/upload JSON lagi**
✅ **Save langsung dari admin panel**
✅ **Edit & delete langsung dari web**
✅ **Data tersimpan di file `data/products.db`**

### Lokasi Database

```
/home/tuneeca/web_app/RSQUARE-main/data/products.db
```

### Migrasi Data JSON ke Database

Jika Anda memiliki file JSON di `content/produk/` yang belum di-migrate, jalankan:

```bash
node scripts/migrate-to-db.js
```

Script ini akan:
- Membaca semua file JSON di `content/produk/`
- Menyimpan data ke database
- Menampilkan laporan sukses/gagal

### Backup Database

**PENTING**: Backup file `data/products.db` secara berkala!

```bash
# Copy database untuk backup
cp data/products.db data/products_backup_$(date +%Y%m%d).db
```

### Restore dari JSON (Jika diperlukan)

Jika ingin kembali menggunakan JSON files, ubah setting di `lib/products.js`:

```javascript
const USE_DATABASE = false; // Ubah menjadi false
```

---

## 🛠️ Troubleshooting

### Template Baru Tidak Muncul

1. Cek apakah save berhasil (lihat alert sukses)
2. Refresh browser (CTRL + F5)
3. Cek database: `ls -lh data/products.db`
4. Cek console browser untuk error

### Gambar Tidak Muncul

1. Cek path gambar sudah benar
2. Pastikan gambar ada di folder `public/photos/produk/`
3. Nama file gambar case-sensitive

### Error saat Build

```bash
npm run build
```

Jika ada error, periksa:
- Sintaks JSON di file produk
- Path gambar yang valid
- Import component yang benar

---

## 📊 Teknologi yang Digunakan

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Cookie-based session
- **State Management**: React Hooks (useState, useEffect)
- **API**: Next.js API Routes
- **Image Optimization**: next/image
- **Styling**: Tailwind CSS + Custom CSS

---

## 🎨 Kustomisasi

### Warna Theme

Edit file [app/globals.css](app/globals.css) untuk mengubah warna:

```css
.btn-primary {
  background: linear-gradient(to right, #F97316, #EA580C);
}
```

### Layout Admin

Edit file [app/admin/layout.jsx](app/admin/layout.jsx) untuk mengubah sidebar.

---

## 📞 Support

Jika menemukan bug atau butuh bantuan:

1. Check dokumentasi ini terlebih dahulu
2. Periksa console browser untuk error messages
3. Hubungi developer

---

## 🚀 Deployment

### Build Production

```bash
npm run build
npm start
```

### Environment Variables (Recommended)

Buat file `.env.local`:

```env
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
```

Kemudian update [app/(site)/login/page.jsx](app/(site)/login/page.jsx):

```javascript
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
```

---

## ✨ Roadmap

Fitur yang akan datang:
- [ ] Upload gambar langsung dari admin panel
- [ ] Rich text editor untuk deskripsi
- [ ] Drag & drop reorder galeri
- [ ] Bulk operations (delete multiple templates)
- [ ] Template duplication
- [ ] Export/Import template data
- [ ] Analytics & statistics
- [ ] User management (multiple admin accounts)

---

**Happy Managing! 🎉**
