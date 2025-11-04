#!/usr/bin/env node

/**
 * Generate SQL INSERT statements from SQLite database
 * Output can be directly run in Supabase SQL Editor
 */

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbPath = path.join(process.cwd(), "data", "products.db");
const db = new Database(dbPath);

let sql = `-- RSQUARE Data Migration SQL
-- Generated: ${new Date().toISOString()}
-- Run this in Supabase SQL Editor after creating the schema

-- Disable triggers and foreign keys temporarily
SET session_replication_role = 'replica';

`;

// Helper function to escape SQL values
function escapeSqlValue(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }
  // Escape single quotes in strings
  return `'${String(value).replace(/'/g, "''")}'`;
}

try {
  // Get all products
  const products = db.prepare("SELECT * FROM products").all();
  console.log(`Found ${products.length} products`);

  // Generate INSERT for products
  sql += `\n-- Insert products\n`;
  for (const product of products) {
    sql += `INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, created_at, updated_at) VALUES (\n`;
    sql += `  ${escapeSqlValue(product.id)},\n`;
    sql += `  ${escapeSqlValue(product.judul)},\n`;
    sql += `  ${escapeSqlValue(product.deskripsi_singkat)},\n`;
    sql += `  ${product.harga},\n`;
    sql += `  ${escapeSqlValue(product.gambar_thumbnail)},\n`;
    sql += `  ${Boolean(product.featured)},\n`;
    sql += `  ${escapeSqlValue(product.created_at)},\n`;
    sql += `  ${escapeSqlValue(product.updated_at)}\n`;
    sql += `);\n\n`;
  }

  // Generate INSERT for product_details
  sql += `\n-- Insert product details\n`;
  const details = db.prepare("SELECT * FROM product_details").all();
  for (const detail of details) {
    sql += `INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan) VALUES (\n`;
    sql += `  ${escapeSqlValue(detail.product_id)},\n`;
    sql += `  ${escapeSqlValue(detail.gambar_utama)},\n`;
    sql += `  ${escapeSqlValue(detail.deskripsi_lengkap)},\n`;
    sql += `  ${escapeSqlValue(detail.link_preview_detail)},\n`;
    sql += `  ${escapeSqlValue(detail.link_payment_gateway)},\n`;
    sql += `  ${escapeSqlValue(detail.link_youtube)},\n`;
    sql += `  ${escapeSqlValue(detail.file_panduan)}\n`;
    sql += `);\n\n`;
  }

  // Generate INSERT for product_links
  sql += `\n-- Insert product links\n`;
  const links = db.prepare("SELECT * FROM product_links").all();
  for (const link of links) {
    sql += `INSERT INTO product_links (product_id, platform, url) VALUES (\n`;
    sql += `  ${escapeSqlValue(link.product_id)},\n`;
    sql += `  ${escapeSqlValue(link.platform)},\n`;
    sql += `  ${escapeSqlValue(link.url)}\n`;
    sql += `);\n\n`;
  }

  // Generate INSERT for product_gallery
  sql += `\n-- Insert product gallery\n`;
  const gallery = db.prepare("SELECT * FROM product_gallery ORDER BY product_id, sort_order").all();
  for (const item of gallery) {
    sql += `INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (\n`;
    sql += `  ${escapeSqlValue(item.product_id)},\n`;
    sql += `  ${escapeSqlValue(item.judul)},\n`;
    sql += `  ${escapeSqlValue(item.deskripsi)},\n`;
    sql += `  ${escapeSqlValue(item.gambar)},\n`;
    sql += `  ${item.sort_order}\n`;
    sql += `);\n\n`;
  }

  // Generate INSERT for product_seo
  sql += `\n-- Insert product SEO\n`;
  const seo = db.prepare("SELECT * FROM product_seo").all();
  for (const s of seo) {
    sql += `INSERT INTO product_seo (product_id, meta_title, meta_description) VALUES (\n`;
    sql += `  ${escapeSqlValue(s.product_id)},\n`;
    sql += `  ${escapeSqlValue(s.meta_title)},\n`;
    sql += `  ${escapeSqlValue(s.meta_description)}\n`;
    sql += `);\n\n`;
  }

  // Re-enable triggers
  sql += `\n-- Re-enable triggers and foreign keys\n`;
  sql += `SET session_replication_role = 'origin';\n\n`;
  sql += `-- Migration complete!\n`;

  // Write to file
  const outputPath = path.join(process.cwd(), "supabase-data-insert.sql");
  fs.writeFileSync(outputPath, sql);

  console.log(`\n✅ SQL INSERT statements generated successfully!`);
  console.log(`📁 File: ${outputPath}`);
  console.log(`\n📝 Next steps:`);
  console.log(`1. Open Supabase SQL Editor`);
  console.log(`2. Copy the contents of supabase-data-insert.sql`);
  console.log(`3. Paste and run in SQL Editor`);
  console.log(`4. All ${products.length} products will be inserted!`);
} catch (error) {
  console.error("❌ Error generating SQL:", error);
  process.exit(1);
} finally {
  db.close();
}
