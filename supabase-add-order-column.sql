-- ============================================
-- ADD ORDER COLUMN TO PRODUCTS TABLE
-- Migration: Add order_number for drag-and-drop sorting
-- ============================================

-- Add order_number column (nullable initially)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS order_number INTEGER;

-- Set initial order based on existing data (alphabetical by judul)
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY judul) as rn
  FROM products
)
UPDATE products
SET order_number = numbered.rn
FROM numbered
WHERE products.id = numbered.id AND products.order_number IS NULL;

-- Make order_number NOT NULL with default
ALTER TABLE products
ALTER COLUMN order_number SET DEFAULT 0,
ALTER COLUMN order_number SET NOT NULL;

-- Create index for faster sorting
CREATE INDEX IF NOT EXISTS idx_products_order ON products(order_number);

-- ============================================
-- VERIFICATION
-- ============================================

-- Check column was added
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'products' AND column_name = 'order_number';

-- Check all products have order numbers
SELECT id, judul, order_number FROM products ORDER BY order_number;

-- ============================================
-- NOTES - PENTING!
-- ============================================

-- 1. ✅ Kolom 'order_number' ditambahkan untuk sorting manual
--    Urutan di admin panel (atas ke bawah) = urutan di /templates (kiri-kanan, atas-bawah)
--
-- 2. 📝 Order number:
--    - Lower number = lebih dulu muncul
--    - Admin bisa drag-drop untuk mengubah urutan
--    - Otomatis disimpan ke database
--
-- 3. 🔧 API endpoint baru:
--    - PATCH /api/products/reorder
--    - Body: { productIds: ['id1', 'id2', 'id3'] } dalam urutan yang diinginkan
--
-- 4. 🎯 Use case:
--    - Highlight produk tertentu di posisi atas
--    - Atur urutan berdasarkan prioritas bisnis
--    - Sorting manual tanpa perlu ubah nama/tanggal
