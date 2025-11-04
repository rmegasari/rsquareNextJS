#!/usr/bin/env node

/**
 * Script to sync featured status to database
 * Usage: node scripts/sync-featured-to-db.js <product-ids>
 * Example: node scripts/sync-featured-to-db.js invoice-maker personal-budgeting
 */

const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(process.cwd(), "data", "products.db");
const db = new Database(dbPath);

// Get product IDs from command line arguments
const featuredIds = process.argv.slice(2);

if (featuredIds.length === 0) {
  console.log("❌ No product IDs provided");
  console.log("Usage: node scripts/sync-featured-to-db.js <product-ids>");
  console.log("Example: node scripts/sync-featured-to-db.js invoice-maker personal-budgeting");
  process.exit(1);
}

console.log("📝 Setting featured products:", featuredIds);

try {
  // Start transaction
  db.exec("BEGIN TRANSACTION");

  // Set all products to not featured
  db.prepare("UPDATE products SET featured = 0").run();

  // Set specified products as featured
  const updateStmt = db.prepare("UPDATE products SET featured = 1 WHERE id = ?");
  featuredIds.forEach((id) => {
    const result = updateStmt.run(id);
    if (result.changes === 0) {
      console.warn(`⚠️  Product with ID "${id}" not found in database`);
    } else {
      console.log(`✅ Set "${id}" as featured`);
    }
  });

  // Commit transaction
  db.exec("COMMIT");

  // Verify results
  const featured = db.prepare("SELECT id, judul FROM products WHERE featured = 1").all();
  console.log("\n✅ Featured products in database:");
  featured.forEach((p) => console.log(`   - ${p.id}: ${p.judul}`));

  console.log("\n✅ Database updated successfully!");
  console.log("⚠️  Remember to commit and push the database to Git:");
  console.log("   git add data/products.db");
  console.log("   git commit -m \"Update featured products\"");
  console.log("   git push");
} catch (error) {
  console.error("❌ Error updating database:", error);
  db.exec("ROLLBACK");
  process.exit(1);
} finally {
  db.close();
}
