# Panduan Supabase Storage untuk Gambar Produk

Panduan lengkap untuk setup dan migrasi gambar produk ke Supabase Storage.

## Kenapa Supabase Storage?

### ❌ Masalah Menyimpan Gambar di Git:
- Git repository membesar seiring waktu
- Slow cloning dan deployment
- Tidak efisien untuk file binary
- Sulit menghapus gambar lama

### ✅ Keuntungan Supabase Storage:
- **CDN Global** - Loading cepat dari mana saja
- **Unlimited uploads** - Tidak membebani Git
- **Auto optimization** - Supabase bisa resize/compress otomatis
- **Easy management** - Hapus/update gambar tanpa commit Git
- **Free 1GB** storage di plan gratis

---

## Step 1: Setup Storage Bucket di Supabase

### Jalankan SQL di Supabase SQL Editor:

1. Buka **Supabase Dashboard**: https://supabase.com/dashboard
2. Pilih project Anda: **qpeurykzbspfuxfsjlra**
3. Klik **SQL Editor** di sidebar kiri
4. Klik **"New Query"**
5. Copy dan paste seluruh isi file `supabase-storage-setup.sql`
6. Klik **"Run"**

### Hasil yang diharapkan:

```
✅ Bucket 'product-images' created
✅ RLS policies applied
```

### Verifikasi:

Buka **Storage** di sidebar → Anda akan melihat bucket **product-images**

---

## Step 2: Test Upload Gambar

Setelah bucket dibuat, upload API sudah otomatis menggunakan Supabase Storage!

### Test di Local:

1. Buka admin: http://localhost:3001/admin/templates
2. Klik **"Ubah"** salah satu produk
3. Di bagian **"Gambar Thumbnail"**, klik **"Upload Gambar"**
4. Pilih gambar dari komputer Anda
5. Gambar akan diupload ke Supabase Storage
6. URL yang tersimpan akan berbentuk:
   ```
   https://qpeurykzbspfuxfsjlra.supabase.co/storage/v1/object/public/product-images/1234567890-abc123.jpg
   ```

### Cek di Supabase Dashboard:

1. Buka **Storage** → **product-images**
2. Anda akan melihat gambar yang baru diupload!

---

## Step 3: Migrate Gambar Existing (Opsional)

Jika Anda ingin memindahkan gambar lama dari `/public/photos/produk` ke Supabase Storage:

### Jalankan Migration Script:

```bash
node scripts/migrate-images-to-supabase.js
```

### Proses yang terjadi:

1. **Upload semua gambar** dari `/public/photos/produk` ke Supabase Storage
2. **Update database** dengan URL Supabase yang baru
3. **Gambar lama tetap ada** di `/public/photos/produk` (sebagai backup)

### Output yang diharapkan:

```
🚀 Starting image migration to Supabase Storage...

📦 Found 7 products

📤 Uploading images to Supabase Storage...

   Processing: Template Content Calendar
      Uploading thumbnail: content-calendar.jpg
      Uploading main image: content-calendar-main.jpg
      Uploading gallery: content-calendar-1.jpg
      Uploading gallery: content-calendar-2.jpg

   ... (semua produk)

✅ Upload complete!
   📤 Uploaded: 45 images
   ⏭️  Skipped: 0 images

📝 Updating database with new Supabase URLs...

✅ Migration completed successfully!

📝 Summary:
   - 45 images uploaded to Supabase Storage
   - Database updated with new Supabase URLs
   - Images now served from Supabase CDN

🗑️  Optional: You can now delete /public/photos/produk to save space in Git
   Run: rm -rf public/photos/produk
```

### Hapus Gambar Lama dari Git (Opsional):

Setelah migrasi sukses dan Anda verifikasi semua gambar muncul dengan baik:

```bash
# Hapus folder gambar lama
rm -rf public/photos/produk

# Commit perubahan
git add .
git commit -m "Remove old images from Git, now using Supabase Storage"
git push
```

---

## Step 4: Deploy ke Vercel

Karena kode sudah menggunakan Supabase credentials yang sama di `.env.local`, tidak perlu perubahan di Vercel!

Cukup push ke GitHub:

```bash
git add .
git commit -m "Add Supabase Storage integration for product images"
git push
```

Vercel akan auto-deploy dengan Supabase Storage integration.

---

## Cara Kerja Sistem

### Upload Baru (dari Admin):

```
Admin Upload Gambar
    ↓
/api/upload
    ↓
Supabase Storage (product-images bucket)
    ↓
Return: https://qpeurykzbspfuxfsjlra.supabase.co/storage/v1/object/public/product-images/filename.jpg
    ↓
Tersimpan di database
    ↓
Ditampilkan di website (via CDN)
```

### Gambar Lama (setelah migrasi):

```
/public/photos/produk/image.jpg
    ↓
Uploaded to Supabase Storage
    ↓
Database updated dengan URL baru
    ↓
Website menggunakan URL Supabase
```

---

## File Structure

```
/home/tuneeca/web_app/RSQUARE-NextJS/
├── app/api/upload/route.js          # Upload API (sudah Supabase Storage)
├── scripts/
│   └── migrate-images-to-supabase.js # Migration script
├── supabase-storage-setup.sql        # Bucket + RLS setup
└── public/
    ├── photos/produk/                # Gambar lama (bisa dihapus setelah migrasi)
    └── uploads/                      # Tidak digunakan lagi
```

---

## Troubleshooting

### Error: "Bucket not found"

**Solusi**: Pastikan Anda sudah run `supabase-storage-setup.sql` di Supabase SQL Editor

### Error: "Row Level Security policy violation"

**Solusi**: RLS policies belum diterapkan. Run ulang `supabase-storage-setup.sql`

### Gambar tidak muncul setelah upload

**Solusi**:
1. Buka Supabase Dashboard → Storage → product-images
2. Pastikan gambar ada di bucket
3. Pastikan bucket **Public** (public = true)
4. Test URL langsung di browser

### Migration script error

**Solusi**:
1. Pastikan `.env.local` sudah ada dan terisi
2. Pastikan Supabase bucket sudah dibuat
3. Pastikan folder `/public/photos/produk` ada

---

## Best Practices

### 1. Naming Convention

Gambar otomatis diberi nama: `{timestamp}-{random}.{ext}`

Contoh: `1762218886000-abc123.jpg`

### 2. File Size Limit

- **Max size**: 5MB
- **Allowed formats**: JPEG, JPG, PNG, WebP, GIF

### 3. Cache Control

Gambar di-cache selama **1 jam** (3600 detik) untuk performa optimal

### 4. Delete Old Images

Jika edit produk dan upload gambar baru, gambar lama tidak auto-delete. Anda bisa:

**Manual delete via Supabase Dashboard**:
- Storage → product-images → Select file → Delete

**Atau buat cleanup script** (future enhancement)

---

## URLs Reference

### Local Development:
- **Website**: http://localhost:3001
- **Admin**: http://localhost:3001/admin/templates

### Supabase:
- **Dashboard**: https://supabase.com/dashboard
- **Storage**: https://supabase.com/dashboard/project/qpeurykzbspfuxfsjlra/storage/buckets
- **Image CDN**: https://qpeurykzbspfuxfsjlra.supabase.co/storage/v1/object/public/product-images/

---

## Next Steps (Opsional)

### 1. Auto-delete old images saat update

Implementasi logic untuk delete gambar lama dari Supabase saat upload gambar baru:

```javascript
// Di ImageUpload.jsx, sebelum upload baru
if (oldImageUrl.includes('supabase.co')) {
  const filename = oldImageUrl.split('/').pop();
  await fetch(`/api/upload?filename=${filename}`, { method: 'DELETE' });
}
```

### 2. Image Optimization

Gunakan Supabase Image Transformation API untuk resize otomatis:

```
https://qpeurykzbspfuxfsjlra.supabase.co/storage/v1/render/image/public/product-images/image.jpg?width=400&height=300
```

### 3. Backup Strategy

Setup automated backup dari Supabase Storage ke external service (Google Drive, S3, dll)

---

## Support

- **Supabase Docs**: https://supabase.com/docs/guides/storage
- **Storage API**: https://supabase.com/docs/reference/javascript/storage-from-upload
- **RLS Policies**: https://supabase.com/docs/guides/storage/security/access-control
