import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Light, RemoteControl, TurnOffCommand, TurnOnCommand } from './command.model';
import { CommandService } from './command.service';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent {
  light: Light = new Light();
  remote: RemoteControl = new RemoteControl();
  isLightOn: boolean = false;
  commandLog: { time: string; command: string; result: string }[] = [];
  historyCount: number = 0;

  constructor(private service: CommandService) {}

  executeCommand(command: 'on' | 'off'): void {
    const cmd = command === 'on' ? new TurnOnCommand(this.light) : new TurnOffCommand(this.light);
    const result = this.remote.executeCommand(cmd);
    this.isLightOn = command === 'on';

    this.commandLog.unshift({
      time: new Date().toLocaleTimeString(),
      command: command === 'on' ? 'ENCENDER' : 'APAGAR',
      result,
    });

    if (this.commandLog.length > 10) {
      this.commandLog.pop();
    }

    this.historyCount++;
  }

  undo(): void {
    const result = this.remote.undo();
    this.isLightOn = !this.isLightOn;

    this.commandLog.unshift({
      time: new Date().toLocaleTimeString(),
      command: 'UNDO',
      result,
    });

    if (this.commandLog.length > 10) {
      this.commandLog.pop();
    }
  }

  resetRemote(): void {
    this.light = new Light();
    this.remote = new RemoteControl();
    this.isLightOn = false;
    this.commandLog = [];
    this.historyCount = 0;
  }
}