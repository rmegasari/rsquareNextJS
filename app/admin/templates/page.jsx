"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { resolveAssetPath } from "@/lib/assetPaths";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// SortableTemplateCard component for drag-and-drop functionality
function SortableTemplateCard({ template, onToggleFeatured, onToggleActive, onDelete, isReorderMode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: template.id, disabled: !isReorderMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const imageSrc = resolveAssetPath(
    template.gambar_thumbnail || template.detail?.gambar_utama || "/photos/RSQUARE-LOGO.png"
  );
  const isFree = Number(template.harga) === 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="admin-template-item"
    >
      <div className="flex items-center gap-6">
        {/* Drag Handle - only active in reorder mode */}
        {isReorderMode && (
          <div
            {...attributes}
            {...listeners}
            className="cursor-move flex-shrink-0 px-2 py-4 hover:bg-gray-100 rounded transition-colors"
            title="Drag untuk mengubah urutan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        )}

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
                <span className={`admin-badge ${template.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {template.active !== false ? '✓ Aktif' : '✕ Tidak Aktif'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleActive(template.id, template.active !== false)}
                className={`px-3 py-2 text-sm rounded-lg transition-all hover:scale-105 font-medium ${
                  template.active !== false
                    ? "bg-green-100 hover:bg-green-200 text-green-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                title={template.active !== false ? "Nonaktifkan Template" : "Aktifkan Template"}
              >
                {template.active !== false ? "✓" : "✕"}
              </button>
              <button
                onClick={() => onToggleFeatured(template.id, template.featured)}
                className={`px-3 py-2 text-sm rounded-lg transition-all hover:scale-105 font-medium ${
                  template.featured
                    ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                title={template.featured ? "Remove from Featured" : "Set as Featured"}
              >
                {template.featured ? "⭐" : "☆"}
              </button>
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
                onClick={() => onDelete(template.id)}
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
}

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [pendingOrder, setPendingOrder] = useState([]);

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function loadTemplates() {
      try {
        // Include inactive products for admin
        const response = await fetch("/api/products?includeInactive=true");
        const products = await response.json();

        // Ensure products is an array and sort by order_number
        if (Array.isArray(products)) {
          const sortedProducts = products.sort((a, b) => {
            const orderA = a.order_number ?? 999999;
            const orderB = b.order_number ?? 999999;
            return orderA - orderB;
          });
          setTemplates(sortedProducts);
          setFilteredTemplates(sortedProducts);
        } else {
          console.error("Products is not an array:", products);
          setTemplates([]);
          setFilteredTemplates([]);
        }
      } catch (error) {
        console.error("Error loading templates:", error);
        setTemplates([]);
        setFilteredTemplates([]);
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFilteredTemplates((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Update the main templates state as well
        setTemplates((prevTemplates) => {
          const updatedTemplates = [...prevTemplates];
          const movedItem = updatedTemplates.find((t) => t.id === active.id);
          if (movedItem) {
            updatedTemplates.splice(
              updatedTemplates.findIndex((t) => t.id === active.id),
              1
            );
            const targetIndex = updatedTemplates.findIndex((t) => t.id === over.id);
            updatedTemplates.splice(targetIndex, 0, movedItem);
          }
          return updatedTemplates;
        });

        // Store pending order (will be saved when user clicks "Simpan Perubahan")
        setPendingOrder(newOrder.map((t) => t.id));

        return newOrder;
      });
    }
  };

  const handleStartReorder = () => {
    setIsReorderMode(true);
    setPendingOrder([]);
  };

  const handleCancelReorder = async () => {
    setIsReorderMode(false);
    setPendingOrder([]);

    // Reload templates to reset order
    const response = await fetch("/api/products?includeInactive=true");
    const products = await response.json();

    if (Array.isArray(products)) {
      const sortedProducts = products.sort((a, b) => {
        const orderA = a.order_number ?? 999999;
        const orderB = b.order_number ?? 999999;
        return orderA - orderB;
      });
      setTemplates(sortedProducts);
      setFilteredTemplates(sortedProducts);
    }
  };

  const handleSaveReorder = async () => {
    if (pendingOrder.length === 0) {
      alert("Tidak ada perubahan urutan");
      setIsReorderMode(false);
      return;
    }

    setIsSaving(true);
    try {
      console.log("📤 Sending reorder request with", pendingOrder.length, "products");

      const response = await fetch("/api/products/reorder", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds: pendingOrder }),
      });

      console.log("📥 Response status:", response.status, response.statusText);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Non-JSON response:", text.substring(0, 200));
        throw new Error("Server mengembalikan response non-JSON. Kemungkinan kolom order_number belum ada di database.");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan urutan");
      }

      alert("✅ Urutan berhasil disimpan!");
      setIsReorderMode(false);
      setPendingOrder([]);
      console.log("✅ Order saved successfully");
    } catch (error) {
      console.error("❌ Error saving order:", error);
      alert(`❌ Gagal menyimpan urutan: ${error.message}\n\nPastikan Anda sudah menjalankan SQL migration untuk menambahkan kolom order_number.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFeatured = async (productId, currentFeaturedStatus) => {
    try {
      const newStatus = !currentFeaturedStatus;

      // Call API to update featured status
      const response = await fetch("/api/products/featured", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, featured: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengupdate featured status");
      }

      // Update UI immediately
      const updatedTemplates = templates.map((t) =>
        t.id === productId ? { ...t, featured: newStatus } : t
      );
      setTemplates(updatedTemplates);
      setFilteredTemplates(updatedTemplates);

      alert(`✅ ${result.message}`);
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert(`❌ ${error.message}`);
    }
  };

  const handleToggleActive = async (productId, currentActiveStatus) => {
    try {
      const newStatus = !currentActiveStatus;

      // Call API to update active status
      const response = await fetch(`/api/products/${productId}/active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengupdate active status");
      }

      // Update UI immediately
      const updatedTemplates = templates.map((t) =>
        t.id === productId ? { ...t, active: newStatus } : t
      );
      setTemplates(updatedTemplates);
      setFilteredTemplates(updatedTemplates);

      alert(`✅ ${result.message}`);
    } catch (error) {
      console.error("Error toggling active:", error);
      alert(`❌ ${error.message}`);
    }
  };

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
        <div className="flex items-center gap-3">
          {!isReorderMode ? (
            <>
              <button
                onClick={handleStartReorder}
                className="admin-btn-secondary inline-flex items-center gap-2"
              >
                <span className="text-xl">↕️</span>
                Urutkan
              </button>
              <Link
                href="/admin/templates/new"
                className="admin-btn-primary inline-flex items-center gap-2"
              >
                <span className="text-xl">➕</span>
                Tambah Template
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleCancelReorder}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                disabled={isSaving}
              >
                ✕ Batal
              </button>
              <button
                onClick={handleSaveReorder}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                disabled={isSaving || pendingOrder.length === 0}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <span className="text-lg">💾</span>
                    Simpan Perubahan
                  </>
                )}
              </button>
            </>
          )}
        </div>
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

        {/* Tip Text */}
        {isReorderMode ? (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">
              📝 Mode Urutkan Aktif - Drag & drop kartu untuk mengubah urutan, lalu klik "Simpan Perubahan"
            </p>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Tip: Klik button "Urutkan" untuk mengubah urutan tampilan template di halaman /templates
            </p>
          </div>
        )}
      </div>

      {/* Templates List */}
      {filteredTemplates.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📭</div>
          <h3 className="admin-empty-state-title">Tidak ada template ditemukan</h3>
          <p className="admin-empty-state-text">Coba ubah filter atau tambah template baru</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTemplates.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-4">
              {filteredTemplates.map((template) => (
                <SortableTemplateCard
                  key={template.id}
                  template={template}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleActive={handleToggleActive}
                  onDelete={handleDelete}
                  isReorderMode={isReorderMode}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
