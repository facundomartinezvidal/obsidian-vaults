---
paradigma: divide-y-conquista
ejercicio: 1
complejidad: O(n)
---

# Ejercicio 1 — Secuencia ordenada alfabéticamente

Diseñar un algoritmo que determine si una secuencia de n caracteres está ordenada alfabéticamente.

## a) Estrategia (Divide y Conquista)

- **División:** partir el arreglo en dos mitades, `[lo, mid)` y `[mid, hi)`
- **Caso base:** subarreglo de 0 o 1 elementos → trivialmente ordenado
- **Combinación:** el arreglo completo está ordenado si ambas mitades están ordenadas AND el borde entre ellas respeta el orden (`arr[mid-1] <= arr[mid]`)

## b) Pseudocódigo

> [!note] Estilo previo — pendiente de adaptar a [[convencion-pseudocodigo]]

```
function isOrdered(arr: char[], lo: int, hi: int): boolean
    if hi - lo <= 1
        return true

    mid = (lo + hi) / 2
    leftOk  = isOrdered(arr, lo, mid)
    rightOk = isOrdered(arr, mid, hi)

    return leftOk and rightOk and arr[mid - 1] <= arr[mid]
```

Llamada inicial: `isOrdered(arr, 0, length(arr))`

## c) Complejidad temporal

Recurrencia: T(n) = 2·T(n/2) + O(1)

Por Master Theorem: a=2, b=2, f(n)=O(1) → k=0.

Comparando a=2 contra b^k=2^0=1: a > b^k → cae en el caso T(n) = O(n^(log_b a)) = **O(n^(log_2 2))**.
