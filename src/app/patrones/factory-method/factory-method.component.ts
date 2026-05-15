import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FactoryMethodService } from './factory-method.service';

@Component({
  selector: 'app-factory-method',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factory-method.component.html',
  styleUrls: ['./factory-method.component.css'],
})
export class FactoryMethodComponent {
  types: string[] = [];
  selectedType: string = '';
  result: string = '';

  constructor(private service: FactoryMethodService) {
    this.types = this.service.getAvailableTypes();
    this.selectedType = this.types[0];
  }

  createVehicle(): void {
    const info = this.service.getVehicleInfo(this.selectedType);
    this.result = JSON.stringify(info, null, 2);
  }
}