---
tags:
  - clean-architecture
---

# Qué es Clean Architecture

Clean Architecture es un estilo de arquitectura de software propuesto por Robert C. Martin (Uncle Bob) que organiza el sistema en **capas concéntricas**, donde las dependencias siempre apuntan **hacia adentro**.

Ver también: [[00-que-es-arquitectura-de-software]]

## Idea central

El centro del sistema es la **lógica de negocio** (entidades y casos de uso). Todo lo demás — DB, UI, frameworks, servicios externos — es un **detalle** que rodea ese centro y depende de él, nunca al revés.

```
   ┌─────────────────────────────┐
   │   Frameworks & Drivers      │  DB, Web, UI, dispositivos externos
   │  ┌───────────────────────┐  │
   │  │  Interface Adapters    │  │  Controllers, Presenters, Gateways
   │  │  ┌─────────────────┐  │  │
   │  │  │  Application      │  │  │  Casos de uso (Use Cases)
   │  │  │  Business Rules   │  │  │
   │  │  │  ┌─────────────┐ │  │  │
   │  │  │  │  Enterprise │ │  │  │  Entidades / reglas de negocio
   │  │  │  │  Business   │ │  │  │
   │  │  │  │  Rules      │ │  │  │
   │  │  │  └─────────────┘ │  │  │
   │  │  └─────────────────┘  │  │
   │  └───────────────────────┘  │
   └─────────────────────────────┘
```

## La regla de dependencia

> Las dependencias del código fuente solo pueden apuntar hacia adentro.

Nada en un círculo interno sabe algo de un círculo externo. El nombre de una función/clase/variable declarada en un círculo externo no debe mencionarse en el código de un círculo interno.

Consecuencia: la **lógica de negocio no conoce ni depende de**:
- el framework web (ASP.NET, Express, etc.)
- la base de datos (SQL Server, Postgres, Mongo)
- la UI
- servicios externos (APIs, colas, etc.)

## Capas típicas

| Capa | Contiene | Depende de |
|------|----------|------------|
| **Entities** | reglas de negocio más generales, independientes de la app | nada |
| **Use Cases** | reglas de negocio específicas de la aplicación, orquestan entidades | Entities |
| **Interface Adapters** | controllers, presenters, DTOs — convierten datos entre casos de uso y el mundo externo | Use Cases |
| **Frameworks & Drivers** | web framework, DB, UI, herramientas externas | Interface Adapters |

## Por qué invertir las dependencias

Sin esto, la lógica de negocio termina acoplada al framework/DB de turno: cambiar de ORM o de framework web obliga a tocar reglas de negocio. Con Clean Architecture, esos detalles son **reemplazables** sin tocar el centro.

Se logra con **inyección de dependencias** e **interfaces**: la capa interna define una interfaz (ej. `IUsuarioRepository`), y la capa externa la implementa (ej. `UsuarioRepositorySql`). La capa interna nunca conoce la implementación concreta.

## Beneficios

- **Independiente de frameworks**: el framework es una herramienta, no una atadura
- **Testeable**: reglas de negocio se testean sin DB, sin UI, sin servidor
- **Independiente de UI**: se puede cambiar de web a consola sin tocar lógica de negocio
- **Independiente de DB**: se puede cambiar de motor de base de datos sin tocar reglas de negocio
- **Independiente de agentes externos**: reglas de negocio no saben nada del mundo exterior
