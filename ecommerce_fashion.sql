CREATE DATABASE ecommerce_fashion;
USE ecommerce_fashion;

-- Tabel Products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    deskripsi TEXT,
    stok INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    no_telp VARCHAR(20),
    alamat TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create (Insert Data Produk)
Create (Insert Data Produk)
INSERT INTO products (nama_produk, harga, deskripsi, stok)
VALUES 
('Kaos Polos Hitam', 75000, 'Kaos polos bahan cotton combed 30s', 50),
('Jaket Denim', 250000, 'Jaket denim unisex street style', 20);

-- Read (Data Produk)
-- Semua produk
SELECT * FROM products;

-- Produk berdasarkan ID
SELECT * FROM products WHERE id = 1;

-- Cari produk berdasarkan nama
SELECT * FROM products WHERE nama_produk LIKE '%Kaos%';

-- Update (Ubah Data Produk)
UPDATE products SET harga = 80000, stok = 45 WHERE id = 1;

-- Delete (Hapus Data Produk)
DELETE FROM products WHERE id = 2;

-- Read (Data Users)
-- Semua user
SELECT * FROM users;
-- User berdasarkan ID
SELECT * FROM users WHERE id = 1;
-- Cari user berdasarkan email
SELECT * FROM users WHERE email = 'andi@example.com';

-- Update (Ubah Data Users)
-- Update alamat dan no_telp user
UPDATE users
SET alamat = 'Jl. Asia Afrika No.55, Bandung', no_telp = '08567891234'
WHERE id = 2;

-- Update password user
UPDATE users
SET password = 'new_hashed_password'
WHERE id = 1;

-- Delete (Hapus Data Users)
DELETE FROM users WHERE id = 2;