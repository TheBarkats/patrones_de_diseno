/**
 * COMPONENTE PRINCIPAL - HUB DE PATRONES DE DISEÑO
 *
 * Este componente sirve como punto de entrada central
 * para acceder a todos los 5 patrones implementados
 */

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// Importar todos los componentes de patrones
import { UserAdapterComponent } from './patrones/adapter/user-adapter.component';
import { ComputerBuilderComponent } from './patrones/builder/computer-builder.component';
import { CommandComponent } from './patrones/command/command.component';
import { SportsFacadeComponent } from './patrones/facade/sports-facade.component';
import { FactoryMethodComponent } from './patrones/factory-method/factory-method.component';
import { GameMapComponent } from './patrones/flyweight/game-map.component';
import { SportsReservationComponent } from './patrones/observer/sports-reservation.component';
import { SingletonComponent } from './patrones/singleton/singleton.component';
import { StateComponent } from './patrones/state/state.component';
import { StrategyComponent } from './patrones/strategy/strategy.component';

interface PatternInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  component: any;
}

@Component({
  selector: 'app-patrones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ComputerBuilderComponent,
    UserAdapterComponent,
    GameMapComponent,
    SportsReservationComponent,
    SportsFacadeComponent,
    SingletonComponent,
    FactoryMethodComponent,
    StrategyComponent,
    StateComponent,
    CommandComponent,
  ],
  template: `
    <div class="patterns-container">
      <!-- Encabezado -->
      <header class="header">
        <div class="header-content">
          <h1>🎓 Taller de Patrones de Diseño</h1>
          <p class="subtitle">Angular + TypeScript - 10 Patrones Implementados</p>
        </div>
      </header>

      <!-- Navegación -->
      <nav class="navigation">
        <button
          *ngFor="let pattern of patterns"
          (click)="selectPattern(pattern.id)"
          [class.active]="currentPattern === pattern.id"
          class="nav-button"
        >
          {{ pattern.emoji }} {{ pattern.name }}
        </button>
      </nav>

      <!-- Contenido principal -->
      <main class="main-content">
        <!-- BUILDER -->
        <div *ngIf="currentPattern === 'builder'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('builder').title }}</h2>
            <p>{{ getPatternInfo('builder').description }}</p>
          </div>
          <app-computer-builder></app-computer-builder>
        </div>

        <!-- ADAPTER -->
        <div *ngIf="currentPattern === 'adapter'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('adapter').title }}</h2>
            <p>{{ getPatternInfo('adapter').description }}</p>
          </div>
          <app-user-adapter></app-user-adapter>
        </div>

        <!-- FLYWEIGHT -->
        <div *ngIf="currentPattern === 'flyweight'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('flyweight').title }}</h2>
            <p>{{ getPatternInfo('flyweight').description }}</p>
          </div>
          <app-game-map></app-game-map>
        </div>

        <!-- OBSERVER -->
        <div *ngIf="currentPattern === 'observer'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('observer').title }}</h2>
            <p>{{ getPatternInfo('observer').description }}</p>
          </div>
          <app-sports-reservation></app-sports-reservation>
        </div>

        <!-- FACADE -->
        <div *ngIf="currentPattern === 'facade'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('facade').title }}</h2>
            <p>{{ getPatternInfo('facade').description }}</p>
          </div>
          <app-sports-facade></app-sports-facade>
        </div>

        <!-- SINGLETON -->
        <div *ngIf="currentPattern === 'singleton'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('singleton').title }}</h2>
            <p>{{ getPatternInfo('singleton').description }}</p>
          </div>
          <app-singleton></app-singleton>
        </div>

        <!-- FACTORY METHOD -->
        <div *ngIf="currentPattern === 'factory-method'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('factory-method').title }}</h2>
            <p>{{ getPatternInfo('factory-method').description }}</p>
          </div>
          <app-factory-method></app-factory-method>
        </div>

        <!-- STRATEGY -->
        <div *ngIf="currentPattern === 'strategy'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('strategy').title }}</h2>
            <p>{{ getPatternInfo('strategy').description }}</p>
          </div>
          <app-strategy></app-strategy>
        </div>

        <!-- STATE -->
        <div *ngIf="currentPattern === 'state'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('state').title }}</h2>
            <p>{{ getPatternInfo('state').description }}</p>
          </div>
          <app-state></app-state>
        </div>

        <!-- COMMAND -->
        <div *ngIf="currentPattern === 'command'" class="pattern-view">
          <div class="pattern-header">
            <h2>{{ getPatternInfo('command').title }}</h2>
            <p>{{ getPatternInfo('command').description }}</p>
          </div>
          <app-command></app-command>
        </div>

        <!-- Vista de inicio -->
        <div *ngIf="!currentPattern" class="welcome-view">
          <div class="welcome-content">
            <h2>Bienvenido al Taller</h2>
            <p>Selecciona un patrón en la navegación superior para comenzar</p>

            <div class="patterns-grid">
              <div
                *ngFor="let pattern of patterns"
                class="pattern-card"
                (click)="selectPattern(pattern.id)"
              >
                <div class="card-emoji">{{ pattern.emoji }}</div>
                <h3>{{ pattern.name }}</h3>
                <p>{{ pattern.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2026 - Taller de Patrones de Diseño | Angular 17+ & TypeScript</p>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        min-height: 100vh;
        color: #e2e8f0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      .patterns-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      /* ────────────────────────────────────────
         ENCABEZADO
         ──────────────────────────────────────── */

      .header {
        background: linear-gradient(
          135deg,
          rgba(6, 182, 212, 0.15),
          rgba(16, 185, 129, 0.15)
        );
        border-bottom: 2px solid rgba(6, 182, 212, 0.3);
        padding: 30px 20px;
        text-align: center;
      }

      .header-content h1 {
        margin: 0;
        font-size: 2.5em;
        background: linear-gradient(135deg, #06b6d4, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .header-content .subtitle {
        margin: 10px 0 0 0;
        font-size: 1.1em;
        color: #cbd5e1;
      }

      /* ────────────────────────────────────────
         NAVEGACIÓN
         ──────────────────────────────────────── */

      .navigation {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 20px;
        flex-wrap: wrap;
        background: rgba(15, 23, 42, 0.5);
        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      }

      .nav-button {
        padding: 12px 20px;
        background: rgba(148, 163, 184, 0.1);
        border: 1px solid rgba(148, 163, 184, 0.3);
        border-radius: 8px;
        color: #cbd5e1;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1em;
      }

      .nav-button:hover {
        background: rgba(148, 163, 184, 0.2);
        border-color: rgba(148, 163, 184, 0.5);
      }

      .nav-button.active {
        background: linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3));
        border-color: #06b6d4;
        color: #06b6d4;
        box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
      }

      /* ────────────────────────────────────────
         CONTENIDO PRINCIPAL
         ──────────────────────────────────────── */

      .main-content {
        flex: 1;
        padding: 20px;
        max-width: 1800px;
        margin: 0 auto;
        width: 100%;
      }

      .pattern-view {
        animation: fadeIn 0.3s ease-in;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .pattern-header {
        margin-bottom: 20px;
      }

      .pattern-header h2 {
        margin: 0 0 10px 0;
        font-size: 2em;
        color: #06b6d4;
      }

      .pattern-header p {
        margin: 0;
        color: #cbd5e1;
        font-size: 1.1em;
        line-height: 1.6;
      }

      /* ────────────────────────────────────────
         VISTA DE BIENVENIDA
         ──────────────────────────────────────── */

      .welcome-view {
        animation: fadeIn 0.3s ease-in;
      }

      .welcome-content h2 {
        text-align: center;
        font-size: 2.5em;
        background: linear-gradient(135deg, #06b6d4, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 10px;
      }

      .welcome-content > p {
        text-align: center;
        color: #cbd5e1;
        font-size: 1.2em;
        margin-bottom: 40px;
      }

      .patterns-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .pattern-card {
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 12px;
        padding: 25px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .pattern-card:hover {
        border-color: rgba(6, 182, 212, 0.5);
        background: rgba(30, 41, 59, 1);
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2);
      }

      .card-emoji {
        font-size: 3.5em;
        margin-bottom: 15px;
      }

      .pattern-card h3 {
        margin: 0 0 10px 0;
        font-size: 1.3em;
        color: #06b6d4;
      }

      .pattern-card p {
        margin: 0;
        color: #cbd5e1;
        font-size: 0.9em;
        line-height: 1.5;
      }

      /* ────────────────────────────────────────
         FOOTER
         ──────────────────────────────────────── */

      .footer {
        background: rgba(15, 23, 42, 0.8);
        border-top: 1px solid rgba(148, 163, 184, 0.2);
        padding: 20px;
        text-align: center;
        color: #94a3b8;
        font-size: 0.9em;
        margin-top: auto;
      }

      /* ────────────────────────────────────────
         RESPONSIVE
         ──────────────────────────────────────── */

      @media (max-width: 768px) {
        .header-content h1 {
          font-size: 1.8em;
        }

        .navigation {
          gap: 8px;
          padding: 15px;
        }

        .nav-button {
          padding: 10px 15px;
          font-size: 0.9em;
        }

        .main-content {
          padding: 15px;
        }

        .patterns-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class PatternsComponent implements OnInit {
  currentPattern: string | null = null;

  patterns: PatternInfo[] = [
    {
      id: 'builder',
      name: 'Builder',
      title: '🏗️ BUILDER - Sistema de Construcción de Computadores Gamer',
      description:
        'Separa la construcción de un objeto complejo de su representación. Permite construcción paso a paso con diferentes configuraciones.',
      emoji: '🏗️',
      color: '#60a5fa',
      component: ComputerBuilderComponent,
    },
    {
      id: 'adapter',
      name: 'Adapter',
      title: '🔌 ADAPTER - Adaptación de API Antigua',
      description:
        'Adapta una interfaz incompatible a la que espera el cliente. Integración de APIs heterogéneas sin modificar código antiguo.',
      emoji: '🔌',
      color: '#a78bfa',
      component: UserAdapterComponent,
    },
    {
      id: 'flyweight',
      name: 'Flyweight',
      title: '💾 FLYWEIGHT - Optimización de Memoria',
      description:
        'Comparte estado común entre múltiples objetos para optimizar memoria. Escalable para miles de objetos.',
      emoji: '💾',
      color: '#34d399',
      component: GameMapComponent,
    },
    {
      id: 'observer',
      name: 'Observer',
      title: '👁️ OBSERVER - Sistema de Notificaciones Reactivo',
      description:
        'Define una dependencia uno-a-muchos entre objetos. Sistema reactivo con actualizaciones automáticas en tiempo real.',
      emoji: '👁️',
      color: '#fbbf24',
      component: SportsReservationComponent,
    },
    {
      id: 'facade',
      name: 'Facade',
      title: '🎭 FACADE - Simplificación de Complejidad',
      description:
        'Proporciona una interfaz unificada a un conjunto de interfaces complejas. Reduce acoplamiento y facilita mantenimiento.',
      emoji: '🎭',
      color: '#f87171',
      component: SportsFacadeComponent,
    },
    {
      id: 'singleton',
      name: 'Singleton',
      title: '🔒 SINGLETON - Instancia Única',
      description:
        'Garantiza que una clase tenga exactamente una única instancia durante toda la ejecución de la aplicación.',
      emoji: '🔒',
      color: '#6366f1',
      component: SingletonComponent,
    },
    {
      id: 'factory-method',
      name: 'Factory Method',
      title: '🏭 FACTORY METHOD - Creación de Objetos',
      description:
        'Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.',
      emoji: '🏭',
      color: '#f59e0b',
      component: FactoryMethodComponent,
    },
    {
      id: 'strategy',
      name: 'Strategy',
      title: '📋 STRATEGY - Algoritmos Intercambiables',
      description:
        'Encapsula diferentes algoritmos en objetos separados, permitiendo que se intercambien dinámicamente.',
      emoji: '📋',
      color: '#8b5cf6',
      component: StrategyComponent,
    },
    {
      id: 'state',
      name: 'State',
      title: '🎬 STATE - Cambio de Comportamiento',
      description:
        'Permite que un objeto cambie su comportamiento cuando su estado interno cambia, como un reproductor multimedia.',
      emoji: '🎬',
      color: '#ec4899',
      component: StateComponent,
    },
    {
      id: 'command',
      name: 'Command',
      title: '⌨️ COMMAND - Encapsulación de Acciones',
      description:
        'Encapsula solicitudes como objetos, permitiendo undo/redo, colas de comandos y automatización.',
      emoji: '⌨️',
      color: '#14b8a6',
      component: CommandComponent,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // El primer patrón se carga por defecto o puedes dejarlo vacío para mostrar bienvenida
    // this.selectPattern('builder');
  }

  selectPattern(id: string): void {
    this.currentPattern = this.currentPattern === id ? null : id;
  }

  getPatternInfo(id: string): PatternInfo {
    return this.patterns.find((p) => p.id === id) || this.patterns[0];
  }
}
