/**
 * PATRÓN FACADE - Servicios Subsistema
 *
 * Estos servicios representan la complejidad subyacente
 * La Fachada los coordina sin que el cliente los conozca
 */

import { Injectable } from '@angular/core';
import { Facility, User, Reservation, IReservationResult } from './facility.model';

/**
 * ═══════════════════════════════════════════════════════════
 * SERVICIO 1: Validación de Usuario
 * ═══════════════════════════════════════════════════════════
 */

@Injectable({ providedIn: 'root' })
export class UserValidationService {
  /**
   * Usuarios simulados en base de datos
   */
  private users: User[] = [
    new User('user-1', 'Juan Pérez', 'juan@example.com', '+34 600 123 456', false),
    new User('user-2', 'María López', 'maria@example.com', '+34 600 234 567', true),
    new User('user-3', 'Carlos García', 'carlos@example.com', '+34 600 345 678', true),
  ];

  /**
   * Valida que el usuario exista y sea válido
   */
  validateUser(userId: string): { valid: boolean; user?: User; error?: string } {
    const user = this.users.find((u) => u.id === userId);

    if (!user) {
      return { valid: false, error: 'Usuario no encontrado' };
    }

    if (!user.email || !user.phone) {
      return { valid: false, error: 'Datos de usuario incompletos' };
    }

    return { valid: true, user };
  }

  /**
   * Obtiene todos los usuarios
   */
  getUsers(): User[] {
    return [...this.users];
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * SERVICIO 2: Verificación de Disponibilidad
 * ═══════════════════════════════════════════════════════════
 */

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  /**
   * Canchas disponibles
   */
  private facilities: Facility[] = [
    new Facility('fac-1', 'Cancha 1 - Fútbol', 'Fútbol', 50, true),
    new Facility('fac-2', 'Cancha 2 - Tenis', 'Tenis', 40, true),
    new Facility('fac-3', 'Cancha 3 - Básquet', 'Básquet', 45, false),
    new Facility('fac-4', 'Cancha 4 - Voleibol', 'Voleibol', 35, true),
  ];

  /**
   * Reservas existentes (para verificar disponibilidad)
   */
  private reservations: Reservation[] = [];

  /**
   * Verifica si una cancha está disponible en una fecha
   */
  checkAvailability(
    facilityId: string,
    date: Date
  ): { available: boolean; facility?: Facility; error?: string } {
    const facility = this.facilities.find((f) => f.id === facilityId);

    if (!facility) {
      return { available: false, error: 'Cancha no encontrada' };
    }

    if (!facility.available) {
      return { available: false, error: 'Cancha no disponible' };
    }

    // Verificar que la fecha sea en el futuro
    if (date < new Date()) {
      return { available: false, error: 'La fecha debe ser en el futuro' };
    }

    // Verificar conflictos de reserva
    const hasConflict = this.reservations.some(
      (r) =>
        r.facilityId === facilityId &&
        r.status === 'confirmed' &&
        r.date.getTime() === date.getTime()
    );

    if (hasConflict) {
      return { available: false, error: 'La cancha no está disponible en esa fecha' };
    }

    return { available: true, facility };
  }

  /**
   * Obtiene todas las canchas
   */
  getFacilities(): Facility[] {
    return [...this.facilities];
  }

  /**
   * Agrega una reserva a la lista (uso interno)
   */
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * SERVICIO 3: Procesamiento de Pagos
 * ═══════════════════════════════════════════════════════════
 */

@Injectable({ providedIn: 'root' })
export class PaymentService {
  /**
   * Procesa un pago
   */
  processPayment(
    userId: string,
    amount: number,
    facilityType: string
  ): { success: boolean; transactionId?: string; error?: string } {
    // Simular verificaciones de pago
    if (amount <= 0) {
      return { success: false, error: 'Monto inválido' };
    }

    // Simular fallo ocasional (10% de probabilidad)
    if (Math.random() < 0.1) {
      return { success: false, error: 'Error en procesamiento de pago' };
    }

    // Simulación exitosa
    const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return { success: true, transactionId };
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * SERVICIO 4: Gestión de Reservas
 * ═══════════════════════════════════════════════════════════
 */

@Injectable({ providedIn: 'root' })
export class ReservationService {
  /**
   * Confirma una reserva
   */
  confirmReservation(reservation: Reservation): { success: boolean; error?: string } {
    if (!reservation) {
      return { success: false, error: 'Reserva inválida' };
    }

    if (reservation.status !== 'pending') {
      return { success: false, error: 'La reserva no está en estado pendiente' };
    }

    reservation.status = 'confirmed';
    return { success: true };
  }

  /**
   * Cancela una reserva
   */
  cancelReservation(reservationId: string): { success: boolean; error?: string } {
    return { success: true };
  }

  /**
   * Envía confirmación (email simulado)
   */
  sendConfirmationEmail(
    userEmail: string,
    facilityName: string,
    date: Date
  ): boolean {
    console.log(`📧 Email enviado a ${userEmail} con confirmación de ${facilityName}`);
    return true;
  }
}
