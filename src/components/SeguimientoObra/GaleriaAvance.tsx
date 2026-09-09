import React, { useState } from 'react';
import { 
  Camera, 
  Calendar, 
  Video, 
  Eye, 
  Download, 
  X, 
  User, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Plus,
  UploadCloud,
  Check
} from 'lucide-react';
import { FotoAvance } from '../../types';

interface GaleriaAvanceProps {
  fotos: FotoAvance[];
  onAgregarFoto?: (nueva: FotoAvance) => void;
}

export const GaleriaAvance: React.FC<GaleriaAvanceProps> = ({ fotos, onAgregarFoto }) => {
  const [semanaSeleccionada, setSemanaSeleccionada] = useState<string>('todas');
  const [zonaSeleccionada, setZonaSeleccionada] = useState<string>('todas');
  const [modalFoto, setModalFoto] = useState<FotoAvance | null>(null);
  const [mostrarModalSubida, setMostrarModalSubida] = useState(false);

  // Formulario de nueva foto
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevaZona, setNuevaZona] = useState<FotoAvance['zona']>('Interiores');
  const [nuevaUrl, setNuevaUrl] = useState('');
  const [subidoExito, setSubidoExito] = useState(false);

  // Manejar selección de archivo local (drag and drop o click)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitSubida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    const nuevaFoto: FotoAvance = {
      id: `foto-${Date.now()}`,
      url: nuevaUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion || 'Registro fotográfico ingresado desde campo por supervisión de obra.',
      fecha: 'Hoy',
      semana: 'Semana Actual',
      zona: nuevaZona,
      subidoPor: 'Arq. Residente en Sitio'
    };

    if (onAgregarFoto) {
      onAgregarFoto(nuevaFoto);
    }
    setSubidoExito(true);
    setTimeout(() => {
      setSubidoExito(false);
      setMostrarModalSubida(false);
      setNuevoTitulo('');
      setNuevaDescripcion('');
      setNuevaUrl('');
    }, 1200);
  };

  // Get distinct weeks
  const semanas = ['todas', ...Array.from(new Set(fotos.map(f => f.semana)))];
  const zonas = ['todas', 'Fachada', 'Estructura', 'Interiores', 'Instalaciones', 'Azotea'];

  const fotosFiltradas = fotos.filter((f) => {
    if (semanaSeleccionada !== 'todas' && f.semana !== semanaSeleccionada) return false;
    if (zonaSeleccionada !== 'todas' && f.zona !== zonaSeleccionada) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-8 border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-1">
              Archivo Técnico Visual
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-arch text-stone-900 flex items-center gap-3">
              <Camera className="w-6 h-6 text-[#B59353]" />
              <span>Registro Fotográfico & Video de Obra</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
              Evidencia técnica organizada cronológicamente por fecha, semana y zona constructiva.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMostrarModalSubida(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#B59353] hover:bg-[#a18143] text-white text-xs uppercase tracking-wider font-medium shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Subir Foto / Avance</span>
            </button>
            <span className="text-xs text-stone-500 border border-stone-200 bg-stone-50 px-3 py-2 font-sans font-medium">
              Archivo: <strong className="text-stone-900 font-semibold">{fotos.length}</strong>
            </span>
          </div>
        </div>

        {/* Filters: Semanas y Zonas */}
        <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
          {/* Semanas Filter */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium uppercase tracking-widest text-[10px] mr-1">
              Cronología:
            </span>
            {semanas.map((sem) => (
              <button
                key={sem}
                onClick={() => setSemanaSeleccionada(sem)}
                className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-all border ${
                  semanaSeleccionada === sem
                    ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {sem === 'todas' ? 'Todas las Semanas' : sem}
              </button>
            ))}
          </div>

          {/* Zonas Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-stone-400 font-medium uppercase tracking-widest text-[10px] mr-1">
              Zona de Trabajo:
            </span>
            {zonas.map((z) => (
              <button
                key={z}
                onClick={() => setZonaSeleccionada(z)}
                className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors border ${
                  zonaSeleccionada === z
                    ? 'bg-[#B59353] text-white border-[#B59353] font-semibold'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {z === 'todas' ? 'Todas' : z}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Photos / Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fotosFiltradas.map((item) => (
          <div
            key={item.id}
            onClick={() => setModalFoto(item)}
            className="group bg-white border border-stone-200 hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
              <img
                src={item.url}
                alt={item.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.98] contrast-[1.02]"
              />

              {/* Date & Week Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2 py-0.5 bg-stone-900/80 backdrop-blur-md text-white font-mono text-[10px] tracking-wider">
                  {item.semana}
                </span>
                <span className="px-2 py-0.5 bg-[#B59353] text-white text-[10px] uppercase tracking-wider font-medium">
                  {item.zona}
                </span>
              </div>

              {/* Video Badge */}
              {item.esVideo && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-stone-900/90 text-white text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border border-stone-700">
                  <Video className="w-3 h-3 text-[#B59353]" />
                  <span>Dron {item.videoDuration}</span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 border border-white/60 bg-stone-950/70 text-white flex items-center justify-center backdrop-blur-xs">
                  {item.esVideo ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Maximize2 className="w-4 h-4" />}
                </div>
              </div>
            </div>

            {/* Photo Details */}
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1.5 font-sans">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.fecha}</span>
              </div>

              <h3 className="text-base font-serif-arch text-stone-900 group-hover:text-[#B59353] transition-colors line-clamp-1">
                {item.titulo}
              </h3>

              <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed font-sans">
                {item.descripcion}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-sans">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-stone-400" />
                  {item.subidoPor}
                </span>
                <span className="text-stone-700 group-hover:text-[#B59353] uppercase tracking-wider text-[10px] font-medium transition-colors">
                  Ver registro
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {modalFoto && (
        <div
          id="modal-galeria-overlay"
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalFoto(null)}
        >
          <div
            id="modal-galeria-container"
            className="bg-[#18181B] border border-stone-800 max-w-4xl w-full overflow-hidden shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalFoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 bg-black flex items-center justify-center">
              <img
                src={modalFoto.url}
                alt={modalFoto.titulo}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-full object-contain"
              />
              {modalFoto.esVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-16 h-16 border border-[#B59353] bg-stone-900/80 text-[#B59353] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-stone-900 border-t border-stone-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-stone-800 text-[#B59353] text-[10px] font-mono tracking-wider border border-stone-700">
                    {modalFoto.semana}
                  </span>
                  <span className="px-2.5 py-0.5 bg-stone-800 text-stone-300 text-[10px] uppercase tracking-wider">
                    Zona: {modalFoto.zona}
                  </span>
                </div>
                <div className="text-xs text-stone-400 flex items-center gap-1 font-sans">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{modalFoto.fecha}</span>
                </div>
              </div>

              <h3 className="text-xl font-serif-arch text-stone-100 mb-2">
                {modalFoto.titulo}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {modalFoto.descripcion}
              </p>

              <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-sans">
                <span>Registrado por: <strong className="text-stone-200">{modalFoto.subidoPor}</strong></span>
                <a
                  href={modalFoto.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#B59353] hover:text-[#d4af65] uppercase tracking-wider text-[11px] font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar original HD</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Dialog para Subir Nueva Foto desde Campo */}
      {mostrarModalSubida && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setMostrarModalSubida(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[10px] uppercase tracking-widest text-[#B59353] font-medium mb-1">
              Supervisión de Obra
            </div>
            <h3 className="text-xl font-serif-arch text-stone-900 mb-2">
              Ingresar Registro Fotográfico
            </h3>
            <p className="text-xs text-stone-500 font-sans mb-6">
              El personal técnico en campo (residente, estructurista o DRO) puede documentar el avance constructivo al instante.
            </p>

            {subidoExito ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-center py-10">
                <Check className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-emerald-900">¡Fotografía Registrada con Éxito!</div>
                <div className="text-xs text-emerald-700 mt-1">El expediente de obra ha sido actualizado.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmitSubida} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1">
                    Título o Tarea de Obra *
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                    placeholder="Ej. Colado de losa Nivel 2 o Encofrado de columnas"
                    className="w-full px-3 py-2 border border-stone-300 text-stone-900 text-sm focus:border-[#B59353] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1">
                      Zona del Proyecto
                    </label>
                    <select
                      value={nuevaZona}
                      onChange={(e) => setNuevaZona(e.target.value as FotoAvance['zona'])}
                      className="w-full px-3 py-2 border border-stone-300 text-stone-900 text-xs focus:border-[#B59353] focus:outline-none bg-white"
                    >
                      <option value="Estructura">Estructura</option>
                      <option value="Fachada">Fachada</option>
                      <option value="Interiores">Interiores</option>
                      <option value="Instalaciones">Instalaciones</option>
                      <option value="Azotea">Azotea</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1">
                      Fecha de Captura
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Fecha de hoy (Automática)"
                      className="w-full px-3 py-2 border border-stone-200 bg-stone-50 text-stone-500 text-xs cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1">
                    Subir Imagen (Cámara / Galería)
                  </label>
                  <label className="border-2 border-dashed border-stone-300 hover:border-[#B59353] p-4 flex flex-col items-center justify-center cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                    {nuevaUrl ? (
                      <div className="w-full text-center">
                        <img 
                          src={nuevaUrl} 
                          alt="Vista previa" 
                          className="max-h-32 mx-auto object-cover border border-stone-200 mb-2" 
                        />
                        <span className="text-[11px] text-emerald-700 font-medium">✓ Imagen cargada. Clic para cambiar.</span>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <UploadCloud className="w-7 h-7 text-stone-400 mx-auto mb-1.5" />
                        <span className="text-xs text-stone-700 font-medium block">
                          Seleccionar o arrastrar fotografía
                        </span>
                        <span className="text-[10px] text-stone-400 block mt-0.5">
                          JPG, PNG, WebP de inspección en campo
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-medium mb-1">
                    Notas y Observaciones Técnicas
                  </label>
                  <textarea
                    rows={2}
                    value={nuevaDescripcion}
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                    placeholder="Detalles sobre avance, pruebas de revenimiento o personal asignado..."
                    className="w-full px-3 py-2 border border-stone-300 text-stone-900 text-xs focus:border-[#B59353] focus:outline-none font-sans"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setMostrarModalSubida(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B59353] hover:bg-[#a18143] text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-colors"
                  >
                    Guardar en Expediente
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
