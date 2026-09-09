import React from 'react';
import { 
  Calculator, 
  ChevronDown,
  Lock
} from 'lucide-react';

interface HeroProps {
  onIrCotizador: () => void;
  onIrSeguimiento: () => void;
  onIrProyectos: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onIrCotizador,
  onIrSeguimiento,
  onIrProyectos
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#FAF9F5] text-stone-900">
      {/* Background Architectural Photography with Luminous Atelier Treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="Arquitectura Contemporánea y Construcción"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply filter contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F5]/80 via-[#FAF9F5]/95 to-[#FAF9F5]"></div>
        {/* Architectural Subtle Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Atelier Architectural Sub-header / Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#B59353]"></span>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#B59353]">
            Estudio de Arquitectura & Construcción
          </span>
          <span className="w-8 h-px bg-[#B59353]"></span>
        </div>

        {/* Hero Title with Elegant Cormorant Serif */}
        <h1 className="capitalize text-4xl sm:text-6xl lg:text-7xl font-light text-stone-900 max-w-4xl mx-auto leading-[1.08] mb-6 font-serif-arch">
          Espacios Con Carácter,{' '}
          <span className="italic font-normal text-[#B59353]">
            Rigor Constructivo
          </span>{' '}
          Y Honestidad Material.
        </h1>

        {/* Subtitle with refined typography */}
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Desarrollamos residencias costeras, villas contemporáneas y proyectos en la Riviera Maya integrando arquitectura bioclimática tropical, ingeniería antihuracán y supervisión técnica en tiempo real.
        </p>

        {/* Minimalist Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            id="hero-cotizador-cta"
            onClick={onIrCotizador}
            className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-[#B59353] hover:bg-[#A3803F] text-white font-medium text-xs uppercase tracking-[0.16em] shadow-md shadow-[#B59353]/15 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
          >
            <Calculator className="w-4 h-4" />
            <span>Estudio de Factibilidad</span>
          </button>

          <button
            id="hero-seguimiento-cta"
            onClick={onIrSeguimiento}
            className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-white/90 hover:bg-white text-stone-800 font-medium text-xs uppercase tracking-[0.16em] border border-stone-300 hover:border-[#B59353] flex items-center justify-center gap-2.5 transition-all shadow-xs"
          >
            <Lock className="w-3.5 h-3.5 text-[#B59353]" />
            <span>Acceso Clientes / Obra</span>
          </button>
        </div>

        {/* Refined Metric Ribbon with Architectural Typography */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-10 border-t border-stone-200">
          <div className="text-center p-2">
            <div className="text-2xl sm:text-4xl font-light text-stone-900 font-serif-arch">
              +140
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-stone-500 mt-1 font-medium">
              Obras Ejecutadas
            </div>
          </div>

          <div className="text-center p-2">
            <div className="text-2xl sm:text-4xl font-light text-[#B59353] font-serif-arch">
              98.4%
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-stone-500 mt-1 font-medium">
              Cumplimiento de Plazo
            </div>
          </div>

          <div className="text-center p-2">
            <div className="text-2xl sm:text-4xl font-light text-stone-900 font-serif-arch">
              15 Años
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-stone-500 mt-1 font-medium">
              Trayectoria
            </div>
          </div>

          <div className="text-center p-2">
            <div className="text-2xl sm:text-4xl font-light text-[#B59353] font-serif-arch">
              100%
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-stone-500 mt-1 font-medium">
              Presupuesto Garantizado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
