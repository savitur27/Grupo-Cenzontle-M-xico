import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  User,
  Info
} from 'lucide-react';
import { EtapaObra } from '../../types';

interface CronogramaEtapasProps {
  etapas: EtapaObra[];
}

export const CronogramaEtapas: React.FC<CronogramaEtapasProps> = ({ etapas }) => {
  const [filtro, setFiltro] = useState<'todas' | 'en_proceso' | 'completada' | 'pendiente'>('todas');
  const [etapaExpandida, setEtapaExpandida] = useState<string | null>('etapa-4');

  const etapasFiltradas = etapas.filter((etapa) => {
    if (filtro === 'todas') return true;
    return etapa.estado === filtro;
  });

  return (
    <div className="space-y-6">
      {/* Header with Explanatory Card */}
      <div className="bg-white p-6 sm:p-8 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-1">
              Control de Ejecución Temporal
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-arch text-stone-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#B59353]" />
              <span>Cronograma Maestro de Obra por Etapas</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans max-w-2xl">
              Monitoreo comparativo de plazos contractuales vs. ejecución real certificada en campo.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 border border-stone-200 p-1 bg-stone-50 text-xs">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'en_proceso', label: 'En Proceso' },
              { id: 'completada', label: 'Completadas' },
              { id: 'pendiente', label: 'Programadas' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id as any)}
                className={`px-3 py-1.5 uppercase tracking-wider text-[10px] font-medium transition-all ${
                  filtro === f.id
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-stone-900"></span>
            <span>Etapa Completada</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#B59353] animate-pulse"></span>
            <span>En Ejecución Activa</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-stone-300"></span>
            <span>Programada / En Espera</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto text-[11px] text-stone-400">
            <Info className="w-3.5 h-3.5 text-[#B59353]" />
            <span>Actualizado por Residencia Técnica (hace 4 hrs)</span>
          </div>
        </div>
      </div>

      {/* Timeline Stages List */}
      <div className="space-y-4">
        {etapasFiltradas.map((etapa) => {
          const isExpanded = etapaExpandida === etapa.id;

          // Status colors
          const statusBadge = {
            completada: {
              bg: 'bg-stone-100 text-stone-800 border-stone-300',
              label: '100% Completada',
              barColor: 'bg-stone-900'
            },
            en_proceso: {
              bg: 'bg-[#B59353]/10 text-[#B59353] border-[#B59353]/30',
              label: `${etapa.porcentaje}% En Proceso`,
              barColor: 'bg-[#B59353]'
            },
            pendiente: {
              bg: 'bg-stone-100 text-stone-500 border-stone-200',
              label: 'Por Iniciar',
              barColor: 'bg-stone-200'
            }
          }[etapa.estado];

          return (
            <div
              key={etapa.id}
              className={`bg-white border transition-all duration-200 overflow-hidden ${
                etapa.estado === 'en_proceso' 
                  ? 'border-stone-900' 
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              {/* Header Bar */}
              <div 
                onClick={() => setEtapaExpandida(isExpanded ? null : etapa.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Circle */}
                  <div className={`w-10 h-10 flex items-center justify-center font-serif-arch text-base shrink-0 border ${
                    etapa.estado === 'completada'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : etapa.estado === 'en_proceso'
                      ? 'bg-[#B59353] text-white border-[#B59353]'
                      : 'bg-stone-50 text-stone-400 border-stone-200'
                  }`}>
                    {etapa.estado === 'completada' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      `0${etapa.numero}`
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-sans uppercase tracking-widest px-2 py-0.5 border ${statusBadge.bg}`}>
                        {statusBadge.label}
                      </span>
                      {etapa.diasDesviacion !== 0 && (
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${
                          etapa.diasDesviacion < 0 
                            ? 'bg-stone-50 text-stone-700 border-stone-200' 
                            : 'bg-amber-50/80 text-amber-900 border-amber-200'
                        }`}>
                          {etapa.diasDesviacion < 0 ? (
                            <span>{Math.abs(etapa.diasDesviacion)} días antes</span>
                          ) : (
                            <span>+{etapa.diasDesviacion} días de compensación</span>
                          )}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-serif-arch text-stone-900">
                      {etapa.nombre}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 max-w-2xl font-sans">
                      {etapa.descripcion}
                    </p>
                  </div>
                </div>

                {/* Progress bar preview & chevron */}
                <div className="flex items-center gap-4 sm:ml-auto">
                  <div className="hidden md:block w-36 text-right">
                    <div className="text-xs font-serif-arch text-stone-900">{etapa.porcentaje}%</div>
                    <div className="w-full bg-stone-100 h-1.5 overflow-hidden mt-1">
                      <div 
                        className={`h-full ${statusBadge.barColor}`}
                        style={{ width: `${etapa.porcentaje}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="w-8 h-8 border border-stone-200 text-stone-500 flex items-center justify-center shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Progress Bar Mobile */}
              <div className="md:hidden px-5 pb-3">
                <div className="w-full bg-stone-100 h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${statusBadge.barColor}`}
                    style={{ width: `${etapa.porcentaje}%` }}
                  ></div>
                </div>
              </div>

              {/* Expanded Comparison Drawer */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-stone-200 bg-[#FAF9F5] space-y-5">
                  {/* Comparativa de Fechas: Estimadas vs. Reales */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-3 font-medium">
                      Comparativa Cronológica: Estimado Contractual vs. Ejecutado
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Fechas Estimadas */}
                      <div className="bg-white p-4 border border-stone-200">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>Programa Contractual</span>
                        </div>
                        <div className="space-y-1.5 text-xs font-sans">
                          <div className="flex justify-between">
                            <span className="text-stone-500">Fecha de Inicio:</span>
                            <span className="font-medium text-stone-800">{etapa.fechaInicioEstimada}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Fecha de Cierre:</span>
                            <span className="font-medium text-stone-800">{etapa.fechaFinEstimada}</span>
                          </div>
                        </div>
                      </div>

                      {/* Fechas Reales */}
                      <div className="bg-white p-4 border border-stone-300">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-800 mb-2 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#B59353]" />
                          <span>Ejecución Real Certificada</span>
                        </div>
                        <div className="space-y-1.5 text-xs font-sans">
                          <div className="flex justify-between">
                            <span className="text-stone-500">Fecha de Inicio:</span>
                            <span className="font-medium text-stone-900">{etapa.fechaInicioReal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Fecha de Cierre:</span>
                            <span className="font-medium text-stone-900">{etapa.fechaFinReal || 'En curso'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Nota técnica de desviación si existe */}
                    {etapa.motivoDesviacion && (
                      <div className="mt-3 p-3 bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5 font-sans">
                        <AlertCircle className="w-4 h-4 text-[#B59353] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-stone-900">Nota de Residencia: </strong>
                          {etapa.motivoDesviacion}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Subtítulo & Checklist de Actividades */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2.5 font-medium">
                      Sub-hitos & Control de Tareas
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {etapa.subetapas.map((sub, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 bg-white border border-stone-200 text-xs font-sans"
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                            sub.completada ? 'text-[#B59353]' : 'text-stone-300'
                          }`} />
                          <span className={sub.completada ? 'text-stone-900 font-medium' : 'text-stone-500'}>
                            {sub.nombre}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Responsable técnico */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 border-t border-stone-200/60 font-sans">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Responsable de Etapa: <strong className="text-stone-800 font-medium">{etapa.responsable}</strong></span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
