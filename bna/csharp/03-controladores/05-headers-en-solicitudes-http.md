---
tags:
  - csharp
  - controladores
  - http
---

# Headers (encabezados) en las solicitudes HTTP

Ver también: [[00-estructura-request-response|estructura-request-response]], [[04-body-en-solicitudes-http]]

## Qué es

Metadata clave-valor que viaja junto al request/response, separada del body — describe **cómo** interpretar o manejar la solicitud, no los datos en sí.

```
Host: banco.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json
```

## Headers más usados

| Header | Para qué sirve |
|---|---|
| `Host` | dominio destino |
| `Content-Type` | formato del body que se envía (`application/json`, `multipart/form-data`, etc) |
| `Content-Length` | tamaño del body en bytes |
| `Accept` | formato que el cliente quiere recibir de vuelta |
| `Authorization` | credenciales — token (`Bearer <token>`), API key |
| `User-Agent` | quién hace el request (browser, app, versión) |
| `Cache-Control` | reglas de cacheo |

## Recibirlos en el controller: `[FromHeader]`

```csharp
[HttpGet]
public IActionResult Get([FromHeader(Name = "Authorization")] string auth)
{
    return Ok($"Token recibido: {auth}");
}
```

`Name` indica el nombre exacto del header (no siempre coincide con el nombre del parámetro en C#).

### Ejemplo — `Host`

```csharp
[HttpGet]
public IActionResult Get([FromHeader(Name = "Host")] string host)
{
    return Ok($"Host: {host}");
}
```

También accesible sin `[FromHeader]`, vía `HttpContext`:
```csharp
[HttpGet]
public IActionResult Get()
{
    string host = HttpContext.Request.Host.ToString();
    return Ok($"Host: {host}");
}
```

### Ejemplo — `Content-Length`

```csharp
[HttpPost]
public IActionResult Crear([FromHeader(Name = "Content-Length")] long contentLength, [FromBody] UsuarioDto dto)
{
    return Ok($"Body de {contentLength} bytes recibido");
}
```

Vía `HttpContext` (más común en la práctica, `Content-Length` casi no se lee a mano):
```csharp
long? contentLength = HttpContext.Request.ContentLength;
```

## Diferencia con body y query params

| | Headers | Body | Query params |
|---|---|---|---|
| Qué llevan | metadata (auth, formato) | datos del recurso | filtros/opciones |
| Visible en la URL | no | no | sí |
| Uso típico | token, content-type | crear/actualizar | buscar, paginar |

## Resumen

- Headers = metadata del request/response, no son "el dato" sino info sobre cómo tratarlo
- `[FromHeader]` bindea un header a un parámetro del método
- El más importante en backend real: `Authorization` (autenticación)
