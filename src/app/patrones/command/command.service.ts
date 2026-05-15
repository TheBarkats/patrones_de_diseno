import { Injectable } from '@angular/core';
import {
  Light,
  RemoteControl,
  TurnOffCommand,
  TurnOnCommand,
} from './command.model';

@Injectable({ providedIn: 'root' })
export class CommandService {
  demonstrateCommandPattern(): string[] {
    const light = new Light();
    const remote = new RemoteControl();
    const log: string[] = [];

    log.push('=== PATRÓN COMMAND ===');
    log.push('');

    log.push(remote.executeCommand(new TurnOnCommand(light)));
    log.push('Estado: ' + light.getStatus());
    log.push('');

    log.push(remote.executeCommand(new TurnOffCommand(light)));
    log.push('Estado: ' + light.getStatus());
    log.push('');

    log.push(remote.executeCommand(new TurnOnCommand(light)));
    log.push('Estado: ' + light.getStatus());
    log.push('');

    log.push('--- DESHACER (UNDO) ---');
    log.push(remote.undo());
    log.push('Estado: ' + light.getStatus());
    log.push('');

    log.push(remote.undo());
    log.push('Estado: ' + light.getStatus());
    log.push('');

    log.push('Historial: ' + remote.getHistory().join(', '));

    return log;
  }
}