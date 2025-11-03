import Image from "next/image";

const missionSteps = [
  {
    title: "Fungsionalitas yang Maksimal",
    description:
      "Setiap template dirancang untuk menyelesaikan masalah nyata dengan alur kerja yang jelas dan solusi otomatis yang membantu Kamu fokus pada hal penting.",
  },
  {
    title: "Desain yang Intuitif",
    description:
      "Kami percaya bahwa alat produktivitas harus mudah digunakan. Itu sebabnya setiap template hadir dengan tampilan bersih dan panduan lengkap.",
  },
  {
    title: "Pembaruan Berkelanjutan",
    description:
      "Kami terus mendengarkan kebutuhan komunitas dan memperbarui koleksi agar tetap relevan dengan tuntutan bisnis digital saat ini.",
  },
];

const coreValues = [
  {
    title: "Empati dalam Desain",
    description:
      "Kami memulai dengan memahami rasa frustrasi pengguna. Template kami adalah jawaban dari masalah riil yang dialami kreator, pelaku UMKM, dan tim kecil.",
  },
  {
    title: "Simplifikasi yang Cerdas",
    description:
      "Teknologi seharusnya membuat hidup lebih mudah. Kami menggabungkan formula dan Google Apps Script untuk mempercepat proses tanpa membuatnya rumit.",
  },
  {
    title: "Dukungan yang Tulus",
    description:
      "Setiap template dilengkapi panduan jelas, dan kami siap membantu saat Kamu membutuhkan bantuan tambahan.",
  },
];

export const metadata = {
  title: "Tentang Kami",
  description: "Kenali perjalanan RSQUARE dan alasan kami membangun template Google Sheets yang intuitif dan cerdas.",
};

export default function TentangKamiPage() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        <header className="text-center space-y-4" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">Perjalanan Kami</h1>
          <p className="text-lg text-gray-600">
            Lebih dari sekadar template, ini adalah tentang semangat untuk memberdayakan produktivitas.
          </p>
        </header>

        <section className="flex flex-col md:flex-row items-center gap-12" data-animate-on-scroll>
          <div className="md:w-1/3">
            <Image
              src="/photos/RSQUARE-LOGO2.png"
              alt="Logo RSQUARE"
              width={400}
              height={400}
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Dimulai dari Satu Kebutuhan</h2>
            <p className="text-gray-600 leading-relaxed">
              RSQUARE lahir dari pengalaman pribadi—frustrasi dalam mengelola data yang berantakan dan kebutuhan akan
              sebuah sistem yang sederhana namun kuat. Kami percaya bahwa alat yang baik seharusnya bekerja untuk Kamu,
              bukan sebaliknya. Dari keyakinan itulah, template pertama kami lahir.
            </p>
          </div>
        </section>

        <section className="space-y-12" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Misi Kami dalam Tiga Langkah</h2>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-orange-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {missionSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-5/12">
                    <div className="card p-6 rounded-xl">
                      <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex md:w-2/12 justify-center">
                    <div className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:w-5/12 text-gray-500 leading-relaxed">
                    <p>
                      Kami menggunakan pendekatan kolaboratif dengan pengguna untuk memastikan setiap template terasa
                      seperti asisten pribadi yang memahami alur kerja Kamu.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Nilai yang Kami Pegang</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <div className="card p-6 rounded-xl space-y-3" key={value.title}>
                <h3 className="font-semibold text-xl text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-10 rounded-2xl text-center space-y-4" data-animate-on-scroll>
          <h2 className="text-3xl font-bold text-gray-800">Terima Kasih Telah Menjadi Bagian dari Cerita Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            Setiap template yang kami buat adalah hasil diskusi, eksperimen, dan semangat komunitas produktivitas di
            Indonesia. Kami sangat berterima kasih atas dukungan Kamu dan tidak sabar untuk melihat bagaimana template
            kami membantu Kamu bertumbuh.
          </p>
        </section>
      </div>
    </div>
  );
}
