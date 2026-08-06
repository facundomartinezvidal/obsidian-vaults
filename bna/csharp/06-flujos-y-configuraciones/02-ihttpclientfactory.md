---
tags:
  - csharp
  - flujos-y-configuraciones
  - http
---

# `IHttpClientFactory` — fábrica de `HttpClient`

Ver también: [[01-httpclient]], [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]

## Qué es

Interface (ver [[03-interfaces|interfaces]]) que **crea y gestiona** instancias de `HttpClient` por vos — en vez de inyectar un `HttpClient` directo, se inyecta la fábrica y se le pide uno.

```csharp
public class PagosService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public PagosService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> ObtenerCotizacionAsync()
    {
        HttpClient client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("https://api.dolar.com/cotizacion");
        return await response.Content.ReadAsStringAsync();
    }
}
```

## Problema que resuelve

Inyectar `HttpClient` directo (`AddHttpClient()` sin nombre) funciona, pero tiene un problema de fondo: `HttpClient` maneja conexiones TCP por debajo, y si se **reusa la misma instancia para siempre** (típico con Singleton), no detecta cambios de DNS — puede seguir pegándole a una IP vieja si el servidor externo cambia de dirección. `IHttpClientFactory` resuelve esto rotando los `HttpMessageHandler` internos por debajo, sin que el código que usa `HttpClient` se entere.

## Clientes con nombre (`Named Clients`)

Se puede pre-configurar un client para un servicio externo específico, con su base URL y headers:

```csharp
builder.Services.AddHttpClient("ApiDolar", client =>
{
    client.BaseAddress = new Uri("https://api.dolar.com/");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});
```

```csharp
HttpClient client = _httpClientFactory.CreateClient("ApiDolar");
var response = await client.GetAsync("cotizacion");   // usa la BaseAddress configurada
```

## Clientes tipados (`Typed Clients`) — la forma más usada

Se envuelve el `HttpClient` dentro de una clase de servicio propia — más limpio, mejor testeable:

```csharp
public class ApiDolarClient
{
    private readonly HttpClient _httpClient;

    public ApiDolarClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> ObtenerCotizacionAsync()
        => await _httpClient.GetStringAsync("cotizacion");
}
```

```csharp
builder.Services.AddHttpClient<ApiDolarClient>(client =>
{
    client.BaseAddress = new Uri("https://api.dolar.com/");
});
```

El framework crea `ApiDolarClient` inyectándole un `HttpClient` ya configurado — se inyecta `ApiDolarClient` directo donde haga falta, sin lidiar con `IHttpClientFactory` a mano.

## Resumen

- `IHttpClientFactory` = fábrica que crea/gestiona `HttpClient`, evita problemas de DNS y socket exhaustion
- `CreateClient()` — client genérico
- `CreateClient("nombre")` — client pre-configurado (Named Client)
- `AddHttpClient<TCliente>()` — Typed Client, forma más limpia y usada en la práctica
