---
tags:
  - csharp
  - controladores
  - aspnet
---

# Controladores en ASP .NET Core

Ver también: [[00-asp-net-core-web-api]], [[01-http|http]]

## Qué es

Clase que recibe requests HTTP y devuelve responses. Agrupa endpoints relacionados (ej: todos los de `Usuario` en un mismo controlador).

## Cómo se define

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new List<string> { "Facundo", "Ana" });
    }
}
```

- `[ApiController]` — marca la clase como controlador de API, habilita validaciones automáticas
- `: ControllerBase` — clase base con helpers (`Ok`, `NotFound`, etc — ver [[01-http|http]])
- `[Route("api/[controller]")]` — define la URL base; `[controller]` se reemplaza por el nombre de la clase sin el sufijo `Controller` → `api/Usuarios`
- Convención de nombre: `NombreController` (sufijo `Controller` obligatorio)

## Resumen

- Controlador = clase que agrupa endpoints
- Hereda de `ControllerBase`, marcada con `[ApiController]`
- `[Route]` define la URL base del controlador
- Cada método adentro = un endpoint (con `[HttpGet]`, `[HttpPost]`, etc)
