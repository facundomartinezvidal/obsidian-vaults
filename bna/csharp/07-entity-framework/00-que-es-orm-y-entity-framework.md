---
tags:
  - csharp
  - entity-framework
  - orm
---

# Qué es un ORM y qué es Entity Framework

## Qué es un ORM

**Object-Relational Mapping** — capa que traduce entre **objetos de C#** (clases) y **tablas de una base de datos relacional**, sin escribir SQL a mano. Cada clase mapea a una tabla, cada propiedad a una columna, cada instancia a una fila.

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }
}
```

Sin ORM (ADO.NET puro), habría que escribir el SQL y mapear el resultado a mano:
```csharp
var cmd = new SqlCommand("SELECT * FROM Usuarios WHERE Id = @id", conn);
// ... leer el DataReader, armar el objeto Usuario campo por campo
```

Con ORM:
```csharp
Usuario usuario = dbContext.Usuarios.Find(id);   // el ORM genera y ejecuta el SQL, y arma el objeto
```

## Qué es Entity Framework (EF Core)

El **ORM oficial de .NET** — implementación de Microsoft. Traduce código C# (LINQ, ver [[08-programacion-funcional|programacion-funcional]]) a SQL, ejecuta contra la DB, y devuelve objetos C# ya armados.

```csharp
var usuariosActivos = dbContext.Usuarios
    .Where(u => u.Activo)
    .OrderBy(u => u.Nombre)
    .ToList();
```

Por debajo, EF genera algo como:
```sql
SELECT * FROM Usuarios WHERE Activo = 1 ORDER BY Nombre
```

## Por qué se usa

- **Menos código repetitivo**: no hay que escribir SQL ni mapeo manual para cada query
- **Tipado**: errores de nombre de columna/tabla se detectan en compilación (C#), no en runtime (SQL como string)
- **Portable entre motores de DB**: mismo código C#, EF genera el SQL específico según el proveedor (SQL Server, PostgreSQL, SQLite, etc)
- **Migraciones**: EF puede generar y aplicar cambios de esquema de DB a partir de cambios en las clases C#

## Costo/trade-off

El SQL generado no siempre es el más óptimo para queries complejas — para casos así, EF permite caer a SQL crudo cuando hace falta. Para el 90% de los casos (CRUD, queries simples/medianas) es más que suficiente y mucho más productivo.

## Resumen

- ORM = traduce objetos C# ↔ tablas de DB, sin SQL manual
- Entity Framework (EF Core) = el ORM de .NET
- Ventajas: menos código, tipado, migraciones automáticas
- Se puede combinar con SQL crudo cuando una query lo necesita
