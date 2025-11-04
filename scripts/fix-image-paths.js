/**
 * Script to fix image paths in Supabase database
 * Adds leading slash to all relative image paths
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function fixImagePath(path) {
  if (!path) return path;

  // Already absolute URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Already has leading slash
  if (path.startsWith("/")) {
    return path;
  }

  // Add leading slash
  return `/${path}`;
}

async function fixAllProducts() {
  console.log("🔧 Starting image path fix...\n");

  // Fetch all products
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("❌ Error fetching products:", error);
    process.exit(1);
  }

  console.log(`📦 Found ${products.length} products\n`);

  let updatedCount = 0;

  for (const product of products) {
    let needsUpdate = false;
    const updates = {};

    // Fix gambar_thumbnail
    if (product.gambar_thumbnail) {
      const fixed = fixImagePath(product.gambar_thumbnail);
      if (fixed !== product.gambar_thumbnail) {
        updates.gambar_thumbnail = fixed;
        needsUpdate = true;
      }
    }

    // Fix detail.gambar_utama
    if (product.detail?.gambar_utama) {
      const fixed = fixImagePath(product.detail.gambar_utama);
      if (fixed !== product.detail.gambar_utama) {
        updates.detail = {
          ...(updates.detail || product.detail),
          gambar_utama: fixed,
        };
        needsUpdate = true;
        console.log(`  Fixing gambar_utama: ${product.detail.gambar_utama} -> ${fixed}`);
      }
    }

    // Fix detail.galeri images
    if (product.detail?.galeri && Array.isArray(product.detail.galeri)) {
      const fixedGaleri = product.detail.galeri.map((item) => ({
        ...item,
        gambar: fixImagePath(item.gambar),
      }));

      const hasChanges = product.detail.galeri.some(
        (item, index) => item.gambar !== fixedGaleri[index].gambar
      );

      if (hasChanges) {
        updates.detail = {
          ...(updates.detail || product.detail),
          galeri: fixedGaleri,
        };
        needsUpdate = true;
      }
    }

    // Update product if needed
    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from("products")
        .update(updates)
        .eq("id", product.id);

      if (updateError) {
        console.error(`❌ Error updating ${product.id}:`, updateError);
      } else {
        console.log(`✅ Fixed: ${product.judul}`);
        updatedCount++;
      }
    } else {
      console.log(`⏭️  Skipped: ${product.judul} (no changes needed)`);
    }
  }

  console.log(`\n✅ Migration complete!`);
  console.log(`   Updated: ${updatedCount} products`);
  console.log(`   Skipped: ${products.length - updatedCount} products`);
}

fixAllProducts().catch(console.error);
