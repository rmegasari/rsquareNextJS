import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getProductById, getProductMetadataList } from "@/lib/products";
import { resolveAssetPath } from "@/lib/assetPaths";
import ImageZoom from "@/components/ImageZoom";

marked.setOptions({ mangle: false, headerIds: false });

// Force dynamic rendering to check active status in real-time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  const products = await getProductMetadataList();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const product = await getProductById(params.slug);
  if (!product) {
    return {
      title: "Preview Template Tidak Ditemukan",
    };
  }

  const description =
    product.seo?.meta_description ?? product.deskripsi_singkat ?? "Preview template RSQUARE.";

  const image = resolveAssetPath(
    product.detail?.gambar_utama || product.gambar_thumbnail || "/photos/RSQUARE-LOGO3.jpg",
  );

  return {
    title: `Preview: ${product.seo?.meta_title ?? product.judul}`,
    description,
    openGraph: {
      title: `Preview: ${product.judul}`,
      description,
      images: [{ url: image }],
      url: `/preview/${product.id}`,
      type: "article",
    },
    alternates: {
      canonical: `/preview/${product.id}`,
    },
  };
}

function formatPrice(price) {
  if (Number(price) === 0) {
    return "Gratis";
  }
  return `Rp ${Number(price).toLocaleString("id-ID")}`;
}

export default async function ProductPreviewPage({ params }) {
  const product = await getProductById(params.slug);

  if (!product) {
    notFound();
  }

  const descriptionHTML = product.detail?.deskripsi_lengkap
    ? marked.parse(product.detail.deskripsi_lengkap)
    : "";

  return (
    <div className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 md:p-12" data-animate-on-scroll>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            {product.judul}
          </h1>
          <p className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 font-bold text-xl px-6 py-2 rounded-full shadow-sm">
            {formatPrice(product.harga)}
          </p>
          {descriptionHTML ? (
            <div
              className="max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />
          ) : (
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{product.deskripsi_singkat}</p>
          )}
        </header>

        {/* Gallery Section - Single Column Layout */}
        <section className="space-y-12" data-animate-on-scroll>
          {product.detail?.galeri?.map((item) => {
            const galleryHTML = item.deskripsi ? marked.parse(item.deskripsi) : "";
            return (
              <div className="space-y-6" key={item.judul}>
                {/* Image Container */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                  <ImageZoom
                    src={resolveAssetPath(item.gambar)}
                    alt={item.judul}
                    width={960}
                    height={720}
                    className="relative w-full bg-white dark:bg-gray-800"
                  />
                </div>
                {/* Text Content - Outside Image Container */}
                <div className="space-y-3 px-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{item.judul}</h2>
                  {galleryHTML ? (
                    <div
                      className="space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: galleryHTML }}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{item.deskripsi}</p>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Video Section */}
        {product.detail?.link_youtube && (
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden" data-animate-on-scroll>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={product.detail.link_youtube}
                title={`Tutorial ${product.judul}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 md:p-12" data-animate-on-scroll>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Siap Meningkatkan Produktivitas?</h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Dapatkan template ini sekarang melalui salah satu tautan di bawah.
          </p>
          <div className="max-w-md mx-auto space-y-3">
            <Link
              href={`/${product.id}`}
              className="btn-secondary flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold"
            >
              ← Kembali ke Ringkasan
            </Link>

            {/* Free Download Button - shown for all free products */}
            {Number(product.harga) === 0 && (
              <Link
                href={`/instructions/${product.id}`}
                className="btn-primary btn-shiny flex items-center justify-center w-full px-8 py-3 rounded-lg font-semibold text-lg text-white"
              >
                Download Gratis
              </Link>
            )}

            {product.detail?.link_pembelian?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-shiny flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold text-white"
              >
                Akses di {link.platform}
              </a>
            ))}
            <Link
              href="/templates"
              className="btn-secondary flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold"
            >
              Lihat Semua Template →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
