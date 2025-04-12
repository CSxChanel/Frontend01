# cPhone Frontend Dashboard

**cPhone** adalah aplikasi frontend berbasis **HTML**, **JavaScript**, dan **Tailwind CSS** yang berfungsi sebagai sistem **Login dan Dashboard** dengan validasi token berbasis SPA (Single Page Application).

Aplikasi ini dirancang untuk berinteraksi dengan backend REST API menggunakan token autentikasi (Bearer Token), dengan pendekatan modular dan struktur folder yang rapi.

---

## ✨ Fitur Utama

- **Form Login** dengan username/email & password
- **Penyimpanan token** di localStorage
- **Routing dinamis** tanpa reload (SPA-style)
- **Proteksi halaman dashboard** berdasarkan login/token
- **Autentikasi profil user** dari endpoint `/user/profile`
- **Logout** yang menghapus token dan redirect ke login
- **Dark mode toggle** disimpan di localStorage
- **Struktur komponen modular**: header, sidebar, konten

---

## 📁 Struktur Proyek

```
Frontend/
│
├── index.html                  # Halaman login utama
├── pages/
│   └── dashboard.html          # Halaman utama setelah login
│
├── routers/
│   └── router.js               # Routing konten dan komponen
│
├── auth/
│   ├── auth-login.js           # Menangani login dan penyimpanan token
│   └── auth-dashboard.js       # Validasi token & ambil profil user
│
├── utils/
│   ├── token.js                # Fungsi get/set/remove token dari localStorage
│   └── fetch-with-auth.js     # Wrapper fetch dengan header Authorization
│
├── layouts/
│   ├── header.html             # Komponen header
│   └── sidebar.html            # Komponen sidebar
│
├── contents/
│   ├── dashboard.html          # Konten dashboard
│   └── ...                     # Konten lainnya (users, settings, dll)
│
├── api/
│   └── config.js               # Menyimpan API_URL
│
├── css/
│   ├── output.css              # Tailwind CSS build
│   └── style-loginForm.css     # Gaya khusus halaman login
└── js/
    └── components, helper, dll (opsional tambahan)
```

---

## ⚙️ Cara Kerja Aplikasi

1. User membuka `index.html` untuk login
2. Saat form dikirim, `auth-login.js`:
   - Mengirim data ke endpoint `/auth/login`
   - Jika berhasil, token disimpan ke localStorage
   - User diarahkan ke `pages/dashboard.html`
3. Di `dashboard.html`:
   - `router.js` akan memuat sidebar, header, dan konten berdasarkan URL
   - Jika halaman adalah `dashboard`, maka `auth-dashboard.js`:
     - Mengecek apakah token ada
     - Mengambil data user dari endpoint `/user/profile`
     - Menampilkan username dan email
4. Logout akan:
   - Mengirim request ke `/auth/logout`
   - Menghapus token dari localStorage
   - Redirect kembali ke login

---

## 🔐 Autentikasi

Token disimpan di localStorage dan dikirim otomatis lewat `fetchWithAuth()` sebagai:

```http
Authorization: Bearer <token>
```

Jika token tidak valid atau expired, user akan diarahkan kembali ke halaman login.

---

## ▶️ Menjalankan Aplikasi

### Jalankan secara lokal dengan http-server:
```bash
npx http-server .
```
Kemudian buka:
```
http://localhost:8080
```

Pastikan backend API berjalan dan endpoint seperti `/auth/login`, `/user/profile`, dan `/auth/logout` tersedia.

---

## ✅ Persyaratan

- Backend API dengan endpoint:
  - `POST /auth/login`
  - `GET /user/profile`
  - `POST /auth/logout`
- Tailwind CSS sudah ter-compile ke `output.css`

---

## ❤️ Kontribusi

Project ini dibuat oleh **[cp-sudrajat]**  
Untuk latihan frontend modular dengan login system.

---

## 📜 Lisensi

Project ini bebas digunakan untuk keperluan belajar dan pengembangan pribadi.

