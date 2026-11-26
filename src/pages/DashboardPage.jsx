import React, { useState } from 'react';
import {
  Plus,
  Play,
  Sparkles,
  Share2,
  Search,
  Lightbulb,
  Zap,
  Grid,
} from 'lucide-react';
import StatCards from '../components/StatCards';
import QuestionCard from '../components/QuestionCard';

export default function DashboardPage({
  questions,
  onNavigateAdd,
  onNavigateSession,
  onEditQuestion,
  onDeleteQuestion,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBab, setSelectedBab] = useState('Semua Bab');
  const [toastMsg, setToastMsg] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.bab.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBab = selectedBab === 'Semua Bab' || q.bab === selectedBab;
    return matchSearch && matchBab;
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl">
          ✨ {toastMsg}
        </div>
      )}

      {/* Hero Banner Ceria ala DOLAN / ASALink Arena */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-600/20">
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black mb-3">
              🎮 DOLAN • ASALink Arena
            </span>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
              Ubah bab jadi arena kelas!
            </h1>
            <p className="text-sm text-blue-100 mb-6 leading-relaxed">
              Pilih soal terbaikmu, luncurkan permainan ke Smartboard, dan biarkan siswa berlomba menjawab lewat ponsel mereka.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onNavigateAdd}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Soal</span>
              </button>
              <button
                onClick={onNavigateSession}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-700 hover:bg-sky-50 font-extrabold text-sm shadow-sm transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Buat Sesi Game</span>
              </button>
            </div>
          </div>

          {/* Ilustrasi Petak Rebut Sawah Mini */}
          <div className="hidden md:grid grid-cols-3 gap-2.5 absolute right-7 top-1/2 -translate-y-1/2">
            {[
              { label: 'A', bg: 'bg-sky-400/30 text-white' },
              { label: '🌱', bg: 'bg-emerald-400/30 text-white' },
              { label: 'B', bg: 'bg-orange-400/30 text-white' },
              { label: 'C', bg: 'bg-violet-400/30 text-white' },
              { label: '500', bg: 'bg-amber-400 text-slate-900 font-black' },
              { label: 'D', bg: 'bg-pink-400/30 text-white' },
              { label: '🌱', bg: 'bg-emerald-400/30 text-white' },
              { label: 'A', bg: 'bg-sky-400/30 text-white' },
              { label: 'B', bg: 'bg-orange-400/30 text-white' },
            ].map((item, i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-sm border border-white/20 backdrop-blur-xs ${item.bg}`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Kartu Tips Hari Ini & Sesi Terakhir */}
        <div className="xl:col-span-4 flex flex-col justify-between gap-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-5">
            <div className="flex items-center gap-2 text-amber-800 font-black text-xs mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Tips hari ini • Campur level Bloom</span>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Sisipkan <strong>1 soal C4 (HOTS)</strong> setiap 3 soal C1–C2 agar siswa tidak hanya menghafal rumus, tetapi juga melatih logika.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Sesi selesai • Speed Clash XI IPA 2
            </span>
            <p className="text-sm font-extrabold text-slate-900 mt-2">
              32 Siswa Berpartisipasi
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Peringkat #1: Dimas Pratama (980 poin)
            </p>
          </div>
        </div>
      </div>

      {/* 3 Kartu Statistik */}
      <StatCards questions={questions} />

      {/* Pilihan Mode Game & Komunitas Guru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-orange-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Speed Clash</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Adu cepat menjawab soal individu. Jawaban tercepat dan benar mendapat bonus poin ekstra.
              </p>
            </div>
            <button
              onClick={onNavigateSession}
              className="mt-4 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition cursor-pointer"
            >
              Mainkan Speed Clash
            </button>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Grid className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Territory Grid</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Mode tim Rebut Sawah! Kapten memilih petak bertanda tunas dan merebut Lumbung 500 poin.
              </p>
            </div>
            <button
              onClick={onNavigateSession}
              className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition cursor-pointer"
            >
              Mainkan Territory Grid
            </button>
          </div>
        </div>

        {/* Ajakan Berbagi Soal */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>Ajakan berbagi soal</span>
            </h3>
            <span className="text-[11px] font-bold text-blue-600">MGMP Sekolah</span>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold text-slate-900">Guru Matematika</p>
              <p className="text-[11px] text-slate-500">Membagikan 30 soal Bab 2 Fungsi</p>
            </div>
            <button
              onClick={() => showToast('Paket 30 soal Bab 2 Fungsi berhasil ditambahkan ke Bank Soal!')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 cursor-pointer"
            >
              Pakai
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-violet-50/70 border border-violet-100 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold text-slate-900">Guru Fisika</p>
              <p className="text-[11px] text-slate-500">Mengajak menyusun kuis lintas mapel</p>
            </div>
            <button
              onClick={() => showToast('Undangan kolaborasi penyusunan soal diterima!')}
              className="px-3.5 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-extrabold hover:bg-violet-700 cursor-pointer"
            >
              Gabung
            </button>
          </div>
        </div>
      </div>

      {/* Daftar Bank Soal */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Daftar Bank Soal</span>
            </h2>
            <p className="text-xs text-slate-500">
              Kelola pertanyaan yang akan muncul pada sesi Speed Clash & Territory Grid
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan..."
                className="w-full sm:w-52 pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedBab}
              onChange={(e) => setSelectedBab(e.target.value)}
              className="px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white"
            >
              <option value="Semua Bab">Semua Bab</option>
              <option value="Bab 3 - Barisan dan deret">Bab 3 - Barisan dan deret</option>
              <option value="Bab 2 - Fungsi">Bab 2 - Fungsi</option>
              <option value="Bab 1 - Bangun Datar">Bab 1 - Bangun Datar</option>
            </select>

            <button
              onClick={onNavigateAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah soal</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onEdit={onEditQuestion}
              onDelete={onDeleteQuestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}