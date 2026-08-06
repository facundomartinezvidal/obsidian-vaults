---
tags:
  - csharp
  - entity-framework
---

# Migraciones — migración inicial

Ver también: [[01-creacion-de-modelos]], [[02-creacion-de-contexto]]

## Qué es una migración

Forma en que EF Core **versiona el esquema de la DB** a partir de los modelos C#. Cada migración es un archivo generado que contiene el código para pasar la DB de un estado al siguiente (crear tablas, agregar columnas, etc) — y también el "camino de vuelta" (rollback).

En vez de escribir SQL de creación de tablas a mano, EF lo genera comparando los modelos actuales contra el estado de la última migración aplicada.

## Requisito: herramientas de EF CLI

```bash
dotnet tool install --global dotnet-ef
```

Verificar instalación:
```bash
dotnet ef --version
```

## Crear la migración inicial

Con los modelos y el `DbContext` ya definidos (ver [[01-creacion-de-modelos]], [[02-creacion-de-contexto]]):

```bash
dotnet ef migrations add InicialCreate
```

- `InicialCreate` — nombre de la migración, descriptivo de lo que hace (convención: PascalCase)
- Genera una carpeta `Migrations/` con:
  - `<timestamp>_InicialCreate.cs` — contiene `Up()` (aplicar cambios) y `Down()` (revertir)
  - `<Contexto>ModelSnapshot.cs` — foto del estado actual del modelo, para comparar en la próxima migración

```csharp
public partial class InicialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Usuarios",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Nombre = table.Column<string>(nullable: false),
                Email = table.Column<string>(nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_Usuarios", x => x.Id));
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "Usuarios");
    }
}
```

## Aplicar la migración a la DB

```bash
dotnet ef database update
```

Ejecuta el `Up()` de todas las migraciones pendientes contra la DB configurada (connection string en `appsettings.json`) — crea la DB si no existe, crea las tablas.

## Flujo completo

1. Definir/modificar modelos (clases C#)
2. `dotnet ef migrations add NombreDescriptivo` — genera el código de la migración
3. `dotnet ef database update` — aplica los cambios a la DB real

## Resumen

- Migración = versión del esquema de DB, generada a partir de los modelos C#
- `dotnet ef migrations add <Nombre>` — crea la migración (no toca la DB todavía)
- `dotnet ef database update` — aplica las migraciones pendientes a la DB
- Requiere `dotnet-ef` instalado globalmente
