---
tags:
  - csharp
  - entity-framework
---

# Creación del `DbContext`

Ver también: [[01-creacion-de-modelos]], [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]], [[03-tipos-de-ciclo-de-vida]]

## Qué es

Clase que representa la **sesión con la base de datos** — el puente entre los modelos C# (ver [[01-creacion-de-modelos]]) y la DB real. A través de ella se hacen todas las queries y cambios (insert/update/delete).

```csharp
public class NetbankDbContext : DbContext
{
    public NetbankDbContext(DbContextOptions<NetbankDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Cuenta> Cuentas { get; set; }
}
```

- Hereda de `DbContext` (clase base de EF)
- Constructor recibe `DbContextOptions<T>` — configuración (qué DB, connection string) que le llega inyectada, no hardcodeada adentro
- Cada `DbSet<T>` = una tabla accesible para queries

## Configurar la conexión — `Program.cs`

```csharp
builder.Services.AddDbContext<NetbankDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
```

- `AddDbContext<T>` registra el context en el contenedor de DI — ver [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]
- `UseSqlServer(...)` — proveedor de DB (existen `UseNpgsql` para PostgreSQL, `UseSqlite`, etc)
- Connection string sale de `appsettings.json` — ver [[03-appsettings-json|appsettings-json]]:

```json
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=Netbank;Trusted_Connection=True;"
  }
}
```

## Ciclo de vida por default: `Scoped`

`AddDbContext` registra el context como `Scoped` (ver [[03-tipos-de-ciclo-de-vida]]) — **una instancia por request HTTP**. Tiene sentido: cada request maneja su propia "sesión" con la DB, no se comparte entre requests simultáneos (evitaría condiciones de carrera con la misma conexión).

## Usarlo — inyectado en un service

```csharp
public class UsuarioService
{
    private readonly NetbankDbContext _dbContext;

    public UsuarioService(NetbankDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Usuario ObtenerUsuario(int id) => _dbContext.Usuarios.Find(id);
}
```

Igual que cualquier otra dependencia — se pide en el constructor, el contenedor de DI lo provee.

## Resumen

- `DbContext` = sesión con la DB, hereda de `DbContext`, expone `DbSet<T>` por cada tabla
- Se registra con `AddDbContext<T>()`, configurando el proveedor de DB y la connection string
- Ciclo de vida: `Scoped` por default — una instancia por request
- Se inyecta y usa igual que cualquier otro service
