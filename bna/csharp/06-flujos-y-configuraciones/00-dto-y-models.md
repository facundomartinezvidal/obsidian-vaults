---
tags:
  - csharp
  - flujos-y-configuraciones
  - arquitectura
---

# DTO y Models

Ver también: [[10-records|records]], [[00-estructura-request-response|estructura-request-response]]

## `Model` (o Entity)

Representa un **dato del dominio/negocio**, generalmente mapeado 1 a 1 con una tabla de la base de datos. Tiene todos los campos, incluso los que no deberían salir para afuera de la API.

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }   // sensible, no debe salir por la API
    public DateTime FechaCreacion { get; set; }
}
```

## `DTO` (Data Transfer Object)

Representa los datos que **entran o salen por la API** — el "shape" del request/response. No necesariamente igual al Model.

```csharp
public record UsuarioDto(string Nombre, string Email);   // sin PasswordHash, sin FechaCreacion
```

Ver [[10-records|records]] — DTOs se suelen modelar con `record`: inmutables, comparación por valor, ideal para representar datos que solo se transportan.

## Por qué separar Model de DTO

| | Model | DTO |
|---|---|---|
| Representa | el dato tal cual vive en la DB/dominio | el dato tal cual viaja por la API |
| Campos sensibles | puede tenerlos (`PasswordHash`, etc) | nunca — se filtran antes de mandar |
| Cambia si cambia la DB | sí | no necesariamente |
| Cambia si cambia el contrato de la API | no necesariamente | sí |

Sin esta separación: exponer el Model directo en la API filtra campos internos/sensibles, y cualquier cambio en la DB rompe el contrato público de la API (acoplamiento).

## Ejemplo completo — controller mapeando Model → DTO

```csharp
[HttpGet("{id}")]
public IActionResult Get(int id)
{
    Usuario usuario = _usuarioService.ObtenerUsuario(id);   // Model completo, con datos sensibles

    UsuarioDto dto = new UsuarioDto(usuario.Nombre, usuario.Email);   // solo lo que se expone

    return Ok(dto);
}
```

## Resumen

- Model = dato del dominio, completo, espejo de la DB
- DTO = dato que viaja por la API, solo lo necesario/seguro para exponer
- Separarlos evita filtrar campos sensibles y desacopla la API de la estructura interna de datos
