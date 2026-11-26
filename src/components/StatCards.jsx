import React from 'react';
import { BookCheck, CheckCircle2, Flame } from 'lucide-react';

export default function StatCards({ questions }) {
  const totalSoal = questions.length;
  const sudahDireview = questions.filter((q) => q.reviewed).length;
  const soalHots = questions.filter((q) => ['C4', 'C5', 'C6'].includes(q.bloom)).length;
  const persenHots = totalSoal > 0 ? Math.round((soalHots / totalSoal) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-extrabold text-slate-500">Total soal aktif</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{totalSoal}</p>
          <span className="inline-block mt-1.5 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg">
            Siap dimainkan di kelas
          </span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <BookCheck className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-extrabold text-slate-500">Sudah direview</p>
          <p className="text-3xl font-black text-emerald-600 mt-1">
            {sudahDireview}{' '}
            <span className="text-sm font-bold text-slate-400">dari {totalSoal}</span>
          </p>
          <span className="inline-block mt-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg">
            Terverifikasi kunci jawaban
          </span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-extrabold text-slate-500">Soal HOTS (C4–C6)</p>
          <p className="text-3xl font-black text-orange-500 mt-1">{persenHots}%</p>
          <span className="inline-block mt-1.5 text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-lg">
            {soalHots} soal penalaran tinggi
          </span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
          <Flame className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}