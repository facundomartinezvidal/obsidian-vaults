---
tags:
  - algoritmos
  - divide-and-conquer
  - ejercicios
---

# Maximo y Minimo en Vector Rotado

- Un **vector rotado** es un array ordenado creciente al que se le desplazo $k$ posiciones: el elemento en la posicion $i$ pasa a la posicion $(i + k) \mod n$.
- Objetivo: encontrar el maximo y el minimo en tiempo mejor que $O(n)$.

**Ejemplo:**

```
Original:   [1, 2, 5, 10, 15, 16, 17, 19, 20, 25]
k = 3:     [19, 20, 25,  1,  2,  5, 10, 15, 16, 17]
```

> [!important] Idea clave
> Hay exactamente un "punto de quiebre" donde $V[p] > V[p+1]$. El maximo esta en $p$ y el minimo esta en $p+1$. Se puede encontrar $p$ con busqueda binaria porque en cada mitad, al menos una esta completamente ordenada — eso permite descartar la mitad incorrecta.

```
function findMaxIndex(array, low, high)
    // base case: only one element
    if low == high
        return low

    mid = (low + high) / 2

    // mid is the rotation point
    if array[mid] > array[mid + 1]
        return mid

    // mid is in the left (larger) sorted part → rotation point is to the right
    if array[mid] >= array[low]
        return findMaxIndex(array, mid + 1, high)
    // mid is in the right (smaller) sorted part → rotation point is to the left
    else
        return findMaxIndex(array, low, mid - 1)

function findMaxMin(array)
    n = length(array)
    max_idx = findMaxIndex(array, 0, n - 1)
    // minimum is right after the rotation point (wraps around if k = 0)
    min_idx = (max_idx + 1) mod n
    return (array[max_idx], array[min_idx])
```

**Ejemplo:** `[19, 20, 25, 1, 2, 5, 10, 15, 16, 17]`

```
findMaxIndex(0, 9) → mid=4 → array[4]=2 < array[5]=5  → no es punto de quiebre
                           → array[4]=2 < array[0]=19  → mid en parte derecha → buscar izquierda
findMaxIndex(0, 3) → mid=1 → array[1]=20 < array[2]=25 → no es punto de quiebre
                           → array[1]=20 >= array[0]=19 → mid en parte izquierda → buscar derecha
findMaxIndex(2, 3) → mid=2 → array[2]=25 > array[3]=1  → PUNTO DE QUIEBRE → return 2
```

Resultado: max en indice 2 (valor 25), min en indice 3 (valor 1). ✓

**Tecnica:** Divide & Conquer — instancia de busqueda binaria.

**Complejidad:** $O(\log n)$

> [!info] Recurrencia
> $T(n) = T(n/2) + c$ → $a=1, b=2, k=0$ → $a = b^k$ → $\Theta(\log n)$
