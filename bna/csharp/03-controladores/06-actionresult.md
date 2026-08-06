---
tags:
  - csharp
  - controladores
  - aspnet
---

# `IActionResult` en profundidad

Ver también: [[01-controladores]], [[02-metodos-http-en-controller]], [[01-http|http]]

## Qué es

Tipo de retorno de un método de controller que representa **una respuesta HTTP completa** — status code + headers + body — no solo un dato. `ControllerBase` (ver [[01-controladores]]) trae métodos helper que devuelven cada tipo de respuesta ya armada.

```csharp
[HttpGet("{id}")]
public IActionResult Get(int id)
{
    if (id <= 0) return BadRequest("Id inválido");

    var usuario = BuscarUsuario(id);
    if (usuario is null) return NotFound();

    return Ok(usuario);
}
```

Cada `return` devuelve un status code distinto según el caso — imposible de hacer devolviendo solo el dato (`return usuario;`).

## Helpers más usados — mapeo a status code

| Helper | Status | Uso |
|---|---|---|
| `Ok(dato)` | 200 | éxito, devuelve datos |
| `Created(uri, dato)` | 201 | recurso creado (POST) |
| `NoContent()` | 204 | éxito, sin body (DELETE, PUT) |
| `BadRequest(error)` | 400 | request inválido |
| `Unauthorized()` | 401 | falta autenticación |
| `Forbid()` | 403 | autenticado pero sin permiso |
| `NotFound()` | 404 | recurso no existe |
| `Conflict(error)` | 409 | conflicto (ej: ya existe) |
| `StatusCode(code, dato)` | el que sea | cualquier status code manual |

Ver detalle completo de códigos en [[01-http|http]].

## `IActionResult` vs `ActionResult<T>`

`IActionResult` es genérico — cualquier helper sirve, pero no queda claro en la firma qué tipo de dato devuelve en el caso de éxito. `ActionResult<T>` documenta el tipo esperado y también permite devolver cualquier `IActionResult` (error, etc):

```csharp
[HttpGet("{id}")]
public ActionResult<Usuario> Get(int id)
{
    var usuario = BuscarUsuario(id);
    if (usuario is null) return NotFound();   // IActionResult
    return usuario;                            // Usuario -> se envuelve solo en Ok()
}
```

`ActionResult<T>` es mejor para Swagger/OpenAPI — documenta el tipo de respuesta exitosa automáticamente.

## `IActionResult` vs devolver el tipo directo

```csharp
// devuelve directo el tipo -> siempre 200, no hay forma de cambiar el status
[HttpGet]
public Usuario Get() => new Usuario();

// devuelve IActionResult -> control total del status code
[HttpGet]
public IActionResult Get() => Ok(new Usuario());
```

Devolver el tipo directo sirve solo si el endpoint **siempre** responde 200 sin casos de error — poco común en la práctica.

## Resumen

- `IActionResult` = respuesta HTTP completa (status + body), no solo el dato
- Helpers de `ControllerBase` (`Ok`, `NotFound`, `BadRequest`...) arman cada respuesta
- `ActionResult<T>` = mismo concepto + tipo de dato documentado, mejor para Swagger
- Sin `IActionResult`, no se puede variar el status code según el caso
