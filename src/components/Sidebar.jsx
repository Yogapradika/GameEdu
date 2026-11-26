import React from 'react';
import {
  Home,
  Database,
  PlusCircle,
  Gamepad2,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
  MonitorCheck,
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, user, onLogout, isOpen, onClose }) {
  const menuItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home, badge: null },
    { id: 'bank-soal', label: 'Bank soal', icon: Database, badge: null },
    { id: 'tambah-soal', label: 'Tambah soal', icon: PlusCircle, badge: 'Baru' },
    { id: 'buat-sesi', label: 'Buat sesi game', icon: Gamepad2, badge: null },
    { id: 'kelas', label: 'Kelas & siswa', icon: Users, badge: '32' },
    { id: 'laporan', label: 'Laporan', icon: BarChart3, badge: null },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings, badge: null },
  ];

  const handleSelect = (id) => {
    setActivePage(id);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center shadow-sm">
                A
              </div>
              <div>
                <span className="font-black text-slate-900 text-sm block leading-none">
                  ASALink Arena
                </span>
                <span className="text-[11px] font-bold text-orange-500">
                  DOLAN • Game Edu
                </span>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Utama */}
          <nav className="p-3.5 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 hover:bg-sky-50/70 hover:text-blue-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Status Smartboard & Profil Guru */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs">
              <MonitorCheck className="w-4 h-4 shrink-0" />
              <span>Smartboard Terhubung</span>
            </div>
            <p className="text-[11px] text-emerald-800/80 mt-0.5">
              Ruang XI IPA 2 • Kode: <strong className="font-mono">K7Q-29D</strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3">
            <p className="text-xs font-extrabold text-slate-900 truncate">{user?.nama}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.sekolah}</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-extrabold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>
    </>
  );
}