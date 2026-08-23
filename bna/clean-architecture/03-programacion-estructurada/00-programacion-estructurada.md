---
tags:
  - clean-architecture
  - paradigmas
  - programacion-estructurada
---

# Programación estructurada

Ver también: [[00-que-son-los-paradigmas-de-programacion]]

## Origen: el problema del `goto`

Antes de la programación estructurada, el flujo de control se manejaba con `goto`, saltando libremente entre líneas de código. Esto hacía casi imposible **razonar** sobre el programa: cualquier punto podía saltar a cualquier otro.

Edsger Dijkstra (carta "Goto Statement Considered Harmful", 1968) demostró que los módulos de programación recursivos que se pueden probar (en sentido matemático) que son correctos, se pueden construir usando **solo tres estructuras de control**:

1. **Secuencia** — instrucciones ejecutadas una tras otra
2. **Selección** — `if`/`else`, `switch`
3. **Iteración** — `while`, `for`, `do-while`

Cualquier `goto` puede reemplazarse por una combinación de estas tres. Esto es lo que hoy se conoce como el **teorema de la programación estructurada**.

## Por qué importa: descomponibilidad demostrable

Dijkstra notó un paralelo con las matemáticas: los teoremas se prueban descomponiéndolos en subteoremas más pequeños, ya probados. La programación estructurada permite lo mismo con el código: **descomponer un módulo grande en unidades más pequeñas y demostrables**, y esas unidades a su vez en otras más chicas, hasta llegar a bloques triviales de secuencia/selección/iteración.

Sin `goto` arbitrario, cada bloque tiene **un punto de entrada y un punto de salida** — se puede razonar sobre él de forma aislada, como una caja.

## Ciencia vs. matemática: por qué no se puede "probar" un programa

Dijkstra también señaló algo más sutil: un programa no es un teorema matemático. Las matemáticas prueban afirmaciones **verdaderas** a partir de axiomas. Pero un programa es correcto (o no) respecto a un problema **enunciado**, no a un axioma universal.

Por eso la programación estructurada se parece más al **método científico**: una teoría científica nunca se prueba verdadera, solo se la puede refutar (falsar). Mientras nadie encuentra un caso que la contradiga, se la considera válida.

De la misma forma:
- **el testing no prueba que un programa es correcto** — solo puede demostrar la **presencia** de errores, nunca su ausencia
- un programa "funciona" mientras nadie encuentre un test que lo refute

Esto conecta directo con por qué la programación estructurada es valiosa: al descomponer el programa en unidades pequeñas y con puntos de entrada/salida únicos, se puede **testear cada unidad de forma aislada** e intentar refutarla — igual que un experimento científico.

## El teorema de la programación estructurada — detalle

Formulado por Böhm y Jacopini (1966), demuestra que **cualquier programa con `goto`** puede reescribirse usando solo secuencia, selección e iteración, sin perder capacidad expresiva. Dijkstra tomó esta base y argumentó por qué **conviene** hacerlo, no solo que **se puede**.

Ejemplo de transformación — con `goto`:
```csharp
int i = 0;
inicio:
    if (i >= 10) goto fin;
    Console.WriteLine(i);
    i++;
    goto inicio;
fin:
```
Equivalente estructurado (misma semántica, un solo punto de entrada y salida del bucle):
```csharp
for (int i = 0; i < 10; i++)
{
    Console.WriteLine(i);
}
```
El segundo es más fácil de leer porque el `for` **garantiza** dónde entra y dónde sale el flujo — no hay que rastrear saltos arbitrarios.

## Por qué el `goto` es peligroso — el problema real

No es "malo" en sí, es que **rompe la descomponibilidad**. Un bloque de código con `goto` puede saltar a cualquier línea, así que ya no se lo puede analizar como una caja con una entrada y una salida — para entenderlo hay que tener en la cabeza el programa entero.

```csharp
// difícil de razonar: el flujo salta hacia adelante y hacia atrás
void ProcesarPedido(Pedido p)
{
    if (p == null) goto error;
    if (!p.EsValido) goto error;
    // ... lógica ...
    goto fin;
error:
    Log("pedido inválido");
fin:
    return;
}
```
Equivalentes estructurados, sin `goto`, con un único punto de salida (o salidas tempranas controladas, ver más abajo):
```csharp
void ProcesarPedido(Pedido p)
{
    if (p == null || !p.EsValido)
    {
        Log("pedido inválido");
        return;
    }
    // ... lógica ...
}
```

## Single entry / single exit

Regla clásica de la programación estructurada: cada bloque (función, loop, bloque `if`) debería tener **un solo punto de entrada y un solo punto de salida**.

- **Entrada única**: no se puede "saltar" a la mitad de una función (imposible en C# de todas formas, salvo con `goto` local)
- **Salida única**: idealmente una función tiene un solo `return` al final

En la práctica moderna esta regla se relaja para **retornos tempranos (guard clauses)**, que mejoran la legibilidad sin reintroducir el caos del `goto`, porque cada salida temprana sigue siendo local y predecible:
```csharp
decimal CalcularDescuento(Cliente c, decimal monto)
{
    if (c == null) return 0;              // salida temprana: guard clause
    if (!c.EsVip) return 0;               // salida temprana: guard clause
    if (monto <= 0) return 0;             // salida temprana: guard clause

    return monto * 0.10m;                  // único punto de salida "de negocio"
}
```
Esto sigue siendo estructurado: cada `return` es un punto de salida **local y visible en la misma función**, no un salto arbitrario a otro lugar del programa como haría un `goto`.

## Descomposición funcional — ejemplo completo

La programación estructurada habilita el **top-down decomposition**: dividir un problema grande en funciones más chicas, cada una testeable por separado.

```csharp
// función grande, difícil de testear como unidad
decimal ProcesarFactura(Factura f)
{
    decimal subtotal = 0;
    foreach (var item in f.Items)
        subtotal += item.Precio * item.Cantidad;

    decimal descuento = f.Cliente.EsVip ? subtotal * 0.1m : 0;
    decimal impuesto = (subtotal - descuento) * 0.21m;

    return subtotal - descuento + impuesto;
}

// descompuesta: cada pieza se prueba de forma aislada
decimal CalcularSubtotal(Factura f) =>
    f.Items.Sum(i => i.Precio * i.Cantidad);

decimal CalcularDescuento(Factura f, decimal subtotal) =>
    f.Cliente.EsVip ? subtotal * 0.1m : 0;

decimal CalcularImpuesto(decimal baseImponible) =>
    baseImponible * 0.21m;

decimal ProcesarFactura(Factura f)
{
    var subtotal = CalcularSubtotal(f);
    var descuento = CalcularDescuento(f, subtotal);
    var impuesto = CalcularImpuesto(subtotal - descuento);
    return subtotal - descuento + impuesto;
}
```
Cada función chica (`CalcularSubtotal`, `CalcularDescuento`, `CalcularImpuesto`) es una unidad **testeable de forma aislada** — exactamente la idea de descomposición demostrable de Dijkstra.

## Testing como refutación — ejemplo

```csharp
[Fact]
public void CalcularDescuento_ClienteVip_Aplica10Porciento()
{
    var factura = new Factura { Cliente = new Cliente { EsVip = true } };
    var resultado = CalcularDescuento(factura, 1000m);
    Assert.Equal(100m, resultado);
}
```
Este test no **prueba** que `CalcularDescuento` es correcta en general — solo demuestra que, para este caso puntual, no fue refutada. Cuantos más casos (límite, negativos, nulos) se agreguen sin encontrar fallas, más confianza se gana — nunca certeza matemática.

## Consecuencia práctica

- Evitar `goto` (o equivalentes: `break`/`continue`/`return` múltiples en medio de funciones largas, excepciones usadas como control de flujo) mantiene el código **descomponible y testeable**
- Funciones chicas, con un punto de entrada y (idealmente) un punto de salida, son más fáciles de probar y de razonar
- Es la base que permite que, más adelante, se puedan construir módulos y componentes más grandes con la confianza de que las partes que los componen fueron verificadas (refutadas y no refutadas) mediante tests

## Relación con Clean Architecture

La programación estructurada es la disciplina que actúa **dentro de cada función/módulo**. No dicta cómo se organizan las dependencias entre módulos (eso lo resuelve OO), pero sí garantiza que cada bloque de lógica de negocio, por chico que sea, sea **testeable y razonable de forma aislada** — requisito para que las capas internas de Clean Architecture (Entities, Use Cases) puedan probarse sin depender de frameworks ni de la UI.
