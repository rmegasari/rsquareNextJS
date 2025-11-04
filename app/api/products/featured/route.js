import { NextResponse } from "next/server";
import { updateFeaturedStatus, getAllProducts } from "@/lib/db-wrapper";

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
