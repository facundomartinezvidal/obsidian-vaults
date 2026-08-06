---
tags:
  - csharp
  - automapper
---

# AutoMapper — propiedades con distinto nombre

Ver también: [[00-que-es-automapper]], [[01-mapeo-por-convencion-mismo-nombre]]

## El problema

Cuando el nombre de la propiedad en origen y destino **no coincide**, AutoMapper no la matchea sola — queda en su valor default (`null`, `0`, etc) salvo que se configure explícitamente.

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
}

public class UsuarioDto
{
    public int Id { get; set; }
    public string NombreCompleto { get; set; }   // distinto nombre -> no matchea solo
}
```

## `ForMember` — mapear una propiedad puntual

```csharp
public class UsuarioProfile : Profile
{
    public UsuarioProfile()
    {
        CreateMap<Usuario, UsuarioDto>()
            .ForMember(dest => dest.NombreCompleto, opt => opt.MapFrom(src => src.Nombre));
    }
}
```

- `dest => dest.NombreCompleto` — la propiedad de destino a configurar
- `opt.MapFrom(src => src.Nombre)` — de dónde sale el valor en el origen
- El resto de las propiedades (ej: `Id`) se siguen mapeando por convención automáticamente — `ForMember` solo pisa la regla para la propiedad indicada

## Combinar varias propiedades de origen

```csharp
public class Usuario
{
    public string Nombre { get; set; }
    public string Apellido { get; set; }
}

public class UsuarioDto
{
    public string NombreCompleto { get; set; }
}
```

```csharp
CreateMap<Usuario, UsuarioDto>()
    .ForMember(dest => dest.NombreCompleto, opt => opt.MapFrom(src => $"{src.Nombre} {src.Apellido}"));
```

`MapFrom` acepta cualquier expresión, no solo una propiedad directa — sirve para concatenar, calcular, transformar.

## Ignorar una propiedad

```csharp
CreateMap<UsuarioDto, Usuario>()
    .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore());
```

`Ignore()` — la propiedad de destino no se toca en el mapeo (queda con su valor default o el que ya tenía, si se mapea sobre un objeto existente). Útil para campos que no deben venir del DTO (ej: `FechaCreacion`, generado en el server, no en el request).

## Mapear anidado / propiedades de un objeto relacionado

```csharp
public class Usuario
{
    public int Id { get; set; }
    public Direccion Direccion { get; set; }
}

public class Direccion
{
    public string Ciudad { get; set; }
}

public class UsuarioDto
{
    public int Id { get; set; }
    public string CiudadUsuario { get; set; }
}
```

```csharp
CreateMap<Usuario, UsuarioDto>()
    .ForMember(dest => dest.CiudadUsuario, opt => opt.MapFrom(src => src.Direccion.Ciudad));
```

`MapFrom` navega el grafo de objetos del origen sin problema, mientras la expresión sea válida.

## `ForPath` — cuando el destino también es anidado

```csharp
CreateMap<UsuarioDto, Usuario>()
    .ForPath(dest => dest.Direccion.Ciudad, opt => opt.MapFrom(src => src.CiudadUsuario));
```

`ForMember` espera que el destino sea una propiedad plana de primer nivel — cuando el **destino** también es anidado, se usa `ForPath` en su lugar.

## Resumen

- Nombres distintos entre origen y destino no matchean solos — hace falta configurar con `ForMember`
- `.ForMember(dest => dest.Propiedad, opt => opt.MapFrom(src => ...))` — de dónde sale el valor, admite expresiones (concatenar, navegar objetos anidados, calcular)
- `.Ignore()` — excluye una propiedad del mapeo automático
- `ForPath` — igual que `ForMember` pero cuando el destino de la propiedad también es anidado
- El resto de las propiedades que sí matchean por nombre se siguen mapeando por convención — `ForMember` solo ajusta las que no
