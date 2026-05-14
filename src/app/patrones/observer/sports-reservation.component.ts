/**
 * PATRÓN OBSERVER - Componente Angular
 *
 * Este componente demuestra cómo el patrón Observer permite que múltiples
 * partes de la aplicación reaccionen automáticamente a cambios.
 */

import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SportsNotificationService } from './sports-notification.service';
import {
  SportsCourt,
  CourtStatus,
  Notification,
} from './reservation.model';

@Component({
  selector: 'app-sports-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sports-reservation.component.html',
  styleUrls: ['./sports-reservation.component.css'],
})
export class SportsReservationComponent implements OnInit, OnDestroy {
  /**
   * Lista de todas las canchas
   */
  courts: SportsCourt[] = [];

  /**
   * Notificaciones recibidas
   */
  notifications: Notification[] = [];

  /**
   * Notificaciones recientes (últimas 10)
   */
  recentNotifications: Notification[] = [];

  /**
   * Selección de cancha para cambiar estado
   */
  selectedCourtId: string = '';
  selectedStatus: CourtStatus = CourtStatus.AVAILABLE;

  /**
   * Información de suscriptores
   */
  activeSubscribers: number = 0;

  /**
   * Control de auto-actualizaciones
   */
  autoUpdatesEnabled = false;
  autoUpdateInterval = 5000;

  /**
   * Para desuscribirse automáticamente al destruir el componente
   * Este es un patrón importante: SIEMPRE desuscribirse
   */
  private destroy$ = new Subject<void>();

  constructor(
    private notificationService: SportsNotificationService
  ) {}

  /**
   * INICIALIZACIÓN DEL COMPONENTE
   *
   * Aquí es donde usamos el patrón Observer:
   * 1. Nos SUSCRIBIMOS al Observable
   * 2. Especificamos qué hacer cuando emita valores
   * 3. Angular maneja los cambios automáticamente
   */
  ngOnInit(): void {
    // Cargar canchas iniciales
    this.loadCourts();

    // SUSCRIBIRSE A CAMBIOS DE CANCHAS
    // IMPORTANTE: Usar takeUntil para desuscribirse automáticamente
    this.notificationService.courtsState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((courts) => {
        console.log('👀 Observer recibió cambio de canchas:', courts);
        this.courts = courts;

        // Si no hay cancha seleccionada, seleccionar la primera
        if (
          !this.selectedCourtId &&
          this.courts.length > 0
        ) {
          this.selectedCourtId = this.courts[0].id;
        }
      });

    // SUSCRIBIRSE A NUEVAS NOTIFICACIONES
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => {
        console.log('🔔 Observer recibió notificación:', notification.message);
        this.notifications.unshift(notification);

        // Mantener solo las últimas 50
        if (this.notifications.length > 50) {
          this.notifications.pop();
        }
      });

    // SUSCRIBIRSE A NOTIFICACIONES RECIENTES (últimas 20)
    this.notificationService.recentNotifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => {
        this.recentNotifications.unshift(notification);

        // Mantener solo las últimas 10
        if (this.recentNotifications.length > 10) {
          this.recentNotifications.pop();
        }
      });

    // Indicar que nos suscribimos
    this.notificationService.incrementSubscribers();
    this.updateSubscriberCount();
  }

  /**
   * LIMPIEZA al destruir el componente
   *
   * IMPORTANTE: Desuscribirse evita memory leaks
   * El operador takeUntil lo hace automáticamente
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.notificationService.decrementSubscribers();
    this.updateSubscriberCount();
  }

  /**
   * Carga las canchas iniciales
   */
  loadCourts(): void {
    this.courts = this.notificationService.getCourts();
    if (this.courts.length > 0) {
      this.selectedCourtId = this.courts[0].id;
    }
  }

  /**
   * Actualiza el estado de una cancha
   *
   * DEMOSTRACIÓN DEL PATRÓN:
   * 1. Hacemos clic en "Actualizar Estado"
   * 2. El servicio emite cambio a TODOS los suscritos
   * 3. ESTE componente lo recibe automáticamente
   * 4. Los datos se actualizan sin hacer nada más
   */
  updateCourtStatus(): void {
    if (!this.selectedCourtId) {
      alert('Por favor, selecciona una cancha');
      return;
    }

    // Llamar al servicio (que emite a todos los suscritos)
    this.notificationService.updateCourtStatus(
      this.selectedCourtId,
      this.selectedStatus
    );
  }

  /**
   * Actualiza el contador de suscriptores
   */
  updateSubscriberCount(): void {
    this.activeSubscribers =
      this.notificationService.getActiveSubscribers();
  }

  /**
   * Alterna actualizaciones automáticas
   */
  toggleAutoUpdates(): void {
    this.autoUpdatesEnabled = !this.autoUpdatesEnabled;

    if (this.autoUpdatesEnabled) {
      this.startRandomUpdates();
    }
  }

  /**
   * Inicia actualizaciones aleatorias de ejemplo
   */
  startRandomUpdates(): void {
    const interval = setInterval(() => {
      if (!this.autoUpdatesEnabled) {
        clearInterval(interval);
        return;
      }

      const courts = this.courts;
      if (courts.length === 0) return;

      const randomCourt = courts[Math.floor(Math.random() * courts.length)];
      const statuses = Object.values(CourtStatus);
      const randomStatus = statuses[
        Math.floor(Math.random() * statuses.length)
      ] as CourtStatus;

      this.notificationService.updateCourtStatus(
        randomCourt.id,
        randomStatus
      );
    }, this.autoUpdateInterval);
  }

  /**
   * Limpia el histórico de notificaciones
   */
  clearNotifications(): void {
    this.notifications = [];
    this.recentNotifications = [];
    this.notificationService.clearHistory();
  }

  /**
   * Obtiene el ícono para un estado
   */
  getStatusIcon(status: CourtStatus): string {
    switch (status) {
      case CourtStatus.AVAILABLE:
        return '✅';
      case CourtStatus.OCCUPIED:
        return '❌';
      case CourtStatus.MAINTENANCE:
        return '🔧';
    }
  }

  /**
   * EXPLICACIÓN DETALLADA DEL PATRÓN OBSERVER:
   *
   * ¿QUÉ PROBLEMA RESUELVE?
   * ────────────────────────
   * Sin Observer:
   * - Cancha cambia estado
   * - Tengo que llamar manualmente a cada componente
   * - Tengo que pasar datos por props o routing
   * - Lógica compleja y acoplada
   * - Múltiples formas de sincronizar
   *
   * Con Observer:
   * - Cancha cambia estado
   * - El servicio EMITE el cambio
   * - Todos los suscritos lo reciben AUTOMÁTICAMENTE
   * - Desacoplado y limpio
   *
   * ¿CÓMO LO RESUELVE?
   * ──────────────────
   * Subject = El publicador de eventos
   * Observable = La fuente de datos reactiva
   * subscribe() = Decir "dame cambios"
   * next() = Emitir un valor a todos los suscritos
   *
   * FLUJO:
   * ─────
   * 1. SportsNotificationService crea Subject<Notification>
   * 2. El componente hace: service.notifications$.subscribe(...)
   * 3. El servicio hace: this.notificationSubject.next(notification)
   * 4. El componente recibe automáticamente en el callback
   * 5. Angular detecta cambio y actualiza la vista
   *
   * TIPOS DE SUBJECT:
   * ────────────────
   * • Subject: Sin valor inicial
   * • BehaviorSubject: Tiene valor, lo emite al suscribirse
   * • ReplaySubject: Guarda y emite últimas N emisiones
   *
   * EN ESTA DEMOSTRACIÓN:
   * ────────────────────
   * 1. Haz clic en "Actualizar Estado"
   * 2. El servicio emite cambio
   * 3. La lista de canchas se actualiza
   * 4. Las notificaciones aparecen
   * 5. El contador de suscriptores aumenta
   *
   * VENTAJAS:
   * ────────
   * ✅ Desacoplamiento total
   * ✅ Actualizaciones automáticas
   * ✅ Reactividad nativa Angular
   * ✅ Escalable a muchos suscriptores
   * ✅ Fácil de testear
   * ✅ Elimina callback hell
   *
   * BUENAS PRÁCTICAS:
   * ────────────────
   * ✅ Usar takeUntil para desuscribirse
   * ✅ Crear destroy$ subject
   * ✅ Llamar destroy$.next() en ngOnDestroy
   * ✅ Evitar memory leaks
   * ✅ Usar pipe() para transformaciones
   */
}
