---
tags:
  - clean-architecture
  - componentes
  - cohesion
---

# Reuse-Release Equivalence Principle (REP)

Ver también: [[00-que-son-los-componentes]]

Primer principio de **cohesión de componentes** — de los tres que definen qué clases deberían agruparse dentro de un mismo componente (los otros dos: [[02-common-closure-principle]] y [[03-common-reuse-principle]]).

## Enunciado

> La unidad de reutilización es la unidad de release (lanzamiento/versionado).

Lo que se reutiliza tiene que ser lo mismo que se **versiona y libera como un todo**. No se puede reutilizar de forma confiable algo que no está agrupado, versionado y documentado como una unidad.

## Qué significa en la práctica

Si un componente se va a reusar en otros proyectos, tiene que:

1. **Agrupar clases relacionadas** que tenga sentido versionar juntas
2. **Tener número de versión** (semantic versioning: `MAJOR.MINOR.PATCH`)
3. **Tener release notes** — qué cambió, qué se rompió, qué es compatible hacia atrás
4. **Publicarse** de forma que otros lo consuman sin ver el código fuente (ej. paquete NuGet)

```
FluentValidation 11.9.0
FluentValidation 11.10.1  ← cambios documentados, compatible con 11.x
FluentValidation 12.0.0   ← breaking change, requiere adaptar código consumidor
```

## Por qué importa: el costo de reusar sin versión

Sin REP, "reusar código" termina siendo copiar y pegar una clase de un proyecto a otro — cada copia diverge con el tiempo, sin forma de saber qué versión tiene cada una, ni qué cambió entre ellas.

```csharp
// mal: la clase "compartida" se copia y pega entre proyectos
// ProyectoA/Validaciones/ValidadorEmail.cs
// ProyectoB/Validaciones/ValidadorEmail.cs   ← copia, ya diverge con el tiempo
public class ValidadorEmail
{
    public bool EsValido(string email) => email.Contains("@");
}
```
```xml
<!-- bien: componente versionado, referenciado, no copiado -->
<PackageReference Include="MiEmpresa.Validaciones" Version="2.3.0" />
```
Con el paquete versionado, si `MiEmpresa.Validaciones` mejora la validación de email en `2.4.0`, **todos** los proyectos que lo referencian pueden actualizar de forma controlada, leyendo el changelog, sin reescribir nada a mano.

## Ejemplo: extrayendo un componente reusable en .NET

Supongamos que `ValidadorEmail` se usa en tres proyectos internos de un banco. Para aplicar REP:

```xml
<!-- MiEmpresa.Validaciones.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PackageId>MiEmpresa.Validaciones</PackageId>
    <Version>1.0.0</Version>
  </PropertyGroup>
</Project>
```
```csharp
namespace MiEmpresa.Validaciones;

public class ValidadorEmail
{
    public bool EsValido(string email) =>
        !string.IsNullOrWhiteSpace(email) && email.Contains('@');
}
```
Se empaqueta (`dotnet pack`) y se publica a un feed NuGet interno. Cada proyecto consumidor referencia una versión específica — y cuando el equipo dueño del componente mejora la validación, publica `1.1.0` con notas de qué cambió, y cada consumidor decide **cuándo** actualizar.

## La tensión con Common Closure Principle

REP empuja a agrupar por "qué se reusa junto" — pero eso puede chocar con agrupar por "qué cambia junto" (Common Closure Principle). Encontrar el balance correcto entre estos principios es el trabajo real de diseñar los límites de un componente: agrupar demasiado poco genera fricción de versionado excesiva (actualizar 10 paquetes chicos para un solo cambio), agrupar demasiado genera acoplamiento innecesario (un consumidor que solo necesita una clase se ve forzado a traer todo el paquete).

## Relación con Clean Architecture

Un componente de Entities/Use Cases bien diseñado, si se pudiera reusar entre distintas aplicaciones (ej. distintos front-ends que comparten la misma lógica de negocio de un banco), necesita cumplir REP: versión clara, release notes, compatibilidad hacia atrás — de lo contrario "reusarlo" es en realidad copiar y arriesgarse a que diverja.
