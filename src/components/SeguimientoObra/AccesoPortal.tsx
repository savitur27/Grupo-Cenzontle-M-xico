import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { buscarObraPorCodigo, ObraPaqueteCompleto } from '../../data/mockData';

interface AccesoPortalProps {
  onAccesoConcedido: (paquete: ObraPaqueteCompleto) => void;
  onVolverAlSitio: () => void;
  codigoInicial?: string;
}

export const AccesoPortal: React.FC<AccesoPortalProps> = ({
  onAccesoConcedido,
  onVolverAlSitio,
  codigoInicial = ''
}) => {
  const [codigo, setCodigo] = useState(codigoInicial);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Escuchar parámetros de URL para acceso directo por enlace (ej. ?obra=SOL-042 o #obra-SOL-042)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramObra = urlParams.get('obra') || urlParams.get('codigo') || urlParams.get('folio');
      
      let codigoDetectado = paramObra;
      if (!codigoDetectado && window.location.hash.startsWith('#obra-')) {
        codigoDetectado = window.location.hash.replace('#obra-', '');
      }

      if (codigoDetectado) {
        setCodigo(codigoDetectado.toUpperCase());
        const obraEncontrada = buscarObraPorCodigo(codigoDetectado);
        if (obraEncontrada) {
          onAccesoConcedido(obraEncontrada);
        }
      }
    } catch {
      // Ignorar en entornos restrictivos
    }
  }, [onAccesoConcedido]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (!codigo.trim()) {
      setError('Por favor ingrese su código de obra o folio de contrato.');
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const resultado = buscarObraPorCodigo(codigo);
      if (resultado) {
        onAccesoConcedido(resultado);
      } else {
        setError('Folio o código no localizado en el registro activo. Verifique el código proporcionado por su Director de Obra o Administrador de Proyecto.');
      }
      setCargando(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col justify-between pt-16 pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle architectural grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Top Header / Back navigation */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <button
          onClick={onVolverAlSitio}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-600 hover:text-stone-950 font-medium transition-colors py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Estudio</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 text-[11px] font-medium tracking-wider uppercase text-stone-600">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B59353]" />
          <span>Conexión Cifrada • Portal Propietarios</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="max-w-lg mx-auto w-full my-auto z-10">
        <div className="bg-white border border-stone-200/90 shadow-xl p-8 sm:p-10 relative">
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-24 h-2 bg-[#B59353] transform rotate-45 translate-x-8 -translate-y-8"></div>
          </div>

          {/* Shield & Key Icon */}
          <div className="w-14 h-14 bg-[#0B213F] text-white flex items-center justify-center mb-6 shadow-md mx-auto sm:mx-0">
            <KeyRound className="w-7 h-7 text-[#B59353]" />
          </div>

          <div className="text-center sm:text-left">
            <div className="text-[11px] font-medium tracking-[0.25em] text-[#B59353] uppercase mb-1.5">
              Expediente Digital de Construcción
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-900 font-serif-arch">
              Acceso a Supervisión de Obra
            </h1>
            <p className="text-stone-600 text-sm font-light mt-2.5 leading-relaxed">
              Cada obra cuenta con un entorno exclusivo y confidencial. Ingrese el folio de contrato asignado para consultar avances en tiempo real, bitácora fotográfica y estados financieros.
            </p>
          </div>

          {/* Code Input Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label 
                htmlFor="codigo-obra-input"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2"
              >
                Código Único de Obra o Folio
              </label>
              <div className="relative">
                <input
                  id="codigo-obra-input"
                  type="text"
                  value={codigo}
                  onChange={(e) => {
                    setCodigo(e.target.value.toUpperCase());
                    if (error) setError(null);
                  }}
                  placeholder="EJ. SOL-042"
                  autoFocus
                  maxLength={18}
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#B59353] focus:bg-white text-stone-900 text-base sm:text-lg font-mono tracking-widest px-4 py-3.5 rounded-none uppercase transition-all focus:outline-none placeholder:text-stone-400"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50/90 border border-red-200 text-red-700 text-xs leading-relaxed animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <div>{error}</div>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-ingresar-obra"
              type="submit"
              disabled={cargando}
              className="w-full bg-[#0B213F] hover:bg-[#08182f] text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer"
            >
              {cargando ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#B59353] border-t-transparent rounded-full animate-spin"></div>
                  <span>Verificando Expediente...</span>
                </>
              ) : (
                <>
                  <span>Ingresar a mi Obra</span>
                  <ArrowRight className="w-4 h-4 text-[#B59353]" />
                </>
              )}
            </button>
          </form>

          {/* Asistencia y Soporte de Acceso */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center sm:text-left">
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              ¿No localiza su folio de contrato o requiere asistencia para acceder? Contacte a su Director de Obra asignado o comuníquese a la Dirección Técnica al{' '}
              <a 
                href="https://wa.me/529844531913?text=Hola,%20requiero%20asistencia%20con%20mi%20c%C3%B3digo%20de%20acceso%20al%20portal%20de%20obra" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#B59353] hover:underline font-medium whitespace-nowrap"
              >
                +52 984 453 1913
              </a>.
            </p>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="text-center mt-6 text-xs text-stone-500 font-light flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B59353]" />
          <span>Acceso restringido exclusivamente a propietarios autorizados por Grupo Cenzontle.</span>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="max-w-4xl mx-auto w-full text-center text-[11px] text-stone-500 font-light z-10">
        Grupo Cenzontle Arquitectura & Edificación • Playa del Carmen & Riviera Maya
      </div>
    </div>
  );
};
