---
tags:
  - clean-architecture
  - componentes
  - acoplamiento
---

# Stable Abstractions Principle (SAP)

Ver también: [[05-stable-dependencies-principle]]

Tercer principio de **acoplamiento de componentes**. Completa a SDP: SDP dice que hay que depender de lo estable, SAP dice **qué tan abstracto debe ser** ese componente estable.

## Enunciado

> Un componente debe ser tan abstracto como estable.

Si un componente es muy estable (muchos dependen de él, Ca alto, I bajo), pero es 100% concreto (sin interfaces, sin clases abstractas), se vuelve **rígido**: todo depende de él, y como es concreto, no se puede extender sin modificarlo — viola OCP (ver [[../06-principios-solid/01-open-closed-principle]]) a nivel de todo el sistema.

## Métrica: Abstractness (A)

```
A = (clases abstractas + interfaces) / (total de clases del componente)
```
Va de 0 (todo concreto) a 1 (todo abstracto/interfaces).

## La zona de dolor y la zona de inutilidad

Cruzando Inestabilidad (I, de SDP) con Abstractness (A, de SAP) en un gráfico, aparecen dos zonas a evitar:

```
A (abstracto)
1 │  ZONA DE INUTILIDAD
  │  (estable Y abstracto en exceso,        ...secuencia ideal
  │   nadie lo implementa, nadie lo usa)    "la línea principal"
  │        \
  │          \
  │            \
0 │──────────────\── ZONA DE DOLOR
  └──────────────────────────────────  I (inestable)
  0                                  1
  (I=0 estable)              (I=1 inestable)
```

| Zona | Qué significa | Ejemplo |
|---|---|---|
| **Zona de dolor** (I bajo, A bajo) | componente estable Y concreto — todo depende de él, pero no se puede extender sin romperlo | una clase `Usuario` concreta, sin interfaz, de la que dependen 20 componentes; cualquier cambio de forma obliga a tocar los 20 |
| **Zona de inutilidad** (I alto, A alto) | componente inestable Y abstracto — puras interfaces que nadie implementa, abandonadas | un paquete de interfaces "genéricas" creado especulativamente, sin implementación ni consumidores reales |
| **La secuencia principal** (main sequence) | la diagonal ideal: a mayor estabilidad, mayor abstracción | `MiApp.Domain` con interfaces (`IUsuarioRepository`) del que dependen muchos, y que es mayormente abstracto |

## Ejemplo — zona de dolor

```csharp
// MiApp.Domain — estable (Ca alto) pero 100% concreto (A=0)
namespace MiApp.Domain;

public class Usuario  // clase concreta, no hay interfaz
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public decimal Saldo { get; set; }
}
```
Si 15 componentes dependen de `Usuario` tal cual está definida, agregar un campo obligatorio o cambiar un tipo **rompe la compilación de los 15** — no hay forma de extender sin modificar, porque no hay ninguna abstracción de por medio.

## Aplicando SAP — llevar el componente estable hacia lo abstracto

```csharp
// MiApp.Domain — estable Y abstracto: define contratos, no implementaciones concretas de acceso
namespace MiApp.Domain;

public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public decimal Saldo { get; set; }
}

public interface IUsuarioRepository       // abstracción estable — esto es lo que "todos" referencian
{
    Usuario ObtenerPorId(int id);
    void Guardar(Usuario u);
}

public interface IPoliticaDescuento        // otra abstracción estable
{
    decimal Calcular(Usuario u, decimal monto);
}
```
Las implementaciones concretas (que sí cambian seguido: nueva política de descuento, nuevo motor de DB) viven en componentes **inestables** que dependen de estas abstracciones, no al revés — coherente con SDP.

```csharp
// MiApp.Infrastructure — inestable, concreto, implementa la abstracción estable
namespace MiApp.Infrastructure;
using MiApp.Domain;

public class UsuarioRepositorySql : IUsuarioRepository
{
    public Usuario ObtenerPorId(int id) { /* ... */ return null; }
    public void Guardar(Usuario u) { /* ... */ }
}
```
Ahora cambiar de motor de DB, o agregar una nueva política de descuento, es agregar una clase nueva (`OCP`) sin tocar `MiApp.Domain` ni a nadie que dependa de él.

## Relación con Clean Architecture

SAP es la razón técnica precisa por la que el **círculo más interno** de Clean Architecture (Entities/Use Cases) se modela con **interfaces** en vez de clases concretas para todo lo que cruza el límite hacia afuera. No alcanza con que la capa interna sea estable (SDP) — además tiene que ser lo suficientemente abstracta (SAP) para no caer en la zona de dolor: estable pero rígida, todo depende de ella y nada se puede extender sin romperla.

Ver también: [[00-que-son-los-componentes]]
