/**
 * BOOTSTRAP DE ANGULAR
 *
 * Punto de entrada de la aplicación
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
