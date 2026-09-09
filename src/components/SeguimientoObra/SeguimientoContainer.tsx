import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Calendar, 
  Camera, 
  FileText, 
  Bell, 
  ArrowLeft, 
  HardHat, 
  Download, 
  Share2, 
  PhoneCall, 
  Check, 
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  Lock
} from 'lucide-react';
import { DashboardResumen } from './DashboardResumen';
import { CronogramaEtapas } from './CronogramaEtapas';
import { PanelNotificaciones } from './PanelNotificaciones';
import { GaleriaAvance } from './GaleriaAvance';
import { BitacoraObra } from './BitacoraObra';
import { 
  OBRA_ACTIVA_EJEMPLO, 
  ETAPAS_OBRA_DATA, 
  NOTIFICACIONES_DATA, 
  GALERIA_FOTOS_DATA, 
  BITACORA_OBRA_DATA,
  ObraPaqueteCompleto,
  OBRAS_REGISTRADAS
} from '../../data/mockData';
import { EntradaBitacora, NotificacionAlerta, FotoAvance } from '../../types';

interface SeguimientoContainerProps {
  onVolverAlSitio: () => void;
  paqueteObra?: ObraPaqueteCompleto;
  onCerrarSesion?: () => void;
}

export const SeguimientoContainer: React.FC<SeguimientoContainerProps> = ({
  onVolverAlSitio,
  paqueteObra = OBRAS_REGISTRADAS['SOL-042'],
  onCerrarSesion
}) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'cronograma' | 'notificaciones' | 'galeria' | 'bitacora'>('resumen');
  const [notificaciones, setNotificaciones] = useState<NotificacionAlerta[]>(paqueteObra.notificaciones);
  const [entradasBitacora, setEntradasBitacora] = useState<EntradaBitacora[]>(paqueteObra.bitacora);
  const [fotosGaleria, setFotosGaleria] = useState<FotoAvance[]>(paqueteObra.galeria);
  const [copiadoAlPortapapeles, setCopiadoAlPortapapeles] = useState(false);

  // Actualizar estado si cambia el paquete de obra
  useEffect(() => {
    setNotificaciones(paqueteObra.notificaciones);
    setEntradasBitacora(paqueteObra.bitacora);
    setFotosGaleria(paqueteObra.galeria);
  }, [paqueteObra]);

  const sinLeerCount = notificaciones.filter(n => !n.leida).length;

  const handleMarcarLeida = (id: string) => {
    setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));
  };

  const handleMarcarTodasLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  };

  const handleAgregarBitacora = (nueva: EntradaBitacora) => {
    setEntradasBitacora(prev => [nueva, ...prev]);
  };

  const handleAgregarFoto = (nueva: FotoAvance) => {
    setFotosGaleria(prev => [nueva, ...prev]);
  };

  const handleCompartirReporte = () => {
    if (navigator.clipboard) {
      const urlDirecta = `${window.location.origin}${window.location.pathname}?obra=${paqueteObra.codigo}`;
      navigator.clipboard.writeText(urlDirecta);
      setCopiadoAlPortapapeles(true);
      setTimeout(() => setCopiadoAlPortapapeles(false), 2500);
    }
  };

  return (
    <div id="seguimiento-obra-section" className="min-h-screen bg-[#FAF9F5] pt-20 pb-24 text-stone-900">
      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onVolverAlSitio}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border border-stone-300 hover:border-stone-900 bg-white/60 hover:bg-white text-stone-700 hover:text-stone-950 text-xs tracking-wider uppercase font-medium transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Estudio</span>
              </button>

              <div className="h-4 w-px bg-stone-200 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B59353] animate-pulse"></span>
                <span className="text-xs font-serif-arch text-stone-700 tracking-wide">
                  Supervisión: <span className="font-semibold text-stone-900">{paqueteObra.obra.nombreProyecto}</span> • {paqueteObra.obra.cliente}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 bg-stone-200/70 text-stone-700 text-[10px] font-mono font-medium rounded-xs">
                  {paqueteObra.codigo}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleCompartirReporte}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-[#B59353] bg-white/70 hover:bg-white text-stone-600 hover:text-stone-900 text-xs tracking-wider uppercase font-medium transition-all"
                title="Copiar enlace directo con folio de acceso"
              >
                {copiadoAlPortapapeles ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B59353]" />
                    <span className="text-[#B59353] font-semibold">Enlace Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir Enlace</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-[#B59353] bg-white/70 hover:bg-white text-stone-600 hover:text-stone-900 text-xs tracking-wider uppercase font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>

              {onCerrarSesion && (
                <button
                  onClick={onCerrarSesion}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-red-400 hover:text-red-700 bg-white/70 hover:bg-red-50/50 text-stone-600 text-xs tracking-wider uppercase font-medium transition-all"
                  title="Cerrar expediente actual"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              )}
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pt-3 border-t border-stone-200/60 no-scrollbar mt-3">
            {[
              { id: 'resumen', label: 'Tablero General', icon: LayoutDashboard },
              { id: 'cronograma', label: 'Cronograma de Etapas', icon: Calendar },
              { 
                id: 'notificaciones', 
                label: 'Avisos & Hitos', 
                icon: Bell, 
                badge: sinLeerCount > 0 ? sinLeerCount : undefined 
              },
              { id: 'galeria', label: 'Evidencia Visual', icon: Camera },
              { id: 'bitacora', label: 'Cuaderno de Bitácora', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'border-[#B59353] text-stone-950 font-semibold bg-white/80'
                      : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-white/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B59353]' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-[#B59353] text-white font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'resumen' && (
          <DashboardResumen 
            obra={paqueteObra.obra}
            onCambiarTab={(tab) => setActiveTab(tab)}
            notificacionesSinLeer={sinLeerCount}
          />
        )}

        {activeTab === 'cronograma' && (
          <CronogramaEtapas etapas={paqueteObra.etapas} />
        )}

        {activeTab === 'notificaciones' && (
          <PanelNotificaciones 
            notificaciones={notificaciones}
            onMarcarLeida={handleMarcarLeida}
            onMarcarTodasLeidas={handleMarcarTodasLeidas}
          />
        )}

        {activeTab === 'galeria' && (
          <GaleriaAvance 
            fotos={fotosGaleria} 
            onAgregarFoto={handleAgregarFoto}
          />
        )}

        {activeTab === 'bitacora' && (
          <BitacoraObra 
            entradas={entradasBitacora}
            onAgregarEntrada={handleAgregarBitacora}
          />
        )}
      </div>
    </div>
  );
};
