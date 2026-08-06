---
tags:
  - csharp
  - manejo-de-errores
---

# Propuestas para manejo de errores

Ver también: [[03-controladores]], [[02-personalizacion-de-mensajes-de-error|02-personalizacion-de-mensajes-de-error]]

## El problema

Sin una estrategia definida, cada endpoint termina manejando errores a su manera — algunos con `try/catch` propio, otros dejando que la excepción explote sin control y devuelva un `500` genérico sin información útil. Inconsistente para el cliente de la API y repetitivo de escribir.

## Propuesta 1 — `try/catch` en cada action

```csharp
[HttpGet("{id}")]
public async Task<IActionResult> ObtenerUsuario(int id)
{
    try
    {
        var usuario = await _usuarioService.ObtenerUsuario(id);
        return Ok(usuario);
    }
    catch (KeyNotFoundException)
    {
        return NotFound();
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}
```

- Más simple de entender, control total por endpoint
- **Problema**: se repite en cada action de cada controller — mucho boilerplate, fácil olvidarse de un caso en algún endpoint

## Propuesta 2 — Middleware global de excepciones

Un único punto que intercepta **cualquier** excepción no manejada en toda la app:

```csharp
public class ManejoDeErroresMiddleware
{
    private readonly RequestDelegate _next;

    public ManejoDeErroresMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (KeyNotFoundException ex)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            await context.Response.WriteAsJsonAsync(new { error = "Ocurrió un error inesperado" });
        }
    }
}
```

```csharp
// Program.cs
app.UseMiddleware<ManejoDeErroresMiddleware>();
```

- Un solo lugar para mapear tipo de excepción → código HTTP + formato de respuesta
- Los controllers quedan limpios, sin `try/catch` repetido
- Se ve en detalle en otra clase de esta sección

## Propuesta 3 — Excepciones custom por tipo de error

En vez de usar excepciones genéricas de .NET (`Exception`, `InvalidOperationException`), definir excepciones propias que representen casos de negocio:

```csharp
public class RecursoNoEncontradoException : Exception
{
    public RecursoNoEncontradoException(string mensaje) : base(mensaje) { }
}

public class ReglaDeNegocioException : Exception
{
    public ReglaDeNegocioException(string mensaje) : base(mensaje) { }
}
```

```csharp
public async Task<Usuario> ObtenerUsuario(int id)
{
    var usuario = await _repository.ObtenerPorId(id);
    if (usuario is null) throw new RecursoNoEncontradoException($"Usuario {id} no encontrado");
    return usuario;
}
```

- El middleware (Propuesta 2) mapea cada tipo custom a su código HTTP correspondiente — más expresivo que capturar `Exception` genérica
- El código de negocio (services) comunica **qué pasó**, no **cómo responder HTTP** — esa decisión queda en la capa de manejo de errores

## Propuesta 4 — `ProblemDetails` (estándar RFC 7807)

Formato estándar para respuestas de error en APIs HTTP, ya integrado en ASP.NET:

```csharp
return Problem(
    title: "Usuario no encontrado",
    statusCode: 404,
    detail: $"No existe un usuario con id {id}"
);
```

Respuesta resultante:
```json
{
  "title": "Usuario no encontrado",
  "status": 404,
  "detail": "No existe un usuario con id 42"
}
```

- Formato consistente y estandarizado — muchos clientes/frameworks ya saben interpretarlo
- Se puede combinar con las propuestas 2 y 3: el middleware captura la excepción custom y arma el `ProblemDetails` correspondiente

## Cuál conviene

No son excluyentes — la combinación más común: **excepciones custom** (Propuesta 3) lanzadas desde services/repositories, capturadas por un **middleware global** (Propuesta 2) que las traduce a **`ProblemDetails`** (Propuesta 4). El `try/catch` por endpoint (Propuesta 1) queda reservado para casos muy puntuales donde un endpoint necesita un manejo distinto al resto.

## Resumen

- `try/catch` por endpoint: simple pero repetitivo, no escala
- Middleware global: centraliza el manejo, controllers quedan limpios
- Excepciones custom: separan "qué pasó" (negocio) de "cómo se responde" (HTTP)
- `ProblemDetails`: formato estándar de respuesta de error
- Enfoque recomendado: excepciones custom + middleware global + `ProblemDetails`, combinados
