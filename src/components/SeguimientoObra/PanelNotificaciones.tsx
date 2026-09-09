import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  CloudRain, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Check, 
  Filter,
  Info,
  ChevronRight
} from 'lucide-react';
import { NotificacionAlerta } from '../../types';

interface PanelNotificacionesProps {
  notificaciones: NotificacionAlerta[];
  onMarcarLeida: (id: string) => void;
  onMarcarTodasLeidas: () => void;
}

export const PanelNotificaciones: React.FC<PanelNotificacionesProps> = ({
  notificaciones,
  onMarcarLeida,
  onMarcarTodasLeidas
}) => {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [soloSinLeer, setSoloSinLeer] = useState<boolean>(false);

  const notificacionesFiltradas = notificaciones.filter((n) => {
    if (soloSinLeer && n.leida) return false;
    if (filtroTipo === 'todos') return true;
    return n.tipo === filtroTipo;
  });

  const sinLeerCount = notificaciones.filter((n) => !n.leida).length;

  const getIconoPorTipo = (tipo: NotificacionAlerta['tipo']) => {
    switch (tipo) {
      case 'fecha_cambio':
        return <Calendar className="w-4 h-4 text-[#B59353]" />;
      case 'clima':
        return <CloudRain className="w-4 h-4 text-stone-600" />;
      case 'material':
        return <Truck className="w-4 h-4 text-[#B59353]" />;
      case 'aprobacion':
        return <AlertTriangle className="w-4 h-4 text-amber-700" />;
      case 'hito':
      default:
        return <CheckCircle2 className="w-4 h-4 text-stone-900" />;
    }
  };

  const getBadgePorTipo = (tipo: NotificacionAlerta['tipo'], impactoDias?: number) => {
    switch (tipo) {
      case 'fecha_cambio':
        return (
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-[#B59353]/10 text-[#B59353] border border-[#B59353]/30">
            Ajuste de Calendario {impactoDias ? `(+${impactoDias}d)` : ''}
          </span>
        );
      case 'clima':
        return (
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-stone-100 text-stone-700 border border-stone-200">
            Aviso Meteorológico
          </span>
        );
      case 'material':
        return (
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-stone-100 text-stone-700 border border-stone-200">
            Recepción de Material
          </span>
        );
      case 'aprobacion':
        return (
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-amber-50 text-amber-800 border border-amber-200">
            Aprobación del Cliente
          </span>
        );
      case 'hito':
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-stone-900 text-white border border-stone-900">
            Hito Superado
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white p-6 sm:p-8 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-[#B59353] flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium">
                  Centro de Comunicación
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-arch text-stone-900 flex items-center gap-2">
                <span>Notificaciones & Alertas de Obra</span>
                {sinLeerCount > 0 && (
                  <span className="text-xs px-2 py-0.5 bg-[#B59353] text-white font-sans font-medium uppercase tracking-wider">
                    {sinLeerCount} nuevas
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
                Avisos en tiempo real sobre reprogramación de plazos, contingencias climáticas y recepción de suministros.
              </p>
            </div>
          </div>

          {sinLeerCount > 0 && (
            <button
              onClick={onMarcarTodasLeidas}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-medium text-stone-700 hover:text-stone-950 border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Marcar todas como leídas</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'fecha_cambio', label: 'Fechas' },
              { id: 'clima', label: 'Clima' },
              { id: 'material', label: 'Suministros' },
              { id: 'hito', label: 'Hitos' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltroTipo(f.id)}
                className={`px-3 py-1 text-[11px] uppercase tracking-wider font-medium transition-colors border ${
                  filtroTipo === f.id
                    ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none font-sans text-xs">
            <input
              type="checkbox"
              checked={soloSinLeer}
              onChange={(e) => setSoloSinLeer(e.target.checked)}
              className="w-3.5 h-3.5 border-stone-300 text-stone-900 accent-stone-900"
            />
            <span className="font-medium">Solo no leídas</span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notificacionesFiltradas.length === 0 ? (
          <div className="bg-white p-12 text-center border border-stone-200 text-stone-400 font-sans">
            <Bell className="w-8 h-8 mx-auto mb-3 opacity-30 text-stone-400" />
            <p className="text-sm font-medium text-stone-700">Sin avisos en el filtro actual</p>
            <p className="text-xs text-stone-500 mt-1">El proyecto opera en sincronía con el calendario de obra previsto.</p>
          </div>
        ) : (
          notificacionesFiltradas.map((notif) => {
            return (
              <div
                key={notif.id}
                className={`p-5 sm:p-6 border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  !notif.leida
                    ? 'bg-white border-stone-900 shadow-xs'
                    : 'bg-[#FAF9F5] border-stone-200 opacity-90'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-stone-200 bg-white shrink-0 mt-0.5">
                    {getIconoPorTipo(notif.tipo)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5 font-sans">
                      {getBadgePorTipo(notif.tipo, notif.impactoDias)}
                      {notif.etapaRelacionada && (
                        <span className="text-[11px] text-stone-500 font-medium">
                          • {notif.etapaRelacionada}
                        </span>
                      )}
                      {!notif.leida && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B59353]"></span>
                      )}
                    </div>

                    <h4 className="text-base font-serif-arch text-stone-900 leading-snug">
                      {notif.titulo}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 max-w-3xl leading-relaxed font-sans">
                      {notif.mensaje}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-2 font-sans">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {notif.fecha} a las {notif.hora}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Mark Button */}
                <div className="self-end sm:self-center shrink-0">
                  {!notif.leida ? (
                    <button
                      onClick={() => onMarcarLeida(notif.id)}
                      className="text-[11px] uppercase tracking-wider font-medium px-3 py-1.5 bg-stone-900 hover:bg-[#B59353] text-white transition-colors"
                    >
                      Marcar leída
                    </button>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#B59353]" />
                      Revisada
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
