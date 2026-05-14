/**
 * PATRÓN BUILDER - Modelos e Interfaces
 * 
 * Este archivo contiene las clases que representan los componentes
 * de un computador gamer y la estructura completa del patrón Builder.
 * 
 * PROBLEMA RESUELTO:
 * Cuando un objeto es complejo (muchas propiedades), su construcción
 * se vuelve complicada. El Builder nos permite construirlo paso a paso.
 * 
 * VENTAJAS:
 * - Código más legible y mantenible
 * - Construcción flexible de objetos
 * - Evita constructores con muchos parámetros
 */

/**
 * Interface que define los componentes de un computador gamer
 */
export interface IComputer {
  processor: string;
  ram: string;
  gpu: string;
  storage: string;
  powerSupply: string;
  description(): string;
}

/**
 * Clase que representa el PRODUCTO final
 * Contiene todas las propiedades del computador construido
 */
export class Computer implements IComputer {
  processor: string = '';
  ram: string = '';
  gpu: string = '';
  storage: string = '';
  powerSupply: string = '';

  /**
   * Retorna una descripción legible del computador
   */
  description(): string {
    return `
      ESPECIFICACIONES DEL COMPUTADOR GAMER:
      ═══════════════════════════════════════
      • Procesador: ${this.processor}
      • Memoria RAM: ${this.ram}
      • Tarjeta Gráfica: ${this.gpu}
      • Almacenamiento: ${this.storage}
      • Fuente de Poder: ${this.powerSupply}
    `;
  }

  /**
   * Calcula un precio estimado basado en los componentes
   */
  getEstimatedPrice(): number {
    const prices: { [key: string]: number } = {
      'Intel i9-13900K': 600,
      'Intel i7-13700K': 450,
      'AMD Ryzen 9 7950X': 550,
      '32GB DDR5': 200,
      '16GB DDR4': 80,
      '64GB DDR5': 400,
      'RTX 4090': 1600,
      'RTX 4080': 1200,
      'RX 7900 XTX': 900,
      '2TB NVMe SSD': 250,
      '1TB NVMe SSD': 120,
      '4TB SSD': 400,
      '850W Gold': 150,
      '1000W Gold': 200,
      '1200W Platinum': 300,
    };

    let total = 0;
    [this.processor, this.ram, this.gpu, this.storage, this.powerSupply].forEach(
      (component) => {
        total += prices[component] || 0;
      }
    );

    return total;
  }
}

/**
 * Interface BUILDER - Define qué métodos debe tener un constructor
 * Cada método construye una parte del producto
 */
export interface IComputerBuilder {
  setProcessor(processor: string): IComputerBuilder;
  setRam(ram: string): IComputerBuilder;
  setGpu(gpu: string): IComputerBuilder;
  setStorage(storage: string): IComputerBuilder;
  setPowerSupply(powerSupply: string): IComputerBuilder;
  build(): Computer;
}

/**
 * CONCRETE BUILDER - Implementación concreta del Builder
 * Construye un Computer paso a paso
 * 
 * CÓMO FUNCIONA:
 * - Cada método retorna 'this' para permitir encadenamiento (fluent API)
 * - El método build() retorna el objeto finalizado
 */
export class ComputerBuilder implements IComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  /**
   * Configura el procesador del computador
   */
  setProcessor(processor: string): IComputerBuilder {
    this.computer.processor = processor;
    return this;
  }

  /**
   * Configura la memoria RAM
   */
  setRam(ram: string): IComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  /**
   * Configura la tarjeta gráfica
   */
  setGpu(gpu: string): IComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  /**
   * Configura el almacenamiento
   */
  setStorage(storage: string): IComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  /**
   * Configura la fuente de poder
   */
  setPowerSupply(powerSupply: string): IComputerBuilder {
    this.computer.powerSupply = powerSupply;
    return this;
  }

  /**
   * Retorna el computador construido
   * IMPORTANTE: Crea una nueva instancia vacía para el próximo builder
   */
  build(): Computer {
    const builtComputer = this.computer;
    this.computer = new Computer(); // Reinicia para construcciones futuras
    return builtComputer;
  }
}

/**
 * DIRECTOR - Controla el proceso de construcción
 * 
 * El Director no construye directamente, sino que utiliza el Builder
 * para crear objetos complejos siguiendo algoritmos específicos.
 * 
 * BENEFICIO: Separa la lógica de construcción de los detalles técnicos
 */
export class ComputerDirector {
  private builder: IComputerBuilder;

  constructor(builder: IComputerBuilder) {
    this.builder = builder;
  }

  /**
   * Construye un computador GAMER HIGH-END
   * Configuración premium para gaming profesional
   */
  buildGamerHighEnd(): Computer {
    return this.builder
      .setProcessor('Intel i9-13900K')
      .setRam('64GB DDR5')
      .setGpu('RTX 4090')
      .setStorage('2TB NVMe SSD')
      .setPowerSupply('1200W Platinum')
      .build();
  }

  /**
   * Construye un computador GAMER MID-RANGE
   * Equilibrio entre rendimiento y precio
   */
  buildGamerMidRange(): Computer {
    return this.builder
      .setProcessor('Intel i7-13700K')
      .setRam('32GB DDR5')
      .setGpu('RTX 4080')
      .setStorage('1TB NVMe SSD')
      .setPowerSupply('850W Gold')
      .build();
  }

  /**
   * Construye un computador BUDGET-FRIENDLY
   * Configuración económica para tareas básicas
   */
  buildBudgetFriendly(): Computer {
    return this.builder
      .setProcessor('AMD Ryzen 9 7950X')
      .setRam('16GB DDR4')
      .setGpu('RX 7900 XTX')
      .setStorage('1TB NVMe SSD')
      .setPowerSupply('850W Gold')
      .build();
  }
}
