import React, { useState } from 'react';
import { 
  MapPin, 
  ChevronRight, 
  X, 
  Award,
  Maximize2,
  Compass,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { PROYECTOS_DATA } from '../data/mockData';
import { ProjectItem, ProjectCategory } from '../types';

export const Proyectos: React.FC = () => {
  const [categoria, setCategoria] = useState<ProjectCategory>('todos');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<ProjectItem | null>(null);
  const [fotoActivaIndex, setFotoActivaIndex] = useState<number>(0);

  const proyectosFiltrados = PROYECTOS_DATA.filter((p) => {
    if (categoria === 'todos') return true;
    return p.category === categoria;
  });

  const abrirProyecto = (p: ProjectItem) => {
    setProyectoSeleccionado(p);
    setFotoActivaIndex(0);
  };

  return (
    <section id="proyectos" className="py-28 bg-[#FAF9F5] text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#B59353] mb-3">
              <span className="w-5 h-px bg-[#B59353]"></span>
              <span>Monografía de Obras</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-stone-900 font-serif-arch">
              Arquitectura & Obra Construida
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-2xl font-light leading-relaxed">
              Selección editorial de villas costeras, arquitectura bioclimática tropical, proyectos de hospitalidad e intervenciones en la Riviera Maya donde convergen la identidad material y el rigor constructivo.
            </p>
          </div>

          {/* Minimalist Category Tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 pb-1 border-b border-stone-200">
            {[
              { id: 'todos', label: 'Todas las Obras' },
              { id: 'residencial', label: 'Villas & Residencial' },
              { id: 'comercial', label: 'Hospitalidad & Boutique' },
              { id: 'departamentos', label: 'Vivienda Colectiva' },
              { id: 'remodelacion', label: 'Intervenciones' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id as ProjectCategory)}
                className={`px-3 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all relative ${
                  categoria === cat.id
                    ? 'text-stone-950 font-semibold after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B59353]'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectosFiltrados.map((item, idx) => (
            <article
              key={item.id}
              onClick={() => abrirProyecto(item)}
              className="group bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-500 flex flex-col justify-between cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Micro Category & Status Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-stone-900/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.16em] font-medium">
                    {item.categoryLabel}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                    item.status === 'Completado'
                      ? 'bg-emerald-800/85 text-emerald-100'
                      : 'bg-[#B59353] text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Subtle Expand Indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded bg-white/80 backdrop-blur-xs text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {item.highlight && (
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded bg-stone-950/75 backdrop-blur-xs text-[11px] font-normal text-amber-200 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                    <span className="truncate">{item.highlight}</span>
                  </div>
                )}
              </div>

              {/* Information Body */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-2 font-normal">
                    <MapPin className="w-3.5 h-3.5 text-[#B59353]" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-xl font-light text-stone-900 group-hover:text-[#B59353] transition-colors font-serif-arch leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Editorial Metadata Footer */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-light">
                  <div className="flex items-center gap-3">
                    <span><strong className="font-medium text-stone-800">{item.area}</strong> m²</span>
                    <span className="text-stone-300">•</span>
                    <span><strong className="font-medium text-stone-800">{item.durationMonths}</strong> meses</span>
                  </div>

                  <span className="text-[#B59353] text-[11px] uppercase tracking-[0.14em] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Monografía</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Architectural Monograph Modal */}
      {proyectoSeleccionado && (
        <div 
          id="modal-proyecto-overlay"
          className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setProyectoSeleccionado(null)}
        >
          <div 
            id="modal-proyecto-container"
            className="bg-white rounded-lg max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200 text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setProyectoSeleccionado(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Stage Photography */}
            <div className="relative aspect-16/9 bg-stone-950 overflow-hidden">
              <img
                src={proyectoSeleccionado.gallery[fotoActivaIndex] || proyectoSeleccionado.imageUrl}
                alt={proyectoSeleccionado.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded bg-stone-950/80 backdrop-blur-xs text-white text-[11px] uppercase tracking-widest font-medium">
                  Vista {fotoActivaIndex + 1} de {proyectoSeleccionado.gallery.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {proyectoSeleccionado.gallery.length > 1 && (
              <div className="flex items-center gap-2 p-3 bg-[#FAF9F5] border-b border-stone-200 overflow-x-auto">
                {proyectoSeleccionado.gallery.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFotoActivaIndex(idx)}
                    className={`relative w-20 h-14 shrink-0 rounded overflow-hidden border-2 transition-all ${
                      fotoActivaIndex === idx
                        ? 'border-[#B59353] scale-102 shadow-xs'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={url} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Monograph Content */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Header Title and Category */}
              <div className="border-b border-stone-200 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] font-medium text-[#B59353] uppercase tracking-[0.24em]">
                    {proyectoSeleccionado.categoryLabel}
                  </span>
                  <span className={`px-3 py-1 rounded text-xs uppercase tracking-wider font-semibold ${
                    proyectoSeleccionado.status === 'Completado'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {proyectoSeleccionado.status}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light text-stone-900 font-serif-arch mb-2">
                  {proyectoSeleccionado.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-[#B59353]" />
                  <span>{proyectoSeleccionado.location}</span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#FAF9F5] p-5 rounded border border-stone-200 text-xs">
                <div>
                  <div className="text-stone-400 uppercase tracking-wider text-[10px] mb-0.5">Superficie Total</div>
                  <div className="text-base font-light text-stone-900 font-serif-arch">{proyectoSeleccionado.area} m²</div>
                </div>
                <div>
                  <div className="text-stone-400 uppercase tracking-wider text-[10px] mb-0.5">Año de Entrega</div>
                  <div className="text-base font-light text-stone-900 font-serif-arch">{proyectoSeleccionado.year}</div>
                </div>
                <div>
                  <div className="text-stone-400 uppercase tracking-wider text-[10px] mb-0.5">Plazo de Obra</div>
                  <div className="text-base font-light text-stone-900 font-serif-arch">{proyectoSeleccionado.durationMonths} Meses</div>
                </div>
                <div>
                  <div className="text-stone-400 uppercase tracking-wider text-[10px] mb-0.5">Taller Proyectista</div>
                  <div className="text-xs font-medium text-stone-800 leading-tight">{proyectoSeleccionado.architect}</div>
                </div>
              </div>

              {/* Architectural Statement */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">
                  Memoria Descriptiva & Concepto Espacial
                </h4>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
                  {proyectoSeleccionado.description}
                </p>
              </div>

              {/* Materiality & Engineering Highlights */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#B59353]" />
                  <span>Ejecución con bitácora digital y control de tolerancias milimétricas</span>
                </div>
                <button
                  onClick={() => setProyectoSeleccionado(null)}
                  className="px-5 py-2.5 rounded bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-[0.14em] transition-colors self-start sm:self-auto"
                >
                  Cerrar Monografía
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
