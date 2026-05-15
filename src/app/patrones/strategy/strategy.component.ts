import { Component } from '@angular/core';
import { StrategyService } from './strategy.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
})
export class StrategyComponent {
  result: string = '';

  constructor(private service: StrategyService) {}

  demonstrate(): void {
    const results = this.service.demonstrateDifferentPayments();
    this.result = JSON.stringify(results, null, 2);
  }
}