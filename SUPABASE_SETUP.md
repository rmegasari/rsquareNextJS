# Setup Supabase untuk RSQUARE

Panduan lengkap untuk setup Supabase sebagai database cloud.

## Mengapa Supabase?

✅ **Gratis untuk production** (500MB database, 2GB file storage)
✅ **Realtime updates** - perubahan langsung tersinkronisasi
✅ **Built-in auth** - ready untuk fitur login admin di masa depan
✅ **PostgreSQL** - database yang powerful dan scalable
✅ **Auto backups** - data aman dan ter-backup otomatis

## Langkah 1: Buat Project Supabase

1. Buka https://supabase.com/
2. **Sign up / Login** dengan GitHub
3. **Klik "New Project"**
   - **Organization**: Pilih atau buat organization baru
   - **Name**: `rsquare-db` (atau nama lain yang Anda inginkan)
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih **Southeast Asia (Singapore)** untuk performa terbaik
   - **Pricing Plan**: **Free** (cukup untuk production kecil-menengah)
4. **Klik "Create new project"** - tunggu ~2 menit

## Langkah 2: Setup Database Schema

1. Di dashboard Supabase, buka **SQL Editor** (sidebar kiri)
2. Klik **"New Query"**
3. Copy seluruh isi file `supabase-schema.sql` dan paste ke SQL Editor
4. Klik **"Run"** untuk membuat semua tabel

Tabel yang dibuat:
- `products` - Data produk utama
- `product_details` - Detail produk (deskripsi, gambar, links)
- `product_links` - Link pembelian (Tokopedia, Shopee, dll)
- `product_gallery` - Galeri gambar produk
- `product_seo` - Meta tags untuk SEO

## Langkah 3: Dapatkan API Keys

1. Di dashboard Supabase, buka **Settings** → **API**
2. Copy dua values berikut:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: Key panjang yang dimulai dengan `eyJ...`

## Langkah 4: Setup Environment Variables

### Development (Local)

1. Buat file `.env.local` di root project:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` dan isi dengan credentials Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Production (Vercel)

1. Buka dashboard Vercel: https://vercel.com/dashboard
2. Pilih project **rsquareidea**
3. Buka **Settings** → **Environment Variables**
4. Tambahkan 2 environment variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Production, Preview, Development |

5. Klik **Save**

## Langkah 5: Migrasi Data dari SQLite ke Supabase

Jalankan script migrasi untuk copy semua data dari SQLite lokal ke Supabase:

```bash
node scripts/migrate-sqlite-to-supabase.js
```

Output yang diharapkan:
```
🚀 Starting migration from SQLite to Supabase...

📦 Found 7 products in SQLite

   Migrating: Invoice Maker (invoice-maker)
   ✅ Invoice Maker migrated successfully
   Migrating: Personal Budgeting (personal-budgeting)
   ✅ Personal Budgeting migrated successfully
   ...

✅ Migration completed successfully!
```

## Langkah 6: Test di Local

1. Restart development server:
```bash
npm run dev
```

2. Buka http://localhost:3001
3. Cek apakah **featured products** muncul di homepage
4. Buka http://localhost:3001/admin/templates
5. Coba toggle featured status salah satu produk
6. Refresh halaman → featured status harus tetap tersimpan!

## Langkah 7: Deploy ke Vercel

Jika environment variables sudah ditambahkan di Vercel:

```bash
git add .
git commit -m "Add Supabase integration for persistent featured products"
git push
```

Vercel akan auto-deploy dengan Supabase integration.

## Verifikasi

### ✅ Cek Featured Products Tersimpan Permanen:

1. Buka admin di production: `https://rsquareidea.vercel.app/admin/templates`
2. Toggle featured status salah satu produk
3. Buka di browser lain / device lain
4. Featured status harus sama!

### ✅ Cek Homepage:

1. Buka `https://rsquareidea.vercel.app`
2. Featured products harus muncul di section pertama
3. Harus sama dengan yang diset di admin

## Troubleshooting

### Error: "Missing Supabase credentials"

**Solusi**: Pastikan `.env.local` sudah ada dan terisi dengan benar:
```bash
cat .env.local
```

Jika belum ada, copy dari example:
```bash
cp .env.local.example .env.local
```

### Error: "relation does not exist"

**Solusi**: Schema belum dibuat. Jalankan SQL di `supabase-schema.sql` di Supabase SQL Editor.

### Featured products tidak muncul setelah migrasi

**Solusi**:
1. Buka Supabase Dashboard → Table Editor
2. Buka tabel `products`
3. Cek kolom `featured` - pastikan ada produk dengan value `true`
4. Jika tidak ada, set manual beberapa produk:
```sql
UPDATE products SET featured = true WHERE id IN ('invoice-maker', 'personal-budgeting', 'perencanaan-acara');
```

### RLS Policy Error saat insert/update

**Solusi**: Untuk development, Anda bisa temporary disable RLS:
```sql
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_details DISABLE ROW LEVEL SECURITY;
-- (ulangi untuk tabel lain)
```

Atau buat policy yang lebih permissive untuk authenticated users.

## Next Steps (Opsional)

### 1. Setup Authentication untuk Admin

Supabase sudah include auth system. Anda bisa implementasikan:
- Login page untuk admin
- Protected routes untuk `/admin/*`
- User management

### 2. Realtime Updates

Enable realtime untuk featured products:
```javascript
const channel = supabase
  .channel('products-changes')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'products',
  }, (payload) => {
    // Update UI when featured changes
  })
  .subscribe()
```

### 3. Image Storage

Gunakan Supabase Storage untuk upload gambar instead of `/public/uploads`:
```javascript
const { data, error } = await supabase.storage
  .from('product-images')
  .upload('image.jpg', file)
```

## Referensi

- **Supabase Docs**: https://supabase.com/docs
- **Next.js + Supabase**: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security
