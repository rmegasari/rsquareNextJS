import { NextResponse } from "next/server";
import { updateFeaturedStatus, getAllProducts } from "@/lib/db-wrapper";
import { createClient } from "@supabase/supabase-js";
import { resolveAssetPath } from "@/lib/assetPaths";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * GET /api/products/featured
 * Optimized endpoint for featured products (only minimal fields)
 */
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // Optimized query: Only get featured and active products with minimal fields
    const { data: products, error } = await supabase
      .from("products")
      .select("id, judul, deskripsi_singkat, harga, gambar_thumbnail")
      .eq("featured", true)
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform products with resolved image paths
    const transformedProducts = products.map(product => ({
      id: product.id,
      judul: product.judul,
      deskripsi_singkat: product.deskripsi_singkat,
      harga: product.harga,
      gambar_thumbnail: resolveAssetPath(product.gambar_thumbnail),
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { productId, featured } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (typeof featured !== "boolean") {
      return NextResponse.json({ error: "Featured must be a boolean" }, { status: 400 });
    }

    // Validate: must have at least 1 featured product
    if (!featured) {
      const allProducts = await getAllProducts();
      const featuredCount = allProducts.filter((p) => p.featured).length;

      if (featuredCount <= 1) {
        return NextResponse.json(
          { error: "Minimal harus ada 1 produk unggulan!" },
          { status: 400 }
        );
      }
    }

    // Update featured status
    await updateFeaturedStatus(productId, featured);

    return NextResponse.json({
      success: true,
      message: `Featured status ${featured ? "diaktifkan" : "dinonaktifkan"}`,
    });
  } catch (error) {
    console.error("Error updating featured status:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate featured status", details: error.message },
      { status: 500 }
    );
  }
}
