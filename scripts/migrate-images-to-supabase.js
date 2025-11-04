#!/usr/bin/env node

/**
 * Migrate existing product images from /public/photos/produk to Supabase Storage
 * This is OPTIONAL - only run if you want to move existing images to cloud
 *
 * Usage: node scripts/migrate-images-to-supabase.js
 */

require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// Check environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("❌ Missing Supabase credentials in .env.local");
  console.error("Please add:");
  console.error("  NEXT_PUBLIC_SUPABASE_URL=your-project-url");
  console.error("  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key");
  process.exit(1);
}

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const dbPath = path.join(process.cwd(), "data", "products.db");
const sqlite = new Database(dbPath);

async function uploadImageToSupabase(localPath, filename) {
  try {
    // Read file
    const fileBuffer = fs.readFileSync(localPath);

    // Determine content type
    const ext = path.extname(filename).toLowerCase();
    const contentTypeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };
    const contentType = contentTypeMap[ext] || 'image/jpeg';

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filename, fileBuffer, {
        contentType: contentType,
        cacheControl: "3600",
        upsert: true, // Overwrite if exists
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filename);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`   ⚠️  Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function migrateImages() {
  try {
    console.log("🚀 Starting image migration to Supabase Storage...\n");

    const photosDir = path.join(process.cwd(), "public", "photos", "produk");

    if (!fs.existsSync(photosDir)) {
      console.log("⚠️  No /public/photos/produk directory found. Nothing to migrate.");
      return;
    }

    // Get all products from database
    const products = sqlite.prepare("SELECT * FROM products").all();
    const details = sqlite.prepare("SELECT * FROM product_details").all();
    const gallery = sqlite.prepare("SELECT * FROM product_gallery").all();

    console.log(`📦 Found ${products.length} products\n`);

    let uploadedCount = 0;
    let skippedCount = 0;
    const urlMappings = {}; // old path -> new URL

    // Step 1: Upload all images
    console.log("📤 Uploading images to Supabase Storage...\n");

    for (const product of products) {
      console.log(`   Processing: ${product.judul}`);

      // Upload thumbnail
      if (product.gambar_thumbnail && product.gambar_thumbnail.startsWith('/photos/produk/')) {
        const filename = path.basename(product.gambar_thumbnail);
        const localPath = path.join(process.cwd(), "public", product.gambar_thumbnail);

        if (fs.existsSync(localPath)) {
          console.log(`      Uploading thumbnail: ${filename}`);
          const publicUrl = await uploadImageToSupabase(localPath, filename);
          if (publicUrl) {
            urlMappings[product.gambar_thumbnail] = publicUrl;
            uploadedCount++;
          } else {
            skippedCount++;
          }
        }
      }

      // Upload gambar utama from details
      const detail = details.find(d => d.product_id === product.id);
      if (detail && detail.gambar_utama && detail.gambar_utama.startsWith('/photos/produk/')) {
        const filename = path.basename(detail.gambar_utama);
        const localPath = path.join(process.cwd(), "public", detail.gambar_utama);

        if (fs.existsSync(localPath) && !urlMappings[detail.gambar_utama]) {
          console.log(`      Uploading main image: ${filename}`);
          const publicUrl = await uploadImageToSupabase(localPath, filename);
          if (publicUrl) {
            urlMappings[detail.gambar_utama] = publicUrl;
            uploadedCount++;
          } else {
            skippedCount++;
          }
        }
      }

      // Upload gallery images
      const galleryItems = gallery.filter(g => g.product_id === product.id);
      for (const item of galleryItems) {
        if (item.gambar && item.gambar.startsWith('/photos/produk/')) {
          const filename = path.basename(item.gambar);
          const localPath = path.join(process.cwd(), "public", item.gambar);

          if (fs.existsSync(localPath) && !urlMappings[item.gambar]) {
            console.log(`      Uploading gallery: ${filename}`);
            const publicUrl = await uploadImageToSupabase(localPath, filename);
            if (publicUrl) {
              urlMappings[item.gambar] = publicUrl;
              uploadedCount++;
            } else {
              skippedCount++;
            }
          }
        }
      }
    }

    console.log(`\n✅ Upload complete!`);
    console.log(`   📤 Uploaded: ${uploadedCount} images`);
    console.log(`   ⏭️  Skipped: ${skippedCount} images\n`);

    // Step 2: Update database with new URLs
    console.log("📝 Updating database with new Supabase URLs...\n");

    for (const product of products) {
      // Update thumbnail
      if (product.gambar_thumbnail && urlMappings[product.gambar_thumbnail]) {
        const newUrl = urlMappings[product.gambar_thumbnail];
        console.log(`   Updating ${product.judul} thumbnail`);

        await supabase
          .from("products")
          .update({ gambar_thumbnail: newUrl })
          .eq("id", product.id);
      }

      // Update gambar utama
      const detail = details.find(d => d.product_id === product.id);
      if (detail && detail.gambar_utama && urlMappings[detail.gambar_utama]) {
        const newUrl = urlMappings[detail.gambar_utama];
        console.log(`   Updating ${product.judul} main image`);

        await supabase
          .from("product_details")
          .update({ gambar_utama: newUrl })
          .eq("product_id", product.id);
      }

      // Update gallery
      const galleryItems = gallery.filter(g => g.product_id === product.id);
      for (const item of galleryItems) {
        if (item.gambar && urlMappings[item.gambar]) {
          const newUrl = urlMappings[item.gambar];
          console.log(`   Updating ${product.judul} gallery item`);

          await supabase
            .from("product_gallery")
            .update({ gambar: newUrl })
            .eq("product_id", product.id)
            .eq("gambar", item.gambar);
        }
      }
    }

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📝 Summary:");
    console.log(`   - ${uploadedCount} images uploaded to Supabase Storage`);
    console.log(`   - Database updated with new Supabase URLs`);
    console.log(`   - Images now served from Supabase CDN\n`);

    console.log("🗑️  Optional: You can now delete /public/photos/produk to save space in Git");
    console.log("   Run: rm -rf public/photos/produk\n");

  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

migrateImages();
