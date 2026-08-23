---
tags:
  - clean-architecture
  - paradigmas
---

# Qué son los paradigmas de programación

Un paradigma de programación es una forma de estructurar y construir código: define qué se puede y qué **no** se puede hacer. No agregan capacidades — **restringen**.

Ver también: [[00-que-es-clean-architecture]]

## La idea clave: restricción, no capacidad

Cada paradigma le **quita** poder al programador para imponer disciplina:

| Paradigma | Qué restringe |
|-----------|----------------|
| **Estructurado** | el uso directo e indiscriminado de `goto` — impone control de flujo mediante secuencia, selección e iteración |
| **Orientado a objetos** | el uso directo e indiscriminado de punteros a función — impone polimorfismo mediante mecanismos controlados (interfaces/clases) |
| **Funcional** | la asignación (mutación de estado) — impone inmutabilidad |

## Por qué importa para Clean Architecture

Cada paradigma quita una herramienta distinta y por eso resuelve un problema distinto:

- **Estructurado** → disciplina en la construcción de bloques de código correctos (base de las pruebas y del razonamiento sobre el flujo)
- **Orientado a objetos** → disciplina en la dirección de las dependencias (habilita la inversión de dependencias, columna vertebral de Clean Architecture)
- **Funcional** → disciplina en el orden y ubicación de la mutación de estado (evita condiciones de carrera, facilita concurrencia)

Ninguno reemplaza al otro. Se combinan: la arquitectura limpia usa polimorfismo (OO) para invertir dependencias, estructura interna disciplinada (estructurado) dentro de cada función, e inmutabilidad (funcional) donde el estado lo permite.

## Ejemplos

### Estructurado
Sin `goto`, solo secuencia, selección (`if`/`switch`) e iteración (`for`/`while`):
```csharp
decimal CalcularDescuento(decimal monto, bool esCliente)
{
    decimal descuento = 0;

    if (esCliente)
    {
        for (int i = 0; i < 3; i++)
        {
            descuento += monto * 0.01m;
        }
    }

    return descuento;
}
```

### Orientado a objetos
Sin punteros a función sueltos — polimorfismo vía interfaces:
```csharp
interface IDescuento
{
    decimal Calcular(decimal monto);
}

class DescuentoCliente : IDescuento
{
    public decimal Calcular(decimal monto) => monto * 0.03m;
}

class DescuentoRegular : IDescuento
{
    public decimal Calcular(decimal monto) => 0;
}

// el código que usa IDescuento no conoce la implementación concreta
decimal total = descuento.Calcular(monto);
```

### Funcional
Sin mutación de estado — cada función devuelve un valor nuevo:
```csharp
Func<decimal, decimal> calcularDescuento = monto => monto * 0.03m;

// en vez de mutar una lista existente, se genera una nueva
List<decimal> montosConDescuento = montos
    .Select(m => m - calcularDescuento(m))
    .ToList();
```

## Próximas clases de esta sección

- Programación estructurada en detalle
