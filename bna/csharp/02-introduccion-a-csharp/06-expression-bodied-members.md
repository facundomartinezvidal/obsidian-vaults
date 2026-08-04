---
tags:
  - csharp
  - introduccion-a-csharp
  - syntax-sugar
---

# `=>` — sintaxis abreviada para retornar (expression-bodied members)

## Qué es

Azúcar sintáctico: cuando un método/propiedad tiene **una sola expresión** como cuerpo, se puede reemplazar `{ return ...; }` por `=> ...;`.

### Método normal vs abreviado

```csharp
// forma normal
public int Sumar(int a, int b)
{
    return a + b;
}

// con =>  (expression-bodied method)
public int Sumar(int a, int b) => a + b;
```

Son **exactamente equivalentes** — el compilador genera el mismo código. `=>` solo evita escribir `{ return ; }` cuando el cuerpo es una sola línea/expresión.

### En `ToString()` — ver [[05-tostring]]

```csharp
public override string ToString()
{
    return $"{Nombre} ({Edad} años)";
}

// equivalente
public override string ToString() => $"{Nombre} ({Edad} años)";
```

### En propiedades (get abreviado)

```csharp
public string NombreCompleto
{
    get { return $"{Nombre} {Apellido}"; }
}

// equivalente
public string NombreCompleto => $"{Nombre} {Apellido}";
```

## Cuándo usarlo

Solo cuando el cuerpo es **una expresión única** que se puede evaluar y devolver directo. Si necesita varias líneas, `if`s, variables intermedias — usar la forma normal con `{ }`.

## No confundir con lambdas

El mismo símbolo `=>` se usa también en **expresiones lambda** (`x => x * 2`), que es otro tema (funciones anónimas) — acá el uso es distinto: es azúcar sintáctico para el cuerpo de un método/propiedad ya declarado, no una función anónima.
