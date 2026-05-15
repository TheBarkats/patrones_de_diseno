# Taller de Patrones de Diseño - Angular + TypeScript

##  Autores

**Taller Universitario de Patrones de Diseño**
- Arquitectura de Software - VIII Semestre  
- Unidad Central del Valle - 2026

**Integrantes del Grupo:**
- Cristpher Arias Contreras (Patrones: Builder, Adapter, Flyweight, Observer, Facade)
- Juan Camilo Giraldo Amaya (Patrones: Singleton, Factory Method, Strategy, State, Command)

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

### Tabla Resumen de los 10 Patrones

| # | Patrón | Categoría | Propósito | Escenario |
|---|--------|-----------|----------|-----------|
| 1 | **Builder** | Creacional | Construcción paso a paso | Computadores Gamer |
| 2 | **Adapter** | Estructural | Compatibilidad de interfaces | APIs heterogéneas |
| 3 | **Flyweight** | Estructural | Optimización de memoria | Mapas con miles de objetos |
| 4 | **Observer** | Comportamiento | Notificaciones uno-a-muchos | Sistema de reservas reactivo |
| 5 | **Facade** | Estructural | Interfaz unificada | Reservas deportivas complejas |
| 6 | **Singleton** | Creacional | Instancia única | Conexión a BD centralizada |
| 7 | **Factory Method** | Creacional | Creación flexible | Fábrica de vehículos |
| 8 | **Strategy** | Comportamiento | Algoritmos intercambiables | Métodos de pago |
| 9 | **State** | Comportamiento | Cambio de comportamiento | Reproductor multimedia |
| 10 | **Command** | Comportamiento | Encapsulación de acciones | Control remoto con undo/redo |

---

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

### 6. **SINGLETON** - Instancia Única (Creacional)
**Propósito:** Garantizar que una clase tenga exactamente una única instancia durante toda la ejecución.

**Escenario:** Sistema de base de datos con una única conexión controlada.

**Ubicación:** `src/app/patrones/singleton/`

**Archivos:**
- `singleton.component.ts` - Componente principal
- `singleton.service.ts` - Servicio del patrón
- `singleton.model.ts` - Clase DatabaseConnection
- `singleton.component.html` - Vista
- `singleton.component.css` - Estilos

**Ventajas:**
- Evita duplicación de recursos costosos
- Garantiza estado centralizado consistente
- Control de acceso a instancia única

---

### 7. **FACTORY METHOD** - Creación de Objetos (Creacional)
**Propósito:** Definir una interfaz para crear objetos, permitiendo que subclases decidan qué instanciar.

**Escenario:** Sistema de fabricación de vehículos (Auto, Moto, Camión, Bicicleta).

**Ubicación:** `src/app/patrones/factory-method/`

**Archivos:**
- `factory-method.component.ts` - Componente principal
- `factory-method.service.ts` - Servicio del patrón
- `factory-method.model.ts` - Factory y clases de vehículos
- `factory-method.component.html` - Vista
- `factory-method.component.css` - Estilos

**Ventajas:**
- Desacopla la creación del cliente
- Facilita agregar nuevos tipos
- Inversión de control

---

### 8. **STRATEGY** - Algoritmos Intercambiables (Comportamiento)
**Propósito:** Encapsular diferentes algoritmos permitiendo que se intercambien dinámicamente.

**Escenario:** Sistema de carrito de compras con múltiples métodos de pago.

**Ubicación:** `src/app/patrones/strategy/`

**Archivos:**
- `strategy.component.ts` - Componente principal
- `strategy.service.ts` - Servicio del patrón
- `strategy.model.ts` - Estrategias de pago
- `strategy.component.html` - Vista
- `strategy.component.css` - Estilos

**Ventajas:**
- Evita condicionales largos
- Algoritmos intercambiables en runtime
- Respeta principios SOLID

---

### 9. **STATE** - Cambio de Comportamiento (Comportamiento)
**Propósito:** Permitir que un objeto cambie su comportamiento cuando su estado interno cambia.

**Escenario:** Reproductor multimedia (Play, Pause, Stop).

**Ubicación:** `src/app/patrones/state/`

**Archivos:**
- `state.component.ts` - Componente principal
- `state.service.ts` - Servicio del patrón
- `state.model.ts` - Estados del reproductor
- `state.component.html` - Vista
- `state.component.css` - Estilos

**Ventajas:**
- Encapsula estados en objetos
- Transiciones claras entre estados
- Código más legible y mantenible

---

### 10. **COMMAND** - Encapsulación de Acciones (Comportamiento)
**Propósito:** Encapsular solicitudes como objetos, permitiendo undo/redo y automatización.

**Escenario:** Control remoto de luces con historial de comandos.

**Ubicación:** `src/app/patrones/command/`

**Archivos:**
- `command.component.ts` - Componente principal
- `command.service.ts` - Servicio del patrón
- `command.model.ts` - Comandos y RemoteControl
- `command.component.html` - Vista
- `command.component.css` - Estilos

**Ventajas:**
- Desacopla invocador del receptor
- Permite undo/redo
- Colas de comandos y automatización

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
├── facade/
│   ├── sports-facade.component.ts
│   ├── sports-facade.component.html
│   ├── sports-facade.component.css
│   ├── sports-facade.service.ts
│   ├── availability.service.ts
│   ├── payment.service.ts
│   ├── user-validation.service.ts
│   └── facility.model.ts
│
├── singleton/
│   ├── singleton.component.ts
│   ├── singleton.component.html
│   ├── singleton.component.css
│   ├── singleton.service.ts
│   └── singleton.model.ts
│
├── factory-method/
│   ├── factory-method.component.ts
│   ├── factory-method.component.html
│   ├── factory-method.component.css
│   ├── factory-method.service.ts
│   └── factory-method.model.ts
│
├── strategy/
│   ├── strategy.component.ts
│   ├── strategy.component.html
│   ├── strategy.component.css
│   ├── strategy.service.ts
│   └── strategy.model.ts
│
├── state/
│   ├── state.component.ts
│   ├── state.component.html
│   ├── state.component.css
│   ├── state.service.ts
│   └── state.model.ts
│
└── command/
    ├── command.component.ts
    ├── command.component.html
    ├── command.component.css
    ├── command.service.ts
    └── command.model.ts
```

---

##  Instalación y Ejecución

### Requisitos Previos
- **Node.js** v18+ ([Descargar](https://nodejs.org/))
- **npm** v9+ (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)

### Verificar la instalación

```bash
# Verificar Node.js
node --version  # Debe ser v18 o mayor

# Verificar npm
npm --version   # Debe ser v9 o mayor
```

### Instalación Paso a Paso

1. **Navegar al directorio del proyecto:**
   ```bash
   cd patrones_de_diseno
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```
   > Esto descargará e instalará Angular 17+ y todas sus dependencias (puede tomar 2-3 minutos)

3. **Instalar Angular CLI globalmente (opcional pero recomendado):**
   ```bash
   npm install -g @angular/cli@17
   ```

### Ejecutar la Aplicación

**Opción 1: Comando npm (recomendado)**
```bash
npm start
```

**Opción 2: Comando Angular CLI**
```bash
ng serve --open
```

**Opción 3: Desarrollo con auto-recargar**
```bash
npm run dev
```

### Acceder a la Aplicación

Una vez ejecutado, la aplicación abrirá automáticamente en:
```
http://localhost:4200
```

Si no se abre automáticamente, accede manualmente a esa URL en tu navegador.

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests unitarios
npm test

# Formatear código
npm run format

# Ver ayuda de Angular CLI
ng help
```

### Solución de Problemas

**Error: "ng: command not found"**
```bash
# Solución: Instalar Angular CLI globalmente
npm install -g @angular/cli@17
```

**Error: "Module not found"**
```bash
# Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 4200 already in use"**
```bash
# Solución: Usar un puerto diferente
ng serve --port 4300
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

1. **Ejecuta la aplicación:** `npm start`
2. **Navega por los patrones:** Usa los botones en la parte superior
3. **Lee el código:** Cada archivo tiene comentarios explicativos
4. **Interactúa con los ejemplos:** Haz click en los botones para ver funcionamiento
5. **Modifica y experimenta:** El mejor aprendizaje es haciendo cambios

### Acceso a los Patrones

Una vez la aplicación esté corriendo en `http://localhost:4200`, verás:

**Patrones Obligatorios (parte 1 del grupo):**
- 🏗️ **Builder** - Construcción de computadores paso a paso
- 🔌 **Adapter** - Adaptación de APIs antiguas
- 💾 **Flyweight** - Optimización de memoria en mapas
- 👁️ **Observer** - Sistema de notificaciones reactivo
- 🎭 **Facade** - Simplificación de complejidad

**Patrones Adicionales (parte 2 del grupo):**
- 🔒 **Singleton** - Garantía de instancia única
- 🏭 **Factory Method** - Creación flexible de vehículos
- 📋 **Strategy** - Métodos de pago intercambiables
- 🎬 **State** - Reproductor multimedia con estados
- ⌨️ **Command** - Control remoto con undo/redo

---

##  Notas Importantes

- Cada patrón está implementado de forma **independiente**
- El código está **profusamente comentado** para la comprensión
- Los ejemplos son **reales y prácticos**, no triviales
- Usa **TypeScript strict mode** para máxima seguridad de tipos
- Compatible con **Angular 17+**

---

##  Referencias

- [Gang of Four Design Patterns](https://refactoring.guru/design-patterns)
- [Angular Official Documentation](https://angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)

---

##  Licencia

Este proyecto es de carácter educativo para uso académico.

