import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProductMetadataList } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProductMetadataList();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const product = await getProductById(params.slug);
  if (!product) {
    return {
      title: "Panduan Template Tidak Ditemukan",
    };
  }

  return {
    title: `Panduan Penggunaan ${product.judul}`,
    description:
      "Panduan langkah demi langkah untuk menyalin dan menggunakan template Google Sheets dari RSQUARE.",
    alternates: {
      canonical: `/instructions/${product.id}`,
    },
  };
}

function resolvePdfPath(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return `/${path.replace(/^\.?\//, "")}`;
}

export default async function InstructionsPage({ params }) {
  const product = await getProductById(params.slug);

  if (!product) {
    notFound();
  }

  const pdfPath =
    resolvePdfPath(product.detail?.file_panduan_pdf) ||
    resolvePdfPath(product.file_panduan_pdf);

  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-3xl space-y-12">
        <div className="text-center space-y-4" data-animate-on-scroll>
          <h1 className="text-4xl font-bold text-gray-800">Panduan Penggunaan Template</h1>
          <p className="text-lg text-gray-600">Terima kasih! Ikuti langkah mudah di bawah ini untuk memulai.</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center" data-animate-on-scroll>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              1. Download File Panduan {product.judul}
            </h2>
            <p className="text-gray-700 mb-6">
              Klik tombol di bawah ini untuk mengunduh file panduan. Di dalamnya terdapat link untuk menyalin template
              Google Sheets Kamu.
            </p>
            {pdfPath ? (
              <a
                href={pdfPath}
                download
                className="btn-primary btn-shiny inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-lg text-white"
              >
                Download Panduan
              </a>
            ) : (
              <p className="text-gray-500">
                File panduan belum tersedia untuk template ini. Silakan hubungi tim RSQUARE melalui halaman Kontak.
              </p>
            )}
          </div>

          <div className="space-y-8" data-animate-on-scroll>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">2. Buka File PDF &amp; Klik Link Akses</h2>
              <p className="text-gray-700 mb-6">
                Buka file PDF panduan yang baru saja Kamu download. Di dalam dokumen, Kamu akan menemukan halaman
                berjudul <b>&quot;Akses Template-nya di sini&quot;</b>. Klik link tersebut untuk membuka Google Sheets.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">3. Buat Salinan Template</h2>
              <p className="text-gray-700">
                Setelah template terbuka, klik menu <b>File → Make a copy</b> agar Kamu memiliki salinannya sendiri di
                Google Drive. Template siap digunakan!
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">4. Butuh Bantuan?</h2>
              <p className="text-gray-700">
                Jika Kamu mengalami kendala, hubungi kami melalui halaman{" "}
                <Link href="/kontak" className="text-orange-600 font-semibold hover:underline">
                  Kontak RSQUARE
                </Link>
                . Kami siap membantu pada hari dan jam kerja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
