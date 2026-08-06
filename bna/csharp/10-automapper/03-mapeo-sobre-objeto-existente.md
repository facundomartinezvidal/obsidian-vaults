---
tags:
  - csharp
  - automapper
---

# AutoMapper — mapeo sobre objeto existente

Ver también: [[00-que-es-automapper]], [[01-mapeo-por-convencion-mismo-nombre]], [[02-mapeo-propiedades-distinto-nombre]]

## El problema

`_mapper.Map<TDestino>(origen)` (ver [[01-mapeo-por-convencion-mismo-nombre]]) siempre **crea una instancia nueva** de destino. Para un `UPDATE`, esto es un problema: la entity ya existe, trackeada por el `DbContext` (ver [[02-creacion-de-contexto|02-creacion-de-contexto]]) — reemplazarla por un objeto nuevo pierde el tracking y puede pisar propiedades que el DTO no trae.

```csharp
Usuario usuario = await _dbContext.Usuarios.FindAsync(id);

// mal: crea un Usuario nuevo, desconectado del tracker de EF
usuario = _mapper.Map<Usuario>(dto);
```

## Solución — overload con destino existente

```csharp
Usuario usuario = await _dbContext.Usuarios.FindAsync(id);

_mapper.Map(dto, usuario);   // mapea las propiedades DE dto SOBRE usuario existente
await _dbContext.SaveChangesAsync();
```

- `Map(origen, destino)` — en vez de crear un objeto nuevo, **pisa las propiedades del objeto `destino` ya existente** con los valores de `origen`
- `usuario` sigue siendo la misma instancia trackeada por EF — el `UPDATE` sale con los cambios detectados normalmente, sin necesitar `Update()` explícito

## Ejemplo completo — service de edición

```csharp
public class UsuarioService
{
    private readonly NetbankDbContext _dbContext;
    private readonly IMapper _mapper;

    public UsuarioService(NetbankDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task ActualizarUsuario(int id, UsuarioEditarDto dto)
    {
        Usuario usuario = await _dbContext.Usuarios.FindAsync(id);
        if (usuario is null) throw new KeyNotFoundException();

        _mapper.Map(dto, usuario);   // pisa solo las propiedades que trae el DTO
        await _dbContext.SaveChangesAsync();
    }
}
```

## Propiedades que el DTO no trae

Si `UsuarioEditarDto` no tiene, por ejemplo, `FechaCreacion`, esa propiedad de `usuario` **no se toca** — el mapeo solo pisa las propiedades que existen en ambos tipos (por convención o por `ForMember`, ver [[02-mapeo-propiedades-distinto-nombre]]). Evita el riesgo de sobreescribir campos con `null`/default por no venir en el request.

## Combinarlo con `Ignore()` para campos que nunca deben pisarse

Aunque el DTO no traiga una propiedad, puede ser más explícito declarar el `Ignore()` en el `Profile` para dejar claro que ese campo nunca se toca por mapeo, sin depender de que el DTO simplemente no la tenga:

```csharp
CreateMap<UsuarioEditarDto, Usuario>()
    .ForMember(dest => dest.Id, opt => opt.Ignore())
    .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore());
```

## Resumen

- `_mapper.Map<T>(origen)` siempre crea una instancia nueva — no sirve para actualizar una entity trackeada
- `_mapper.Map(origen, destino)` — mapea las propiedades de `origen` sobre un `destino` ya existente, sin crear una instancia nueva
- Mantiene el tracking de EF intacto — `SaveChangesAsync` detecta los cambios sin necesitar `Update()` explícito
- Ideal para el flujo de edición: `Find` la entity existente, `Map(dto, entity)`, `SaveChangesAsync`
