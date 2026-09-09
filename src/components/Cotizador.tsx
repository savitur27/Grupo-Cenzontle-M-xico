import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Home, 
  Building, 
  Sparkles, 
  Hammer, 
  Factory, 
  Clock, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  Send, 
  Calendar, 
  Info, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  X,
  FileText,
  MessageCircle
} from 'lucide-react';
import { 
  TipoProyectoCotizador, 
  NivelAcabados, 
  TopografiaTerreno, 
  CotizadorConfig 
} from '../types';

export const Cotizador: React.FC = () => {
  const [config, setConfig] = useState<CotizadorConfig>({
    tipoProyecto: 'residencial_unifamiliar',
    metrosCuadrados: 280,
    niveles: 2,
    acabados: 'estandar',
    topografia: 'plano',
    serviciosAdicionales: {
      proyectoEjecutivo3D: true,
      tramitesPermisos: true,
      calculoEstructuralDRO: true,
      supervisionObra: true,
      llaveEnMano: false,
    }
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ubicacionTerreno: '',
    fechaDeseada: '',
    comentarios: ''
  });

  // Base prices in MXN per m²
  const preciosBaseM2: Record<TipoProyectoCotizador, number> = {
    residencial_unifamiliar: 16500,
    residencial_lujo: 23500,
    comercial_oficinas: 17800,
    remodelacion_integral: 13200,
    nave_industrial: 9800
  };

  const factorAcabados: Record<NivelAcabados, number> = {
    economico: 0.85,
    estandar: 1.0,
    premium: 1.35,
    lujo: 1.75
  };

  const factorNiveles: Record<number, number> = {
    1: 1.0,
    2: 1.06,
    3: 1.14,
    4: 1.24
  };

  const costoTopografiaM2: Record<TopografiaTerreno, number> = {
    plano: 0,
    desnivel_leve: 450,
    desnivel_pronunciado: 950
  };

  // Calculations
  const calculos = useMemo(() => {
    const baseM2 = preciosBaseM2[config.tipoProyecto];
    const acabadosMult = factorAcabados[config.acabados];
    const nivelesMult = factorNiveles[config.niveles] || 1.1;
    const topografiaAdd = costoTopografiaM2[config.topografia];

    const costoM2Ajustado = Math.round((baseM2 * acabadosMult * nivelesMult) + topografiaAdd);
    const costoObraBase = costoM2Ajustado * config.metrosCuadrados;

    // Servicios adicionales
    let adicionales = 0;
    if (config.serviciosAdicionales.proyectoEjecutivo3D) adicionales += 45000 + (config.metrosCuadrados * 50);
    if (config.serviciosAdicionales.tramitesPermisos) adicionales += 28000;
    if (config.serviciosAdicionales.calculoEstructuralDRO) adicionales += 32000 + (config.metrosCuadrados * 35);
    if (config.serviciosAdicionales.supervisionObra) adicionales += costoObraBase * 0.06;
    if (config.serviciosAdicionales.llaveEnMano) adicionales += costoObraBase * 0.08;

    const totalEstimado = costoObraBase + adicionales;
    const minEstimado = Math.round(totalEstimado * 0.95);
    const maxEstimado = Math.round(totalEstimado * 1.08);
    const promedioM2 = Math.round(totalEstimado / config.metrosCuadrados);

    // Tiempo estimado de ejecución en meses
    let meses = 6;
    if (config.metrosCuadrados <= 150) meses = 5;
    else if (config.metrosCuadrados <= 300) meses = 8;
    else if (config.metrosCuadrados <= 600) meses = 11;
    else if (config.metrosCuadrados <= 1000) meses = 15;
    else meses = 18;

    if (config.niveles > 2) meses += 2;
    if (config.acabados === 'lujo') meses += 2;

    // Partidas
    const cimentacion = Math.round(costoObraBase * 0.32);
    const albanileria = Math.round(costoObraBase * 0.24);
    const instalaciones = Math.round(costoObraBase * 0.16);
    const acabados = Math.round(costoObraBase * 0.20);
    const gestion = Math.round(totalEstimado - (cimentacion + albanileria + instalaciones + acabados));

    return {
      minEstimado,
      maxEstimado,
      promedioM2,
      totalEstimado,
      meses,
      partidas: {
        cimentacion,
        albanileria,
        instalaciones,
        acabados,
        gestion
      }
    };
  }, [config]);

  const formatoMoneda = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleEnviarSolicitud = (e: React.FormEvent) => {
    e.preventDefault();
    setFormularioEnviado(true);
  };

  const compartirWhatsApp = () => {
    const texto = `Estimado equipo de Grupo Cenzontle, he generado una estimación de factibilidad en su portal web:\n- Programa: ${config.tipoProyecto.replace('_', ' ').toUpperCase()}\n- Superficie: ${config.metrosCuadrados} m² en ${config.niveles} niveles\n- Acabados: ${config.acabados.toUpperCase()}\n- Rango de Inversión: ${formatoMoneda(calculos.minEstimado)} a ${formatoMoneda(calculos.maxEstimado)}\nSolicito revisión y dictamen por parte del taller de arquitectura.`;
    const url = `https://wa.me/529844531913?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cotizador" className="py-28 bg-[#F5F3ED] text-stone-900 relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#B59353] mb-3">
            <span className="w-5 h-px bg-[#B59353]"></span>
            <span>Ingeniería de Costos & Factibilidad</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-stone-900 font-serif-arch">
            Estudio Paramétrico Presupuestal
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 font-light leading-relaxed">
            Configure las variables espaciales y técnicas de su obra para obtener un modelo de inversión preliminar sustentado en tabuladores vigentes y costos reales de ejecución.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-lg p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
            {/* 1. Tipo de Proyecto */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-800">
                  1. Tipología Arquitectónica
                </label>
                <span className="text-[11px] text-stone-400 font-light">Destino del inmueble</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'residencial_unifamiliar', label: 'Residencia', icon: Home },
                  { id: 'residencial_lujo', label: 'Residencial Alta Gama', icon: Sparkles },
                  { id: 'comercial_oficinas', label: 'Corporativo & Oficinas', icon: Building },
                  { id: 'remodelacion_integral', label: 'Intervención / Remodelación', icon: Hammer },
                  { id: 'nave_industrial', label: 'Nave / Pabellón Técnico', icon: Factory }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = config.tipoProyecto === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`cotizador-tipo-${item.id}`}
                      type="button"
                      onClick={() => setConfig({ ...config, tipoProyecto: item.id as TipoProyectoCotizador })}
                      className={`flex flex-col items-start p-3.5 rounded border text-left transition-all ${
                        isSelected 
                          ? 'bg-[#FAF9F5] border-[#B59353] text-stone-900 shadow-xs ring-1 ring-[#B59353]/30' 
                          : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-2.5 ${isSelected ? 'text-[#B59353]' : 'text-stone-400'}`} />
                      <span className="text-xs font-medium leading-snug">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Metros Cuadrados con Slider & Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-800">
                  2. Superficie Proyectada (m²)
                </label>
                <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-3 py-1 rounded border border-stone-200">
                  <input
                    type="number"
                    min="50"
                    max="2000"
                    value={config.metrosCuadrados}
                    onChange={(e) => setConfig({ ...config, metrosCuadrados: Math.max(40, Number(e.target.value)) })}
                    className="w-20 bg-transparent text-right font-serif-arch text-lg text-stone-900 focus:outline-none"
                  />
                  <span className="text-xs text-stone-400 font-light">m²</span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="1500"
                step="10"
                value={config.metrosCuadrados}
                onChange={(e) => setConfig({ ...config, metrosCuadrados: Number(e.target.value) })}
                className="w-full h-1.5 bg-stone-200 rounded appearance-none cursor-pointer accent-[#B59353] my-3"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-stone-400 text-[11px] font-light">Dimensiones de referencia:</span>
                {[150, 280, 420, 600, 850].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setConfig({ ...config, metrosCuadrados: m })}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      config.metrosCuadrados === m 
                        ? 'bg-stone-900 text-white border-stone-900' 
                        : 'bg-white border-stone-200 text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {m} m²
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Niveles & Topografía */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-stone-800 mb-2">
                  3. Plantas / Niveles
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setConfig({ ...config, niveles: num })}
                      className={`py-2 rounded text-center text-xs font-medium border transition-all ${
                        config.niveles === num
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {num} {num === 4 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-stone-800 mb-2">
                  4. Rasante Topográfica
                </label>
                <select
                  value={config.topografia}
                  onChange={(e) => setConfig({ ...config, topografia: e.target.value as TopografiaTerreno })}
                  className="w-full bg-white border border-stone-200 rounded py-2 px-3 text-xs text-stone-800 focus:border-[#B59353] focus:outline-none"
                >
                  <option value="plano">Predio Plano (Pendiente &lt; 5%)</option>
                  <option value="desnivel_leve">Pendiente Moderada (5% a 15%)</option>
                  <option value="desnivel_pronunciado">Topografía Abrupta (&gt; 15%)</option>
                </select>
              </div>
            </div>

            {/* 5. Nivel de Acabados */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-800">
                  5. Especificación & Materialidad
                </label>
                <span className="text-[11px] text-stone-400 font-light">Catálogo de acabados</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'economico',
                    titulo: 'Básico / Esencial',
                    desc: 'Aplanados de yeso a plomo, pisos cerámicos 60x60, perfiles de aluminio línea nacional, carpinterías estándar.'
                  },
                  {
                    id: 'estandar',
                    titulo: 'Estándar / Atelier Confort',
                    desc: 'Porcelanato rectificado 60x120, cancelería de línea española hermética, barras de granito, carpinterías a medida.'
                  },
                  {
                    id: 'premium',
                    titulo: 'Premium / Materiales Nobles',
                    desc: 'Mármol travertino o Santo Tomás, maderas de tzalam o encino macizo, cancelería doble vidrio térmico.'
                  },
                  {
                    id: 'lujo',
                    titulo: 'Alta Gama',
                    desc: 'Mármoles italianos de gran formato, domótica KNX/Lutron integrada, cancelería oculta al piso y detalles escultóricos.'
                  }
                ].map((tier) => {
                  const isSelected = config.acabados === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setConfig({ ...config, acabados: tier.id as NivelAcabados })}
                      className={`p-3.5 rounded border text-left transition-all ${
                        isSelected 
                          ? 'bg-[#FAF9F5] border-[#B59353] ring-1 ring-[#B59353]/30' 
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-stone-900">{tier.titulo}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#B59353] shrink-0" />}
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed font-light">{tier.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Servicios Adicionales */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-stone-800 mb-3">
                6. Paquete de Servicios de Respaldo Técnico
              </label>
              <div className="space-y-2">
                {[
                  { 
                    key: 'proyectoEjecutivo3D', 
                    label: 'Proyecto Ejecutivo Completo: Planos constructivos, ingenierías y modelado BIM' 
                  },
                  { 
                    key: 'tramitesPermisos', 
                    label: 'Gestoría Oficial: Licencia municipal de construcción y alineamiento oficial' 
                  },
                  { 
                    key: 'calculoEstructuralDRO', 
                    label: 'Memoria de Cálculo Sísmico y Responsiva Oficial de D.R.O. colegiado' 
                  },
                  { 
                    key: 'supervisionObra', 
                    label: 'Supervisión Técnica Permanente con Arquitecto Residente en obra' 
                  },
                  { 
                    key: 'llaveEnMano', 
                    label: 'Entrega "Llave en Mano": Equipamiento de iluminación, jardinería y closets' 
                  }
                ].map((serv) => {
                  const isChecked = config.serviciosAdicionales[serv.key as keyof typeof config.serviciosAdicionales];
                  return (
                    <label 
                      key={serv.key}
                      className="flex items-start gap-3 p-3 rounded bg-[#FAF9F5] border border-stone-200/80 cursor-pointer hover:border-stone-300 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setConfig({
                          ...config,
                          serviciosAdicionales: {
                            ...config.serviciosAdicionales,
                            [serv.key]: e.target.checked
                          }
                        })}
                        className="mt-0.5 w-4 h-4 rounded border-stone-300 text-[#B59353] focus:ring-[#B59353] accent-[#B59353]"
                      />
                      <span className="text-xs text-stone-700 select-none leading-relaxed font-light">
                        {serv.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Output & Summary Card (Executive Dossier Look) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-lg p-7 sm:p-9 border border-stone-200 shadow-md relative overflow-hidden">
              {/* Reference Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  <FileText className="w-3.5 h-3.5 text-[#B59353]" />
                  <span>REF: EST-GC-{config.metrosCuadrados}M2</span>
                </div>
                <span className="text-[10px] font-medium text-[#B59353] uppercase tracking-widest">
                  Parámetro 2025
                </span>
              </div>

              <div className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium mb-1">
                Presupuesto Paramétrico Estimado
              </div>

              {/* Total Price Range in Plus Jakarta Sans */}
              <div 
                className="text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight my-2 font-['Plus_Jakarta_Sans',sans-serif]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {formatoMoneda(calculos.minEstimado)}
                <span className="text-stone-400 text-base font-normal mx-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>a</span>
                {formatoMoneda(calculos.maxEstimado)}
              </div>

              <p className="text-xs text-stone-500 mb-6 font-light leading-relaxed">
                Rango medio proyectado: <strong className="font-semibold text-stone-800">{formatoMoneda(calculos.promedioM2)} / m²</strong>. Calculado con precios de mano de obra certificada y proveedores verificados.
              </p>

              {/* Technical Execution Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 bg-[#FAF9F5] rounded border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-stone-200/60 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#B59353]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-400">Plazo Estimado</div>
                    <div className="text-xs font-semibold text-stone-900">{calculos.meses} Meses de Obra</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-stone-200/60 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-[#B59353]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-400">Programa</div>
                    <div className="text-xs font-semibold text-stone-900">{config.metrosCuadrados} m² · {config.niveles} niv.</div>
                  </div>
                </div>
              </div>

              {/* Partidas Breakdown */}
              <div className="space-y-3 mb-7">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-800">
                  Desglose por Partidas Constructivas
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-stone-600 mb-1 font-light">
                      <span>Cimentación & Estructura Pesada</span>
                      <span className="font-medium text-stone-900">{formatoMoneda(calculos.partidas.cimentacion)}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded overflow-hidden">
                      <div className="bg-[#B59353] h-full w-[32%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-600 mb-1 font-light">
                      <span>Muros, Albañilería & Losas</span>
                      <span className="font-medium text-stone-900">{formatoMoneda(calculos.partidas.albanileria)}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded overflow-hidden">
                      <div className="bg-stone-700 h-full w-[24%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-600 mb-1 font-light">
                      <span>Instalaciones Hidrosanitarias & Eléctricas</span>
                      <span className="font-medium text-stone-900">{formatoMoneda(calculos.partidas.instalaciones)}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded overflow-hidden">
                      <div className="bg-stone-500 h-full w-[16%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-600 mb-1 font-light">
                      <span>Acabados, Cancelería & Revestimientos</span>
                      <span className="font-medium text-stone-900">{formatoMoneda(calculos.partidas.acabados)}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded overflow-hidden">
                      <div className="bg-[#B59353]/80 h-full w-[20%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-600 mb-1 font-light">
                      <span>Supervisión, D.R.O. & Dirección de Taller</span>
                      <span className="font-medium text-stone-900">{formatoMoneda(calculos.partidas.gestion)}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded overflow-hidden">
                      <div className="bg-stone-400 h-full w-[8%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="cotizador-solicitar-formal-btn"
                  onClick={() => setModalAbierto(true)}
                  className="w-full py-3.5 px-4 rounded bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Dictamen Técnico Formal</span>
                </button>

                <button
                  id="cotizador-whatsapp-btn"
                  onClick={compartirWhatsApp}
                  className="w-full py-3 px-3 rounded bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Consulta WhatsApp</span>
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-200 flex items-start gap-2 text-[11px] text-stone-400 font-light">
                <ShieldCheck className="w-4 h-4 text-[#B59353] shrink-0 mt-0.5" />
                <span>
                  Estimación paramétrica conforme a estándares de la Cámara de la Industria de la Construcción. Sujeta a estudio de mecánica de suelos y proyecto ejecutivo.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Solicitar Cotización Formal */}
      {modalAbierto && (
        <div 
          id="modal-cotizacion-overlay"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setModalAbierto(false)}
        >
          <div 
            id="modal-cotizacion-container"
            className="bg-white border border-stone-200 rounded-lg w-full max-w-lg p-6 sm:p-8 text-stone-900 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>

            {!formularioEnviado ? (
              <div>
                <div className="flex items-center gap-2 text-[#B59353] text-[11px] font-medium uppercase tracking-[0.2em] mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dictamen de Factibilidad & Visita Técnica</span>
                </div>
                <h3 className="text-2xl font-light text-stone-900 font-serif-arch mb-2">
                  Solicitud de Proyecto Formal
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mb-6 font-light leading-relaxed">
                  Un arquitecto líder de Grupo Cenzontle revisará el estudio de <span className="font-medium text-stone-800">{config.metrosCuadrados} m²</span> y coordinará una inspección topográfica preliminar sin costo.
                </p>

                <form onSubmit={handleEnviarSolicitud} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Nombre Completo *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Arq. / Ing. Roberto Sandoval"
                      value={datosContacto.nombre}
                      onChange={(e) => setDatosContacto({ ...datosContacto, nombre: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#B59353] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Teléfono Móvil *</label>
                      <input
                        required
                        type="tel"
                        placeholder="55 1234 5678"
                        value={datosContacto.telefono}
                        onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#B59353] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Correo Electrónico *</label>
                      <input
                        required
                        type="email"
                        placeholder="contacto@ejemplo.com"
                        value={datosContacto.email}
                        onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#B59353] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Ubicación del Predio</label>
                    <input
                      type="text"
                      placeholder="Ej. Mayakoba, Aldea Zamá, Puerto Cancún, Playacar, Bahía Soliman..."
                      value={datosContacto.ubicacionTerreno}
                      onChange={(e) => setDatosContacto({ ...datosContacto, ubicacionTerreno: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#B59353] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Observaciones Técnicas o Preferencias</label>
                    <textarea
                      rows={2}
                      placeholder="Mencione si ya cuenta con anteproyecto, mecánica de suelos o necesidades específicas..."
                      value={datosContacto.comentarios}
                      onChange={(e) => setDatosContacto({ ...datosContacto, comentarios: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded px-3.5 py-2 text-sm text-stone-900 focus:border-[#B59353] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-[0.16em] rounded transition-all shadow-xs"
                  >
                    Confirmar & Solicitar Dictamen Técnico
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-light text-stone-900 font-serif-arch mb-2">Solicitud Recibida</h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6 font-light leading-relaxed">
                  Folio asignado: <span className="font-mono text-stone-900 font-semibold">EST-2025-{Math.floor(1000 + Math.random() * 9000)}</span>. Se ha turnado su programa de {config.metrosCuadrados} m² a la Dirección de Proyectos de Grupo Cenzontle.
                </p>
                <div className="bg-[#FAF9F5] p-4 rounded border border-stone-200 text-xs text-left mb-6 space-y-1.5 font-light">
                  <div className="text-stone-500">Solicitante: <span className="text-stone-900 font-medium">{datosContacto.nombre}</span></div>
                  <div className="text-stone-500">Inversión Paramétrica: <span className="text-stone-900 font-medium">{formatoMoneda(calculos.minEstimado)} - {formatoMoneda(calculos.maxEstimado)}</span></div>
                  <div className="text-stone-500">Tiempo de Obra Proyectado: <span className="text-stone-900 font-medium">{calculos.meses} meses</span></div>
                </div>
                <button
                  onClick={() => {
                    setModalAbierto(false);
                    setFormularioEnviado(false);
                  }}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded text-xs uppercase tracking-[0.14em] transition-colors"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
