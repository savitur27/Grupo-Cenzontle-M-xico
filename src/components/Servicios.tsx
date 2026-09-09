import React from 'react';
import { 
  Compass, 
  FileCheck, 
  HardHat, 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const Servicios: React.FC<{ onIrCotizador: () => void }> = ({ onIrCotizador }) => {
  const servicios = [
    {
      icon: Compass,
      numero: '01',
      titulo: 'Diseño Arquitectónico & Modelado BIM 3D',
      descripcion: 'Desarrollo de anteproyecto, modelos tridimensionales fotorrealistas, compatibilización de ingenierías y optimización bioclimática para reducir consumos energéticos.',
      beneficios: ['Renders fotorrealistas 4K', 'Planos ejecutivos completos', 'Recorridos virtuales interactivos']
    },
    {
      icon: FileCheck,
      numero: '02',
      titulo: 'Gestoría de Permisos, Licencias & D.R.O.',
      descripcion: 'Dictamen de mecánica de suelos, cálculo estructural sísmico certificado, firma de Director Responsable de Obra y trámite de manifestación de construcción ante la alcaldía o municipio.',
      beneficios: ['100% apego al reglamento de construcciones', 'Alineamiento y número oficial', 'Evita clausuras y retrasos legales']
    },
    {
      icon: HardHat,
      numero: '03',
      titulo: 'Construcción & Estructura de Alta Precisión',
      descripcion: 'Excavación, cimentaciones profundas, muros de contención impermeabilizados, estructuras de concreto armado y acero estructural con control de calidad de laboratorio.',
      beneficios: ['Concretos premezclados certificados', 'Pruebas de revenimiento y cilindros', 'Cuadrillas especializadas en sitio']
    },
    {
      icon: Sparkles,
      numero: '04',
      titulo: 'Acabados de Lujo & Arquitectura Interior',
      descripcion: 'Colocación milimétrica de mármoles importados, carpinterías de alta gama en maderas finas, ventanería hermética con doble acristalamiento y diseño lumínico integral.',
      beneficios: ['Detallado de carpinterías a medida', 'Cancelerías europeas termoacústicas', 'Cocinas integrales con piedras naturales']
    },
    {
      icon: ShieldCheck,
      numero: '05',
      titulo: 'Supervisión Técnica Permanente en Obra',
      descripcion: 'Residente de obra exclusivo en el predio, control diario de cronograma y bitácora digital con acceso en tiempo real para el cliente a través de nuestro portal.',
      beneficios: ['Bitácora fotográfica diaria', 'Control de presupuesto sin sobrecostos', 'Reportes semanales ejecutivos']
    },
    {
      icon: KeyRound,
      numero: '06',
      titulo: 'Modalidad "Llave en Mano" & Póliza de Garantía',
      descripcion: 'Te entregamos la residencia totalmente equipada, con jardinería instalada, iluminación automatizada, pruebas de instalaciones al 100% y póliza de vicios ocultos.',
      beneficios: ['Presupuesto cerrado sin sorpresas', 'Póliza de garantía por escrito', 'Entrega puntual programada']
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-2">
            Metodología & Alcance
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-arch text-stone-900 mb-4 tracking-tight">
            Práctica Integral de Arquitectura & Edificación
          </h2>
          <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-sans max-w-2xl">
            Acompañamos cada fase con rigor proyectual: desde la primera exploración conceptual hasta la entrega técnica de llaves, garantizando fidelidad constructiva y excelencia en el detalle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-[#FAF9F5] p-8 border border-stone-200 hover:border-stone-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200/80">
                    <div className="w-10 h-10 border border-stone-300 bg-white text-[#B59353] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-serif-arch text-stone-400 font-normal">
                      {s.numero}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif-arch text-stone-900 mb-3 group-hover:text-[#B59353] transition-colors">
                    {s.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-sans">
                    {s.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/60 space-y-2">
                  {s.beneficios.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2.5 text-xs text-stone-600 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B59353] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 bg-stone-900 p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium">
              Factibilidad Inmediata
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-arch">
              ¿Desea evaluar la factibilidad de su próximo proyecto?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl font-sans">
              Utilice nuestro estimador paramétrico para obtener un desglose técnico de inversión o programe una inspección del predio.
            </p>
          </div>

          <button
            onClick={onIrCotizador}
            className="px-6 py-3.5 border border-[#B59353] bg-[#B59353] hover:bg-[#a38245] text-white uppercase tracking-wider text-xs font-medium shrink-0 flex items-center gap-2.5 transition-all"
          >
            <span>Consultar Estimador de Inversión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
