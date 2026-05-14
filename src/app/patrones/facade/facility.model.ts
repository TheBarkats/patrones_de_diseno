/**
 * PATRÓN FACADE - Modelos e Interfaces
 *
 * Este archivo contiene las estructuras de datos para un sistema
 * de reservas de canchas deportivas con múltiples procesos.
 *
 * PROBLEMA RESUELTO:
 * Múltiples servicios complejos necesitan coordinación.
 * El usuario no debe conocer todos los detalles internos.
 *
 * VENTAJAS:
 * - Simplifica interfaces complejas
 * - Reduce acoplamiento
 * - Centraliza lógica de coordinación
 */

/**
 * ═══════════════════════════════════════════════════════════
 * MODELOS DE DOMINIO
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Información de una cancha disponible
 */
export interface IFacility {
  id: string;
  name: string;
  type: string;
  hourlyRate: number;
  available: boolean;
}

/**
 * Información del usuario
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isPremium: boolean;
}

/**
 * Información de reserva
 */
export interface IReservation {
  id: string;
  userId: string;
  facilityId: string;
  date: Date;
  duration: number; // en horas
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

/**
 * Clase que implementa una cancha
 */
export class Facility implements IFacility {
  id: string;
  name: string;
  type: string;
  hourlyRate: number;
  available: boolean;

  constructor(
    id: string,
    name: string,
    type: string,
    hourlyRate: number,
    available: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.hourlyRate = hourlyRate;
    this.available = available;
  }
}

/**
 * Clase que implementa un usuario
 */
export class User implements IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isPremium: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    isPremium: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.isPremium = isPremium;
  }
}

/**
 * Clase que implementa una reserva
 */
export class Reservation implements IReservation {
  id: string;
  userId: string;
  facilityId: string;
  date: Date;
  duration: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';

  constructor(
    userId: string,
    facilityId: string,
    date: Date,
    duration: number,
    totalAmount: number
  ) {
    this.id = `res-${Date.now()}-${Math.random()}`;
    this.userId = userId;
    this.facilityId = facilityId;
    this.date = date;
    this.duration = duration;
    this.totalAmount = totalAmount;
    this.status = 'pending';
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * RESPUESTA DE LA FACHADA
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Resultado de operación de reserva
 */
export interface IReservationResult {
  success: boolean;
  message: string;
  reservation?: Reservation;
  error?: string;
  details?: {
    facilityName: string;
    userName: string;
    amount: number;
    date: string;
  };
}

/**
 * ═══════════════════════════════════════════════════════════
 * EXPLICACIÓN DEL PATRÓN FACADE
 * ═══════════════════════════════════════════════════════════
 *
 * ANALOGÍA:
 * Imagine un cine:
 * - DENTRO hay: proyector, sonido, luces, asientos, etc.
 * - USUARIO solo ve: taquilla (la FACHADA)
 * - Usuario compra entrada sin entender cómo funciona todo
 * - La taquilla simplifica la complejidad
 *
 * EN CÓDIGO:
 * - Subsistemas: AvailabilityService, PaymentService, ValidationService
 * - FACHADA: ReservationFacade
 * - Cliente: componente Angular
 *
 * FLUJO SIN FACADE:
 * ─────────────────
 * 1. Cliente llama ValidateUserService
 * 2. Cliente llama AvailabilityService
 * 3. Cliente llama PaymentService
 * 4. Cliente llama ReservationService
 * 5. Cliente coordina todo
 * ✗ Acoplamiento alto
 * ✗ Lógica en cliente
 * ✗ Difícil de mantener
 *
 * FLUJO CON FACADE:
 * ────────────────
 * 1. Cliente llama ReservationFacade.createReservation()
 * 2. La Fachada internamente:
 *    - Valida usuario
 *    - Verifica disponibilidad
 *    - Procesa pago
 *    - Confirma reserva
 * 3. Cliente recibe resultado final
 * ✓ Acoplamiento mínimo
 * ✓ Lógica centralizada
 * ✓ Fácil de mantener
 *
 * ¿VENTAJAS?
 * ──────────
 * ✅ Simplifica interfaces complejas
 * ✅ Desacoplamiento
 * ✅ Coordina múltiples servicios
 * ✅ Punto único de cambio
 * ✅ Fácil de entender y usar
 *
 * ¿CUÁNDO USARLO?
 * ───────────────
 * ✅ Múltiples servicios
 * ✅ Procesos complejos
 * ✅ Necesidad de coordinación
 * ✅ Queremos simplificar para clientes
 * ✅ Reducir acoplamiento
 *
 * DIFERENCIA CON ADAPTER:
 * ──────────────────────
 * ADAPTER: Adapta interfaz incompatible
 * FACADE: Simplifica interfaz compleja
 *
 * DIFERENCIA CON DECORATOR:
 * ────────────────────────
 * DECORATOR: Agrega funcionalidad a objeto
 * FACADE: Simplifica sistema completo
 */
