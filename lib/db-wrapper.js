/**
 * Database wrapper that automatically chooses between Supabase or SQLite
 * Priority: Supabase > SQLite
 */

const useSupabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy-load database module to avoid bundling unused dependencies
async function getDbModule() {
  if (useSupabase) {
    // Use Supabase (recommended for production)
    return import("./supabase.js");
  } else {
    // Use SQLite for development
    return import("./db.js");
  }
}

export async function getAllProducts() {
  const db = await getDbModule();
  if (useSupabase) {
    return db.getAllProductsFromSupabase();
  } else {
    return db.getAllProductsFromDB();
  }
}

export async function getProductById(id) {
  const db = await getDbModule();
  if (useSupabase) {
    return db.getProductByIdFromSupabase(id);
  } else {
    return db.getProductByIdFromDB(id);
  }
}

export async function saveProduct(productData) {
  const db = await getDbModule();
  if (useSupabase) {
    return db.saveProductToSupabase(productData);
  } else {
    return db.saveProductToDB(productData);
  }
}

export async function updateFeaturedStatus(productId, featured) {
  const db = await getDbModule();
  if (useSupabase) {
    return db.updateFeaturedStatusSupabase(productId, featured);
  } else {
    // For SQLite, we need to use full product update
    const product = await getProductById(productId);
    if (!product) throw new Error("Product not found");

    product.featured = featured;
    return db.saveProductToDB(product);
  }
}

export async function deleteProduct(id) {
  const db = await getDbModule();
  if (useSupabase) {
    return db.deleteProductFromSupabase(id);
  } else {
    return db.deleteProductFromDB(id);
  }
}
