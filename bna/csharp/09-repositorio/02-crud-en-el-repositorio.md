---
tags:
  - csharp
  - repositorio
  - entity-framework
---

# CRUD en el repositorio

Ver también: [[00-que-es-el-patron-repositorio]], [[01-inyeccion-del-repositorio]], [[05-crud-y-mejores-practicas|05-crud-y-mejores-practicas]]

## Interface

```csharp
public interface IUsuarioRepository
{
    Task<Usuario> ObtenerPorId(int id);
    Task<List<Usuario>> ObtenerTodos();
    Task Agregar(Usuario usuario);
    Task Actualizar(Usuario usuario);
    Task Eliminar(int id);
}
```

La interface define **qué** operaciones existen — no cómo se implementan. El service solo conoce esto.

## Implementación

```csharp
public class UsuarioRepository : IUsuarioRepository
{
    private readonly NetbankDbContext _dbContext;

    public UsuarioRepository(NetbankDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Usuario> ObtenerPorId(int id) =>
        await _dbContext.Usuarios.FindAsync(id);

    public async Task<List<Usuario>> ObtenerTodos() =>
        await _dbContext.Usuarios.AsNoTracking().ToListAsync();

    public async Task Agregar(Usuario usuario)
    {
        _dbContext.Usuarios.Add(usuario);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Actualizar(Usuario usuario)
    {
        _dbContext.Usuarios.Update(usuario);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Eliminar(int id)
    {
        var usuario = await _dbContext.Usuarios.FindAsync(id);
        if (usuario is null) return;

        _dbContext.Usuarios.Remove(usuario);
        await _dbContext.SaveChangesAsync();
    }
}
```

Mismas operaciones EF vistas en [[05-crud-y-mejores-practicas|05-crud-y-mejores-practicas]] (`Add`, `FindAsync`, `Update`, `Remove`, `SaveChangesAsync`) — la diferencia es que ahora viven encapsuladas acá adentro, no en el service.

## Uso desde el service

```csharp
public class UsuarioService
{
    private readonly IUsuarioRepository _repository;
    public UsuarioService(IUsuarioRepository repository) => _repository = repository;

    public async Task<Usuario> CrearUsuario(UsuarioDto dto)
    {
        var usuario = new Usuario { Nombre = dto.Nombre, Email = dto.Email };
        await _repository.Agregar(usuario);
        return usuario;
    }

    public async Task<Usuario> ObtenerUsuario(int id)
    {
        var usuario = await _repository.ObtenerPorId(id);
        if (usuario is null) throw new KeyNotFoundException("Usuario no encontrado");
        return usuario;
    }
}
```

El service maneja la **lógica de negocio** (mapear DTO, validar existencia, lanzar excepciones) — el repository solo sabe hablar con la DB.

## Repositorio genérico (opcional)

Cuando el CRUD básico se repite igual para varias entidades, se puede generalizar con un repositorio genérico y heredar/extender para lo específico:

```csharp
public interface IRepository<T> where T : class
{
    Task<T> ObtenerPorId(int id);
    Task<List<T>> ObtenerTodos();
    Task Agregar(T entidad);
    Task Actualizar(T entidad);
    Task Eliminar(T entidad);
}

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly NetbankDbContext _dbContext;
    public Repository(NetbankDbContext dbContext) => _dbContext = dbContext;

    public async Task<T> ObtenerPorId(int id) => await _dbContext.Set<T>().FindAsync(id);
    public async Task<List<T>> ObtenerTodos() => await _dbContext.Set<T>().AsNoTracking().ToListAsync();
    public async Task Agregar(T entidad) { _dbContext.Set<T>().Add(entidad); await _dbContext.SaveChangesAsync(); }
    public async Task Actualizar(T entidad) { _dbContext.Set<T>().Update(entidad); await _dbContext.SaveChangesAsync(); }
    public async Task Eliminar(T entidad) { _dbContext.Set<T>().Remove(entidad); await _dbContext.SaveChangesAsync(); }
}
```

```csharp
public interface IUsuarioRepository : IRepository<Usuario>
{
    Task<Usuario> ObtenerPorEmail(string email);   // método específico de Usuario, no genérico
}

public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
{
    public UsuarioRepository(NetbankDbContext dbContext) : base(dbContext) { }

    public async Task<Usuario> ObtenerPorEmail(string email) =>
        await _dbContext.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
}
```

- `_dbContext.Set<T>()` — acceso genérico a cualquier `DbSet` sin conocer la entidad de antemano
- Evita repetir el CRUD básico entidad por entidad; los métodos específicos de cada una se agregan en su propia interface, que extiende la genérica

## Resumen

- Interface del repositorio expone el CRUD (`ObtenerPorId`, `ObtenerTodos`, `Agregar`, `Actualizar`, `Eliminar`)
- Implementación usa EF por dentro (`Add`, `Update`, `Remove`, `SaveChangesAsync`) — mismo código que sin repositorio, pero encapsulado
- El service usa el repository para persistencia, y mantiene la lógica de negocio (validaciones, mapeos, excepciones)
- Repositorio genérico (`IRepository<T>` + `Repository<T>`) — evita repetir CRUD básico entidad por entidad, se extiende por entidad para métodos específicos
