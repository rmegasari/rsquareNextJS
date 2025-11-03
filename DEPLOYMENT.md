# 🚀 Panduan Deployment RSQUARE

## Rekomendasi: Deploy ke Vercel ⭐

Aplikasi ini menggunakan fitur Next.js seperti:
- API Routes (`/api/products`)
- Middleware (authentication)
- SQLite Database
- Dynamic rendering

**Vercel adalah pilihan terbaik** karena dibuat khusus untuk Next.js dan support semua fitur ini out-of-the-box.

---

## 📋 Deploy ke Vercel (Recommended)

### 1. Persiapan

Pastikan repository sudah di-push ke GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy via Vercel Dashboard

1. **Buka Vercel**
   - Kunjungi https://vercel.com/
   - Klik **"Sign Up"** atau **"Login"**
   - Login dengan GitHub account

2. **Import Project**
   - Klik **"Add New Project"**
   - Pilih **"Import Git Repository"**
   - Authorize Vercel untuk akses GitHub
   - Pilih repository **`RSQUARE-NextJS`**

3. **Configure Project**
   - **Project Name**: `rsquare` (atau nama lain)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Deploy!**
   - Klik **"Deploy"**
   - Tunggu 2-3 menit
   - Selesai! 🎉

### 3. Hasil Deployment

Setelah deploy berhasil, Anda akan mendapat:
- **Production URL**: `https://rsquare.vercel.app` (atau custom name)
- **Preview URL** untuk setiap push ke branch lain
- **Auto-deploy** setiap kali push ke `main` branch

---

## 🔧 Deploy via Vercel CLI

Jika prefer command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🌐 Custom Domain (Optional)

Di Vercel Dashboard:
1. Buka project → **Settings** → **Domains**
2. Klik **"Add Domain"**
3. Masukkan domain Anda (misal: `rsquare.com`)
4. Ikuti instruksi DNS configuration
5. Tunggu propagasi DNS (5-60 menit)

---

## ⚠️ Important Notes

### Database (SQLite)

File `data/products.db` akan:
- ✅ Tersimpan di deployment (read-only)
- ⚠️ Tidak persistent untuk writes (gunakan external DB untuk production)
- 💡 Untuk production, pertimbangkan:
  - PostgreSQL (Vercel Postgres)
  - MySQL (PlanetScale)
  - MongoDB Atlas

### Environment Variables

Jika ada environment variables di local:
1. Di Vercel Dashboard → **Settings** → **Environment Variables**
2. Tambahkan variables yang diperlukan
3. Redeploy project

---

## 🔄 Automatic Deployments

Setelah setup awal:
- ✅ Setiap `git push` ke `main` → Auto-deploy ke production
- ✅ Setiap push ke branch lain → Deploy preview URL
- ✅ Pull Request → Preview deployment dengan comments

---

## ❌ Mengapa Tidak Netlify?

Netlify bagus untuk static sites, tapi untuk Next.js dengan:
- API Routes
- Middleware
- Edge Runtime
- Dynamic features

Vercel memberikan experience yang lebih baik karena Next.js dibuat oleh Vercel.

---

## 📞 Support

Jika ada masalah saat deployment:
1. Check build logs di Vercel Dashboard
2. Vercel documentation: https://vercel.com/docs
3. Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs

---

## 🎯 Quick Start

```bash
# 1. Push ke GitHub
git push origin main

# 2. Buka https://vercel.com
# 3. Import repository
# 4. Deploy!
# 5. Done in 3 minutes 🚀
```

Good luck! 🎉
