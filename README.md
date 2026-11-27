# DOLAN — ASALink Arena (GameEdu)

**Final Project Milestone 1 — Inisiasi Project React dan Repository**  
Dashboard Pendidik Berbasis React SPA untuk Pengelolaan Bank Soal dan Arena Kuis Interaktif Kelas.

---

## Tautan Proyek & Demo Langsung

* **Live Demo (GitHub Pages):** [https://yogapradika.github.io/GameEdu/](https://yogapradika.github.io/GameEdu/)
* **Source Code Repository:** [https://github.com/Yogapradika/GameEdu](https://github.com/Yogapradika/GameEdu)

---

## Anggota Kelompok.

| No | Nama Lengkap | NIM | Program Studi |
| :-: | :--- | :--- | :--- |
| 1 | **Yoga Pradika**  | `2455202079` | S1 Informatika |
| 2 | **Rezal Permadi** | `2455202061` | S1 Informatika |
| 3 | **Muh Achsan Wicaksono** | `2455202049` | S1 Informatika |
| 4 | **Ahmad Mustofa** | `2455202002` | S1 Informatika |

**Instansi:** Fakultas Sains dan Teknologi — Universitas Nurul Huda (UNUHA)

---

## Gambaran Umum Aplikasi

**DOLAN (Digital Olah Logika Ajar Nusantara) — ASALink Arena** adalah aplikasi antarmuka web (*Single Page Application*) yang dirancang untuk memudahkan guru menyusun bank soal digital terklasifikasi berdasarkan tingkat kognitif Taksonomi Bloom (C1–C6) serta menyiapkan sesi permainan kuis kelas (*Speed Clash* dan *Territory Grid / Rebut Sawah*) untuk perangkat Smartboard.

---

## Rincian Fitur & Penjelasan Implementasi Kode

### 1. Sistem Autentikasi & Registrasi Pendidik (`src/pages/AuthPage.jsx`)
* **Multi-Mode Form (`login`, `register`, `forgot`):** Pengguna dapat beralih secara dinamis antara formulir Masuk Akun, Daftar Akun Baru, dan Pemulihan Kata Sandi dalam satu antarmuka tanpa *reload* halaman.
* **Validasi Input & Indikator Kekuatan Kata Sandi:** Mengecek kelengkapan kolom wajib (Nama & Gelar, Asal Sekolah, Mata Pelajaran, Email valid, serta kecocokan konfirmasi kata sandi) dan menampilkan bilah kekuatan kata sandi (*Lemah*, *Sedang*, *Sangat Kuat*) secara *real-time*.
* **Penyimpanan Akun Lokal (`localStorage`):** Akun guru yang didaftarkan disimpan pada kunci `gameedu_users` sehingga dapat langsung digunakan untuk login kembali, dilengkapi fitur **Masuk Akun Demo** satu klik untuk kebutuhan pengujian cepat.

### 2. Dashboard Utama & Manajemen Bank Soal (`src/pages/DashboardPage.jsx`)
* **Kartu Statistik Dinamis (`src/components/StatCards.jsx`):** Menghitung secara otomatis jumlah **Total Soal Aktif**, jumlah **Soal Sudah Direview**, dan persentase **Soal HOTS (Level Bloom C4–C6)** setiap kali ada penambahan, perubahan, atau penghapusan soal.
* **Pencarian & Filter Bab:** Memfilter daftar soal secara langsung berdasarkan kata kunci teks pertanyaan maupun kategori bab pembelajaran (*Bab 1 - Bangun Datar*, *Bab 2 - Fungsi*, *Bab 3 - Barisan dan deret*).
* **Kartu Soal Adaptif (`src/components/QuestionCard.jsx`):** Menampilkan lencana level Bloom berwarna, tipe soal, durasi pengerjaan, penyorotan visual hijau pada kunci jawaban pilihan ganda, kotak khusus kunci jawaban untuk tipe soal esai, pembahasan soal, serta tombol **Edit** dan **Hapus**.

### 3. Editor Tambah & Ubah Soal Dinamis (`src/pages/AddQuestionPage.jsx`)
* **Identitas Soal Terstruktur:** Mengatur Mata Pelajaran, Bab, Tipe Soal, Level Kognitif Bloom (`C1` sampai `C6`), Tingkat Kesulitan (`Mudah`, `Sedang`, `Sulit`), dan Durasi waktu menjawab (dalam detik).
* **Tampilan Input Dinamis (Pilihan Ganda vs. Esai):**
  * Saat memilih **Pilihan ganda**, antarmuka menampilkan 4 kolom opsi jawaban (`A`, `B`, `C`, `D`) dengan tombol pemilih kunci jawaban interaktif.
  * Saat memilih **Esai**, kolom pilihan A–D otomatis berganti menjadi bidang teks **Kunci Jawaban / Pedoman Penilaian Esai**.
* **Mode Tambah & Edit Terpadu:** Komponen yang sama digunakan untuk membuat soal baru maupun memperbarui data soal yang sudah ada di bank soal.

### 4. Navigasi Responsif & Simulasi Sesi Arena (`src/components/Sidebar.jsx`, `src/components/Topbar.jsx`, `src/pages/SecondaryPages.jsx`)
* **Layout Responsif Multi-Perangkat:** Menggunakan tata letak CSS Grid dan Flexbox Tailwind CSS yang otomatis menyesuaikan tampilan pada layar Desktop, Tablet, maupun Smartphone (dilengkapi *drawer menu* geser pada layar kecil).
* **Menu Pendukung Lengkap:**
  * **Buat Sesi Game:** Memilih mode permainan (*Speed Clash* atau *Territory Grid*), memilih paket bab soal, serta membangkitkan Kode Room Smartboard secara acak.
  * **Kelas & Siswa:** Menampilkan daftar siswa kelas aktif beserta pembagian tim arena (*Tim Komering*, *Tim Ogan*, *Tim Musi*, *Tim Lematang*), akurasi, dan perolehan poin.
  * **Laporan & Pengaturan:** Menampilkan ringkasan skor sesi permainan serta kode pairing perangkat Smartboard (`K7Q-29D`) dengan tombol salin cepat.

### 5. Manajemen State Terpusat (`src/App.jsx` & `src/data/initialData.js`)
* Mengelola sesi pengguna aktif (`gameedu_active_user`) dan persistensi daftar soal (`gameedu_questions`) melalui `React Hooks` (`useState`, `useEffect`) yang tersinkronisasi dengan `localStorage`, sehingga data tetap tersimpan meskipun browser di-refresh.

---

## Struktur Direktori Proyek

```text
GameEdu/
├── public/                     # Aset statis publik
├── src/
│   ├── components/
│   │   ├── QuestionCard.jsx    # Komponen tampilan item soal (Pilihan Ganda & Esai)
│   │   ├── Sidebar.jsx         # Navigasi samping responsif & status Smartboard
│   │   ├── StatCards.jsx       # Kartu statistik total soal, review, & rasio HOTS
│   │   └── Topbar.jsx          # Header atas, judul halaman, & tombol aksi cepat
│   ├── data/
│   │   └── initialData.js      # Dataset awal bank soal & daftar siswa kelas
│   ├── pages/
│   │   ├── AddQuestionPage.jsx # Halaman formulir tambah & edit soal dinamis
│   │   ├── AuthPage.jsx        # Halaman login, registrasi guru, & lupa sandi
│   │   ├── DashboardPage.jsx   # Halaman utama dashboard bank soal & arena
│   │   └── SecondaryPages.jsx  # Halaman Buat Sesi Game, Kelas, Laporan, & Pengaturan
│   ├── App.jsx                 # Root komponen pengatur routing tampilan & state global
│   ├── index.css               # Konfigurasi gaya dasar & Tailwind CSS v4
│   └── main.jsx                # Entry point aplikasi React
├── index.html                  # Template HTML utama
├── package.json                # Daftar dependensi & skrip build/deploy
└── vite.config.js              # Konfigurasi Vite, plugin Tailwind, & base path GitHub Pages
