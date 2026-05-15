/**
 * ════════════════════════════════════════════════════════════════
 * PATRÓN: FACTORY METHOD
 * ════════════════════════════════════════════════════════════════
 * ¿QUÉ PROBLEMA RESUELVE?
 * Crear objetos sin que el cliente conozca las clases específicas.
 * 
 * ¿POR QUÉ ES ADECUADO?
 * - Desacopla la creación de la lógica de negocio
 * - Facilita agregar nuevos tipos sin modificar código existente
 * 
 * ¿QUÉ HACE?
 * Una factory crea objetos basada en un parámetro, sin que el cliente sepa cuál instancia
 * ════════════════════════════════════════════════════════════════
 */

export interface IVehicle {
  getType(): string;
  getDescription(): string;
  getMaxSpeed(): number;
}

export class Car implements IVehicle {
  getType(): string { return '🚗 Automóvil'; }
  getDescription(): string { return 'Vehículo de 4 ruedas'; }
  getMaxSpeed(): number { return 200; }
}

export class Motorcycle implements IVehicle {
  getType(): string { return '🏍️  Motocicleta'; }
  getDescription(): string { return 'Vehículo de 2 ruedas'; }
  getMaxSpeed(): number { return 250; }
}

export class Truck implements IVehicle {
  getType(): string { return '🚚 Camión'; }
  getDescription(): string { return 'Vehículo de carga'; }
  getMaxSpeed(): number { return 120; }
}

export class VehicleFactory {
  static create(type: string): IVehicle {
    switch (type.toLowerCase()) {
      case 'car': return new Car();
      case 'motorcycle': return new Motorcycle();
      case 'truck': return new Truck();
      default: throw new Error(`Tipo desconocido: ${type}`);
    }
  }

  static getTypes(): string[] {
    return ['car', 'motorcycle', 'truck'];
  }
}