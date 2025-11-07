# Fix: Active/Inactive Status Not Reflecting in Production

## Problem

Ketika mengubah status active/inactive produk di admin:
- ✅ **Localhost**: Perubahan langsung terlihat
- ❌ **Vercel Production**: Produk tetap muncul meskipun sudah di-nonaktifkan

## Root Cause

Next.js 14 menggunakan **Static Site Generation (SSG)** dan **caching** secara default untuk Server Components. Halaman-halaman seperti `/templates`, `/[slug]`, dan `/preview/[slug]` di-render saat build time dan di-cache. Ketika status active/inactive berubah, cache tidak otomatis ter-refresh di production.

## Solution

### 1. Force Dynamic Rendering

Menambahkan config ke semua halaman yang menampilkan products:

```javascript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

**Halaman yang diupdate:**
- `app/(site)/page.js` - Homepage (featured products)
- `app/(site)/templates/page.jsx` - Halaman list semua templates
- `app/(site)/[slug]/page.jsx` - Detail page produk
- `app/(site)/preview/[slug]/page.jsx` - Preview page produk

**Efek:**
- Halaman akan **selalu fetch data terbaru** dari database
- Tidak ada caching di production
- Perubahan active/inactive langsung terlihat

### 2. Filter Inactive Products

Menambahkan logic di `lib/products.js` → `getProductById()`:

```javascript
export async function getProductById(id, options = { includeInactive: false }) {
  const product = await getProductByIdFromDB(id);

  // Check if product is active (unless includeInactive is true)
  if (product && !options.includeInactive) {
    if (product.active === false) {
      return null; // Product inactive, return null
    }
  }

  return product;
}
```

**Efek:**
- Produk dengan `active = false` akan return `null`
- Halaman detail/preview akan return **404** untuk inactive products
- URL direct ke produk inactive tidak akan accessible

## Trade-offs

### Pros ✅
- Perubahan active/inactive **real-time** di production
- Produk inactive tidak bisa diakses langsung via URL
- Konsisten antara localhost dan production

### Cons ⚠️
- **Slightly slower page load** - Setiap request akan hit database
- **Tidak ada caching benefit** - Good for dynamic content, trade-off untuk speed
- **Higher database usage** - Lebih banyak query ke Supabase

## Alternative Solutions (Not Implemented)

### Opsi A: ISR (Incremental Static Regeneration)
```javascript
export const revalidate = 60; // Revalidate every 60 seconds
```

**Pros**: Masih ada caching, tidak terlalu banyak database hits
**Cons**: Delay 60 detik sebelum perubahan terlihat

### Opsi B: On-Demand Revalidation
Trigger revalidation setelah update status active/inactive via API:

```javascript
// In API route after updating active status
import { revalidatePath } from 'next/cache';
revalidatePath('/templates');
revalidatePath(`/${productId}`);
```

**Pros**: Best of both worlds - caching + instant update
**Cons**: Lebih complex implementation

## Recommendation

Untuk production yang lebih optimal, disarankan menggunakan **Opsi B (On-Demand Revalidation)** di future. Tapi untuk sekarang, `force-dynamic` sudah cukup dan simple.

## Testing

### Test di Localhost
1. Buka `/admin/templates`
2. Toggle status active/inactive suatu produk
3. Buka `/templates` - produk inactive seharusnya hilang
4. Akses direct URL `/{product-id}` - seharusnya return 404

### Test di Production (Vercel)
1. Deploy perubahan ini
2. Lakukan test yang sama seperti di atas
3. Hasil seharusnya **konsisten** dengan localhost

## Files Changed

- `app/(site)/page.js` - Added dynamic config
- `app/(site)/templates/page.jsx` - Added dynamic config
- `app/(site)/[slug]/page.jsx` - Added dynamic config
- `app/(site)/preview/[slug]/page.jsx` - Added dynamic config
- `lib/products.js` - Added active status filter in `getProductById()`

## Deployment

```bash
git push origin main
```

Vercel akan otomatis deploy. Tunggu ~2 menit, lalu test perubahan active/inactive.

---

**Commit**: `1faf41b` - Fix: Force dynamic rendering to respect active/inactive status in production
**Date**: 2025-11-07
**Author**: Claude Code
