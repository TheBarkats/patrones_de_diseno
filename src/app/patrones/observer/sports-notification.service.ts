/**
 * PATRÓN OBSERVER - Servicio de Notificaciones
 *
 * Este servicio implementa el patrón Observer usando RxJS
 * Es el SUBJECT/OBSERVABLE del patrón
 */

import { Injectable } from '@angular/core';
import {
  Subject,
  Observable,
  BehaviorSubject,
  ReplaySubject,
} from 'rxjs';
import { SportsCourt, CourtStatus, Notification } from './reservation.model';

@Injectable({
  providedIn: 'root',
})
export class SportsNotificationService {
  /**
   * Subject que emite notificaciones en tiempo real
   *
   * Los componentes se suscriben a esto con:
   * this.notificationService.notifications$.subscribe(...)
   *
   * TIPO DE SUBJECT:
   * - Subject: No tiene valor inicial
   * - BehaviorSubject: Tiene valor inicial y lo emite al suscribirse
   * - ReplaySubject: Guarda últimas N emisiones
   */

  /**
   * Subject para notificaciones nuevas (sin histórico)
   * Las nuevas suscripciones NO reciben notificaciones antiguas
   */
  private notificationSubject = new Subject<Notification>();

  /**
   * Observable público para suscribirse a notificaciones
   * Los componentes usan esto
   */
  public notifications$: Observable<Notification> =
    this.notificationSubject.asObservable();

  /**
   * ReplaySubject que guarda las últimas 20 notificaciones
   * Útil para componentes que se montan después
   */
  private recentNotificationsSubject = new ReplaySubject<Notification>(20);

  /**
   * Observable para notificaciones recientes
   */
  public recentNotifications$: Observable<Notification> =
    this.recentNotificationsSubject.asObservable();

  /**
   * BehaviorSubject con el estado actual de las canchas
   * Tiene valor inicial (empty array)
   * Nuevas suscripciones reciben el valor actual inmediatamente
   */
  private courtsStateSubject = new BehaviorSubject<SportsCourt[]>([]);

  /**
   * Observable del estado de las canchas
   */
  public courtsState$: Observable<SportsCourt[]> =
    this.courtsStateSubject.asObservable();

  /**
   * Contador de suscriptores activos (para demo)
   */
  private activeSubscribers: number = 0;

  /**
   * Histórico de notificaciones (para estadísticas)
   */
  private notificationHistory: Notification[] = [];

  constructor() {
    this.initializeCourts();
  }

  /**
   * Inicializa algunas canchas de ejemplo
   */
  private initializeCourts(): void {
    const initialCourts: SportsCourt[] = [
      new SportsCourt('court-1', 'Cancha 1 - Fútbol', 'Sector A', 'Fútbol'),
      new SportsCourt('court-2', 'Cancha 2 - Tenis', 'Sector B', 'Tenis'),
      new SportsCourt(
        'court-3',
        'Cancha 3 - Básquet',
        'Sector C',
        'Básquet'
      ),
      new SportsCourt(
        'court-4',
        'Cancha 4 - Voleibol',
        'Sector A',
        'Voleibol'
      ),
      new SportsCourt('court-5', 'Cancha 5 - Badmintón', 'Sector D', 'Badmintón'),
    ];

    this.courtsStateSubject.next(initialCourts);
  }

  /**
   * Cambiar el estado de una cancha
   * Esto EMITE la notificación a todos los suscritos
   *
   * DEMOSTRACIÓN DEL PATRÓN:
   * - El servicio emite el cambio
   * - Todos los components suscritos reciben automáticamente
   * - No necesitamos llamar a cada componente
   *
   * @param courtId ID de la cancha
   * @param newStatus Nuevo estado
   */
  updateCourtStatus(courtId: string, newStatus: CourtStatus): void {
    // Obtener estado actual
    const courts = this.courtsStateSubject.getValue();

    // Buscar la cancha y actualizar
    const court = courts.find((c) => c.id === courtId);
    if (court) {
      court.updateStatus(newStatus);

      // Emitir el nuevo estado a TODOS los suscriptores
      this.courtsStateSubject.next([...courts]);

      // Crear notificación
      const notification = new Notification(
        court.id,
        court.name,
        newStatus,
        this.getNotificationType(newStatus)
      );

      // Emitir notificación a TODOS los suscriptores
      this.notificationSubject.next(notification);
      this.recentNotificationsSubject.next(notification);

      // Guardar en histórico
      this.notificationHistory.push(notification);

      console.log(
        `📢 Notificación emitida: ${notification.message}`,
        `[Suscriptores activos: ${this.activeSubscribers}]`
      );
    }
  }

  /**
   * Obtiene el tipo de notificación según el estado
   */
  private getNotificationType(
    status: CourtStatus
  ): 'alert' | 'info' | 'warning' | 'success' {
    switch (status) {
      case CourtStatus.AVAILABLE:
        return 'success';
      case CourtStatus.OCCUPIED:
        return 'alert';
      case CourtStatus.MAINTENANCE:
        return 'warning';
    }
  }

  /**
   * Obtiene todas las canchas actuales
   */
  getCourts(): SportsCourt[] {
    return this.courtsStateSubject.getValue();
  }

  /**
   * Obtiene una cancha específica
   */
  getCourtById(courtId: string): SportsCourt | undefined {
    return this.courtsStateSubject.getValue().find((c) => c.id === courtId);
  }

  /**
   * Obtiene el histórico de notificaciones
   */
  getNotificationHistory(): Notification[] {
    return [...this.notificationHistory];
  }

  /**
   * Limpia el histórico
   */
  clearHistory(): void {
    this.notificationHistory = [];
  }

  /**
   * Incrementa contador de suscriptores (para demo)
   */
  incrementSubscribers(): void {
    this.activeSubscribers++;
    console.log(`➕ Nuevo suscriptor. Total: ${this.activeSubscribers}`);
  }

  /**
   * Decrementa contador de suscriptores (para demo)
   */
  decrementSubscribers(): void {
    this.activeSubscribers = Math.max(0, this.activeSubscribers - 1);
    console.log(`➖ Suscriptor removido. Total: ${this.activeSubscribers}`);
  }

  /**
   * Obtiene número actual de suscriptores
   */
  getActiveSubscribers(): number {
    return this.activeSubscribers;
  }

  /**
   * Simula cambios de estado aleatorios para demostración
   */
  startRandomUpdates(interval: number = 5000): void {
    setInterval(() => {
      const courts = this.getCourts();
      const randomCourt = courts[Math.floor(Math.random() * courts.length)];
      const statuses = Object.values(CourtStatus);
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      this.updateCourtStatus(randomCourt.id, randomStatus as CourtStatus);
    }, interval);
  }
}
