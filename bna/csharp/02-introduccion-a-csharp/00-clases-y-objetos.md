---
tags:
  - csharp
  - poo
  - introduccion-a-csharp
---

# Clases y objetos

## Clase

**Molde/plantilla** que define qué datos (atributos) y comportamientos (métodos) va a tener algo. No existe en memoria hasta que se instancia.

```csharp
public class Persona
{
    // campos / atributos
    public string Nombre;
    public int Edad;

    // método
    public void Saludar()
    {
        Console.WriteLine($"Hola, soy {Nombre}");
    }
}
```

## Objeto

**Instancia concreta** de una clase, en memoria, con valores propios. Se crea con `new`.

```csharp
Persona p1 = new Persona();
p1.Nombre = "Facundo";
p1.Edad = 28;
p1.Saludar();   // "Hola, soy Facundo"

Persona p2 = new Persona();
p2.Nombre = "Ana";
p2.Edad = 30;
```

`p1` y `p2` comparten la misma clase (mismo molde) pero tienen datos independientes.

## Clase vs Objeto — analogía

| Clase | Objeto |
|-------|--------|
| Plano de una casa | Casa construida |
| `Persona` | `p1`, `p2` (personas concretas) |
| Define estructura | Ocupa memoria, tiene estado real |

## Constructor

Método especial que se ejecuta al crear el objeto (`new`), sirve para inicializar valores.

```csharp
public class Persona
{
    public string Nombre;
    public int Edad;

    // constructor
    public Persona(string nombre, int edad)
    {
        Nombre = nombre;
        Edad = edad;
    }
}
```

```csharp
Persona p1 = new Persona("Facundo", 28);
```

- Mismo nombre que la clase, sin tipo de retorno
- Si no defino ninguno, C# genera uno vacío por defecto (constructor sin parámetros)
- Si defino uno con parámetros, el vacío desaparece (a menos que lo agregue explícito)

## Propiedades (properties)

Forma más prolija que un campo público — permite controlar lectura/escritura:

```csharp
public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
}
```

`get`/`set` = accesores automáticos (auto-implemented properties). Equivale a tener un campo privado + método get + método set, pero C# lo simplifica.

## Miembros de una clase (resumen)

| Miembro | Qué es |
|---------|--------|
| **Campo** (field) | variable que guarda estado |
| **Propiedad** (property) | acceso controlado a un dato (`get`/`set`) |
| **Método** | comportamiento/acción |
| **Constructor** | inicializa el objeto al crearlo |

## Convención de nombres — atributos/propiedades públicas en Mayúscula (PascalCase)

Propiedades y atributos **públicos** empiezan con **mayúscula**, PascalCase (cada palabra con mayúscula inicial, sin guiones ni underscore).

```csharp
public class Persona
{
    public string Nombre { get; set; }     // PascalCase
    public int Edad { get; set; }
    public string DireccionEmail { get; set; }
}
```

Regla general de C#: **público = PascalCase**, **privado = _camelCase**. Distingue de un vistazo qué es API pública de la clase vs detalle interno.

| Elemento | Convención | Ejemplo |
|---|---|---|
| Clase | PascalCase | `Persona` |
| Método público | PascalCase | `Saludar()` |
| Propiedad pública | PascalCase | `Nombre` |
| Campo privado | _camelCase | `_nombre` |
| Variable local, parámetro | camelCase | `nombre`, `edad` |

## Convención de nombres — campo privado con `_`

Los campos **privados** de una clase se nombran con **guion bajo (`_`) al principio**, camelCase después. Es convención de C#, no regla del compilador — pero se usa siempre.

```csharp
public class Persona
{
    private string _nombre;   // campo privado -> _camelCase
    private int _edad;

    public string Nombre      // propiedad pública -> PascalCase
    {
        get { return _nombre; }
        set { _nombre = value; }
    }

    public Persona(string nombre)
    {
        _nombre = nombre;
    }
}
```

Sirve para distinguir de un vistazo **campo privado interno** (`_nombre`) vs **propiedad/parámetro público** (`Nombre`, `nombre`) — evita choques de nombre y deja claro qué es estado interno de la clase.

## Objeto = instancia de una clase

Regla mental: **la clase se escribe una vez, los objetos se crean todas las veces que necesite** con `new NombreClase(...)`. Cada objeto tiene su propia copia de los campos/propiedades, pero comparte la definición de métodos.
