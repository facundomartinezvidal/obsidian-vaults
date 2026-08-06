---
tags:
  - csharp
  - fluentvalidation
  - validaciones
---

# Validaciones al editar

Ver también: [[01-creacion-de-validadores]], [[02-personalizacion-de-mensajes-de-error]]

## El problema

Alta y edición del mismo recurso suelen necesitar reglas distintas:

- En alta, el `Id` no existe todavía — no tiene sentido validarlo
- En edición, hay que excluir el propio registro al chequear unicidad (ej: email único — no debe fallar contra sí mismo)
- Algunos campos pueden ser obligatorios en alta pero opcionales en edición (o al revés)

Usar el mismo validador sin distinción para ambos casos termina en reglas mal ajustadas para uno de los dos flujos.

## Opción 1 — `RuleSet`

Agrupar reglas bajo un nombre y ejecutar solo el set que corresponde:

```csharp
public class UsuarioDtoValidator : AbstractValidator<UsuarioDto>
{
    public UsuarioDtoValidator()
    {
        RuleSet("Crear", () =>
        {
            RuleFor(u => u.Email).NotEmpty().EmailAddress();
            RuleFor(u => u.Password).NotEmpty().MinimumLength(8);
        });

        RuleSet("Editar", () =>
        {
            RuleFor(u => u.Id).NotEmpty();
            RuleFor(u => u.Email).NotEmpty().EmailAddress();
            // sin Password acá: no se reemplaza en cada edición
        });
    }
}
```

```csharp
var resultado = await _validator.ValidateAsync(dto, opciones => opciones.IncludeRuleSets("Editar"));
```

`IncludeRuleSets(...)` — corre solo las reglas del set indicado. Si no se especifica, corren las reglas sueltas (fuera de cualquier `RuleSet`), no los sets con nombre.

## Opción 2 — Validador separado por operación

Alternativa más simple cuando las diferencias son muchas: un validador para cada DTO.

```csharp
public class UsuarioCrearDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class UsuarioEditarDto
{
    public int Id { get; set; }
    public string Email { get; set; }
}

public class UsuarioCrearDtoValidator : AbstractValidator<UsuarioCrearDto>
{
    public UsuarioCrearDtoValidator()
    {
        RuleFor(u => u.Email).NotEmpty().EmailAddress();
        RuleFor(u => u.Password).NotEmpty().MinimumLength(8);
    }
}

public class UsuarioEditarDtoValidator : AbstractValidator<UsuarioEditarDto>
{
    public UsuarioEditarDtoValidator()
    {
        RuleFor(u => u.Id).NotEmpty();
        RuleFor(u => u.Email).NotEmpty().EmailAddress();
    }
}
```

Cada endpoint (`POST` vs `PUT`) recibe su propio tipo de DTO — la auto-validation de ASP.NET (ver [[00-introduccion-a-fluentvalidation]]) resuelve solo el validador que corresponde al tipo del parámetro, sin configuración extra.

## Validar unicidad excluyendo el registro actual

Chequeo típico en edición: el email no debe estar en uso por **otro** usuario (sí puede coincidir con el propio).

```csharp
public class UsuarioEditarDtoValidator : AbstractValidator<UsuarioEditarDto>
{
    private readonly NetbankDbContext _dbContext;

    public UsuarioEditarDtoValidator(NetbankDbContext dbContext)
    {
        _dbContext = dbContext;

        RuleFor(u => u.Email)
            .MustAsync(SerEmailUnico).WithMessage("El email ya está en uso");
    }

    private async Task<bool> SerEmailUnico(UsuarioEditarDto dto, string email, CancellationToken ct)
    {
        return !await _dbContext.Usuarios
            .AnyAsync(u => u.Email == email && u.Id != dto.Id, ct);
    }
}
```

- `MustAsync` — versión async de `Must`, necesaria para consultar la DB dentro de la regla
- `u.Id != dto.Id` — excluye el propio registro de la comparación
- El validador se registra igual que cualquier otro (`AddValidatorsFromAssemblyContaining`), y como recibe `DbContext` por constructor, sale inyectado por DI sin configuración extra

## Resumen

- Alta y edición suelen necesitar reglas distintas — no conviene un único validador sin distinción
- `RuleSet` + `IncludeRuleSets(...)` — agrupa reglas por operación dentro del mismo validador
- Alternativa: un DTO y validador separado por operación (`Crear` / `Editar`) — más simple, resuelto automático por tipo
- Unicidad en edición: `MustAsync` consultando la DB, excluyendo el propio `Id` (`u.Id != dto.Id`)
