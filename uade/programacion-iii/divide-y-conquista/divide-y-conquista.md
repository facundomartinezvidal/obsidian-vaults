---
tags:
  - algoritmos
  - divide-and-conquer
---

# Divide y Conquista

Es una tecnica que consiste en dividir un problema "grande" en problemas "pequeños" de resolucion mas simple, y luego combinar las soluciones de los problemas pequenos para obtener la solucion del problema grande.

Es **recursiva**: los subproblemas se subdividen a su vez hasta llegar a un problema minimo de resolucion trivial (el **caso base**).

## Los 3 pasos

1. **Dividir** — descomponer el problema en subproblemas mas pequenos.
2. **Conquistar** — resolver cada subproblema recursivamente (hasta llegar al caso base).
3. **Combinar** — juntar las soluciones de los subproblemas en una solucion del problema original.

## Template generico Divide & Conquer

```
function DyC(x)
    if casoBase(x)                              // es lo suficientemente pequeño?
        return solucionDirecta(x)               // resolver trivialmente
    else
        x1, x2, ..., xn = descomponer(x)        // dividir en subproblemas
        for i = 0 to n
            yi = DyC(xi)                         // resolver cada subproblema
        return combinar(y1, y2, ..., yn)         // juntar las soluciones
```

## Template generico Subtract & Conquer

```
function SyC(x)
    if casoBase(x)                              // es lo suficientemente pequeño?
        return solucionDirecta(x)               // resolver trivialmente
    else
        x' = reducir(x)                          // achicar el problema (n-1, n-2, ...)
        y = SyC(x')                              // una sola llamada recursiva
        return combinar(x, y)                    // combinar con la parte extraida
```

## Divide & Conquer vs Subtract & Conquer

Son dos variantes de la misma idea recursiva, se diferencian en como achican el problema:

| | Divide & Conquer | Subtract & Conquer |
| ---- | ----------- | ----------- |
| **Subproblemas** | Divide en **varios** subproblemas | Reduce a **uno solo** mas chico |
| **Tamanio** | Cada subproblema es una **fraccion** ($n/2$, $n/3$...) | Se reduce en una **constante** ($n-1$, $n-2$...) |
| **Recurrencia** | $T(n) = aT(n/b) + P(n^k)$ | $T(n) = aT(n-b) + P(n^k)$ |
| **Ejemplos** | [[merge-sort\|Merge Sort]], [[quick-sort\|Quick Sort]], [[busqueda-binaria\|Binary Search]], [[elemento-mayoritario\|Elemento Mayoritario]], [[strassen\|Strassen]] | [[palindromos\|Palindromos]], [[fibonacci-recursivo\|Fibonacci]], [[torres-de-hanoi\|Torres de Hanoi]] |

## Recurrencias

Para analizar la complejidad de un algoritmo D&C o S&C se plantea una **recurrencia**.

**Por division** (D&C): $T(n) = aT(n/b) + P(n^k)$

| Condicion | Resultado |
| ---- | ----------- |
| $a < b^k$ | $\Theta(n^k)$ |
| $a = b^k$ | $\Theta(n^k \log n)$ |
| $a > b^k$ | $\Theta(n^{\log_b a})$ |

**Por sustraccion** (S&C): $T(n) = aT(n-b) + P(n^k)$

| Condicion | Resultado |
| ---- | ----------- |
| $a < 1$ | $\Theta(n^k)$ |
| $a = 1$ | $\Theta(n^{k+1})$ |
| $a > 1$ | $\Theta(a^{n/b})$ |

Donde:
- $a$ = cantidad de llamadas recursivas
- $b$ = factor de division/sustraccion del problema
- $k$ = exponente del costo de dividir/combinar

> [!example] Ejemplos de recurrencias
> - **Merge Sort**: $T(n) = 2T(n/2) + n$ → $a=2, b=2, k=1$ → $a = b^k$ → $\Theta(n \log n)$
> - **Binary Search**: $T(n) = 1T(n/2) + c$ → $a=1, b=2, k=0$ → $a = b^k$ → $\Theta(\log n)$
> - **Torres de Hanoi**: $T(n) = 2T(n-1) + c$ → $a=2, b=1, k=0$ → $a > 1$ → $\Theta(2^n)$
