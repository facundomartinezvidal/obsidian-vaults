---
tags:
  - csharp
  - poo
  - introduccion-a-csharp
---

# Genéricos (Generics)

## Qué es

Permiten escribir clases/métodos que trabajan con **cualquier tipo**, definido recién cuando se usan — sin repetir código por cada tipo ni perder el chequeo de tipos (a diferencia de usar `object`).

Se marcan con `<T>` (T = "Type", nombre convencional, podría ser cualquier letra/palabra).

## Problema que resuelve

Sin genéricos, para guardar distintos tipos habría que:
- repetir la clase por cada tipo (`ListaInt`, `ListaString`...) → duplicación
- o usar `object` → pierde el chequeo de tipos, hay que castear

```csharp
public class Caja
{
    public object Contenido { get; set; }
}

Caja c = new Caja();
c.Contenido = "texto";
int x = (int)c.Contenido;   // ERROR en runtime: es string, no int. Compilador no lo detectó.
```

## Clase genérica

```csharp
public class Caja<T>
{
    public T Contenido { get; set; }

    public void Mostrar()
    {
        Console.WriteLine(Contenido);
    }
}
```

```csharp
Caja<string> cajaTexto = new Caja<string>();
cajaTexto.Contenido = "hola";

Caja<int> cajaNumero = new Caja<int>();
cajaNumero.Contenido = 5;

cajaTexto.Contenido = 10;   // ERROR de compilación: Caja<string> solo acepta string
```

El compilador **sí** chequea el tipo — a diferencia del ejemplo con `object`, acá el error se detecta antes de correr el programa.

## Método genérico

```csharp
public T ObtenerPrimero<T>(List<T> lista)
{
    return lista[0];
}
```

```csharp
List<int> numeros = new List<int> { 1, 2, 3 };
int primero = ObtenerPrimero(numeros);   // T se infiere como int, no hace falta escribirlo
```

## Dónde ya los venías usando

`List<T>`, `Dictionary<TKey, TValue>` son genéricos de la librería estándar:

```csharp
List<string> nombres = new List<string>();
Dictionary<string, int> edades = new Dictionary<string, int>();
```

## Restricciones (`where`) — opcional

Se puede limitar qué tipos acepta `T`:

```csharp
public class Repositorio<T> where T : class    // T debe ser un tipo referencia
{
    ...
}
```

## Resumen

| Sin genéricos | Con genéricos |
|---|---|
| `object` → sin chequeo de tipos, casteos | `T` → chequeo de tipos en compilación |
| Duplicar clase por tipo | una sola clase/método sirve para todos |
| Errores en runtime | errores detectados en compilación |
