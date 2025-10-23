import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function StatsBar({ selectedTopic, total, filteredTotal, correct, incorrect, perTopic, onReset, currentIndex }) {
  const topicStats = perTopic[selectedTopic] || { correct: 0, incorrect: 0 };
  const progressLabel = filteredTotal > 0 ? `${currentIndex + 1} / ${filteredTotal}` : '0 / 0';
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-slate-300 text-sm">Acertos</span>
          <span className="text-lg font-semibold text-white">{correct}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-rose-400" />
          <span className="text-slate-300 text-sm">Erros</span>
          <span className="text-lg font-semibold text-white">{incorrect}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
          <span>Tema:</span>
          <span className="font-medium text-slate-100">{selectedTopic}</span>
          <span className="text-slate-500">•</span>
          <span>Progresso:</span>
          <span className="font-medium text-slate-100">{progressLabel}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <div>Tema atual: <span className="text-slate-100 font-medium">{selectedTopic}</span></div>
          <div>
            Acertos/Erros no tema: <span className="text-emerald-400 font-semibold">{topicStats.correct}</span> / <span className="text-rose-400 font-semibold">{topicStats.incorrect}</span>
          </div>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Resetar
        </button>
      </div>
    </div>
  );
}
