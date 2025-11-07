import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role key if available, otherwise use anon key
// Note: With anon key, RLS policies must allow updates
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error("❌ No Supabase key found! Check your .env.local file");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey
);

/**
 * PATCH /api/products/reorder
 * Update order_number for multiple products based on drag-and-drop result
 */
export async function PATCH(request) {
  try {
    const { productIds } = await request.json();

    console.log("📋 Reorder request received:", {
      productIdsCount: productIds?.length,
      productIds: productIds
    });

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "productIds array is required" },
        { status: 400 }
      );
    }

    // Update each product individually with its new order_number
    console.log("🔄 Updating products with new order...");

    const updatePromises = productIds.map(async (id, index) => {
      const orderNumber = index + 1;
      const { error } = await supabase
        .from("products")
        .update({ order_number: orderNumber })
        .eq("id", id);

      if (error) {
        console.error(`❌ Error updating ${id}:`, error);
        throw error;
      }

      return { id, order_number: orderNumber };
    });

    try {
      await Promise.all(updatePromises);
      console.log("✅ All products reordered successfully");
    } catch (error) {
      console.error("❌ Supabase reorder error:", error);
      return NextResponse.json(
        { error: "Failed to update product order", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product order updated successfully",
      count: productIds.length
    });
  } catch (error) {
    console.error("❌ Reorder error:", error);
    return NextResponse.json(
      { error: "Failed to reorder products", details: error.message },
      { status: 500 }
    );
  }
}
