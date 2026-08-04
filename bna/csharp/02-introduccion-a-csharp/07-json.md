---
tags:
  - csharp
  - json
  - backend
---

# JSON

Ver también: [[01-http]]

## Qué es

**JSON** (JavaScript Object Notation) = formato de texto para representar datos estructurados: objetos, listas, strings, números, booleanos, null. **Independiente de lenguaje** — cualquier lenguaje lo puede leer/escribir.

```json
{
  "nombre": "Facundo",
  "edad": 28,
  "activo": true,
  "email": null,
  "hobbies": ["programar", "leer"],
  "direccion": {
    "ciudad": "Buenos Aires",
    "cp": "1000"
  }
}
```

Tipos válidos: `string` (`"..."`), `number`, `boolean` (`true`/`false`), `null`, `object` (`{ }`), `array` (`[ ]`).

## Para qué sirve

Formato estándar para **intercambiar datos** entre cliente y servidor (y entre cualquier sistema). Es el body más común en requests/responses HTTP de una API — ver [[01-http]].

```
POST /api/usuarios HTTP/1.1
Content-Type: application/json

{ "nombre": "Facundo", "edad": 28 }
```

## JSON en C# — serializar / deserializar

- **Serializar**: objeto C# → JSON (texto)
- **Deserializar**: JSON (texto) → objeto C#

Librería estándar: `System.Text.Json` (viene incluida en .NET, no hace falta instalar nada).

```csharp
using System.Text.Json;

public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
}
```

### Serializar (objeto → JSON)

```csharp
Persona p = new Persona { Nombre = "Facundo", Edad = 28 };

string json = JsonSerializer.Serialize(p);
// json = {"Nombre":"Facundo","Edad":28}

Console.WriteLine(json);
```

### Deserializar (JSON → objeto)

```csharp
string json = "{\"Nombre\":\"Facundo\",\"Edad\":28}";

Persona p = JsonSerializer.Deserialize<Persona>(json);
Console.WriteLine(p.Nombre);   // "Facundo"
```

`Deserialize<T>` es **genérico** — ver [[04-genericos]] — le decís a qué tipo convertir el JSON.

## En ASP.NET Core — automático

En una Web API, ASP.NET Core serializa/deserializa JSON **solo**, no hace falta llamarlo a mano:

```csharp
[HttpPost("api/personas")]
public IActionResult Crear([FromBody] Persona persona)   // JSON del body -> objeto Persona automático
{
    return Ok(persona);   // objeto Persona -> JSON en la respuesta automático
}
```

## Nombres de propiedades — camelCase vs PascalCase

Por convención, JSON usa `camelCase` (`nombre`, `fechaNacimiento`) pero C# usa `PascalCase` (`Nombre`, `FechaNacimiento`). ASP.NET Core convierte automático. Para configurarlo a mano:

```csharp
var opciones = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};
string json = JsonSerializer.Serialize(p, opciones);
// {"nombre":"Facundo","edad":28}
```

## Resumen

| Acción | Método |
|---|---|
| Objeto → JSON | `JsonSerializer.Serialize(objeto)` |
| JSON → Objeto | `JsonSerializer.Deserialize<T>(json)` |
| En Web API | automático con `[FromBody]` / valor de retorno |
