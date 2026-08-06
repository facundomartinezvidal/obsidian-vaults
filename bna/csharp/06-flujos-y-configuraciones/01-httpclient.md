---
tags:
  - csharp
  - flujos-y-configuraciones
  - http
---

# `HttpClient` — solicitudes HTTP externas

Ver también: [[01-http|http]], [[01-task|task]], [[07-json|json]]

## Qué es

Clase de .NET para hacer requests HTTP **desde el backend hacia afuera** — llamar a otra API, un servicio externo, etc. Distinto de recibir requests (eso lo hace el controller) — acá el backend actúa como **cliente**.

```csharp
var response = await httpClient.GetAsync("https://api.externa.com/datos");
```

## Cómo se usa — registrado con DI

No se instancia con `new HttpClient()` a mano en cada lugar (mala práctica, agota conexiones) — se registra en `Program.cs` y se **inyecta**, ver [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]:

```csharp
builder.Services.AddHttpClient();
```

```csharp
public class PagosService
{
    private readonly HttpClient _httpClient;

    public PagosService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> ObtenerCotizacionAsync()
    {
        var response = await _httpClient.GetAsync("https://api.dolar.com/cotizacion");
        response.EnsureSuccessStatusCode();   // tira excepción si status no es 2xx
        return await response.Content.ReadAsStringAsync();
    }
}
```

## Métodos principales

| Método | Uso |
|---|---|
| `GetAsync(url)` | GET |
| `PostAsync(url, content)` | POST, con body |
| `PutAsync(url, content)` | PUT |
| `DeleteAsync(url)` | DELETE |
| `GetFromJsonAsync<T>(url)` | GET + deserializa JSON directo a `T` |
| `PostAsJsonAsync(url, objeto)` | POST + serializa el objeto a JSON automático |

## Ejemplo con JSON directo — ver [[07-json|json]]

```csharp
public async Task<CotizacionDto> ObtenerCotizacionAsync()
{
    CotizacionDto? cotizacion = await _httpClient.GetFromJsonAsync<CotizacionDto>("https://api.dolar.com/cotizacion");
    return cotizacion;
}
```

`GetFromJsonAsync<T>` hace el request y deserializa el JSON en un solo paso — evita leer el string y deserializar a mano.

## Por qué todo es `async`

Llamar a un servicio externo es una operación **I/O-bound** — el backend espera la respuesta de otro servidor por red, mismo motivo que las queries a DB, ver [[00-que-es-programacion-asincrona|programacion-asincrona]]. Bloquear el hilo mientras se espera esa respuesta externa sería igual de costoso que bloquearlo por una query lenta.

## Por qué no `new HttpClient()` en cada request

Cada `HttpClient` maneja conexiones de red por debajo — crear uno nuevo por cada llamada puede agotar sockets del sistema bajo carga (problema conocido, *socket exhaustion*). Registrarlo vía DI (`AddHttpClient()`) hace que .NET lo maneje y reutilice correctamente.

## Resumen

- `HttpClient` = cliente HTTP del backend, para llamar APIs/servicios externos
- Se registra con `AddHttpClient()` en `Program.cs`, se inyecta — nunca `new` a mano
- Todos los métodos son async (`GetAsync`, `PostAsync`, etc) — operación I/O-bound
- `GetFromJsonAsync<T>`/`PostAsJsonAsync` simplifican trabajar con JSON directo
