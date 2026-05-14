/**
 * PATRÓN FLYWEIGHT - Componente Angular
 *
 * Este componente demuestra cómo el patrón Flyweight optimiza
 * la memoria en sistemas con muchos objetos similares.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameMapService, MemoryStats } from './game-map.service';
import { Tree } from './tree.model';

@Component({
  selector: 'app-game-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.css'],
})
export class GameMapComponent implements OnInit {
  /**
   * Todos los árboles en el mapa
   */
  trees: Tree[] = [];

  /**
   * Número de árboles a generar
   */
  treeCount: number = 1000;

  /**
   * Estadísticas de memoria
   */
  memoryStats: MemoryStats | null = null;

  /**
   * Información de tipos de árboles
   */
  treeTypes: Array<{
    name: string;
    count: number;
    color: string;
  }> = [];

  /**
   * Mapa visual para renderizar los árboles
   */
  mapWidth: number = 800;
  mapHeight: number = 600;

  /**
   * Control de filtro
   */
  selectedTreeType: string = 'All';

  /**
   * Árbol seleccionado
   */
  selectedTree: Tree | null = null;

  /**
   * Estado del componente
   */
  isMapGenerated = false;
  showDetailedView = false;

  constructor(private mapService: GameMapService) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    // No generar mapa automáticamente para que el usuario elija
    // la cantidad de árboles a renderizar
  }

  /**
   * Genera un nuevo mapa con la cantidad especificada de árboles
   *
   * DEMOSTRACIÓN DEL FLYWEIGHT:
   * 1. Usuario especifica cantidad (ej: 10,000 árboles)
   * 2. Se generan posiciones únicas para cada árbol
   * 3. Pero los tipos se reutilizan desde TreeTypeFactory
   * 4. Resultado: Memoria mínima
   */
  generateMap(): void {
    if (this.treeCount < 1 || this.treeCount > 50000) {
      alert('Por favor, ingresa un número entre 1 y 50,000');
      return;
    }

    console.log(`🎮 Generando mapa con ${this.treeCount} árboles...`);

    // Generar mapa a través del servicio
    this.mapService.generateMap(this.treeCount, this.mapWidth, this.mapHeight);

    // Obtener árboles
    this.trees = this.mapService.getTrees();

    // Obtener estadísticas
    this.memoryStats = this.mapService.getMemoryStatistics();

    // Obtener información de tipos
    this.treeTypes = this.mapService.getTreeTypesInfo();

    // Marcar como generado
    this.isMapGenerated = true;

    // Log de la optimización
    console.log(
      `✅ Mapa generado: ${this.trees.length} árboles, ${this.memoryStats?.totalTreeTypes} tipos`
    );
    console.log(
      `💾 Ahorro de memoria: ${this.memoryStats?.memoriaAhorrada} (${this.memoryStats?.porcentajeAhorro}%)`
    );
  }

  /**
   * Obtiene los árboles a mostrar (filtrados o todos)
   */
  getDisplayedTrees(): Tree[] {
    if (this.selectedTreeType === 'All') {
      return this.trees;
    }
    return this.mapService.getTreesByType(this.selectedTreeType);
  }

  /**
   * Selecciona un árbol para mostrar detalles
   */
  selectTree(tree: Tree): void {
    this.selectedTree = tree;
  }

  /**
   * Calcula el tamaño visual del círculo de un árbol
   */
  getTreeRadius(): number {
    return 4;
  }

  /**
   * Limpia el mapa
   */
  clearMap(): void {
    this.mapService.clearMap();
    this.trees = [];
    this.memoryStats = null;
    this.treeTypes = [];
    this.isMapGenerated = false;
    this.selectedTree = null;
  }

  /**
   * Aumenta la cantidad de árboles
   */
  increaseTreeCount(): void {
    this.treeCount = Math.min(this.treeCount + 1000, 50000);
  }

  /**
   * Disminuye la cantidad de árboles
   */
  decreaseTreeCount(): void {
    this.treeCount = Math.max(this.treeCount - 1000, 100);
  }

  /**
   * EXPLICACIÓN DETALLADA DEL PATRÓN FLYWEIGHT:
   *
   * ¿QUÉ PROBLEMA RESUELVE?
   * ────────────────────────
   * Imagine un videojuego con 1 millón de árboles.
   * Si cada árbol almacena:
   *   - Tipo: "Pine"
   *   - Color: "#228B22"
   *   - Textura: "bark_pine_001.jpg"
   *   - X, Y: posición
   *
   * 999,900 árboles guardan "Pine", "#228B22", "bark_pine_001.jpg"
   * ¡DUPLICACIÓN MASIVA DE DATOS!
   *
   * MEMORIA CONSUMIDA:
   * - Sin Flyweight: 35 bytes/árbol × 1,000,000 = 35 MB
   * - Con Flyweight: ~12 MB (90% de ahorro)
   *
   * ¿CÓMO LO RESUELVE?
   * ──────────────────
   * El patrón separa dos tipos de datos:
   *
   * 1️⃣ ESTADO INTRÍNSECO (compartido):
   *    - Tipo, color, textura del árbol
   *    - Se crea UNA sola vez por tipo
   *    - Se comparte entre todos los árboles del mismo tipo
   *    - TreeType (objeto compartido)
   *
   * 2️⃣ ESTADO EXTRÍNSECO (único):
   *    - Posición X, Y del árbol
   *    - Es único para cada árbol
   *    - Se almacena en cada instancia
   *    - Tree (referencia a TreeType + X, Y)
   *
   * FLUJO:
   * ─────
   * Usuario quiere 10,000 Pinos
   *
   * Petición 1: "Dame un Pine en (100, 200)"
   *   → Factory crea TreeType "Pine"
   *   → Crea Tree con posición (100, 200)
   *
   * Peticiones 2-10,000: "Dame un Pine en (X, Y)"
   *   → Factory REUTILIZA TreeType "Pine"
   *   → Crea nuevos Tree con nuevas posiciones
   *
   * Resultado en memoria:
   * - TreeType "Pine": 27 bytes (×1)
   * - 10,000 Trees: 12 bytes cada uno
   * - Total: 27 + (12 × 10,000) = 120,027 bytes
   *
   * ¿VENTAJAS?
   * ──────────
   * ✅ Reducción de memoria (hasta 90%)
   * ✅ Mejor rendimiento (menos GC)
   * ✅ Escalabilidad (millones de objetos)
   * ✅ Patrón comprobado
   *
   * ¿DESVENTAJAS?
   * ──────────────
   * ❌ Complejidad añadida
   * ❌ Solo útil con muchos objetos
   * ❌ Necesita Factory
   *
   * ¿CUÁNDO USARLO?
   * ───────────────
   * ✅ Videojuegos (árboles, partículas, etc.)
   * ✅ Mapas con miles de elementos
   * ✅ Interfaces con muchos widgets
   * ✅ Sistemas de renderizado
   * ✅ Simulaciones grandes
   * ✅ Aplicaciones móviles (memoria limitada)
   *
   * CÓDIGO EN ESTA DEMOSTRACIÓN:
   * ─────────────────────────────
   * 1. Haz clic en "Generar Mapa"
   * 2. Elige cantidad (1,000 a 50,000 árboles)
   * 3. Observa:
   *    - Número de tipos creados (bajo)
   *    - Memoria ahorrada
   *    - Mapa visual con todos los árboles
   * 4. Clica en un árbol para ver detalles
   * 5. Nota que todos comparten TreeType
   */
}
