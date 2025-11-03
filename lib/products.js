import fs from "fs/promises";
import path from "path";
import { resolveAssetPath } from "./assetPaths";
import { getAllProductsFromDB, getProductByIdFromDB } from "./db";

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");
const PRODUCTS_DIR = path.join(CONTENT_DIR, "produk");
const HOMEPAGE_DATA_PATH = path.join(ROOT_DIR, "_data", "homepage.json");
const TEMPLATE_ORDER_PATH = path.join(ROOT_DIR, "_data", "template_order.json");

// Use database or fallback to JSON files
const USE_DATABASE = true;

async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function getProductSlugs() {
  const entries = await fs.readdir(PRODUCTS_DIR);
  return entries
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export async function getProductById(id) {
  // Try database first
  if (USE_DATABASE) {
    try {
      const product = getProductByIdFromDB(id);
      if (product) return product;
    } catch (error) {
      console.warn("Database error, falling back to JSON:", error.message);
    }
  }

  // Fallback to JSON files
  const filePath = path.join(PRODUCTS_DIR, `${id}.json`);
  const product = await readJson(filePath);

  if (!product) {
    return null;
  }

  return {
    ...product,
    id: product.id ?? id,
  };
}

export async function getAllProducts() {
  // Try database first
  if (USE_DATABASE) {
    try {
      const products = getAllProductsFromDB();
      if (products && products.length > 0) {
        // Sort by created_at descending (newest first)
        return products.sort((a, b) => {
          // If you want to maintain template order, you can still apply it here
          return a.judul.localeCompare(b.judul, "id");
        });
      }
    } catch (error) {
      console.warn("Database error, falling back to JSON:", error.message);
    }
  }

  // Fallback to JSON files
  const slugs = await getProductSlugs();
  const products = await Promise.all(slugs.map((slug) => getProductById(slug)));
  const filtered = products.filter(Boolean);

  const templateOrder = await readJson(TEMPLATE_ORDER_PATH);
  const orderedSlugs =
    templateOrder?.urutan_produk?.map((item) => item.produk) ?? [];
  const orderMap = new Map(orderedSlugs.map((slug, index) => [slug, index]));

  return filtered.sort((a, b) => {
    const aIndex = orderMap.has(a.id) ? orderMap.get(a.id) : Infinity;
    const bIndex = orderMap.has(b.id) ? orderMap.get(b.id) : Infinity;

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    return a.judul.localeCompare(b.judul, "id");
  });
}

export async function getFeaturedProducts() {
  // Try database first
  if (USE_DATABASE) {
    try {
      const allProducts = getAllProductsFromDB();
      if (allProducts && allProducts.length > 0) {
        // Filter products where featured is true
        const featuredProducts = allProducts.filter(
          (product) => product.featured === true || product.featured === 1
        );
        if (featuredProducts.length > 0) {
          return featuredProducts;
        }
      }
    } catch (error) {
      console.warn("Database error, falling back to JSON:", error.message);
    }
  }

  // Fallback to JSON files
  const homepageSettings = await readJson(HOMEPAGE_DATA_PATH);
  const featuredSlugs = homepageSettings?.produk_unggulan ?? [];
  const products = await Promise.all(
    featuredSlugs.map((slug) => getProductById(slug)),
  );
  return products.filter(Boolean);
}

export async function getFreeProducts() {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) => Number(product.harga) === 0);
}

export async function getNonFreeProducts() {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) => Number(product.harga) > 0);
}

export async function getProductMetadataList() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.id,
    title: product.seo?.meta_title ?? product.judul,
    description: product.seo?.meta_description ?? product.deskripsi_singkat,
    image: resolveAssetPath(product.detail?.gambar_utama ?? product.gambar_thumbnail),
    price: product.harga,
  }));
}
