---
tags:
  - clean-architecture
  - componentes
  - acoplamiento
---

# Acyclic Dependencies Principle (ADP)

Ver también: [[03-common-reuse-principle]]

Primer principio de **acoplamiento de componentes** — de los tres que definen cómo deberían relacionarse los componentes entre sí (los otros dos: [[05-stable-dependencies-principle]] y [[06-stable-abstractions-principle]]).

## Enunciado

> El grafo de dependencias entre componentes no debe tener ciclos.

Si `A` depende de `B`, `B` no puede depender (directa ni transitivamente) de `A`.

## Por qué un ciclo es un problema real

```
MiApp.Domain ──> MiApp.Infrastructure ──> MiApp.Domain   (CICLO)
```
Con un ciclo, los componentes involucrados **dejan de ser independientes** — en la práctica se comportan como un solo componente grande, aunque estén en archivos/proyectos separados:

- No se puede compilar/versionar uno sin el otro
- No se puede testear uno sin traer el otro
- Un cambio en `MiApp.Infrastructure` puede obligar a recompilar `MiApp.Domain`, algo que Clean Architecture prohíbe explícitamente

En .NET, el compilador **directamente no permite** una referencia circular entre proyectos (`ProjectReference` circular = error de build) — pero el ciclo puede existir igual a nivel de diseño si dos componentes dependen indirectamente uno del otro a través de un tercero, o si se resuelve "mal" con reflection/carga dinámica para esquivar el error del compilador.

## Ejemplo de cómo aparece un ciclo

```csharp
// MiApp.Domain — define la entidad
namespace MiApp.Domain;
public class Usuario
{
    public int Id { get; set; }
    // mal: la entidad de dominio conoce un DTO de infraestructura
    public UsuarioDbModel ToDbModel() => new UsuarioDbModel { Id = Id };
}
```
```csharp
// MiApp.Infrastructure — depende de Domain para mapear
namespace MiApp.Infrastructure;
public class UsuarioDbModel
{
    public int Id { get; set; }
}
```
Si `MiApp.Domain.Usuario` referencia `MiApp.Infrastructure.UsuarioDbModel` (como en `ToDbModel()`), y `MiApp.Infrastructure` ya referencia `MiApp.Domain` (para mapear `Usuario` a su modelo de DB), hay un ciclo: `Domain → Infrastructure → Domain`.

## Rompiendo el ciclo — Dependency Inversion Principle otra vez

La solución es la misma herramienta que en DIP a nivel de clases (ver [[../06-principios-solid/04-dependency-inversion-principle]]): mover la abstracción al lado de quien la necesita.

```csharp
// MiApp.Domain — no sabe nada de infraestructura
namespace MiApp.Domain;
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
}
```
```csharp
// MiApp.Infrastructure — el mapeo vive acá, este componente ya depende de Domain de todas formas
namespace MiApp.Infrastructure;
public class UsuarioDbModel
{
    public int Id { get; set; }
    public string Nombre { get; set; }

    public static UsuarioDbModel DesdeUsuario(Domain.Usuario u) =>
        new UsuarioDbModel { Id = u.Id, Nombre = u.Nombre };
}
```
Ahora la flecha va en un solo sentido: `MiApp.Infrastructure → MiApp.Domain`. El ciclo desaparece porque `Domain` dejó de necesitar conocer nada de `Infrastructure`.

## Ejemplo con tres componentes — ciclo indirecto

```
MiApp.Api ──> MiApp.Application ──> MiApp.Infrastructure ──> MiApp.Api   (CICLO, vía 3 saltos)
```
Esto pasa, por ejemplo, si `MiApp.Infrastructure` necesita un tipo definido en `MiApp.Api` (como un DTO de request) para mapear una respuesta. Se resuelve moviendo ese tipo compartido a un componente más interno del que ambos puedan depender sin ciclo (ej. a `MiApp.Application`), en vez de que `Infrastructure` mire hacia afuera, hacia `Api`.

## Cómo detectarlo

- El build falla con "circular project reference" al intentar agregar una `ProjectReference`
- Dos equipos que trabajan en componentes distintos no pueden compilar ni testear su parte sin levantar la otra
- Diagramas de dependencias (se pueden generar con herramientas como NDepend o `dotnet list package --include-transitive`) muestran flechas que vuelven al origen

## Relación con Clean Architecture

ADP es la razón matemática/estructural detrás de la **regla de dependencia**: si las flechas entre círculos concéntricos formaran un ciclo, ya no habría "adentro" ni "afuera" — la arquitectura entera perdería sentido. Mantener el grafo de componentes acíclico es lo que garantiza que Entities y Use Cases puedan compilarse, testearse y desplegarse sin arrastrar nunca a Frameworks & Drivers.

Ver también: [[05-stable-dependencies-principle]]
