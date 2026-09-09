import { 
  ProjectItem, 
  ObraCliente, 
  EtapaObra, 
  NotificacionAlerta, 
  FotoAvance, 
  EntradaBitacora 
} from '../types';

export const PROYECTOS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Villa Ka’an Mayakoba',
    category: 'residencial',
    categoryLabel: 'Residencia de Lujo',
    location: 'Mayakoba, Playa del Carmen',
    area: 620,
    year: 2024,
    status: 'Completado',
    description: 'Composición monolítica integrada a los canales y manglares de Mayakoba. Acabados artesanales en pasta de chukum, muros de piedra caliza extraída in-situ, viguería en madera de zapote y amplios voladizos para sombra profunda y ventilación cruzada natural.',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
    ],
    architect: 'Taller Grupo Cenzontle + Arq. Mateo Villarreal',
    durationMonths: 14,
    highlight: 'Distinción Arquitectura Bioclimática del Caribe Mexicano'
  },
  {
    id: 'proj-2',
    title: 'Pabellón & Spa Holístico Tulum',
    category: 'comercial',
    categoryLabel: 'Hospitalidad & Bienestar',
    location: 'Zona Costera, Tulum',
    area: 2850,
    year: 2024,
    status: 'Completado',
    description: 'Conjunto ecoturístico y spa sensorial concebido bajo criterios de preservación del dosel de la selva. Estructuras palafíticas elevadas sobre pilotes para salvaguardar el manto freático, captación pluvial integral y celosías de madera de tzalam certificada.',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85'
    ],
    architect: 'Dirección Técnica Grupo Cenzontle',
    durationMonths: 18,
    highlight: 'Certificación Sustentable & Cero Impacto Hídrico'
  },
  {
    id: 'proj-3',
    title: 'Villa Arrecife Puerto Aventuras',
    category: 'residencial',
    categoryLabel: 'Residencia Frente a Marina',
    location: 'Puerto Aventuras, Riviera Maya',
    area: 690,
    year: 2025,
    status: 'En Construcción',
    description: 'Implantación náutica con muelle privado y especificación antihuracán Categoría 5. Cancelería termoacústica con cristal laminado de seguridad, alberca volada de borde infinito sobre canal y envolvente en concreto hidrófugo con agregados de cantera local.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
    ],
    architect: 'Arq. Carlos Mendoza & Grupo Cenzontle',
    durationMonths: 16,
    highlight: 'Fase de envolvente antihuracán y acabados en chukum'
  },
  {
    id: 'proj-4',
    title: 'Residencial Selva Zama 18',
    category: 'departamentos',
    categoryLabel: 'Vivienda Colectiva & Eco-Lofts',
    location: 'Aldea Zamá, Tulum',
    area: 2400,
    year: 2023,
    status: 'Completado',
    description: 'Desarrollo boutique de 12 residencias inmersas en la selva media. Diseño bioclimático con orientación pasiva frente a los vientos alisios del Caribe, albercas privadas en soláriums, pérgolas de bajareque y 60% de superficie vegetal endémica conservada.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85'
    ],
    architect: 'Grupo Cenzontle + Taller Regional Maya',
    durationMonths: 20,
    highlight: 'Premio Arquitectura Tropical y Hábitat Costero'
  },
  {
    id: 'proj-5',
    title: 'Pabellón Gastronómico & Terraza Mamitas',
    category: 'comercial',
    categoryLabel: 'Hospitalidad & Club de Playa',
    location: 'Playa Mamitas, Playa del Carmen',
    area: 460,
    year: 2024,
    status: 'Completado',
    description: 'Pabellón abierto frente al mar estructurado en viguería de madera laminada tratada contra la salinidad y vientos marinos. Pisos continuos de mármol macedonia al ácido, cocinas de alta exigencia y techumbre textil microperforada de alta reflectancia solar.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85'
    ],
    architect: 'Arq. Sofía Valenzuela & Grupo Cenzontle',
    durationMonths: 9,
    highlight: 'Premio al Mejor Diseño de Espacio Gastronómico Costero'
  },
  {
    id: 'proj-6',
    title: 'Intervención & Galería Calle 38',
    category: 'remodelacion',
    categoryLabel: 'Intervención & Remodelación',
    location: 'Calle 38 Norte, Playa del Carmen',
    area: 380,
    year: 2024,
    status: 'Completado',
    description: 'Reconversión contemporánea de una casona tradicional caribeña en galería de arte y restaurante jardín. Restauración de muros de mampostería regional, integración de patios con pozas de agua y ventanales corredizos de piso a techo que diluyen los límites interiores.',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85'
    ],
    architect: 'Arq. Elena Garza & Grupo Cenzontle',
    durationMonths: 10,
    highlight: 'Premio de Regeneración Urbana y Conservación Vegetal'
  }
];

export const OBRA_ACTIVA_EJEMPLO: ObraCliente = {
  id: 'obra-042',
  codigoContrato: 'OB-2024-SOL-042',
  nombreProyecto: 'Villa Bahía Soliman',
  cliente: 'Familia Sandoval Herrera',
  ubicacion: 'Lote 14, Fraccionamiento Bahía Soliman, Tulum - Riviera Maya',
  superficieM2: 520,
  tipo: 'Residencial Costera Premium (3 Niveles con Solárium)',
  arquitectoResidente: 'Arq. Carlos Mendoza R.',
  directorDRO: 'Ing. Fernando Beltrán (Céd. D.R.O. Q.Roo / Mun. Tulum #1842)',
  fechaInicio: '15 de Mayo de 2024',
  fechaEntregaEstimada: '28 de Febrero de 2025',
  fechaEntregaAjustada: '04 de Marzo de 2025',
  avancePorcentaje: 74,
  estatusGeneral: 'En tiempo',
  diasTranscurridos: 168,
  diasTotales: 235,
  presupuestoTotal: 9850000,
  presupuestoEjercido: 7289000,
  proximoHito: {
    titulo: 'Instalación de ventanería hermética y plafones de madera',
    fecha: '18 de Octubre, 2024',
    diasRestantes: 4
  },
  trabajadoresEnSitio: 19
};

export const ETAPAS_OBRA_DATA: EtapaObra[] = [
  {
    id: 'etapa-1',
    numero: 1,
    nombre: 'Trámites, Licencias & Preliminares',
    descripcion: 'Mecánica de suelos, levantamiento topográfico, licencia de construcción municipal, despalme y trazo de ejes.',
    porcentaje: 100,
    estado: 'completada',
    fechaInicioEstimada: '15 May 2024',
    fechaFinEstimada: '05 Jun 2024',
    fechaInicioReal: '15 May 2024',
    fechaFinReal: '02 Jun 2024',
    diasDesviacion: -3, // Adelanto de 3 días
    motivoDesviacion: 'Agilidad en la expedición de licencias en ventanilla única municipal.',
    responsable: 'Gestoría & DRO Ing. Beltrán',
    subetapas: [
      { nombre: 'Mecánica de suelos y peritaje', completada: true },
      { nombre: 'Licencia de construcción municipal aprobada', completada: true },
      { nombre: 'Despalme, limpieza y nivelación del predio', completada: true },
      { nombre: 'Trazo perimetral y colocación de tapiales', completada: true }
    ]
  },
  {
    id: 'etapa-2',
    numero: 2,
    nombre: 'Cimentación & Aislamiento Hidrófugo',
    descripcion: 'Excavación en estrato calizo kárstico, zapatas de concreto f’c=300 kg/cm² hidrófugo, losa de cimentación e impermeabilización contra salinidad y nivel freático.',
    porcentaje: 100,
    estado: 'completada',
    fechaInicioEstimada: '06 Jun 2024',
    fechaFinEstimada: '15 Jul 2024',
    fechaInicioReal: '03 Jun 2024',
    fechaFinReal: '17 Jul 2024',
    diasDesviacion: 2, // Atraso de 2 días
    motivoDesviacion: 'Hallazgo de manto rocoso calizo de alta dureza que requirió maquinaria hidráulica de precisión.',
    responsable: 'Residente Arq. Mendoza',
    subetapas: [
      { nombre: 'Excavación a cielo abierto con retroexcavadora', completada: true },
      { nombre: 'Armado de acero y colado de zapatas f’c=250', completada: true },
      { nombre: 'Muros de contención perimetrales impermeabilizados', completada: true },
      { nombre: 'Relleno compactado por capas y pruebas de laboratorio', completada: true }
    ]
  },
  {
    id: 'etapa-3',
    numero: 3,
    nombre: 'Estructura, Columnas & Losas',
    descripcion: 'Columnas de concreto armado, trabes principales, losas aligeradas con vigueta y bovedilla, y cubos de escaleras.',
    porcentaje: 100,
    estado: 'completada',
    fechaInicioEstimada: '18 Jul 2024',
    fechaFinEstimada: '05 Sep 2024',
    fechaInicioReal: '18 Jul 2024',
    fechaFinReal: '06 Sep 2024',
    diasDesviacion: 1,
    motivoDesviacion: 'Lluvia intensa en el colado de la losa del segundo nivel.',
    responsable: 'Supervisor Estructural Arq. Garza',
    subetapas: [
      { nombre: 'Estructura de Planta Baja y losa entrepiso 1', completada: true },
      { nombre: 'Columnas y trabes de Planta Alta', completada: true },
      { nombre: 'Losa de azotea con pendientes pluviales', completada: true },
      { nombre: 'Descimbrado y pruebas de resistencia a la compresión', completada: true }
    ]
  },
  {
    id: 'etapa-4',
    numero: 4,
    nombre: 'Instalaciones Hidrosanitarias, Eléctricas & Gas',
    descripcion: 'Canalizaciones eléctricas, tubería hidráulica termofusionada PPR, drenaje sanitario con trampa de grasas y ductos de A/C.',
    porcentaje: 92,
    estado: 'en_proceso',
    fechaInicioEstimada: '08 Sep 2024',
    fechaFinEstimada: '15 Oct 2024',
    fechaInicioReal: '07 Sep 2024',
    fechaFinReal: '16 Oct 2024 (Proy.)',
    diasDesviacion: 1,
    motivoDesviacion: 'Ajuste en salidas de domótica solicitado por el propietario.',
    responsable: 'Ing. de Instalaciones R. Saldaña',
    subetapas: [
      { nombre: 'Tendido de redes hidráulicas y pruebas de presión', completada: true },
      { nombre: 'Cableado eléctrico y centros de carga bifásicos', completada: true },
      { nombre: 'Ductería para aire acondicionado y audio distribuido', completada: true },
      { nombre: 'Interconexión de cisterna de 12,000 L y bombas hidroneumáticas', completada: false }
    ]
  },
  {
    id: 'etapa-5',
    numero: 5,
    nombre: 'Acabados, Chukum, Piedra Maya & Cancelería Antihuracán',
    descripcion: 'Muros interiores en chukum bruñido a mano, colocación de pisos de mármol macedonia y cantera maya, cancelería antihuracán con doble acristalamiento templado laminado.',
    porcentaje: 48,
    estado: 'en_proceso',
    fechaInicioEstimada: '16 Oct 2024',
    fechaFinEstimada: '15 Ene 2025',
    fechaInicioReal: '14 Oct 2024',
    fechaFinReal: '18 Ene 2025 (Proy.)',
    diasDesviacion: 3,
    motivoDesviacion: 'Tiempo de importación y templado de la cancelería antihuracán certificada contra vientos de 250 km/h.',
    responsable: 'Arq. Residente Mendoza',
    subetapas: [
      { nombre: 'Aplicación de pasta tradicional de chukum en muros interiores', completada: true },
      { nombre: 'Colocación de pisos de mármol macedonia y piedra maya', completada: true },
      { nombre: 'Instalación de ventanería antihuracán serie europea', completada: false },
      { nombre: 'Revestimiento de alberca y espejos de agua en chukum', completada: false }
    ]
  },
  {
    id: 'etapa-6',
    numero: 6,
    nombre: 'Carpintería en Tzalam & Zapote, Equipamiento & Entrega',
    descripcion: 'Cocina integral con isla en cuarcita, clósets en madera maciza tropical de tzalam tratada contra humedad, muebles de baño, luminarias cálidas y paisajismo caribeño.',
    porcentaje: 0,
    estado: 'pendiente',
    fechaInicioEstimada: '16 Ene 2025',
    fechaFinEstimada: '28 Feb 2025',
    fechaInicioReal: 'Pendiente',
    diasDesviacion: 0,
    responsable: 'Director de Obra & Interiorismo',
    subetapas: [
      { nombre: 'Instalación de carpinterías en tzalam curado contra termita y salitre', completada: false },
      { nombre: 'Montaje de cocina integral con isla de cuarcita y herrajes inoxidables 316', completada: false },
      { nombre: 'Pruebas generales de sistemas de presurización y domótica', completada: false },
      { nombre: 'Jardinería con especies nativas de la selva maya y entrega final', completada: false }
    ]
  }
];

export const NOTIFICACIONES_DATA: NotificacionAlerta[] = [
  {
    id: 'notif-1',
    tipo: 'fecha_cambio',
    titulo: 'Alerta de Ajuste de Fecha: Cancelería Antihuracán',
    mensaje: 'La llegada del segundo embarque de cancelería antihuracán certificada se reprogramó del 14 al 17 de Octubre por maniobras logísticas de puerto. No afecta la ruta crítica general.',
    fecha: 'Hoy',
    hora: '09:45 AM',
    leida: false,
    impactoDias: 3,
    severidad: 'moderada',
    etapaRelacionada: 'Etapa 5: Acabados'
  },
  {
    id: 'notif-2',
    tipo: 'hito',
    titulo: 'Hito Completado: Pruebas Hidráulicas al 100%',
    mensaje: 'Se realizaron con éxito las pruebas hidrostáticas a 80 PSI en toda la red hidráulica durante 72 horas continuas con CERO caídas de presión.',
    fecha: 'Ayer',
    hora: '17:20 PM',
    leida: false,
    severidad: 'informativa',
    etapaRelacionada: 'Etapa 4: Instalaciones'
  },
  {
    id: 'notif-3',
    tipo: 'aprobacion',
    titulo: 'Confirmación de Muestra: Tono de Chukum en Alberca',
    mensaje: 'El cliente autorizó la muestra de chukum con resina vegetal natural en tono arena suave para la alberca y terraza exterior.',
    fecha: '10 Octubre',
    hora: '11:15 AM',
    leida: true,
    severidad: 'informativa',
    etapaRelacionada: 'Etapa 5: Acabados'
  },
  {
    id: 'notif-4',
    tipo: 'clima',
    titulo: 'Protocolo Hidrometeorológico Activado',
    mensaje: 'Pronóstico de chubascos tropicales en la costa de Riviera Maya. Se instalaron lonas protectoras sobre terrazas y se priorizan trabajos interiores de chukum.',
    fecha: '08 Octubre',
    hora: '08:30 AM',
    leida: true,
    severidad: 'moderada',
    etapaRelacionada: 'General'
  },
  {
    id: 'notif-5',
    tipo: 'material',
    titulo: 'Llegada de Material: Madera de Tzalam Certificada',
    mensaje: 'Se recibieron las piezas de madera tropical de tzalam estufada y tratada contra humedad y salitre para la carpintería fina de recámaras.',
    fecha: '05 Octubre',
    hora: '14:00 PM',
    leida: true,
    severidad: 'informativa',
    etapaRelacionada: 'Etapa 6: Carpintería'
  }
];

export const GALERIA_FOTOS_DATA: FotoAvance[] = [
  {
    id: 'foto-1',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
    titulo: 'Armado de Losas & Refuerzo Estructural',
    descripcion: 'Detalle de varilla corrugada grado 42 y ductos de poliducto antes del vaciado de concreto premezclado.',
    fecha: '12 de Octubre, 2024',
    semana: 'Semana 22',
    zona: 'Estructura',
    subidoPor: 'Arq. Carlos Mendoza (Residente)'
  },
  {
    id: 'foto-2',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    titulo: 'Supervisión Técnica con Planos Estructurales',
    descripcion: 'Revisión en campo de cotas y desplantes de muros divisorios en planta alta junto al D.R.O.',
    fecha: '10 de Octubre, 2024',
    semana: 'Semana 22',
    zona: 'Interiores',
    subidoPor: 'Ing. Fernando Beltrán (D.R.O.)'
  },
  {
    id: 'foto-3',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    titulo: 'Avance de Fachada Principal & Voladizo',
    descripcion: 'Perspectiva exterior donde se aprecia el volado de 3.5 metros sobre el acceso y vanos de cancelería listos.',
    fecha: '06 de Octubre, 2024',
    semana: 'Semana 21',
    zona: 'Fachada',
    subidoPor: 'Arq. Carlos Mendoza'
  },
  {
    id: 'foto-4',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    titulo: 'Pruebas de Instalación Hidráulica en Baños',
    descripcion: 'Interconexión de tubería PPR termofusionada en muro húmedo con manómetro de presión calibrado.',
    fecha: '03 de Octubre, 2024',
    semana: 'Semana 21',
    zona: 'Instalaciones',
    subidoPor: 'Ing. R. Saldaña'
  },
  {
    id: 'foto-5',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    titulo: 'Aplanados de Yeso Extrafino en Doble Altura',
    descripcion: 'Aplicación de pastas y yeso reglado a plomo en área de estancia principal con andamios certificados.',
    fecha: '28 de Septiembre, 2024',
    semana: 'Semana 20',
    zona: 'Interiores',
    subidoPor: 'Arq. Carlos Mendoza'
  },
  {
    id: 'foto-6',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    titulo: 'Inspección Aérea con Dron: Cubierta & Losa',
    descripcion: 'Toma cenital de pendientes pluviales y preparación para impermeabilización prefabricada de 4.5 mm.',
    fecha: '22 de Septiembre, 2024',
    semana: 'Semana 19',
    zona: 'Azotea',
    subidoPor: 'Equipo de Vuelo Grupo Cenzontle',
    esVideo: true,
    videoDuration: '1:45 min'
  }
];

export const BITACORA_OBRA_DATA: EntradaBitacora[] = [
  {
    id: 'bit-104',
    folio: 'BIT-2024-104',
    fecha: '12 de Octubre, 2024',
    hora: '16:30 hrs',
    autorNombre: 'Ing. Fernando Beltrán',
    autorRol: 'Director Responsable de Obra (D.R.O.)',
    autorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    categoria: 'Control de Calidad',
    titulo: 'Liberación de pruebas hidrostáticas y verificación de plomos',
    observaciones: 'Se asienta en bitácora que la totalidad de la tubería hidráulica y descargas sanitarias de la planta alta mantuvieron la presión de prueba sin anomalías. Se autoriza el inicio del cierre de plafones y enyesado de ductos.',
    estatus: 'Aprobado',
    respuestas: [
      {
        autor: 'Arq. Carlos Mendoza',
        rol: 'Residente de Obra',
        mensaje: 'Enterado. Se programa cuadrilla de yeseros para el lunes a primera hora.',
        fecha: '12 Oct 17:05 hrs'
      }
    ]
  },
  {
    id: 'bit-103',
    folio: 'BIT-2024-103',
    fecha: '09 de Octubre, 2024',
    hora: '11:00 hrs',
    autorNombre: 'Arq. Carlos Mendoza',
    autorRol: 'Arquitecto Residente en Sitio',
    autorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    categoria: 'Modificación Autorizada',
    titulo: 'Ajuste en ubicación de lámparas empotradas en comedor',
    observaciones: 'Por indicación y firma de conformidad de los propietarios durante la visita de supervisión del sábado, se recorren las 4 luminarias empotradas 25 cm hacia el eje central para coincidir con la mesa de comedor de 10 plazas.',
    estatus: 'Resuelto'
  },
  {
    id: 'bit-102',
    folio: 'BIT-2024-102',
    fecha: '05 de Octubre, 2024',
    hora: '14:20 hrs',
    autorNombre: 'Arq. Elena Garza',
    autorRol: 'Coordinadora de Acabados & Calidad',
    autorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    categoria: 'Recepción Material',
    titulo: 'Recepción e inventario de porcelanatos italianos',
    observaciones: 'Se recibieron 340 m² de pisos rectificados en 4 tarimas debidamente flejadas. Se verificó tono y calibre por muestreo aleatorio en 10 cajas, sin encontrar defectos. Quedan bajo resguardo bajo techo en bodega.',
    estatus: 'Aprobado'
  },
  {
    id: 'bit-101',
    folio: 'BIT-2024-101',
    fecha: '29 de Septiembre, 2024',
    hora: '09:15 hrs',
    autorNombre: 'Arq. Carlos Mendoza',
    autorRol: 'Arquitecto Residente en Sitio',
    autorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    categoria: 'Condiciones Climáticas',
    titulo: 'Chubasco tropical costero y medidas preventivas',
    observaciones: 'Se presentaron precipitaciones costeras continuas de 55 mm en la zona de Bahía Soliman. Se verificó el funcionamiento de los cárcamos pluviales y bombeos de achique; la losa de entrepiso y cubiertas temporales desalojaron el agua correctamente. Se suspenden únicamente labores exteriores de colado por 24 hrs.',
    estatus: 'Resuelto'
  }
];

export interface ObraPaqueteCompleto {
  codigo: string;
  obra: ObraCliente;
  etapas: EtapaObra[];
  notificaciones: NotificacionAlerta[];
  galeria: FotoAvance[];
  bitacora: EntradaBitacora[];
}

export const OBRAS_REGISTRADAS: Record<string, ObraPaqueteCompleto> = {
  'SOL-042': {
    codigo: 'SOL-042',
    obra: OBRA_ACTIVA_EJEMPLO,
    etapas: ETAPAS_OBRA_DATA,
    notificaciones: NOTIFICACIONES_DATA,
    galeria: GALERIA_FOTOS_DATA,
    bitacora: BITACORA_OBRA_DATA
  },
  'MYK-620': {
    codigo: 'MYK-620',
    obra: {
      ...OBRA_ACTIVA_EJEMPLO,
      id: 'obra-myk-620',
      codigoContrato: 'OB-2024-MYK-620',
      nombreProyecto: 'Villa Ka’an Mayakoba',
      cliente: 'Lic. Rodrigo & Claudia Montes',
      ubicacion: 'Lote 08, Corredor Mayakoba, Playa del Carmen',
      superficieM2: 620,
      tipo: 'Residencia de Selva y Manglar (2 Niveles)',
      avancePorcentaje: 92,
      diasTranscurridos: 210,
      diasTotales: 235,
      presupuestoTotal: 14200000,
      presupuestoEjercido: 13150000,
      proximoHito: {
        titulo: 'Detalle final de chukum y barniz de tzalam en pérgolas exteriores',
        fecha: '24 de Octubre, 2024',
        diasRestantes: 6
      },
      trabajadoresEnSitio: 14
    },
    etapas: ETAPAS_OBRA_DATA.map((e, idx) => idx <= 3 ? { ...e, porcentaje: 100, estado: 'completada' } : idx === 4 ? { ...e, porcentaje: 85, estado: 'en_proceso' } : e),
    notificaciones: [
      {
        id: 'notif-myk-1',
        tipo: 'hito',
        titulo: 'Hito Completado: Alberca en Chukum Lista para Llenado',
        mensaje: 'Se finalizó el bruñido artesanal con resina de chukum en alberca y terrazas bajas. Tiempo de curado verificado.',
        fecha: 'Hoy',
        hora: '10:15 AM',
        leida: false,
        severidad: 'informativa',
        etapaRelacionada: 'Etapa 5: Acabados'
      },
      ...NOTIFICACIONES_DATA.slice(1)
    ],
    galeria: GALERIA_FOTOS_DATA,
    bitacora: BITACORA_OBRA_DATA
  },
  'TLM-285': {
    codigo: 'TLM-285',
    obra: {
      ...OBRA_ACTIVA_EJEMPLO,
      id: 'obra-tlm-285',
      codigoContrato: 'OB-2024-TLM-285',
      nombreProyecto: 'Pabellón & Spa Holístico Tulum',
      cliente: 'Ing. Alejandro Baillères',
      ubicacion: 'Km 7.5 Carretera Tulum-Boca Paila, Tulum',
      superficieM2: 2850,
      tipo: 'Hospitalidad Ecoturística & Spa Palafítico',
      avancePorcentaje: 82,
      diasTranscurridos: 190,
      diasTotales: 240,
      presupuestoTotal: 38500000,
      presupuestoEjercido: 31600000,
      proximoHito: {
        titulo: 'Montaje de celosías de tzalam y techumbres tensadas en pabellón de yoga',
        fecha: '29 de Octubre, 2024',
        diasRestantes: 11
      },
      trabajadoresEnSitio: 28
    },
    etapas: ETAPAS_OBRA_DATA,
    notificaciones: NOTIFICACIONES_DATA,
    galeria: GALERIA_FOTOS_DATA,
    bitacora: BITACORA_OBRA_DATA
  }
};

export const buscarObraPorCodigo = (inputCodigo: string): ObraPaqueteCompleto | null => {
  if (!inputCodigo) return null;
  const limpio = inputCodigo.trim().toUpperCase();

  // Alias demo
  if (['DEMO', 'DEMO-2025', 'DEMO2025', 'SOLIMAN', 'SOL', '42'].includes(limpio)) {
    return OBRAS_REGISTRADAS['SOL-042'];
  }
  if (['MAYAKOBA', 'MYK', '620'].includes(limpio)) {
    return OBRAS_REGISTRADAS['MYK-620'];
  }
  if (['TULUM', 'TLM', '285'].includes(limpio)) {
    return OBRAS_REGISTRADAS['TLM-285'];
  }

  // Exact match
  if (OBRAS_REGISTRADAS[limpio]) {
    return OBRAS_REGISTRADAS[limpio];
  }

  // Match inside contract code
  for (const item of Object.values(OBRAS_REGISTRADAS)) {
    if (item.codigo === limpio || item.obra.codigoContrato.toUpperCase().includes(limpio)) {
      return item;
    }
  }

  return null;
};
