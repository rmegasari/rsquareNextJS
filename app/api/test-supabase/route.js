import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Test endpoint to verify Supabase connection and data
 * Access: /api/test-supabase
 */
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Supabase credentials",
        env: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        }
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test 1: Get table structure
    const { data: columns, error: columnsError } = await supabase
      .rpc('get_columns', { table_name: 'products' })
      .catch(() => ({ data: null, error: { message: 'RPC not available - checking columns manually' } }));

    // Test 2: Count total products
    const { count: totalCount, error: countError } = await supabase
      .from("products")
      .select("*", { count: 'exact', head: true });

    // Test 3: Count active products
    const { count: activeCount, error: activeCountError } = await supabase
      .from("products")
      .select("*", { count: 'exact', head: true })
      .or("active.eq.true,active.is.null");

    // Test 4: Get sample products (with all filters like in production)
    const { data: sampleProducts, error: sampleError } = await supabase
      .from("products")
      .select("id, judul, active, order_number, created_at")
      .or("active.eq.true,active.is.null")
      .order("order_number", { ascending: true })
      .limit(5);

    // Test 5: Check if order_number column exists by trying to query it
    const { data: orderCheck, error: orderError } = await supabase
      .from("products")
      .select("order_number")
      .limit(1);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: {
        supabaseUrl: supabaseUrl,
        nodeEnv: process.env.NODE_ENV,
      },
      tests: {
        totalProducts: {
          success: !countError,
          count: totalCount,
          error: countError?.message,
        },
        activeProducts: {
          success: !activeCountError,
          count: activeCount,
          error: activeCountError?.message,
        },
        orderNumberColumn: {
          exists: !orderError,
          error: orderError?.message,
          code: orderError?.code,
        },
        sampleProducts: {
          success: !sampleError,
          count: sampleProducts?.length || 0,
          data: sampleProducts,
          error: sampleError?.message,
        },
      },
      recommendations: generateRecommendations({
        totalCount,
        activeCount,
        orderError,
        sampleError,
        sampleProducts,
      }),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 });
  }
}

function generateRecommendations({ totalCount, activeCount, orderError, sampleError, sampleProducts }) {
  const recommendations = [];

  if (totalCount === 0) {
    recommendations.push({
      issue: "No products in database",
      solution: "Add products to your Supabase products table",
      severity: "critical",
    });
  }

  if (activeCount === 0 && totalCount > 0) {
    recommendations.push({
      issue: "All products are inactive",
      solution: "Run: UPDATE products SET active = TRUE;",
      severity: "critical",
    });
  }

  if (orderError?.code === '42703') {
    recommendations.push({
      issue: "Column 'order_number' does not exist",
      solution: "Run the migration script: supabase-add-order-column.sql",
      severity: "high",
    });
  }

  if (sampleError) {
    recommendations.push({
      issue: `Query error: ${sampleError.message}`,
      solution: "Check Supabase table structure and permissions",
      severity: "high",
    });
  }

  if (sampleProducts && sampleProducts.length === 0 && totalCount > 0) {
    recommendations.push({
      issue: "Products exist but filter returns empty",
      solution: "Check active column values. Run: UPDATE products SET active = TRUE WHERE active IS NULL;",
      severity: "medium",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      issue: "No issues detected",
      solution: "Your Supabase setup looks good!",
      severity: "info",
    });
  }

  return recommendations;
}
