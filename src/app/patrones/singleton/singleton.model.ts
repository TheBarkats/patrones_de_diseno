/**
 * ════════════════════════════════════════════════════════════════
 * PATRÓN: SINGLETON
 * ════════════════════════════════════════════════════════════════
 * ¿QUÉ PROBLEMA RESUELVE?
 * Garantizar que una clase tenga UNA ÚNICA instancia durante toda la ejecución.
 * 
 * ¿POR QUÉ ES ADECUADO?
 * - Evita duplicación de recursos costosos (conexiones, configuración)
 * - Garantiza estado centralizado consistente
 * 
 * ¿QUÉ HACE?
 * Constructor privado + método estático getInstance() que retorna la misma instancia
 * ════════════════════════════════════════════════════════════════
 */

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionId: string;
  private isConnected: boolean = false;
  private connectedAt: Date | null = null;

  private constructor() {
    this.connectionId = `DB-${Date.now()}`;
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    if (this.isConnected) return;
    this.isConnected = true;
    this.connectedAt = new Date();
  }

  public disconnect(): void {
    this.isConnected = false;
  }

  public query(sql: string): string {
    if (!this.isConnected) return '❌ No hay conexión';
    return `✅ Ejecutando: ${sql}`;
  }

  public getStatus(): {
    connectionId: string;
    isConnected: boolean;
    connectedAt: Date | null;
  } {
    return {
      connectionId: this.connectionId,
      isConnected: this.isConnected,
      connectedAt: this.connectedAt,
    };
  }
}