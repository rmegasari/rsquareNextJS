export const metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan situs web dan produk RSQUARE. Harap baca sebelum menggunakan layanan kami.",
};

export default function SyaratKetentuanPage() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-16" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text pb-2">Syarat &amp; Ketentuan</h1>
          <p className="text-lg text-gray-500">
            Harap baca dengan saksama sebelum menggunakan situs web atau membeli produk kami.
          </p>
        </header>

        <div className="content-area" data-animate-on-scroll>
          <h2>1. Pendahuluan</h2>
          <p>
            Dengan mengakses situs web ini dan/atau membeli produk dari RSQUARE (&quot;kami&quot;), Kamu setuju untuk
            terikat oleh Syarat dan Ketentuan ini. Jika Kamu tidak setuju dengan bagian mana pun dari persyaratan ini,
            Kamu tidak diizinkan untuk menggunakan situs web atau produk kami.
          </p>

          <h2>2. Lisensi Penggunaan &amp; Batasan Tegas</h2>
          <p>
            Saat Kamu membeli template, Kamu mendapatkan lisensi untuk satu orang (pembeli) yang tidak dapat
            dipindahtangankan. Lisensi ini mengizinkan Kamu untuk menggunakan template untuk keperluan pribadi atau
            bisnis Kamu sendiri. Namun, Kamu dilarang keras untuk:
          </p>
          <ul>
            <li>
              <b>Menjual kembali, menyewakan, meminjamkan, atau mendistribusikan ulang</b> template atau turunannya dalam
              bentuk apa pun, baik gratis maupun berbayar.
            </li>
            <li>
              <b>Membagikan</b> tautan template atau file PDF berisi link kepada orang lain. Setiap lisensi hanya untuk
              satu pengguna.
            </li>
            <li>
              <b>Menghapus atau mengubah</b> merek atau nama RSQUARE pada template untuk diklaim sebagai karya Kamu
              sendiri.
            </li>
            <li>
              <b>Menggunakan</b> bagian dari desain atau formula kami untuk membuat produk saingan.
            </li>
          </ul>

          <h2>3. Pelanggaran dan Konsekuensi</h2>
          <p>
            Pelanggaran terhadap batasan lisensi di atas dianggap sebagai pelanggaran hak cipta. Kami memantau penyebaran
            ilegal dari produk digital kami. Jika terbukti terjadi pelanggaran, kami berhak untuk{" "}
            <b>mencabut lisensi penggunaan Kamu secara permanen tanpa pengembalian dana</b> dan mengambil tindakan hukum
            yang diperlukan untuk melindungi kekayaan intelektual kami.
          </p>
        </div>
      </div>
    </div>
  );
}
