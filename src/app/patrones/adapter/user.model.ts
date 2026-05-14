/**
 * PATRÓN ADAPTER - Modelos e Interfaces
 * 
 * Este archivo define la estructura de datos para demostrar cómo
 * el patrón Adapter resuelve incompatibilidades entre interfaces.
 * 
 * PROBLEMA RESUELTO:
 * Integración de sistemas legacy (antiguos) con código moderno
 * que espera interfaces diferentes.
 * 
 * VENTAJAS:
 * - Convierte interfaces incompatibles en compatibles
 * - No requiere modificar el código antiguo
 * - Aislamiento de cambios futuros
 * - Reutilización de código antiguo
 */

/**
 * ═══════════════════════════════════════════════════════════
 * INTERFAZ ESPERADA POR LA APLICACIÓN MODERNA
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Interfaz que la aplicación moderna Angular espera recibir
 * Esta es nuestra interfaz "OBJETIVO" o "TARGET"
 */
export interface IModernUser {
  fullName: string; // Nombre completo
  email: string; // Correo electrónico
  createdAt: Date; // Fecha de creación
}

/**
 * ═══════════════════════════════════════════════════════════
 * INTERFAZ DEVUELTA POR LA API ANTIGUA
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Esta es la interfaz que la API LEGACY devuelve
 * Nota: Los nombres de propiedades son diferentes
 * Esta es nuestra interfaz "ADAPTEE"
 */
export interface ILegacyApiUser {
  nombre_completo: string; // ← Diferente: nombre_completo vs fullName
  correo: string; // ← Diferente: correo vs email
  fecha_creacion: string; // ← Diferente: fecha_creacion vs createdAt (y es string)
}

/**
 * ═══════════════════════════════════════════════════════════
 * SIMULACIÓN DE LA API ANTIGUA
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Esta clase simula una API antigua que no podemos modificar
 * Devuelve usuarios en un formato incompatible
 */
export class LegacyApiService {
  /**
   * Simula una llamada a la API antigua
   * Devuelve usuarios en formato LEGACY
   */
  static getUsers(): ILegacyApiUser[] {
    return [
      {
        nombre_completo: 'Juan Pérez García',
        correo: 'juan.perez@old-system.com',
        fecha_creacion: '2022-01-15',
      },
      {
        nombre_completo: 'María López Rodríguez',
        correo: 'maria.lopez@old-system.com',
        fecha_creacion: '2022-03-20',
      },
      {
        nombre_completo: 'Carlos Martínez Sánchez',
        correo: 'carlos.martinez@old-system.com',
        fecha_creacion: '2022-06-10',
      },
      {
        nombre_completo: 'Ana Fernández Torres',
        correo: 'ana.fernandez@old-system.com',
        fecha_creacion: '2022-08-05',
      },
      {
        nombre_completo: 'Roberto González Díaz',
        correo: 'roberto.gonzalez@old-system.com',
        fecha_creacion: '2022-11-12',
      },
    ];
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * EL ADAPTADOR - SOLUCIÓN DEL PATRÓN ADAPTER
 * ═══════════════════════════════════════════════════════════
 */

/**
 * CLASE ADAPTADORA (ADAPTER)
 *
 * El Adapter es un intermediario que convierte la interfaz antigua
 * (ILegacyApiUser) a la interfaz moderna (IModernUser).
 *
 * CÓMO FUNCIONA:
 * 1. Recibe datos en formato antiguo (LegacyApiUser)
 * 2. Los transforma a formato moderno (ModernUser)
 * 3. La aplicación nunca sabe que la API es antigua
 *
 * BENEFICIO: Podemos cambiar la implementación interna sin
 * afectar el código que la usa.
 */
export class UserAdapter {
  /**
   * Adapta UN usuario desde formato LEGACY al formato MODERNO
   *
   * @param legacyUser - Usuario en formato antiguo
   * @returns Usuario convertido al formato moderno
   */
  static adaptLegacyToModern(legacyUser: ILegacyApiUser): IModernUser {
    return {
      // Convertir nombre_completo → fullName
      fullName: legacyUser.nombre_completo,

      // Convertir correo → email
      email: legacyUser.correo,

      // Convertir fecha_creacion (string) → createdAt (Date)
      createdAt: new Date(legacyUser.fecha_creacion),
    };
  }

  /**
   * Adapta UN usuario desde formato MODERNO al formato LEGACY
   * (En caso de que necesitemos enviar datos de vuelta a la API antigua)
   *
   * @param modernUser - Usuario en formato moderno
   * @returns Usuario convertido al formato antiguo
   */
  static adaptModernToLegacy(modernUser: IModernUser): ILegacyApiUser {
    return {
      nombre_completo: modernUser.fullName,
      correo: modernUser.email,
      fecha_creacion: modernUser.createdAt.toISOString().split('T')[0],
    };
  }

  /**
   * Adapta un ARRAY de usuarios desde formato LEGACY al MODERNO
   *
   * @param legacyUsers - Array de usuarios antiguos
   * @returns Array de usuarios modernos
   */
  static adaptLegacyUsersArray(
    legacyUsers: ILegacyApiUser[]
  ): IModernUser[] {
    return legacyUsers.map((legacyUser) =>
      this.adaptLegacyToModern(legacyUser)
    );
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * EXPLICACIÓN DEL PATRÓN ADAPTER
 * ═══════════════════════════════════════════════════════════
 *
 * ANALOGÍA REAL:
 * Imagine que tiene un adaptador de corriente:
 * - Enchufe europeo (API antigua) → Adaptador → Enchufe americano (Nueva app)
 * - El dispositivo funciona sin saber que necesita un adaptador
 *
 * EN CÓDIGO:
 * - LegacyApiUser (API antigua) → UserAdapter → IModernUser (Nueva app)
 * - La app Angular usa IModernUser y nunca interactúa con LegacyApiUser
 *
 * ¿CUÁNDO USAR?
 * - Integración de APIs antiguas
 * - Uso de librerías incompatibles
 * - Sistemas heredados en migración
 * - Encapsulación de cambios externos
 *
 * BENEFICIOS:
 * ✅ No modificas código antiguo (que ya funciona)
 * ✅ Tu aplicación moderna usa interfaces limpias
 * ✅ Si la API antigua cambia, solo cambias el Adapter
 * ✅ Fácil de testear (mock del Adapter)
 * ✅ Desacoplamiento total
 */
