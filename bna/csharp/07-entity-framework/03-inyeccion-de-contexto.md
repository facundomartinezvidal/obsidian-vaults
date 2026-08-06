---
tags:
  - csharp
  - entity-framework
  - inyeccion-de-dependencia
---

# Inyección del `DbContext`

Ver también: [[02-creacion-de-contexto]], [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]

## Repaso — cómo se inyecta

El `DbContext` se registra una vez en `Program.cs` (`AddDbContext<T>`, ver [[02-creacion-de-contexto]]) y de ahí en más se **inyecta por constructor** en cualquier clase que lo necesite — service, repository, etc. Nunca se instancia con `new` a mano.

```csharp
public class UsuarioService
{
    private readonly NetbankDbContext _dbContext;

    public UsuarioService(NetbankDbContext dbContext)   // <- inyectado
    {
        _dbContext = dbContext;
    }
}
```

## Por qué no `new NetbankDbContext()`

- Pierde la configuración central (connection string, proveedor) — habría que repetirla en cada lugar
- Pierde el ciclo de vida `Scoped` (ver [[03-tipos-de-ciclo-de-vida]]) — cada `new` crea una conexión nueva, sin compartir la misma "sesión" dentro del mismo request
- Imposible de testear con un context fake/mock

## Una sola instancia por request — por qué importa

Como el `DbContext` es `Scoped`, **todos** los services que lo pidan dentro del mismo request reciben la **misma instancia**:

```csharp
public class OperacionService
{
    private readonly NetbankDbContext _dbContext;
    public OperacionService(NetbankDbContext dbContext) => _dbContext = dbContext;

    public void Transferir(int origenId, int destinoId, decimal monto)
    {
        var origen = _dbContext.Cuentas.Find(origenId);
        var destino = _dbContext.Cuentas.Find(destinoId);

        origen.Saldo -= monto;
        destino.Saldo += monto;

        _dbContext.SaveChanges();   // un solo SaveChanges, ambos cambios en la misma transacción implícita
    }
}
```

Si cada uno tuviera su propio `DbContext`, los cambios de uno no verían los del otro dentro del mismo request — se rompe la consistencia.

## Inyectarlo detrás de una interface (mejor práctica) — repositorio

En vez de inyectar `NetbankDbContext` directo en cada service, es común encapsularlo detrás de una interface de repositorio — mismo patrón que [[00-capa-de-servicio|capa-de-servicio]]:

```csharp
public interface IUsuarioRepository
{
    Usuario ObtenerUsuario(int id);
}

public class UsuarioRepository : IUsuarioRepository
{
    private readonly NetbankDbContext _dbContext;
    public UsuarioRepository(NetbankDbContext dbContext) => _dbContext = dbContext;

    public Usuario ObtenerUsuario(int id) => _dbContext.Usuarios.Find(id);
}
```

El `UsuarioService` ya no depende de EF directo, depende de `IUsuarioRepository` — más testeable (mock del repository, sin necesidad de mockear `DbContext`).

## Resumen

- `DbContext` se inyecta, nunca se instancia con `new`
- Al ser `Scoped`, todos los que lo piden en el mismo request comparten la misma instancia — misma "sesión" de cambios
- Buena práctica: encapsularlo detrás de un repository/interface, en vez de inyectarlo directo en cada service
