export type ProjectCategory = 'todos' | 'residencial' | 'comercial' | 'departamentos' | 'remodelacion';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residencial' | 'comercial' | 'departamentos' | 'remodelacion';
  categoryLabel: string;
  location: string;
  area: number; // m²
  year: number;
  status: 'Completado' | 'En Construcción';
  description: string;
  imageUrl: string;
  gallery: string[];
  architect: string;
  durationMonths: number;
  highlight: string;
}

export type TipoProyectoCotizador = 
  | 'residencial_unifamiliar'
  | 'residencial_lujo'
  | 'comercial_oficinas'
  | 'remodelacion_integral'
  | 'nave_industrial';

export type NivelAcabados = 'economico' | 'estandar' | 'premium' | 'lujo';

export type TopografiaTerreno = 'plano' | 'desnivel_leve' | 'desnivel_pronunciado';

export interface CotizadorConfig {
  tipoProyecto: TipoProyectoCotizador;
  metrosCuadrados: number;
  niveles: number;
  acabados: NivelAcabados;
  topografia: TopografiaTerreno;
  serviciosAdicionales: {
    proyectoEjecutivo3D: boolean;
    tramitesPermisos: boolean;
    calculoEstructuralDRO: boolean;
    supervisionObra: boolean;
    llaveEnMano: boolean;
  };
}

export interface CotizacionResultado {
  costoMinimo: number;
  costoMaximo: number;
  costoPromedioM2: number;
  tiempoEstimadoMeses: number;
  desglose: {
    cimentacionEstructura: number;
    albanileriaMuros: number;
    instalaciones: number;
    acabadosCarpinteria: number;
    gestionSupervision: number;
  };
}

export interface ObraCliente {
  id: string;
  codigoContrato: string;
  nombreProyecto: string;
  cliente: string;
  ubicacion: string;
  superficieM2: number;
  tipo: string;
  arquitectoResidente: string;
  directorDRO: string;
  fechaInicio: string;
  fechaEntregaEstimada: string;
  fechaEntregaAjustada?: string;
  avancePorcentaje: number;
  estatusGeneral: 'En tiempo' | 'Atraso leve' | 'Adelantada' | 'En revisión';
  diasTranscurridos: number;
  diasTotales: number;
  presupuestoTotal: number;
  presupuestoEjercido: number;
  proximoHito: {
    titulo: string;
    fecha: string;
    diasRestantes: number;
  };
  trabajadoresEnSitio: number;
}

export interface EtapaObra {
  id: string;
  numero: number;
  nombre: string;
  descripcion: string;
  porcentaje: number;
  estado: 'completada' | 'en_proceso' | 'pendiente';
  fechaInicioEstimada: string;
  fechaFinEstimada: string;
  fechaInicioReal: string;
  fechaFinReal?: string;
  diasDesviacion: number; // positivo = retraso, negativo = adelanto, 0 = a tiempo
  motivoDesviacion?: string;
  responsable: string;
  subetapas: {
    nombre: string;
    completada: boolean;
  }[];
}

export interface NotificacionAlerta {
  id: string;
  tipo: 'fecha_cambio' | 'hito' | 'clima' | 'material' | 'aprobacion';
  titulo: string;
  mensaje: string;
  fecha: string;
  hora: string;
  leida: boolean;
  impactoDias?: number;
  severidad: 'informativa' | 'moderada' | 'critica';
  etapaRelacionada?: string;
}

export interface FotoAvance {
  id: string;
  url: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  semana: string;
  zona: 'Fachada' | 'Estructura' | 'Interiores' | 'Instalaciones' | 'Azotea';
  subidoPor: string;
  esVideo?: boolean;
  videoDuration?: string;
}

export interface EntradaBitacora {
  id: string;
  folio: string;
  fecha: string;
  hora: string;
  autorNombre: string;
  autorRol: string;
  autorAvatar: string;
  categoria: 'Control de Calidad' | 'Seguridad Estructural' | 'Condiciones Climáticas' | 'Modificación Autorizada' | 'Recepción Material';
  titulo: string;
  observaciones: string;
  fotos?: string[];
  estatus: 'Aprobado' | 'Resuelto' | 'En Seguimiento';
  respuestas?: {
    autor: string;
    rol: string;
    mensaje: string;
    fecha: string;
  }[];
}
