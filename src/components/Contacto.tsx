import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building
} from 'lucide-react';

interface ContactoProps {
  onOpenAvisoPrivacidad?: () => void;
}

export const Contacto: React.FC<ContactoProps> = ({ onOpenAvisoPrivacidad }) => {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    asunto: 'Nuevo Proyecto Residencial',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      // Keep confirmation view
    }, 400);
  };

  return (
    <section id="contacto" className="py-24 bg-[#FAF9F5] text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-2">
                Atención Técnica Directa
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-arch text-stone-900 mb-4 tracking-tight">
                Iniciar Diálogo de Proyecto
              </h2>
              <p className="text-sm text-stone-500 leading-relaxed font-sans">
                Agende una consulta técnica en nuestro taller o solicite la visita de un arquitecto residente a su predio para evaluación topográfica y factibilidad constructiva.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white border border-stone-200">
                <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-[#B59353] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-sans">
                  <div className="font-serif-arch text-stone-900 text-base">Taller Central de Proyectos</div>
                  <div id="contacto-direccion" className="text-stone-500 mt-1 leading-relaxed">
                    Playa del Carmen, Quintana Roo, México.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white border border-stone-200">
                <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-[#B59353] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-sans">
                  <div className="font-serif-arch text-stone-900 text-base">Líneas Directas & WhatsApp</div>
                  <div className="text-stone-500 mt-1 leading-relaxed">
                    Atención Directa: +52 984 453 1913<br />
                    Taller & Coordinación de Obra
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white border border-stone-200">
                <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-[#B59353] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-sans">
                  <div className="font-serif-arch text-stone-900 text-base">Comunicaciones Oficiales</div>
                  <div className="text-stone-500 mt-1 leading-relaxed">
                    contacto@grupocenzontle.com<br />
                    licitaciones@grupocenzontle.com
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white border border-stone-200">
                <div className="w-10 h-10 border border-stone-200 bg-stone-50 text-[#B59353] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-sans">
                  <div className="font-serif-arch text-stone-900 text-base">Horario de Taller & Supervisión</div>
                  <div className="text-stone-500 mt-1 leading-relaxed">
                    Lunes a Viernes: 08:00 hrs – 18:00 hrs<br />
                    Sábados: 08:00 hrs – 13:00 hrs (Inspección en campo)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-stone-200">
            {!enviado ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-stone-100 pb-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-1">
                    Cuestionario Preliminar
                  </div>
                  <h3 className="text-2xl font-serif-arch text-stone-900">
                    Remitir Consulta Técnica
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
                    Complete los campos para que la dirección técnica evalúe el alcance y le contacte con prontitud.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Arq. / Ing. / Lic. Nombre"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Teléfono Móvil *</label>
                    <input
                      type="tel"
                      required
                      placeholder="55 0000 0000"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      value={form.correo}
                      onChange={(e) => setForm({ ...form, correo: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Tipología de Interés</label>
                    <select
                      value={form.asunto}
                      onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    >
                      <option value="Nuevo Proyecto Residencial">Proyecto Residencial</option>
                      <option value="Construcción Comercial / Oficinas">Edificación Comercial / Corporativa</option>
                      <option value="Remodelación Mayor">Intervención & Restauración</option>
                      <option value="Servicios de D.R.O. y Cálculo">Cálculo Estructural & D.R.O.</option>
                      <option value="Duda sobre Portal de Clientes">Portal de Clientes & Seguimiento</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Memoria Descriptiva / Datos del Predio</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detalles sobre ubicación, superficie estimada, topografía o aspiraciones proyectuales..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-stone-300 p-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  id="contacto-submit-btn"
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 hover:bg-[#B59353] text-white uppercase tracking-wider font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#B59353] group-hover:text-white" />
                  <span>Transmitir Consulta a Dirección Técnica</span>
                </button>

                <p className="text-[11px] text-stone-500 text-center leading-relaxed font-sans pt-1">
                  Al enviar su información, acepta nuestro{' '}
                  <button
                    type="button"
                    onClick={onOpenAvisoPrivacidad}
                    className="text-[#B59353] hover:text-[#9E7C3E] underline font-medium cursor-pointer"
                  >
                    Aviso de Privacidad
                  </button>
                  . Sus datos e ideas proyectuales se resguardan bajo confidencialidad profesional.
                </p>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="w-14 h-14 border border-stone-300 bg-stone-50 text-[#B59353] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif-arch text-stone-900 mb-2">
                  Mensaje Transmitido con Éxito
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed font-sans">
                  Apreciable <strong>{form.nombre}</strong>: Su solicitud ha sido asignada a la Dirección de Proyectos. Un socio del despacho establecerá contacto para concertar una sesión técnica.
                </p>
                <button
                  onClick={() => {
                    setEnviado(false);
                    setForm({
                      nombre: '',
                      telefono: '',
                      correo: '',
                      asunto: 'Nuevo Proyecto Residencial',
                      mensaje: ''
                    });
                  }}
                  className="px-6 py-2.5 border border-stone-900 bg-stone-900 hover:bg-[#B59353] hover:border-[#B59353] text-white text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Registrar otra consulta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
