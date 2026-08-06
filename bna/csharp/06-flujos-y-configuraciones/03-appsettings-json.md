---
tags:
  - csharp
  - flujos-y-configuraciones
  - aspnet
---

# Obtener información de `appsettings.json`

Ver también: [[02-ihttpclientfactory]], [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]

## Qué es

Archivo de configuración del proyecto — datos que no van hardcodeados en el código (connection strings, URLs de APIs externas, claves, flags) y pueden variar entre ambientes (dev, prod).

```json
{
  "ApiDolar": {
    "BaseUrl": "https://api.dolar.com/",
    "ApiKey": "abc123"
  },
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=Netbank;..."
  }
}
```

`appsettings.Development.json` sobreescribe valores de `appsettings.json` solo en ambiente Development — no hace falta duplicar todo, solo lo que cambia.

## Leerlo directo — `IConfiguration`

```csharp
public class ApiDolarClient
{
    private readonly IConfiguration _configuration;

    public ApiDolarClient(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string ObtenerBaseUrl()
    {
        return _configuration["ApiDolar:BaseUrl"];   // ":" navega niveles anidados
    }
}
```

`IConfiguration` ya está registrado por default en cualquier proyecto ASP.NET Core — se inyecta sin configurar nada extra, ver [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]].

## Forma tipada — `Options Pattern` (más prolijo)

Se define una clase que mapea la sección del JSON:

```csharp
public class ApiDolarOptions
{
    public string BaseUrl { get; set; }
    public string ApiKey { get; set; }
}
```

Registrarla en `Program.cs`:

```csharp
builder.Services.Configure<ApiDolarOptions>(
    builder.Configuration.GetSection("ApiDolar"));
```

Inyectarla con `IOptions<T>`:

```csharp
public class ApiDolarClient
{
    private readonly ApiDolarOptions _options;

    public ApiDolarClient(IOptions<ApiDolarOptions> options)
    {
        _options = options.Value;
    }

    public string ObtenerBaseUrl() => _options.BaseUrl;
}
```

## `IConfiguration` vs Options Pattern

| | `IConfiguration` | Options Pattern (`IOptions<T>`) |
|---|---|---|
| Acceso | por string (`"ApiDolar:BaseUrl"`) | tipado, con autocompletado |
| Errores | recién en runtime (typo en el string) | detectados en compilación (nombre de propiedad) |
| Uso típico | leer un valor suelto rápido | configuración de un módulo/servicio completo |

## Directo en el registro de `HttpClient` — combinando con [[02-ihttpclientfactory]]

```csharp
builder.Services.AddHttpClient<ApiDolarClient>((sp, client) =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    client.BaseAddress = new Uri(config["ApiDolar:BaseUrl"]);
});
```

## Resumen

- `appsettings.json` = configuración externa al código, por ambiente
- `IConfiguration` — acceso directo por string, ya inyectado por default
- Options Pattern (`IOptions<T>`) — acceso tipado, mejor para configuración de un módulo completo
- `appsettings.Development.json` sobreescribe solo en dev
