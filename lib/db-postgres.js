import { sql } from "@vercel/postgres";

/**
 * Vercel Postgres database functions
 * Used in production (Vercel deployment)
 */

export async function getAllProductsFromPostgres() {
  try {
    const { rows: products } = await sql`SELECT * FROM products ORDER BY created_at DESC`;

    return Promise.all(
      products.map(async (product) => {
        const { rows: details } = await sql`SELECT * FROM product_details WHERE product_id = ${product.id}`;
        const { rows: links } = await sql`SELECT platform, url FROM product_links WHERE product_id = ${product.id}`;
        const { rows: gallery } = await sql`SELECT judul, deskripsi, gambar FROM product_gallery WHERE product_id = ${product.id} ORDER BY sort_order`;
        const { rows: seo } = await sql`SELECT meta_title, meta_description FROM product_seo WHERE product_id = ${product.id}`;

        const detail = details[0];

        return {
          id: product.id,
          judul: product.judul,
          deskripsi_singkat: product.deskripsi_singkat,
          harga: product.harga,
          gambar_thumbnail: product.gambar_thumbnail,
          featured: Boolean(product.featured),
          detail: detail
            ? {
                gambar_utama: detail.gambar_utama,
                deskripsi_lengkap: detail.deskripsi_lengkap,
                link_preview_detail: detail.link_preview_detail,
                payment_gateway: detail.link_payment_gateway,
                link_youtube: detail.link_youtube,
                file_panduan_pdf: detail.file_panduan,
                link_pembelian: links,
                galeri: gallery,
              }
            : null,
          seo: seo[0] || null,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching products from Postgres:", error);
    throw error;
  }
}

export async function getProductByIdFromPostgres(id) {
  try {
    const { rows: products } = await sql`SELECT * FROM products WHERE id = ${id}`;
    const product = products[0];

    if (!product) return null;

    const { rows: details } = await sql`SELECT * FROM product_details WHERE product_id = ${id}`;
    const { rows: links } = await sql`SELECT platform, url FROM product_links WHERE product_id = ${id}`;
    const { rows: gallery } = await sql`SELECT judul, deskripsi, gambar FROM product_gallery WHERE product_id = ${id} ORDER BY sort_order`;
    const { rows: seo } = await sql`SELECT meta_title, meta_description FROM product_seo WHERE product_id = ${id}`;

    const detail = details[0];

    return {
      id: product.id,
      judul: product.judul,
      deskripsi_singkat: product.deskripsi_singkat,
      harga: product.harga,
      gambar_thumbnail: product.gambar_thumbnail,
      featured: Boolean(product.featured),
      detail: detail
        ? {
            gambar_utama: detail.gambar_utama,
            deskripsi_lengkap: detail.deskripsi_lengkap,
            link_preview_detail: detail.link_preview_detail,
            payment_gateway: detail.link_payment_gateway,
            link_youtube: detail.link_youtube,
            file_panduan_pdf: detail.file_panduan,
            link_pembelian: links,
            galeri: gallery,
          }
        : null,
      seo: seo[0] || null,
    };
  } catch (error) {
    console.error("Error fetching product from Postgres:", error);
    throw error;
  }
}

export async function saveProductToPostgres(productData) {
  try {
    // Start transaction
    await sql`BEGIN`;

    // Upsert main product
    await sql`
      INSERT INTO products (id, judul, deskripsi_singkat, harga, gambar_thumbnail, featured, updated_at)
      VALUES (${productData.id}, ${productData.judul}, ${productData.deskripsi_singkat},
              ${productData.harga}, ${productData.gambar_thumbnail}, ${productData.featured ? 1 : 0}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        judul = EXCLUDED.judul,
        deskripsi_singkat = EXCLUDED.deskripsi_singkat,
        harga = EXCLUDED.harga,
        gambar_thumbnail = EXCLUDED.gambar_thumbnail,
        featured = EXCLUDED.featured,
        updated_at = NOW()
    `;

    // Delete existing related data
    await sql`DELETE FROM product_details WHERE product_id = ${productData.id}`;
    await sql`DELETE FROM product_links WHERE product_id = ${productData.id}`;
    await sql`DELETE FROM product_gallery WHERE product_id = ${productData.id}`;
    await sql`DELETE FROM product_seo WHERE product_id = ${productData.id}`;

    // Insert product details
    if (productData.detail) {
      await sql`
        INSERT INTO product_details (product_id, gambar_utama, deskripsi_lengkap, link_preview_detail,
                                     link_payment_gateway, link_youtube, file_panduan)
        VALUES (${productData.id}, ${productData.detail.gambar_utama || null},
                ${productData.detail.deskripsi_lengkap || null}, ${productData.detail.link_preview_detail || null},
                ${productData.detail.payment_gateway || null}, ${productData.detail.link_youtube || null},
                ${productData.detail.file_panduan_pdf || null})
      `;

      // Insert links
      if (productData.detail.link_pembelian && productData.detail.link_pembelian.length > 0) {
        for (const link of productData.detail.link_pembelian) {
          await sql`
            INSERT INTO product_links (product_id, platform, url)
            VALUES (${productData.id}, ${link.platform}, ${link.url})
          `;
        }
      }

      // Insert gallery
      if (productData.detail.galeri && productData.detail.galeri.length > 0) {
        for (let i = 0; i < productData.detail.galeri.length; i++) {
          const item = productData.detail.galeri[i];
          await sql`
            INSERT INTO product_gallery (product_id, judul, deskripsi, gambar, sort_order)
            VALUES (${productData.id}, ${item.judul}, ${item.deskripsi || null}, ${item.gambar}, ${i})
          `;
        }
      }
    }

    // Insert SEO
    if (productData.seo) {
      await sql`
        INSERT INTO product_seo (product_id, meta_title, meta_description)
        VALUES (${productData.id}, ${productData.seo.meta_title || null}, ${productData.seo.meta_description || null})
      `;
    }

    await sql`COMMIT`;
    return true;
  } catch (error) {
    await sql`ROLLBACK`;
    console.error("Error saving product to Postgres:", error);
    throw error;
  }
}

export async function updateFeaturedStatusPostgres(productId, featured) {
  try {
    await sql`UPDATE products SET featured = ${featured ? 1 : 0}, updated_at = NOW() WHERE id = ${productId}`;
    return true;
  } catch (error) {
    console.error("Error updating featured status in Postgres:", error);
    throw error;
  }
}

export async function deleteProductFromPostgres(id) {
  try {
    const result = await sql`DELETE FROM products WHERE id = ${id}`;
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting product from Postgres:", error);
    throw error;
  }
}

export async function initializePostgresTables() {
  try {
    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        judul TEXT NOT NULL,
        deskripsi_singkat TEXT,
        harga INTEGER DEFAULT 0,
        gambar_thumbnail TEXT,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS product_details (
        product_id TEXT PRIMARY KEY,
        gambar_utama TEXT,
        deskripsi_lengkap TEXT,
        link_preview_detail TEXT,
        link_payment_gateway TEXT,
        link_youtube TEXT,
        file_panduan TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS product_links (
        id SERIAL PRIMARY KEY,
        product_id TEXT NOT NULL,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS product_gallery (
        id SERIAL PRIMARY KEY,
        product_id TEXT NOT NULL,
        judul TEXT NOT NULL,
        deskripsi TEXT,
        gambar TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS product_seo (
        product_id TEXT PRIMARY KEY,
        meta_title TEXT,
        meta_description TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_products_harga ON products(harga)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_gallery_product ON product_gallery(product_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_links_product ON product_links(product_id)`;

    console.log("✅ Postgres tables initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing Postgres tables:", error);
    throw error;
  }
}
