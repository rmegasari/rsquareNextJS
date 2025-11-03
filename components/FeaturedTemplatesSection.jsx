import CardStack from "@/components/CardStack";
import { getFeaturedProducts, getFreeProducts } from "@/lib/products";

export default async function FeaturedTemplatesSection() {
  const [featured, free] = await Promise.all([getFeaturedProducts(), getFreeProducts()]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold mb-4">
            Template Pilihan
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Dipilih khusus untuk mempercepat pekerjaan Kamu
          </h2>
          <p className="text-gray-600">
            Koleksi template yang paling banyak diunduh dan disukai pelanggan kami.
          </p>
        </div>

        <CardStack products={featured} label="★ Template Unggulan" />

        {free.length > 0 && (
          <div className="mt-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-600 font-semibold mb-4">
                Koleksi Gratis
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Coba Template Gratis dari RSQUARE
              </h3>
              <p className="text-gray-600">
                Mulai dengan template versi free untuk merasakan alur kerja RSQUARE.
              </p>
            </div>
            <CardStack products={free} label="GRATIS" ctaLabel="Ambil Template" />
          </div>
        )}
      </div>
    </section>
  );
}
