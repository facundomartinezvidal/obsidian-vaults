---
tags:
  - csharp
  - introduccion-a-csharp
---

# `record`

Ver también: [[00-clases-y-objetos]], [[09-struct]]

## Qué es

Tipo de dato pensado para **modelar datos inmutables**, con comparación por **valor** en vez de por referencia. Es un `class` (por defecto, tipo referencia) pero con un montón de comportamiento generado automático por el compilador.

```csharp
public record Persona(string Nombre, int Edad);
```

Esa única línea genera: propiedades `Nombre`/`Edad` (solo lectura), constructor, `ToString()`, comparación por valor, y más — todo lo que en una `class` tendrías que escribir a mano.

## Problema que resuelve — comparación con `class`

Con `class`, `==` compara **referencia** (¿es el mismo objeto en memoria?), no los datos:

```csharp
public class PersonaClase
{
    public string Nombre { get; set; }
}

var p1 = new PersonaClase { Nombre = "Facundo" };
var p2 = new PersonaClase { Nombre = "Facundo" };
Console.WriteLine(p1 == p2);   // false -> son dos objetos distintos, aunque mismos datos
```

Con `record`, `==` compara **valor** (¿tienen los mismos datos?):

```csharp
public record PersonaRecord(string Nombre);

var r1 = new PersonaRecord("Facundo");
var r2 = new PersonaRecord("Facundo");
Console.WriteLine(r1 == r2);   // true -> mismos datos, aunque son objetos distintos
```

## `ToString()` automático — ver [[05-tostring]]

```csharp
var p = new PersonaRecord("Facundo", 28);
Console.WriteLine(p);   // "PersonaRecord { Nombre = Facundo, Edad = 28 }" -- sin escribir nada
```

Con `class` normal habría que hacer `override ToString()` a mano para esto.

## Inmutabilidad — ver [[08-programacion-funcional]]

Por defecto las propiedades de un `record` son **`init`** (se setean al crear, no se pueden modificar después) — encaja con la idea funcional de evitar mutar estado:

```csharp
var p = new PersonaRecord("Facundo", 28);
p.Nombre = "Otro";   // ERROR de compilación: init-only, no se puede reasignar
```

Para "modificar" un record se crea una copia nueva con `with`:
```csharp
var p2 = p with { Edad = 29 };   // copia p, cambia solo Edad
```

## Cuándo usar record vs class vs struct

| | `class` | `struct` | `record` |
|---|---|---|---|
| Tipo | referencia | valor | referencia (por defecto) |
| Comparación (`==`) | referencia | valor (campos) | **valor** (propiedades) |
| Mutable | sí | sí | no por defecto (`init`) |
| Uso típico | entidades con identidad y estado (backend: `Usuario`, `Pedido`) | datos chicos, tipo valor (`Punto`, `Color`) | DTOs, modelos de datos inmutables, transferencia de datos entre capas |

## Muy usado en backend para DTOs

```csharp
public record UsuarioDto(string Nombre, string Email);
```

Perfecto para representar el body de un request/response — ver [[00-estructura-request-response]] — datos que entran/salen, no necesitan identidad ni mutabilidad, solo comparar y mostrar.
