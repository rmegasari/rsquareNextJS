"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTemplatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    judul: "",
    deskripsi_singkat: "",
    harga: "0",
    featured: false,
    gambar_thumbnail: "",
    detail: {
      gambar_utama: "",
      deskripsi_lengkap: "",
      link_preview_detail: "",
      file_panduan_pdf: "",
      payment_gateway: "",
      link_pembelian: [],
      galeri: [],
    },
    seo: {
      meta_title: "",
      meta_description: "",
    },
  });

  const [linkPembelian, setLinkPembelian] = useState({ platform: "", url: "" });
  const [galeriItem, setGaleriItem] = useState({ judul: "", deskripsi: "", gambar: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("detail.")) {
      const fieldName = name.replace("detail.", "");
      setFormData({
        ...formData,
        detail: { ...formData.detail, [fieldName]: value },
      });
    } else if (name.startsWith("seo.")) {
      const fieldName = name.replace("seo.", "");
      setFormData({
        ...formData,
        seo: { ...formData.seo, [fieldName]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleAddLinkPembelian = () => {
    if (linkPembelian.platform && linkPembelian.url) {
      setFormData({
        ...formData,
        detail: {
          ...formData.detail,
          link_pembelian: [...formData.detail.link_pembelian, linkPembelian],
        },
      });
      setLinkPembelian({ platform: "", url: "" });
    }
  };

  const handleRemoveLinkPembelian = (index) => {
    const newLinks = formData.detail.link_pembelian.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      detail: { ...formData.detail, link_pembelian: newLinks },
    });
  };

  const handleAddGaleri = () => {
    if (galeriItem.judul && galeriItem.gambar) {
      setFormData({
        ...formData,
        detail: {
          ...formData.detail,
          galeri: [...formData.detail.galeri, galeriItem],
        },
      });
      setGaleriItem({ judul: "", deskripsi: "", gambar: "" });
    }
  };

  const handleRemoveGaleri = (index) => {
    const newGaleri = formData.detail.galeri.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      detail: { ...formData.detail, galeri: newGaleri },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id || !formData.judul) {
      alert("ID dan Judul template wajib diisi!");
      return;
    }

    try {
      // Save to database via API
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan template");
      }

      alert("✅ Template berhasil disimpan ke database!");
      router.push("/admin/templates");
    } catch (error) {
      console.error("Error creating template:", error);
      alert(`❌ Gagal menyimpan template: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tambah Template Baru</h1>
        <p className="text-gray-600 mt-1">Isi form di bawah untuk membuat template baru</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Dasar */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Dasar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Template <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="contoh: goal-planner"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Gunakan lowercase dan dash (-)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Template <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
                placeholder="Goal Planner 2025"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat <span className="text-red-500">*</span>
              </label>
              <textarea
                name="deskripsi_singkat"
                value={formData.deskripsi_singkat}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Template untuk perencanaan tujuan hidup Anda..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Isi 0 untuk template gratis</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Tampilkan sebagai Featured
              </label>
            </div>
          </div>
        </div>

        {/* Gambar */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gambar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Path Gambar Thumbnail <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="gambar_thumbnail"
                value={formData.gambar_thumbnail}
                onChange={handleChange}
                required
                placeholder="photos/produk/goal-planner/thumbnail.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Path Gambar Utama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="detail.gambar_utama"
                value={formData.detail.gambar_utama}
                onChange={handleChange}
                required
                placeholder="photos/produk/goal-planner/main.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            📁 Upload gambar ke folder public/photos/produk/[nama-template]/
          </p>
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Detail Template</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Lengkap (Markdown)
              </label>
              <textarea
                name="detail.deskripsi_lengkap"
                value={formData.detail.deskripsi_lengkap}
                onChange={handleChange}
                rows="6"
                placeholder="Deskripsi detail dengan format markdown..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Preview Detail
                </label>
                <input
                  type="text"
                  name="detail.link_preview_detail"
                  value={formData.detail.link_preview_detail}
                  onChange={handleChange}
                  placeholder="content/template-preview.html?id=goal-planner"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Payment Gateway
                </label>
                <input
                  type="url"
                  name="detail.payment_gateway"
                  value={formData.detail.payment_gateway}
                  onChange={handleChange}
                  placeholder="https://payment-link.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Panduan PDF
                </label>
                <input
                  type="text"
                  name="detail.file_panduan_pdf"
                  value={formData.detail.file_panduan_pdf}
                  onChange={handleChange}
                  placeholder="path/to/panduan.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Link Pembelian */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Link Pembelian</h2>

          <div className="space-y-4">
            {/* Form Add Link */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Platform (e.g., Shopee)"
                value={linkPembelian.platform}
                onChange={(e) => setLinkPembelian({ ...linkPembelian, platform: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="url"
                placeholder="https://..."
                value={linkPembelian.url}
                onChange={(e) => setLinkPembelian({ ...linkPembelian, url: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={handleAddLinkPembelian}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                ➕ Tambah Link
              </button>
            </div>

            {/* List Links */}
            {formData.detail.link_pembelian.length > 0 && (
              <div className="space-y-2">
                {formData.detail.link_pembelian.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-900">{link.platform}</span>
                      <span className="text-gray-500 text-sm ml-2">{link.url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLinkPembelian(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Galeri */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Galeri</h2>

          <div className="space-y-4">
            {/* Form Add Galeri */}
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Judul Item Galeri"
                value={galeriItem.judul}
                onChange={(e) => setGaleriItem({ ...galeriItem, judul: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Deskripsi (opsional)"
                value={galeriItem.deskripsi}
                onChange={(e) => setGaleriItem({ ...galeriItem, deskripsi: e.target.value })}
                rows="2"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Path gambar (photos/produk/...)"
                value={galeriItem.gambar}
                onChange={(e) => setGaleriItem({ ...galeriItem, gambar: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={handleAddGaleri}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                ➕ Tambah ke Galeri
              </button>
            </div>

            {/* List Galeri */}
            {formData.detail.galeri.length > 0 && (
              <div className="space-y-2">
                {formData.detail.galeri.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{item.judul}</div>
                      <div className="text-gray-500 text-sm">{item.gambar}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGaleri(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">SEO (Opsional)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                name="seo.meta_title"
                value={formData.seo.meta_title}
                onChange={handleChange}
                placeholder="Judul untuk mesin pencari"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="seo.meta_description"
                value={formData.seo.meta_description}
                onChange={handleChange}
                rows="3"
                placeholder="Deskripsi untuk mesin pencari"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            💾 Simpan Template
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/templates")}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
