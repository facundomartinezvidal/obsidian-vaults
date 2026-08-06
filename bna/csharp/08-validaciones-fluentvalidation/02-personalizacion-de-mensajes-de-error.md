---
tags:
  - csharp
  - fluentvalidation
  - validaciones
---

# Personalización de mensajes de error

Ver también: [[00-introduccion-a-fluentvalidation]], [[01-creacion-de-validadores]]

## Mensaje custom por regla — `WithMessage`

```csharp
RuleFor(u => u.Nombre)
    .NotEmpty().WithMessage("El nombre es obligatorio");

RuleFor(u => u.Edad)
    .GreaterThanOrEqualTo(18).WithMessage("Debe ser mayor de edad");
```

Sin `WithMessage`, FluentValidation usa un mensaje default en inglés (ej: `"'Nombre' must not be empty."`).

## Placeholders dentro del mensaje

```csharp
RuleFor(u => u.Nombre)
    .MaximumLength(50).WithMessage("{PropertyName} no puede superar los {MaxLength} caracteres");

RuleFor(u => u.Edad)
    .GreaterThanOrEqualTo(18).WithMessage("{PropertyName} debe ser al menos {ComparisonValue}, valor recibido: {PropertyValue}");
```

| Placeholder | Qué inserta |
|---|---|
| `{PropertyName}` | nombre de la propiedad |
| `{PropertyValue}` | valor recibido que falló |
| `{ComparisonValue}` | valor contra el que se comparó (`GreaterThan`, etc) |
| `{MaxLength}` / `{MinLength}` | límites en reglas de longitud |

Cada regla soporta sus propios placeholders según qué datos maneja internamente.

## Nombre de propiedad custom — `WithName`

```csharp
RuleFor(u => u.Email)
    .NotEmpty().WithName("Correo electrónico");
// mensaje resultante: "'Correo electrónico' no puede estar vacío"
```

Útil para que el mensaje muestre un nombre legible en vez del nombre técnico de la propiedad C#.

## Código de error — `WithErrorCode`

```csharp
RuleFor(u => u.Email)
    .EmailAddress().WithErrorCode("EMAIL_INVALIDO");
```

Agrega un código identificable al error (además del mensaje) — útil para que el front-end reaccione por código en vez de parsear texto, o para traducir mensajes según el código.

## Mensajes en `Custom`

```csharp
RuleFor(u => u.FechaNacimiento).Custom((fecha, contexto) =>
{
    if (fecha > DateTime.Today)
    {
        contexto.AddFailure("La fecha de nacimiento no puede ser futura");
    }
});

// con propiedad y código específicos
contexto.AddFailure(new ValidationFailure(nameof(UsuarioDto.FechaNacimiento), "Fecha inválida")
{
    ErrorCode = "FECHA_FUTURA"
});
```

## Mensajes por defecto globales

```csharp
ValidatorOptions.Global.LanguageManager.Enabled = false;   // desactiva traducción automática por idioma
ValidatorOptions.Global.DefaultRuleLevelCascadeMode = CascadeMode.Stop;
```

FluentValidation trae mensajes traducidos a varios idiomas por default (detecta el idioma del thread). Si se quiere forzar siempre los mensajes custom en español sin depender de la cultura del server, conviene desactivar `LanguageManager` o directamente poner `WithMessage` en cada regla.

## Formato de la respuesta al cliente — `ValidationProblemDetails`

Con auto-validation (ver [[00-introduccion-a-fluentvalidation]]), ASP.NET arma automáticamente un `400` con el formato estándar:

```json
{
  "errors": {
    "Nombre": ["El nombre es obligatorio"],
    "Email": ["Correo electrónico inválido"]
  }
}
```

Cada key = nombre de la propiedad, value = lista de mensajes (puede haber más de un error por propiedad si falla más de una regla).

## Resumen

- `WithMessage("...")` — mensaje custom por regla, soporta placeholders (`{PropertyName}`, `{PropertyValue}`, etc)
- `WithName("...")` — cambia el nombre de propiedad mostrado en el mensaje
- `WithErrorCode("...")` — agrega código de error identificable, útil para el consumidor de la API
- `Custom` + `AddFailure` — control total del mensaje/código cuando la lógica no entra en una regla predefinida
- Mensajes default vienen en inglés y traducidos por cultura — se pueden fijar en español con `WithMessage` explícito o desactivando `LanguageManager`
