import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FolderKanban, 
  Calculator, 
  Phone, 
  ChevronRight, 
  Bell, 
  Building2, 
  Home, 
  Layers, 
  Users, 
  Mail,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  currentView: 'home' | 'seguimiento';
  onNavigate: (view: 'home' | 'seguimiento', sectionId?: string) => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  unreadNotificationsCount = 2
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (view: 'home' | 'seguimiento', sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <>
      <header 
        id="main-top-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || currentView === 'seguimiento'
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md shadow-xs border-b border-stone-200/90 text-stone-800 py-3' 
            : 'bg-[#FAF9F5]/85 backdrop-blur-sm border-b border-stone-200/60 text-stone-800 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button 
              id="navbar-brand-button"
              onClick={() => handleLinkClick('home', 'hero')}
              className="flex items-center text-left focus:outline-none group"
            >
              <Logo variant="dark" size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.22em] font-medium">
              <button
                id="nav-link-inicio"
                onClick={() => handleLinkClick('home', 'hero')}
                className={`transition-colors py-1 hover:text-[#B59353] ${
                  currentView === 'home' ? 'text-stone-950 font-semibold border-b border-[#B59353]' : 'text-stone-600'
                }`}
              >
                Inicio
              </button>

              <button
                id="nav-link-proyectos"
                onClick={() => handleLinkClick('home', 'proyectos')}
                className="text-stone-600 hover:text-[#B59353] transition-colors py-1"
              >
                Obras
              </button>

              <button
                id="nav-link-servicios"
                onClick={() => handleLinkClick('home', 'servicios')}
                className="text-stone-600 hover:text-[#B59353] transition-colors py-1"
              >
                Metodología
              </button>

              <button
                id="nav-link-cotizador"
                onClick={() => handleLinkClick('home', 'cotizador')}
                className="flex items-center gap-1.5 text-[#B59353] hover:text-[#947437] transition-colors py-1 font-semibold"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Factibilidad</span>
              </button>

              <button
                id="nav-link-nosotros"
                onClick={() => handleLinkClick('home', 'nosotros')}
                className="text-stone-600 hover:text-[#B59353] transition-colors py-1"
              >
                El Estudio
              </button>

              <button
                id="nav-link-contacto"
                onClick={() => handleLinkClick('home', 'contacto')}
                className="text-stone-600 hover:text-[#B59353] transition-colors py-1"
              >
                Contacto
              </button>
            </nav>

            {/* Right Action Area */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Direct Telephone */}
              <a 
                id="navbar-phone-cta"
                href="https://wa.me/529844531913"
                target="_blank" 
                rel="noreferrer"
                className="hidden xl:flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-stone-600 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 px-3.5 py-2 rounded-md border border-stone-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B59353]" />
                <span>+52 984 453 1913</span>
              </a>

              {/* Botón Destacado: Acceso a Obra Privado */}
              <button
                id="navbar-seguimiento-btn"
                onClick={() => handleLinkClick('seguimiento')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs uppercase tracking-[0.14em] font-medium transition-all shadow-xs ${
                  currentView === 'seguimiento'
                    ? 'bg-[#0B213F] text-white ring-1 ring-[#B59353]'
                    : 'bg-[#B59353] hover:bg-[#A58242] text-white'
                }`}
              >
                <Lock className="w-3 h-3 text-[#FAF9F5]/80" />
                <span>Acceso a Obra</span>
                {unreadNotificationsCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold bg-[#0B213F] text-white rounded-full">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="mobile-seguimiento-quick-btn"
                onClick={() => handleLinkClick('seguimiento')}
                className="flex items-center gap-1.5 sm:hidden text-xs uppercase tracking-wider bg-[#B59353] text-white font-medium px-2.5 py-1.5 rounded-md"
              >
                <Lock className="w-3 h-3 text-white" />
                <span>Obra</span>
              </button>

              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className="p-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-overlay"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs lg:hidden flex flex-col transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            id="mobile-drawer-content"
            className="w-full max-w-sm bg-[#FAF9F5] h-full ml-auto p-6 shadow-2xl flex flex-col justify-between border-l border-stone-200 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <Logo variant="dark" size="sm" />
                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Private Portal CTA inside mobile */}
              <div className="mt-6 mb-6">
                <button
                  id="mobile-drawer-seguimiento-btn"
                  onClick={() => handleLinkClick('seguimiento')}
                  className="w-full flex items-center justify-between p-3.5 bg-[#B59353] rounded-lg text-white font-medium shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center">
                      <FolderKanban className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs uppercase tracking-wider font-semibold">Portal de Obra</div>
                      <div className="text-[11px] font-normal text-white/90">Supervisión técnica de clientes</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="space-y-1">
                <button
                  id="mobile-link-inicio"
                  onClick={() => handleLinkClick('home', 'hero')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-stone-800 hover:bg-stone-100 text-sm font-medium text-left"
                >
                  <Home className="w-4 h-4 text-[#B59353]" />
                  <span>Inicio</span>
                </button>

                <button
                  id="mobile-link-proyectos"
                  onClick={() => handleLinkClick('home', 'proyectos')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-stone-800 hover:bg-stone-100 text-sm font-medium text-left"
                >
                  <Building2 className="w-4 h-4 text-[#B59353]" />
                  <span>Obras & Portafolio</span>
                </button>

                <button
                  id="mobile-link-servicios"
                  onClick={() => handleLinkClick('home', 'servicios')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-stone-800 hover:bg-stone-100 text-sm font-medium text-left"
                >
                  <Layers className="w-4 h-4 text-[#B59353]" />
                  <span>Metodología & Edificación</span>
                </button>

                <button
                  id="mobile-link-cotizador"
                  onClick={() => handleLinkClick('home', 'cotizador')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-stone-100 border border-stone-200 text-stone-900 text-sm font-semibold text-left"
                >
                  <Calculator className="w-4 h-4 text-[#B59353]" />
                  <span>Estudio de Factibilidad</span>
                </button>

                <button
                  id="mobile-link-nosotros"
                  onClick={() => handleLinkClick('home', 'nosotros')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-stone-800 hover:bg-stone-100 text-sm font-medium text-left"
                >
                  <Users className="w-4 h-4 text-[#B59353]" />
                  <span>El Estudio</span>
                </button>

                <button
                  id="mobile-link-contacto"
                  onClick={() => handleLinkClick('home', 'contacto')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-stone-800 hover:bg-stone-100 text-sm font-medium text-left"
                >
                  <Mail className="w-4 h-4 text-[#B59353]" />
                  <span>Contacto & Citas</span>
                </button>
              </div>
            </div>

            {/* Bottom drawer contact details */}
            <div className="pt-6 border-t border-stone-200">
              <div className="text-[11px] uppercase tracking-wider text-stone-500 mb-2 font-medium">Atención de proyectos:</div>
              <a 
                href="https://wa.me/529844531913" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-stone-900 hover:text-[#B59353] font-medium mb-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#B59353]" />
                <span>+52 984 453 1913</span>
              </a>
              <div className="text-xs text-stone-500">
                Playa del Carmen, Quintana Roo, México
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
