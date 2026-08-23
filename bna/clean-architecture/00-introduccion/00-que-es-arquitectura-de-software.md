---
tags:
  - clean-architecture
  - arquitectura-de-software
---

# Qué es la arquitectura de software

La arquitectura de software es el conjunto de **decisiones estructurales de alto nivel** sobre cómo se organiza un sistema: en qué componentes/capas se divide, cómo se comunican entre sí, y qué reglas rigen esas dependencias.

No es el código en sí, sino el **esqueleto** que determina cómo encajan las piezas del código.

## Qué define

- **Componentes**: en qué módulos/capas se separa el sistema (UI, lógica de negocio, acceso a datos, etc.)
- **Responsabilidades**: qué hace cada componente y qué NO le corresponde hacer
- **Dependencias**: quién puede depender de quién (dirección de las flechas)
- **Comunicación**: cómo se pasan datos/mensajes entre componentes

## Para qué sirve

| Objetivo | Qué logra |
|----------|-----------|
| **Mantenibilidad** | cambios en una parte no rompen otras |
| **Testeabilidad** | lógica de negocio se puede testear sin DB, sin UI, sin frameworks |
| **Independencia de frameworks/DB** | cambiar de SQL Server a Postgres, o de ASP.NET a otra cosa, no obliga a reescribir la lógica de negocio |
| **Escalabilidad del equipo** | varias personas trabajan en distintas capas sin pisarse |
| **Longevidad** | el sistema sobrevive a cambios tecnológicos porque las reglas de negocio no dependen de detalles externos |

## El problema que resuelve

Sin arquitectura clara, el código tiende al **acoplamiento total**: la lógica de negocio queda mezclada con el acceso a datos, la UI, el framework web. Resultado:

- difícil de testear (todo depende de la DB o del framework)
- difícil de cambiar (tocar una cosa rompe otra)
- difícil de entender (todo está mezclado)

La arquitectura de software busca **separar responsabilidades** y **controlar las dependencias** para evitar esto.

## Relación con Clean Architecture

Clean Architecture es un **estilo particular** de arquitectura de software: propone organizar el sistema en capas concéntricas donde las dependencias siempre apuntan hacia adentro (hacia la lógica de negocio), nunca hacia afuera (hacia frameworks, DB, UI).

Ver también: [[00-que-es-clean-architecture]]
