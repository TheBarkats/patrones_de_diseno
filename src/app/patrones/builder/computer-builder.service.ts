/**
 * PATRÓN BUILDER - Servicio
 * 
 * Este servicio encapsula la lógica de construcción de computadores
 * Proporciona métodos para crear diferentes configuraciones
 */

import { Injectable } from '@angular/core';
import { Computer, ComputerBuilder, ComputerDirector } from './computer.model';

/**
 * Configuración predefinida para un computador
 * Usado para almacenar y recuperar configuraciones
 */
export interface ComputerConfiguration {
  id: string;
  name: string;
  type: 'high-end' | 'mid-range' | 'budget' | 'custom';
  computer: Computer;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ComputerBuilderService {
  private configurations: ComputerConfiguration[] = [];
  private configIdCounter: number = 1;

  constructor() {
    // Inicializar con configuraciones predefinidas
    this.loadDefaultConfigurations();
  }

  /**
   * Carga las configuraciones predefinidas por defecto
   */
  private loadDefaultConfigurations(): void {
    const builder = new ComputerBuilder();
    const director = new ComputerDirector(builder);

    // Configuración High-End
    const highEnd = director.buildGamerHighEnd();
    this.configurations.push({
      id: 'pre-1',
      name: 'Gamer High-End',
      type: 'high-end',
      computer: highEnd,
      price: highEnd.getEstimatedPrice(),
    });

    // Configuración Mid-Range
    const midRange = director.buildGamerMidRange();
    this.configurations.push({
      id: 'pre-2',
      name: 'Gamer Mid-Range',
      type: 'mid-range',
      computer: midRange,
      price: midRange.getEstimatedPrice(),
    });

    // Configuración Budget-Friendly
    const budget = director.buildBudgetFriendly();
    this.configurations.push({
      id: 'pre-3',
      name: 'Budget-Friendly',
      type: 'budget',
      computer: budget,
      price: budget.getEstimatedPrice(),
    });
  }

  /**
   * Retorna todas las configuraciones disponibles
   */
  getConfigurations(): ComputerConfiguration[] {
    return [...this.configurations];
  }

  /**
   * Obtiene una configuración específica por ID
   */
  getConfiguration(id: string): ComputerConfiguration | undefined {
    return this.configurations.find((config) => config.id === id);
  }

  /**
   * Crea una configuración personalizada paso a paso
   * Retorna el resultado para que el componente lo use
   */
  createCustomConfiguration(customSpec: {
    processor: string;
    ram: string;
    gpu: string;
    storage: string;
    powerSupply: string;
  }): ComputerConfiguration {
    const builder = new ComputerBuilder();

    // Construir computador paso a paso
    const computer = builder
      .setProcessor(customSpec.processor)
      .setRam(customSpec.ram)
      .setGpu(customSpec.gpu)
      .setStorage(customSpec.storage)
      .setPowerSupply(customSpec.powerSupply)
      .build();

    const configuration: ComputerConfiguration = {
      id: `custom-${this.configIdCounter++}`,
      name: 'Configuración Personalizada',
      type: 'custom',
      computer: computer,
      price: computer.getEstimatedPrice(),
    };

    this.configurations.push(configuration);
    return configuration;
  }

  /**
   * Elimina una configuración
   */
  deleteConfiguration(id: string): void {
    this.configurations = this.configurations.filter((c) => c.id !== id);
  }

  /**
   * Obtiene opciones disponibles para cada componente
   * Usado por el componente para llenar dropdowns
   */
  getAvailableOptions(): {
    processors: string[];
    rams: string[];
    gpus: string[];
    storages: string[];
    powerSupplies: string[];
  } {
    return {
      processors: ['Intel i9-13900K', 'Intel i7-13700K', 'AMD Ryzen 9 7950X'],
      rams: ['16GB DDR4', '32GB DDR5', '64GB DDR5'],
      gpus: ['RTX 4090', 'RTX 4080', 'RX 7900 XTX'],
      storages: ['1TB NVMe SSD', '2TB NVMe SSD', '4TB SSD'],
      powerSupplies: ['850W Gold', '1000W Gold', '1200W Platinum'],
    };
  }
}
