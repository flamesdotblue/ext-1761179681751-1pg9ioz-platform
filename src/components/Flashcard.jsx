import { useMemo } from 'react';
import { Eye, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Flashcard({ card, index, total, revealed, onReveal, onCorrect, onIncorrect, onNext, onPrev }) {
  const letteredOptions = useMemo(() => {
    if (!card.options) return [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return card.options.map((opt, i) => ({ key: letters[i] || String(i + 1), text: opt, isAnswer: i === card.answerIndex }));
  }, [card]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
        <span>Questão {index + 1} de {total}</span>
        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">
          {card.topic} • {card.level} • {card.source}
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4 sm:p-6 shadow-xl">
        <h3 className="text-lg sm:text-xl font-semibold leading-snug text-white">{card.question}</h3>

        {letteredOptions.length > 0 && (
          <ul className="mt-4 grid gap-2">
            {letteredOptions.map((opt) => (
              <li key={opt.key} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/10 text-xs text-slate-200 border border-white/10">
                  {opt.key}
                </span>
                <span className="text-slate-200">{opt.text}</span>
              </li>
            ))}
          </ul>
        )}

        {!revealed ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={onReveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition">
              <Eye className="w-4 h-4" /> Revelar Resposta
            </button>
            <div className="text-sm text-slate-400">Marque após revelar.</div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-sm uppercase tracking-wide text-emerald-300 font-semibold">Resposta Correta</div>
              <div className="mt-1 text-lg text-emerald-200 font-medium">
                {letteredOptions.length > 0 ? `${letteredOptions[card.answerIndex]?.key} — ${letteredOptions[card.answerIndex]?.text}` : 'Ver análise abaixo'}
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm uppercase tracking-wide text-slate-300 font-semibold">Análise</div>
              <p className="mt-2 text-slate-200 leading-relaxed">{card.analysis}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button onClick={onCorrect} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition">
                <Check className="w-4 h-4" /> Acertei
              </button>
              <button onClick={onIncorrect} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500 text-slate-900 font-semibold hover:bg-rose-400 transition">
                <X className="w-4 h-4" /> Errei
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button onClick={onPrev} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          <button onClick={onNext} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm">
            Próxima <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
