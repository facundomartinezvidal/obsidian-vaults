---
tags:
  - csharp
  - controladores
  - http
---

# Body en las solicitudes HTTP

Ver también: [[00-estructura-request-response|estructura-request-response]], [[02-metodos-http-en-controller]], [[07-json|json]]

## Qué es

Parte de la solicitud donde van los **datos** que se envían al servidor (a diferencia de path/query, que van en la URL). Se usa en `POST`/`PUT`/`PATCH` — para crear o actualizar algo. `GET`/`DELETE` normalmente no llevan body.

## Formato típico: JSON

```json
{
  "nombre": "Facundo",
  "email": "facu@mail.com"
}
```

El header `Content-Type: application/json` le dice al servidor cómo interpretar ese body.

## Recibirlo en el controller: `[FromBody]`

```csharp
public record UsuarioDto(string Nombre, string Email);

[HttpPost]
public IActionResult Crear([FromBody] UsuarioDto dto)
{
    return Created("", dto);
}
```

ASP.NET Core toma el JSON del body y lo **deserializa** automático al tipo indicado (`UsuarioDto`) — ver [[07-json|json]]. No hace falta parsear a mano.

## Con `[ApiController]` a veces no hace falta escribirlo

`[FromBody]` en el único parámetro complejo (una clase/record) suele **inferirse solo** gracias a `[ApiController]` (ver [[01-controladores]]) — pero es buena práctica dejarlo explícito para que quede claro de dónde viene el dato.

## Validación del body

Si el DTO tiene atributos de validación, `[ApiController]` valida antes de entrar al método:

```csharp
public record UsuarioDto(
    [property: Required] string Nombre,
    [property: EmailAddress] string Email);
```

Si el body no cumple, devuelve `400 Bad Request` automático, sin ejecutar el código del método.

## Resumen

- Body = datos del request, van en POST/PUT/PATCH
- `[FromBody]` bindea el JSON del body a un objeto C# (DTO)
- Deserialización automática vía `System.Text.Json`
- `[ApiController]` valida el body antes de ejecutar el método
