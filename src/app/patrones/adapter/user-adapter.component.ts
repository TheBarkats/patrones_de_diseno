/**
 * PATRÓN ADAPTER - Componente Angular
 *
 * Este componente demuestra cómo el patrón Adapter permite integrar
 * datos de una API antigua en una aplicación moderna sin conflictos.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAdapterService } from './user-adapter.service';
import { IModernUser, LegacyApiService, UserAdapter } from './user.model';

@Component({
  selector: 'app-user-adapter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-adapter.component.html',
  styleUrls: ['./user-adapter.component.css'],
})
export class UserAdapterComponent implements OnInit {
  /**
   * Usuarios en formato moderno (después de ser adaptados)
   * Este es el único formato que el componente maneja
   */
  modernUsers: IModernUser[] = [];

  /**
   * Usuario seleccionado para mostrar detalles
   */
  selectedUser: IModernUser | null = null;

  /**
   * Información estadística
   */
  statistics: {
    totalUsers: number;
    oldestUser: IModernUser | null;
    newestUser: IModernUser | null;
  } | null = null;

  /**
   * Búsqueda de usuarios
   */
  searchEmail: string = '';
  searchResult: IModernUser | null = null;

  /**
   * Estado de la comparación
   */
  showComparison = false;

  constructor(private userAdapterService: UserAdapterService) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    // Cargar usuarios adaptados
    this.loadModernUsers();

    // Cargar estadísticas
    this.loadStatistics();
  }

  /**
   * Carga los usuarios usando el servicio (que internamente usa el Adapter)
   */
  loadModernUsers(): void {
    this.modernUsers = this.userAdapterService.getModernUsers();

    if (this.modernUsers.length > 0) {
      // Seleccionar el primer usuario por defecto
      this.selectUser(this.modernUsers[0]);
    }
  }

  /**
   * Carga estadísticas de usuarios
   */
  loadStatistics(): void {
    this.statistics = this.userAdapterService.getUserStatistics();
  }

  /**
   * Selecciona un usuario y muestra sus detalles
   */
  selectUser(user: IModernUser): void {
    this.selectedUser = user;
  }

  /**
   * Busca un usuario por email
   */
  searchUser(): void {
    if (this.searchEmail.trim() === '') {
      this.searchResult = null;
      return;
    }

    this.searchResult = this.userAdapterService.getUserByEmail(
      this.searchEmail
    );
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }

  /**
   * Muestra la comparación entre formato antiguo y moderno
   */
  toggleComparison(): void {
    this.showComparison = !this.showComparison;
  }

  /**
   * Obtiene un usuario en formato antiguo para comparación
   */
  getLegacyFormatVersion(modernUser: IModernUser): {
    nombre_completo: string;
    correo: string;
    fecha_creacion: string;
  } {
    const legacy = this.userAdapterService.convertToLegacyFormat(modernUser);
    return {
      nombre_completo: legacy.nombre_completo,
      correo: legacy.correo,
      fecha_creacion: legacy.fecha_creacion,
    };
  }

  /**
   * EXPLICACIÓN DEL PATRÓN ADAPTER:
   *
   * ¿QUÉ PROBLEMA RESUELVE?
   * ───────────────────────────
   * Integración de sistemas incompatibles:
   * - API antigua devuelve: { nombre_completo, correo, fecha_creacion }
   * - App moderna espera: { fullName, email, createdAt }
   *
   * Sin Adapter:
   * - Tendríamos que verificar qué formato viene
   * - Lógica compleja en múltiples lugares
   * - Cambios en la API antigua rompen toda la app
   *
   * Con Adapter:
   * - Un solo lugar de transformación
   * - La app usa SOLO el formato moderno
   * - Cambios encapsulados en el Adapter
   *
   * ¿CÓMO LO RESUELVE?
   * ──────────────────
   * El UserAdapter actúa como intermediario:
   *
   * API Antigua → UserAdapter → App Angular
   * ┌──────────────────────────────────────┐
   * │ nombre_completo → fullName           │
   * │ correo          → email              │
   * │ fecha_creacion  → createdAt (Date)   │
   * └──────────────────────────────────────┘
   *
   * ¿CUÁNDO USARLO?
   * ───────────────
   * ✅ Integración de APIs antiguas
   * ✅ Cambio de estructura de datos
   * ✅ Migración gradual de sistemas
   * ✅ Uso de librerías incompatibles
   * ✅ Encapsulación de cambios externos
   *
   * VENTAJAS:
   * ─────────
   * ✅ Mantiene código antiguo sin cambios
   * ✅ Código nuevo limpio y moderno
   * ✅ Cambios futuros localizados
   * ✅ Fácil de testear
   * ✅ Escalable a múltiples fuentes de datos
   */
}
