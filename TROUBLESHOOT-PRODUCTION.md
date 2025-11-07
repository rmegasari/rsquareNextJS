# Troubleshooting: Produk Tidak Muncul di Production (Vercel)

## Masalah
Setelah deploy ke Vercel, halaman `/templates` tidak menampilkan produk sama sekali, padahal di development (localhost) berfungsi normal.

---

## Kemungkinan Penyebab

### 1. Kolom `order_number` Tidak Ada di Database Production

**Gejala**: Halaman templates kosong, tidak ada error yang terlihat

**Solusi**: Jalankan migration SQL di Supabase Dashboard production

```sql
-- Run this in Supabase SQL Editor (Production project)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS order_number INTEGER;

-- Set default order based on existing data
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM products
)
UPDATE products
SET order_number = numbered.rn
FROM numbered
WHERE products.id = numbered.id AND products.order_number IS NULL;

-- Make it NOT NULL with default
ALTER TABLE products
ALTER COLUMN order_number SET DEFAULT 0,
ALTER COLUMN order_number SET NOT NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_products_order ON products(order_number);
```

**Verifikasi**:
```sql
-- Check if column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'products' AND column_name = 'order_number';

-- Check data
SELECT id, judul, order_number FROM products LIMIT 5;
```

---

### 2. Kolom `active` Tidak Ada atau Nilai NULL

**Gejala**: Beberapa atau semua produk tidak muncul

**Solusi**: Jalankan migration untuk kolom `active`

```sql
-- Run this in Supabase SQL Editor (Production project)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;

-- Update all existing products to active
UPDATE products SET active = TRUE WHERE active IS NULL;

-- Make it NOT NULL
ALTER TABLE products
ALTER COLUMN active SET DEFAULT TRUE,
ALTER COLUMN active SET NOT NULL;
```

**Verifikasi**:
```sql
-- Check active status of all products
SELECT id, judul, active FROM products;

-- Count active vs inactive
SELECT
  active,
  COUNT(*) as count
FROM products
GROUP BY active;
```

---

### 3. Environment Variables Berbeda

**Gejala**: Production menggunakan Supabase project yang berbeda dengan development

**Solusi**: Verifikasi environment variables di Vercel

1. Buka **Vercel Dashboard** → Project → **Settings** → **Environment Variables**
2. Pastikan ada:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (optional)
   ```
3. **PENTING**: Pastikan URL dan key mengarah ke Supabase project yang SAMA dengan yang Anda gunakan di development
4. Setelah update, **Redeploy** di Vercel

**Cek Supabase Project**:
- Development: Check `.env.local` file di local
- Production: Check Vercel environment variables
- Pastikan keduanya mengarah ke project yang sama (atau pastikan kedua project punya data yang sama)

---

### 4. Database Production Kosong atau Struktur Berbeda

**Gejala**: Production database tidak punya data atau struktur tabel berbeda

**Solusi**: Verifikasi data di Supabase Dashboard

1. Buka **Supabase Dashboard** (project yang digunakan production)
2. Pergi ke **Table Editor** → **products**
3. Pastikan:
   - Tabel `products` ada dan punya data
   - Kolom yang diperlukan ada: `id`, `judul`, `deskripsi_singkat`, `harga`, `gambar_thumbnail`, `active`, `order_number`, `featured`, `created_at`
   - Ada data produk dengan `active = true` atau `active IS NULL`

**Query untuk cek struktur**:
```sql
-- List all columns in products table
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;
```

**Query untuk cek data**:
```sql
-- Count total products
SELECT COUNT(*) as total_products FROM products;

-- Check sample data
SELECT id, judul, active, order_number, created_at
FROM products
LIMIT 5;
```

---

### 5. Build Error di Vercel

**Gejala**: Build failed atau ada warning/error di Vercel build logs

**Solusi**: Check Vercel deployment logs

1. Buka **Vercel Dashboard** → Project → **Deployments**
2. Klik deployment terbaru
3. Lihat **Building** tab untuk error
4. Lihat **Functions** tab untuk runtime error

**Common errors**:
- `Error: Cannot find module` - Missing dependency
- `TypeError: Cannot read property` - Data structure mismatch
- `Database connection error` - Environment variables salah

---

## Debugging Steps

### Step 1: Enable Logging di Production

Code sudah diupdate dengan logging. Setelah deploy, check Vercel function logs:

1. Buka **Vercel Dashboard** → Project → **Runtime Logs**
2. Buka halaman `/templates` di browser
3. Lihat logs untuk pesan:
   - `✅ Found X products from Supabase` - Query berhasil
   - `⚠️ No products found in Supabase` - Database kosong atau filter terlalu ketat
   - `❌ Supabase query error:` - Ada error query
   - `⚠️ order_number column not found, falling back to created_at` - Kolom order_number tidak ada

### Step 2: Test Supabase Connection

Buat file test sederhana untuk cek koneksi:

```javascript
// app/api/test-supabase/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Test connection
    const { data, error } = await supabase
      .from("products")
      .select("id, judul, active, order_number")
      .limit(5);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      productCount: data.length,
      products: data,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }, { status: 500 });
  }
}
```

Deploy dan buka `/api/test-supabase` di browser untuk lihat response.

### Step 3: Check Browser Console

1. Buka halaman `/templates` di production
2. Buka **Browser DevTools** (F12)
3. Check **Console** tab untuk error
4. Check **Network** tab untuk failed requests

---

## Quick Fix Checklist

- [ ] Run migration `supabase-add-order-column.sql` di Supabase Dashboard (production)
- [ ] Run migration `supabase-add-active-column.sql` di Supabase Dashboard (production)
- [ ] Verify environment variables di Vercel match dengan Supabase project yang benar
- [ ] Check Vercel deployment logs untuk error
- [ ] Redeploy setelah fix environment variables atau database schema
- [ ] Test `/api/test-supabase` endpoint untuk verify connection

---

## Catatan Penting

1. **Jangan Edit Database Schema Langsung di Production Tanpa Backup**
   - Selalu backup data dulu sebelum ALTER TABLE
   - Test migration di development/staging dulu

2. **Environment Variables Changes Require Redeploy**
   - Setelah update env vars di Vercel, WAJIB redeploy
   - Env vars tidak otomatis apply ke deployment yang sudah ada

3. **Check Both Supabase Projects**
   - Jika pakai Supabase project berbeda untuk dev dan prod
   - Pastikan kedua project punya schema dan data yang sama

4. **Code Updates Sudah Include Fallback**
   - Jika `order_number` tidak ada, akan fallback ke `created_at`
   - Jika `active` null, produk tetap ditampilkan
   - Ada logging untuk debugging

---

## Need Help?

Jika masih bermasalah setelah mengikuti semua langkah di atas:

1. Share screenshot dari:
   - Vercel Runtime Logs
   - Supabase Table Editor (products table)
   - Browser console error (jika ada)

2. Share hasil query:
   ```sql
   SELECT COUNT(*) FROM products WHERE active IS NOT FALSE;
   ```

3. Test endpoint `/api/test-supabase` dan share hasilnya
