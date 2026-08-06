---
tags:
  - csharp
  - inyeccion-de-dependencia
  - aspnet
---

# Tipos de ciclo de vida (lifetime) en DI

Ver también: [[01-inyeccion-de-dependencia]]

## Qué define

Cuándo el contenedor de DI crea una **instancia nueva** vs cuándo **reutiliza** una ya creada, de la dependencia registrada.

## `Singleton`

**Una sola instancia** para toda la vida de la aplicación. Se crea la primera vez que se pide, y se reutiliza siempre — para todos los requests, todos los usuarios.

```csharp
builder.Services.AddSingleton<IConfiguracionService, ConfiguracionService>();
```

Uso típico: configuración, caché en memoria, algo sin estado por-request y costoso de crear.

⚠️ Cuidado: si guarda estado mutable, ese estado se comparte entre **todos** los requests simultáneos — riesgo de condiciones de carrera si no es thread-safe.

## `Scoped`

**Una instancia por request HTTP** — se crea al empezar el request, se reutiliza durante ese request (aunque se pida en varios lugares), se descarta al terminar.

```csharp
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
```

Uso típico: la mayoría de los servicios de negocio, `DbContext` (Entity Framework) — un contexto de DB por request es la norma.

## `Transient`

**Una instancia nueva cada vez que se pide** — aunque sea dentro del mismo request, si se inyecta dos veces, son dos objetos distintos.

```csharp
builder.Services.AddTransient<IEmailSender, EmailSender>();
```

Uso típico: servicios livianos, sin estado, donde no importa (ni conviene) compartir instancia.

## Comparación

| | `Singleton` | `Scoped` | `Transient` |
|---|---|---|---|
| Instancias | 1 para toda la app | 1 por request | 1 por cada inyección |
| Duración | vida de la app | duración del request | instantánea |
| Uso típico | config, caché | services de negocio, `DbContext` | servicios livianos, sin estado |
| Riesgo | estado compartido entre requests | ninguno especial | crear muchas instancias (costo) |

## Regla práctica

Si no se sabe cuál usar: **`Scoped`** es el default razonable para servicios de negocio en una Web API — vida acotada al request, sin compartir estado entre usuarios distintos, sin recrear de más dentro del mismo request.

## Resumen

- `Singleton` = 1 instancia, toda la app
- `Scoped` = 1 instancia, por request
- `Transient` = instancia nueva, cada inyección
- Se elige con `AddSingleton<>`, `AddScoped<>`, `AddTransient<>` al registrar en `Program.cs`
