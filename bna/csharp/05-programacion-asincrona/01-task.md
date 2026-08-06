---
tags:
  - csharp
  - programacion-asincrona
---

# `Task` en detalle

Ver también: [[00-que-es-programacion-asincrona]]

## Qué es

Representa **una operación asíncrona en curso** (o ya terminada) — una "promesa" de que en algún momento va a haber un resultado (o va a terminar, si es `void`-like). Vive en `System.Threading.Tasks`.

```csharp
Task<int> tarea = ObtenerNumeroAsync();   // arranca la operación, no bloquea
int resultado = await tarea;               // espera el resultado, sin bloquear el hilo
```

## `Task` vs `Task<T>`

| | Representa |
|---|---|
| `Task` | operación asíncrona que **no devuelve valor** (equivalente async de `void`) |
| `Task<T>` | operación asíncrona que devuelve un valor de tipo `T` |

```csharp
public async Task GuardarLogAsync(string mensaje) { ... }        // no devuelve nada
public async Task<Usuario> ObtenerUsuarioAsync(int id) { ... }   // devuelve Usuario
```

## Estados de un `Task`

Un `Task` tiene un **estado** interno: `Created`, `Running`, `RanToCompletion` (terminó bien), `Faulted` (terminó con excepción), `Canceled`.

```csharp
Task tarea = HacerAlgoAsync();
Console.WriteLine(tarea.IsCompleted);   // true/false
Console.WriteLine(tarea.IsFaulted);     // true si tiró excepción
```

## `await` — cómo se consume un `Task`

`await` suspende la ejecución del método hasta que el `Task` termina, **sin bloquear el hilo** — el hilo queda libre para hacer otra cosa mientras tanto, y retoma cuando el `Task` completa.

```csharp
public async Task<Usuario> ObtenerUsuarioAsync(int id)
{
    Usuario usuario = await _dbContext.Usuarios.FindAsync(id);   // libera el hilo durante la espera
    return usuario;
}
```

Sin `await`, `ObtenerUsuarioAsync(id)` devuelve el `Task<Usuario>` en sí (la "promesa"), no el `Usuario`.

## Excepciones en `Task`

Si el código async tira una excepción, queda **guardada dentro del `Task`** (no se propaga sola) — recién se relanza cuando se hace `await` sobre ese `Task`:

```csharp
public async Task<int> DividirAsync(int a, int b)
{
    return a / b;   // si b == 0, la excepción queda en el Task
}

try
{
    int resultado = await DividirAsync(10, 0);   // acá se relanza la excepción
}
catch (DivideByZeroException ex)
{
    // se maneja normal, como cualquier try/catch
}
```

## Ejecutar varios `Task` en paralelo — `Task.WhenAll`

```csharp
Task<Usuario> t1 = ObtenerUsuarioAsync(1);
Task<Usuario> t2 = ObtenerUsuarioAsync(2);

Usuario[] usuarios = await Task.WhenAll(t1, t2);   // espera a que terminen las dos, en paralelo
```

Mucho más rápido que hacer `await` uno por uno si las operaciones son independientes.

## Resumen

- `Task` = operación asíncrona en curso, `Task<T>` si devuelve un valor
- `await` espera el resultado sin bloquear el hilo
- Excepciones quedan guardadas en el `Task`, se relanzan al hacer `await`
- `Task.WhenAll` corre varios `Task` en paralelo
