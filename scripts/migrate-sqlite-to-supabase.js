#!/usr/bin/env node

/**
 * Migrate data from SQLite to Supabase
 * Usage: node scripts/migrate-sqlite-to-supabase.js
 */

require("dotenv").config({ path: ".env.local" });
const Database = require("better-sqlite3");
const { createClient } = require("@supabase/supabase-js");
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
const dbPath = path.join(process.cwd(), "data", "products.db");
const sqlite = new Database(dbPath);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function migrate() {
  try {
    console.log("🚀 Starting migration from SQLite to Supabase...\n");

    // Get all products from SQLite
    const products = sqlite.prepare("SELECT * FROM products").all();
    console.log(`📦 Found ${products.length} products in SQLite\n`);

    for (const product of products) {
      console.log(`   Migrating: ${product.judul} (${product.id})`);

      // Get related data
      const detail = sqlite.prepare("SELECT * FROM product_details WHERE product_id = ?").get(product.id);
      const links = sqlite.prepare("SELECT * FROM product_links WHERE product_id = ?").all(product.id);
      const gallery = sqlite.prepare("SELECT * FROM product_gallery WHERE product_id = ? ORDER BY sort_order").all(product.id);
      const seo = sqlite.prepare("SELECT * FROM product_seo WHERE product_id = ?").get(product.id);

      // Insert product
      const { error: productError } = await supabase.from("products").upsert({
        id: product.id,
        judul: product.judul,
        deskripsi_singkat: product.deskripsi_singkat,
        harga: product.harga,
        gambar_thumbnail: product.gambar_thumbnail,
        featured: Boolean(product.featured),
        created_at: product.created_at,
        updated_at: product.updated_at,
      });

      if (productError) {
        console.error(`   ❌ Error inserting product: ${productError.message}`);
        continue;
      }

      // Insert details
      if (detail) {
        const { error: detailError } = await supabase.from("product_details").upsert({
          product_id: product.id,
          gambar_utama: detail.gambar_utama,
          deskripsi_lengkap: detail.deskripsi_lengkap,
          link_preview_detail: detail.link_preview_detail,
          link_payment_gateway: detail.link_payment_gateway,
          link_youtube: detail.link_youtube,
          file_panduan: detail.file_panduan,
        });

        if (detailError) console.error(`   ⚠️  Error inserting details: ${detailError.message}`);
      }

      // Insert links
      if (links.length > 0) {
        // Delete existing links first
        await supabase.from("product_links").delete().eq("product_id", product.id);

        const linksData = links.map((link) => ({
          product_id: product.id,
          platform: link.platform,
          url: link.url,
        }));

        const { error: linksError } = await supabase.from("product_links").insert(linksData);
        if (linksError) console.error(`   ⚠️  Error inserting links: ${linksError.message}`);
      }

      // Insert gallery
      if (gallery.length > 0) {
        // Delete existing gallery first
        await supabase.from("product_gallery").delete().eq("product_id", product.id);

        const galleryData = gallery.map((item) => ({
          product_id: product.id,
          judul: item.judul,
          deskripsi: item.deskripsi,
          gambar: item.gambar,
          sort_order: item.sort_order,
        }));

        const { error: galleryError } = await supabase.from("product_gallery").insert(galleryData);
        if (galleryError) console.error(`   ⚠️  Error inserting gallery: ${galleryError.message}`);
      }

      // Insert SEO
      if (seo) {
        const { error: seoError } = await supabase.from("product_seo").upsert({
          product_id: product.id,
          meta_title: seo.meta_title,
          meta_description: seo.meta_description,
        });

        if (seoError) console.error(`   ⚠️  Error inserting SEO: ${seoError.message}`);
      }

      console.log(`   ✅ ${product.judul} migrated successfully`);
    }

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Add Supabase credentials to Vercel environment variables");
    console.log("2. Deploy to Vercel");
    console.log("3. Featured products will now persist across all devices!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

migrate();
