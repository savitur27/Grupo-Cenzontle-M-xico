import React, { useState } from 'react';
import { 
  FileText, 
  UserCheck, 
  Clock, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Paperclip, 
  Filter,
  Plus
} from 'lucide-react';
import { EntradaBitacora } from '../../types';

interface BitacoraObraProps {
  entradas: EntradaBitacora[];
  onAgregarEntrada: (nueva: EntradaBitacora) => void;
}

export const BitacoraObra: React.FC<BitacoraObraProps> = ({ 
  entradas, 
  onAgregarEntrada 
}) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState<EntradaBitacora['categoria']>('Control de Calidad');
  const [nuevasObservaciones, setNuevasObservaciones] = useState('');

  const categorias = [
    'todas',
    'Control de Calidad',
    'Seguridad Estructural',
    'Condiciones Climáticas',
    'Modificación Autorizada',
    'Recepción Material'
  ];

  const entradasFiltradas = entradas.filter((e) => {
    if (filtroCategoria === 'todas') return true;
    return e.categoria === filtroCategoria;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim() || !nuevasObservaciones.trim()) return;

    const nueva: EntradaBitacora = {
      id: `bit-${Date.now()}`,
      folio: `BIT-2024-${Math.floor(105 + Math.random() * 50)}`,
      fecha: 'Hoy, ' + new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }),
      hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) + ' hrs',
      autorNombre: 'Propietario / Cliente (Tú)',
      autorRol: 'Cliente Autorizado',
      autorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      categoria: nuevaCategoria,
      titulo: nuevoTitulo,
      observaciones: nuevasObservaciones,
      estatus: 'En Seguimiento'
    };

    onAgregarEntrada(nueva);
    setNuevoTitulo('');
    setNuevasObservaciones('');
    setMostrarFormulario(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-8 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-1">
              Registro Técnico Legal
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-arch text-stone-900 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#B59353]" />
              <span>Bitácora Oficial de Obra</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
              Asientos cronológicos de acuerdos, peritajes técnicos, controles de calidad y minutas avaladas por el D.R.O.
            </p>
          </div>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-stone-900 bg-stone-900 hover:bg-[#B59353] hover:border-[#B59353] text-white text-xs uppercase tracking-wider font-medium transition-colors"
          >
            <Plus className="w-4 h-4 text-[#B59353] group-hover:text-white" />
            <span>{mostrarFormulario ? 'Cerrar Formulario' : 'Nueva Entrada / Consulta'}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-400 font-medium uppercase tracking-widest text-[10px] mr-1">
            Categoría:
          </span>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat)}
              className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors border ${
                filtroCategoria === cat
                  ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat === 'todas' ? 'Todas las Categorías' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Form to submit client question or observation */}
      {mostrarFormulario && (
        <form 
          onSubmit={handleSubmit}
          className="bg-white border border-stone-300 p-6 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-serif-arch text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#B59353]" />
              <span>Registrar Nota u Observación en Bitácora</span>
            </h3>
            <span className="text-[11px] text-stone-500 uppercase tracking-wider">Notificación directa a Residencia Técnica</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Título de la anotación *</label>
              <input
                type="text"
                required
                placeholder="Ej. Aprobación de muestra de travertino para estancia..."
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-stone-300 px-3.5 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Categoría</label>
              <select
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value as any)}
                className="w-full bg-[#FAF9F5] border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
              >
                <option value="Control de Calidad">Control de Calidad</option>
                <option value="Modificación Autorizada">Modificación Autorizada</option>
                <option value="Seguridad Estructural">Seguridad Estructural</option>
                <option value="Condiciones Climáticas">Condiciones Climáticas</option>
                <option value="Recepción Material">Recepción Material</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-stone-700 mb-1">Detalle técnico o consulta *</label>
            <textarea
              rows={3}
              required
              placeholder="Describa puntualmente las especificaciones, requerimientos o comentarios..."
              value={nuevasObservaciones}
              onChange={(e) => setNuevasObservaciones(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-stone-300 p-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setMostrarFormulario(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-500 hover:text-stone-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 hover:bg-[#B59353] text-white text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Asentar en Bitácora</span>
            </button>
          </div>
        </form>
      )}

      {/* Logbook Entries */}
      <div className="space-y-4">
        {entradasFiltradas.map((entrada) => {
          return (
            <div
              key={entrada.id}
              className="bg-white p-6 sm:p-7 border border-stone-200 hover:border-stone-300 transition-colors"
            >
              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <img
                    src={entrada.autorAvatar}
                    alt={entrada.autorNombre}
                    className="w-9 h-9 object-cover border border-stone-300"
                  />
                  <div>
                    <div className="text-sm font-serif-arch text-stone-900">
                      {entrada.autorNombre}
                    </div>
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider font-sans">
                      {entrada.autorRol}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 border border-stone-200">
                    {entrada.folio}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 border border-stone-200 bg-[#FAF9F5] text-stone-800">
                    {entrada.categoria}
                  </span>
                </div>
              </div>

              {/* Title & Observations */}
              <h3 className="text-lg font-serif-arch text-stone-900 mb-2">
                {entrada.titulo}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#FAF9F5] p-4 border border-stone-200/80 font-sans">
                {entrada.observaciones}
              </p>

              {/* Responses Thread */}
              {entrada.respuestas && entrada.respuestas.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-[#B59353] space-y-2">
                  {entrada.respuestas.map((resp, i) => (
                    <div key={i} className="text-xs bg-stone-50 p-3 border border-stone-200/80 font-sans">
                      <div className="flex items-center justify-between text-stone-800 font-medium mb-1">
                        <span>{resp.autor} ({resp.rol})</span>
                        <span className="text-[10px] text-stone-400">{resp.fecha}</span>
                      </div>
                      <p className="text-stone-600">{resp.mensaje}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom line: Date & Status */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{entrada.fecha} • {entrada.hora}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 text-stone-700 uppercase tracking-wider text-[11px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B59353]" />
                  <span>{entrada.estatus}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
