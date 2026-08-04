---
tags:
  - csharp
  - backend
  - http
  - seccion-1
---

# HTTP

## Qué es

**HTTP** (HyperText Transfer Protocol) = protocolo de comunicación entre **cliente** (browser, app, Postman) y **servidor**. Define cómo se piden y devuelven recursos (HTML, JSON, imágenes, etc).

Corre sobre **TCP/IP**. Versión segura: **HTTPS** (HTTP + TLS/SSL, encripta la comunicación).

## Para qué sirve

Es la base de comunicación de la web y de las **APIs backend**. Cliente hace un **request**, servidor devuelve un **response**. Todo backend en C#/.NET (ASP.NET Core, Web API) expone endpoints que hablan HTTP.

## Características clave

- **Stateless**: cada request es independiente, el server no recuerda requests anteriores (por eso existen cookies, tokens, sesiones para simular estado)
- **Cliente-servidor**: cliente pide, servidor responde
- **Basado en texto** (request/response en formato legible)

## Estructura de un Request

```
MÉTODO /ruta HTTP/1.1
Header1: valor
Header2: valor

[body — opcional]
```

Ejemplo:
```
POST /api/usuarios HTTP/1.1
Host: banco.com
Content-Type: application/json

{ "nombre": "Facundo" }
```

## Métodos HTTP (verbos)

| Método | Uso |
|--------|-----|
| `GET` | leer/obtener recurso, sin body, idempotente |
| `POST` | crear recurso nuevo |
| `PUT` | actualizar recurso completo (reemplaza) |
| `PATCH` | actualizar recurso parcial |
| `DELETE` | borrar recurso |

## Estructura de un Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{ "id": 1, "nombre": "Facundo" }
```

## Códigos de estado (status codes)

3 dígitos, primer dígito = categoría. Van en la primera línea del response.

| Rango | Categoría | Significado |
|-------|-----------|-------------|
| 1xx | Informativo | request recibido, sigue procesando (raro verlo a mano) |
| 2xx | Éxito | todo salió bien |
| 3xx | Redirección | hay que ir a otra URL |
| 4xx | Error del cliente | el request está mal (dato, auth, permiso) |
| 5xx | Error del servidor | el server rompió procesando algo válido |

### 2xx — Éxito
| Código | Uso |
|--------|-----|
| `200 OK` | request exitoso genérico (GET, PUT, PATCH) |
| `201 Created` | recurso creado (POST) |
| `204 No Content` | éxito pero sin body (ej: DELETE) |

### 3xx — Redirección
| Código | Uso |
|--------|-----|
| `301 Moved Permanently` | recurso cambió de URL para siempre |
| `302 Found` | redirección temporal |
| `304 Not Modified` | recurso no cambió, usar caché |

### 4xx — Error del cliente
| Código | Uso |
|--------|-----|
| `400 Bad Request` | request mal formado (falta campo, JSON inválido) |
| `401 Unauthorized` | no está autenticado (falta o token inválido) |
| `403 Forbidden` | está autenticado pero no tiene permiso |
| `404 Not Found` | recurso/ruta no existe |
| `405 Method Not Allowed` | método HTTP no soportado en esa ruta |
| `409 Conflict` | conflicto con estado actual (ej: recurso duplicado) |
| `422 Unprocessable Entity` | datos válidos en formato pero fallan validación de negocio |

### 5xx — Error del servidor
| Código | Uso |
|--------|-----|
| `500 Internal Server Error` | error genérico no controlado (excepción sin catch) |
| `502 Bad Gateway` | server actuando de proxy recibió respuesta inválida |
| `503 Service Unavailable` | server caído/sobrecargado, temporal |

**401 vs 403** (confunde mucho): 401 = "no sé quién sos" (no autenticado). 403 = "sé quién sos, no podés" (no autorizado).

### En ASP.NET Core

```csharp
return Ok(usuario);              // 200
return Created(uri, usuario);    // 201
return NoContent();              // 204
return BadRequest("falta campo");// 400
return Unauthorized();           // 401
return Forbid();                 // 403
return NotFound();               // 404
```

## Headers comunes

- `Content-Type` — formato del body (`application/json`, `text/html`)
- `Authorization` — credenciales (ej: `Bearer <token>`)
- `Accept` — qué formato acepta el cliente en la respuesta

## Relación con backend en C#

En ASP.NET Core cada **endpoint/controller** mapea una ruta + método HTTP a una acción del código:

```csharp
[HttpGet("api/usuarios/{id}")]
public IActionResult GetUsuario(int id) { ... }
```
