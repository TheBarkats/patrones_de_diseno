/**
 * PATRÓN FLYWEIGHT - Modelos
 *
 * Este archivo implementa el patrón Flyweight para optimizar memoria
 * en un sistema de renderizado de mapas con miles de árboles.
 *
 * PROBLEMA RESUELTO:
 * Si tenemos 10,000 árboles, cada uno almacenando su textura, color
 * y tipo, consumiríamos MUCHA memoria. Flyweight comparte esa información.
 *
 * VENTAJAS:
 * - Reducción dramática de memoria (hasta 90%)
 * - Escalabilidad a millones de objetos
 * - Compartición eficiente de datos
 */

/**
 * ═══════════════════════════════════════════════════════════
 * ESTADO INTRÍNSECO (compartido) - TreeType
 * ═══════════════════════════════════════════════════════════
 *
 * Estos datos NO cambian y se comparten entre todos los árboles
 * de un mismo tipo.
 */

/**
 * TreeType representa el estado INTRÍNSECO de un árbol
 * Esto es: lo que es igual en TODOS los árboles de ese tipo
 *
 * EJEMPLO:
 * - Todos los pinos tienen la MISMA textura
 * - Todos los pinos tienen el MISMO color
 * - Todos los pinos son del MISMO tipo
 *
 * En lugar de almacenar esto 1000 veces, lo almacenamos UNA sola vez
 * y todos los pinos lo comparten
 */
export class TreeType {
  readonly name: string; // "Pine", "Oak", "Birch", etc.
  readonly color: string; // "#228B22" (verde oscuro para pinos)
  readonly texture: string; // "bark_pine_001.jpg"

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * ESTADO EXTRÍNSECO (único) - Tree
 * ═══════════════════════════════════════════════════════════
 *
 * Estos datos SÍ cambian entre árboles
 * Se almacenan POR CADA instancia
 */

/**
 * Tree representa un árbol individual en el mapa
 * Tiene solo datos ÚNICOS: posición en el mapa
 *
 * La propiedad `treeType` es una REFERENCIA a un TreeType compartido
 * No duplicamos la información del tipo
 */
export class Tree {
  readonly x: number; // Posición X del árbol en el mapa
  readonly y: number; // Posición Y del árbol en el mapa
  readonly treeType: TreeType; // REFERENCIA compartida al tipo de árbol

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType; // Comparte información
  }

  /**
   * Obtiene el color del árbol desde el TreeType compartido
   */
  getColor(): string {
    return this.treeType.color;
  }

  /**
   * Obtiene la textura del árbol desde el TreeType compartido
   */
  getTexture(): string {
    return this.treeType.texture;
  }

  /**
   * Obtiene el nombre del tipo de árbol
   */
  getTreeTypeName(): string {
    return this.treeType.name;
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * FLYWEIGHT FACTORY - TreeTypeFactory
 * ═══════════════════════════════════════════════════════════
 *
 * El Factory es CRÍTICO en el patrón Flyweight.
 * Su trabajo: asegurar que solo existe UN TreeType para cada tipo
 *
 * CÓMO FUNCIONA:
 * - Primera solicitud: "Dame un Pine" → Crea uno nuevo
 * - Segunda solicitud: "Dame un Pine" → Devuelve el mismo (reutiliza)
 * - Resultado: Solo 1 Pine en memoria, no 2
 */

/**
 * TreeTypeFactory gestiona la creación y reutilización de TreeTypes
 *
 * Es como un almacén de tipos de árboles:
 * - Si el tipo ya existe, nos lo presta
 * - Si no existe, lo crea y nos lo presta
 *
 * Garantiza que NUNCA hay duplicados
 */
export class TreeTypeFactory {
  /**
   * Almacén de tipos de árboles ya creados
   * Clave: nombre del tipo, Valor: TreeType compartido
   */
  private static treeTypes: Map<string, TreeType> = new Map();

  /**
   * Obtiene un TreeType, creándolo solo si no existe
   *
   * DEMOSTRACIÓN DEL FLYWEIGHT:
   * Si pides 100 pinos, el factory:
   * - Primera vez: Crea UN TreeType "Pine"
   * - Veces 2-100: Devuelve EL MISMO TreeType
   *
   * Resultado: 1 TreeType en memoria para 100 árboles
   *
   * @param name Nombre del tipo (ej: "Pine")
   * @param color Color hexadecimal (ej: "#228B22")
   * @param texture Nombre del archivo (ej: "bark.jpg")
   * @returns TreeType compartido (reutilizado o creado)
   */
  static getOrCreateTreeType(
    name: string,
    color: string,
    texture: string
  ): TreeType {
    // Verificar si ya existe
    if (!this.treeTypes.has(name)) {
      // No existe, crearlo
      const newTreeType = new TreeType(name, color, texture);
      this.treeTypes.set(name, newTreeType);
      console.log(`🌲 Nuevo TreeType creado: ${name}`);
    } else {
      console.log(`♻️ TreeType reutilizado: ${name}`);
    }

    // Devolver el tipo (nuevo o reutilizado)
    return this.treeTypes.get(name)!;
  }

  /**
   * Retorna estadísticas sobre los tipos creados
   * Útil para demostrar cómo el patrón reduce memoria
   */
  static getStatistics(): {
    totalTypesCreated: number;
    typeNames: string[];
  } {
    return {
      totalTypesCreated: this.treeTypes.size,
      typeNames: Array.from(this.treeTypes.keys()),
    };
  }

  /**
   * Reinicia el factory (útil para pruebas)
   */
  static reset(): void {
    this.treeTypes.clear();
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * EXPLICACIÓN DEL PATRÓN FLYWEIGHT
 * ═══════════════════════════════════════════════════════════
 *
 * ANALOGÍA REAL:
 * Imagine un videojuego con 10,000 árboles en un mapa:
 *
 * ❌ SIN FLYWEIGHT:
 * Cada árbol almacena:
 *   - Tipo: "Pine" (7 bytes)
 *   - Color: "#228B22" (7 bytes)
 *   - Textura: "bark_pine.jpg" (13 bytes)
 *   - X, Y: (8 bytes)
 * Total: 35 bytes × 10,000 = 350 KB para datos de tipo
 *
 * ✅ CON FLYWEIGHT:
 * TreeType creado UNA sola vez: 27 bytes
 * Cada árbol solo almacena:
 *   - X, Y: (8 bytes)
 *   - Referencia a TreeType: (4 bytes)
 * Total: 12 bytes × 10,000 + 27 = 120 KB
 *
 * AHORRO: 230 KB (66% de reducción)
 *
 * CON MILLONES DE OBJETOS:
 * - Sin Flyweight: 35 MB
 * - Con Flyweight: 12 MB
 * - AHORRO: 23 MB
 *
 * ¿CUÁNDO USARLO?
 * ✅ Muchos objetos similares
 * ✅ Datos repetidos
 * ✅ Memoria limitada (móviles)
 * ✅ Videojuegos
 * ✅ Interfaces con miles de elementos
 *
 * ¿CUÁNDO NO?
 * ❌ Pocos objetos (menor beneficio)
 * ❌ Datos altamente únicos
 * ❌ Sincronización compleja
 */
