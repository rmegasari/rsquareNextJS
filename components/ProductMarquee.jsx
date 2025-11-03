import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import { resolveAssetPath } from "@/lib/assetPaths";

function buildImageList(products) {
  return products
    .map((product) => {
      const primary =
        product.detail?.gambar_utama || product.gambar_thumbnail || null;
      if (!primary) {
        return null;
      }

      return {
        src: resolveAssetPath(primary),
        alt: product.judul,
      };
    })
    .filter(Boolean);
}

export default async function ProductMarquee() {
  const products = await getAllProducts();
  const images = buildImageList(products);
  const duplicated = [...images, ...images];

  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="text-center mb-12" data-animate-on-scroll>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Desain yang Hidup &amp; Fungsional</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
          Lihat beberapa contoh template kami dalam aksi.
        </p>
      </div>

      <div className="marquee mb-8">
        <div className="marquee-content scroll-left">
          {duplicated.map((image, index) => (
            <div className="marquee-item" key={`left-${index}-${image.src}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={320}
                height={200}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-content scroll-right">
          {duplicated.map((image, index) => (
            <div className="marquee-item" key={`right-${index}-${image.src}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={320}
                height={200}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
