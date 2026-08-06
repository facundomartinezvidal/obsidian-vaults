---
tags:
  - csharp
  - inyeccion-de-dependencia
  - aspnet
---

# Inyección de dependencia por clave (Keyed Services)

Ver también: [[01-inyeccion-de-dependencia]], [[00-capa-de-servicio]]

## Problema que resuelve

DI normal registra **una sola** implementación por interface. Si hay **varias implementaciones** de la misma interface y hace falta elegir cuál inyectar según el caso, DI normal no alcanza — la última registrada pisa a las anteriores.

```csharp
// esto NO funciona como se espera: la segunda pisa a la primera
builder.Services.AddScoped<INotificacionService, EmailService>();
builder.Services.AddScoped<INotificacionService, SmsService>();
```

## Cómo se resuelve — con clave (`keyed`)

Cada implementación se registra con una **clave** (string, enum, lo que sea) que la identifica:

```csharp
builder.Services.AddKeyedScoped<INotificacionService, EmailService>("email");
builder.Services.AddKeyedScoped<INotificacionService, SmsService>("sms");
```

## Inyectarla — `[FromKeyedServices]`

```csharp
public class NotificacionController : ControllerBase
{
    private readonly INotificacionService _emailService;

    public NotificacionController([FromKeyedServices("email")] INotificacionService emailService)
    {
        _emailService = emailService;
    }
}
```

Se puede inyectar más de una en el mismo constructor, cada una con su clave:

```csharp
public NotificacionController(
    [FromKeyedServices("email")] INotificacionService emailService,
    [FromKeyedServices("sms")] INotificacionService smsService)
{
    ...
}
```

## Cuándo usarlo

Cuando hay **múltiples implementaciones válidas** de la misma interface y se necesita elegir una específica en un punto puntual — ej: varios proveedores de notificación (email, SMS, push), varias estrategias de pago, varios proveedores de storage. Con DI normal (sin clave) solo se puede tener una implementación activa por interface.

## Resumen

- Keyed DI = registrar varias implementaciones de la misma interface, cada una con una clave
- `AddKeyedScoped<Interface, Implementacion>("clave")` para registrar
- `[FromKeyedServices("clave")]` para pedir la implementación específica
- Sirve cuando DI normal (una sola implementación por interface) no alcanza
