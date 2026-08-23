---
tags:
  - clean-architecture
  - componentes
  - acoplamiento
---

# Stable Dependencies Principle (SDP)

Ver también: [[04-acyclic-dependencies-principle]]

Segundo principio de **acoplamiento de componentes**.

## Enunciado

> Dependé en la dirección de la estabilidad. Un componente debe depender solo de componentes más estables que él (o igual de estables).

Un componente **estable** es costoso de cambiar (muchas cosas dependen de él). Un componente **inestable** es fácil de cambiar (poco o nada depende de él).

## Qué hace estable a un componente

No es sobre "qué tan seguido cambia" — es sobre **cuánto le cuesta cambiar**, medido por cuántas cosas dependerían de tocarlo:

- **Fan-in** (Ca): cuántos componentes de afuera dependen de este componente
- **Fan-out** (Ce): cuántos componentes de afuera este componente necesita
- **Inestabilidad** (I) = `Ce / (Ca + Ce)` → va de 0 (totalmente estable) a 1 (totalmente inestable)

```
Componente con Ca=10, Ce=0  → I = 0/10 = 0    (muy estable — 10 cosas dependen de él, él no depende de nada)
Componente con Ca=0, Ce=5   → I = 5/5 = 1     (muy inestable — nadie depende de él, él depende de todo)
```

## Ejemplo — violación de SDP

```
MiApp.Domain (Ca=8, Ce=0, I=0 → muy estable)
      ↑
      │ depende de
      │
MiApp.Infrastructure (Ca=0, Ce=6, I=1 → muy inestable)
```
Si `MiApp.Domain` (estable, 8 componentes dependen de él) depende de `MiApp.Infrastructure` (inestable, cambia seguido porque integra librerías externas, drivers de DB, SDKs de terceros), cada cambio en infraestructura **arrastra la posibilidad de romper 8 componentes** que dependen de `Domain`. Esto es exactamente al revés de lo deseable.

```csharp
// mal: MiApp.Domain (estable) depende de un detalle de MiApp.Infrastructure (inestable)
namespace MiApp.Domain;
using MiApp.Infrastructure; // referencia hacia algo inestable

public class Usuario
{
    public void Guardar() => new SqlConnection("...").Open(); // acoplado a ADO.NET directo
}
```

## Aplicando SDP

```csharp
// bien: MiApp.Domain define la abstracción, no depende de nada inestable
namespace MiApp.Domain;

public interface IUsuarioRepository
{
    void Guardar(Usuario u);
}

public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    // sin dependencia a infraestructura
}
```
```csharp
// MiApp.Infrastructure (inestable) depende de MiApp.Domain (estable) — dirección correcta
namespace MiApp.Infrastructure;
using MiApp.Domain;

public class UsuarioRepositorySql : IUsuarioRepository
{
    public void Guardar(Usuario u) { /* ADO.NET / EF Core acá */ }
}
```
Ahora los cambios en `MiApp.Infrastructure` (cambiar de SQL Server a Postgres, actualizar EF Core) nunca obligan a tocar `MiApp.Domain`, ni ponen en riesgo a los 8 componentes que dependen de él.

## Midiendo Ca/Ce en un proyecto .NET real

Se puede aproximar mirando referencias de proyecto:
```
dotnet list MiApp.Domain.csproj reference          → Ce (a quién referencia Domain: idealmente nadie)
grep -rl "ProjectReference.*MiApp.Domain" **/*.csproj → Ca (quién referencia a Domain: muchos)
```
Un componente con `Ca` alto y `Ce` bajo (como `Domain`) es candidato natural a ser el centro estable del sistema — coincide justo con el centro de los círculos de Clean Architecture.

## Por qué esto no significa "todo debe ser estable"

Un sistema 100% estable sería imposible de cambiar (nada se podría modificar sin romper todo lo que depende de él). Se necesitan componentes **inestables** — son los que absorben el cambio (UI, integraciones, detalles técnicos). SDP no dice "sé estable siempre", dice **"la dirección de las dependencias tiene que ir hacia lo más estable"** — lo volátil depende de lo sólido, no al revés.

## Relación con Clean Architecture

SDP explica **por qué** las capas internas (Entities, Use Cases) deben ser las más estables del sistema y las externas (Frameworks & Drivers) las más inestables: es literalmente la propiedad que hace segura la regla de dependencia. Sin SDP, "depender hacia adentro" sería una convención arbitraria; con SDP, es la consecuencia lógica de minimizar el costo de cambio.

Ver también: [[06-stable-abstractions-principle]]
