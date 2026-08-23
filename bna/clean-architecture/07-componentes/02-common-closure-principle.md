---
tags:
  - clean-architecture
  - componentes
  - cohesion
---

# Common Closure Principle (CCP)

Ver también: [[01-reuse-release-equivalence-principle]]

Segundo principio de **cohesión de componentes**. Es la versión de SRP (ver [[../06-principios-solid/00-single-responsibility-principle]]) aplicada a componentes en vez de a clases.

## Enunciado

> Agrupar en el mismo componente las clases que cambian por las mismas razones y al mismo tiempo. Separar en componentes distintos las clases que cambian por razones distintas.

## Por qué importa: minimizar el radio de un cambio

Si dos clases casi siempre cambian juntas pero viven en componentes distintos, cada cambio obliga a **recompilar, re-versionar y redesplegar dos componentes** en vez de uno. CCP busca que un cambio de negocio impacte en **el menor número posible de componentes**.

```
mal:  cambia la regla de cálculo de interés
      → toca MiApp.Domain.dll (regla)
      → toca MiApp.Reportes.dll (porque ahí vive, sin razón, la validación relacionada)
      → dos componentes a recompilar, versionar y desplegar por un solo cambio de negocio
```

## Ejemplo — agrupar por razón de cambio, no por "tipo técnico"

```csharp
// mal: agrupado por "tipo" (todas las validaciones juntas, sin importar de qué dominio son)
// MiApp.Validaciones.dll
class ValidadorPrestamo { /* cambia cuando cambia la política de préstamos */ }
class ValidadorFactura { /* cambia cuando cambia la política de facturación */ }
class ValidadorUsuario { /* cambia cuando cambia la política de alta de usuarios */ }
```
Estas tres clases no cambian por la misma razón ni al mismo tiempo — agruparlas solo porque "las tres son validadores" obliga a re-versionar `MiApp.Validaciones.dll` cada vez que cambia cualquiera de las tres políticas, aunque no estén relacionadas entre sí.

```csharp
// bien: agrupado por área de negocio — cada componente cambia por una sola razón
// MiApp.Prestamos.dll
class ValidadorPrestamo { }
class CalculadoraInteres { }
class PrestamoUseCase { }

// MiApp.Facturacion.dll
class ValidadorFactura { }
class CalculadoraImpuesto { }
class FacturaUseCase { }
```
Un cambio en la política de préstamos ahora solo toca `MiApp.Prestamos.dll` — `MiApp.Facturacion.dll` ni se recompila.

## Relación con SRP

CCP es SRP escalado: SRP dice "una clase, una razón de cambio, un actor". CCP dice "un componente, una razón de cambio, un actor" — agrupando las clases que responden al mismo actor en el mismo componente, para que ese actor tenga que tocar (y redesplegar) un solo lugar.

## Tensión con REP

CCP prioriza **facilidad de mantenimiento** (agrupar lo que cambia junto), mientras que REP (ver [[01-reuse-release-equivalence-principle]]) prioriza **reusabilidad** (agrupar lo que se reusa junto). No siempre coinciden:

- Optimizar solo para CCP → componentes muy específicos de una app, difíciles de reusar en otro contexto
- Optimizar solo para REP → componentes muy genéricos, cualquier cambio interno obliga a re-versionar y tocar muchos consumidores

En proyectos nuevos suele pesar más CCP (se prioriza desarrollo ágil); a medida que el sistema madura y partes se estabilizan, esas partes migran hacia el extremo de REP (se extraen como librerías reusables versionadas).

## Relación con Clean Architecture

CCP es la razón por la que, en una solución típica, `MiApp.Application` agrupa **todos** los casos de uso de negocio (que cambian juntos cuando cambian las reglas de la aplicación) separados de `MiApp.Infrastructure` (que cambia por razones técnicas: driver de DB, versión de un SDK externo) — cada componente responde a un actor distinto, igual que las capas de Clean Architecture.

Ver también: [[03-common-reuse-principle]]
