import { useMemo } from 'react';

export default function FilterBar({ topics, selected, onSelect, countsByTopic }) {
  const chips = useMemo(() => topics, [topics]);
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {chips.map((t) => {
        const isActive = selected === t;
        const count = t === 'Todos' ? Object.values(countsByTopic).reduce((a, b) => a + b, 0) : countsByTopic[t] || 0;
        return (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={
              'px-3 py-1.5 rounded-full text-sm border transition ' +
              (isActive
                ? 'bg-cyan-500 text-slate-900 border-cyan-400 shadow'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10')
            }
          >
            <span className="font-medium">{t}</span>
            <span className={
              'ml-2 inline-flex items-center justify-center min-w-[1.5rem] px-1.5 rounded-full ' +
              (isActive ? 'bg-cyan-600/80 text-white' : 'bg-white/10 text-slate-300')
            }>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
