import React, { useState } from 'react';
import { Play, Users, Trophy, Monitor, CheckCircle2, Copy } from 'lucide-react';
import { initialStudents } from '../data/initialData';

export function CreateSessionPage({ questions }) {
  const [selectedMode, setSelectedMode] = useState('Speed Clash');
  const [selectedBab, setSelectedBab] = useState('Bab 3 - Barisan dan deret');
  const [roomCode, setRoomCode] = useState('615 207');
  const [launched, setLaunched] = useState(false);

  const generateNewCode = () => {
    const num1 = Math.floor(100 + Math.random() * 900);
    const num2 = Math.floor(100 + Math.random() * 900);
    setRoomCode(`${num1} ${num2}`);
    setLaunched(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
        <h2 className="text-lg font-black text-slate-900">Buat Sesi Game Baru (Smartboard)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedMode('Speed Clash')}
            className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
              selectedMode === 'Speed Clash'
                ? 'border-orange-500 bg-orange-50/70'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className="font-black text-slate-900">⚡ Speed Clash</p>
            <p className="text-xs text-slate-500 mt-1">
              Kuis cepat individu dengan papan peringkat langsung.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMode('Territory Grid')}
            className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
              selectedMode === 'Territory Grid'
                ? 'border-emerald-600 bg-emerald-50/70'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className="font-black text-slate-900">🌾 Territory Grid (Rebut Sawah)</p>
            <p className="text-xs text-slate-500 mt-1">
              Pertarungan 4 kelompok merebut petak sawah & Lumbung 500 poin.
            </p>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Pilih Paket Bab Soal</label>
            <select
              value={selectedBab}
              onChange={(e) => setSelectedBab(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white"
            >
              <option value="Bab 3 - Barisan dan deret">Bab 3 - Barisan dan deret ({questions.length} soal)</option>
              <option value="Bab 2 - Fungsi">Bab 2 - Fungsi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Kelas Target</label>
            <input
              type="text"
              readOnly
              value="XI IPA 2 (32 Siswa Terdaftar)"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 font-semibold"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400">Kode Room Smartboard</span>
            <p className="text-3xl font-black tracking-widest mt-1">{roomCode}</p>
            <p className="text-xs text-slate-300 mt-1">
              Mode: {selectedMode} • {selectedBab}
            </p>
          </div>

          <button
            type="button"
            onClick={generateNewCode}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{launched ? 'Buat Kode Baru' : 'Buka di Smartboard'}</span>
          </button>
        </div>

        {launched && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Sesi {selectedMode} aktif! Siswa dapat bergabung memakai kode room {roomCode}.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ClassStudentsPage() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Daftar Siswa Aktif • XI IPA 2</span>
          </h2>
          <p className="text-xs text-slate-500">Pembagian tim otomatis untuk mode Territory Grid</p>
        </div>
        <span className="text-xs font-extrabold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl">
          32 Siswa Terdaftar
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs text-slate-500">
              <th className="py-3 px-3">Nama Siswa</th>
              <th className="py-3 px-3">Tim Arena</th>
              <th className="py-3 px-3">Akurasi</th>
              <th className="py-3 px-3 text-right">Total Poin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialStudents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-bold text-slate-900">{s.nama}</td>
                <td className="py-3 px-3">
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg">
                    {s.tim}
                  </span>
                </td>
                <td className="py-3 px-3 text-xs font-semibold text-slate-600">{s.akurasi}%</td>
                <td className="py-3 px-3 text-right font-black text-blue-600">{s.poin} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ReportsAndSettingsPage({ mode, user }) {
  const [copied, setCopied] = useState(false);

  if (mode === 'laporan') {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Riwayat & Laporan Sesi Permainan</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
            <p className="text-xs font-bold text-slate-500">Speed Clash • Bab 3</p>
            <p className="text-xl font-black text-slate-900 mt-1">Rata-rata 84.5</p>
            <p className="text-xs text-emerald-700 font-semibold mt-1">32/32 siswa selesai</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <p className="text-xs font-bold text-slate-500">Territory Grid • Bab 2</p>
            <p className="text-xl font-black text-slate-900 mt-1">Pemenang: Tim Komering</p>
            <p className="text-xs text-emerald-700 font-semibold mt-1">Skor akhir 1.400 poin</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
            <p className="text-xs font-bold text-slate-500">Soal Tersulit</p>
            <p className="text-xl font-black text-slate-900 mt-1">Level C4 (HOTS)</p>
            <p className="text-xs text-amber-800 font-semibold mt-1">Tingkat benar 68%</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
      <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
        <Monitor className="w-5 h-5 text-blue-600" />
        <span>Pengaturan Profil & Pairing Smartboard</span>
      </h2>
      <div className="space-y-2 text-sm">
        <p><strong>Nama Guru:</strong> {user?.nama}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Instansi:</strong> {user?.sekolah}</p>
      </div>
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Kode Pairing Smartboard Kelas</p>
          <p className="text-xl font-black tracking-widest text-amber-400">K7Q-29D</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
        </button>
      </div>
    </div>
  );
}