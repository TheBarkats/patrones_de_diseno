import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SingletonService } from './singleton.service';

@Component({
  selector: 'app-singleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singleton.component.html',
  styleUrls: ['./singleton.component.css'],
})
export class SingletonComponent {
  result: string = '';

  constructor(private service: SingletonService) {}

  testInstances(): void {
    const result = this.service.testInstances();
    this.result = JSON.stringify(result, null, 2);
  }

  demonstrate(): void {
    const logs = this.service.demonstrateOperations();
    this.result = logs.join('\n');
  }
}