---
tags:
  - clean-architecture
  - solid
  - ocp
---

# Open/Closed Principle (OCP)

Ver también: [[00-single-responsibility-principle]]

## Enunciado

> Una entidad de software (clase, módulo, función) debe estar **abierta a extensión** pero **cerrada a modificación**.

Se debe poder agregar comportamiento nuevo **sin editar código existente que ya funciona y ya está testeado**.

## Violación — `switch` que crece con cada feature nueva

```csharp
// viola OCP: cada forma de pago nueva obliga a modificar este método
class ProcesadorPago
{
    public void Procesar(string tipo, decimal monto)
    {
        switch (tipo)
        {
            case "tarjeta":
                Console.WriteLine($"Cobrando {monto} por tarjeta");
                break;
            case "efectivo":
                Console.WriteLine($"Cobrando {monto} en efectivo");
                break;
            // agregar "cripto" implica editar este método y volver a testear todo
        }
    }
}
```
Riesgo: cada vez que se agrega un caso, se **modifica código que ya andaba**, con chance de romper algo que ya funcionaba.

## Aplicando OCP — polimorfismo en vez de `switch`

```csharp
interface IFormaDePago
{
    void Procesar(decimal monto);
}

class PagoTarjeta : IFormaDePago
{
    public void Procesar(decimal monto) => Console.WriteLine($"Cobrando {monto} por tarjeta");
}

class PagoEfectivo : IFormaDePago
{
    public void Procesar(decimal monto) => Console.WriteLine($"Cobrando {monto} en efectivo");
}

class ProcesadorPago
{
    public void Procesar(IFormaDePago formaDePago, decimal monto) => formaDePago.Procesar(monto);
}

// agregar cripto: código NUEVO, cero cambios en ProcesadorPago ni en las clases existentes
class PagoCripto : IFormaDePago
{
    public void Procesar(decimal monto) => Console.WriteLine($"Cobrando {monto} en cripto");
}
```
`ProcesadorPago` queda **cerrado a modificación** (no se toca nunca más) pero **abierto a extensión** (se agregan clases nuevas que implementan `IFormaDePago`).

## OCP a nivel arquitectura, no solo clases

Uncle Bob extiende esto más allá del código: en Clean Architecture, agregar un caso de uso nuevo o una fuente de datos nueva no debería requerir tocar las capas internas.

```csharp
// capa interna: cerrada a modificación
interface INotificador { void Notificar(string mensaje); }

class RegistrarPedidoUseCase
{
    private readonly INotificador _notificador;
    public RegistrarPedidoUseCase(INotificador notificador) => _notificador = notificador;

    public void Ejecutar(Pedido p)
    {
        // lógica de negocio...
        _notificador.Notificar("Pedido registrado");
    }
}

// capa externa: abierta a extensión — agregar un canal nuevo no toca el use case
class NotificadorEmail : INotificador
{
    public void Notificar(string mensaje) { /* envía email */ }
}
class NotificadorSms : INotificador  // extensión nueva, sin tocar nada existente
{
    public void Notificar(string mensaje) { /* envía SMS */ }
}
```

## Balance: no todo debe ser "extensible" desde el día uno

Aplicar OCP de forma preventiva a **todo** genera sobre-ingeniería (interfaces y abstracciones para casos que nunca van a variar). La heurística práctica: aplicar OCP en los puntos donde **ya hubo cambios repetidos** o donde el negocio explícitamente anticipa variantes (ej. "vamos a agregar más formas de pago"). YAGNI (You Aren't Gonna Need It) es el contrapeso de OCP.

## Cómo detectar violaciones

- `switch`/`if-else` largos que se repiten en varios lugares del código y crecen con cada feature
- Comentarios tipo `// agregar nuevo caso acá arriba`
- Cada feature nueva implica un PR que toca el mismo archivo "central"

## Relación con Clean Architecture

OCP es lo que permite que las capas externas (frameworks, DB, UI) cambien o se multipliquen (nueva DB, nuevo canal de notificación, nuevo framework web) sin que la lógica de negocio se entere ni se recompile por esa razón.

Ver también: [[02-liskov-substitution-principle]]
