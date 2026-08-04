---
tags:
  - csharp
  - introduccion-a-csharp
---

# `var` en C# vs `var` en JavaScript

## C# — tipado fuerte, inferido en compilación

`var` en C# **no es dinámico**. El compilador infiere el tipo real a partir del valor asignado, en **tiempo de compilación**, y ese tipo queda fijo para siempre.

```csharp
var nombre = "Facundo";   // compilador infiere: string
var edad = 28;            // compilador infiere: int
var activo = true;        // compilador infiere: bool

nombre = 123;              // ERROR de compilación: no se puede asignar int a string
```

Es **azúcar sintáctico** — `var nombre = "Facundo";` es exactamente lo mismo que `string nombre = "Facundo";`, solo que no escribís el tipo a mano. El tipo sigue existiendo y sigue siendo chequeado por el compilador.

Requiere inicialización obligatoria (si no, no hay de dónde inferir):
```csharp
var x;   // ERROR: no compila, falta el valor inicial
```

## JavaScript — `var` es tipado dinámico

En JS, `var` es una forma de declarar variable **sin tipo fijo**. El valor (y su tipo) puede cambiar libremente en runtime.

```javascript
var nombre = "Facundo";
nombre = 123;        // OK, válido
nombre = true;        // OK, válido también
```

En JS `var` además tiene reglas propias de scope (function-scoped, hoisting) que no tienen nada que ver con tipos — es un tema totalmente distinto al de C#.

## La diferencia clave

| | C# `var` | JS `var` |
|---|---|---|
| Tipo | Fijo, inferido en compilación | No existe tipo fijo, dinámico |
| Cuándo se resuelve | Compile-time | Runtime |
| Reasignar otro tipo | ❌ error de compilación | ✅ permitido |
| Qué es en el fondo | Alias del tipo real (`string`, `int`, etc) | Variable sin tipo |

**Resumen mental**: en C#, `var` = "no quiero escribir el tipo, pero sigue siendo estricto". En JS, `var` = "esta variable no tiene tipo fijo, nunca".
