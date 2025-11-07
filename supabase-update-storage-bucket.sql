-- ============================================
-- UPDATE SUPABASE STORAGE BUCKET TO ALLOW PDFs
-- Fix MIME type restrictions to allow PDF uploads
-- ============================================

-- Update the bucket to allow PDFs
-- Note: This removes the file_size_limit and allowed_mime_types restrictions
UPDATE storage.buckets
SET
  file_size_limit = 10485760, -- 10MB in bytes
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
  ]
WHERE id = 'product-images';

-- ============================================
-- VERIFICATION
-- ============================================

-- Check bucket configuration
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'product-images';

-- ============================================
-- ALTERNATIVE: If above doesn't work
-- ============================================

-- If the UPDATE doesn't work, you can remove restrictions entirely:
-- UPDATE storage.buckets
-- SET
--   file_size_limit = NULL,
--   allowed_mime_types = NULL
-- WHERE id = 'product-images';

-- Then handle validation in the application code (which we already do in /api/upload)

-- ============================================
-- NOTES - PENTING!
-- ============================================

-- 1. 📝 MIME types yang diizinkan:
--    - Images: image/jpeg, image/jpg, image/png, image/webp, image/gif
--    - PDF: application/pdf
--
-- 2. 📏 File size limit:
--    - Maximum: 10MB (10485760 bytes)
--    - Validasi tambahan di /api/upload: 5MB untuk gambar, 10MB untuk PDF
--
-- 3. ⚠️ Jika UPDATE tidak berhasil:
--    - Gunakan alternative query (uncomment baris 25-29)
--    - Atau hapus bucket dan buat ulang dengan config yang benar
--
-- 4. 🔧 Untuk membuat bucket baru dengan config lengkap:
--    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
--    VALUES (
--      'product-images',
--      'product-images',
--      true,
--      10485760,
--      ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
--    );
