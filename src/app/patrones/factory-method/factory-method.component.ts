import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IVehicle } from './factory-method.model';
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
  currentVehicle: IVehicle | null = null;
  vehicleHistory: IVehicle[] = [];
  errorMessage: string = '';

  constructor(private service: FactoryMethodService) {
    this.types = this.service.getAvailableTypes();
    this.selectedType = this.types[0];
  }

  createVehicle(): void {
    const { vehicle, error } = this.service.createVehicle(this.selectedType);
    if (error) {
      this.errorMessage = error;
      this.currentVehicle = null;
    } else {
      this.errorMessage = '';
      this.currentVehicle = vehicle || null;
      if (vehicle) {
        this.vehicleHistory.unshift(vehicle);
        if (this.vehicleHistory.length > 5) {
          this.vehicleHistory.pop();
        }
      }
    }
  }

  clearHistory(): void {
    this.vehicleHistory = [];
  }
}