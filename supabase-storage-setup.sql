-- ============================================
-- SUPABASE STORAGE SETUP
-- Setup Storage Bucket untuk Product Images
-- ============================================

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true, -- Public bucket
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- ============================================
-- VERIFICATION
-- ============================================

-- Check if bucket was created successfully
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- ============================================
-- NOTES - PENTING!
-- ============================================

-- 1. ✅ Bucket sudah dibuat dengan setting PUBLIC
--    Artinya semua file bisa diakses langsung via URL
--
-- 2. ⚠️ RLS Policies TIDAK PERLU DIBUAT MANUAL untuk Storage!
--    Supabase otomatis mengatur RLS policies untuk public bucket.
--
--    Bucket PUBLIC = otomatis semua orang bisa:
--    - READ (lihat gambar)
--    - INSERT (upload gambar)
--    - UPDATE (update gambar)
--    - DELETE (hapus gambar)
--
-- 3. 🔒 Jika nanti ingin batasi akses (hanya admin yang bisa upload/delete):
--    - Buka Supabase Dashboard → Storage → product-images
--    - Klik "Policies" tab
--    - Tambahkan custom policies via UI (lebih mudah daripada SQL)
--
-- 4. 📸 Setelah run SQL ini, gambar akan tersimpan di:
--    https://qpeurykzbspfuxfsjlra.supabase.co/storage/v1/object/public/product-images/filename.jpg
--
-- 5. ✅ NEXT STEP: Test upload gambar di admin panel!
