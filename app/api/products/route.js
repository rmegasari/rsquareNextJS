import { getAllProducts, saveProduct } from "@/lib/db-wrapper";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Check if request wants to include inactive products (for admin)
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("includeInactive") === "true";

    const products = await getAllProducts(includeInactive);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const productData = await request.json();

    // Validasi data
    if (!productData.id || !productData.judul) {
      return NextResponse.json(
        { error: "ID dan Judul wajib diisi" },
        { status: 400 }
      );
    }

    // Simpan ke database (auto-switch: Supabase > Postgres > SQLite)
    await saveProduct(productData);

    return NextResponse.json({
      success: true,
      message: "Template berhasil disimpan",
      productId: productData.id,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan template", details: error.message },
      { status: 500 }
    );
  }
}
