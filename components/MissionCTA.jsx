import Image from "next/image";
import Link from "next/link";

export default function MissionCTA() {
  return (
    <section id="mission-cta" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl" data-animate-on-scroll>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: Misi RSQUARE */}
          <div className="card rounded-xl overflow-hidden flex flex-col">
            <div className="relative w-full aspect-video bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
              <Image
                src="/photos/RSQUARE-LOGO2.png"
                alt="Logo RSQUARE"
                width={180}
                height={180}
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Misi Kami: <span className="gradient-text">Produktivitas untuk Semua</span>
              </h2>
              <p className="text-gray-600 flex-1">
                RSQUARE lahir dari keyakinan bahwa setiap orang berhak memiliki akses ke alat yang kuat dan intuitif.
                Kami mengubah spreadsheet kompleks menjadi solusi elegan yang siap pakai untuk kesuksesan Kamu.
              </p>
              <div className="mt-6">
                <Link href="/templates" className="btn-secondary text-center px-6 py-2 rounded-lg font-semibold block">
                  Lihat Template Kami
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Request Template Khusus */}
          <div className="card rounded-xl overflow-hidden flex flex-col">
            <div className="relative w-full aspect-video bg-gray-800">
              <Image
                src="/Spreadsheets-bro.png"
                alt="Ilustrasi Kustomisasi Template"
                fill
                className="object-cover opacity-20"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <div className="text-5xl mb-3">🛠️</div>
                  <h3 className="text-2xl font-bold">Template Khusus</h3>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Butuh Sesuatu yang Dibuat Khusus?</h2>
              <p className="text-gray-600 flex-1">
                Jika alur kerja Kamu unik, kami siap membuatkan template dari nol yang dirancang sempurna untuk bisnis Kamu. Tim kami akan membantu mewujudkan solusi spreadsheet impian Kamu.
              </p>
              <div className="mt-6">
                <Link href="/jasa-kustom" className="btn-primary btn-shiny text-center px-6 py-2 rounded-lg font-semibold text-white block">
                  📨 Request Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
