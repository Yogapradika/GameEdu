import React from 'react';
import { Menu, Plus, Sparkles } from 'lucide-react';

export default function Topbar({ activePage, user, onOpenSidebar, onQuickAdd }) {
  const pageTitles = {
    dashboard: 'Beranda & Ringkasan Arena',
    'bank-soal': 'Bank Soal Pembelajaran',
    'tambah-soal': 'Tambah Soal Baru',
    'buat-sesi': 'Buat Sesi Game Kelas',
    kelas: 'Manajemen Kelas & Siswa',
    laporan: 'Laporan Hasil Permainan',
    pengaturan: 'Pengaturan Akun & Smartboard',
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
          aria-label="Buka menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="truncate">
          <h2 className="text-sm sm:text-base font-black text-slate-900 truncate">
            {pageTitles[activePage] || 'Dashboard Guru'}
          </h2>
          <p className="text-[11px] text-slate-500 hidden sm:block truncate">
            {user?.mapel} • Kelas Aktif XI IPA 2
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {activePage !== 'tambah-soal' && (
          <button
            onClick={onQuickAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Soal</span>
          </button>
        )}

        <div className="flex items-center gap-2 bg-sky-50 border border-sky-200/70 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-extrabold text-blue-800 max-w-[110px] sm:max-w-none truncate">
            {user?.nama}
          </span>
        </div>
      </div>
    </header>
  );
}