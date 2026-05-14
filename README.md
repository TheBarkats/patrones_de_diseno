# Taller de Patrones de Diseño - Angular + TypeScript

## Descripción del Proyecto

Este proyecto es un taller que implementa **10 patrones de diseño de software** con ejemplos funcionales y reales en **Angular 17+** con **TypeScript**.

Cada patrón incluye:
-  Implementación completa del patrón
-  Componentes funcionales de demostración
-  Servicios y clases bien arquitecturados
-  Interfaces y tipos TypeScript
-  Comentarios explicativos detallados
-  Ejemplos ejecutables en la aplicación

##  Patrones Implementados

### 1. **BUILDER** - Sistema de Construcción de Computadores Gamer
**Propósito:** Separar la construcción de un objeto complejo de su representación.

**Escenario:** Sistema para construir computadores personalizados paso a paso.

**Ubicación:** `src/app/patrones/builder/`

**Archivos:**
- `computer-builder.component.ts` - Componente principal
- `computer-builder.service.ts` - Servicio con la lógica del Builder
- `computer.model.ts` - Clases y interfaces
- `computer-builder.component.html` - Vista
- `computer-builder.component.css` - Estilos

**Ventajas:**
- Permite construcción paso a paso
- Código limpio y mantenible
- Facilita diferentes configuraciones

---

### 2. **ADAPTER** - Adaptación de API Antigua
**Propósito:** Adaptar una interfaz incompatible a la que espera el cliente.

**Escenario:** Integración de una API antigua que devuelve datos en formato diferente.

**Ubicación:** `src/app/patrones/adapter/`

**Archivos:**
- `user-adapter.component.ts` - Componente principal
- `user-adapter.service.ts` - Servicio con el adaptador
- `user.model.ts` - Interfaces y tipos
- `user-adapter.component.html` - Vista
- `user-adapter.component.css` - Estilos

**Ventajas:**
- Integración de APIs heterogéneas
- No requiere modificar código antiguo
- Aislamiento de cambios futuros

---

### 3. **FLYWEIGHT** - Optimización de Memoria
**Propósito:** Compartir estado común entre múltiples objetos para optimizar memoria.

**Escenario:** Sistema de mapa de videojuegos con miles de árboles.

**Ubicación:** `src/app/patrones/flyweight/`

**Archivos:**
- `game-map.component.ts` - Componente principal
- `game-map.service.ts` - Servicio con Flyweight Factory
- `tree.model.ts` - Clases del patrón
- `game-map.component.html` - Vista
- `game-map.component.css` - Estilos

**Ventajas:**
- Reducción significativa de memoria
- Escalabilidad con miles de objetos
- Compartición eficiente de datos

---

### 4. **OBSERVER** - Sistema de Notificaciones Reactivo
**Propósito:** Definir una dependencia de uno-a-muchos entre objetos.

**Escenario:** Sistema de reservas de canchas deportivas con notificaciones en tiempo real.

**Ubicación:** `src/app/patrones/observer/`

**Archivos:**
- `sports-reservation.component.ts` - Componente principal
- `sports-notification.service.ts` - Servicio observable
- `reservation.model.ts` - Modelos e interfaces
- `sports-reservation.component.html` - Vista
- `sports-reservation.component.css` - Estilos

**Ventajas:**
- Desacoplamiento de componentes
- Actualizaciones automáticas
- Reactividad nativa en Angular

---

### 5. **FACADE** - Simplificación de Complejidad
**Propósito:** Proporcionar una interfaz unificada a un conjunto de interfaces complejas.

**Escenario:** Sistema de reservas deportivas con múltiples validaciones y procesos.

**Ubicación:** `src/app/patrones/facade/`

**Archivos:**
- `sports-facade.component.ts` - Componente principal
- `sports-facade.service.ts` - Fachada principal
- `availability.service.ts` - Servicio de disponibilidad
- `payment.service.ts` - Servicio de pagos
- `user-validation.service.ts` - Servicio de validación
- `facility.model.ts` - Modelos e interfaces
- `sports-facade.component.html` - Vista
- `sports-facade.component.css` - Estilos

**Ventajas:**
- Simplifica interfaces complejas
- Reduce acoplamiento
- Facilita mantenimiento

---

##  Estructura del Proyecto

```
src/app/patrones/
│
├── builder/
│   ├── computer-builder.component.ts
│   ├── computer-builder.component.html
│   ├── computer-builder.component.css
│   ├── computer-builder.service.ts
│   └── computer.model.ts
│
├── adapter/
│   ├── user-adapter.component.ts
│   ├── user-adapter.component.html
│   ├── user-adapter.component.css
│   ├── user-adapter.service.ts
│   └── user.model.ts
│
├── flyweight/
│   ├── game-map.component.ts
│   ├── game-map.component.html
│   ├── game-map.component.css
│   ├── game-map.service.ts
│   └── tree.model.ts
│
├── observer/
│   ├── sports-reservation.component.ts
│   ├── sports-reservation.component.html
│   ├── sports-reservation.component.css
│   ├── sports-notification.service.ts
│   └── reservation.model.ts
│
└── facade/
    ├── sports-facade.component.ts
    ├── sports-facade.component.html
    ├── sports-facade.component.css
    ├── sports-facade.service.ts
    ├── availability.service.ts
    ├── payment.service.ts
    ├── user-validation.service.ts
    └── facility.model.ts
```

---

##  Instalación y Ejecución

### Requisitos Previos
- **Node.js** v18+
- **npm** o **yarn**
- **Angular CLI** v17+

### Pasos para ejecutar

1. **Navegar al directorio del proyecto:**
   ```bash
   cd patrones_de_diseno
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   ng serve
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:4200
   ```

---

##  Características Principales

-  **Componentes Standalone:** Arquitectura moderna de Angular
-  **TypeScript Fuertemente Tipado:** Interfaces y tipos explícitos
-  **RxJS Reactivo:** Observables para el patrón Observer
-  **Servicios Inyectables:** Inyección de dependencias
-  **Código Limpio:** Bien documentado y organizado
-  **Ejemplos Reales:** Escenarios prácticos y aplicables

---

##  Conceptos Clave

### SOLID Principles Aplicados
- **S**ingle Responsibility: Cada clase tiene una responsabilidad
- **O**pen/Closed: Abierto a extensión, cerrado a modificación
- **L**iskov Substitution: Sustitución por tipos
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Inyección de dependencias

### Design Patterns
Todos los patrones siguen las definiciones clásicas del Gang of Four (GoF)

---

## Cómo Aprender con Este Proyecto

1. **Léa el README de cada patrón**
2. **Explore el código fuente** y los comentarios
3. **Ejecute la aplicación** y pruebe cada ejemplo
4. **Modifique el código** para entender mejor el funcionamiento
5. **Compare patrones** para identificar sus diferencias

---

##  Notas Importantes

- Cada patrón está implementado de forma **independiente**
- El código está **profusamente comentado** para la comprensión
- Los ejemplos son **reales y prácticos**, no triviales
- Usa **TypeScript strict mode** para máxima seguridad de tipos
- Compatible con **Angular 17+**

---

##  Autores

Taller Universitario de Patrones de Diseño  
Arquitectura de Software - VIII Semestre  
Unidad Central del Valle - 2026
Cristopher Arias 230222032
Juan Camilo Giraldo 

---

##  Referencias

- [Gang of Four Design Patterns](https://refactoring.guru/design-patterns)
- [Angular Official Documentation](https://angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)

---

##  Licencia

Este proyecto es de carácter educativo para uso académico.

