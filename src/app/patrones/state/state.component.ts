import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent {
  result: string = '';

  constructor(private service: StateService) {}

  demonstrate(): void {
    const log = this.service.demonstrateMediaPlayer();
    this.result = JSON.stringify(log, null, 2);
  }
}