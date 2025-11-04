/**
 * Database wrapper that automatically chooses between Supabase, Postgres, or SQLite
 * Priority: Supabase > Postgres > SQLite
 */

const useSupabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const usePostgres = !useSupabase && process.env.NODE_ENV === "production" && process.env.POSTGRES_URL;

// Dynamic imports to avoid bundling unused code
let dbModule;

if (useSupabase) {
  // Use Supabase (recommended)
  dbModule = import("./supabase.js");
} else if (usePostgres) {
  // Use Postgres in production (Vercel)
  dbModule = import("./db-postgres.js");
} else {
  // Use SQLite in development
  dbModule = import("./db.js");
}

export async function getAllProducts() {
  const db = await dbModule;
  if (useSupabase) {
    return db.getAllProductsFromSupabase();
  } else if (usePostgres) {
    return db.getAllProductsFromPostgres();
  } else {
    return db.getAllProductsFromDB();
  }
}

export async function getProductById(id) {
  const db = await dbModule;
  if (useSupabase) {
    return db.getProductByIdFromSupabase(id);
  } else if (usePostgres) {
    return db.getProductByIdFromPostgres(id);
  } else {
    return db.getProductByIdFromDB(id);
  }
}

export async function saveProduct(productData) {
  const db = await dbModule;
  if (useSupabase) {
    return db.saveProductToSupabase(productData);
  } else if (usePostgres) {
    return db.saveProductToPostgres(productData);
  } else {
    return db.saveProductToDB(productData);
  }
}

export async function updateFeaturedStatus(productId, featured) {
  const db = await dbModule;
  if (useSupabase) {
    return db.updateFeaturedStatusSupabase(productId, featured);
  } else if (usePostgres) {
    return db.updateFeaturedStatusPostgres(productId, featured);
  } else {
    // For SQLite, we need to use full product update
    const product = await getProductById(productId);
    if (!product) throw new Error("Product not found");

    product.featured = featured;
    return db.saveProductToDB(product);
  }
}

export async function deleteProduct(id) {
  const db = await dbModule;
  if (useSupabase) {
    return db.deleteProductFromSupabase(id);
  } else if (usePostgres) {
    return db.deleteProductFromPostgres(id);
  } else {
    return db.deleteProductFromDB(id);
  }
}
