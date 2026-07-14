---
tags:
  - algoritmos
  - divide-and-conquer
---

# Elemento Mayoritario

- Dado un vector de $n$ enteros, un elemento es **mayoritario** si aparece mas de $n/2$ veces.
- No puede haber mas de un elemento mayoritario.
- El algoritmo tiene dos partes: **buscarCandidato** (encuentra un posible candidato) y **elementoMayoritario** (verifica si realmente es mayoritario).

> [!important] Idea clave
> Si un elemento es mayoritario y agrupamos el array en pares consecutivos, ese elemento tiene que aparecer repetido en al menos un par. Entonces:
> 1. Recorrer pares consecutivos y quedarse con los que coinciden.
> 2. Escribir esos elementos al comienzo del mismo array (in-place), reduciendo el rango a la mitad.
> 3. Repetir recursivamente hasta obtener un candidato.
> 4. Verificar el candidato contando sus apariciones en el array original.

```
function findCandidate(array, low, high)
    // no elements
    if high < low
        return null
    // base case: a single element is the candidate
    if low == high
        return array[low]

    // in-place write pointer
    j = low

    // --- DIVIDE: group into pairs and write matching ones at the start ---
    if isEven(high - low + 1)
        for i = low + 1 to high step 2
            if array[i - 1] == array[i]
                array[j] = array[i]
                j = j + 1

        // --- CONQUER ---
        return findCandidate(array, low, j - 1)
    else
        for i = low + 1 to high - 1 step 2
            if array[i - 1] == array[i]
                array[j] = array[i]
                j = j + 1

        // --- CONQUER ---
        candidate = findCandidate(array, low, j - 1)
        if candidate != null
            return candidate
        // the last element had no pair and could be the majority element
        return array[high]

function majorityElement(array)
    // --- STEP 1: find a candidate ---
    candidate = findCandidate(array, 0, length(array) - 1)
    if candidate == null
        return "Does not exist"

    // --- STEP 2: verify it actually appears more than n/2 times ---
    count = 0
    for i = 0 to length(array) - 1
        if array[i] == candidate
            count = count + 1

    if count > length(array) / 2
        // confirmed: it is the majority element
        return candidate
    // the candidate was not the majority element
    return "Does not exist"
```

**Ejemplo:** con `[1, 1, 3, 3, 1, 3, 1, 4, 1, 1]`

```
Pares: (1,1) (3,3) (1,3) (1,4) (1,1)
Coinciden: (1,1) y (3,3) → array queda [1, 3, 1, ...]  (low=0, high=2)

Pares: (1,3) → no coincide
Array impar → candidato = array[2] = 1

Verificacion: 1 aparece 6 veces en 10 elementos → 6 > 5 → es mayoritario
```

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| buscarCandidato | $O(n)$ |
| verificacion | $O(n)$ |
| **Total** | $O(n)$ |

> [!info] Complejidad espacial
> $O(1)$ extra — el algoritmo modifica el array in-place, sin crear arrays auxiliares.
