-- ============================================
-- ADD ACTIVE COLUMN TO PRODUCTS TABLE
-- Migration: Add active status for products
-- ============================================

-- Add active column (default TRUE for all existing products)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;

-- Update all existing products to active
UPDATE products SET active = TRUE WHERE active IS NULL;

-- Make active NOT NULL with default TRUE
ALTER TABLE products
ALTER COLUMN active SET DEFAULT TRUE,
ALTER COLUMN active SET NOT NULL;

-- ============================================
-- VERIFICATION
-- ============================================

-- Check column was added
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'products' AND column_name = 'active';

-- Check all products are active by default
SELECT id, judul, active FROM products;

-- ============================================
-- NOTES - PENTING!
-- ============================================

-- 1. ✅ Kolom 'active' ditambahkan dengan default TRUE
--    Artinya semua produk existing otomatis aktif
--
-- 2. 📝 Produk yang tidak aktif (active = FALSE) tidak akan:
--    - Ditampilkan di halaman /templates
--    - Muncul di homepage (featured products)
--    - Diakses via URL langsung (akan 404)
--
-- 3. 🔧 Admin tetap bisa:
--    - Melihat semua produk (aktif dan tidak aktif)
--    - Edit produk yang tidak aktif
--    - Mengubah status active/inactive via toggle
--
-- 4. 🎯 Use case:
--    - Draft produk (belum siap dipublish)
--    - Temporary hide produk (promo selesai, stok habis, dll)
--    - Archive produk lama tanpa delete
