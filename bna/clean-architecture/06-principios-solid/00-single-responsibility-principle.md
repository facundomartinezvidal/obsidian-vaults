---
tags:
  - clean-architecture
  - solid
  - srp
---

# Single Responsibility Principle (SRP)

Ver también: [[00-programacion-orientada-a-objetos]]

## Enunciado

> Un módulo debe tener una, y solo una, razón para cambiar.

**Ojo con la interpretación común**: no es "una clase debe hacer una sola cosa" en sentido literal de funcionalidad — es "una clase debe responder ante un solo actor/stakeholder". La razón de cambio viene de **quién pide el cambio**, no de cuántas funciones tiene la clase.

Uncle Bob lo reformula como: **junta el código que cambia por la misma razón, separa el código que cambia por razones distintas**.

## El problema que resuelve: actores mezclados

Ejemplo clásico — una clase `Empleado` con tres métodos, cada uno pedido por un área distinta de la empresa:

```csharp
class Empleado
{
    // pedido por RRHH: cómo se calculan las horas regulares
    public decimal CalcularHorasRegulares() { /* ... */ return 0; }

    // pedido por Contaduría: cómo se reporta el sueldo en el balance
    public string ReportarParaContaduria() { /* ... */ return ""; }

    // pedido por el equipo de DB: cómo se persiste el empleado
    public void GuardarEnBaseDeDatos() { /* ... */ }
}
```
Tres actores (RRHH, Contaduría, DBA) dependen de la misma clase. Si Contaduría pide cambiar el formato del reporte, hay riesgo de romper algo que usa `CalcularHorasRegulares` — aunque nadie tocó esa lógica, **compartir la clase acopla cambios que no deberían estar relacionados**.

## Violación en la práctica — ejemplo con capas mezcladas

```csharp
// viola SRP: lógica de negocio + acceso a datos + presentación en una sola clase
class ReporteVentas
{
    public decimal CalcularTotal(List<Venta> ventas) =>
        ventas.Sum(v => v.Monto);

    public void GuardarEnDb(List<Venta> ventas)
    {
        // conexión SQL directa acá
    }

    public string GenerarHtml(List<Venta> ventas)
    {
        // armado de HTML acá
        return "<table>...</table>";
    }
}
```
Cambia el motor de DB → hay que tocar `ReporteVentas`. Cambia el diseño del reporte → hay que tocar `ReporteVentas`. Cambia la fórmula del total → hay que tocar `ReporteVentas`. Tres razones de cambio distintas, una sola clase.

## Aplicando SRP

```csharp
// cada clase responde a un solo actor / una sola razón de cambio
class CalculadoraVentas
{
    public decimal CalcularTotal(List<Venta> ventas) => ventas.Sum(v => v.Monto);
}

class VentasRepository
{
    public void Guardar(List<Venta> ventas) { /* acceso a datos */ }
}

class ReporteVentasHtmlPresenter
{
    public string Generar(List<Venta> ventas, decimal total) =>
        $"<table><tr><td>Total</td><td>{total}</td></tr></table>";
}
```
Ahora un cambio en el formato HTML no toca la lógica de cálculo ni el acceso a datos.

## Cómo detectar violaciones

- La clase tiene métodos que **nadie usa juntos** desde el mismo lugar
- Al describir la clase hace falta la palabra "y" ("calcula el total **y** lo guarda **y** lo formatea")
- Distintos tickets/features de distintas áreas terminan tocando el mismo archivo
- Tests de la clase mezclan mocks de cosas no relacionadas (DB + formato + cálculo en el mismo test)

## Relación con Clean Architecture

SRP es la base de la separación en capas: **Entities** cambian por reglas de negocio de la empresa, **Use Cases** cambian por reglas de la aplicación, **Interface Adapters** cambian por formato/presentación, **Frameworks & Drivers** cambian por decisiones técnicas (DB, framework). Cada capa = un actor, una razón de cambio.

Ver también: [[01-open-closed-principle]]
