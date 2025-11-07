/**
 * Upload helper functions for handling file uploads to Supabase Storage
 */

/**
 * Upload a single file to Supabase Storage
 * @param {File} file - The file object to upload
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export async function uploadFile(file) {
  if (!file || typeof file === 'string') {
    // If it's already a URL string, return it
    return file;
  }

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

  return result.path;
}

/**
 * Upload multiple files and return their URLs
 * @param {Object} files - Object with field names as keys and File objects as values
 * @returns {Promise<Object>} - Object with field names as keys and URLs as values
 */
export async function uploadMultipleFiles(files) {
  const uploads = {};
  const uploadPromises = [];

  for (const [key, file] of Object.entries(files)) {
    if (file && typeof file !== 'string') {
      uploadPromises.push(
        uploadFile(file).then(url => {
          uploads[key] = url;
        })
      );
    } else {
      uploads[key] = file;
    }
  }

  await Promise.all(uploadPromises);
  return uploads;
}

/**
 * Process product data before saving - upload all File objects
 * @param {Object} productData - The product data with File objects
 * @returns {Promise<Object>} - Product data with File objects replaced by URLs
 */
export async function processProductUploads(productData) {
  const processed = { ...productData };

  // Upload thumbnail
  if (productData.gambar_thumbnail instanceof File) {
    processed.gambar_thumbnail = await uploadFile(productData.gambar_thumbnail);
  }

  // Upload detail images
  if (productData.detail) {
    processed.detail = { ...productData.detail };

    if (productData.detail.gambar_utama instanceof File) {
      processed.detail.gambar_utama = await uploadFile(productData.detail.gambar_utama);
    }

    if (productData.detail.file_panduan_pdf instanceof File) {
      processed.detail.file_panduan_pdf = await uploadFile(productData.detail.file_panduan_pdf);
    }

    // Upload gallery images
    if (productData.detail.galeri && Array.isArray(productData.detail.galeri)) {
      console.log(`📸 Uploading ${productData.detail.galeri.length} gallery items...`);
      processed.detail.galeri = await Promise.all(
        productData.detail.galeri.map(async (item, index) => {
          if (item.gambar instanceof File) {
            console.log(`  - Uploading gallery item ${index + 1}: ${item.judul}`);
            const uploadedUrl = await uploadFile(item.gambar);
            console.log(`  ✓ Uploaded to: ${uploadedUrl}`);
            return {
              ...item,
              gambar: uploadedUrl
            };
          }
          console.log(`  - Gallery item ${index + 1} already has URL: ${item.judul}`);
          return item;
        })
      );
      console.log('✅ All gallery items processed');
    }
  }

  return processed;
}
