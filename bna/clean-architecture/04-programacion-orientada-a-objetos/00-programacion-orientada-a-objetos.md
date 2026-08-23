---
tags:
  - clean-architecture
  - paradigmas
  - poo
---

# Programación orientada a objetos (POO)

Ver también: [[00-que-son-los-paradigmas-de-programacion]], [[00-programacion-estructurada]]

## Qué es realmente (según Uncle Bob)

La definición típica dice "encapsulamiento + herencia + polimorfismo". Pero para Clean Architecture, lo relevante es otra cosa: **POO es la disciplina que impone el uso indirecto y controlado de punteros a función**.

Antes de POO, para lograr polimorfismo en C había que usar punteros a función a mano — potente pero peligroso (fácil de romper, difícil de rastrear). POO **no agrega capacidad nueva**: agrega una forma segura y disciplinada de lograr lo mismo mediante interfaces/clases abstractas y `virtual`/`override`.

## Los tres pilares (repaso rápido)

### 1. Encapsulamiento
Agrupar datos y comportamiento, ocultando detalles internos. Se expone solo lo necesario.
```csharp
class CuentaBancaria
{
    private decimal saldo; // oculto

    public void Depositar(decimal monto) => saldo += monto;
    public decimal ConsultarSaldo() => saldo;
}
```

### 2. Herencia
Reutilizar/extender estructura y comportamiento de una clase base.
```csharp
class Empleado { public string Nombre { get; set; } }
class Gerente : Empleado { public int CantidadReportes { get; set; } }
```
Uncle Bob nota que esto no es exclusivo de POO — C ya lograba algo similar con structs anidados (`struct` dentro de otro `struct`). Lo verdaderamente nuevo de POO es el punto 3.

### 3. Polimorfismo
La capacidad de que distinto código concreto responda a la misma llamada, decidido en tiempo de ejecución.
```csharp
interface IFormaDePago
{
    void Procesar(decimal monto);
}

class PagoTarjeta : IFormaDePago
{
    public void Procesar(decimal monto) { /* ... */ }
}

class PagoEfectivo : IFormaDePago
{
    public void Procesar(decimal monto) { /* ... */ }
}

// el código que llama no sabe (ni le importa) qué implementación concreta recibe
void RealizarCompra(IFormaDePago pago, decimal monto) => pago.Procesar(monto);
```

## Por qué el polimorfismo es "el poder" de POO

El polimorfismo es lo que habilita la **inversión de dependencias** — el mecanismo central de Clean Architecture.

Sin polimorfismo, el flujo de control y el flujo de dependencias van siempre en la misma dirección: si A llama a B, A depende de B.

```
A ──llama──> B      (A depende de B, en código fuente)
```

Con polimorfismo, se puede **invertir la dependencia** sin invertir el flujo de control: A llama a una interfaz que B implementa. El flujo de control sigue yendo de A hacia B en runtime, pero la dependencia de código fuente ahora apunta de B hacia la interfaz (que "vive" del lado de A).

```
A ──llama──> IB  <──implementa── B
(A depende de IB, B depende de IB — B ya no es dependencia de A)
```

## Ejemplo: por qué esto importa en Clean Architecture

```csharp
// capa interna (Use Case) — no conoce SQL Server, no conoce Entity Framework
interface IUsuarioRepository
{
    Usuario ObtenerPorId(int id);
}

class ObtenerUsuarioUseCase
{
    private readonly IUsuarioRepository _repo;
    public ObtenerUsuarioUseCase(IUsuarioRepository repo) => _repo = repo;

    public Usuario Ejecutar(int id) => _repo.ObtenerPorId(id);
}

// capa externa (Infraestructura) — implementa la interfaz, depende de la capa interna
class UsuarioRepositorySql : IUsuarioRepository
{
    public Usuario ObtenerPorId(int id) { /* consulta SQL real */ return null; }
}
```

`ObtenerUsuarioUseCase` (interno) nunca menciona `UsuarioRepositorySql` (externo). La dependencia de compilación apunta al revés del flujo de control: esto es **inversión de dependencias**, y es exactamente lo que permite que la lógica de negocio no sepa nada de la base de datos, el framework web, ni la UI.

## Interfaces vs. clases abstractas

Ambas permiten polimorfismo, pero con matices:

| | Interface | Clase abstracta |
|---|---|---|
| Herencia múltiple | sí, una clase implementa varias | no, C# solo permite una base |
| Implementación por defecto | opcional (`default interface methods`, C# 8+) | sí, puede tener lógica común |
| Estado (campos) | no | sí |
| Uso típico en Clean Architecture | contratos entre capas (`IUsuarioRepository`) | jerarquías con comportamiento compartido |

```csharp
// interface: contrato puro, sin estado
interface INotificador
{
    void Enviar(string mensaje);
}

// clase abstracta: contrato + comportamiento compartido
abstract class NotificadorBase : INotificador
{
    protected abstract string Formatear(string mensaje);
    public void Enviar(string mensaje) => EnviarInterno(Formatear(mensaje));
    protected abstract void EnviarInterno(string mensajeFormateado);
}
```
En Clean Architecture se prefieren **interfaces** para los límites entre capas: son el contrato más chico posible, sin arrastrar implementación.

## Composición sobre herencia

La herencia crea acoplamiento fuerte (una subclase depende de detalles internos de su base — "fragile base class problem"). La composición — armar objetos combinando otros objetos vía interfaces — es más flexible.

```csharp
// herencia: rígido, un GerenteVip no puede dejar de ser Empleado en runtime
class Empleado { public virtual decimal CalcularSueldo() => 1000; }
class Gerente : Empleado { public override decimal CalcularSueldo() => 2000; }

// composición: flexible, se arma el comportamiento inyectando piezas
interface ICalculadoraSueldo { decimal Calcular(); }
class SueldoGerente : ICalculadoraSueldo { public decimal Calcular() => 2000; }

class Empleado
{
    private readonly ICalculadoraSueldo _calculadora;
    public Empleado(ICalculadoraSueldo calculadora) => _calculadora = calculadora;
    public decimal CalcularSueldo() => _calculadora.Calcular();
}
```
Regla general: preferir composición; usar herencia solo cuando hay una relación "es-un" genuina y estable.

## SOLID — los principios que se apoyan en POO

Clean Architecture da por sentados los principios SOLID como base para diseñar las clases dentro de cada capa:

| Principio | Idea | Ejemplo rápido |
|---|---|---|
| **S** - Single Responsibility | una clase, una razón para cambiar | separar `CalculadoraImpuesto` de `RepositorioFactura` |
| **O** - Open/Closed | abierta a extensión, cerrada a modificación | agregar `PagoCripto : IFormaDePago` sin tocar código existente |
| **L** - Liskov Substitution | una subclase debe poder reemplazar a su base sin romper el programa | `PagoTarjeta` y `PagoEfectivo` deben cumplir el mismo contrato de `IFormaDePago` sin sorpresas |
| **I** - Interface Segregation | interfaces chicas y específicas, no una gigante | separar `ILector` de `IEscritor` en vez de un `IArchivo` con todo |
| **D** - Dependency Inversion | depender de abstracciones, no de concreciones | `ObtenerUsuarioUseCase` depende de `IUsuarioRepository`, no de `UsuarioRepositorySql` |

De estos cinco, el que más peso tiene en Clean Architecture es **Dependency Inversion (D)** — es el principio que formaliza la inversión de dependencias explicada arriba.

## Dependency Inversion Principle — en profundidad

Enunciado: *los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender de abstracciones.*

```csharp
// SIN DIP: el use case (alto nivel) depende directo de EF Core (bajo nivel)
class ObtenerUsuarioUseCase
{
    private readonly AppDbContext _db; // dependencia concreta de infraestructura
    public ObtenerUsuarioUseCase(AppDbContext db) => _db = db;
    public Usuario Ejecutar(int id) => _db.Usuarios.Find(id);
}

// CON DIP: el use case depende de una abstracción que él mismo define
interface IUsuarioRepository { Usuario ObtenerPorId(int id); }

class ObtenerUsuarioUseCase
{
    private readonly IUsuarioRepository _repo;
    public ObtenerUsuarioUseCase(IUsuarioRepository repo) => _repo = repo;
    public Usuario Ejecutar(int id) => _repo.ObtenerPorId(id);
}

// la implementación concreta vive en la capa externa, implementando la abstracción
class UsuarioRepositoryEf : IUsuarioRepository
{
    private readonly AppDbContext _db;
    public UsuarioRepositoryEf(AppDbContext db) => _db = db;
    public Usuario ObtenerPorId(int id) => _db.Usuarios.Find(id);
}
```
Con DI (dependency injection) en ASP.NET, el "cableado" se resuelve en el arranque de la app:
```csharp
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepositoryEf>();
builder.Services.AddScoped<ObtenerUsuarioUseCase>();
```
`ObtenerUsuarioUseCase` nunca sabe que existe `AppDbContext` ni EF Core — se puede testear con un fake:
```csharp
class UsuarioRepositoryFake : IUsuarioRepository
{
    public Usuario ObtenerPorId(int id) => new Usuario { Id = id, Nombre = "Test" };
}

[Fact]
public void Ejecutar_DevuelveUsuario()
{
    var useCase = new ObtenerUsuarioUseCase(new UsuarioRepositoryFake());
    var resultado = useCase.Ejecutar(1);
    Assert.Equal("Test", resultado.Nombre);
}
```
Sin DB real, sin framework, sin mocks pesados — el test corre en milisegundos.

## Errores comunes con POO

- **Herencia por conveniencia**: heredar solo para reusar código, sin relación "es-un" real → preferir composición
- **Interfaces "gordas"**: una interfaz con 15 métodos obliga a implementar cosas que no se necesitan → violar Interface Segregation
- **Dependencias concretas filtradas**: inyectar la interfaz pero seguir usando `new ClaseConcreta()` en algún lado adentro → rompe la inversión
- **God classes**: una clase que hace de todo → viola Single Responsibility, difícil de testear

## Resumen

| Sin POO (o sin usar polimorfismo) | Con POO |
|---|---|
| dependencias siguen el flujo de control | dependencias se pueden invertir respecto al flujo de control |
| capa interna conoce detalles externos (DB, framework) | capa interna solo conoce interfaces que ella misma define |
| difícil de testear (requiere DB real, framework real) | fácil de testear (se inyecta un mock/fake que implementa la interfaz) |
