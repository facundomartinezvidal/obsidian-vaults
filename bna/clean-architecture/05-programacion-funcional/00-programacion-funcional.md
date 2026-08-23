---
tags:
  - clean-architecture
  - paradigmas
  - programacion-funcional
---

# Programación funcional

Ver también: [[00-que-son-los-paradigmas-de-programacion]], [[00-programacion-orientada-a-objetos]]

## Qué es realmente (según Uncle Bob)

La programación funcional es la disciplina que **restringe la asignación** (mutación de estado). Sus conceptos vienen del cálculo lambda, pero lo que importa para la arquitectura es una idea simple: **las variables, una vez creadas, no cambian de valor**.

```csharp
// no funcional: mutación
int total = 0;
foreach (var m in montos) total += m;

// funcional: sin mutación, cada paso genera un valor nuevo
int total = montos.Sum();
```

## Por qué importa: concurrencia sin condiciones de carrera

Todos los problemas clásicos de concurrencia — **condiciones de carrera, deadlocks, updates concurrentes** — existen porque hay **estado mutable compartido**. Si nada muta, no hay nada que dos hilos puedan pisarse.

```csharp
// riesgo de condición de carrera: dos hilos mutan `saldo` a la vez
decimal saldo = 100;
void Retirar(decimal monto) => saldo -= monto; // no thread-safe

// sin mutación: cada operación devuelve un nuevo estado
decimal Retirar(decimal saldoActual, decimal monto) => saldoActual - monto;
// el llamador decide qué hacer con el resultado, no hay estado compartido que romper
```

Una aplicación totalmente inmutable sería trivialmente concurrente. En la práctica, el hardware real necesita mutar estado (memoria, DB) — pero eso no significa que *todo* el código tenga que mutar.

## La estrategia práctica: segregar mutabilidad

No hace falta (ni conviene) escribir toda la aplicación en estilo funcional puro. La estrategia de Uncle Bob es **segregar** el sistema en:

| Componente | Características |
|---|---|
| **Componentes inmutables** | procesan datos sin mutación, funciones puras, fáciles de testear y paralelizar |
| **Componentes mutables** | manejan el estado que sí necesita cambiar, aislados y minimizados |

La mayor parte de la lógica de negocio (cálculos, transformaciones, reglas) puede vivir en la parte inmutable. Solo lo estrictamente necesario (persistencia, I/O) vive en la parte mutable.

```csharp
// parte inmutable: pura, testeable sin mocks, sin efectos secundarios
static decimal CalcularInteres(decimal capital, decimal tasa) => capital * tasa;

// parte mutable: aislada, es la única que toca estado/DB
class CuentaService
{
    private readonly IRepository _repo;
    public void AplicarInteres(int cuentaId, decimal tasa)
    {
        var cuenta = _repo.Obtener(cuentaId);
        var interes = CalcularInteres(cuenta.Saldo, tasa); // usa la parte pura
        _repo.Guardar(cuentaId, cuenta.Saldo + interes);
    }
}
```

## Event sourcing: mutación cero como técnica de storage

Otra idea del paradigma funcional aplicada a arquitectura: en vez de guardar y mutar el **estado actual** (ej. `saldo = 500`), se guardan **todos los eventos/transacciones** (depósitos, retiros) y el estado se calcula sumándolos.

```csharp
// en vez de mutar un registro "saldo"
// se guarda la secuencia de eventos, inmutable, append-only
var eventos = new List<Transaccion>
{
    new Deposito(100),
    new Deposito(50),
    new Retiro(30),
};

decimal saldo = eventos.Sum(e => e.Monto); // se recalcula, nunca se muta
```

Con suficiente memoria/almacenamiento, esto elimina por completo la necesidad de mutar — el "estado" siempre se deriva, nunca se sobreescribe. Es la base conceptual de sistemas como event sourcing y CQRS.

## Funciones puras y transparencia referencial

Una función es **pura** si:
1. Su salida depende solo de sus entradas (no de estado externo)
2. No produce efectos secundarios (no muta nada fuera de sí misma, no hace I/O)

```csharp
// impura: depende de estado externo (DateTime.Now) y no es reproducible
decimal CalcularEdad(DateTime nacimiento) => (DateTime.Now - nacimiento).Days / 365;

// pura: mismo input siempre da mismo output
int CalcularEdad(DateTime nacimiento, DateTime ahora) => (ahora - nacimiento).Days / 365;
```
Esto se llama **transparencia referencial**: una llamada a la función se puede reemplazar por su valor de retorno sin cambiar el comportamiento del programa. Es lo que hace a las funciones puras triviales de testear (no hace falta mockear nada) y seguras de paralelizar (no hay estado compartido que proteger).

## Funciones de primera clase y de orden superior

En C#, las funciones son **valores** (`Func<>`, `Action<>`, `Predicate<>`) — se pueden pasar como parámetro, devolver, y guardar en variables.

```csharp
// función de orden superior: recibe otra función como parámetro
IEnumerable<decimal> AplicarA(IEnumerable<decimal> valores, Func<decimal, decimal> f) =>
    valores.Select(f);

var montos = new List<decimal> { 100, 200, 300 };
var conDescuento = AplicarA(montos, m => m * 0.9m);
```
LINQ (`Select`, `Where`, `Aggregate`, `Sum`) es, en esencia, un conjunto de funciones de orden superior sobre colecciones — la forma más común de "estilo funcional" en C# del día a día.

```csharp
// composición de operaciones puras, sin mutar la colección original
var resultado = montos
    .Where(m => m > 100)
    .Select(m => m * 0.9m)
    .Aggregate(0m, (acumulado, actual) => acumulado + actual);
```

## Inmutabilidad en C# — herramientas concretas

```csharp
// record: tipo inmutable por defecto, ideal para modelar datos de negocio
public record Cliente(string Nombre, bool EsVip);

var c1 = new Cliente("Juan", false);
var c2 = c1 with { EsVip = true }; // no muta c1, crea uno nuevo
```
```csharp
// readonly: el campo solo se puede asignar en el constructor
class Cuenta
{
    public readonly decimal SaldoInicial;
    public Cuenta(decimal saldoInicial) => SaldoInicial = saldoInicial;
}
```
```csharp
// colecciones inmutables: cualquier "modificación" devuelve una copia nueva
using System.Collections.Immutable;

ImmutableList<int> lista = ImmutableList.Create(1, 2, 3);
ImmutableList<int> nuevaLista = lista.Add(4); // lista original queda intacta
```

## Recursión en vez de mutación de contador

El estilo funcional puro prefiere recursión a loops con variables mutables, aunque en C# el loop suele ser más idiomático y performante (sin tail-call optimization garantizada):

```csharp
// con mutación
int Sumar(int[] nums)
{
    int total = 0;
    foreach (var n in nums) total += n;
    return total;
}

// recursivo, sin mutación de variable acumuladora visible desde afuera
int Sumar(int[] nums, int i = 0) =>
    i >= nums.Length ? 0 : nums[i] + Sumar(nums, i + 1);
```
En la práctica, con C# se suele preferir `nums.Sum()` (LINQ) — funcional en espíritu, sin el costo de la recursión manual.

## Memoización — cachear resultados de funciones puras

Como una función pura siempre da el mismo resultado para el mismo input, su resultado se puede **cachear** con seguridad:

```csharp
var cache = new Dictionary<int, long>();

long Fibonacci(int n)
{
    if (n <= 1) return n;
    if (cache.TryGetValue(n, out var valor)) return valor;

    var resultado = Fibonacci(n - 1) + Fibonacci(n - 2);
    cache[n] = resultado;
    return resultado;
}
```
Esto es seguro **solo** porque `Fibonacci` es pura — con una función impura, cachear el resultado podría devolver datos viejos/incorrectos.

## Relación con Clean Architecture

La programación funcional aporta la disciplina de **dónde y cuánto mutar estado**. Complementa a los otros dos paradigmas:

| Paradigma | Disciplina que aporta |
|---|---|
| Estructurado | orden del flujo de control (sin `goto`) |
| Orientado a objetos | dirección de las dependencias (inversión de dependencias vía polimorfismo) |
| Funcional | ubicación y momento de la mutación de estado |

En Clean Architecture, la lógica de negocio (Entities, Use Cases) se beneficia de tender a la inmutabilidad: más fácil de testear, de razonar, y de paralelizar. El estado mutable (DB, I/O) queda empujado hacia las capas externas (Frameworks & Drivers).
