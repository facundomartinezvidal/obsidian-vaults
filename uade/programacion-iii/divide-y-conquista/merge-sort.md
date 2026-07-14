---
tags:
  - algoritmos
  - ordenamiento
  - divide-and-conquer
---

# Merge Sort

- Sigue el enfoque de **[[divide-y-conquista|Divide and Conquer]]**.
- Divide el array en dos mitades usando indices `low` y `high`.
- Ordena cada mitad recursivamente.
- Luego las mezcla (merge) en orden usando dos arrays temporales.

```
function mergeSort(array, low, high)
    // base case: a single element is already sorted
    if low < high
        mid = (low + high) / 2

        // --- DIVIDE ---
        mergeSort(array, low, mid)
        mergeSort(array, mid + 1, high)

        // --- COMBINE ---
        merge(array, low, mid, high)

function merge(array, low, mid, high)
    // copy each half into its own temporary array
    left = array[low..mid]
    right = array[mid + 1..high]

    i = 0
    j = 0
    k = low

    // while there are elements on both sides, place the smaller one
    while i < length(left) and j < length(right)
        if left[i] <= right[j]
            array[k] = left[i]
            i = i + 1
        else
            array[k] = right[j]
            j = j + 1
        k = k + 1

    // flush remaining elements from the left side
    while i < length(left)
        array[k] = left[i]
        i = i + 1
        k = k + 1

    // flush remaining elements from the right side
    while j < length(right)
        array[k] = right[j]
        j = j + 1
        k = k + 1
```

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| Mejor caso | $O(n \log n)$ |
| Peor caso | $O(n \log n)$ |
| Caso promedio | $O(n \log n)$ |

> [!info] Complejidad espacial
> $O(n)$ — por los arrays temporales `left` y `right` en el merge.

> [!info] Recurrencia
> $T(n) = 2T(n/2) + n$ → $a=2, b=2, k=1$ → $a = b^k$ → $\Theta(n \log n)$

### Ejemplo visual

![[diagrams/merge-sort-diagrama.excalidraw]]
