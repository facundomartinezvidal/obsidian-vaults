---
tags:
  - csharp
  - repositorio
  - patrones-de-diseno
---

# Qué es el patrón Repositorio

Ver también: [[03-inyeccion-de-contexto|03-inyeccion-de-contexto]], [[00-capa-de-servicio|capa-de-servicio]]

## Qué es

Capa que **encapsula el acceso a datos** — todas las operaciones contra la DB (queries, inserts, updates, deletes) quedan detrás de una interface, en vez de esparcidas por los services con `DbContext` inyectado directo.

```
Controller → Service → Repository (interface) → DbContext → DB
```

## Sin repositorio

```csharp
public class UsuarioService
{
    private readonly NetbankDbContext _dbContext;
    public UsuarioService(NetbankDbContext dbContext) => _dbContext = dbContext;

    public async Task<Usuario> ObtenerUsuario(int id) =>
        await _dbContext.Usuarios.FindAsync(id);
}
```

El service conoce EF directo — mezcla lógica de negocio con detalles de acceso a datos.

## Con repositorio

```csharp
public interface IUsuarioRepository
{
    Task<Usuario> ObtenerPorId(int id);
}

public class UsuarioRepository : IUsuarioRepository
{
    private readonly NetbankDbContext _dbContext;
    public UsuarioRepository(NetbankDbContext dbContext) => _dbContext = dbContext;

    public async Task<Usuario> ObtenerPorId(int id) =>
        await _dbContext.Usuarios.FindAsync(id);
}

public class UsuarioService
{
    private readonly IUsuarioRepository _repository;
    public UsuarioService(IUsuarioRepository repository) => _repository = repository;

    public async Task<Usuario> ObtenerUsuario(int id) => await _repository.ObtenerPorId(id);
}
```

El service depende de `IUsuarioRepository` (abstracción), no de `DbContext` ni de EF.

## Por qué se usa

- **Testeable**: el service se testea mockeando `IUsuarioRepository` — no hace falta una DB real ni mockear `DbContext` (que tiene muchos métodos, difícil de mockear bien)
- **Desacopla el negocio del ORM**: si mañana se cambia EF por otra cosa, solo cambia la implementación del repository, el service ni se entera
- **Centraliza el acceso a datos**: queries repetidas quedan en un solo lugar, no duplicadas en varios services
- **Sigue el principio de inversión de dependencias** (la "D" de SOLID) — el service depende de una interface, no de una implementación concreta

## Cuándo no hace falta

Para proyectos chicos o prototipos, el `DbContext` inyectado directo (que ya es una abstracción sobre la DB, ver [[02-creacion-de-contexto|02-creacion-de-contexto]]) puede ser suficiente — el repository agrega una capa extra que en proyectos simples es puro boilerplate sin beneficio real. Se vuelve valioso cuando el proyecto crece, hay múltiples fuentes de datos, o el testing unitario es prioridad.

## Resumen

- Repositorio = capa que encapsula el acceso a datos detrás de una interface
- El service depende de la interface (`IUsuarioRepository`), no de `DbContext` directo
- Ventajas: testeable, desacopla del ORM, centraliza queries, cumple inversión de dependencias
- No siempre necesario — evaluar el tamaño/complejidad del proyecto
