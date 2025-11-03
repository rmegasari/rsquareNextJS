export const metadata = {
  title: "Jasa Template Kustom",
  description:
    "Butuh solusi yang dibuat khusus? Pesan jasa template Google Sheets kustom dari RSQUARE yang dirancang sempurna untuk alur kerja unik Kamu atau bisnis Kamu.",
};

export default function JasaKustomPage() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-3xl space-y-12">
        <header className="text-center space-y-4" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">
            Formulir Permintaan Template Kustom
          </h1>
          <p className="text-lg text-gray-600">
            Isi formulir di bawah ini dengan detail kebutuhan Kamu, dan kami akan segera menghubungi Kamu kembali.
          </p>
        </header>

        <div className="mb-8 p-6 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 space-y-4" data-animate-on-scroll>
          <div>
            <h3 className="font-bold text-lg">💡 Harap Dibaca Sebelum Mengisi</h3>
          </div>
          <div>
            <h4 className="font-semibold">Harga &amp; Waktu Pengerjaan</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>
                Setiap template kustom adalah sebuah investasi. Harga pengerjaan mulai dari{" "}
                <b>Rp 250.000,-</b> tergantung tingkat kerumitan.
              </li>
              <li>Proses pengerjaan normalnya memakan waktu 7-14 hari kerja setelah detail disetujui.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Disclaimer Penting</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>
                <b>Hak untuk Menolak:</b> Kami berhak menolak permintaan template kustom jika proyek berada di luar
                cakupan keahlian kami atau tidak sesuai dengan jadwal.
              </li>
              <li>
                <b>Penggunaan Etis:</b> Kamu setuju untuk menggunakan template sesuai hukum dan etika bisnis, tanpa pelanggaran hak cipta.
              </li>
              <li>
                <b>Revisi:</b> Paket standar mencakup 1–2 ronde revisi minor. Revisi besar dapat memerlukan biaya tambahan.
              </li>
            </ul>
          </div>
        </div>

        <div className="card p-8 md:p-10 rounded-2xl" data-animate-on-scroll>
          <form name="jasa-kustom" method="POST" data-netlify="true" className="space-y-8">
            <input type="hidden" name="form-name" value="jasa-kustom" />
            <p className="hidden">
              <label>
                Jangan diisi: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kamu
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Aktif
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="jenis-bisnis" className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Bisnis / Aktivitas Kamu
              </label>
              <input
                type="text"
                id="jenis-bisnis"
                name="jenis_bisnis"
                placeholder="Contoh: Agency Marketing, UMKM F&B, Freelance Designer, dll."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="kendala" className="block text-sm font-medium text-gray-700 mb-2">
                Kendala utama yang ingin diselesaikan
              </label>
              <textarea
                id="kendala"
                name="kendala"
                rows={4}
                placeholder="Ceritakan proses manual atau masalah yang ingin Kamu otomasi dengan template."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="fitur" className="block text-sm font-medium text-gray-700 mb-2">
                Fitur yang Kamu inginkan
              </label>
              <textarea
                id="fitur"
                name="fitur"
                rows={4}
                placeholder="Contoh: Dashboard ringkas, laporan otomatis, integrasi dengan Google Calendar, dll."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                  Target waktu selesai
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Kisaran budget (opsional)
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  placeholder="Contoh: Rp 300.000 - Rp 500.000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contoh" className="block text-sm font-medium text-gray-700 mb-2">
                Ada referensi atau contoh template?
              </label>
              <textarea
                id="contoh"
                name="contoh"
                rows={3}
                placeholder="Boleh sertakan link atau deskripsi template yang Kamu sukai."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button type="submit" className="btn-primary btn-shiny w-full px-6 py-3 rounded-lg font-semibold text-white">
              Kirim Permintaan
            </button>
            <p className="text-sm text-gray-500 text-center">
              Kami akan menghubungi Kamu dalam 1×24 jam kerja untuk diskusi lebih lanjut.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
