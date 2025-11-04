-- RSQUARE Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi_singkat TEXT,
  harga INTEGER DEFAULT 0,
  gambar_thumbnail TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_details table
CREATE TABLE IF NOT EXISTS product_details (
  product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  gambar_utama TEXT,
  deskripsi_lengkap TEXT,
  link_preview_detail TEXT,
  link_payment_gateway TEXT,
  link_youtube TEXT,
  file_panduan TEXT
);

-- Create product_links table
CREATE TABLE IF NOT EXISTS product_links (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL
);

-- Create product_gallery table
CREATE TABLE IF NOT EXISTS product_gallery (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  judul TEXT NOT NULL,
  deskripsi TEXT,
  gambar TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Create product_seo table
CREATE TABLE IF NOT EXISTS product_seo (
  product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  meta_title TEXT,
  meta_description TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_harga ON products(harga);
CREATE INDEX IF NOT EXISTS idx_gallery_product ON product_gallery(product_id);
CREATE INDEX IF NOT EXISTS idx_links_product ON product_links(product_id);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_seo ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on product_details" ON product_details
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on product_links" ON product_links
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on product_gallery" ON product_gallery
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on product_seo" ON product_seo
  FOR SELECT USING (true);

-- Create policies for authenticated write access (admin)
CREATE POLICY "Allow authenticated insert on products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on products" ON products
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on product_details" ON product_details
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on product_details" ON product_details
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on product_details" ON product_details
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on product_links" ON product_links
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on product_links" ON product_links
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on product_gallery" ON product_gallery
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on product_gallery" ON product_gallery
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on product_seo" ON product_seo
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on product_seo" ON product_seo
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on product_seo" ON product_seo
  FOR DELETE USING (true);
