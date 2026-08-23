---
tags:
  - clean-architecture
  - componentes
  - cohesion
---

# Common Reuse Principle (CRP)

Ver también: [[02-common-closure-principle]]

Tercer principio de **cohesión de componentes**. Es la versión de Interface Segregation (ver [[../06-principios-solid/03-interface-segregation-principle]]) aplicada a componentes.

## Enunciado

> No forzar a los usuarios de un componente a depender de cosas que no necesitan. Las clases que no se usan juntas no deberían estar en el mismo componente.

## El problema: componentes "todo en uno"

```csharp
// MiApp.Utilidades.dll — un componente gigante con de todo un poco
namespace MiApp.Utilidades;

class ValidadorEmail { }
class ConversorMonedas { }       // depende de una API externa de cotizaciones
class GeneradorPdf { }            // depende de una librería pesada de PDF
class ClienteEmail { }
class Logger { }
```
Un proyecto que solo necesita `ValidadorEmail` termina arrastrando la dependencia a la librería de PDF y al cliente de cotizaciones — aunque nunca los use. Consecuencias:

- **Peso innecesario**: se descarga/despliega código que no se usa
- **Recompilaciones innecesarias**: si `GeneradorPdf` cambia de versión de librería, todo consumidor de `MiApp.Utilidades` se ve afectado, aunque solo use `ValidadorEmail`
- **Acoplamiento a dependencias transitivas ajenas**: un cambio en la librería de PDF puede romper builds de proyectos que ni sabían que existía

## Aplicando CRP — separar por "qué se usa junto"

```csharp
// MiApp.Validaciones.dll
class ValidadorEmail { }

// MiApp.Finanzas.dll
class ConversorMonedas { }

// MiApp.Documentos.dll
class GeneradorPdf { }

// MiApp.Notificaciones.dll
class ClienteEmail { }

// MiApp.Logging.dll
class Logger { }
```
Ahora un proyecto que solo valida emails referencia únicamente `MiApp.Validaciones.dll` — cero dependencia transitiva a librerías de PDF o cotizaciones.

```xml
<!-- consumidor que solo necesita validar emails -->
<ItemGroup>
  <ProjectReference Include="..\MiApp.Validaciones\MiApp.Validaciones.csproj" />
  <!-- no referencia Documentos, Finanzas ni Notificaciones -->
</ItemGroup>
```

## CRP y las interfaces dentro de un componente

CRP también aplica adentro de un componente cuando se piensa qué clases exponer juntas en una misma interfaz pública:

```csharp
// mal: interfaz gorda dentro del componente, fuerza a implementar/depender de todo
interface IServicioUsuario
{
    void CrearUsuario(Usuario u);
    void EnviarBienvenida(Usuario u);   // depende de infraestructura de email
    void GenerarReportePdf(Usuario u);  // depende de librería de PDF
}
```
```csharp
// bien: separado según quién realmente lo necesita
interface ICreadorUsuario { void CrearUsuario(Usuario u); }
interface INotificadorBienvenida { void EnviarBienvenida(Usuario u); }
interface IGeneradorReporteUsuario { void GenerarReportePdf(Usuario u); }
```

## La tensión con REP y CCP — el triángulo de cohesión

Los tres principios de cohesión tiran en direcciones distintas:

| Principio | Prioriza | Riesgo si se aplica solo | Riesgo si se ignora |
|---|---|---|---|
| REP | reusabilidad, versionado | componentes muy chicos, overhead de versionar de más | copiar/pegar código sin control de versión |
| CCP | facilidad de mantenimiento | componentes muy acoplados a una sola app | un cambio de negocio toca N componentes |
| CRP | minimizar dependencias innecesarias | componentes tan fragmentados que son difíciles de manejar | consumidores arrastran dependencias que no usan |

No hay una combinación "correcta" fija — el balance depende de la etapa del proyecto. Al inicio suele pesar más CCP (velocidad de desarrollo); con el tiempo, partes estables migran hacia REP/CRP (se separan para reuso limpio).

## Relación con Clean Architecture

CRP es la razón por la que conviene separar, por ejemplo, el componente de **acceso a datos** (`MiApp.Infrastructure.Persistence`) del componente de **notificaciones** (`MiApp.Infrastructure.Notifications`) en vez de un único `MiApp.Infrastructure` gigante — un caso de uso que solo necesita persistencia no debería arrastrar la dependencia a un proveedor de SMS.

Ver también: [[04-acyclic-dependencies-principle]]
