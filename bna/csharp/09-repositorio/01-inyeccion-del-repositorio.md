---
tags:
  - csharp
  - repositorio
  - inyeccion-de-dependencia
---

# Inyección del repositorio

Ver también: [[00-que-es-el-patron-repositorio]], [[01-inyeccion-de-dependencia|inyeccion-de-dependencia]]

## Registrar la interface y su implementación

```csharp
// Program.cs
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
```

- `AddScoped<Interface, Implementacion>` — cada vez que algo pide `IUsuarioRepository`, el contenedor de DI entrega una instancia de `UsuarioRepository`
- Ciclo de vida `Scoped` — coincide con el del `DbContext` que el repository usa por dentro (ver [[03-tipos-de-ciclo-de-vida]]), una instancia por request

## Uso — inyectado en el service

```csharp
public class UsuarioService
{
    private readonly IUsuarioRepository _repository;

    public UsuarioService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<Usuario> ObtenerUsuario(int id) => await _repository.ObtenerPorId(id);
}
```

El service **nunca** instancia el repository con `new` — lo pide en el constructor, igual que cualquier otra dependencia.

## Registrar varios repositorios

Uno por cada entidad/agregado, cada uno con su registro:

```csharp
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ICuentaRepository, CuentaRepository>();
builder.Services.AddScoped<IOperacionRepository, OperacionRepository>();
```

## Registro automático por convención (opcional)

Para evitar repetir una línea por cada repositorio, se puede escanear el assembly y registrar todo lo que matchee el patrón `I<Nombre>Repository` → `<Nombre>Repository`:

```csharp
var tipos = Assembly.GetExecutingAssembly().GetTypes();

foreach (var implementacion in tipos.Where(t => t.Name.EndsWith("Repository") && !t.IsInterface))
{
    var interfaz = implementacion.GetInterface($"I{implementacion.Name}");
    if (interfaz != null)
    {
        builder.Services.AddScoped(interfaz, implementacion);
    }
}
```

Útil cuando hay muchos repositorios — reduce boilerplate en `Program.cs`, a costa de ser menos explícito.

## Por qué inyectar la interface y no la clase concreta

```csharp
// Mal — acopla el service a la implementación concreta
public UsuarioService(UsuarioRepository repository)

// Bien — el service depende de la abstracción
public UsuarioService(IUsuarioRepository repository)
```

Si se inyecta la clase concreta, se pierde el beneficio del patrón (ver [[00-que-es-el-patron-repositorio]]): no se puede mockear en tests, ni cambiar la implementación sin tocar el service.

## Resumen

- `AddScoped<IRepo, Repo>()` en `Program.cs` — registra la interface con su implementación
- Se inyecta la **interface** en el constructor del service, nunca la clase concreta ni `new`
- Ciclo de vida `Scoped`, alineado con el del `DbContext`
- Con muchos repositorios, se puede automatizar el registro escaneando el assembly por convención de nombres
