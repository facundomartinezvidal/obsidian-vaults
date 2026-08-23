---
tags:
  - clean-architecture
  - solid
  - lsp
---

# Liskov Substitution Principle (LSP)

Ver también: [[01-open-closed-principle]]

## Enunciado

Formulado por Barbara Liskov (1988):

> Si `S` es un subtipo de `T`, los objetos de tipo `T` deben poder reemplazarse por objetos de tipo `S` **sin alterar la corrección del programa**.

En criollo: una subclase/implementación tiene que **cumplir el mismo contrato** que su tipo base — no solo la firma de los métodos, sino el **comportamiento esperado**.

## El ejemplo clásico: rectángulo y cuadrado

Matemáticamente un cuadrado "es un" rectángulo. En código, esa relación rompe LSP:

```csharp
class Rectangulo
{
    public virtual int Ancho { get; set; }
    public virtual int Alto { get; set; }
    public int Area() => Ancho * Alto;
}

class Cuadrado : Rectangulo
{
    // fuerza Ancho == Alto siempre, "sorprende" al que espera un Rectangulo
    public override int Ancho
    {
        get => base.Ancho;
        set { base.Ancho = value; base.Alto = value; }
    }
    public override int Alto
    {
        get => base.Alto;
        set { base.Alto = value; base.Ancho = value; }
    }
}

void Test(Rectangulo r)
{
    r.Ancho = 5;
    r.Alto = 10;
    Assert.Equal(50, r.Area()); // FALLA si r es un Cuadrado (da 100)
}
```
`Cuadrado` es sintácticamente un `Rectangulo` (compila, hereda), pero **semánticamente rompe el contrato**: código que funciona con cualquier `Rectangulo` deja de funcionar si le pasan un `Cuadrado`. Esto es una violación de LSP.

## Ejemplo más cercano al día a día: excepciones inesperadas

```csharp
class Repositorio
{
    public virtual void Guardar(Entidad e) { /* guarda normalmente */ }
}

class RepositorioSoloLectura : Repositorio
{
    // viola LSP: quien recibe un Repositorio no espera esta excepción
    public override void Guardar(Entidad e) =>
        throw new NotSupportedException("Este repositorio es de solo lectura");
}
```
Cualquier código que use `Repositorio.Guardar()` de forma genérica va a explotar en runtime si recibe un `RepositorioSoloLectura`, aunque el compilador nunca se queje. El contrato implícito ("guardar funciona") se rompió.

Corrección: no modelar `RepositorioSoloLectura` como subtipo de `Repositorio` si no puede cumplir el mismo contrato. Separar las interfaces (ver [[03-interface-segregation-principle]]):
```csharp
interface ILector { Entidad Obtener(int id); }
interface IEscritor { void Guardar(Entidad e); }

class RepositorioSoloLectura : ILector
{
    public Entidad Obtener(int id) { /* ... */ return null; }
    // no implementa IEscritor porque no puede cumplirlo — ya no hay contrato roto
}
```

## Reglas concretas para no violar LSP

1. **Precondiciones** no se pueden fortalecer en la subclase (no exigir más de lo que exige la base)
2. **Postcondiciones** no se pueden debilitar (no prometer menos de lo que promete la base)
3. **No lanzar excepciones nuevas** que el código que usa el tipo base no espera
4. **Invariantes** de la clase base se deben mantener en la subclase

```csharp
class ValidadorEdad
{
    // precondición: edad >= 0
    public virtual bool EsValida(int edad) => edad >= 0;
}

class ValidadorEdadEstricto : ValidadorEdad
{
    // viola LSP: fortalece la precondición (ahora exige >= 18, más restrictivo)
    public override bool EsValida(int edad) => edad >= 18;
}
```
Código que confiaba en que `ValidadorEdad.EsValida(5)` daba `true` se rompe silenciosamente si le inyectan un `ValidadorEdadEstricto`.

## Cómo detectar violaciones

- Una subclase que lanza `NotImplementedException`/`NotSupportedException` en un método heredado
- Un `if (obj is TipoConcreto)` para tratar distinto a una subclase específica — señal de que el polimorfismo no está funcionando como contrato uniforme
- Tests que pasan para la clase base pero fallan al correr la misma batería contra la subclase

## Relación con Clean Architecture

LSP es lo que garantiza que las implementaciones concretas de una interfaz (ej. distintas implementaciones de `IUsuarioRepository`: SQL, Mongo, en memoria para tests) sean **intercambiables sin sorpresas**. Sin LSP, la inversión de dependencias (ver [[00-programacion-orientada-a-objetos]]) pierde sentido: da lo mismo depender de una interfaz si las implementaciones no respetan el mismo contrato.

Ver también: [[03-interface-segregation-principle]]
