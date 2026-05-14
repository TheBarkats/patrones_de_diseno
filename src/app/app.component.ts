/**
 * COMPONENTE RAÍZ DE LA APLICACIÓN
 *
 * Punto de entrada principal de Angular
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatternsComponent } from './patrones.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PatternsComponent],
  template: `<app-patrones></app-patrones>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Taller de Patrones de Diseño';
}
