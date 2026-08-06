---
tags:
  - csharp
  - automapper
---

# AutoMapper — mapeo por convención (propiedades con el mismo nombre)

Ver también: [[00-que-es-automapper]], [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]

## Requisito para el mapeo automático

AutoMapper copia una propiedad de origen a destino sola cuando:

- Mismo **nombre** de propiedad (case-sensitive por default)
- Mismo **tipo** (o tipo compatible/convertible, ej `int` → `int?`)
- Ambas son **públicas** con getter/setter accesibles

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
    public DateTime FechaCreacion { get; set; }
}

public class UsuarioDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
    // FechaCreacion no está acá — no pasa nada, simplemente no se mapea
}
```

Todas las propiedades de `UsuarioDto` matchean por nombre con `Usuario` — mapeo 100% automático, sin configurar nada regla por regla.

## Definir el mapeo — `Profile`

Aunque los nombres coincidan, AutoMapper necesita que se declare **qué tipos se pueden mapear entre sí**. Eso se hace en una clase `Profile`:

```csharp
public class UsuarioProfile : Profile
{
    public UsuarioProfile()
    {
        CreateMap<Usuario, UsuarioDto>();
    }
}
```

`CreateMap<Origen, Destino>()` — sin nada más adentro, ya alcanza para mapear todas las propiedades que matcheen por nombre.

## Registrar en `Program.cs`

```csharp
builder.Services.AddAutoMapper(typeof(UsuarioProfile));
// o, para que escanee todos los profiles del assembly:
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
```

Esto registra `IMapper` en el contenedor de DI.

## Usarlo — inyectado

```csharp
public class UsuarioService
{
    private readonly IMapper _mapper;

    public UsuarioService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public UsuarioDto ObtenerDto(Usuario usuario) => _mapper.Map<UsuarioDto>(usuario);
}
```

- `IMapper` se inyecta igual que cualquier otra dependencia (ver [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]])
- `_mapper.Map<TDestino>(origen)` — ejecuta el mapeo usando el `Profile` que matchea `Origen → TDestino`

## Mapear listas

```csharp
List<Usuario> usuarios = await _dbContext.Usuarios.ToListAsync();
List<UsuarioDto> dtos = _mapper.Map<List<UsuarioDto>>(usuarios);
```

`Map` funciona igual sobre colecciones — mapea cada elemento aplicando el mismo `Profile`.

## Mapeo en ambas direcciones

`CreateMap<Origen, Destino>()` es **unidireccional** — solo mapea `Origen → Destino`. Para el camino inverso (ej: DTO recibido en un `POST` → entity para guardar), hace falta declararlo también:

```csharp
public class UsuarioProfile : Profile
{
    public UsuarioProfile()
    {
        CreateMap<Usuario, UsuarioDto>();
        CreateMap<UsuarioDto, Usuario>();

        // o, si el mapeo es simétrico en ambos sentidos:
        CreateMap<Usuario, UsuarioDto>().ReverseMap();
    }
}
```

`ReverseMap()` — genera automáticamente el mapeo inverso a partir del ya definido, evita declarar `CreateMap` dos veces cuando la conversión es simétrica.

## Verificación en tiempo de configuración

```csharp
var configuracion = new MapperConfiguration(cfg => cfg.AddProfile<UsuarioProfile>());
configuracion.AssertConfigurationIsValid();
```

`AssertConfigurationIsValid()` — chequea que todos los `CreateMap` declarados tengan sentido (útil en tests, detecta mapeos rotos antes de que fallen en runtime).

## Resumen

- Mapeo automático requiere: mismo nombre de propiedad + tipo compatible + público
- `CreateMap<Origen, Destino>()` dentro de una clase `Profile` — declara qué tipos se pueden mapear
- `AddAutoMapper(...)` en `Program.cs` registra `IMapper` en DI
- `_mapper.Map<TDestino>(origen)` — ejecuta el mapeo, funciona igual sobre objetos sueltos y listas
- `CreateMap` es unidireccional — `ReverseMap()` agrega el camino inverso cuando aplica
