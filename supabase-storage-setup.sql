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
-- RLS POLICIES FOR STORAGE
-- ============================================

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow PUBLIC READ access to product-images bucket
-- Anyone can view/download images
CREATE POLICY "Public Read Access for Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Policy 2: Allow PUBLIC INSERT (upload) to product-images bucket
-- Anyone can upload images (useful for admin without auth)
CREATE POLICY "Public Upload Access for Product Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Policy 3: Allow PUBLIC UPDATE to product-images bucket
-- Anyone can update their own uploads
CREATE POLICY "Public Update Access for Product Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Policy 4: Allow PUBLIC DELETE from product-images bucket
-- Anyone can delete images (useful for admin without auth)
CREATE POLICY "Public Delete Access for Product Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if bucket was created successfully
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Check RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND policyname LIKE '%Product Images%';

-- ============================================
-- NOTES
-- ============================================

-- 1. Bucket sudah PUBLIC, jadi URL gambar bisa diakses langsung
-- 2. RLS policies mengizinkan:
--    - READ: Semua orang bisa lihat gambar
--    - INSERT: Semua orang bisa upload (untuk admin tanpa auth)
--    - UPDATE: Semua orang bisa update gambar yang ada
--    - DELETE: Semua orang bisa hapus gambar (untuk admin)
--
-- 3. Jika nanti Anda implementasi authentication untuk admin,
--    Anda bisa update policies menjadi:
--    - READ: Public
--    - INSERT/UPDATE/DELETE: Authenticated users only
--
-- 4. Setelah run SQL ini, gambar akan tersimpan di:
--    https://qpeurykzbspfuxfsjlra.supabase.co/storage/v1/object/public/product-images/filename.jpg
