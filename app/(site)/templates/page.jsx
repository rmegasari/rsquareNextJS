import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { resolveAssetPath } from "@/lib/assetPaths";

export const metadata = {
  title: "Koleksi Template Google Sheets",
  description:
    "Eksplor semua template Google Sheets premium dari RSQUARE. Pilih template terbaik sesuai kebutuhan bisnis, event, atau produktivitas pribadi Kamu.",
};

// Force dynamic rendering to always fetch fresh data from database
// This ensures active/inactive status changes are reflected immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function formatPrice(price) {
  if (Number(price) === 0) {
    return "Gratis";
  }
  return `Rp ${Number(price).toLocaleString("id-ID")}`;
}

export default async function TemplatesPage() {
  const products = await getAllProducts();

  return (
    <div className="py-20 px-6 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4" data-animate-on-scroll>
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold">
            Koleksi Lengkap
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Template Google Sheets untuk Berbagai Kebutuhan</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Semua template dilengkapi automasi dan panduan yang jelas. Pilih kategori favorit Kamu dan mulai gunakan
            dalam hitungan menit.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-animate-on-scroll>
          {products.map((product) => {
            const imageSrc = resolveAssetPath(
              product.gambar_thumbnail || product.detail?.gambar_utama || "/photos/RSQUARE-LOGO.png",
            );
            return (
              <div className="card rounded-xl overflow-hidden flex flex-col" key={product.id}>
                <div className="relative w-full aspect-video bg-gray-50 dark:bg-gray-800">
                  <Image
                    src={imageSrc}
                    alt={product.judul}
                    fill
                    className="object-contain p-4"
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, 100vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{product.judul}</h2>
                  <p className="text-gray-600 dark:text-gray-300 flex-1">{product.deskripsi_singkat}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">{formatPrice(product.harga)}</p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link href={`/${product.id}`} className="btn-secondary text-center px-6 py-2 rounded-lg font-semibold">
                      Lihat Detail
                    </Link>
                    <Link href={`/preview/${product.id}`} className="btn-primary btn-shiny text-center px-6 py-2 rounded-lg font-semibold text-white">
                      Lihat Preview
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center space-y-4" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Butuh Template yang Sepenuhnya Kustom?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tim kami siap membantu membangun template yang disesuaikan dengan kebutuhan unik Kamu. Ceritakan alur kerja
            Kamu dan kami akan buatkan solusinya.
          </p>
          <Link href="/jasa-kustom" className="btn-dark inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white">
            🛠️ Request Template Khusus
          </Link>
        </div>
      </div>
    </div>
  );
}
