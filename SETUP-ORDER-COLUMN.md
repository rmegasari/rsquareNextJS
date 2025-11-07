# Setup Order Column untuk Drag & Drop Sorting

## Error yang Terjadi
```
❌ Gagal menyimpan urutan: JSON.parse: unexpected character at line 1 column 1 of the JSON data
```

atau

```
500 Internal Server Error
```

Error ini terjadi karena:
1. ✅ Kolom `order_number` sudah ada (Anda sudah menambahkannya)
2. ❌ **`SUPABASE_SERVICE_ROLE_KEY` tidak ada di `.env.local`** ← MASALAH UTAMA
3. ❌ RLS policy tidak mengizinkan update

## Solusi - Pilih Salah Satu

### OPSI 1: Tambah RLS Policy (Recommended untuk Development)

Jalankan SQL berikut di **Supabase Dashboard** → **SQL Editor**:

```sql
-- Create policy to allow public update order_number
CREATE POLICY "Allow public update order_number"
ON products
FOR UPDATE
USING (true)
WITH CHECK (true);
```

**Keuntungan**: Mudah, tidak perlu restart server
**Kekurangan**: Kurang aman (siapa saja bisa update products table)

### OPSI 2: Tambah Service Role Key (Recommended untuk Production)

**Langkah 1**: Dapatkan Service Role Key
1. Buka **Supabase Dashboard**
2. Pergi ke **Settings** → **API**
3. Di bagian **Project API keys**, copy nilai `service_role` (bukan `anon`!)
   - Nilai ini rahasia! Jangan share ke publik

**Langkah 2**: Tambahkan ke `.env.local`

Edit file `/home/tuneeca/web_app/RSQUARE-NextJS/.env.local` dan tambahkan:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Langkah 3**: Restart development server

```bash
# Stop server (Ctrl+C di terminal yang menjalankan npm run dev)
# Lalu jalankan lagi:
npm run dev
```

**Keuntungan**: Lebih aman, full akses tanpa RLS
**Kekurangan**: Perlu restart server

---

## Verifikasi Setup

### 1. Cek Kolom Order Number
```sql
SELECT id, judul, order_number
FROM products
ORDER BY order_number
LIMIT 10;
```

Pastikan semua produk punya `order_number` yang berurutan (1, 2, 3, dst).

### 2. Test Drag & Drop
1. Refresh halaman `/admin/templates`
2. Klik button **"Urutkan"**
3. Drag & drop kartu template
4. Klik **"Simpan Perubahan"**
5. Check browser console - seharusnya muncul:
   ```
   📤 Sending reorder request with X products
   📥 Response status: 200 OK
   ✅ Order saved successfully
   ```

---

## Troubleshooting

### Masih Error 500?

**Check Terminal Server** (bukan browser console!), cari error seperti:
```
❌ Error updating product-id: { code: 'XXXX', message: '...' }
```

Copy error tersebut dan share agar bisa dianalisa.

### Error "Row Level Security"?

Jalankan OPSI 1 (tambah RLS policy) di atas.

### Button "Simpan Perubahan" disabled?

Pastikan Anda sudah drag & drop minimal 1 template. Button akan aktif setelah ada perubahan urutan.

---

## File-file Terkait
- Migration script: `supabase-add-order-column.sql` ✅ (sudah dijalankan)
- RLS policy script: `supabase-rls-policy-order.sql` (pilihan OPSI 1)
- API endpoint: `app/api/products/reorder/route.js` ✅ (sudah diupdate)
- Admin page: `app/admin/templates/page.jsx` ✅

## Rekomendasi

**Untuk sekarang**: Gunakan OPSI 1 (RLS policy) agar cepat dan mudah.

**Untuk production**: Gunakan OPSI 2 (service role key) untuk keamanan lebih baik.
