import React from 'react';
import { Clock, Trash2, CheckCircle2, Sparkles, Edit3 } from 'lucide-react';

export default function QuestionCard({ question, onEdit, onDelete }) {
  const bloomStyles = {
    C1: 'bg-slate-100 text-slate-700',
    C2: 'bg-sky-100 text-sky-700',
    C3: 'bg-indigo-100 text-indigo-700',
    C4: 'bg-amber-100 text-amber-800',
    C5: 'bg-orange-100 text-orange-800',
    C6: 'bg-rose-100 text-rose-800',
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-md transition flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
              bloomStyles[question.bloom] || 'bg-blue-100 text-blue-700'
            }`}
          >
            {question.bloom}
          </span>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg">
            {question.bab}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {question.kesulitan}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            {question.durasi} dtk
          </span>
          {question.reviewed && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Siap dipakai
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
          {question.pertanyaan}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          {Object.entries(question.opsi).map(([key, val]) => (
            <div
              key={key}
              className={`text-xs px-3 py-2 rounded-xl border ${
                question.kunci === key
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-extrabold'
                  : 'bg-slate-50 border-slate-200/80 text-slate-600 font-medium'
              }`}
            >
              <span className="font-black mr-1">{key}.</span> {val}
            </div>
          ))}
        </div>

        {question.pembahasan && (
          <div className="text-xs text-slate-600 bg-amber-50/70 border border-amber-200/60 rounded-xl px-3 py-2 flex items-start gap-2 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Pembahasan:</strong> {question.pembahasan}
            </span>
          </div>
        )}
      </div>

      <div className="flex sm:flex-col items-center gap-2 self-end sm:self-start">
        <button
          onClick={() => onEdit(question)}
          title="Edit soal"
          className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(question.id)}
          title="Hapus soal"
          className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}