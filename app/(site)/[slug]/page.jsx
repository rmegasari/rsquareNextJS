import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getProductById, getProductMetadataList } from "@/lib/products";
import { resolveAssetPath } from "@/lib/assetPaths";
import ImageZoom from "@/components/ImageZoom";

marked.setOptions({ mangle: false, headerIds: false });

export async function generateStaticParams() {
  const products = await getProductMetadataList();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const product = await getProductById(params.slug);

  if (!product) {
    return {
      title: "Template Tidak Ditemukan",
    };
  }

  const description =
    product.seo?.meta_description ??
    product.detail?.deskripsi_lengkap ??
    product.deskripsi_singkat ??
    "Template Google Sheets premium dari RSQUARE.";

  const image = resolveAssetPath(
    product.detail?.gambar_utama || product.gambar_thumbnail || "/photos/RSQUARE-LOGO3.jpg",
  );

  return {
    title: product.seo?.meta_title ?? `${product.judul} - RSQUARE`,
    description,
    openGraph: {
      title: product.seo?.meta_title ?? product.judul,
      description,
      images: [{ url: image }],
      url: `/${product.id}`,
      type: "website",
    },
    alternates: {
      canonical: `/${product.id}`,
    },
  };
}

function formatPrice(price) {
  if (Number(price) === 0) {
    return "Gratis";
  }
  return `Rp ${Number(price).toLocaleString("id-ID")}`;
}

function PurchaseButtons({ product }) {
  const isFree = Number(product.harga) === 0;
  const paymentLink = product.detail?.payment_gateway;

  return (
    <div className="space-y-4">
      {/* Free Download Button - shown for all free products */}
      {isFree && (
        <Link
          href={`/instructions/${product.id}`}
          className="btn-primary btn-shiny flex items-center justify-center w-full px-8 py-3 rounded-lg font-semibold text-lg text-white"
        >
          Download Gratis
        </Link>
      )}

      {/* Payment Gateway Button - only for paid products */}
      {!isFree && paymentLink && (
        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-shiny flex items-center justify-center w-full px-8 py-3 rounded-lg font-semibold text-lg text-white"
        >
          Beli Langsung
        </a>
      )}

      {/* Purchase Links (Shopee, Tokopedia, etc) */}
      {product.detail?.link_pembelian?.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center w-full px-8 py-3 rounded-lg font-semibold"
        >
          Akses di {link.platform}
        </a>
      ))}

      <Link
        href={`/preview/${product.id}`}
        className="btn-secondary flex items-center justify-center w-full px-8 py-3 rounded-lg font-semibold"
      >
        Lihat Preview Detail
      </Link>
    </div>
  );
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductById(params.slug);

  if (!product) {
    notFound();
  }

  const mainImage = resolveAssetPath(product.detail?.gambar_utama || product.gambar_thumbnail);
  const descriptionHTML = product.detail?.deskripsi_lengkap
    ? marked.parse(product.detail.deskripsi_lengkap)
    : "";

  return (
    <div className="py-20 px-6 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full">
              {mainImage ? (
                <ImageZoom
                  src={mainImage}
                  alt={`Tampilan Utama ${product.judul}`}
                  width={960}
                  height={720}
                  className="relative w-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-orange-100 dark:ring-orange-900/50"
                />
              ) : (
                <div className="card rounded-xl p-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Gambar utama belum tersedia.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4 gradient-text pb-2">{product.judul}</h1>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{formatPrice(product.harga)}</p>
            {descriptionHTML ? (
              <div
                className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: descriptionHTML }}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 mb-8">{product.deskripsi_singkat}</p>
            )}
            <PurchaseButtons product={product} />
          </div>
        </div>

        
      </div>
    </div>
  );
}
