---
tags:
  - csharp
  - poo
  - introduccion-a-csharp
---

# Herencia

## Qué es

Una clase (**derivada/hija**) puede heredar atributos y métodos de otra (**base/padre**), reutilizando código y modelando relación "es un" (`Perro` **es un** `Animal`).

```csharp
public class Animal
{
    public string Nombre { get; set; }

    public void Comer()
    {
        Console.WriteLine($"{Nombre} está comiendo");
    }
}

public class Perro : Animal   // Perro hereda de Animal
{
    public void Ladrar()
    {
        Console.WriteLine($"{Nombre} dice: guau!");
    }
}
```

```csharp
Perro p = new Perro();
p.Nombre = "Rex";
p.Comer();     // heredado de Animal
p.Ladrar();    // propio de Perro
```

Sintaxis: `class Hija : Base`. C# solo permite **herencia simple** (una sola clase base directa, no múltiple como C++).

## `base` — llamar al constructor/miembros del padre

```csharp
public class Animal
{
    protected string _nombre;

    public Animal(string nombre)
    {
        _nombre = nombre;
    }
}

public class Perro : Animal
{
    public Perro(string nombre) : base(nombre)   // llama al constructor de Animal
    {
    }
}
```

## `protected` — visible para la clase y sus hijas

| Modificador | Quién accede |
|---|---|
| `private` | solo la misma clase |
| `protected` | la misma clase + clases derivadas |
| `public` | cualquiera |

Se usa `protected` (no `private`) cuando un campo/propiedad/método del padre debe ser accesible desde las clases hijas, pero **sin exponerlo afuera** de la jerarquía.

```csharp
public class Animal
{
    protected string _nombre;         // campo protected
    protected void Respirar()          // método protected
    {
        Console.WriteLine($"{_nombre} respira");
    }
}

public class Perro : Animal
{
    public void Presentarse()
    {
        Console.WriteLine($"Soy {_nombre}");   // OK: hija accede al protected del padre
        Respirar();                             // OK: hija llama método protected del padre
    }
}
```

```csharp
Perro p = new Perro();
p._nombre = "Rex";     // ERROR de compilación: _nombre es protected, no accesible desde afuera
p.Respirar();           // ERROR de compilación: Respirar() es protected
```

**Clave**: `protected` da acceso **solo dentro de la herencia** (clase base + toda clase que herede de ella). Desde código externo que solo tiene una instancia (`p.algo`), sigue siendo invisible — en eso se comporta como `private` de cara al "mundo exterior".

- `private` = ni siquiera las hijas lo ven
- `protected` = las hijas sí, el resto no
- `public` = todos

Combinación típica: campos internos en `protected` (o `private` + propiedad `protected`/`public`), para que la clase base decida qué expone a sus hijas vs a todo el mundo.

## `virtual` y `override` — redefinir comportamiento

Método del padre marcado `virtual` puede ser **sobreescrito** por la hija con `override`:

```csharp
public class Animal
{
    public virtual void HacerSonido()
    {
        Console.WriteLine("Sonido genérico de animal");
    }
}

public class Perro : Animal
{
    public override void HacerSonido()
    {
        Console.WriteLine("Guau!");
    }
}
```

```csharp
Animal a = new Perro();
a.HacerSonido();   // "Guau!" -> usa la versión de Perro (polimorfismo)
```

### Por qué hace falta `virtual` Y `override` (los dos)

- `virtual` en el padre: **habilita** que ese método pueda ser redefinido. Sin `virtual`, la hija no puede usar `override` (error de compilación).
- `override` en la hija: dice explícitamente "estoy redefiniendo este método", no inventando uno nuevo. El compilador chequea que exista un `virtual` (o `abstract`) con misma firma en la base.

Sin `virtual`/`override`, el método de la hija **oculta** al del padre (*method hiding*) en vez de sobreescribirlo — comportamiento distinto y confuso: si tenés la variable tipada como `Animal` pero el objeto es `Perro`, se ejecuta la versión del padre igual, porque no hay polimorfismo real. Evitar salvo caso puntual explícito con `new`.

### Llamar a la versión del padre desde la hija — `base.Metodo()`

Si la hija quiere agregar comportamiento sin perder el del padre:

```csharp
public class Perro : Animal
{
    public override void HacerSonido()
    {
        base.HacerSonido();              // ejecuta la versión de Animal primero
        Console.WriteLine("Guau!");      // + comportamiento propio
    }
}
```

### Polimorfismo — por qué importa

La gracia de `virtual`/`override`: una lista de `Animal` puede contener `Perro`, `Gato`, etc., y cada uno ejecuta **su propia** versión de `HacerSonido()` automáticamente, sin `if`/`switch` por tipo:

```csharp
List<Animal> animales = new List<Animal> { new Perro(), new Gato() };
foreach (var a in animales)
{
    a.HacerSonido();   // cada uno suena distinto, según su tipo real
}
```

## Sobrecarga de métodos (overloading) — no confundir con override

**Sobrecarga**: misma clase, **mismo nombre de método**, distinta **firma** (cantidad y/o tipo de parámetros). No tiene que ver con herencia — ocurre dentro de una sola clase.

```csharp
public class Calculadora
{
    public int Sumar(int a, int b)
    {
        return a + b;
    }

    public int Sumar(int a, int b, int c)      // sobrecarga: distinta cantidad de params
    {
        return a + b + c;
    }

    public double Sumar(double a, double b)     // sobrecarga: distinto tipo de params
    {
        return a + b;
    }
}
```

```csharp
Calculadora c = new Calculadora();
c.Sumar(1, 2);        // usa la versión (int, int)
c.Sumar(1, 2, 3);      // usa la versión (int, int, int)
c.Sumar(1.5, 2.5);     // usa la versión (double, double)
```

El compilador elige **en compilación** qué versión llamar, según los argumentos que le pasás.

### Overload vs Override

| | **Overload** (sobrecarga) | **Override** (sobreescritura) |
|---|---|---|
| Dónde | misma clase | clase hija sobre clase base |
| Firma | distinta (params) | idéntica |
| Requiere herencia | no | sí |
| Palabra clave | ninguna | `virtual` + `override` |
| Se resuelve | en compilación (según args) | en runtime (según tipo real del objeto) |

## Resumen

| Palabra clave | Uso |
|---|---|
| `:` | indica de quién hereda (`class Hija : Base`) |
| `base(...)` | llama al constructor del padre |
| `protected` | miembro visible para hijas, no público |
| `virtual` | método del padre que puede redefinirse |
| `override` | redefine un método `virtual` del padre |
