/**
 * PATRÓN FACADE - La Fachada Principal
 *
 * Esta es la clase Facade que coordina múltiples servicios.
 * El cliente SOLO interactúa con esto, no con los servicios individuales.
 *
 * FLUJO:
 * ──────
 * 1. Cliente llama: facade.createReservation(...)
 * 2. Facade internamente:
 *    a. Valida usuario (UserValidationService)
 *    b. Verifica disponibilidad (AvailabilityService)
 *    c. Procesa pago (PaymentService)
 *    d. Confirma reserva (ReservationService)
 * 3. Facade retorna resultado final
 * 4. Cliente NO sabe sobre los servicios internos
 *
 * VENTAJA:
 * ─────────
 * Si un subsistema cambia, solo cambio la Fachada
 * El cliente no se ve afectado
 */

import { Injectable } from '@angular/core';
import {
  UserValidationService,
  AvailabilityService,
  PaymentService,
  ReservationService,
} from './availability.service';
import {
  IReservationResult,
  Reservation,
  Facility,
  User,
} from './facility.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationFacade {
  /**
   * La Fachada conoce los servicios internos
   * Pero el cliente no necesita saberlo
   */

  constructor(
    private userValidation: UserValidationService,
    private availability: AvailabilityService,
    private payment: PaymentService,
    private reservation: ReservationService
  ) {}

  /**
   * ═══════════════════════════════════════════════════════════
   * MÉTODO PRINCIPAL - CREAR RESERVA
   * ═══════════════════════════════════════════════════════════
   *
   * Este es el ÚNICO método que el cliente necesita
   *
   * Detrás de escenas, coordina:
   * 1. Validación de usuario
   * 2. Verificación de disponibilidad
   * 3. Procesamiento de pago
   * 4. Confirmación de reserva
   * 5. Envío de notificación
   *
   * EL CLIENTE NO VE NADA DE ESTO
   *
   * @param userId ID del usuario
   * @param facilityId ID de la cancha
   * @param date Fecha de la reserva
   * @param duration Duración en horas
   * @returns Resultado de la operación
   */
  createReservation(
    userId: string,
    facilityId: string,
    date: Date,
    duration: number
  ): IReservationResult {
    console.log('🚀 FACADE: Iniciando proceso de reserva...');

    // ─────────────────────────────────────────────────────────
    // PASO 1: VALIDAR USUARIO
    // ─────────────────────────────────────────────────────────
    console.log('✓ PASO 1: Validando usuario...');
    const userValidation = this.userValidation.validateUser(userId);

    if (!userValidation.valid) {
      console.error('✗ Error: Usuario inválido -', userValidation.error);
      return {
        success: false,
        message: 'Error en validación de usuario',
        error: userValidation.error,
      };
    }

    const user = userValidation.user!;
    console.log(`✓ Usuario válido: ${user.name}`);

    // ─────────────────────────────────────────────────────────
    // PASO 2: VERIFICAR DISPONIBILIDAD
    // ─────────────────────────────────────────────────────────
    console.log('✓ PASO 2: Verificando disponibilidad...');
    const availabilityCheck = this.availability.checkAvailability(
      facilityId,
      date
    );

    if (!availabilityCheck.available) {
      console.error('✗ Error: Cancha no disponible -', availabilityCheck.error);
      return {
        success: false,
        message: 'Error en disponibilidad',
        error: availabilityCheck.error,
      };
    }

    const facility = availabilityCheck.facility!;
    console.log(`✓ Cancha disponible: ${facility.name}`);

    // ─────────────────────────────────────────────────────────
    // PASO 3: CALCULAR MONTO Y PROCESAR PAGO
    // ─────────────────────────────────────────────────────────
    console.log('✓ PASO 3: Procesando pago...');

    // Calcular monto total
    let totalAmount = facility.hourlyRate * duration;

    // Descuento para usuarios premium
    if (user.isPremium) {
      const discount = totalAmount * 0.1; // 10% descuento
      totalAmount -= discount;
      console.log(
        `✓ Descuento premium aplicado: $${discount.toFixed(2)}`
      );
    }

    // Procesar pago
    const paymentResult = this.payment.processPayment(
      user.id,
      totalAmount,
      facility.type
    );

    if (!paymentResult.success) {
      console.error('✗ Error: Pago fallido -', paymentResult.error);
      return {
        success: false,
        message: 'Error en procesamiento de pago',
        error: paymentResult.error,
      };
    }

    console.log(`✓ Pago procesado exitosamente: ${paymentResult.transactionId}`);

    // ─────────────────────────────────────────────────────────
    // PASO 4: CREAR Y CONFIRMAR RESERVA
    // ─────────────────────────────────────────────────────────
    console.log('✓ PASO 4: Creando y confirmando reserva...');

    const newReservation = new Reservation(
      user.id,
      facility.id,
      date,
      duration,
      totalAmount
    );

    // Confirmar reserva
    const confirmResult = this.reservation.confirmReservation(newReservation);

    if (!confirmResult.success) {
      console.error('✗ Error: Confirmación fallida -', confirmResult.error);
      return {
        success: false,
        message: 'Error en confirmación',
        error: confirmResult.error,
      };
    }

    console.log(`✓ Reserva confirmada: ${newReservation.id}`);

    // ─────────────────────────────────────────────────────────
    // PASO 5: REGISTRAR Y NOTIFICAR
    // ─────────────────────────────────────────────────────────
    console.log('✓ PASO 5: Registrando y enviando notificación...');

    this.availability.addReservation(newReservation);
    this.reservation.sendConfirmationEmail(
      user.email,
      facility.name,
      date
    );

    console.log('✅ RESERVA COMPLETADA EXITOSAMENTE');

    // ─────────────────────────────────────────────────────────
    // RETORNAR RESULTADO FINAL
    // ─────────────────────────────────────────────────────────

    return {
      success: true,
      message: 'Reserva creada exitosamente',
      reservation: newReservation,
      details: {
        facilityName: facility.name,
        userName: user.name,
        amount: totalAmount,
        date: date.toLocaleDateString('es-ES'),
      },
    };
  }

  /**
   * Obtiene las canchas disponibles
   */
  getAvailableFacilities(): Facility[] {
    return this.availability.getFacilities();
  }

  /**
   * Obtiene todos los usuarios
   */
  getUsers(): User[] {
    return this.userValidation.getUsers();
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * EXPLICACIÓN DETALLADA DEL PATRÓN FACADE
   * ═══════════════════════════════════════════════════════════
   *
   * DEFINICIÓN:
   * ────────────
   * Facade proporciona una interfaz unificada a un conjunto
   * de interfaces complejas en un subsistema.
   *
   * PROBLEMA SIN FACADE:
   * ────────────────────
   * El componente tendría que:
   * 1. Conocer UserValidationService
   * 2. Conocer AvailabilityService
   * 3. Conocer PaymentService
   * 4. Conocer ReservationService
   * 5. Coordinar todos en el orden correcto
   * 6. Manejar errores en múltiples niveles
   *
   * Resultado: Componente acoplado, complejo, difícil de testear
   *
   * SOLUCIÓN CON FACADE:
   * ────────────────────
   * El componente solo conoce ReservationFacade
   * Llama: facade.createReservation(...)
   * La Fachada coordina internamente
   *
   * Resultado: Componente limpio, desacoplado, fácil de testear
   *
   * ANALOGÍA DEL MUNDO REAL:
   * ────────────────────────
   * Banco (Facade):
   * - Internamente: múltiples departamentos
   *   - Caja (payments)
   *   - Crédito (loans)
   *   - Validación (verification)
   * - Afuera: Una sola ventanilla (Facade)
   * - Cliente: Solo habla con la ventanilla
   * - Cliente NO sabe cómo funciona todo adentro
   *
   * BENEFICIOS:
   * ───────────
   * ✅ Simplifica interfaces complejas
   * ✅ Desacoplamiento entre cliente y subsistemas
   * ✅ Fácil de mantener (cambios internos no afectan clientes)
   * ✅ Centraliza lógica de coordinación
   * ✅ Facilita testing (mock Facade)
   * ✅ Mejora reusabilidad
   *
   * CUÁNDO NO USAR:
   * ────────────────
   * ❌ Si hay un único servicio simple
   * ❌ Si los clientes necesitan control fino
   * ❌ Si no hay subsistemas complejos
   *
   * VARIANTES:
   * ──────────
   * • Facade Simple: Coordina servicios
   * • Facade Inteligente: Contiene lógica de negocio
   * • Multi-Facade: Diferentes Facades para diferentes clientes
   */
}
