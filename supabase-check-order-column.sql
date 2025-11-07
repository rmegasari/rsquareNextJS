-- ============================================
-- CHECK IF ORDER_NUMBER COLUMN EXISTS
-- Run this first before adding the column
-- ============================================

-- Check if order_number column exists
SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name = 'order_number';

-- If the query above returns no rows, run supabase-add-order-column.sql
-- If it returns a row, the column already exists

-- Also check current products (sample)
SELECT id, judul, order_number
FROM products
LIMIT 5;
