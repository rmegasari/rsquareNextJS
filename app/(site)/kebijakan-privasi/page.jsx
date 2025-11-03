export const metadata = {
  title: "Kebijakan Privasi",
  description:
    "Pelajari bagaimana RSQUARE mengumpulkan, menggunakan, dan melindungi data pribadi Kamu. Kami berkomitmen untuk menjaga privasi dan keamanan semua pengunjung kami.",
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-16" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text pb-2">Kebijakan Privasi</h1>
          <p className="text-lg text-gray-500">Privasi Kamu penting bagi kami. Terakhir diperbarui: 17 Juli 2025</p>
        </header>

        <div className="content-area" data-animate-on-scroll>
          <h2>Pendahuluan</h2>
          <p>
            Selamat datang di RSQUARE. Kami menghargai privasi Kamu dan berkomitmen untuk melindungi data pribadi Kamu.
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang
            Kamu berikan saat menggunakan situs web kami.
          </p>

          <h2>Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi melalui cara-cara berikut:</p>
          <ul>
            <li>
              <b>Informasi yang Kamu Berikan Langsung:</b> Saat Kamu mengisi formulir kontak, kami akan mengumpulkan nama
              dan alamat email Kamu agar kami dapat merespons pertanyaan Kamu.
            </li>
            <li>
              <b>Data Penggunaan Otomatis:</b> Seperti kebanyakan situs web, kami mungkin mengumpulkan data non-pribadi
              secara otomatis, seperti jenis browser, alamat IP, dan halaman yang Kamu kunjungi, untuk membantu kami
              memahami bagaimana pengunjung menggunakan situs kami dan untuk meningkatkan layanan kami.
            </li>
          </ul>

          <h2>Bagaimana Kami Menggunakan Informasi Kamu</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
          <ul>
            <li>Untuk berkomunikasi dengan Kamu dan menjawab pertanyaan yang Kamu ajukan melalui formulir kontak.</li>
            <li>Untuk menganalisis dan meningkatkan pengalaman pengguna di situs web kami.</li>
            <li>Untuk menjaga keamanan situs web kami.</li>
          </ul>

          <h2>Tautan ke Situs Pihak Ketiga</h2>
          <p>
            Website kami berisi tautan ke situs pihak ketiga untuk proses pembelian produk. Saat Kamu mengklik tautan
            tersebut dan melakukan transaksi, data pribadi dan pembayaran Kamu akan diatur oleh kebijakan privasi dari
            platform pihak ketiga tersebut. Kami tidak mengumpulkan atau menyimpan informasi kartu kredit atau detail
            pembayaran Kamu. Kami menganjurkan Kamu untuk membaca kebijakan privasi mereka.
          </p>
        </div>
      </div>
    </div>
  );
}
