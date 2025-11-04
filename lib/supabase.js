import { createClient } from "@supabase/supabase-js";
import { resolveAssetPath } from "./assetPaths";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase credentials not found. Using SQLite fallback.");
}

// Create Supabase client (only if credentials are available)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};

/**
 * Get all products from Supabase
 */
export async function getAllProductsFromSupabase() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Fetch related data for each product
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const [detailsRes, linksRes, galleryRes, seoRes] = await Promise.all([
          supabase.from("product_details").select("*").eq("product_id", product.id).single(),
          supabase.from("product_links").select("platform, url").eq("product_id", product.id),
          supabase
            .from("product_gallery")
            .select("judul, deskripsi, gambar")
            .eq("product_id", product.id)
            .order("sort_order"),
          supabase.from("product_seo").select("meta_title, meta_description").eq("product_id", product.id).single(),
        ]);

        const detail = detailsRes.data;

        return {
          id: product.id,
          judul: product.judul,
          deskripsi_singkat: product.deskripsi_singkat,
          harga: product.harga,
          gambar_thumbnail: resolveAssetPath(product.gambar_thumbnail),
          featured: Boolean(product.featured),
          detail: detail
            ? {
                gambar_utama: resolveAssetPath(detail.gambar_utama),
                deskripsi_lengkap: detail.deskripsi_lengkap,
                link_preview_detail: detail.link_preview_detail,
                payment_gateway: detail.link_payment_gateway,
                link_youtube: detail.link_youtube,
                file_panduan_pdf: detail.file_panduan,
                link_pembelian: linksRes.data || [],
                galeri: (galleryRes.data || []).map(item => ({
                  ...item,
                  gambar: resolveAssetPath(item.gambar)
                })),
              }
            : null,
          seo: seoRes.data || null,
        };
      })
    );

    return productsWithDetails;
  } catch (error) {
    console.error("Error fetching products from Supabase:", error);
    throw error;
  }
}

/**
 * Get product by ID from Supabase
 */
export async function getProductByIdFromSupabase(id) {
  try {
    const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw error;
    }

    const [detailsRes, linksRes, galleryRes, seoRes] = await Promise.all([
      supabase.from("product_details").select("*").eq("product_id", id).single(),
      supabase.from("product_links").select("platform, url").eq("product_id", id),
      supabase.from("product_gallery").select("judul, deskripsi, gambar").eq("product_id", id).order("sort_order"),
      supabase.from("product_seo").select("meta_title, meta_description").eq("product_id", id).single(),
    ]);

    const detail = detailsRes.data;

    return {
      id: product.id,
      judul: product.judul,
      deskripsi_singkat: product.deskripsi_singkat,
      harga: product.harga,
      gambar_thumbnail: resolveAssetPath(product.gambar_thumbnail),
      featured: Boolean(product.featured),
      detail: detail
        ? {
            gambar_utama: resolveAssetPath(detail.gambar_utama),
            deskripsi_lengkap: detail.deskripsi_lengkap,
            link_preview_detail: detail.link_preview_detail,
            payment_gateway: detail.link_payment_gateway,
            link_youtube: detail.link_youtube,
            file_panduan_pdf: detail.file_panduan,
            link_pembelian: linksRes.data || [],
            galeri: (galleryRes.data || []).map(item => ({
              ...item,
              gambar: resolveAssetPath(item.gambar)
            })),
          }
        : null,
      seo: seoRes.data || null,
    };
  } catch (error) {
    console.error("Error fetching product from Supabase:", error);
    throw error;
  }
}

/**
 * Save product to Supabase
 */
export async function saveProductToSupabase(productData) {
  try {
    // Upsert main product
    const { error: productError } = await supabase.from("products").upsert({
      id: productData.id,
      judul: productData.judul,
      deskripsi_singkat: productData.deskripsi_singkat,
      harga: productData.harga,
      gambar_thumbnail: productData.gambar_thumbnail,
      featured: productData.featured || false,
      updated_at: new Date().toISOString(),
    });

    if (productError) throw productError;

    // Delete existing related data
    await Promise.all([
      supabase.from("product_details").delete().eq("product_id", productData.id),
      supabase.from("product_links").delete().eq("product_id", productData.id),
      supabase.from("product_gallery").delete().eq("product_id", productData.id),
      supabase.from("product_seo").delete().eq("product_id", productData.id),
    ]);

    // Insert product details
    if (productData.detail) {
      const { error: detailError } = await supabase.from("product_details").insert({
        product_id: productData.id,
        gambar_utama: productData.detail.gambar_utama || null,
        deskripsi_lengkap: productData.detail.deskripsi_lengkap || null,
        link_preview_detail: productData.detail.link_preview_detail || null,
        link_payment_gateway: productData.detail.payment_gateway || null,
        link_youtube: productData.detail.link_youtube || null,
        file_panduan: productData.detail.file_panduan_pdf || null,
      });

      if (detailError) throw detailError;

      // Insert links
      if (productData.detail.link_pembelian && productData.detail.link_pembelian.length > 0) {
        const links = productData.detail.link_pembelian.map((link) => ({
          product_id: productData.id,
          platform: link.platform,
          url: link.url,
        }));

        const { error: linksError } = await supabase.from("product_links").insert(links);
        if (linksError) throw linksError;
      }

      // Insert gallery
      if (productData.detail.galeri && productData.detail.galeri.length > 0) {
        const gallery = productData.detail.galeri.map((item, index) => ({
          product_id: productData.id,
          judul: item.judul,
          deskripsi: item.deskripsi || null,
          gambar: item.gambar,
          sort_order: index,
        }));

        const { error: galleryError } = await supabase.from("product_gallery").insert(gallery);
        if (galleryError) throw galleryError;
      }
    }

    // Insert SEO
    if (productData.seo) {
      const { error: seoError } = await supabase.from("product_seo").insert({
        product_id: productData.id,
        meta_title: productData.seo.meta_title || null,
        meta_description: productData.seo.meta_description || null,
      });

      if (seoError) throw seoError;
    }

    return true;
  } catch (error) {
    console.error("Error saving product to Supabase:", error);
    throw error;
  }
}

/**
 * Update featured status in Supabase
 */
export async function updateFeaturedStatusSupabase(productId, featured) {
  try {
    const { error } = await supabase
      .from("products")
      .update({ featured, updated_at: new Date().toISOString() })
      .eq("id", productId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating featured status in Supabase:", error);
    throw error;
  }
}

/**
 * Delete product from Supabase
 */
export async function deleteProductFromSupabase(id) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting product from Supabase:", error);
    throw error;
  }
}
