---
tags:
  - csharp
  - programacion-funcional
  - introduccion-a-csharp
---

# Programación funcional en C#

C# es multiparadigma: OOP (clases, herencia — ver [[00-clases-y-objetos]], [[02-herencia]]) + funcional. Ideas centrales del paradigma funcional: **funciones como valores**, evitar mutar estado, componer funciones.

## Funciones como "ciudadanos de primera clase"

Una función se puede guardar en una variable, pasar como parámetro, devolver de otra función — igual que cualquier otro dato.

## Expresiones lambda

Función anónima (sin nombre), sintaxis abreviada con `=>` (no confundir con expression-bodied members, ver [[06-expression-bodied-members]] — ahí `=>` reemplaza el cuerpo de un método ya declarado; acá `=>` **crea** una función sin nombre).

```csharp
// lambda que suma dos números
(a, b) => a + b

// lambda que verifica si es par
x => x % 2 == 0
```

## `Func` y `Action` — tipos delegados built-in

Representan "una función" como tipo de dato.

| Tipo | Uso | Ejemplo |
|---|---|---|
| `Func<T, TResultado>` | función que **devuelve** algo | `Func<int, int, int> sumar = (a, b) => a + b;` |
| `Action<T>` | función que **no devuelve** nada (void) | `Action<string> log = msg => Console.WriteLine(msg);` |

```csharp
Func<int, int, int> sumar = (a, b) => a + b;
int resultado = sumar(2, 3);   // 5

Action<string> saludar = nombre => Console.WriteLine($"Hola {nombre}");
saludar("Facundo");            // "Hola Facundo"
```

`Func<...>` — el **último** tipo genérico es el tipo de retorno, los anteriores son los parámetros.

## Funciones de orden superior (higher-order functions)

Función que recibe y/o devuelve otra función.

```csharp
public int AplicarOperacion(int a, int b, Func<int, int, int> operacion)
{
    return operacion(a, b);
}
```

```csharp
int resultado = AplicarOperacion(2, 3, (x, y) => x + y);   // 5
int resultado2 = AplicarOperacion(2, 3, (x, y) => x * y);   // 6
```

## LINQ — programación funcional aplicada a colecciones

Ejemplo más común de estilo funcional en C#: transformar listas con funciones en vez de loops manuales.

```csharp
List<int> numeros = new List<int> { 1, 2, 3, 4, 5, 6 };

var pares = numeros.Where(x => x % 2 == 0);          // filtrar
var duplicados = numeros.Select(x => x * 2);          // transformar
var suma = numeros.Sum();                              // reducir
```

Vs. forma imperativa con loop manual:

```csharp
List<int> pares = new List<int>();
foreach (var x in numeros)
{
    if (x % 2 == 0) pares.Add(x);
}
```

`Where`/`Select` reciben una **lambda** como parámetro — son funciones de orden superior.

## Función pura vs impura

**Pura**: dado el mismo input, siempre devuelve el mismo output, y **no tiene efectos secundarios** (no modifica nada fuera de sí misma: ni variables externas, ni archivos, ni consola, ni base de datos).

```csharp
// pura: mismo input -> siempre mismo output, no toca nada externo
public int Sumar(int a, int b)
{
    return a + b;
}
```

**Impura**: depende de o modifica algo externo a la función — estado global, consola, archivos, red, `DateTime.Now`, `Random`, etc. Mismo input puede dar distinto output, o generar un efecto colateral.

```csharp
int contador = 0;

// impura: modifica una variable externa (efecto secundario)
public void Incrementar()
{
    contador++;
}

// impura: depende de algo externo (hora actual) — mismo input, output distinto cada vez
public bool EsDeManana()
{
    return DateTime.Now.Hour < 12;
}

// impura: efecto secundario (escribe en consola)
public int SumarYMostrar(int a, int b)
{
    Console.WriteLine($"Sumando {a} + {b}");
    return a + b;
}
```

### Por qué importa

| | Pura | Impura |
|---|---|---|
| Predecible | sí, siempre mismo resultado | no necesariamente |
| Fácil de testear | sí, sin mocks ni setup | más difícil (depende de estado externo) |
| Efectos secundarios | ninguno | sí (I/O, mutación, tiempo, red) |
| Paralelizable | sí, sin riesgo | riesgo de condiciones de carrera |

No toda función puede ser pura (backend real necesita leer DB, loguear, etc) — la idea funcional es **minimizar** lo impuro y aislarlo, manteniendo el resto de la lógica (cálculos, transformaciones) pura y testeable.

## Inmutabilidad

Idea funcional: evitar modificar datos existentes, preferir crear uno nuevo. Ejemplo: `Select` no modifica `numeros`, devuelve una colección nueva.

## Resumen

| Concepto | Qué es |
|---|---|
| Lambda (`=>`) | función anónima |
| `Func<...>` | tipo de una función que devuelve valor |
| `Action<...>` | tipo de una función `void` |
| Función de orden superior | recibe/devuelve funciones |
| LINQ (`Where`, `Select`...) | aplica funciones a colecciones, sin loops manuales |
