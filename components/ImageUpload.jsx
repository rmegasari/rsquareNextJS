"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageUpload({
  label,
  value,
  onChange,
  required = false,
  helpText = null,
  acceptPdf = false  // New prop to enable PDF upload
}) {
  const [previewUrl, setPreviewUrl] = useState(
    typeof value === 'string' ? value : ""
  );
  const [selectedFile, setSelectedFile] = useState(null);

  // Update preview when value changes from parent
  useEffect(() => {
    if (value && typeof value === 'string' && !value.startsWith("data:") && !selectedFile) {
      setPreviewUrl(value);
    } else if (!value || value === "") {
      // Clear preview when value is empty
      setPreviewUrl("");
      setSelectedFile(null);
    }
  }, [value, selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = acceptPdf
      ? ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "application/pdf"]
      : ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      alert(`❌ Format file tidak valid. Gunakan ${acceptPdf ? 'JPEG, PNG, WebP, GIF, atau PDF' : 'JPEG, PNG, WebP, atau GIF'}.`);
      return;
    }

    // Validate file size (max 10MB for PDF, 5MB for images)
    const isPdf = file.type === "application/pdf";
    const maxSize = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`❌ Ukuran file terlalu besar. Maksimal ${isPdf ? '10MB' : '5MB'}.`);
      return;
    }

    // Save file object for later upload
    setSelectedFile(file);

    // Show preview immediately (only for images, not PDF)
    if (!isPdf) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result;
        setPreviewUrl(dataUrl);
        // Pass file object to parent
        onChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDF, just show filename
      setPreviewUrl(file.name);
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    setSelectedFile(null);
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
          {previewUrl.endsWith('.pdf') || previewUrl.includes('application/pdf') ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-gray-700">PDF File</p>
                <p className="text-xs text-gray-500">{previewUrl.split('/').pop()}</p>
              </div>
            </div>
          ) : (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized={previewUrl.startsWith("data:")}
            />
          )}
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
          className="px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
        >
          {previewUrl ? `📁 Ganti ${acceptPdf ? 'File' : 'Gambar'}` : `📁 Pilih ${acceptPdf ? 'File' : 'Gambar'}`}
        </label>
        <input
          id={`file-${label}`}
          type="file"
          accept={acceptPdf ? "image/jpeg,image/jpg,image/png,image/webp,image/gif,application/pdf" : "image/jpeg,image/jpg,image/png,image/webp,image/gif"}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Manual path input */}
        <input
          type="text"
          value={typeof value === 'string' ? value : ""}
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
