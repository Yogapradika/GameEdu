import React, { useState } from 'react';
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  School,
  KeyRound,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    sekolah: 'SMA Negeri 1 Belitang',
    mapel: 'Matematika',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
    rememberMe: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  // Hitung kekuatan password untuk feedback visual real-time
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', color: 'bg-slate-200', width: 'w-0' };
    if (pwd.length < 6) return { label: 'Lemah (min. 6 karakter)', color: 'bg-rose-500', width: 'w-1/3' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 8) {
      return { label: 'Sangat Kuat', color: 'bg-emerald-500', width: 'w-full' };
    }
    return { label: 'Sedang (tambahkan huruf besar & angka)', color: 'bg-amber-400', width: 'w-2/3' };
  };

  const pwdStrength = getPasswordStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Masukkan alamat email sekolah yang valid.');
      return;
    }

    if (mode === 'forgot') {
      setInfoMsg(`Tautan pengaturan ulang kata sandi telah dikirim ke ${formData.email}.`);
      return;
    }

    if (!formData.password) {
      setError('Kata sandi wajib diisi.');
      return;
    }

    if (mode === 'register') {
      if (!formData.nama.trim()) {
        setError('Nama lengkap dan gelar guru wajib diisi.');
        return;
      }
      if (formData.password.length < 6) {
        setError('Kata sandi minimal harus 6 karakter.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Konfirmasi kata sandi tidak sesuai.');
        return;
      }
      if (!formData.agreeTerms) {
        setError('Silakan centang persetujuan ketentuan penggunaan platform.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('gameedu_users') || '[]');
      const exists = users.some((u) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (exists) {
        setError('Email ini sudah terdaftar. Silakan langsung masuk.');
        return;
      }

      const newUser = {
        nama: formData.nama.trim(),
        nip: formData.nip.trim() || '199508142024011001',
        sekolah: formData.sekolah.trim(),
        mapel: formData.mapel,
        email: formData.email.trim(),
        password: formData.password,
      };

      localStorage.setItem('gameedu_users', JSON.stringify([...users, newUser]));
      setInfoMsg('Pendaftaran akun berhasil! Silakan masuk menggunakan email & sandi Anda.');
      setMode('login');
      return;
    }

    // Proses Login
    const users = JSON.parse(localStorage.getItem('gameedu_users') || '[]');
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (matchedUser && matchedUser.password !== formData.password) {
      setError('Kata sandi salah. Silakan periksa kembali.');
      return;
    }

    const activeProfile = matchedUser || {
      nama: formData.email.split('@')[0].replace('.', ' '),
      nip: '199409142022031002',
      email: formData.email,
      sekolah: 'SMA Negeri 1 Belitang',
      mapel: 'Matematika',
    };

    onLoginSuccess(activeProfile);
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      nama: 'Uli Rizki, M.Kom',
      nip: '199205102020121004',
      email: 'ulirizki@unuha.ac.id',
      sekolah: 'Universitas Nurul Huda',
      mapel: 'Matematika & Informatika',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-white/40">
        {/* Panel Kiri: Identitas Visual Ceria DOLAN & ASALink Arena */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 font-black text-lg flex items-center justify-center shadow">
                D
              </div>
              <div>
                <span className="font-extrabold tracking-wide text-sm block leading-none">
                  DOLAN
                </span>
                <span className="text-[11px] text-sky-200 font-medium">
                  ASALink Arena • Web Guru
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
              Belajar Seru Seperti Bermain Game!
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Susun bank soal interaktif, atur tingkat kesulitan HOTS, dan tampilkan kuis seru di Smartboard kelas hanya dalam hitungan detik.
            </p>
          </div>

          {/* Kartu Ilustrasi Mini Game */}
          <div className="relative z-10 my-6 space-y-3">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Arena Kelas Interaktif
                </span>
                <span className="text-[11px] bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Terintegrasi
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <p className="font-extrabold text-white">⚡ Speed Clash</p>
                  <p className="text-[11px] text-blue-100 mt-0.5">Adu cepat individu</p>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <p className="font-extrabold text-white">🌾 Territory Grid</p>
                  <p className="text-[11px] text-blue-100 mt-0.5">Rebut sawah tim</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-blue-200 border-t border-white/15 pt-4">
            <span>Pendidikan Teknologi Informasi</span>
            <span className="font-bold text-white">UNUHA</span>
          </div>
        </div>

        {/* Panel Kanan: Form Autentikasi Lengkap */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900">
              {mode === 'login' && 'Selamat Datang, Pendidik!'}
              {mode === 'register' && 'Buat Akun Guru Baru'}
              {mode === 'forgot' && 'Pulihkan Kata Sandi'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {mode === 'login' && 'Masuk untuk mengelola bank soal dan memulai arena kelas.'}
              {mode === 'register' && 'Isi formulir di bawah ini untuk membuat ruang kelas digital.'}
              {mode === 'forgot' && 'Masukkan email terdaftar untuk menerima kode pemulihan.'}
            </p>
          </div>

          {/* Navigasi Tab Login / Registrasi */}
          {mode !== 'forgot' && (
            <div className="grid grid-cols-2 bg-slate-100 p-1.5 rounded-2xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`py-2.5 text-sm font-extrabold rounded-xl transition cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Masuk Akun
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                  setInfoMsg('');
                }}
                className={`py-2.5 text-sm font-extrabold rounded-xl transition cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daftar Baru
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              ⚠️ {error}
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Nama Lengkap & Gelar *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Contoh: Rina Marlina, S.Pd"
                        className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      NIP / NUPTK (Opsional)
                    </label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        name="nip"
                        value={formData.nip}
                        onChange={handleChange}
                        placeholder="Nomor induk pendidik"
                        className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Asal Sekolah / Kampus *
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        name="sekolah"
                        value={formData.sekolah}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Mata Pelajaran Utama *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <select
                        name="mapel"
                        value={formData.mapel}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Matematika">Matematika</option>
                        <option value="Informatika">Informatika</option>
                        <option value="IPA / Biologi">IPA / Biologi</option>
                        <option value="Fisika">Fisika</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Alamat Email Guru *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@sekolah.sch.id"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className={mode === 'register' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Kata Sandi *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Masukkan kata sandi"
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {mode === 'register' && formData.password && (
                    <div className="mt-1.5">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${pwdStrength.color} ${pwdStrength.width}`} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {pwdStrength.label}
                      </span>
                    </div>
                  )}
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Ulangi Kata Sandi *
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Ketik ulang sandi"
                        className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'login' && (
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <label className="inline-flex items-center gap-2 text-slate-600 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Ingat sesi masuk saya</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setError('');
                  }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Lupa kata sandi?
                </button>
              </div>
            )}

            {mode === 'register' && (
              <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span>Saya menyetujui kebijakan penggunaan platform edukasi DOLAN.</span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>
                {mode === 'login' && 'Masuk ke Dashboard Guru'}
                {mode === 'register' && 'Daftarkan Akun Guru'}
                {mode === 'forgot' && 'Kirim Tautan Pemulihan'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {mode === 'forgot' ? (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full py-2 text-xs font-bold text-slate-600 hover:text-blue-600"
              >
                ← Kembali ke halaman Masuk
              </button>
            ) : (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Ingin langsung mencoba tampilan?</span>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold transition cursor-pointer"
                >
                  ⚡ Masuk Akun Demo
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}