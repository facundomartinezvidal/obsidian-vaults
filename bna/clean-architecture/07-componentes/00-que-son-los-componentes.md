---
tags:
  - clean-architecture
  - componentes
---

# Qué son los componentes

Ver también: [[00-que-es-clean-architecture]]

## Definición

Un componente es la **unidad de despliegue** más chica de un sistema: un archivo binario que se puede desplegar, versionar y combinar con otros componentes de forma independiente.

En .NET, un componente es una **DLL** (o un paquete NuGet). En Java es un `.jar`, en Ruby una `gem`, en JS un paquete npm. El concepto es el mismo en todos los ecosistemas: código compilado/empaquetado que se puede tratar como una unidad.

```
MiApp.Domain.dll        ← componente: entidades y reglas de negocio
MiApp.Application.dll   ← componente: casos de uso
MiApp.Infrastructure.dll← componente: EF Core, acceso a datos
MiApp.Api.dll           ← componente: controllers, arranque de la app
```

## Un poco de historia — por qué existen

Antes de los componentes, los programas eran un solo bloque: se escribía código, se compilaba todo junto, se linkeaba todo junto. Cualquier cambio, por chico que fuera, obligaba a **recompilar y relinkear el programa entero** — proceso lento a medida que los sistemas crecían.

Los componentes surgen para resolver eso: separar el sistema en unidades que se compilan una sola vez y se pueden **cargar/combinar dinámicamente**, sin recompilar todo cada vez que cambia una parte. En .NET esto se ve en cómo un `.csproj` compila a su propia DLL, y otros proyectos la referencian sin necesitar su código fuente.

## Para qué sirven

| Beneficio | En qué se nota |
|---|---|
| **Despliegue independiente** | se puede actualizar `MiApp.Infrastructure.dll` (ej. cambiar el driver de DB) sin recompilar `MiApp.Domain.dll` |
| **Desarrollo independiente** | distintos equipos trabajan en distintos componentes en paralelo, sin pisarse el código fuente |
| **Reutilización** | un componente bien separado (ej. una librería de validaciones) se reusa en otros proyectos |
| **Encapsulamiento de detalles** | un componente expone una API pública y esconde su implementación interna |
| **Sustitución** | un componente se puede reemplazar por otro que cumpla el mismo contrato (ej. cambiar el componente de persistencia) |

## Ejemplo concreto en un proyecto .NET con Clean Architecture

Una solución típica organizada en componentes (proyectos), cada uno compilando a su propia DLL:

```
Solucion.sln
├── MiApp.Domain/          → MiApp.Domain.dll (Entities)
├── MiApp.Application/     → MiApp.Application.dll (Use Cases, interfaces)
├── MiApp.Infrastructure/  → MiApp.Infrastructure.dll (EF Core, repos concretos)
└── MiApp.Api/             → MiApp.Api.dll (controllers, Program.cs)
```

Referencias entre proyectos (quién puede referenciar a quién) — nótese que sigue la regla de dependencia de Clean Architecture:
```xml
<!-- MiApp.Application.csproj -->
<ItemGroup>
  <ProjectReference Include="..\MiApp.Domain\MiApp.Domain.csproj" />
</ItemGroup>

<!-- MiApp.Infrastructure.csproj -->
<ItemGroup>
  <ProjectReference Include="..\MiApp.Application\MiApp.Application.csproj" />
</ItemGroup>

<!-- MiApp.Api.csproj -->
<ItemGroup>
  <ProjectReference Include="..\MiApp.Application\MiApp.Application.csproj" />
  <ProjectReference Include="..\MiApp.Infrastructure\MiApp.Infrastructure.csproj" />
</ItemGroup>
```
`MiApp.Domain` no referencia a nadie. `MiApp.Infrastructure` referencia a `MiApp.Application` (no al revés) — así el componente de infraestructura depende de las abstracciones de negocio, nunca la lógica de negocio depende del detalle técnico.

## Ejemplo cotidiano: paquetes NuGet como componentes de terceros

```xml
<PackageReference Include="FluentValidation" Version="11.9.0" />
<PackageReference Include="AutoMapper" Version="13.0.1" />
```
Cada paquete NuGet es un componente compilado por otro equipo, versionado de forma independiente, que se integra sin necesitar su código fuente — mismo concepto que los componentes propios del proyecto, aplicado a librerías externas.

## Relación con Clean Architecture

Las capas concéntricas de Clean Architecture (Entities, Use Cases, Interface Adapters, Frameworks & Drivers) no son solo una idea lógica — en un proyecto real **se materializan como componentes separados** (proyectos/DLLs), y la regla de dependencia se aplica literalmente mediante qué componente referencia a cuál. Cómo diseñar bien esos límites entre componentes es el tema de los principios de cohesión y acoplamiento de componentes (próximas clases de esta sección).


