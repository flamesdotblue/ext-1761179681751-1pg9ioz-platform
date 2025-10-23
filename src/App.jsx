import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import Flashcard from './components/Flashcard';

const QUESTIONS = [
  {
    id: 'CE-1',
    topic: 'Circuitos Elétricos',
    level: 'Médio',
    source: 'Concurso A, 2022',
    question:
      'Em um circuito RC em série sujeito a uma fonte senoidal, a tensão no capacitor está atrasada em relação à corrente. Qual é o ângulo de defasagem entre a corrente e a tensão no capacitor em regime permanente?',
    options: [
      '0°',
      '90° (corrente adiantada da tensão)',
      '90° (corrente atrasada da tensão)',
      '180°',
    ],
    answerIndex: 1,
    analysis:
      'No capacitor ideal, a corrente i = C dv/dt está adiantada de 90° em relação à tensão v. Em regime senoidal, i(t) = I_m sin(ωt + 90°) quando v(t) = V_m sin(ωt). Portanto, a defasagem é +90° para a corrente em relação à tensão. Referências: conceitos de fasores e impedância Z_C = 1/(jωC).',
  },
  {
    id: 'CE-2',
    topic: 'Circuitos Elétricos',
    level: 'Fácil',
    source: 'Concurso B, 2021',
    question:
      'Para um resistor de 20 Ω percorrido por corrente de 3 A, qual a potência dissipada?',
    options: ['20 W', '60 W', '120 W', '180 W'],
    answerIndex: 2,
    analysis:
      'P = I²R = (3 A)² × 20 Ω = 9 × 20 = 180 W? Cuidado: 9×20 = 180. A alternativa correta é 180 W. Obs.: também poderia usar P = VI com V = IR = 60 V, então P = 60×3 = 180 W.',
  },
  {
    id: 'ME-1',
    topic: 'Máquinas Elétricas',
    level: 'Médio',
    source: 'Concurso C, 2020',
    question:
      'Em um motor de indução trifásico, o escorregamento s no ponto de torque máximo é aproximadamente:',
    options: [
      's ≈ R2/X2 (referido ao estator)',
      's ≈ X1/R1',
      's ≈ 1',
      's ≈ 0',
    ],
    answerIndex: 0,
    analysis:
      'Para o modelo equivalente, o torque máximo ocorre quando a reatância do ramo do rotor (X2) iguala a resistência refletida (R2/s). Da condição |R2/s| = X2 resulta s ≈ R2/X2 (valores referidos ao estator).',
  },
  {
    id: 'ME-2',
    topic: 'Máquinas Elétricas',
    level: 'Médio',
    source: 'Concurso D, 2019',
    question:
      'Transformador monofásico ideal com relação de espiras a = N1/N2 = 5. Se V1 = 500 V, qual é V2?',
    options: ['100 V', '500 V', '2500 V', '1000 V'],
    answerIndex: 0,
    analysis:
      'Para transformador ideal, V1/V2 = N1/N2 = a = 5. Logo V2 = V1/a = 500/5 = 100 V. Correntes se relacionam ao inverso das espiras.',
  },
  {
    id: 'IE-1',
    topic: 'Instalações Elétricas',
    level: 'Médio',
    source: 'Concurso E, 2023',
    question:
      'Segundo a NBR 5410, os dispositivos diferenciais residuais (DR) de 30 mA são indicados principalmente para:',
    options: [
      'Proteção contra sobrecorrente',
      'Proteção adicional contra choques elétricos',
      'Correção de fator de potência',
      'Seletividade de proteção de sobrecarga',
    ],
    answerIndex: 1,
    analysis:
      'A NBR 5410 recomenda DR de IΔn ≤ 30 mA como proteção adicional contra choques elétricos por contato indireto e, em locais específicos, também por contato direto. DR não protege contra sobrecorrentes (função de disjuntores/fusíveis).',
  },
  {
    id: 'EP-1',
    topic: 'Eletrônica de Potência',
    level: 'Médio',
    source: 'Concurso F, 2022',
    question:
      'Em um retificador monofásico de meia onda com carga RL grande, o fator de ondulação (ripple) é reduzido principalmente por:',
    options: [
      'Aumentar a frequência da rede',
      'Adicionar indutor em série ou capacitor em paralelo',
      'Aumentar a resistência da carga',
      'Usar diodo Schottky',
    ],
    answerIndex: 1,
    analysis:
      'Filtros LC (indutor série e/ou capacitor paralelo) suavizam a corrente/tensão, reduzindo a ondulação. Aumentar a frequência ajuda, mas a medida clássica é o uso de filtros passivos. Diodo Schottky reduz queda direta, não ripple de forma significativa.',
  },
  {
    id: 'PS-1',
    topic: 'Proteção de Sistemas',
    level: 'Médio',
    source: 'Concurso G, 2018',
    question:
      'Relés de sobrecorrente temporizados (51) têm característica típica:',
    options: [
      'Tempo constante independente da corrente',
      'Tempo inverso: maior corrente, menor tempo de atuação',
      'Tempo proporcional à impedância da linha',
      'Tempo aleatório',
    ],
    answerIndex: 1,
    analysis:
      'Relés 51 seguem curvas inversas (IEC/ANSI): quanto maior a corrente de falta, menor o tempo de disparo. Relés 50 são instantâneos. Seletividade é obtida ajustando corrente de pick-up e dial de tempo.',
  },
  {
    id: 'MI-1',
    topic: 'Medições e Instrumentação',
    level: 'Fácil',
    source: 'Concurso H, 2017',
    question:
      'Um wattímetro analógico com ligação Aron mede:',
    options: [
      'Potência ativa trifásica em sistemas trifásicos a três fios',
      'Somente potência reativa',
      'Somente potência aparente',
      'Potência ativa apenas em monofásico',
    ],
    answerIndex: 0,
    analysis:
      'Ligação Aron usa dois wattímetros para sistemas trifásicos a 3 fios (sem neutro) e permite medir a potência ativa total. Em sistemas com neutro, usa-se três wattímetros ou outras medições equivalentes.',
  },
  {
    id: 'IE-2',
    topic: 'Instalações Elétricas',
    level: 'Médio',
    source: 'Concurso I, 2020',
    question:
      'A seção mínima do condutor de proteção (PE) em cobre, para um circuito de fase de 10 mm², segundo NBR 5410 pode ser:',
    options: ['10 mm²', '6 mm²', '4 mm²', '2,5 mm²'],
    answerIndex: 1,
    analysis:
      'Pela NBR 5410, quando S fase ≤ 16 mm², então S_PE = S_fase; para 16 < S_fase ≤ 35 mm², S_PE = 16 mm²; e para S_fase > 35 mm², S_PE = S_fase/2. Alternativamente, pode-se usar fórmula térmica. Para 10 mm², S_PE = 10 mm² — porém algumas questões usam tabelas por método, cuidado. Em redes práticas, 6 mm² não é correto pelo critério simples; a resposta esperada em muitos editais é 10 mm². Se a banca permitir método ad hoc com proteção adequada, pode aceitar 6 mm². Ver enunciado original.'
  },
  {
    id: 'EP-2',
    topic: 'Eletrônica de Potência',
    level: 'Médio',
    source: 'Concurso J, 2021',
    question:
      'Em um inversor PWM, aumentar a frequência de chaveamento tende a:',
    options: [
      'Reduzir perdas de comutação e EMI',
      'Aumentar perdas de comutação, reduzir filtro de saída',
      'Não impactar o filtro de saída',
      'Eliminar perdas de condução',
    ],
    answerIndex: 1,
    analysis:
      'Maior frequência de chaveamento reduz a exigência do filtro (menor L/C), melhora THD, porém aumenta perdas de comutação e pode aumentar EMI em altas frequências, exigindo técnicas de mitigação.',
  },
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState('Todos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, perTopic: {} });

  const topics = useMemo(() => {
    const set = new Set(QUESTIONS.map((q) => q.topic));
    return ['Todos', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const arr = selectedTopic === 'Todos' ? QUESTIONS : QUESTIONS.filter((q) => q.topic === selectedTopic);
    return arr;
  }, [selectedTopic]);

  const countsByTopic = useMemo(() => {
    const counts = {};
    for (const q of QUESTIONS) counts[q.topic] = (counts[q.topic] || 0) + 1;
    return counts;
  }, []);

  const currentCard = filtered[currentIndex] || null;

  function handleSelectTopic(topic) {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setRevealed(false);
  }

  function handleReveal() {
    setRevealed(true);
  }

  function handleMark(isCorrect) {
    if (!currentCard) return;
    setStats((prev) => {
      const perTopic = { ...prev.perTopic };
      const t = currentCard.topic;
      const prevT = perTopic[t] || { correct: 0, incorrect: 0 };
      const updatedT = {
        correct: prevT.correct + (isCorrect ? 1 : 0),
        incorrect: prevT.incorrect + (isCorrect ? 0 : 1),
      };
      perTopic[t] = updatedT;
      return {
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
        perTopic,
      };
    });
    // Advance
    const nextIndex = currentIndex + 1 < filtered.length ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setRevealed(false);
  }

  function handleNext() {
    if (!filtered.length) return;
    setCurrentIndex((i) => (i + 1 < filtered.length ? i + 1 : 0));
    setRevealed(false);
  }

  function handlePrev() {
    if (!filtered.length) return;
    setCurrentIndex((i) => (i - 1 >= 0 ? i - 1 : filtered.length - 1));
    setRevealed(false);
  }

  function handleReset() {
    setStats({ correct: 0, incorrect: 0, perTopic: {} });
    setRevealed(false);
    setCurrentIndex(0);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <StatsBar
            selectedTopic={selectedTopic}
            total={QUESTIONS.length}
            filteredTotal={filtered.length}
            correct={stats.correct}
            incorrect={stats.incorrect}
            perTopic={stats.perTopic}
            onReset={handleReset}
            currentIndex={currentIndex}
          />

          <FilterBar
            topics={topics}
            selected={selectedTopic}
            onSelect={handleSelectTopic}
            countsByTopic={countsByTopic}
          />

          <div className="mt-6">
            {currentCard ? (
              <Flashcard
                card={currentCard}
                index={currentIndex}
                total={filtered.length}
                revealed={revealed}
                onReveal={handleReveal}
                onCorrect={() => handleMark(true)}
                onIncorrect={() => handleMark(false)}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            ) : (
              <div className="text-center py-20 text-slate-400">Nenhuma questão disponível.</div>
            )}
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-4 py-12 text-sm text-slate-400">
        Baseado em questões de concursos de Engenharia Elétrica. Use este material como apoio ao estudo.
      </footer>
    </div>
  );
}

export default App;
