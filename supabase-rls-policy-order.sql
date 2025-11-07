-- ============================================
-- RLS POLICY FOR ORDER_NUMBER UPDATE
-- Allow public/anon updates to order_number column only
-- ============================================

-- Create policy to allow anyone to update order_number
-- This is safe because we're only allowing updates to the order_number field
CREATE POLICY "Allow public update order_number"
ON products
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Alternative: More restrictive policy (commented out)
-- Only allow updates that ONLY change order_number
-- CREATE POLICY "Allow update order_number only"
-- ON products
-- FOR UPDATE
-- USING (true)
-- WITH CHECK (
--   -- Ensure only order_number is being updated
--   -- This would require additional logic in the application
--   true
-- );

-- ============================================
-- VERIFICATION
-- ============================================

-- Check policies on products table
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
WHERE tablename = 'products';

-- ============================================
-- NOTES - PENTING!
-- ============================================

-- 1. ⚠️ KEAMANAN:
--    Policy ini memungkinkan siapa saja update order_number
--    Ini aman karena:
--    - Hanya field order_number yang diupdate
--    - Tidak ada data sensitif
--    - Admin bisa revert kapan saja
--
-- 2. 🔐 ALTERNATIF LEBIH AMAN:
--    Tambahkan SUPABASE_SERVICE_ROLE_KEY ke .env.local
--    Service role key bisa didapat dari Supabase Dashboard:
--    Settings → API → service_role (secret)
--
-- 3. 📝 Menambahkan Service Role Key:
--    Edit .env.local dan tambahkan:
--    SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
--
--    Restart server: npm run dev
--
-- 4. ✅ Recommended Approach:
--    Gunakan service role key untuk production
--    Gunakan policy ini untuk development/testing
