---
tags:
  - csharp
  - poo
  - introduccion-a-csharp
---

# Interfaces

## Qué es

Un **contrato**: define **qué métodos/propiedades debe tener** una clase, sin implementarlos. La clase que la implementa (`implements`... en C# se usa `:` igual que herencia) está **obligada** a definir todos sus miembros.

```csharp
public interface IAnimal
{
    void HacerSonido();
    void Comer();
}
```

- Se nombran con **`I` mayúscula al principio** (convención: `IAnimal`, `IRepository`, `IComparable`)
- Solo declara la firma (nombre, params, tipo de retorno) — **sin cuerpo**, sin `{ }`
- No tiene campos, no tiene constructor, no tiene implementación

## Implementar una interfaz

```csharp
public class Perro : IAnimal
{
    public void HacerSonido()
    {
        Console.WriteLine("Guau!");
    }

    public void Comer()
    {
        Console.WriteLine("El perro come");
    }
}
```

Si `Perro` no implementa **todos** los miembros de `IAnimal` → error de compilación.

## Interfaz vs Herencia

| | Herencia (`class : class`) | Interfaz (`class : interface`) |
|---|---|---|
| Cuántas | una sola clase base | **varias** interfaces a la vez |
| Trae implementación | sí (código heredado) | no, solo firma/contrato |
| Relación | "es un" | "puede hacer esto" / "cumple con" |

```csharp
public class Perro : Animal, IAnimal, IComparable   // 1 clase base + N interfaces
{
    ...
}
```

C# no permite herencia múltiple de clases, pero **sí** permite implementar múltiples interfaces — así se logra algo parecido sin la complejidad de herencia múltiple.

## Para qué sirve — el motivo real

Permite **desacoplar** código: una función puede trabajar con "cualquier cosa que cumpla el contrato", sin importar la clase concreta.

```csharp
public void ProcesarAnimal(IAnimal animal)
{
    animal.HacerSonido();   // funciona con Perro, Gato, cualquier IAnimal
}
```

```csharp
ProcesarAnimal(new Perro());
ProcesarAnimal(new Gato());
```

Muy usado en backend para:
- **Inyección de dependencias** (ej: `IRepository`, `IUsuarioService` — se programa contra la interfaz, no la implementación concreta)
- **Testing** (mockear una interfaz es fácil, mockear una clase concreta no tanto)
- Intercambiar implementaciones sin tocar el código que la usa

## Resumen

| Concepto | Idea |
|---|---|
| Interfaz | contrato, solo firmas, sin implementación |
| `I` + PascalCase | convención de nombre (`IAnimal`) |
| Implementar | clase debe definir **todos** los miembros |
| Múltiples interfaces | sí, se pueden implementar varias a la vez |
| Objetivo | desacoplar, programar contra el contrato no la clase concreta |
