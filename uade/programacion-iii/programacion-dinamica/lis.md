---
tags:
  - algoritmos
  - programacion-dinamica
---

# Subsecuencia Creciente mas Larga (LIS)

- Dada una secuencia $X$, encontrar la **subsecuencia mas larga** cuyos elementos esten en orden creciente.

**Tabla:** $D[j]$ = longitud de la LIS que termina en $X[j]$.

**Construccion:**
- Para cada $j$, buscar todos los $k < j$ donde $X[k] \leq X[j]$ y tomar el maximo $D[k] + 1$.
- Si no existe tal $k$, $D[j] = 1$ (el elemento solo).

```
function lis(X)
    n = length(X)
    // D[j] = length of LIS ending at X[j]
    D = new array[n]
    // prev[j] = index of the previous element in the LIS
    prev = new array[n]

    for i = 0 to n - 1
        // minimum: the element alone
        D[i] = 1
        // no predecessor
        prev[i] = -1

    for i = 1 to n - 1
        // check all previous elements
        for j = 0 to i - 1
            // if it is smaller/equal and improves the length
            if X[j] <= X[i] and D[j] + 1 > D[i]
                // extend the LIS
                D[i] = D[j] + 1
                // record where we came from
                prev[i] = j

    // find the index of the maximum in D
    max_idx = 0
    for i = 1 to n - 1
        if D[i] > D[max_idx]
            max_idx = i

    // length of the LIS
    return D[max_idx]
```

> [!example] Ejemplo: X = [0, 4, 12, 2, 10, 6, 9, 13, 3, 11, 7, 15]
>
> | j | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
> | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> | X | 0 | 4 | 12 | 2 | 10 | 6 | 9 | 13 | 3 | 11 | 7 | 15 |
> | D | 1 | 2 | 3 | 2 | 3 | 3 | 4 | 5 | 3 | 5 | 4 | 6 |
>
> Resultado: LIS de longitud 6 → (0, 2, 6, 9, 11, 15).

**Complejidad temporal:** $\Theta(n^2)$
**Complejidad espacial:** $O(n)$
