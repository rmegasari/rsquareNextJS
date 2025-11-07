import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resolveAssetPath } from "@/lib/assetPaths";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * GET /api/products/free
 * Optimized endpoint for free products (only minimal fields)
 */
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // Optimized query: Only get free and active products with minimal fields
    const { data: products, error } = await supabase
      .from("products")
      .select("id, judul, deskripsi_singkat, harga, gambar_thumbnail")
      .eq("harga", 0)
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
    console.error("Error fetching free products:", error);
    return NextResponse.json(
      { error: "Failed to fetch free products", details: error.message },
      { status: 500 }
    );
  }
}
