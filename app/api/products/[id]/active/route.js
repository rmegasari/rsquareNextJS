import { updateActiveStatus } from "@/lib/db-wrapper";
import { NextResponse } from "next/server";

/**
 * PATCH /api/products/[id]/active
 * Toggle active status for a product
 */
export async function PATCH(request, { params }) {
  try {
    const { active } = await request.json();

    if (typeof active !== "boolean") {
      return NextResponse.json(
        { error: "Invalid active status. Must be boolean." },
        { status: 400 }
      );
    }

    await updateActiveStatus(params.id, active);

    return NextResponse.json({
      success: true,
      message: active ? "Template diaktifkan" : "Template dinonaktifkan",
      active,
    });
  } catch (error) {
    console.error("Error updating active status:", error);
    return NextResponse.json(
      { error: "Gagal mengubah status aktif", details: error.message },
      { status: 500 }
    );
  }
}
