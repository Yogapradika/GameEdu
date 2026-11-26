import React, { useState } from 'react';
import { ArrowLeft, Save, CheckCircle2, HelpCircle, FileText } from 'lucide-react';

export default function AddQuestionPage({ editingQuestion, onBack, onSaveQuestion }) {
  const [form, setForm] = useState({
    mapel: editingQuestion?.mapel || 'Matematika',
    bab: editingQuestion?.bab || 'Bab 3 - Barisan dan deret',
    tipe: editingQuestion?.tipe || 'Pilihan ganda',
    bloom: editingQuestion?.bloom || 'C3',
    kesulitan: editingQuestion?.kesulitan || 'Sedang',
    durasi: editingQuestion?.durasi || 30,
    pertanyaan: editingQuestion?.pertanyaan || '',
    opsiA: editingQuestion?.opsi?.A || '',
    opsiB: editingQuestion?.opsi?.B || '',
    opsiC: editingQuestion?.opsi?.C || '',
    opsiD: editingQuestion?.opsi?.D || '',
    kunci: editingQuestion?.kunci || 'B',
    kunciEsai: editingQuestion?.kunciEsai || '',
    pembahasan: editingQuestion?.pembahasan || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.pertanyaan.trim()) {
      setError('Teks pertanyaan wajib diisi.');
      return;
    }

    if (form.tipe === 'Pilihan ganda') {
      if (!form.opsiA.trim() || !form.opsiB.trim() || !form.opsiC.trim() || !form.opsiD.trim()) {
        setError('Keempat pilihan jawaban (A, B, C, dan D) wajib dilengkapi.');
        return;
      }
    } else if (form.tipe === 'Esai') {
      if (!form.kunciEsai.trim()) {
        setError('Kunci jawaban / pedoman penilaian esai wajib diisi.');
        return;
      }
    }

    const questionPayload = {
      id: editingQuestion ? editingQuestion.id : Date.now(),
      mapel: form.mapel,
      bab: form.bab,
      tipe: form.tipe,
      bloom: form.bloom,
      kesulitan: form.kesulitan,
      durasi: Number(form.durasi) || 30,
      pertanyaan: form.pertanyaan.trim(),
      opsi:
        form.tipe === 'Pilihan ganda'
          ? {
              A: form.opsiA.trim(),
              B: form.opsiB.trim(),
              C: form.opsiC.trim(),
              D: form.opsiD.trim(),
            }
          : null,
      kunci: form.tipe === 'Pilihan ganda' ? form.kunci : null,
      kunciEsai: form.tipe === 'Esai' ? form.kunciEsai.trim() : null,
      pembahasan:
        form.pembahasan.trim() ||
        (form.tipe === 'Pilihan ganda'
          ? `Jawaban yang tepat adalah opsi ${form.kunci}.`
          : form.kunciEsai.trim()),
      reviewed: true,
    };

    onSaveQuestion(questionPayload);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-600 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke bank soal</span>
        </button>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {editingQuestion ? 'Mode Edit Soal' : 'Soal Baru • ASALink Arena'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-extrabold">
            ⚠️ {error}
          </div>
        )}

        {/* Identitas Soal */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-black text-slate-900">1. Identitas soal</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Mapel</label>
              <select
                name="mapel"
                value={form.mapel}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Matematika">Matematika</option>
                <option value="Informatika">Informatika</option>
                <option value="Biologi">Biologi</option>
                <option value="Fisika">Fisika</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Bab</label>
              <select
                name="bab"
                value={form.bab}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bab 3 - Barisan dan deret">Bab 3 - Barisan dan deret</option>
                <option value="Bab 2 - Fungsi">Bab 2 - Fungsi</option>
                <option value="Bab 1 - Bangun Datar">Bab 1 - Bangun Datar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Tipe soal</label>
              <select
                name="tipe"
                value={form.tipe}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pilihan ganda">Pilihan ganda</option>
                <option value="Esai">Esai</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Level Bloom</label>
              <select
                name="bloom"
                value={form.bloom}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="C1">C1 - Mengingat</option>
                <option value="C2">C2 - Memahami</option>
                <option value="C3">C3 - Menerapkan</option>
                <option value="C4">C4 - Menganalisis (HOTS)</option>
                <option value="C5">C5 - Mengevaluasi (HOTS)</option>
                <option value="C6">C6 - Mencipta (HOTS)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Kesulitan</label>
              <select
                name="kesulitan"
                value={form.kesulitan}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Durasi (detik)</label>
              <input
                type="number"
                min="10"
                max="300"
                name="durasi"
                value={form.durasi}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Isi Soal & Jawaban */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <h2 className="text-base font-black text-slate-900">
            {form.tipe === 'Pilihan ganda' ? '2. Isi soal & opsi jawaban' : '2. Isi soal & kunci esai'}
          </h2>

          <div>
            <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Teks soal</label>
            <textarea
              rows="3"
              name="pertanyaan"
              value={form.pertanyaan}
              onChange={handleChange}
              placeholder={
                form.tipe === 'Pilihan ganda'
                  ? 'Contoh: Jumlah 10 suku pertama deret 2 + 4 + 6 + ... adalah?'
                  : 'Contoh: Jelaskan langkah menentukan suku ke-n pada barisan aritmetika beserta contohnya!'
              }
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {form.tipe === 'Pilihan ganda' ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="text-xs font-extrabold text-slate-600">
                  Opsi jawaban — klik huruf A/B/C/D untuk menetapkan kunci jawaban
                </label>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                  ✓ Kunci Jawaban: {form.kunci}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['A', 'B', 'C', 'D'].map((huruf) => {
                  const isCorrect = form.kunci === huruf;
                  return (
                    <div
                      key={huruf}
                      className={`flex items-center gap-2.5 p-2.5 rounded-2xl border-2 transition ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50/70'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, kunci: huruf }))}
                        className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 transition cursor-pointer ${
                          isCorrect
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-500'
                        }`}
                      >
                        {huruf}
                      </button>
                      <input
                        type="text"
                        name={`opsi${huruf}`}
                        value={form[`opsi${huruf}`]}
                        onChange={handleChange}
                        placeholder={`Isi jawaban ${huruf}...`}
                        className="w-full bg-transparent text-sm font-medium focus:outline-none"
                      />
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-extrabold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Kunci Jawaban / Pedoman Penilaian Esai *</span>
              </label>
              <textarea
                rows="3"
                name="kunciEsai"
                value={form.kunciEsai}
                onChange={handleChange}
                placeholder="Tuliskan jawaban ideal atau poin-poin penting yang harus dijawab siswa..."
                className="w-full px-4 py-3 text-sm border border-emerald-200 bg-emerald-50/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-extrabold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Pembahasan (tampil setelah siswa menjawab)</span>
            </label>
            <textarea
              rows="2"
              name="pembahasan"
              value={form.pembahasan}
              onChange={handleChange}
              placeholder="Contoh: S10 = 10/2 × (2×2 + 9×2) = 5 × 22 = 110"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-2xl border border-slate-300 bg-white text-slate-700 font-extrabold text-sm hover:bg-slate-50 transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{editingQuestion ? 'Simpan Perubahan' : 'Simpan soal'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}