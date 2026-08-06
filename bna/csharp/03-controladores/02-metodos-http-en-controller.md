---
tags:
  - csharp
  - controladores
  - aspnet
---

# Métodos de solicitud HTTP en el controller

Ver también: [[01-controladores]], [[01-http|http]]

## Qué es

Cada método público del controlador se marca con un atributo que indica qué método HTTP (y ruta) responde. El framework rutea la request al método correcto según el atributo.

```csharp
[Route("api/[controller]")]
[ApiController]
public class UsuariosController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new List<string> { "Facundo", "Ana" });

    [HttpGet("{id}")]
    public IActionResult GetPorId(int id) => Ok($"Usuario {id}");

    [HttpPost]
    public IActionResult Crear([FromBody] string nombre) => Created("", nombre);

    [HttpPut("{id}")]
    public IActionResult Actualizar(int id, [FromBody] string nombre) => Ok();

    [HttpDelete("{id}")]
    public IActionResult Eliminar(int id) => NoContent();
}
```

## Atributos disponibles

| Atributo | Método HTTP | Uso típico |
|---|---|---|
| `[HttpGet]` | GET | leer/consultar |
| `[HttpPost]` | POST | crear |
| `[HttpPut]` | PUT | actualizar completo |
| `[HttpPatch]` | PATCH | actualizar parcial |
| `[HttpDelete]` | DELETE | eliminar |

## Ruta a nivel método

El atributo puede llevar una ruta adicional, que se concatena con la ruta base del controlador (`[Route("api/[controller]")]`):

```csharp
[HttpGet("{id}")]   // GET api/Usuarios/{id}
public IActionResult GetPorId(int id) => Ok($"Usuario {id}");
```

Sin argumento, usa solo la ruta base del controller.

## Parámetro en el atributo vs parámetro fuera de la ruta

Poner `{id}` en la ruta del atributo o no cambia **de dónde** viene el dato:

```csharp
[HttpGet("{id}")]              // ruta: GET api/Usuarios/5
public IActionResult Get(int id) => Ok(id);
// {id} en la ruta -> matchea por nombre con el parámetro "id" -> path param automático

[HttpGet]                       // ruta: GET api/Usuarios?id=5
public IActionResult Get([FromQuery] int id) => Ok(id);
// sin {id} en la ruta -> el dato tiene que venir de otro lado, acá query string
```

`{id}` en el atributo = path param, obligatorio, parte de la URL. Sin eso, el parámetro se bindea como query param (opcional) u otro origen (`[FromBody]`, `[FromHeader]`) según el atributo que se le ponga.

## Resumen

- Un método = un endpoint, definido por el atributo `[HttpX]`
- El nombre del método en C# no importa para el ruteo (puede llamarse como sea) — lo que importa es el atributo
- Ruta se arma: ruta base del controller + ruta opcional del método
