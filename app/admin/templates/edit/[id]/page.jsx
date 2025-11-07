"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { processProductUploads } from "@/lib/uploadHelpers";

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [linkPembelian, setLinkPembelian] = useState({ platform: "", url: "" });
  const [galeriItem, setGaleriItem] = useState({ judul: "", deskripsi: "", gambar: "" });

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const product = await response.json();

        if (product && !product.error) {
          setFormData(product);
        } else {
          alert("Template tidak ditemukan");
          router.push("/admin/templates");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        alert("Gagal memuat data template");
        router.push("/admin/templates");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [params.id, router]);

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
          link_pembelian: [...(formData.detail.link_pembelian || []), linkPembelian],
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
          galeri: [...(formData.detail.galeri || []), galeriItem],
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
      // Debug: Log gallery data before upload
      console.log('📋 Form data before upload:', {
        galleryCount: formData.detail.galeri?.length || 0,
        gallery: formData.detail.galeri
      });

      // Step 1: Upload all files to Supabase Storage
      alert("📤 Mengupload gambar ke Supabase Storage...");
      const processedData = await processProductUploads(formData);

      // Debug: Log gallery data after upload
      console.log('📋 Processed data after upload:', {
        galleryCount: processedData.detail.galeri?.length || 0,
        gallery: processedData.detail.galeri
      });

      // Step 2: Update to database via API with uploaded URLs
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengupdate template");
      }

      alert("✅ Template berhasil diupdate!");
      router.push("/admin/templates");
    } catch (error) {
      console.error("Error updating template:", error);
      alert(`❌ Gagal mengupdate template: ${error.message}`);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Template: {formData.judul}</h1>
        <p className="text-gray-600 mt-1">Ubah informasi template di bawah ini</p>
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
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">ID tidak bisa diubah</p>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured || false}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              label="Gambar Thumbnail"
              value={formData.gambar_thumbnail || ""}
              onChange={(path) => setFormData({ ...formData, gambar_thumbnail: path })}
              required
              helpText="Digunakan di daftar template. Maksimal 5MB. Format: JPG, PNG, WebP, GIF"
            />

            <ImageUpload
              label="Gambar Utama"
              value={formData.detail?.gambar_utama || ""}
              onChange={(path) => setFormData({
                ...formData,
                detail: { ...formData.detail, gambar_utama: path }
              })}
              required
              helpText="Digunakan di halaman detail. Maksimal 5MB. Format: JPG, PNG, WebP, GIF"
            />
          </div>
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
                value={formData.detail?.deskripsi_lengkap || ""}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Preview Detail
                </label>
                <input
                  type="text"
                  name="detail.link_preview_detail"
                  value={formData.detail?.link_preview_detail || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Payment Gateway
                </label>
                <input
                  type="url"
                  name="detail.payment_gateway"
                  value={formData.detail?.payment_gateway || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link YouTube (Embed)
                </label>
                <input
                  type="url"
                  name="detail.link_youtube"
                  value={formData.detail?.link_youtube || ""}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">Gunakan format embed: https://www.youtube.com/embed/VIDEO_ID</p>
              </div>

              <div>
                <ImageUpload
                  label="File Panduan PDF"
                  value={formData.detail?.file_panduan_pdf || ""}
                  onChange={(newValue) => {
                    setFormData({
                      ...formData,
                      detail: { ...formData.detail, file_panduan_pdf: newValue },
                    });
                  }}
                  acceptPdf={true}
                  helpText="Upload file PDF panduan (max 10MB) atau masukkan URL manual"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Link Pembelian */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Link Pembelian</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Platform"
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
                ➕ Tambah
              </button>
            </div>

            {formData.detail?.link_pembelian && formData.detail.link_pembelian.length > 0 && (
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
              <ImageUpload
                label="Gambar Galeri"
                value={galeriItem.gambar}
                onChange={(path) => setGaleriItem({ ...galeriItem, gambar: path })}
                helpText="Upload gambar untuk item galeri. Maksimal 5MB. Format: JPG, PNG, WebP, GIF"
              />
              <button
                type="button"
                onClick={handleAddGaleri}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                ➕ Tambah ke Galeri
              </button>
            </div>

            {formData.detail?.galeri && formData.detail.galeri.length > 0 && (
              <div className="space-y-2">
                {formData.detail.galeri.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.judul}</div>
                      {item.deskripsi && (
                        <div className="text-gray-600 text-sm mt-1">{item.deskripsi}</div>
                      )}
                      <div className="text-gray-500 text-xs mt-1">
                        {typeof item.gambar === 'string'
                          ? item.gambar
                          : item.gambar instanceof File
                            ? `📎 ${item.gambar.name}`
                            : 'No image'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveGaleri(index)}
                      className="text-red-600 hover:text-red-800 font-medium ml-4"
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
                value={formData.seo?.meta_title || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="seo.meta_description"
                value={formData.seo?.meta_description || ""}
                onChange={handleChange}
                rows="3"
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
            💾 Update Template
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
