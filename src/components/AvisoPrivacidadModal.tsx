import React, { useEffect, useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacidad' | 'calidad';
}

export const AvisoPrivacidadModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'privacidad'
}) => {
  const [activeTab, setActiveTab] = useState<'privacidad' | 'calidad'>(initialTab);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Bloquear scroll de fondo mientras el lightbox está activo
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contacto@grupocenzontle.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop con desenfoque */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Contenedor del Lightbox */}
      <div 
        id="aviso-privacidad-lightbox"
        className="relative w-full max-w-3xl bg-white border border-stone-200 shadow-2xl z-10 flex flex-col max-h-[90vh] my-auto overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Encabezado del Lightbox */}
        <div className="bg-[#FAF9F5] border-b border-stone-200 px-6 py-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-[#B59353] flex items-center justify-center shrink-0 mt-0.5 border border-[#B59353]/30">
              {activeTab === 'privacidad' ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <Award className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#B59353] font-semibold">
                Grupo Cenzontle México S.A. de C.V.
              </div>
              <h2 id="legal-modal-title" className="text-xl sm:text-2xl font-serif-arch text-stone-900 mt-0.5 font-normal">
                {activeTab === 'privacidad' ? 'Aviso de Privacidad Integral' : 'Póliza de Calidad & Garantía Estructural'}
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                {activeTab === 'privacidad' 
                  ? 'Cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)'
                  : 'Compromiso normativo, supervisión de obra y estándares de edificación'
                }
              </p>
            </div>
          </div>

          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 rounded transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de pestañas */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 text-xs font-medium px-6">
          <button
            id="tab-aviso-privacidad"
            onClick={() => setActiveTab('privacidad')}
            className={`py-3 px-4 flex items-center gap-2 border-b-2 font-medium tracking-wider uppercase text-[11px] transition-colors ${
              activeTab === 'privacidad'
                ? 'border-[#B59353] text-stone-950 bg-white font-semibold shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#B59353]" />
            <span>Aviso de Privacidad</span>
          </button>
          <button
            id="tab-poliza-calidad"
            onClick={() => setActiveTab('calidad')}
            className={`py-3 px-4 flex items-center gap-2 border-b-2 font-medium tracking-wider uppercase text-[11px] transition-colors ${
              activeTab === 'calidad'
                ? 'border-[#B59353] text-stone-950 bg-white font-semibold shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#B59353]" />
            <span>Póliza de Calidad</span>
          </button>
        </div>

        {/* Cuerpo del Aviso con Scroll */}
        <div className="overflow-y-auto px-6 py-6 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed font-sans">
          {activeTab === 'privacidad' ? (
            <>
              {/* Tarjeta de contacto rápido */}
              <div className="bg-[#FAF9F5] border border-[#B59353]/30 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B59353] shrink-0" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Oficina de Privacidad y Datos Personales</div>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-stone-900">contacto@grupocenzontle.com</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs rounded transition-colors shadow-2xs font-medium"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Copiar correo</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1. Responsable */}
              <section className="space-y-2">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900 flex items-center gap-2">
                  <span className="text-[#B59353] text-xs font-mono">01.</span>
                  Identidad y Domicilio del Responsable
                </h3>
                <p className="text-stone-600">
                  <strong>Grupo Cenzontle México S.A. de C.V.</strong> (en adelante, <em className="not-italic font-medium">"Grupo Cenzontle México"</em>), con domicilio fiscal y centro de operaciones en la República Mexicana, es el responsable del uso, protección y tratamiento de sus datos personales en estricto apego a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>, su Reglamento y los Lineamientos del Aviso de Privacidad emitidos por el INAI.
                </p>
                <p className="text-stone-600">
                  Para cualquier duda o aclaración sobre este documento o sobre la salvaguarda de su información, puede comunicarse formalmente a nuestro canal oficial de privacidad: <a href="mailto:contacto@grupocenzontle.com" className="text-[#B59353] underline font-medium hover:text-[#9E7C3E]">contacto@grupocenzontle.com</a>.
                </p>
              </section>

              {/* 2. Datos personales recabados */}
              <section className="space-y-2 pt-2 border-t border-stone-100">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900 flex items-center gap-2">
                  <span className="text-[#B59353] text-xs font-mono">02.</span>
                  Datos Personales que Recabamos
                </h3>
                <p className="text-stone-600">
                  Para llevar a cabo las finalidades descritas en el presente aviso, recabamos las siguientes categorías de datos personales a través de nuestros formularios digitales, cotizador paramétrico y consultas directas:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li><strong>Datos de Identificación y Contacto:</strong> Nombre completo, número telefónico móvil o de oficina, correo electrónico personal o corporativo.</li>
                  <li><strong>Datos del Proyecto y Predio:</strong> Ubicación geográfica o municipio del terreno de construcción, superficie estimada en metros cuadrados (m²), programa de necesidades arquitectónicas, memoria descriptiva y tipo de proyecto (residencial, comercial, industrial o remodelación).</li>
                  <li><strong>Datos de Acceso al Portal de Clientes:</strong> Código o folio confidencial de seguimiento de obra para consulta en tiempo real de bitácora y estados financieros de construcción.</li>
                  <li><strong>Información Fiscal (en caso de contratación):</strong> Registro Federal de Contribuyentes (RFC), constancia de situación fiscal y domicilio para facturación electrónica conforme al SAT.</li>
                </ul>
                <p className="text-[11px] text-stone-500 italic">
                  * Grupo Cenzontle NO recaba datos personales sensibles (tales como origen étnico, estado de salud o datos biométricos) a través de esta plataforma digital.
                </p>
              </section>

              {/* 3. Finalidades del Tratamiento */}
              <section className="space-y-2 pt-2 border-t border-stone-100">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900 flex items-center gap-2">
                  <span className="text-[#B59353] text-xs font-mono">03.</span>
                  Finalidades del Tratamiento de Datos
                </h3>
                <div className="space-y-2">
                  <div className="bg-stone-50 p-3 border-l-2 border-[#B59353] text-xs">
                    <strong className="text-stone-900 block mb-1">Finalidades Primarias (necesarias para el servicio):</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-stone-600">
                      <li>Elaboración de presupuestos paramétricos y análisis de viabilidad técnica y financiera de edificación.</li>
                      <li>Coordinación de sesiones proyectuales con la Dirección Técnica y Arquitectónica del despacho.</li>
                      <li>Formalización de contratos de prestación de servicios arquitectónicos, gerencia de obra, cálculo estructural y firma de D.R.O.</li>
                      <li>Habilitación y administración del Portal Privado de Clientes para el seguimiento de bitácora, memorias fotográficas semanales y avance físico de obra.</li>
                      <li>Cumplimiento de obligaciones fiscales, mercantiles y reglamentarias ante las dependencias de desarrollo urbano aplicables.</li>
                    </ul>
                  </div>

                  <div className="bg-stone-50 p-3 border-l-2 border-stone-300 text-xs">
                    <strong className="text-stone-900 block mb-1">Finalidades Secundarias:</strong>
                    <p className="text-stone-600">
                      Envío de boletines sobre novedades arquitectónicas, publicaciones de portafolio y actualizaciones sobre materiales o normativas de construcción. Si no desea que sus datos sean tratados para estas finalidades secundarias, puede manifestarlo enviando un correo a <span className="font-mono text-stone-900">contacto@grupocenzontle.com</span>.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Ejercicio de Derechos ARCO */}
              <section className="space-y-2 pt-2 border-t border-stone-100">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900 flex items-center gap-2">
                  <span className="text-[#B59353] text-xs font-mono">04.</span>
                  Ejercicio de Derechos ARCO y Revocación del Consentimiento
                </h3>
                <p className="text-stone-600">
                  Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (<strong>Rectificación</strong>); que la eliminemos de nuestros registros cuando considere que no está siendo utilizada adecuadamente (<strong>Cancelación</strong>); así como oponerse al uso de sus datos para fines específicos (<strong>Oposición</strong>).
                </p>
                <div className="bg-[#FAF9F5] border border-stone-200 p-3.5 rounded text-xs space-y-1.5">
                  <div className="font-semibold text-stone-900">Procedimiento para ejercer Derechos ARCO:</div>
                  <ol className="list-decimal pl-4 space-y-1 text-stone-600">
                    <li>Remitir una solicitud por escrito al correo oficial: <strong className="font-mono text-stone-900">contacto@grupocenzontle.com</strong>.</li>
                    <li>Indicar en el asunto: <em>"Solicitud de Derechos ARCO - [Nombre Completo]"</em>.</li>
                    <li>Acompañar copia simple de identificación oficial vigente (INE o Pasaporte) para acreditar la titularidad de los datos.</li>
                    <li>Describir con precisión los datos sobre los que busca ejercer alguno de los derechos y el motivo de la petición.</li>
                  </ol>
                  <div className="text-[11px] text-stone-500 pt-1">
                    Nuestro comité responderá en un plazo máximo de <strong>20 días hábiles</strong> contados a partir de la fecha de recepción formal de la solicitud.
                  </div>
                </div>
              </section>

              {/* 5. Transferencia y Resguardo */}
              <section className="space-y-2 pt-2 border-t border-stone-100">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900 flex items-center gap-2">
                  <span className="text-[#B59353] text-xs font-mono">05.</span>
                  Transferencia y Medidas de Seguridad
                </h3>
                <p className="text-stone-600">
                  Grupo Cenzontle <strong>no vende, cede ni transfiere</strong> sus datos personales a terceros con fines publicitarios o de comercialización masiva. Las transferencias de información se limitan exclusivamente a los supuestos previstos en el artículo 37 de la LFPDPPP (tales como autoridades municipales para licencias de construcción, peritajes oficiales de D.R.O. o requerimientos de autoridades competentes).
                </p>
                <p className="text-stone-600">
                  Implementamos medidas de seguridad administrativas, técnicas y físicas rigurosas para proteger sus planos, datos contractuales y folios de obra contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
                </p>
              </section>

              {/* 6. Modificaciones */}
              <section className="space-y-2 pt-2 border-t border-stone-100">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900 flex items-center gap-2">
                  <span className="text-[#B59353] text-xs font-mono">06.</span>
                  Actualizaciones del Aviso de Privacidad
                </h3>
                <p className="text-stone-600">
                  El presente aviso puede sufrir modificaciones o actualizaciones derivadas de nuevos requerimientos legales, de nuestras propias necesidades operativas o de cambios normativos en el sector de la edificación. Cualquier cambio será publicado oportunamente en este mismo portal institucional.
                </p>
                <p className="text-[11px] text-stone-500 font-mono">
                  Última actualización: Septiembre de 2026. Grupo Cenzontle México S.A. de C.V.
                </p>
              </section>
            </>
          ) : (
            /* Pestaña: Póliza de Calidad */
            <>
              <div className="bg-[#FAF9F5] border border-[#B59353]/30 p-4 rounded-sm">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#B59353] shrink-0" />
                  <div>
                    <h4 className="font-serif-arch text-sm font-semibold text-stone-900">Garantía Estructural & Cumplimiento Técnico D.R.O.</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Respaldo contractual en edificación, supervisión continua de laboratorio y apego a normativas mexicanas de construcción (RCDF / NTC).
                    </p>
                  </div>
                </div>
              </div>

              <section className="space-y-3">
                <h3 className="font-serif-arch text-base font-semibold text-stone-900">
                  Compromisos de Calidad de Grupo Cenzontle
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 border border-stone-200 bg-stone-50/70 rounded">
                    <div className="flex items-center gap-2 font-medium text-stone-900 text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#B59353]" />
                      Garantía Estructural por Escrito
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Póliza legal de estabilidad y solidez estructural avalada por Director Responsable de Obra (D.R.O.) y corresponsables de seguridad estructural.
                    </p>
                  </div>

                  <div className="p-3.5 border border-stone-200 bg-stone-50/70 rounded">
                    <div className="flex items-center gap-2 font-medium text-stone-900 text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#B59353]" />
                      Pruebas de Laboratorio Acreditado
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Ensayos destructivos y no destructivos de cilindros de concreto hidráulico (f'c), varilla de acero corrugado (fy) y compactación de terracerías.
                    </p>
                  </div>

                  <div className="p-3.5 border border-stone-200 bg-stone-50/70 rounded">
                    <div className="flex items-center gap-2 font-medium text-stone-900 text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#B59353]" />
                      Garantía en Instalaciones & Acabados
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      12 meses de cobertura directa contra vicios ocultos en impermeabilizaciones, instalaciones hidrosanitarias, canalizaciones eléctricas y carpinterías.
                    </p>
                  </div>

                  <div className="p-3.5 border border-stone-200 bg-stone-50/70 rounded">
                    <div className="flex items-center gap-2 font-medium text-stone-900 text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#B59353]" />
                      Transparencia en Bitácora de Obra
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Registro fotográfico fechado de cada etapa previa a colados, garantizando la correcta ejecución de armados y canalizaciones ocultas.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-stone-900 text-stone-300 text-xs rounded border border-stone-800 space-y-1.5">
                  <div className="text-white font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#B59353]" />
                    Atención a Pólizas y Garantías
                  </div>
                  <p className="text-stone-400">
                    Cualquier solicitud de revisión durante o con posterioridad a la entrega física de la obra puede remitirse a <span className="text-[#B59353] font-mono">contacto@grupocenzontle.com</span> con su número de contrato o folio de obra.
                  </p>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Pie del Lightbox */}
        <div className="bg-[#FAF9F5] border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Mail className="w-3.5 h-3.5 text-[#B59353]" />
            <span>Canal oficial:</span>
            <a 
              href="mailto:contacto@grupocenzontle.com" 
              className="text-stone-800 hover:text-[#B59353] font-medium font-mono underline decoration-stone-300"
            >
              contacto@grupocenzontle.com
            </a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              id="confirm-legal-modal-btn"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-[#B59353] text-white text-xs uppercase tracking-wider font-medium transition-colors shadow-xs"
            >
              Entendido y Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
