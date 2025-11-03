import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Masukan & Testimoni",
  description:
    "Bagikan pengalaman Kamu menggunakan template RSQUARE. Masukan Kamu membantu kami terus berkembang.",
};

export default async function FeedbackPage() {
  const products = await getAllProducts();

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <header className="text-center mb-12" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">
            Formulir Masukan &amp; Testimoni
          </h1>
          <p className="text-lg text-gray-600">
            Kami sangat menghargai waktu Kamu untuk membantu kami berkembang. Setiap masukan sangat berharga!
          </p>
        </header>

        <div className="card p-8 md:p-10 rounded-2xl" data-animate-on-scroll>
          <form name="feedback" method="POST" data-netlify="true" className="space-y-8">
            <input type="hidden" name="form-name" value="feedback" />
            <p className="hidden">
              <label>
                Jangan diisi: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label htmlFor="template-digunakan" className="block text-sm font-medium text-gray-700 mb-2">
                Template RSQUARE mana yang Kamu gunakan?
              </label>
              <select
                id="template-digunakan"
                name="template_digunakan"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">-- Pilih Template --</option>
                {products.map((product) => (
                  <option value={product.judul} key={product.id}>
                    {product.judul}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Nilai pengalaman Kamu (1-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="hal-dibantu" className="block text-sm font-medium text-gray-700 mb-2">
                Fitur atau manfaat apa yang paling membantu Kamu?
              </label>
              <textarea
                id="hal-dibantu"
                name="hal_dibantu"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="saran" className="block text-sm font-medium text-gray-700 mb-2">
                Masukan atau saran untuk perbaikan kami
              </label>
              <textarea
                id="saran"
                name="saran"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="izin-testimoni" className="block text-sm font-medium text-gray-700 mb-2">
                Apakah Kamu bersedia jika kami menampilkan testimoni ini?
              </label>
              <select
                id="izin-testimoni"
                name="izin_testimoni"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Boleh, tampilkan nama & testimoni saya">Boleh, tampilkan nama &amp; testimoni saya</option>
                <option value="Boleh, tapi anonim saja">Boleh, tapi anonim saja</option>
                <option value="Tidak perlu ditampilkan">Tidak perlu ditampilkan</option>
              </select>
            </div>

            <button type="submit" className="btn-primary btn-shiny w-full px-6 py-3 rounded-lg font-semibold text-white">
              Kirim Masukan
            </button>
            <p className="text-sm text-gray-500 text-center">
              Terima kasih sudah membantu kami menciptakan template yang lebih baik.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
