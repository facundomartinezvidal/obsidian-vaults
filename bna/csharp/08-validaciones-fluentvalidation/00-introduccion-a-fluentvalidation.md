---
tags:
  - csharp
  - fluentvalidation
  - validaciones
---

# Validaciones con FluentValidation

Ver también: [[00-dto-y-models|dto-y-models]], [[03-controladores]]

## Qué es

Librería para validar objetos (típicamente DTOs de entrada) con una **API fluida en C#**, en vez de Data Annotations (`[Required]`, `[MaxLength]`, etc) sobre el modelo. Separa la validación en una clase aparte — el modelo/DTO queda limpio.

## Instalación

```bash
dotnet add package FluentValidation.AspNetCore
```

## Definir un validador

```csharp
public class UsuarioDto
{
    public string Nombre { get; set; }
    public string Email { get; set; }
    public int Edad { get; set; }
}
```

```csharp
public class UsuarioDtoValidator : AbstractValidator<UsuarioDto>
{
    public UsuarioDtoValidator()
    {
        RuleFor(u => u.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(100);

        RuleFor(u => u.Email)
            .NotEmpty()
            .EmailAddress().WithMessage("Email inválido");

        RuleFor(u => u.Edad)
            .GreaterThanOrEqualTo(18).WithMessage("Debe ser mayor de edad");
    }
}
```

- Hereda de `AbstractValidator<T>`
- `RuleFor(x => x.Propiedad)` — arranca una regla sobre esa propiedad
- Reglas encadenables (`.NotEmpty().MaximumLength(...)`) — todas se evalúan
- `.WithMessage(...)` — mensaje custom, sino usa el default de la librería

## Reglas más usadas

| Regla | Para qué sirve |
|---|---|
| `NotEmpty()` | no null, no string vacío/whitespace |
| `NotNull()` | no null (permite vacío) |
| `MaximumLength(n)` / `MinimumLength(n)` | longitud de string |
| `EmailAddress()` | formato de email válido |
| `GreaterThan(n)` / `LessThanOrEqualTo(n)` | comparaciones numéricas |
| `Matches(regex)` | coincide con expresión regular |
| `Must(predicate)` | condición custom arbitraria |

```csharp
RuleFor(u => u.Password)
    .Must(p => p.Any(char.IsDigit)).WithMessage("Debe contener al menos un número");
```

## Registrar en `Program.cs`

```csharp
builder.Services.AddValidatorsFromAssemblyContaining<UsuarioDtoValidator>();
builder.Services.AddFluentValidationAutoValidation();
```

- `AddValidatorsFromAssemblyContaining<T>` — escanea el assembly y registra todos los validadores encontrados (no hace falta registrar uno por uno)
- `AddFluentValidationAutoValidation()` — engancha la validación automáticamente en el pipeline de ASP.NET, corre antes de que el action del controller se ejecute

## Uso en el controlador

Con auto-validation registrada, no hace falta código extra — si el DTO no pasa las reglas, el request corta solo con `400 Bad Request` antes de llegar al action:

```csharp
[HttpPost]
public async Task<IActionResult> CrearUsuario(UsuarioDto dto)
{
    // acá adentro dto ya está validado
    var usuario = await _usuarioService.Crear(dto);
    return Ok(usuario);
}
```

### Uso manual (sin auto-validation)

```csharp
public class UsuarioService
{
    private readonly IValidator<UsuarioDto> _validator;

    public UsuarioService(IValidator<UsuarioDto> validator)
    {
        _validator = validator;
    }

    public async Task Crear(UsuarioDto dto)
    {
        ValidationResult resultado = await _validator.ValidateAsync(dto);
        if (!resultado.IsValid)
        {
            throw new ValidationException(resultado.Errors);
        }
        // ...
    }
}
```

- `IValidator<T>` — se inyecta igual que cualquier dependencia (quedó registrado por `AddValidatorsFromAssemblyContaining`)
- `ValidateAsync` devuelve `ValidationResult` con `IsValid` y `Errors` (lista de `ValidationFailure`)

## Por qué FluentValidation en vez de Data Annotations

- Reglas complejas (`Must`, comparar contra otra propiedad, validación condicional) — Data Annotations son limitadas para esto
- Separa la validación del modelo — el modelo/DTO no se llena de atributos
- Testeable de forma aislada (instanciar el validador y probar reglas sin levantar el pipeline HTTP completo)
- Reusable — un mismo validador se puede aplicar a distintos DTOs con lógica compartida (`Include`)

## Resumen

- `AbstractValidator<T>` + `RuleFor(x => x.Prop).Regla()` — define las reglas de validación
- Se registra con `AddValidatorsFromAssemblyContaining<T>()` + `AddFluentValidationAutoValidation()`
- Con auto-validation, el pipeline corta solo en `400` si el DTO no cumple las reglas — el controller ni se entera
- Alternativa más flexible y testeable que Data Annotations
