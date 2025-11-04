"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUpload({
  label,
  value,
  onChange,
  required = false,
  helpText = null
}) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || "");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("❌ Format file tidak valid. Gunakan JPEG, PNG, WebP, atau GIF.");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("❌ Ukuran file terlalu besar. Maksimal 5MB.");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload gagal");
      }

      // Update parent component with new path
      onChange(result.path);
      setPreviewUrl(result.path);
      alert("✅ Gambar berhasil diupload!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(`❌ Gagal upload gambar: ${error.message}`);
      setPreviewUrl(value || "");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Preview */}
      {previewUrl && (
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-contain"
            unoptimized={previewUrl.startsWith("data:")}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          >
            🗑️ Hapus
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center gap-2">
        <label
          htmlFor={`file-${label}`}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            uploading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {uploading ? "Uploading..." : previewUrl ? "📁 Ganti Gambar" : "📁 Upload Gambar"}
        </label>
        <input
          id={`file-${label}`}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />

        {/* Manual path input */}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            onChange(e.target.value);
            setPreviewUrl(e.target.value);
          }}
          placeholder="atau masukkan path manual"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
