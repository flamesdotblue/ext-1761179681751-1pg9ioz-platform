import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/DAWBaaySM7FLUKpn/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto h-full px-4 flex items-center">
        <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 text-cyan-300 mb-3">
            <Rocket className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-semibold">Estudos Interativos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Flashcards de Engenharia Elétrica para Concursos
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Estude por temas, revele respostas com análises detalhadas, acompanhe acertos e erros e avance no seu ritmo.
          </p>
        </div>
      </div>
    </section>
  );
}
