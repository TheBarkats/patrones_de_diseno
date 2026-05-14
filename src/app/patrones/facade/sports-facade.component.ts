/**
 * PATRÓN FACADE - Componente Angular
 *
 * Este componente demuestra cómo la Fachada simplifica la complejidad
 * de múltiples servicios en una interfaz simple.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationFacade } from './sports-facade.service';
import {
  IReservationResult,
  Facility,
  User,
} from './facility.model';

@Component({
  selector: 'app-sports-facade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sports-facade.component.html',
  styleUrls: ['./sports-facade.component.css'],
})
export class SportsFacadeComponent implements OnInit {
  /**
   * Lista de canchas disponibles
   */
  facilities: Facility[] = [];

  /**
   * Lista de usuarios
   */
  users: User[] = [];

  /**
   * Formulario de reserva
   */
  selectedUserId: string = '';
  selectedFacilityId: string = '';
  selectedDate: string = '';
  selectedDuration: number = 1;

  /**
   * Resultado de la operación
   */
  reservationResult: IReservationResult | null = null;
  showResult = false;

  /**
   * Historial de reservas
   */
  reservationHistory: IReservationResult[] = [];

  /**
   * Estado de carga
   */
  isLoading = false;

  /**
   * Para mostrar detalles de proceso
   */
  showDetails = false;

  constructor(private facade: ReservationFacade) {}

  /**
   * INICIALIZACIÓN
   *
   * Solo se cargan datos básicos
   * TODO se coordina a través de la Fachada
   */
  ngOnInit(): void {
    this.loadFacilities();
    this.loadUsers();

    if (this.users.length > 0) {
      this.selectedUserId = this.users[0].id;
    }
    if (this.facilities.length > 0) {
      this.selectedFacilityId = this.facilities[0].id;
    }
  }

  /**
   * Carga las canchas usando la Fachada
   */
  loadFacilities(): void {
    this.facilities = this.facade.getAvailableFacilities();
  }

  /**
   * Carga los usuarios usando la Fachada
   */
  loadUsers(): void {
    this.users = this.facade.getUsers();
  }

  /**
   * CREAR RESERVA - El método más importante
   *
   * DEMOSTRACIÓN DEL PATRÓN FACADE:
   *
   * Este método solo llama a la Fachada
   * TODO lo demás sucede internamente:
   * - Validación de usuario
   * - Verificación de disponibilidad
   * - Procesamiento de pago
   * - Confirmación de reserva
   *
   * El componente no necesita saber estos detalles
   */
  createReservation(): void {
    // Validaciones básicas
    if (
      !this.selectedUserId ||
      !this.selectedFacilityId ||
      !this.selectedDate ||
      this.selectedDuration < 1
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Mostrar que está procesando
    this.isLoading = true;
    this.showResult = false;
    this.reservationResult = null;

    // Simular delays de procesamiento
    setTimeout(() => {
      // Convertir fecha del input HTML
      const date = new Date(this.selectedDate);

      // LLAMAR A LA FACHADA
      // La Fachada coordina todo automáticamente
      this.reservationResult = this.facade.createReservation(
        this.selectedUserId,
        this.selectedFacilityId,
        date,
        this.selectedDuration
      );

      // Si fue exitosa, agregar al historial
      if (this.reservationResult.success) {
        this.reservationHistory.unshift(this.reservationResult);

        // Limpiar formulario
        this.selectedDate = '';
        this.selectedDuration = 1;
      }

      this.isLoading = false;
      this.showResult = true;
    }, 1000);
  }

  /**
   * Obtiene el usuario seleccionado
   */
  getSelectedUser(): User | undefined {
    return this.users.find((u) => u.id === this.selectedUserId);
  }

  /**
   * Obtiene la cancha seleccionada
   */
  getSelectedFacility(): Facility | undefined {
    return this.facilities.find((f) => f.id === this.selectedFacilityId);
  }

  /**
   * Calcula el precio estimado
   */
  getEstimatedPrice(): number {
    const facility = this.getSelectedFacility();
    const user = this.getSelectedUser();

    if (!facility) return 0;

    let total = facility.hourlyRate * this.selectedDuration;

    // Aplicar descuento premium
    if (user?.isPremium) {
      total = total * 0.9; // 10% descuento
    }

    return total;
  }

  /**
   * Limpia el historial
   */
  clearHistory(): void {
    this.reservationHistory = [];
  }

  /**
   * Alterna mostrar detalles del proceso
   */
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * EXPLICACIÓN DEL PATRÓN FACADE EN ESTE COMPONENTE
   * ═══════════════════════════════════════════════════════════
   *
   * OBSERVA LA SIMPLICIDAD:
   * ──────────────────────
   * El componente solo hace:
   * 1. Validar formulario básico
   * 2. Llamar: this.facade.createReservation(...)
   * 3. Mostrar resultado
   *
   * ¡ES TODO!
   *
   * EL COMPONENTE NO SABE:
   * ─────────────────────
   * ✓ Cómo se valida el usuario
   * ✓ Cómo se verifica disponibilidad
   * ✓ Cómo se procesa el pago
   * ✓ Cómo se confirma la reserva
   * ✓ Cómo se envía la notificación
   *
   * TODO ESTO ESTÁ EN LA FACHADA
   *
   * BENEFICIO:
   * ──────────
   * Si cambio la lógica interna:
   * - Cambio la Fachada
   * - El componente NO se ve afectado
   * - Los tests del componente siguen pasando
   *
   * COMPARACIÓN:
   * ────────────
   * SIN FACADE:
   *
   *   createReservation() {
   *     // Validar usuario
   *     const userValid = this.userSvc.validate(...)
   *     if (!userValid) { return ... }
   *
   *     // Verificar disponibilidad
   *     const available = this.availabilitySvc.check(...)
   *     if (!available) { return ... }
   *
   *     // Procesar pago
   *     const payment = this.paymentSvc.process(...)
   *     if (!payment.success) { return ... }
   *
   *     // Confirmar reserva
   *     const confirmed = this.reservationSvc.confirm(...)
   *     if (!confirmed) { return ... }
   *
   *     // Notificar
   *     this.reservationSvc.notify(...)
   *   }
   *
   *   ✗ 50+ líneas
   *   ✗ Acoplado a todos los servicios
   *   ✗ Difícil de entender
   *   ✗ Difícil de testear
   *
   * CON FACADE:
   *
   *   createReservation() {
   *     this.result = this.facade.createReservation(...)
   *   }
   *
   *   ✓ 3 líneas
   *   ✓ Desacoplado
   *   ✓ Fácil de entender
   *   ✓ Fácil de testear
   */
}
