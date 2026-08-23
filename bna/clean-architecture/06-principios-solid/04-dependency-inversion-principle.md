---
tags:
  - clean-architecture
  - solid
  - dip
---

# Dependency Inversion Principle (DIP)

Ver también: [[03-interface-segregation-principle]], [[00-programacion-orientada-a-objetos]]

## Enunciado

> Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.
> Las abstracciones no deben depender de detalles. Los detalles deben depender de abstracciones.

- **Alto nivel** = política, reglas de negocio (qué hace el sistema)
- **Bajo nivel** = detalles, mecanismos (cómo se hace: DB, HTTP, filesystem)

Es el principio con más peso directo en Clean Architecture — es el que permite que las flechas de dependencia apunten **hacia adentro**.

## Sin DIP: alto nivel atado a bajo nivel

```csharp
// bajo nivel: detalle concreto de infraestructura
class MySqlUsuarioRepository
{
    public Usuario ObtenerPorId(int id) { /* SQL concreto */ return null; }
}

// alto nivel: la política de negocio, acoplada directo al detalle
class ObtenerUsuarioUseCase
{
    private readonly MySqlUsuarioRepository _repo = new MySqlUsuarioRepository();
    public Usuario Ejecutar(int id) => _repo.ObtenerPorId(id);
}
```
Problemas:
- No se puede testear `ObtenerUsuarioUseCase` sin una MySQL real corriendo
- Cambiar de MySQL a Postgres obliga a tocar el use case
- El módulo de "alto nivel" (la regla de negocio) queda atado a una decisión técnica de bajo nivel

## Con DIP: invertir la dependencia

```csharp
// la ABSTRACCIÓN la define y posee el módulo de alto nivel
interface IUsuarioRepository
{
    Usuario ObtenerPorId(int id);
}

// alto nivel: depende solo de la abstracción
class ObtenerUsuarioUseCase
{
    private readonly IUsuarioRepository _repo;
    public ObtenerUsuarioUseCase(IUsuarioRepository repo) => _repo = repo;
    public Usuario Ejecutar(int id) => _repo.ObtenerPorId(id);
}

// bajo nivel: el detalle depende de la abstracción (implementa la interfaz)
class MySqlUsuarioRepository : IUsuarioRepository
{
    public Usuario ObtenerPorId(int id) { /* SQL concreto */ return null; }
}
```
Notar la clave: la interfaz `IUsuarioRepository` **vive del lado del alto nivel** (junto al use case), no del lado de la implementación. El módulo de bajo nivel (`MySqlUsuarioRepository`) es el que depende de algo definido "arriba" — de ahí el nombre **inversión**.

```
sin DIP:  UseCase ──depende de──> MySqlRepository
con DIP:  UseCase ──depende de──> IUsuarioRepository <──implementa── MySqlRepository
```

## Composition root — dónde se "cablea" todo

Alguien tiene que decidir, en algún punto del programa, qué implementación concreta usar. Ese punto se llama **composition root** — en ASP.NET, es `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IUsuarioRepository, MySqlUsuarioRepository>();
builder.Services.AddScoped<ObtenerUsuarioUseCase>();

var app = builder.Build();
```
Es el **único** lugar del sistema que conoce tanto la abstracción como la implementación concreta. Todo el resto del código de negocio solo ve interfaces.

## Testeo — el beneficio concreto

```csharp
class UsuarioRepositoryFake : IUsuarioRepository
{
    private readonly Dictionary<int, Usuario> _data = new()
    {
        [1] = new Usuario { Id = 1, Nombre = "Ana" }
    };
    public Usuario ObtenerPorId(int id) => _data.GetValueOrDefault(id);
}

[Fact]
public void Ejecutar_UsuarioExiste_DevuelveUsuario()
{
    var useCase = new ObtenerUsuarioUseCase(new UsuarioRepositoryFake());
    var resultado = useCase.Ejecutar(1);
    Assert.Equal("Ana", resultado.Nombre);
}
```
Sin DB, sin red, sin framework — el test de la regla de negocio corre aislado.

## DIP no es solo "usar interfaces"

Usar una interfaz sin pensar la dirección de la dependencia no alcanza. Si la interfaz está definida junto a la implementación concreta (en el proyecto de infraestructura) y el use case tiene que referenciar ese proyecto para verla, **la dependencia de código sigue apuntando hacia afuera** aunque técnicamente haya una interfaz de por medio.

```
mal:   Proyecto.UseCases ──referencia──> Proyecto.Infraestructura (donde vive IUsuarioRepository)
bien:  Proyecto.Infraestructura ──referencia──> Proyecto.UseCases (donde vive IUsuarioRepository)
```
En una solución .NET organizada por Clean Architecture, esto se refleja literalmente en qué proyecto referencia a qué otro: el proyecto de **Application/UseCases** nunca referencia al proyecto de **Infrastructure**; es al revés.

## Cómo detectar violaciones

- `new ClaseConcreta()` de una dependencia de infraestructura dentro de una clase de lógica de negocio
- Un use case/entidad que importa el namespace de Entity Framework, de un cliente HTTP, o de un SDK externo
- Tests de lógica de negocio que necesitan levantar una DB real o mockear un framework entero

## Relación con Clean Architecture

DIP es, literalmente, **la regla de dependencia** de Clean Architecture aplicada a nivel de clases: las flechas de dependencia de código fuente solo pueden apuntar hacia los círculos internos (Entities, Use Cases), nunca hacia los externos (Frameworks & Drivers). Es el principio que convierte el diagrama de círculos concéntricos en código real.

Ver también: [[00-que-es-clean-architecture]]
