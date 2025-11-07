-- ============================================
-- DIAGNOSTIC SCRIPT FOR SUPABASE
-- Run this in Supabase SQL Editor to diagnose issues
-- ============================================

-- 1. CHECK IF PRODUCTS TABLE EXISTS
SELECT
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name = 'products';

-- Expected: 1 row with table_name = 'products', table_type = 'BASE TABLE'
-- If empty: Products table doesn't exist!

-- ============================================

-- 2. CHECK PRODUCTS TABLE STRUCTURE
SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- Expected columns:
-- - id (text/varchar)
-- - judul (text)
-- - deskripsi_singkat (text)
-- - harga (numeric/integer)
-- - gambar_thumbnail (text)
-- - featured (boolean) - optional
-- - active (boolean) - REQUIRED for filtering
-- - order_number (integer) - REQUIRED for sorting
-- - created_at (timestamp)
-- - updated_at (timestamp)

-- ============================================

-- 3. COUNT TOTAL PRODUCTS
SELECT COUNT(*) as total_products FROM products;

-- Expected: > 0 (at least some products)
-- If 0: Database is empty - need to add products!

-- ============================================

-- 4. CHECK ACTIVE/INACTIVE DISTRIBUTION
SELECT
  COALESCE(active::text, 'NULL') as active_status,
  COUNT(*) as count
FROM products
GROUP BY active;

-- Expected: Mix of TRUE, FALSE, or NULL
-- If only FALSE or NULL: All products are inactive!

-- ============================================

-- 5. CHECK ORDER_NUMBER COLUMN
SELECT
  id,
  judul,
  order_number,
  active,
  created_at
FROM products
ORDER BY order_number NULLS LAST
LIMIT 10;

-- Expected: Products with order_number values
-- If order_number is all NULL: Need to run migration!
-- If error "column order_number does not exist": Need to add column!

-- ============================================

-- 6. TEST THE EXACT QUERY USED IN CODE (Active products only)
SELECT
  id,
  judul,
  active,
  order_number
FROM products
WHERE active = true OR active IS NULL
ORDER BY order_number ASC NULLS LAST;

-- Expected: Returns active products
-- If empty: No active products - need to activate them!
-- If error: Column missing or RLS blocking

-- ============================================

-- 7. CHECK ROW LEVEL SECURITY (RLS) POLICIES
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'products';

-- Expected: Policies that allow SELECT for public/anon role
-- If restrictive: May need to adjust RLS or use service role key

-- ============================================

-- 8. CHECK RLS STATUS
SELECT
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'products';

-- rowsecurity = true: RLS is enabled (need proper policies)
-- rowsecurity = false: RLS is disabled (no restrictions)

-- ============================================
-- COMMON FIXES
-- ============================================

-- FIX 1: Add missing columns if needed
-- Uncomment and run if order_number or active columns are missing:

/*
ALTER TABLE products
ADD COLUMN IF NOT EXISTS order_number INTEGER DEFAULT 0;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;

-- Set order_number for existing products
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM products
)
UPDATE products
SET order_number = numbered.rn
FROM numbered
WHERE products.id = numbered.id AND products.order_number IS NULL;

-- Set all products to active
UPDATE products
SET active = TRUE
WHERE active IS NULL;
*/

-- ============================================

-- FIX 2: Activate all products
-- Uncomment and run if all products are inactive:

/*
UPDATE products SET active = TRUE;
*/

-- ============================================

-- FIX 3: Disable RLS temporarily for testing (NOT RECOMMENDED FOR PRODUCTION)
-- Uncomment ONLY for testing:

/*
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
*/

-- ============================================

-- FIX 4: Add RLS policy to allow public SELECT
-- Uncomment if RLS is blocking read access:

/*
CREATE POLICY "Allow public read access"
ON products
FOR SELECT
USING (true);
*/

-- ============================================
-- AFTER RUNNING DIAGNOSTICS
-- ============================================

-- Copy ALL results and share with developer
-- Look for:
-- ❌ Empty results from query #3 (no products)
-- ❌ Missing columns in query #2 (active, order_number)
-- ❌ All active = FALSE in query #4
-- ❌ Restrictive RLS policies in query #7
-- ❌ Error messages from any query

-- ============================================
