---
tags:
  - csharp
  - introduccion-a-csharp
---

# `struct`

## Qué es

Como una clase (agrupa campos/propiedades/métodos), pero es **tipo valor** (`value type`), no tipo referencia (`reference type`) como `class`.

```csharp
public struct Punto
{
    public int X { get; set; }
    public int Y { get; set; }

    public Punto(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```

Se usa exactamente igual que una clase:
```csharp
Punto p = new Punto(1, 2);
Console.WriteLine(p.X);
```

## Diferencia clave: `class` vs `struct` — value type vs reference type

| | `class` (reference type) | `struct` (value type) |
|---|---|---|
| Dónde vive | heap | stack (normalmente) |
| Variable guarda | una **referencia** al objeto | el **valor** directo |
| Al asignar `b = a` | ambas apuntan al **mismo** objeto | se **copia** todo el valor |
| Al pasar a un método | se pasa la referencia (modificar adentro afecta afuera) | se pasa una copia (modificar adentro NO afecta afuera) |
| Puede ser `null` | sí | no (salvo `Nullable<T>` / `Punto?`) |
| Herencia | sí | no (no puede heredar de otra struct/class, sí implementar interfaces) |

### Ejemplo — la diferencia que más confunde

```csharp
public class PersonaClase { public int Edad; }
public struct PuntoStruct { public int X; }

// class: referencia compartida
PersonaClase p1 = new PersonaClase { Edad = 20 };
PersonaClase p2 = p1;
p2.Edad = 99;
Console.WriteLine(p1.Edad);   // 99 -> p1 y p2 son el MISMO objeto

// struct: copia independiente
PuntoStruct s1 = new PuntoStruct { X = 20 };
PuntoStruct s2 = s1;
s2.X = 99;
Console.WriteLine(s1.X);      // 20 -> s2 es una COPIA, s1 no cambió
```

## Cuándo usar struct

Para datos **pequeños, simples, inmutables por naturaleza** donde tiene sentido copiar en vez de compartir referencia: coordenadas, colores, rangos de fecha. Ejemplos ya existentes en .NET: `int`, `double`, `bool`, `DateTime`, `decimal` — **todos los tipos primitivos son structs**.

Para entidades con identidad propia, que cambian de estado y se comparten entre partes del programa (típico de backend: `Usuario`, `Pedido`, `Cliente`) → usar `class`.

## Resumen

- `struct` = tipo valor, se copia
- `class` = tipo referencia, se comparte
- Sintaxis para definir miembros es la misma que una clase
- Todos los tipos primitivos de C# (`int`, `bool`, etc) son structs por debajo
