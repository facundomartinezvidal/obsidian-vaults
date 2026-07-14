---
tags:
  - algoritmos
  - divide-and-conquer
  - ejercicios
---

# Maximo en Array Bitonico

- Un array **bitonico** es uno que primero crece hasta un pico y luego decrece.
- Objetivo: encontrar el indice del elemento maximo en tiempo mejor que $O(n)$.

> [!important] Idea clave
> En el elemento medio, si el valor de la derecha es mayor → el pico esta a la derecha. Si el valor de la izquierda es mayor → el pico esta a la izquierda. Es busqueda binaria sobre el pico.

```
function findPeak(array, low, high)
    // base case: only one element left, that is the peak
    if low == high
        return low

    mid = (low + high) / 2

    // peak is in the right half
    if array[mid] < array[mid + 1]
        return findPeak(array, mid + 1, high)
    // peak is in the left half (including mid)
    else
        return findPeak(array, low, mid)
```

**Ejemplo:** `[1, 3, 7, 9, 5, 2]`

```
low=0, high=5 → mid=2 → array[2]=7 < array[3]=9 → buscar derecha
low=3, high=5 → mid=4 → array[4]=5 > array[5]=2 → buscar izquierda
low=3, high=4 → mid=3 → array[3]=9 > array[4]=5 → buscar izquierda
low=3, high=3 → caso base → return 3
```

Resultado: indice 3, valor 9. ✓

**Tecnica:** Divide & Conquer — instancia de busqueda binaria.

**Complejidad:** $O(\log n)$

> [!info] Recurrencia
> $T(n) = T(n/2) + c$ → $a=1, b=2, k=0$ → $a = b^k$ → $\Theta(\log n)$
