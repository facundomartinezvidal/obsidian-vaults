---
tags:
  - csharp
  - fluentvalidation
  - validaciones
---

# Creación de validadores

Ver también: [[00-introduccion-a-fluentvalidation]]

## Estructura base

Cada validador es una clase que hereda de `AbstractValidator<T>`, con las reglas definidas en el constructor:

```csharp
public class UsuarioDtoValidator : AbstractValidator<UsuarioDto>
{
    public UsuarioDtoValidator()
    {
        RuleFor(u => u.Nombre).NotEmpty();
        RuleFor(u => u.Email).NotEmpty().EmailAddress();
    }
}
```

- `T` = tipo del objeto a validar (DTO, model, etc)
- Una regla por propiedad relevante — no hace falta cubrir todas las propiedades

## Validación condicional — `When` / `Unless`

```csharp
public class PedidoDtoValidator : AbstractValidator<PedidoDto>
{
    public PedidoDtoValidator()
    {
        RuleFor(p => p.NumeroTarjeta)
            .NotEmpty()
            .When(p => p.MetodoPago == "Tarjeta");   // solo valida si aplica

        RuleFor(p => p.Descuento)
            .LessThanOrEqualTo(0)
            .Unless(p => p.EsClientePremium);        // se salta la regla si es premium
    }
}
```

- `When(condicion)` — la regla solo corre si la condición da `true`
- `Unless(condicion)` — inverso, la regla se salta si la condición da `true`

## Validador custom — `Must` y `Custom`

```csharp
RuleFor(u => u.Password)
    .Must(TenerMayuscula).WithMessage("Debe contener al menos una mayúscula");

private bool TenerMayuscula(string password) => password.Any(char.IsUpper);
```

`Must` para condiciones simples (devuelve `bool`). Para lógica más compleja, que necesita agregar errores manualmente:

```csharp
RuleFor(u => u.FechaNacimiento).Custom((fecha, contexto) =>
{
    if (fecha > DateTime.Today)
    {
        contexto.AddFailure("La fecha de nacimiento no puede ser futura");
    }
});
```

## Validar objetos anidados

```csharp
public class PedidoDto
{
    public DireccionDto Direccion { get; set; }
}

public class DireccionDtoValidator : AbstractValidator<DireccionDto>
{
    public DireccionDtoValidator()
    {
        RuleFor(d => d.Calle).NotEmpty();
        RuleFor(d => d.CodigoPostal).NotEmpty();
    }
}

public class PedidoDtoValidator : AbstractValidator<PedidoDto>
{
    public PedidoDtoValidator()
    {
        RuleFor(p => p.Direccion).SetValidator(new DireccionDtoValidator());
    }
}
```

`SetValidator` — delega la validación de la propiedad anidada a su propio validador. Evita repetir reglas y mantiene cada validador enfocado en un solo tipo.

## Validar colecciones — `RuleForEach`

```csharp
public class PedidoDto
{
    public List<ItemDto> Items { get; set; }
}

RuleForEach(p => p.Items).SetValidator(new ItemDtoValidator());

// o reglas puntuales por elemento
RuleForEach(p => p.Items)
    .Must(i => i.Cantidad > 0).WithMessage("La cantidad debe ser mayor a 0");
```

`RuleForEach` aplica la regla/validador a **cada elemento** de la colección — si alguno falla, reporta el error con el índice correspondiente.

## Reutilizar reglas entre validadores — `Include`

```csharp
public class BaseUsuarioValidator : AbstractValidator<UsuarioDto>
{
    public BaseUsuarioValidator()
    {
        RuleFor(u => u.Email).NotEmpty().EmailAddress();
    }
}

public class UsuarioAltaValidator : AbstractValidator<UsuarioDto>
{
    public UsuarioAltaValidator()
    {
        Include(new BaseUsuarioValidator());
        RuleFor(u => u.Password).NotEmpty().MinimumLength(8);
    }
}
```

`Include` — suma las reglas de otro validador del mismo tipo, sin duplicarlas. Útil cuando hay reglas comunes (ej: alta vs edición del mismo DTO, con reglas extra en una de las dos).

## Resumen

- Validador = clase `AbstractValidator<T>`, reglas armadas en el constructor con `RuleFor`
- `When`/`Unless` — reglas condicionales
- `Must`/`Custom` — lógica de validación custom más allá de las reglas predefinidas
- `SetValidator` — delega validación de propiedades anidadas a su propio validador
- `RuleForEach` — valida cada elemento de una colección
- `Include` — reutiliza reglas entre validadores del mismo tipo
