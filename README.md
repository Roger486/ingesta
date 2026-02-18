# Ingesta

Ingesta es una aplicación móvil Android de seguimiento nutricional.

Permite registrar comidas, calcular calorías y macronutrientes, y gestionar alimentos y preparaciones propias, con enfoque offline-first.

---

## Objetivo

Construir una aplicación nutricional:

- Arquitectónicamente limpia.
- Con dominio explícito y bien modelado.
- Preparada para incorporar backend en el futuro sin refactor masivo.
- Usable y coherente incluso si nunca se añade backend.

---

## Qué es Ingesta

- App móvil Android (Angular + Capacitor).
- Persistencia local en Fase 1.
- Modelo de dominio explícito (FoodDefinition, DishDefinition, Meal, etc.).
- Cálculo nutricional determinista y controlado.
- Arquitectura por capas (Dominio / Aplicación / Infraestructura / UI).

---

## Monorepo y workspaces

Paquetes principales:
- `@ingesta/domain` (modelo y reglas de negocio)
- `@ingesta/application` (casos de uso y orquestación)
- `@ingesta/mobile` (app Angular/Capacitor)

Comandos desde la raíz:
- `npm test` (tests de todos los workspaces)
- `npm run test:ci`
- `npm run typecheck:packages`
- `npm run test:watch:domain`
- `npm run test:watch:application`
- `npm run test:watch:mobile`
---

## Qué NO es

- No es una copia de MyFitnessPal.
- No es una app full-stack en esta fase.
- No es una demo para probar frameworks.

---

## Estado actual

Fase 1 – Diseño de dominio y arquitectura base.

La documentación técnica detallada puede encontrarse en:

- `/docs/domain-model.md`

---

## Principios de diseño

- Separación clara de capas.
- El dominio no depende del framework.
- Reglas explícitas e invariantes documentadas.
- Offline-first como decisión arquitectónica.
- Evitar sobre-ingeniería.

---

## Evolución futura

En fases posteriores se podrá añadir:

- Backend opcional.
- Sincronización.
- Gestión avanzada de micronutrientes.
- Funcionalidades adicionales de producto.

El modelo de dominio actual actúa como especificación de referencia.
