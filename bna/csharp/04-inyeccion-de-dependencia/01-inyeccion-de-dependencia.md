---
tags:
  - csharp
  - inyeccion-de-dependencia
  - arquitectura
---

# Inyección de dependencia (Dependency Injection)

Ver también: [[00-capa-de-servicio]], [[03-interfaces|interfaces]]

## Qué es

Patrón donde una clase **no crea** las dependencias que necesita (`new AlgoService()`), sino que las **recibe de afuera** — normalmente por constructor. Quien las crea y las entrega es el **contenedor de DI**, no la clase misma.

```csharp
// SIN DI: el controller crea su propia dependencia
public class UsuariosController : ControllerBase
{
    private readonly UsuarioService _usuarioService = new UsuarioService();
}

// CON DI: el controller la recibe, no la crea
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuariosController(IUsuarioService usuarioService)  // <- inyectada
    {
        _usuarioService = usuarioService;
    }
}
```

## Cómo funciona en ASP.NET Core

1. Se **registra** la dependencia en el contenedor (`Program.cs`):
```csharp
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
```
2. Cuando el framework crea un `UsuariosController` para atender un request, mira su constructor, ve que pide `IUsuarioService`, y **automáticamente** le pasa una instancia de `UsuarioService` (la registrada) — sin que nadie escriba `new` a mano.

## Para qué sirve

- **Desacopla**: la clase depende de una interface (abstracción), no de una implementación concreta — ver [[03-interfaces|interfaces]]. Se puede cambiar la implementación sin tocar quien la usa.
- **Testeable**: en un test, se puede inyectar un mock/fake de `IUsuarioService` en vez del real — sin DI, `new UsuarioService()` adentro del controller hace imposible reemplazarlo en tests.
- **Reutiliza instancias**: el contenedor decide cuántas instancias crear (una por request, una única para toda la app, etc — ver ciclo de vida) en vez de crear una nueva cada vez.
- **Menos acoplamiento entre capas**: controller no sabe cómo se construye el service, service no sabe cómo se construye el repository, etc.

## Resumen

- DI = las dependencias se **reciben**, no se **crean** adentro de la clase
- Contenedor de DI (`builder.Services`) registra qué implementación usar para cada interface
- El framework arma el objeto solo, inyectando lo que el constructor pide
- Beneficio principal: desacoplamiento + testeable
