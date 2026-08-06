---
tags:
  - csharp
  - entity-framework
---

# Creación de modelos con Entity Framework

Ver también: [[00-que-es-orm-y-entity-framework]], [[00-dto-y-models|dto-y-models]]

## Qué es un modelo (Entity) en EF

Clase C# que representa una **tabla** de la base de datos — cada propiedad pública es una **columna**. EF usa convenciones para inferir el mapeo, sin que haga falta configurar todo a mano.

```csharp
public class Usuario
{
    public int Id { get; set; }           // convención: "Id" = Primary Key automática
    public string Nombre { get; set; }
    public string Email { get; set; }
    public DateTime FechaCreacion { get; set; }
}
```

## Convenciones que EF infiere solo

| Propiedad | EF infiere |
|---|---|
| `Id` o `<NombreClase>Id` | Primary Key |
| tipo `string` | columna `nvarchar`, nullable por default |
| tipo `int`, `DateTime`, etc (no nullable) | columna `NOT NULL` |
| tipo `int?`, `string?` | columna nullable |

## Relaciones entre modelos

**Uno a muchos** — un `Usuario` tiene muchas `Cuenta`:

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }

    public List<Cuenta> Cuentas { get; set; } = new();   // navegación: un usuario, muchas cuentas
}

public class Cuenta
{
    public int Id { get; set; }
    public decimal Saldo { get; set; }

    public int UsuarioId { get; set; }        // Foreign Key
    public Usuario Usuario { get; set; }       // navegación: la cuenta pertenece a un usuario
}
```

`UsuarioId` + `Usuario` en `Cuenta` — EF detecta la relación por convención (nombre `UsuarioId` matchea con la clase `Usuario`).

## Registrar el modelo en el `DbContext`

```csharp
public class NetbankDbContext : DbContext
{
    public NetbankDbContext(DbContextOptions<NetbankDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Cuenta> Cuentas { get; set; }
}
```

Cada `DbSet<T>` representa una tabla — sin esto, EF no sabe que el modelo debe mapearse a la DB.

## Personalizar el mapeo — Data Annotations

Cuando la convención no alcanza (ej: longitud máxima, nombre de columna distinto):

```csharp
public class Usuario
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombre { get; set; }

    [Column("email_usuario")]
    public string Email { get; set; }
}
```

### Atributos más usados

| Atributo | Para qué sirve |
|---|---|
| `[Key]` | marca la Primary Key (si el nombre no sigue la convención `Id`) |
| `[Required]` | columna `NOT NULL` |
| `[MaxLength(n)]` / `[MinLength(n)]` | longitud máxima/mínima (strings, arrays) |
| `[Column("nombre")]` | nombre de columna distinto al de la propiedad |
| `[Table("nombre")]` | nombre de tabla distinto al de la clase (va arriba de la clase) |
| `[ForeignKey("PropNav")]` | indica cuál propiedad es la FK de una relación, cuando el nombre no sigue convención |
| `[NotMapped]` | la propiedad **no** se mapea a ninguna columna (dato calculado, no persiste) |
| `[DatabaseGenerated(DatabaseGeneratedOption.Identity)]` | el valor lo genera la DB (autoincremental) — típico junto a `[Key]` |

```csharp
[Table("usuarios")]
public class Usuario
{
    [Key]
    public int UsuarioId { get; set; }   // nombre no sigue convención "Id" -> hace falta [Key]

    [NotMapped]
    public string NombreCompleto => $"{Nombre} {Apellido}";   // no es columna, se calcula
}
```

### Ejemplo completo, con relación — igual al patrón visto en clase

```csharp
public class Beer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int BeerID { get; set; }

    public string Name { get; set; }

    public int BrandID { get; set; }              // Foreign Key

    [ForeignKey("BrandID")]
    public virtual Brand Brand { get; set; }        // navegación hacia el modelo relacionado
}
```

- `[DatabaseGenerated(DatabaseGeneratedOption.Identity)]` — el `BeerID` lo genera la DB sola (autoincremental), C# no lo asigna
- `[ForeignKey("BrandID")]` sobre la propiedad de **navegación** (`Brand`) — indica explícitamente que `BrandID` es la FK que arma esa relación (útil cuando el nombre no alcanza para que EF lo infiera solo)
- `virtual` en la propiedad de navegación — habilita **lazy loading**: EF trae `Brand` recién cuando se accede a esa propiedad, no en la query inicial

## Resumen

- Modelo (Entity) = clase C# que mapea a una tabla, propiedades = columnas
- EF infiere mucho por convención (Id = PK, tipos, FKs por nombre)
- Relaciones se modelan con propiedades de navegación (`List<T>`, referencia directa)
- `DbSet<T>` en el `DbContext` registra el modelo como tabla
- Data Annotations (`[Required]`, `[MaxLength]`, etc) ajustan el mapeo cuando la convención no alcanza
