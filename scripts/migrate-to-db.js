import { getDatabase, saveProductToDB } from "../lib/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateJsonToDatabase() {
  console.log("🚀 Memulai migrasi data JSON ke database...\n");

  const contentDir = path.join(process.cwd(), "content", "produk");

  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    console.log("❌ Folder content/produk tidak ditemukan!");
    return;
  }

  // Get all JSON files
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    console.log("ℹ️  Tidak ada file JSON ditemukan di content/produk/");
    return;
  }

  console.log(`📁 Ditemukan ${files.length} file JSON\n`);

  let successCount = 0;
  let errorCount = 0;

  // Initialize database
  const db = getDatabase();

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const productData = JSON.parse(content);

      // Save to database
      saveProductToDB(productData);

      console.log(`✅ ${file} → Database (ID: ${productData.id})`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${file} → Error: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Migrasi selesai!`);
  console.log(`   ✅ Berhasil: ${successCount}`);
  console.log(`   ❌ Gagal: ${errorCount}`);
  console.log(`\n💡 Database tersimpan di: data/products.db`);
}

// Run migration
migrateJsonToDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
