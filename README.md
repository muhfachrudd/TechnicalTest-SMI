# Product Catalog

Aplikasi web katalog produk untuk coding test Front-End Engineer. Pengguna
login menggunakan email, lalu dapat melihat, mencari, memfilter, mengurutkan,
dan membuka detail produk dari API DummyJSON.

## Fitur

- Login dengan validasi email dan password
- Sesi login tersimpan di `localStorage`
- Protected route untuk halaman produk
- Daftar produk dengan 12 item per halaman
- Search produk dengan debounce 400 ms
- Filter kategori
- Sort berdasarkan harga atau rating
- Pagination Prev/Next
- Detail produk dengan galeri gambar
- Daftar review jika tersedia
- Loading skeleton, error state dengan retry, empty state, dan not found state
- Normalisasi data API agar field kosong atau tidak valid tidak menyebabkan crash

## Akun Demo

Akun berikut diverifikasi dari `GET https://dummyjson.com/users/1`:

- Email: `emily.johnson@x.dummyjson.com`
- Password: `emilyspass`

Karena endpoint login DummyJSON menggunakan `username`, aplikasi terlebih
dahulu mencari username berdasarkan email melalui endpoint filter, kemudian
memanggil endpoint login.

## Cara Menjalankan

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
git clone https://github.com/muhfachrudd/TechnicalTest-SMI.git
cd TechnicalTest-SMI
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya:

```text
http://localhost:5173
```

Untuk membuat build produksi:

```bash
npm run build
```

Untuk menjalankan lint:

```bash
npm run lint
```

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Axios
- React Router
- DummyJSON API: https://dummyjson.com

## Library Tambahan

| Library | Alasan |
|---|---|
| `axios` | HTTP client untuk komunikasi dengan DummyJSON |
| `react-router-dom` | Routing dan protected route |
| `tailwindcss` | Styling utility-first |
| `@tailwindcss/vite` | Integrasi Tailwind CSS dengan Vite |

## Endpoint API yang Digunakan

| Kebutuhan | Method | Endpoint |
|---|---|---|
| Verifikasi user | GET | `/users/1` |
| Cari user berdasarkan email | GET | `/users/filter?key=email&value={email}` |
| Login | POST | `/auth/login` |
| Daftar produk | GET | `/products` |
| Search produk | GET | `/products/search` |
| Daftar kategori | GET | `/products/categories` |
| Produk berdasarkan kategori | GET | `/products/category/{slug}` |
| Detail produk | GET | `/products/{id}` |