---
tags:
  - csharp
  - controladores
  - aspnet
---

# ASP .NET Core Web API — crear proyecto backend

Ver también: [[01-http|http]]

## Qué es

Framework de Microsoft para crear APIs backend (HTTP) en .NET. Plantilla de proyecto (`Web API`) que ya trae armado: servidor HTTP, ruteo, controladores, serialización JSON automática — listo para exponer endpoints.

## Crear proyecto

Vía CLI (`dotnet new`) o Visual Studio, template `webapi`:

```bash
dotnet new webapi -n MiApi
cd MiApi
dotnet run
```

Genera estructura base: `Program.cs` (punto de entrada, configuración), carpeta `Controllers/`, `appsettings.json` (config), soporte Swagger/OpenAPI para probar endpoints.

## Resumen

- ASP .NET Core Web API = template para backend HTTP en C#
- `dotnet new webapi` crea proyecto base
- Punto de entrada: `Program.cs`
- Endpoints se definen en controladores — carpeta `Controllers/`
