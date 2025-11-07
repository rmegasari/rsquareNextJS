# Fix: Products Tidak Muncul di Vercel (Production)

## Masalah Teridentifikasi

✅ **Localhost**: Berfungsi normal, semua products muncul
❌ **Vercel (Production)**: Tidak ada products yang muncul
✅ **Database Localhost**: Kolom `order_number` dan `active` ada

**Kesimpulan**: Vercel menggunakan Supabase project yang **BERBEDA** dengan localhost, atau environment variables tidak sama.

---

## Solusi: Sinkronisasi Environment Variables

### Langkah 1: Cek Environment Variables di Localhost

Buka file `.env.local` di project Anda dan cek:

```bash
cat .env.local
```

Catat:
- `NEXT_PUBLIC_SUPABASE_URL` → Contoh: `https://abcdefgh.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → String panjang yang dimulai dengan `eyJ...`
- `SUPABASE_SERVICE_ROLE_KEY` (jika ada) → String panjang yang dimulai dengan `eyJ...`

### Langkah 2: Verifikasi Environment Variables di Vercel

1. Buka **Vercel Dashboard**: https://vercel.com
2. Pilih project **rsquareidea** (atau nama project Anda)
3. Klik **Settings** (tab di atas)
4. Klik **Environment Variables** (menu kiri)
5. Periksa apakah ada:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional tapi recommended)

### Langkah 3: Bandingkan Nilai

**PENTING**: Pastikan nilai `NEXT_PUBLIC_SUPABASE_URL` di Vercel **SAMA PERSIS** dengan yang di `.env.local`

❌ **Jika Berbeda** (contoh):
- Localhost: `https://abcdefgh.supabase.co`
- Vercel: `https://xyz12345.supabase.co`

Ini berarti Vercel menggunakan **Supabase project yang berbeda**! Ada 2 opsi:

#### **OPSI A: Gunakan Supabase Project yang Sama** (Recommended)

1. Di Vercel, **edit** atau **add** environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = (salin dari .env.local)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (salin dari .env.local)
   SUPABASE_SERVICE_ROLE_KEY = (salin dari .env.local jika ada)
   ```

2. Pastikan **Environment** di-set ke **Production, Preview, dan Development**

3. Klik **Save**

4. **WAJIB REDEPLOY**:
   - Pergi ke tab **Deployments**
   - Klik titik tiga (...) di deployment terbaru
   - Klik **Redeploy**
   - Atau: `git commit --allow-empty -m "Trigger redeploy" && git push`

#### **OPSI B: Migrasi Database ke Project Vercel**

Jika Anda memang ingin menggunakan 2 Supabase project berbeda (dev dan prod):

1. Buka **Supabase Dashboard** untuk project yang digunakan Vercel
2. Jalankan semua migration SQL:
   - `supabase-add-order-column.sql`
   - `supabase-add-active-column.sql`
   - `supabase-create-storage-bucket.sql`
   - `supabase-update-storage-bucket.sql`
   - `supabase-rls-policy-order.sql` (jika pakai anon key)

3. **Import data products** dari localhost ke production:
   - Export dari localhost: Supabase Dashboard → Table Editor → products → Export (CSV/SQL)
   - Import ke production: Paste SQL atau upload CSV

---

## Langkah 4: Test dengan API Endpoint

Setelah redeploy, test endpoint debugging:

```
https://rsquareidea.vercel.app/api/test-supabase
```

**Expected Result** (jika berhasil):
```json
{
  "success": true,
  "tests": {
    "totalProducts": {
      "success": true,
      "count": 8  // atau jumlah products Anda
    },
    "activeProducts": {
      "success": true,
      "count": 8
    },
    "orderNumberColumn": {
      "exists": true
    },
    "sampleProducts": {
      "success": true,
      "count": 5,
      "data": [...]
    }
  },
  "recommendations": [
    {
      "issue": "No issues detected",
      "severity": "info"
    }
  ]
}
```

**If Still Error**:
```json
{
  "success": true,
  "tests": {
    "totalProducts": {
      "success": true,
      "count": 0  // ← MASALAH: Database kosong
    }
  },
  "recommendations": [
    {
      "issue": "No products in database",
      "solution": "Add products to your Supabase products table",
      "severity": "critical"
    }
  ]
}
```

Atau:

```json
{
  "tests": {
    "orderNumberColumn": {
      "exists": false,
      "error": "column \"order_number\" does not exist",
      "code": "42703"  // ← MASALAH: Kolom tidak ada
    }
  }
}
```

---

## Langkah 5: Cek Vercel Runtime Logs

Jika masih bermasalah:

1. Buka **Vercel Dashboard** → **Deployments** → klik deployment terbaru
2. Klik tab **Functions** atau **Runtime Logs**
3. Buka halaman `https://rsquareidea.vercel.app/templates` di browser
4. Kembali ke Runtime Logs, cari pesan:
   - `✅ Found X products from Supabase`
   - `⚠️ No products found in Supabase`
   - `❌ Supabase query error`

Screenshot logs dan bagikan jika masih error.

---

## Quick Checklist

Untuk memastikan fix berhasil:

- [ ] Verify `.env.local` punya 3 variables: URL, ANON_KEY, SERVICE_ROLE_KEY (optional)
- [ ] Login ke Vercel → Settings → Environment Variables
- [ ] Pastikan `NEXT_PUBLIC_SUPABASE_URL` di Vercel = di `.env.local`
- [ ] Pastikan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di Vercel = di `.env.local`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` di Vercel (optional tapi recommended)
- [ ] Set environment untuk **Production, Preview, Development**
- [ ] **REDEPLOY** project (env vars tidak auto-apply!)
- [ ] Test `/api/test-supabase` endpoint
- [ ] Test `/admin/templates` dan `/templates` pages

---

## Common Mistakes

### ❌ Mistake 1: Lupa Redeploy
Environment variables **tidak otomatis apply** ke deployment yang sudah ada. Anda **WAJIB redeploy** setelah update env vars.

### ❌ Mistake 2: Environment Salah
Pastikan saat add env vars, Anda pilih **Production** (dan Preview/Development jika perlu). Jika hanya pilih Development, production tidak akan dapat env vars tersebut.

### ❌ Mistake 3: Copy-Paste Salah
Pastikan tidak ada spasi di awal/akhir saat copy-paste API keys. Vercel biasanya otomatis trim, tapi better safe than sorry.

### ❌ Mistake 4: Supabase Project Berbeda Tidak Dimigrasi
Jika memang mau pakai project berbeda untuk dev dan prod, pastikan:
- Structure tabel sama (kolom yang sama)
- Data sudah dimigrasi
- Migration SQL sudah dijalankan di kedua project

---

## Expected Timeline

- **Update env vars di Vercel**: 2 menit
- **Redeploy**: 1-3 menit
- **Test**: 1 menit
- **Total**: ~5 menit

Setelah 5 menit, harusnya semua products sudah muncul di production!

---

## Still Not Working?

Jika setelah ikuti semua langkah masih belum work:

1. Screenshot **Vercel Environment Variables** page (blur API keys untuk keamanan)
2. Screenshot hasil dari `/api/test-supabase`
3. Screenshot **Vercel Runtime Logs** saat buka `/templates`
4. Share semua screenshots

Dengan info tersebut saya bisa diagnose masalah lebih lanjut.
