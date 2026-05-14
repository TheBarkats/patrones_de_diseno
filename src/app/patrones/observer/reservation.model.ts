/**
 * PATRÓN OBSERVER - Modelos e Interfaces
 *
 * Este archivo define las estructuras de datos para un sistema de
 * notificaciones en tiempo real para reservas de canchas deportivas.
 *
 * PROBLEMA RESUELTO:
 * Cuando múltiples componentes necesitan reaccionar a cambios,
 * el patrón Observer automatiza esas notificaciones.
 *
 * VENTAJAS:
 * - Desacoplamiento entre publicador y suscriptores
 * - Actualizaciones automáticas
 * - Reactividad nativa en Angular
 */

/**
 * Estados posibles de una cancha
 */
export enum CourtStatus {
  AVAILABLE = 'Disponible',
  OCCUPIED = 'Ocupada',
  MAINTENANCE = 'Mantenimiento',
}

/**
 * Interfaz que representa una cancha deportiva
 */
export interface ISportsCourt {
  id: string;
  name: string;
  location: string;
  sport: string;
  status: CourtStatus;
  lastUpdated: Date;
}

/**
 * Clase que implementa una cancha deportiva
 */
export class SportsCourt implements ISportsCourt {
  id: string;
  name: string;
  location: string;
  sport: string;
  status: CourtStatus;
  lastUpdated: Date;

  constructor(
    id: string,
    name: string,
    location: string,
    sport: string,
    status: CourtStatus = CourtStatus.AVAILABLE
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.sport = sport;
    this.status = status;
    this.lastUpdated = new Date();
  }

  /**
   * Actualiza el estado de la cancha
   */
  updateStatus(newStatus: CourtStatus): void {
    this.status = newStatus;
    this.lastUpdated = new Date();
  }
}

/**
 * Interfaz para las notificaciones
 */
export interface INotification {
  id: string;
  courtId: string;
  courtName: string;
  message: string;
  status: CourtStatus;
  timestamp: Date;
  type: 'alert' | 'info' | 'warning' | 'success';
}

/**
 * Clase que representa una notificación
 */
export class Notification implements INotification {
  id: string;
  courtId: string;
  courtName: string;
  message: string;
  status: CourtStatus;
  timestamp: Date;
  type: 'alert' | 'info' | 'warning' | 'success';

  constructor(
    courtId: string,
    courtName: string,
    status: CourtStatus,
    type: 'alert' | 'info' | 'warning' | 'success' = 'info'
  ) {
    this.id = `notif-${Date.now()}-${Math.random()}`;
    this.courtId = courtId;
    this.courtName = courtName;
    this.status = status;
    this.timestamp = new Date();
    this.type = type;

    // Generar mensaje basado en el estado
    this.message = this.generateMessage(status);
  }

  /**
   * Genera un mensaje descriptivo según el estado
   */
  private generateMessage(status: CourtStatus): string {
    const messages: { [key in CourtStatus]: string } = {
      [CourtStatus.AVAILABLE]:
        '✅ La cancha está disponible para reservar',
      [CourtStatus.OCCUPIED]: '❌ La cancha está ocupada en este momento',
      [CourtStatus.MAINTENANCE]:
        '🔧 La cancha está en mantenimiento',
    };
    return messages[status];
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * EXPLICACIÓN DEL PATRÓN OBSERVER
 * ═══════════════════════════════════════════════════════════
 *
 * ANALOGÍA:
 * Imagina un periódico:
 * - El PERIÓDICO es el SUBJECT (Observable)
 * - Los SUSCRIPTORES son los OBSERVERS
 *
 * Cuando el periódico publica una noticia:
 * - Todos los suscriptores reciben automáticamente la noticia
 * - No necesita conocer detalles de los suscriptores
 * - Los suscriptores no interfieren entre sí
 *
 * EN CÓDIGO:
 * - NotificationService es el Subject/Observable
 * - Componentes que se suscriben son los Observers
 * - Cuando cambia el estado de una cancha, se emite evento
 * - Todos los suscritos lo reciben automáticamente
 *
 * FLUJO:
 * 1. Componente A se suscribe: "Dame notificaciones de canchas"
 * 2. Componente B se suscribe: "Dame notificaciones de canchas"
 * 3. El servicio emite: "¡La cancha 1 está disponible!"
 * 4. Componentes A y B reciben automáticamente
 *
 * ¿VENTAJAS?
 * ──────────
 * ✅ Desacoplamiento total
 * ✅ Actualizaciones automáticas
 * ✅ Reactividad sin callbacks
 * ✅ Escalable a muchos suscriptores
 * ✅ Fácil de testear
 *
 * ¿CUÁNDO USARLO?
 * ───────────────
 * ✅ Notificaciones en tiempo real
 * ✅ Cambios de estado global
 * ✅ Eventos en aplicación
 * ✅ Data binding reactivo
 * ✅ Actualizaciones múltiples destinos
 *
 * EN ANGULAR:
 * ───────────
 * Angular usa Observer pattern con RxJS:
 * - Observable: fuente de datos reactiva
 * - Subject: es Observable + Observer
 * - subscribe(): te haces observer
 * - pipe(): transforma datos
 * - unsubscribe(): dejas de observar
 */
