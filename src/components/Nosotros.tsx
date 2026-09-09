import React from 'react';
import { 
  CheckCircle2, 
  Star,
  Quote
} from 'lucide-react';

export const Nosotros: React.FC = () => {
  const testimonios = [
    {
      nombre: 'Lic. Rodrigo & Claudia Montes',
      obra: 'Villa Mayakoba, Playa del Carmen (620 m²)',
      texto: 'Lo que más valoramos fue la transparencia con el portal de seguimiento de obra. Poder ver las fotos fechadas cada semana, el avance frente a los retos del clima tropical y saber que el costo no subió ni un solo peso respecto al contrato nos dio una tranquilidad absoluta.',
      rating: 5
    },
    {
      nombre: 'Ing. Alejandro Baillères',
      obra: 'Boutique Hotel & Residencias Aldea Zama, Tulum (2,850 m²)',
      texto: 'Grupo Cenzontle demostró un rigor técnico excepcional. La coordinación bioclimática, el dominio de materiales locales como el chukum y la piedra maya, y la dirección de obra permitieron entregar el complejo 1 mes antes de la temporada alta.',
      rating: 5
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-[#FAF9F5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium">
              Manifiesto & Dirección
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-arch text-stone-900 leading-[1.15] tracking-tight">
              Construimos con la convicción de que la materia y la luz articulan la experiencia humana.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Fundado en 2009, <strong>Grupo Cenzontle</strong> opera como una práctica simbiótica entre despacho proyectual y constructora de alta precisión. Reúne directores de obra, estructuristas y artesanos de la piedra y madera bajo una sola dirección estética y técnica.
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Eliminamos la incertidumbre habitual de la edificación: operamos con <strong>presupuestos contractuales fijos</strong>, cronogramas certificados y un portal digital de supervisión continua para que nuestros clientes vivan el proceso constructivo con absoluta serenidad.
            </p>

            {/* Credential Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              {[
                'Registro Oficial de D.R.O. y Corresponsables en Seguridad Estructural',
                'Coordinación de Ingenierías en Modelado BIM 4D',
                'Colegio de Arquitectos & Cámara de la Industria de la Construcción',
                'Póliza de Responsabilidad Civil & Garantía Decenal de Estructura'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#B59353] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-stone-200 bg-white p-3 shadow-sm">
              <div className="overflow-hidden aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
                  alt="Taller de Arquitectura"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="pt-20 border-t border-stone-200">
          <div className="max-w-2xl mb-12">
            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-1">
              Testimonios de Propietarios
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-arch text-stone-900">
              La Certeza de Haber Construido con Rigor
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
              La tranquilidad de nuestros comitentes y la integridad formal de las obras entregadas son nuestro principal aval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonios.map((t, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#B59353]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <Quote className="w-7 h-7 text-stone-300 mb-3" />

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-arch italic mb-8">
                    "{t.texto}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 font-sans">
                  <div className="text-xs font-semibold text-stone-900 tracking-wide">{t.nombre}</div>
                  <div className="text-[11px] text-[#B59353]">{t.obra}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
