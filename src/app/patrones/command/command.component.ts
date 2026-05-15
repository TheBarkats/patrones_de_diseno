import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommandService } from './command.service';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent {
  result: string = '';

  constructor(private service: CommandService) {}

  demonstrate(): void {
    const log = this.service.demonstrateCommandPattern();
    this.result = log.join('\n');
  }
}