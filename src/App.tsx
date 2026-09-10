import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Proyectos } from './components/Proyectos';
import { Servicios } from './components/Servicios';
import { Cotizador } from './components/Cotizador';
import { Nosotros } from './components/Nosotros';
import { Contacto } from './components/Contacto';
import { Footer } from './components/Footer';
import { AvisoPrivacidadModal } from './components/AvisoPrivacidadModal';
import { SeguimientoContainer } from './components/SeguimientoObra/SeguimientoContainer';
import { AccesoPortal } from './components/SeguimientoObra/AccesoPortal';
import { FolderKanban, Globe, ArrowUp, Lock, ShieldCheck } from 'lucide-react';
import { buscarObraPorCodigo, ObraPaqueteCompleto, OBRAS_REGISTRADAS } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'seguimiento'>('home');
  const [mostrarBotonSubir, setMostrarBotonSubir] = useState(false);
  const [paqueteObraActivo, setPaqueteObraActivo] = useState<ObraPaqueteCompleto | null>(null);
  const [modalLegal, setModalLegal] = useState<{ isOpen: boolean; tab: 'privacidad' | 'calidad' }>({
    isOpen: false,
    tab: 'privacidad'
  });

  // Verificar si hay sesión activa previa o si entra por enlace directo con parámetro de obra
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramObra = urlParams.get('obra') || urlParams.get('codigo') || urlParams.get('folio');
      
      let codigoABuscar = paramObra;
      if (!codigoABuscar && window.location.hash.startsWith('#obra-')) {
        codigoABuscar = window.location.hash.replace('#obra-', '');
      }

      // Si viene por URL directa con código válido, abrir directamente el portal
      if (codigoABuscar) {
        const encontrada = buscarObraPorCodigo(codigoABuscar);
        if (encontrada) {
          setPaqueteObraActivo(encontrada);
          setCurrentView('seguimiento');
          sessionStorage.setItem('cenzontle_obra_activa', encontrada.codigo);
          return;
        }
      }

      // Revisar si ya había desbloqueado una obra en esta sesión
      const codigoGuardado = sessionStorage.getItem('cenzontle_obra_activa');
      if (codigoGuardado) {
        const guardada = buscarObraPorCodigo(codigoGuardado);
        if (guardada) {
          setPaqueteObraActivo(guardada);
        }
      }
    } catch {
      // Ignorar excepciones de storage en iframes restringidos
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setMostrarBotonSubir(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (view: 'home' | 'seguimiento', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAccesoConcedido = (paquete: ObraPaqueteCompleto) => {
    setPaqueteObraActivo(paquete);
    setCurrentView('seguimiento');
    try {
      sessionStorage.setItem('cenzontle_obra_activa', paquete.codigo);
    } catch {
      // ignorar
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCerrarSesionObra = () => {
    setPaqueteObraActivo(null);
    try {
      sessionStorage.removeItem('cenzontle_obra_activa');
    } catch {
      // ignorar
    }
  };

  const subirAlInicio = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 flex flex-col font-sans selection:bg-[#B59353] selection:text-white">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        unreadNotificationsCount={paqueteObraActivo ? paqueteObraActivo.notificaciones.filter(n => !n.leida).length : 0}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <div>
            {/* Hero Section with refined atelier aesthetic */}
            <Hero
              onIrCotizador={() => handleNavigate('home', 'cotizador')}
              onIrSeguimiento={() => handleNavigate('seguimiento')}
              onIrProyectos={() => handleNavigate('home', 'proyectos')}
            />

            {/* Estudio de Factibilidad Presupuestal */}
            <Cotizador />

            {/* Proyectos Arquitectónicos & Galería Editorial */}
            <Proyectos />

            {/* Metodología & Servicios de Edificación */}
            <Servicios 
              onIrCotizador={() => handleNavigate('home', 'cotizador')} 
            />

            {/* Sobre el Estudio & Testimonios */}
            <Nosotros />

            {/* Contacto & Consultas */}
            <Contacto onOpenAvisoPrivacidad={() => setModalLegal({ isOpen: true, tab: 'privacidad' })} />
          </div>
        ) : (
          /* Portal de Supervisión Técnica de Obra: Protegido con Acceso por Código */
          paqueteObraActivo ? (
            <SeguimientoContainer
              paqueteObra={paqueteObraActivo}
              onVolverAlSitio={() => handleNavigate('home')}
              onCerrarSesion={handleCerrarSesionObra}
            />
          ) : (
            <AccesoPortal
              onAccesoConcedido={handleAccesoConcedido}
              onVolverAlSitio={() => handleNavigate('home')}
            />
          )
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenLegal={(tab) => setModalLegal({ isOpen: true, tab: tab || 'privacidad' })}
      />

      {/* Lightbox / Modal de Aviso de Privacidad y Póliza de Calidad */}
      <AvisoPrivacidadModal 
        isOpen={modalLegal.isOpen}
        onClose={() => setModalLegal(prev => ({ ...prev, isOpen: false }))}
        initialTab={modalLegal.tab}
      />

      {/* Quick View Switcher Floating Pill */}
      <aside 
        id="quick-floating-switcher"
        aria-label="Selector rápido de vista"
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl text-xs font-medium text-stone-700"
      >
        <button
          onClick={() => handleNavigate('home')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            currentView === 'home'
              ? 'bg-[#B59353] text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="tracking-wider uppercase text-[10px]">Estudio</span>
        </button>

        <button
          onClick={() => handleNavigate('seguimiento')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            currentView === 'seguimiento'
              ? 'bg-[#0B213F] text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          {paqueteObraActivo ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-[#B59353]" />
              <span className="tracking-wider uppercase text-[10px] font-mono">{paqueteObraActivo.codigo}</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span className="tracking-wider uppercase text-[10px]">Portal Privado</span>
            </>
          )}
        </button>
      </aside>

      {/* Scroll to Top Floating Button */}
      {mostrarBotonSubir && (
        <button
          id="scroll-to-top-btn"
          onClick={subirAlInicio}
          aria-label="Subir al inicio"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 shadow-lg transition-all hover:scale-105"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
