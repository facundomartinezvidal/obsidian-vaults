---
tags:
  - algoritmos
  - ordenamiento
  - divide-and-conquer
---

# Quick Sort

- Elige el **primer elemento** como pivot.
- Particiona el array: los menores o iguales al pivot van a la izquierda, los mayores a la derecha.
- El pivot queda en su posicion definitiva.
- Se repite recursivamente para cada mitad.

```
function quickSort(array, low, high)
    if low < high
        p = pivot(array, low, high)

        // --- DIVIDE ---
        quickSort(array, low, p - 1)
        quickSort(array, p + 1, high)

function pivot(array, low, high)
    p = array[low]
    k = low + 1
    l = high

    // advance k rightward while elements are less than or equal to the pivot
    while array[k] <= p and k < high
        k = k + 1

    // advance l leftward while elements are greater than the pivot
    while array[l] > p
        l = l - 1

    while k < l
        swap(array, k, l)

        // keep advancing k rightward
        while array[k] <= p
            k = k + 1

        // keep advancing l leftward
        while array[l] > p
            l = l - 1

    // place the pivot in its correct position
    swap(array, low, l)

    return l
```

> [!important] Pivot
> El pivot es el primer elemento (`array[low]`). Al final del partition, se intercambia con `array[l]` quedando en su posicion definitiva — todo lo que queda a su izquierda es menor o igual, y a su derecha es mayor.

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| Mejor caso | $O(n \log n)$ — el pivot divide en mitades iguales |
| Peor caso | $O(n^2)$ — el pivot es siempre el menor o mayor elemento |
| Caso promedio | $O(n \log n)$ |

> [!info] Complejidad espacial
> $O(\log n)$ — por la pila de llamadas recursivas (no usa arrays temporales como Merge Sort).

## Diagrama

![[diagrams/quick-sort-diagrama.excalidraw]]
