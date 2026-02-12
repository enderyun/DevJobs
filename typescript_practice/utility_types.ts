// ===========================
// UTILITY TYPES EN TYPESCRIPT
// Herramientas para transformar tipos existentes
// Documentación: https://www.typescriptlang.org/docs/handbook/utility-types.html
// ===========================

// Definimos una interfaz base para los ejemplos
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion?: Date; // Propiedad opcional
}

// ===========================
// 1. PARTIAL<T>
// ===========================
// Convierte todas las propiedades de T a opcionales.
// Muy útil para funciones de "actualización" donde no necesitas enviar todo el objeto.

const tareaOriginal: Tarea = {
  id: 1,
  titulo: "Aprender TypeScript",
  descripcion: "Estudiar los Utility Types a fondo",
  completada: false,
  fechaCreacion: new Date()
};

function actualizarTarea(tarea: Tarea, camposAEditar: Partial<Tarea>): Tarea {
  return { ...tarea, ...camposAEditar };
}

// Solo enviamos 'completada', aunque Tarea requiera titulos, id, etc.
const tareaActualizada = actualizarTarea(tareaOriginal, { completada: true });


// ===========================
// 2. REQUIRED<T>
// ===========================
// Lo opuesto a Partial. Hace que todas las propiedades sean OBLIGATORIAS.
// Incluso las que definimos como opcionales (como fechaCreacion).

const tareaCompleta: Required<Tarea> = {
  id: 2,
  titulo: "Hacer ejercicio",
  descripcion: "Correr 5km",
  completada: true,
  fechaCreacion: new Date() // Si borras esto, dará error, porque ahora es required
};


// ===========================
// 3. READONLY<T>
// ===========================
// Hace que todas las propiedades sean de solo lectura.
// No se pueden reasignar después de la creación.

const tareaInmutable: Readonly<Tarea> = {
  id: 3,
  titulo: "Leer documentación",
  descripcion: "Leer sobre React",
  completada: false
};

// tareaInmutable.titulo = "Otra cosa"; // ERROR: No se puede asignar porque es de solo lectura.


// ===========================
// 4. PICK<T, K>
// ===========================
// Crea un nuevo tipo seleccionando solo las propiedades (Keys) que le digas.

// Digamos que para una lista resumen, solo queremos mostrar el título y si está completa.
type ResumenTarea = Pick<Tarea, "titulo" | "completada">;

const resumen: ResumenTarea = {
  titulo: "Comprar comida",
  completada: false
  // id: 4, // ERROR: 'id' no existe en ResumenTarea
};


// ===========================
// 5. OMIT<T, K>
// ===========================
// Lo contrario a Pick. Crea un tipo eliminando las propiedades que le digas.

// Queremos todo MENOS la descripción y la fecha.
type TareaSinDetalles = Omit<Tarea, "descripcion" | "fechaCreacion">;

const simple: TareaSinDetalles = {
  id: 5,
  titulo: "Dormir",
  completada: true
};


// ===========================
// 6. RECORD<Keys, Type>
// ===========================
// Crea un objeto donde las claves son de un tipo 'Keys' y los valores de un tipo 'Type'.
// Muy útil para diccionarios o mapas.

type NombrePagina = "inicio" | "servicios" | "contacto";

interface InfoPagina {
  titulo: string;
  url: string;
}

const navegacion: Record<NombrePagina, InfoPagina> = {
  inicio: { titulo: "Home", url: "/" },
  servicios: { titulo: "Nuestros Servicios", url: "/services" },
  contacto: { titulo: "Contáctanos", url: "/contact" }
  // blog: { ... } // ERROR: 'blog' no es una clave válida en NombrePagina
};
