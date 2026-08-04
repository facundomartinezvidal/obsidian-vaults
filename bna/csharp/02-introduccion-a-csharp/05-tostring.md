---
tags:
  - csharp
  - poo
  - introduccion-a-csharp
---

# `ToString()` — método heredado de `object`

Ver también: [[02-herencia]] (virtual/override)

## De dónde sale

**Toda clase en C# hereda de `object`** implícitamente, aunque no se escriba `: object`. `object` define varios métodos base, entre ellos `ToString()`, marcado `virtual`.

```csharp
public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
}
```

```csharp
Persona p = new Persona { Nombre = "Facundo", Edad = 28 };
Console.WriteLine(p.ToString());   // "MiApp.Persona" (nombre completo de la clase, poco útil)
Console.WriteLine(p);              // WriteLine llama ToString() automáticamente -> mismo resultado
```

Por defecto `ToString()` devuelve el **nombre del tipo**, no algo útil sobre el objeto.

## Sobreescribirlo con `override`

Mismo mecanismo que cualquier `virtual`/`override` de herencia:

```csharp
public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }

    public override string ToString()
    {
        return $"{Nombre} ({Edad} años)";
    }
}
```

```csharp
Persona p = new Persona { Nombre = "Facundo", Edad = 28 };
Console.WriteLine(p);   // "Facundo (28 años)"
```

## Por qué importa

- `Console.WriteLine(objeto)`, interpolación `$"{objeto}"`, debugger — todos usan `ToString()` internamente para mostrar el objeto
- Sin `override`, ver un objeto en consola/log es inútil (solo el nombre del tipo)
- Es el mismo patrón `virtual` (en `object`) + `override` (en tu clase) ya visto en herencia — acá el `virtual` no lo escribís vos, ya viene definido en `object`
