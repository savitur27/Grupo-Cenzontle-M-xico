import React from 'react';
import { Logo } from './Logo';
import { HardHat, Calculator, ShieldCheck, Mail, Phone, MapPin, ChevronRight, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'seguimiento', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Firma de arquitectura contemporánea, ingeniería estructural y edificación integral. Diseñamos espacios con identidad y construimos con rigor presupuestal y tecnológico.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span id="footer-registro-dro">Registro D.R.O.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('home', 'hero')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'proyectos')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Portafolio de Obras
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'servicios')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Servicios de Construcción
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'cotizador')}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Cotizador de Obra</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'nosotros')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Sobre el Estudio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'contacto')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contacto & Citas
                </button>
              </li>
            </ul>
          </div>

          {/* Servicios Clave */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Residencias Unifamiliares</li>
              <li>Arquitectura de Alta Gama</li>
              <li>Edificios de Oficinas</li>
              <li>Estructuras de Concreto & Acero</li>
              <li>Modelado y Coordinación BIM</li>
              <li>Dirección de Obra Llave en Mano</li>
            </ul>
          </div>

          {/* Portal de Clientes */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#B59353] font-medium mb-4">
              Portal de Propietarios
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Área confidencial exclusiva para clientes con obra activa: avances, bitácora fotográfica y estados de cuenta.
            </p>

            <button
              id="footer-acceso-obra-btn"
              onClick={() => onNavigate('seguimiento')}
              className="w-full py-2.5 px-3 border border-[#B59353] bg-[#B59353] hover:bg-[#a38245] text-white uppercase tracking-wider text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso con Folio de Obra</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <div>
            © {new Date().getFullYear()} Grupo Cenzontle S.A. de C.V. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-stone-300 cursor-pointer">Aviso de Privacidad</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Normativa & Registro D.R.O.</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Póliza de Calidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
