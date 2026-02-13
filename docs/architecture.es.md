# Ingesta – Arquitectura

## 1. Objetivo arquitectónico

La arquitectura de Ingesta está diseñada para:

- Mantener el dominio independiente del framework.
- Permitir evolución futura hacia backend sin refactor masivo.
- Garantizar claridad de responsabilidades.
- Evitar sobre-ingeniería en Fase 1 (offline-first).

---

## 2. Capas del sistema

Ingesta sigue una arquitectura por capas inspirada en Clean Architecture / DDD-style layering.

### 2.1 Dominio

Responsabilidades:

- Entidades (`FoodDefinition`, `DishDefinition`, `Meal`, etc.).
- Value Objects (`Nutrition`).
- Reglas de negocio e invariantes.
- Algoritmos de cálculo nutricional.
- Errores de dominio.

El dominio:

- No depende de Angular.
- No depende de SQLite.
- No depende de Capacitor.
- No conoce infraestructura.

Es la parte más estable del sistema.

---

### 2.2 Aplicación (Casos de uso)

Responsabilidades:

- Orquestar operaciones del sistema.
- Coordinar repositorios.
- Ejecutar reglas del dominio.
- Gestionar flujos como:
  - Crear DishDefinition
  - Calcular nutrición
  - Crear MealItem con snapshot

La capa de aplicación:

- Depende del dominio.
- Define interfaces (ports) para repositorios.
- No depende de implementaciones concretas.

---

### 2.3 Infraestructura

Responsabilidades:

- Implementaciones concretas de repositorios.
- Persistencia local (Fase 1).
- Adaptación a almacenamiento (SQLite / IndexedDB / etc.).

En el futuro, podrá incluir:

- Implementaciones HTTP para backend remoto.
- Sin modificar dominio ni casos de uso.

---

### 2.4 UI (Angular)

Responsabilidades:

- Componentes.
- Formularios.
- Navegación.
- Presentación de datos.

La UI:

- Llama a casos de uso.
- No contiene lógica de negocio.
- No implementa reglas del dominio.

---

## 3. Flujo típico

Ejemplo: calcular nutrición de un Dish.

1. UI solicita cálculo.
2. Caso de uso carga el Dish desde repositorio.
3. Se resuelven componentes.
4. El dominio ejecuta el algoritmo.
5. Se devuelve resultado a la UI.

---

## 4. Principio clave: independencia de infraestructura

El sistema está diseñado para permitir:

- Persistencia local en Fase 1.
- Backend opcional en fases posteriores.
- Sustituir repositorios sin modificar el dominio.

La infraestructura es un detalle intercambiable.

---

## 5. Decisiones explícitas

- Offline-first en Fase 1.
- Snapshot obligatorio en MealItem.
- Regla anti-ciclos en DishDefinition.
- Límite de complejidad para cálculo nutricional.
- El dominio actúa como especificación funcional oficial.

---

## 6. Estrategia futura de sincronización (no implementada en Fase 1)

En Fase 1 (offline-first), la base de datos local (SQLite) actúa como **fuente absoluta de verdad**.

La aplicación está diseñada para funcionar completamente sin backend.

---

### 6.1 Evolución hacia backend

En fases posteriores podrá incorporarse un backend remoto y un mecanismo de sincronización.

La estrategia prevista es:

- Mantener SQLite como base local permanente.
- Añadir un módulo de sincronización en la capa de aplicación.
- Considerar el backend como fuente de verdad para determinadas entidades.

---

### 6.2 Autoridad por tipo de entidad (propuesta)

En caso de sincronización futura:

- `FoodDefinition` y `DishDefinition`:
  - Preferiblemente **server-authoritative**.
  - El backend define el estado final en caso de conflicto.

- `Meal` y `MealItem`:
  - Preferiblemente **client-authoritative** o modelo append-only.
  - Se prioriza mantener el histórico local como válido.
  - Conflictos mínimos esperados.

---

### 6.3 Requisitos técnicos para futura sincronización

Para permitir esta evolución sin refactor masivo, el modelo ya incorpora:

- Identificadores globales (`UUID`).
- Separación clara entre dominio y persistencia.
- Snapshot en `MealItem` para garantizar coherencia histórica.

Elementos que podrían añadirse en el futuro:

- Campos de versión (`version` o `etag`).
- Timestamps consistentes (`createdAt`, `updatedAt`).
- Soft delete (`deletedAt`).
- Cola local de operaciones pendientes (outbox pattern).

Estos elementos no forman parte del dominio actual y se introducirán únicamente cuando la sincronización sea un requisito real.
