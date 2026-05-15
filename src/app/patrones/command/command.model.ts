/**
 * ════════════════════════════════════════════════════════════════
 * PATRÓN: COMMAND
 * ════════════════════════════════════════════════════════════════
 * ¿QUÉ PROBLEMA RESUELVE?
 * Encapsular solicitudes como objetos, permitiendo undo/redo y colas.
 * 
 * ¿POR QUÉ ES ADECUADO?
 * - Desacopla quién invoca de quién ejecuta
 * - Permite undo/redo
 * - Permite colas de comandos
 * 
 * ¿QUÉ HACE?
 * Envuelve acciones en objetos Command que pueden ejecutarse, deshacer o programarse
 * ════════════════════════════════════════════════════════════════
 */

export interface Command {
  execute(): string;
  undo(): string;
}

export class Light {
  private isOn: boolean = false;

  turnOn(): string {
    this.isOn = true;
    return '💡 Luz encendida';
  }

  turnOff(): string {
    this.isOn = false;
    return '⚫ Luz apagada';
  }

  getStatus(): string {
    return this.isOn ? 'Encendida' : 'Apagada';
  }
}

export class TurnOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): string {
    return this.light.turnOn();
  }

  undo(): string {
    return this.light.turnOff();
  }
}

export class TurnOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): string {
    return this.light.turnOff();
  }

  undo(): string {
    return this.light.turnOn();
  }
}

export class RemoteControl {
  private commands: Command[] = [];
  private history: Command[] = [];

  executeCommand(command: Command): string {
    const result = command.execute();
    this.history.push(command);
    return result;
  }

  undo(): string {
    const command = this.history.pop();
    if (!command) return 'No hay comandos para deshacer';
    return command.undo();
  }

  getHistory(): string[] {
    return this.history.map((_, i) => `Comando ${i + 1}`);
  }
}