"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { resolveAssetPath } from "@/lib/assetPaths";

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const response = await fetch("/api/products");
        const products = await response.json();
        setTemplates(products);
        setFilteredTemplates(products);
      } catch (error) {
        console.error("Error loading templates:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates;

    // Filter berdasarkan search
    if (searchQuery) {
      filtered = filtered.filter((t) =>
        t.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter berdasarkan tipe
    if (filterType === "free") {
      filtered = filtered.filter((t) => Number(t.harga) === 0);
    } else if (filterType === "premium") {
      filtered = filtered.filter((t) => Number(t.harga) > 0);
    } else if (filterType === "featured") {
      filtered = filtered.filter((t) => t.featured === true);
    }

    setFilteredTemplates(filtered);
  }, [searchQuery, filterType, templates]);

  const handleDelete = async (productId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus template ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus template");
      }

      alert("✅ Template berhasil dihapus!");

      // Reload templates list
      const updatedResponse = await fetch("/api/products");
      const updatedProducts = await updatedResponse.json();
      setTemplates(updatedProducts);
      setFilteredTemplates(updatedProducts);
    } catch (error) {
      console.error("Error deleting template:", error);
      alert(`❌ Gagal menghapus template: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="admin-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Kelola Template</h1>
          <p className="admin-page-subtitle">Total {templates.length} template</p>
        </div>
        <Link
          href="/admin/templates/new"
          className="admin-btn-primary inline-flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          Tambah Template
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cari Template</label>
            <input
              type="text"
              placeholder="Masukkan nama template..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
            />
          </div>

          {/* Filter Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter Tipe</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="admin-select"
            >
              <option value="all">Semua Template</option>
              <option value="free">Gratis</option>
              <option value="premium">Premium</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Templates List */}
      {filteredTemplates.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📭</div>
          <h3 className="admin-empty-state-title">Tidak ada template ditemukan</h3>
          <p className="admin-empty-state-text">Coba ubah filter atau tambah template baru</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((template) => {
            const imageSrc = resolveAssetPath(
              template.gambar_thumbnail || template.detail?.gambar_utama || "/photos/RSQUARE-LOGO.png"
            );
            const isFree = Number(template.harga) === 0;

            return (
              <div
                key={template.id}
                className="admin-template-item"
              >
                <div className="flex items-center gap-6">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={imageSrc}
                      alt={template.judul}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{template.judul}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{template.deskripsi_singkat}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`admin-badge ${isFree ? 'admin-badge-free' : 'admin-badge-premium'}`}>
                            {isFree ? '🎁 Gratis' : `💎 Rp ${Number(template.harga).toLocaleString('id-ID')}`}
                          </span>
                          {template.featured && (
                            <span className="admin-badge admin-badge-featured">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/${template.id}`}
                          target="_blank"
                          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all hover:scale-105"
                          title="Preview"
                        >
                          👁️
                        </Link>
                        <Link
                          href={`/admin/templates/edit/${template.id}`}
                          className="px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all hover:scale-105 font-medium"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="admin-btn-danger"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
