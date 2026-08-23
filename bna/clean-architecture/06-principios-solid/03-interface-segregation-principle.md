---
tags:
  - clean-architecture
  - solid
  - isp
---

# Interface Segregation Principle (ISP)

Ver también: [[02-liskov-substitution-principle]]

## Enunciado

> Ningún cliente debería verse forzado a depender de métodos que no usa.

Interfaces chicas y específicas por cliente, en vez de una interfaz gigante que sirve para todo.

## Violación — interfaz "gorda"

```csharp
// una sola interfaz para todo tipo de trabajador
interface ITrabajador
{
    void Trabajar();
    void Comer();
    void Dormir();
}

class TrabajadorHumano : ITrabajador
{
    public void Trabajar() { /* ... */ }
    public void Comer() { /* ... */ }
    public void Dormir() { /* ... */ }
}

class Robot : ITrabajador
{
    public void Trabajar() { /* ... */ }
    public void Comer() => throw new NotSupportedException(); // un robot no come
    public void Dormir() => throw new NotSupportedException(); // un robot no duerme
}
```
`Robot` está forzado a "implementar" métodos que no tienen sentido para él — termina lanzando excepciones, lo cual además **viola LSP** (ver [[02-liskov-substitution-principle]]). El problema nace en el diseño de la interfaz: es demasiado ancha.

## Aplicando ISP — separar por cliente/capacidad

```csharp
interface ITrabajable { void Trabajar(); }
interface IComible { void Comer(); }
interface IDurmiente { void Dormir(); }

class TrabajadorHumano : ITrabajable, IComible, IDurmiente
{
    public void Trabajar() { /* ... */ }
    public void Comer() { /* ... */ }
    public void Dormir() { /* ... */ }
}

class Robot : ITrabajable  // solo implementa lo que realmente puede hacer
{
    public void Trabajar() { /* ... */ }
}
```
Cada clase implementa exactamente lo que necesita, ni más ni menos. El código que solo necesita hacer trabajar a alguien depende de `ITrabajable`, no de `ITrabajador` completo — no se entera si existe `Comer()` o `Dormir()`.

## Ejemplo típico en una API — repositorios

```csharp
// viola ISP: un reporte de solo lectura se ve forzado a "implementar" escritura
interface IRepository<T>
{
    T ObtenerPorId(int id);
    List<T> ObtenerTodos();
    void Guardar(T entidad);
    void Eliminar(int id);
}

// segregado: cada consumidor depende solo de lo que usa
interface ILectorRepository<T>
{
    T ObtenerPorId(int id);
    List<T> ObtenerTodos();
}

interface IEscritorRepository<T>
{
    void Guardar(T entidad);
    void Eliminar(int id);
}

// un caso de uso de solo lectura declara su dependencia real, sin arrastrar Guardar/Eliminar
class ListarUsuariosUseCase
{
    private readonly ILectorRepository<Usuario> _repo;
    public ListarUsuariosUseCase(ILectorRepository<Usuario> repo) => _repo = repo;
    public List<Usuario> Ejecutar() => _repo.ObtenerTodos();
}
```
Ventaja extra: `ListarUsuariosUseCase` documenta con su propia firma que **no necesita** poder escribir — el contrato es más honesto y el test doble (fake) es más chico.

## Por qué importa: acoplamiento por recompilación

En sistemas grandes, si una interfaz gorda cambia (se agrega un método), **todos** los que la implementan tienen que recompilarse/adaptarse, aunque no usen el método nuevo. Interfaces chicas minimizan el radio de impacto de un cambio.

## Cómo detectar violaciones

- Implementaciones con métodos que lanzan `NotImplementedException`
- Interfaces con métodos agrupables en subconjuntos claramente distintos (lectura vs escritura, notificación por email vs por SMS)
- Clases que reciben una interfaz por constructor pero solo usan 2 de sus 10 métodos

## Relación con Clean Architecture

En los límites entre capas, ISP empuja a definir interfaces **desde el punto de vista del que las consume** (la capa interna), no desde el punto de vista del que las implementa (la capa externa). Un Use Case debería declarar la interfaz más chica que necesita — no una interfaz genérica de "repositorio" que sirva para cualquier entidad y cualquier operación.

Ver también: [[04-dependency-inversion-principle]]
