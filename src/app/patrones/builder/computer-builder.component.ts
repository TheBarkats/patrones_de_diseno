/**
 * PATRÓN BUILDER - Componente Angular
 * 
 * Este componente demuestra el uso práctico del patrón Builder
 * permitiendo al usuario construir computadores personalizados.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ComputerBuilderService,
  ComputerConfiguration,
} from './computer-builder.service';
import { Computer } from './computer.model';

@Component({
  selector: 'app-computer-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './computer-builder.component.html',
  styleUrls: ['./computer-builder.component.css'],
})
export class ComputerBuilderComponent implements OnInit {
  /**
   * Todas las configuraciones de computadores
   */
  configurations: ComputerConfiguration[] = [];

  /**
   * Computador seleccionado para mostrar detalles
   */
  selectedComputer: Computer | null = null;

  /**
   * Opciones disponibles para cada componente
   */
  availableOptions = {
    processors: [] as string[],
    rams: [] as string[],
    gpus: [] as string[],
    storages: [] as string[],
    powerSupplies: [] as string[],
  };

  /**
   * Modelo para la construcción personalizada
   * El usuario selecciona cada componente paso a paso
   */
  customSpec = {
    processor: '',
    ram: '',
    gpu: '',
    storage: '',
    powerSupply: '',
  };

  /**
   * Estado de la UI
   */
  showCustomBuilder = false;
  buildMessage = '';

  constructor(private builderService: ComputerBuilderService) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    // Cargar configuraciones predefinidas
    this.loadConfigurations();

    // Cargar opciones disponibles
    this.availableOptions = this.builderService.getAvailableOptions();

    // Inicializar con valores predefinidos para mejor UX
    if (this.availableOptions.processors.length > 0) {
      this.customSpec.processor = this.availableOptions.processors[0];
      this.customSpec.ram = this.availableOptions.rams[0];
      this.customSpec.gpu = this.availableOptions.gpus[0];
      this.customSpec.storage = this.availableOptions.storages[0];
      this.customSpec.powerSupply = this.availableOptions.powerSupplies[0];
    }
  }

  /**
   * Carga todas las configuraciones desde el servicio
   */
  loadConfigurations(): void {
    this.configurations = this.builderService.getConfigurations();

    if (this.configurations.length > 0) {
      // Seleccionar la primera configuración por defecto
      this.selectConfiguration(this.configurations[0].id);
    }
  }

  /**
   * Selecciona una configuración y muestra sus detalles
   */
  selectConfiguration(configId: string): void {
    const config = this.builderService.getConfiguration(configId);
    if (config) {
      this.selectedComputer = config.computer;
      this.showCustomBuilder = false;
    }
  }

  /**
   * Activa el modo constructor personalizado
   */
  toggleCustomBuilder(): void {
    this.showCustomBuilder = !this.showCustomBuilder;

    if (this.showCustomBuilder) {
      this.buildMessage = '';
    }
  }

  /**
   * DEMOSTRACIÓN DEL PATRÓN BUILDER
   *
   * Aquí es donde usamos el patrón Builder:
   * 1. El usuario selecciona cada componente paso a paso
   * 2. El servicio utiliza el Builder para construir el computador
   * 3. Se retorna el computador completamente construido
   */
  buildCustomComputer(): void {
    // Validar que todos los campos estén completos
    if (
      !this.customSpec.processor ||
      !this.customSpec.ram ||
      !this.customSpec.gpu ||
      !this.customSpec.storage ||
      !this.customSpec.powerSupply
    ) {
      this.buildMessage = '❌ Por favor, selecciona todos los componentes';
      return;
    }

    // Usar el servicio para construir la configuración
    // El Builder hace el trabajo "pesado" por nosotros
    const newConfig = this.builderService.createCustomConfiguration(
      this.customSpec
    );

    // Agregar a la lista de configuraciones
    this.configurations.push(newConfig);

    // Seleccionar y mostrar el nuevo computador
    this.selectedComputer = newConfig.computer;

    // Mensaje de éxito
    this.buildMessage = `✅ ¡Computador personalizado creado exitosamente! Precio: $${newConfig.price.toLocaleString()}`;

    // Limpiar campos para nueva construcción
    setTimeout(() => {
      this.resetCustomSpec();
    }, 500);
  }

  /**
   * Reinicia los campos del constructor personalizado
   */
  resetCustomSpec(): void {
    this.customSpec = {
      processor: this.availableOptions.processors[0],
      ram: this.availableOptions.rams[0],
      gpu: this.availableOptions.gpus[0],
      storage: this.availableOptions.storages[0],
      powerSupply: this.availableOptions.powerSupplies[0],
    };
  }

  /**
   * Elimina una configuración de la lista
   */
  deleteConfiguration(configId: string): void {
    this.builderService.deleteConfiguration(configId);
    this.loadConfigurations();

    if (
      this.selectedComputer &&
      this.configurations.length === 0
    ) {
      this.selectedComputer = null;
    }
  }

  /**
   * Obtiene el precio total del computador seleccionado
   */
  getSelectedPrice(): number {
    return this.selectedComputer?.getEstimatedPrice() || 0;
  }

  /**
   * EXPLICACIÓN DEL PATRÓN BUILDER:
   *
   * ¿QUÉ PROBLEMA RESUELVE?
   * --------------------------
   * Cuando un objeto (Computer) tiene muchas propiedades diferentes,
   * crear un constructor con todos los parámetros es complicado:
   *   new Computer(proc, ram, gpu, storage, power, ... más parámetros)
   *
   * Esto es difícil de leer y mantener.
   *
   * ¿CÓMO LO RESUELVE?
   * -------------------
   * El patrón Builder permite construir el objeto paso a paso:
   *   builder
   *     .setProcessor(...)
   *     .setRam(...)
   *     .setGpu(...)
   *     .setStorage(...)
   *     .setPowerSupply(...)
   *     .build()
   *
   * ¿VENTAJAS?
   * -----------
   * ✅ Código más legible
   * ✅ Orden flexible de construcción
   * ✅ Fácil agregar nuevos componentes sin cambiar todo
   * ✅ Permite construcción paso a paso
   * ✅ Encadenamiento de métodos (fluent API)
   *
   * ¿CUÁNDO USARLO?
   * ----------------
   * - Objetos complejos con muchas propiedades
   * - Construcción que requiere múltiples pasos
   * - Diferentes variaciones del mismo objeto
   * - Inmutabilidad de objetos
   */
}
