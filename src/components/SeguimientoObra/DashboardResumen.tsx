import React from 'react';
import { 
  Building2, 
  Calendar, 
  Clock, 
  DollarSign, 
  HardHat, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Compass, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  UserCheck
} from 'lucide-react';
import { ObraCliente } from '../../types';

interface DashboardResumenProps {
  obra: ObraCliente;
  onCambiarTab: (tab: 'cronograma' | 'galeria' | 'bitacora' | 'notificaciones') => void;
  notificacionesSinLeer: number;
}

export const DashboardResumen: React.FC<DashboardResumenProps> = ({
  obra,
  onCambiarTab,
  notificacionesSinLeer
}) => {
  const formatoMoneda = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(val);
  };

  const porcentajePresupuesto = Math.round((obra.presupuestoEjercido / obra.presupuestoTotal) * 100);
  const porcentajeTiempo = Math.round((obra.diasTranscurridos / obra.diasTotales) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner: Project Monograph Metadata */}
      <div className="bg-[#18181B] border border-stone-800 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-stone-800 text-[#B59353] font-mono text-xs tracking-wider border border-stone-700/60">
                {obra.codigoContrato}
              </span>
              <span className="px-2.5 py-1 bg-stone-800/80 text-stone-200 text-xs tracking-wider uppercase flex items-center gap-1.5 border border-stone-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B59353] animate-pulse"></span>
                {obra.estatusGeneral}
              </span>
              <span className="text-xs text-stone-400 tracking-wide font-sans">
                Superficie de Intervención: <strong className="text-stone-200 font-normal">{obra.superficieM2} m²</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-arch text-stone-100 tracking-tight mb-2">
              {obra.nombreProyecto}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-400 font-sans">
              <MapPin className="w-4 h-4 text-[#B59353] shrink-0" />
              <span>{obra.ubicacion}</span>
            </div>
          </div>

          {/* Direct Technical Supervisors */}
          <div className="flex flex-col sm:flex-row gap-4 bg-stone-900/90 p-4 border border-stone-800 text-xs">
            <div className="border-b sm:border-b-0 sm:border-r border-stone-800 pb-3 sm:pb-0 sm:pr-5">
              <div className="text-stone-400 text-[10px] uppercase tracking-widest mb-1">Arquitecto Residente</div>
              <div className="font-serif-arch text-base text-stone-100 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#B59353]" />
                <span>{obra.arquitectoResidente}</span>
              </div>
            </div>
            <div className="sm:pl-2">
              <div className="text-stone-400 text-[10px] uppercase tracking-widest mb-1">Director Resp. de Obra (D.R.O.)</div>
              <div className="font-serif-arch text-base text-stone-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-400" />
                <span>{obra.directorDRO}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Physical Progress Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif-arch text-stone-100">
                {obra.avancePorcentaje}%
              </span>
              <span className="text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest">
                Avance Físico Global Ponderado
              </span>
            </div>
            <div className="text-xs text-stone-400 font-sans flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B59353]" />
              <span>Jornada {obra.diasTranscurridos} de {obra.diasTotales} ({obra.diasTotales - obra.diasTranscurridos} días restantes)</span>
            </div>
          </div>

          <div className="w-full bg-stone-800/80 h-2 overflow-hidden border border-stone-700/50">
            <div 
              className="bg-[#B59353] h-full transition-all duration-1000"
              style={{ width: `${obra.avancePorcentaje}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Próximo Hito Crítico */}
        <div className="bg-white p-5 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase tracking-widest mb-2 font-medium">
              <span>Próximo Hito Crítico</span>
              <span className="text-[#B59353] bg-stone-100 px-2 py-0.5 font-sans font-semibold">
                en {obra.proximoHito.diasRestantes} días
              </span>
            </div>
            <div className="text-base font-serif-arch text-stone-900 leading-snug mb-1">
              {obra.proximoHito.titulo}
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-2 font-sans">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Programado: {obra.proximoHito.fecha}</span>
            </div>
          </div>

          <button
            onClick={() => onCambiarTab('cronograma')}
            className="mt-4 text-xs tracking-wider uppercase font-medium text-stone-700 hover:text-[#B59353] flex items-center gap-1 pt-3 border-t border-stone-100 transition-colors"
          >
            <span>Ver en cronograma</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Control Financiero */}
        <div className="bg-white p-5 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase tracking-widest mb-2 font-medium">
              <span>Presupuesto Ejercido</span>
              <span className="text-stone-800 bg-stone-100 px-2 py-0.5 font-sans font-semibold">
                {porcentajePresupuesto}%
              </span>
            </div>
            <div className="text-2xl font-serif-arch text-stone-900">
              {formatoMoneda(obra.presupuestoEjercido)}
            </div>
            <div className="text-xs text-stone-500 mt-1 font-sans">
              de {formatoMoneda(obra.presupuestoTotal)} contratado
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100">
            <div className="w-full bg-stone-100 h-1.5 overflow-hidden">
              <div 
                className="bg-[#B59353] h-full"
                style={{ width: `${porcentajePresupuesto}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] tracking-wider uppercase text-stone-400 mt-2 font-sans">
              <span>Estimaciones al corriente</span>
              <span className="text-stone-600 font-medium">Auditado</span>
            </div>
          </div>
        </div>

        {/* Card 3: Equipo Activo en Sitio */}
        <div className="bg-white p-5 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase tracking-widest mb-2 font-medium">
              <span>Fuerza de Trabajo en Sitio</span>
              <span className="text-stone-800 bg-stone-100 px-2 py-0.5 font-sans font-semibold">
                Turno Hoy
              </span>
            </div>
            <div className="text-2xl font-serif-arch text-stone-900 flex items-baseline gap-2">
              <span>{obra.trabajadoresEnSitio}</span>
              <span className="text-xs font-sans font-normal text-stone-500">artesanos & técnicos</span>
            </div>
            <div className="text-xs text-stone-500 mt-1 font-sans leading-relaxed">
              Yeserías (6), Carpinterías (4), Herrería (5), Residencia y Topografía (4)
            </div>
          </div>

          <button
            onClick={() => onCambiarTab('bitacora')}
            className="mt-4 text-xs tracking-wider uppercase font-medium text-stone-700 hover:text-[#B59353] flex items-center gap-1 pt-3 border-t border-stone-100 transition-colors"
          >
            <span>Consultar bitácora de obra</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Alertas y Notificaciones de Fechas */}
        <div className="bg-white p-5 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase tracking-widest mb-2 font-medium">
              <span>Auditoría de Calendario</span>
              {notificacionesSinLeer > 0 ? (
                <span className="text-white bg-[#B59353] px-2 py-0.5 font-sans font-semibold text-[10px] uppercase tracking-wider">
                  {notificacionesSinLeer} avisos
                </span>
              ) : (
                <span className="text-stone-500 text-[10px] uppercase">Al día</span>
              )}
            </div>
            <div className="text-base font-serif-arch text-stone-900 leading-snug">
              Entrega proyectada: {obra.fechaEntregaAjustada || obra.fechaEntregaEstimada}
            </div>
            <div className="text-xs text-stone-500 mt-1 font-sans">
              Margen de holgura controlada: +3 días por lluvia compensada.
            </div>
          </div>

          <button
            onClick={() => onCambiarTab('notificaciones')}
            className="mt-4 text-xs tracking-wider uppercase font-medium text-stone-700 hover:text-[#B59353] flex items-center gap-1 pt-3 border-t border-stone-100 transition-colors"
          >
            <span>Ver avisos de supervisión</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <button
          onClick={() => onCambiarTab('cronograma')}
          className="p-6 bg-white hover:bg-stone-50 text-stone-900 text-left border border-stone-200 hover:border-stone-900 transition-all group flex items-start justify-between"
        >
          <div>
            <div className="w-8 h-8 text-[#B59353] flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-lg font-serif-arch text-stone-900 group-hover:text-[#B59353] transition-colors">
              Cronograma de Etapas
            </div>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans">
              Comparativa estricta de plazos contractuales vs. ejecución real en campo (cimentación, estructura y acabados).
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1" />
        </button>

        <button
          onClick={() => onCambiarTab('galeria')}
          className="p-6 bg-white hover:bg-stone-50 text-stone-900 text-left border border-stone-200 hover:border-stone-900 transition-all group flex items-start justify-between"
        >
          <div>
            <div className="w-8 h-8 text-[#B59353] flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-lg font-serif-arch text-stone-900 group-hover:text-[#B59353] transition-colors">
              Evidencia Visual & Dron
            </div>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans">
              Registro fotográfico técnico fechado por semana con capturas aéreas de dron y acercamiento a detalles constructivos.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1" />
        </button>

        <button
          onClick={() => onCambiarTab('bitacora')}
          className="p-6 bg-white hover:bg-stone-50 text-stone-900 text-left border border-stone-200 hover:border-stone-900 transition-all group flex items-start justify-between"
        >
          <div>
            <div className="w-8 h-8 text-[#B59353] flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-lg font-serif-arch text-stone-900 group-hover:text-[#B59353] transition-colors">
              Cuaderno de Bitácora
            </div>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans">
              Minutas oficiales de obra asentadas por el Arquitecto Residente con folios únicos y control de calidad.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1" />
        </button>
      </div>
    </div>
  );
};
