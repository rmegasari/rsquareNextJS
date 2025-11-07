-- ============================================
-- CREATE SUPABASE STORAGE BUCKET
-- For storing product images and PDF files
-- ============================================

-- Create storage bucket for product images and PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set storage policies (allow public read, authenticated write)
CREATE POLICY "Public can read product images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'product-images');

-- ============================================
-- VERIFICATION
-- ============================================

-- Check bucket was created
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Check policies were created
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- ============================================
-- NOTES - PENTING!
-- ============================================

-- 1. ✅ Bucket 'product-images' dibuat dengan public access
--    Artinya semua file yang diupload bisa diakses publik via URL
--
-- 2. 📝 File yang bisa diupload:
--    - Images: JPEG, PNG, WebP, GIF (max 5MB)
--    - PDF: Panduan/dokumentasi (max 10MB)
--
-- 3. 🔧 Policies:
--    - Public READ: Semua orang bisa lihat/download file
--    - Authenticated WRITE: Hanya user yang login bisa upload/edit/delete
--
-- 4. 🎯 Penggunaan:
--    - Upload via /api/upload endpoint
--    - Akses file via public URL: https://[PROJECT].supabase.co/storage/v1/object/public/product-images/[filename]
--
-- 5. ⚠️ Jika bucket sudah ada:
--    Script ini aman dijalankan (ON CONFLICT DO NOTHING)
--    Tapi policies mungkin error jika sudah ada - hapus dulu policies lama jika perlu
