import Database from "better-sqlite3";
import path from "path";

let db = null;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data", "products.db");
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");

    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        judul TEXT NOT NULL,
        deskripsi_singkat TEXT,
        harga INTEGER DEFAULT 0,
        gambar_thumbnail TEXT,
        featured BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS product_details (
        product_id TEXT PRIMARY KEY,
        gambar_utama TEXT,
        deskripsi_lengkap TEXT,
        link_preview_detail TEXT,
        link_payment_gateway TEXT,
        link_youtube TEXT,
        file_panduan TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS product_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS product_gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        judul TEXT NOT NULL,
        deskripsi TEXT,
        gambar TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS product_seo (
        product_id TEXT PRIMARY KEY,
        meta_title TEXT,
        meta_description TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
      CREATE INDEX IF NOT EXISTS idx_products_harga ON products(harga);
      CREATE INDEX IF NOT EXISTS idx_gallery_product ON product_gallery(product_id);
      CREATE INDEX IF NOT EXISTS idx_links_product ON product_links(product_id);
    `);
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

// Helper functions for CRUD operations
export function getAllProductsFromDB() {
  const db = getDatabase();
  const products = db.prepare(`
    SELECT * FROM products ORDER BY created_at DESC
  `).all();

  return products.map(product => {
    const detail = db.prepare(`SELECT * FROM product_details WHERE product_id = ?`).get(product.id);
    const links = db.prepare(`SELECT platform, url FROM product_links WHERE product_id = ?`).all(product.id);
    const gallery = db.prepare(`SELECT judul, deskripsi, gambar FROM product_gallery WHERE product_id = ? ORDER BY sort_order`).all(product.id);
    const seo = db.prepare(`SELECT meta_title, meta_description FROM product_seo WHERE product_id = ?`).get(product.id);

    return {
      id: product.id,
      judul: product.judul,
      deskripsi_singkat: product.deskripsi_singkat,
      harga: product.harga,
      gambar_thumbnail: product.gambar_thumbnail,
      featured: Boolean(product.featured),
      detail: detail ? {
        gambar_utama: detail.gambar_utama,
        deskripsi_lengkap: detail.deskripsi_lengkap,
        link_preview_detail: detail.link_preview_detail,
        payment_gateway: detail.link_payment_gateway,
        link_youtube: detail.link_youtube,
        file_panduan_pdf: detail.file_panduan,
        link_pembelian: links,
        galeri: gallery,
      } : null,
      seo: seo || null,
    };
  });
}

export function getProductByIdFromDB(id) {
  const db = getDatabase();
  const product = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);

  if (!product) return null;

  const detail = db.prepare(`SELECT * FROM product_details WHERE product_id = ?`).get(id);
  const links = db.prepare(`SELECT platform, url FROM product_links WHERE product_id = ?`).all(id);
  const gallery = db.prepare(`SELECT judul, deskripsi, gambar FROM product_gallery WHERE product_id = ? ORDER BY sort_order`).all(id);
  const seo = db.prepare(`SELECT meta_title, meta_description FROM product_seo WHERE product_id = ?`).get(id);

  return {
    id: product.id,
    judul: product.judul,
    deskripsi_singkat: product.deskripsi_singkat,
    harga: product.harga,
    gambar_thumbnail: product.gambar_thumbnail,
    featured: Boolean(product.featured),
    detail: detail ? {
      gambar_utama: detail.gambar_utama,
      deskripsi_lengkap: detail.deskripsi_lengkap,
      link_preview_detail: detail.link_preview_detail,
      payment_gateway: detail.link_payment_gateway,
      link_youtube: detail.link_youtube,
      file_panduan_pdf: detail.file_panduan,
      link_pembelian: links,
      galeri: gallery,
    } : null,
    seo: seo || null,
  };
}

export function saveProductToDB(productData) {
  const db = getDatabase();

  // Start transaction
  const insertProduct = db.transaction(() => {
    // Insert or update main product
    db.prepare(`
      INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        judul = excluded.judul,
        deskripsi_singkat = excluded.deskripsi_singkat,
        harga = excluded.harga,
        gambar_thumbnail = excluded.gambar_thumbnail,
        featured = excluded.featured,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      productData.id,
      productData.judul,
      productData.deskripsi_singkat,
      productData.harga,
      productData.gambar_thumbnail,
      productData.featured ? 1 : 0
    );

    // Delete existing related data
    db.prepare(`DELETE FROM product_details WHERE product_id = ?`).run(productData.id);
    db.prepare(`DELETE FROM product_links WHERE product_id = ?`).run(productData.id);
    db.prepare(`DELETE FROM product_gallery WHERE product_id = ?`).run(productData.id);
    db.prepare(`DELETE FROM product_seo WHERE product_id = ?`).run(productData.id);

    // Insert product details
    if (productData.detail) {
      db.prepare(`
        INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail, link_payment_gateway, link_youtube, file_panduan)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        productData.id,
        productData.detail.gambar_utama || null,
        productData.detail.deskripsi_lengkap || null,
        productData.detail.link_preview_detail || null,
        productData.detail.payment_gateway || null,
        productData.detail.link_youtube || null,
        productData.detail.file_panduan_pdf || null
      );

      // Insert links
      if (productData.detail.link_pembelian) {
        const insertLink = db.prepare(`INSERT INTO product_links (product_id, platform, url) VALUES (?, ?, ?)`);
        productData.detail.link_pembelian.forEach(link => {
          insertLink.run(productData.id, link.platform, link.url);
        });
      }

      // Insert gallery
      if (productData.detail.galeri) {
        const insertGallery = db.prepare(`INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order) VALUES (?, ?, ?, ?, ?)`);
        productData.detail.galeri.forEach((item, index) => {
          insertGallery.run(productData.id, item.judul, item.deskripsi || null, item.gambar, index);
        });
      }
    }

    // Insert SEO
    if (productData.seo) {
      db.prepare(`
        INSERT INTO product_seo (product_id, meta_title, meta_description)
        VALUES (?, ?, ?)
      `).run(productData.id, productData.seo.meta_title || null, productData.seo.meta_description || null);
    }
  });

  insertProduct();
  return true;
}

export function deleteProductFromDB(id) {
  const db = getDatabase();
  const result = db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
  return result.changes > 0;
}
