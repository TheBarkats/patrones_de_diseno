import { Injectable } from '@angular/core';
import { IVehicle, VehicleFactory } from './factory-method.model';

@Injectable({ providedIn: 'root' })
export class FactoryMethodService {
  createVehicle(type: string): { vehicle: IVehicle | null; error: string } {
    try {
      return { vehicle: VehicleFactory.create(type), error: '' };
    } catch (e: any) {
      return { vehicle: null, error: e.message };
    }
  }

  getAvailableTypes(): string[] {
    return VehicleFactory.getTypes();
  }

  getVehicleInfo(type: string): any {
    const { vehicle, error } = this.createVehicle(type);
    if (error) return { error };
    
    return {
      type: vehicle!.getType(),
      description: vehicle!.getDescription(),
      maxSpeed: vehicle!.getMaxSpeed(),
    };
  }
}