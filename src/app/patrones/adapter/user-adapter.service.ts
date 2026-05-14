/**
 * PATRÓN ADAPTER - Servicio
 *
 * Este servicio proporciona una interfaz limpia para trabajar con usuarios
 * usando el patrón Adapter bajo el capó.
 */

import { Injectable } from '@angular/core';
import {
  IModernUser,
  LegacyApiService,
  UserAdapter,
  ILegacyApiUser,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserAdapterService {
  /**
   * Obtiene todos los usuarios usando el Adapter
   *
   * FLUJO:
   * 1. Llamar API antigua (LegacyApiService)
   * 2. Recibir datos en formato antiguo (ILegacyApiUser[])
   * 3. Usar UserAdapter para convertir a formato moderno
   * 4. Retornar usuarios modernos (IModernUser[])
   *
   * La aplicación Angular SOLO VE IModernUser
   * Nunca interactúa directamente con el formato antiguo
   */
  getModernUsers(): IModernUser[] {
    // Paso 1: Obtener usuarios desde la API antigua
    const legacyUsers: ILegacyApiUser[] = LegacyApiService.getUsers();

    // Paso 2: Usar el Adapter para convertir
    const modernUsers: IModernUser[] = UserAdapter.adaptLegacyUsersArray(
      legacyUsers
    );

    // Paso 3: Retornar usuarios en formato moderno
    return modernUsers;
  }

  /**
   * Obtiene un usuario específico por email
   */
  getUserByEmail(email: string): IModernUser | undefined {
    return this.getModernUsers().find((user) => user.email === email);
  }

  /**
   * Convierte un usuario moderno al formato antiguo
   * (En caso de que necesitemos enviarlo de vuelta)
   */
  convertToLegacyFormat(modernUser: IModernUser): ILegacyApiUser {
    return UserAdapter.adaptModernToLegacy(modernUser);
  }

  /**
   * Obtiene información estadística sobre los usuarios
   */
  getUserStatistics(): {
    totalUsers: number;
    oldestUser: IModernUser | null;
    newestUser: IModernUser | null;
  } {
    const users = this.getModernUsers();

    if (users.length === 0) {
      return {
        totalUsers: 0,
        oldestUser: null,
        newestUser: null,
      };
    }

    // Ordenar por fecha de creación
    const sorted = [...users].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );

    return {
      totalUsers: users.length,
      oldestUser: sorted[0],
      newestUser: sorted[sorted.length - 1],
    };
  }
}
