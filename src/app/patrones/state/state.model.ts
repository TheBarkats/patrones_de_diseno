/**
 * ════════════════════════════════════════════════════════════════
 * PATRÓN: STATE
 * ════════════════════════════════════════════════════════════════
 * ¿QUÉ PROBLEMA RESUELVE?
 * Cambiar el comportamiento de un objeto cuando su estado interno cambia.
 * 
 * ¿POR QUÉ ES ADECUADO?
 * - Evita enormes switch/if en el código
 * - Cada estado encapsulado en su propia clase
 * - Transiciones claras entre estados
 * 
 * ¿QUÉ HACE?
 * Define estados y permite que un objeto cambie su comportamiento según su estado
 * ════════════════════════════════════════════════════════════════
 */

export interface State {
  play(): string;
  pause(): string;
  stop(): string;
  getName(): string;
}

export class PlayingState implements State {
  play(): string { return '⏸️ Ya está reproduciendo'; }
  pause(): string { return '⏸️ Pausado'; }
  stop(): string { return '⏹️ Detenido'; }
  getName(): string { return 'REPRODUCIENDO'; }
}

export class PausedState implements State {
  play(): string { return '▶️ Reproduciendo'; }
  pause(): string { return '⏸️ Ya está pausado'; }
  stop(): string { return '⏹️ Detenido'; }
  getName(): string { return 'PAUSADO'; }
}

export class StoppedState implements State {
  play(): string { return '▶️ Reproduciendo'; }
  pause(): string { return '⏸️ No puedes pausar, está detenido'; }
  stop(): string { return '⏹️ Ya está detenido'; }
  getName(): string { return 'DETENIDO'; }
}

export class MediaPlayer {
  private state: State;

  constructor() {
    this.state = new StoppedState();
  }

  setState(state: State): void {
    this.state = state;
  }

  play(): string {
    const result = this.state.play();
    if (result.includes('Reproduciendo')) {
      this.setState(new PlayingState());
    }
    return result;
  }

  pause(): string {
    const result = this.state.pause();
    if (result.includes('Pausado')) {
      this.setState(new PausedState());
    }
    return result;
  }

  stop(): string {
    const result = this.state.stop();
    this.setState(new StoppedState());
    return result;
  }

  getState(): string {
    return this.state.getName();
  }
}