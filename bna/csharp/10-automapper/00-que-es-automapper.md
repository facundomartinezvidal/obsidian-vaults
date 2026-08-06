---
tags:
  - csharp
  - automapper
---

# Qué es AutoMapper

Ver también: [[00-dto-y-models|dto-y-models]], [[00-que-es-el-patron-repositorio|00-que-es-el-patron-repositorio]]

## El problema que resuelve

Convertir entre **entities de EF** (modelos de DB) y **DTOs** (contratos de la API) a mano es repetitivo:

```csharp
UsuarioDto dto = new UsuarioDto
{
    Id = usuario.Id,
    Nombre = usuario.Nombre,
    Email = usuario.Email
};
```

Con clases grandes, o muchos DTOs por entidad (uno para crear, otro para listar, otro para detalle), este mapeo manual crece mucho y es propenso a errores (olvidar copiar una propiedad al agregarla).

## Qué es

Librería que **mapea automáticamente** entre dos tipos, propiedad por propiedad, matcheando por nombre — sin escribir el mapeo a mano.

```csharp
Usuario usuario = new Usuario { Id = 1, Nombre = "Juan", Email = "juan@mail.com" };

UsuarioDto dto = _mapper.Map<UsuarioDto>(usuario);
// dto.Id = 1, dto.Nombre = "Juan", dto.Email = "juan@mail.com" — matcheado por nombre de propiedad
```

## Instalación

```bash
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

## Cómo funciona (por convención)

Si `UsuarioDto` tiene las mismas propiedades (mismo nombre y tipo compatible) que `Usuario`, AutoMapper copia el valor de una a la otra sin configuración extra:

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
}

public class UsuarioDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
}
```

Cuando los nombres **no** coinciden o hace falta lógica de transformación, se necesita configurar el mapeo explícitamente (perfiles — se ve en otra nota).

## Por qué se usa

- **Menos código repetitivo**: no hay que escribir `dto.X = entidad.X` para cada propiedad
- **Centraliza la lógica de mapeo**: si el mapeo cambia, se toca en un solo lugar (el perfil), no en cada punto donde se mapeaba a mano
- **Menos errores**: al agregar una propiedad nueva que matchea por nombre, se mapea sola — no hace falta acordarse de actualizar el mapeo manual

## Trade-off

El mapeo automático puede esconder bugs sutiles (propiedad que no matchea y queda en default silenciosamente, o mapeo no intencional entre tipos que casualmente comparten nombre de propiedad). Para mapeos simples 1:1 es una gran ganancia; para transformaciones complejas a veces es más claro mapear a mano.

## Resumen

- AutoMapper = librería que mapea automáticamente entre dos tipos (típicamente entity ↔ DTO), matcheando propiedades por nombre
- Evita escribir el mapeo propiedad por propiedad a mano
- Mapeo por convención cuando los nombres coinciden; configuración explícita (perfiles) cuando no
- Ventaja: menos código repetitivo y centralizado; riesgo: puede esconder errores de mapeo si no se revisa
