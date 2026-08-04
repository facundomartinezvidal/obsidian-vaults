---
tags:
  - csharp
  - backend
  - http
---

# Estructura de solicitudes y respuestas HTTP

Ver también: [[01-http]]

## Solicitud (Request)

3 partes:

### 1. Request line
```
MÉTODO /ruta?query HTTP/versión
```
```
GET /api/usuarios/5?activo=true HTTP/1.1
```
- **Método**: GET, POST, PUT, PATCH, DELETE...
- **Ruta (path)**: recurso pedido
- **Query string** (`?clave=valor&clave2=valor2`): filtros/parámetros opcionales, van en la URL
- **Versión HTTP**

### 2. Headers
Metadata clave-valor, uno por línea:
```
Host: banco.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json
```
Los más usados:
- `Host` — dominio destino
- `Content-Type` — formato del body que se envía
- `Authorization` — credenciales/token
- `Accept` — formato que el cliente quiere recibir de vuelta
- `User-Agent` — quién hace el request (browser, app)

### 3. Body (opcional)
Datos enviados, separado de headers por línea en blanco. Solo tiene sentido en POST/PUT/PATCH (GET normalmente no lleva body).
```json
{
  "nombre": "Facundo",
  "email": "facu@mail.com"
}
```

### Tipos de parámetros — dónde va cada dato

| Tipo | Dónde | Ejemplo | Uso típico |
|------|-------|---------|-----------|
| **Path param** | en la ruta | `/usuarios/{id}` | identifica un recurso específico |
| **Query param** | en la URL, después de `?` | `?activo=true&pagina=2` | filtros, paginación, orden |
| **Body** | cuerpo del mensaje | `{ "nombre": "..." }` | datos a crear/actualizar (POST/PUT) |
| **Header** | metadata | `Authorization: Bearer ...` | auth, formato |

## Respuesta (Response)

3 partes, mismo esquema:

### 1. Status line
```
HTTP/versión CÓDIGO texto
```
```
HTTP/1.1 200 OK
```

### 2. Headers
```
Content-Type: application/json
Content-Length: 128
Cache-Control: no-cache
```

### 3. Body (opcional)
```json
{
  "id": 5,
  "nombre": "Facundo",
  "email": "facu@mail.com"
}
```
En error suele venir un body describiendo el problema:
```json
{
  "error": "Usuario no encontrado",
  "codigo": 404
}
```

## En ASP.NET Core — cómo se leen

```csharp
[HttpGet("api/usuarios/{id}")]                 // {id} = path param
public IActionResult GetUsuario(
    int id,                                     // bindea del path
    [FromQuery] bool activo,                     // bindea del query string
    [FromHeader(Name = "Authorization")] string auth)
{
    ...
}

[HttpPost("api/usuarios")]
public IActionResult CrearUsuario([FromBody] UsuarioDto dto)  // bindea del body (JSON)
{
    return Created($"api/usuarios/{dto.Id}", dto);  // 201 + body respuesta
}
```

`[FromRoute]`, `[FromQuery]`, `[FromBody]`, `[FromHeader]` le dicen a ASP.NET de dónde sacar cada parámetro del request.
