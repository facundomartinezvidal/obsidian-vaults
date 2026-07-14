---
tags:
  - algoritmos
  - busqueda
  - divide-and-conquer
---

# Busqueda Binaria

- Solo funciona sobre **arrays ordenados**.
- Utiliza una estrategia de **[[divide-y-conquista|Divide and Conquer]]**.
- Selecciona el elemento del medio del rango actual y lo compara con el objetivo.
- Si el medio coincide, devuelve `true`. Si no, recursa sobre la mitad donde puede estar.
- Caso base: cuando `low > high`, el rango es vacío — el elemento no existe.

> [!important] Por que es Divide and Conquer
> En cada llamada divide el rango en dos mitades y recursa solo sobre una. No necesita combinar resultados — la respuesta viene directa de la recursion.

```
function binarySearch(array, target, low, high)
    // base case: empty range, element does not exist
    if low > high
        return false

    mid = (low + high) / 2

    // found it
    if target == array[mid]
        return true
    // target is in the left half
    else if target < array[mid]
        return binarySearch(array, target, low, mid - 1)
    // target is in the right half
    else
        return binarySearch(array, target, mid + 1, high)
```

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| Mejor caso | $O(1)$ — el elemento esta justo en el medio |
| Peor caso | $O(\log n)$ — se divide hasta llegar a tamaño 1 |
| Caso promedio | $O(\log n)$ |

> [!info] Recurrencia
> $T(n) = T(n/2) + c$ → $a=1, b=2, k=0$ → $a = b^k$ → $\Theta(\log n)$

### Ejemplo visual

![[diagrams/busqueda-binaria-diagrama.excalidraw]]

### Comparacion con Busqueda Lineal

Ver [[busqueda-lineal-vs-busqueda-binaria]].
