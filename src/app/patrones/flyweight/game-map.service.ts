/**
 * PATRÓN FLYWEIGHT - Servicio
 *
 * Este servicio gestiona la creación de árboles y proporciona
 * estadísticas sobre la optimización de memoria.
 */

import { Injectable } from '@angular/core';
import { Tree, TreeType, TreeTypeFactory } from './tree.model';

/**
 * Interfaz para almacenar estadísticas de memoria
 */
export interface MemoryStats {
  totalTrees: number;
  totalTreeTypes: number;
  memoriaEstimadaSinFlyweight: string;
  memoriaEstimadaConFlyweight: string;
  memoriaAhorrada: string;
  porcentajeAhorro: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameMapService {
  /**
   * Lista de todos los árboles en el mapa
   */
  private trees: Tree[] = [];

  /**
   * Configuraciones de árboles predefinidas
   * Cada una con su tipo, color y textura
   */
  private treeConfigurations = [
    { name: 'Pine', color: '#228B22', texture: 'bark_pine_001.jpg' },
    { name: 'Oak', color: '#3A5F0B', texture: 'bark_oak_001.jpg' },
    { name: 'Birch', color: '#D3D3D3', texture: 'bark_birch_001.jpg' },
    { name: 'Maple', color: '#8B4513', texture: 'bark_maple_001.jpg' },
  ];

  constructor() {
    // Precargar los tipos de árboles
    this.initializeTreeTypes();
  }

  /**
   * Inicializa los tipos de árboles en el factory
   */
  private initializeTreeTypes(): void {
    for (const config of this.treeConfigurations) {
      TreeTypeFactory.getOrCreateTreeType(
        config.name,
        config.color,
        config.texture
      );
    }
  }

  /**
   * Genera un mapa con N árboles distribuidos aleatoriamente
   *
   * DEMOSTRACIÓN DEL FLYWEIGHT:
   * Si generamos 1000 árboles:
   * - Sin Flyweight: Cada árbol almacena tipo, color, textura
   * - Con Flyweight: Todos comparten TreeType reutilizado
   *
   * @param treeCount Número de árboles a generar
   * @param mapWidth Ancho del mapa
   * @param mapHeight Alto del mapa
   */
  generateMap(
    treeCount: number,
    mapWidth: number = 800,
    mapHeight: number = 600
  ): void {
    // Limpiar árboles previos
    this.trees = [];

    for (let i = 0; i < treeCount; i++) {
      // Posición aleatoria en el mapa
      const x = Math.random() * mapWidth;
      const y = Math.random() * mapHeight;

      // Elegir tipo aleatorio
      const randomConfig =
        this.treeConfigurations[
          Math.floor(Math.random() * this.treeConfigurations.length)
        ];

      // IMPORTANTE: Usar factory para obtener tipo compartido
      const treeType = TreeTypeFactory.getOrCreateTreeType(
        randomConfig.name,
        randomConfig.color,
        randomConfig.texture
      );

      // Crear árbol con el tipo compartido
      const tree = new Tree(x, y, treeType);
      this.trees.push(tree);
    }
  }

  /**
   * Retorna todos los árboles del mapa
   */
  getTrees(): Tree[] {
    return [...this.trees];
  }

  /**
   * Obtiene árboles filtrados por tipo
   */
  getTreesByType(typeName: string): Tree[] {
    return this.trees.filter((tree) => tree.getTreeTypeName() === typeName);
  }

  /**
   * Calcula estadísticas sobre la optimización de memoria
   *
   * CÁLCULO:
   * - Sin Flyweight: Cada árbol guarda tipo, color, textura = ~35 bytes
   * - Con Flyweight: Cada árbol solo guarda X, Y, referencia = ~12 bytes
   */
  getMemoryStatistics(): MemoryStats {
    const totalTrees = this.trees.length;
    const totalTreeTypes = TreeTypeFactory.getStatistics().totalTypesCreated;

    // Bytes por árbol (aproximado)
    const bytesPerTreeWithoutFlyweight = 35; // tipo + color + textura + X + Y
    const bytesPerTreeWithFlyweight = 12; // X + Y + referencia
    const bytesPerTreeType = 27; // tipo, color, textura compartidos

    // Cálculo de memoria
    const memoriaConFlyweight =
      totalTrees * bytesPerTreeWithFlyweight +
      totalTreeTypes * bytesPerTreeType;
    const memoriaSinFlyweight = totalTrees * bytesPerTreeWithoutFlyweight;
    const memoriaAhorrada = memoriaSinFlyweight - memoriaConFlyweight;
    const porcentajeAhorro =
      totalTrees > 0 ? (memoriaAhorrada / memoriaSinFlyweight) * 100 : 0;

    return {
      totalTrees,
      totalTreeTypes,
      memoriaEstimadaSinFlyweight: this.formatBytes(memoriaSinFlyweight),
      memoriaEstimadaConFlyweight: this.formatBytes(memoriaConFlyweight),
      memoriaAhorrada: this.formatBytes(memoriaAhorrada),
      porcentajeAhorro: Math.round(porcentajeAhorro),
    };
  }

  /**
   * Formatea bytes a unidades legibles (KB, MB)
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Obtiene información sobre los tipos de árboles
   */
  getTreeTypesInfo(): Array<{
    name: string;
    count: number;
    color: string;
  }> {
    const stats = TreeTypeFactory.getStatistics();
    return stats.typeNames.map((name) => ({
      name,
      count: this.getTreesByType(name).length,
      color: this.trees.find((t) => t.getTreeTypeName() === name)
        ?.getColor() || '#000000',
    }));
  }

  /**
   * Reinicia el mapa
   */
  clearMap(): void {
    this.trees = [];
  }
}
