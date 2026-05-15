import { Component } from '@angular/core';
import { FactoryMethodService } from './factory-method.service';

@Component({
  selector: 'app-factory-method',
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