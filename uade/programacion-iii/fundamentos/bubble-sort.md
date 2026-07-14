---
tags:
  - algoritmos
  - ordenamiento
  - fundamentos
---

# Bubble Sort

- Es el algoritmo de ordenamiento mas simple.
- Compara elementos adyacentes y los intercambia si estan en el orden incorrecto.
- No es adecuado para conjuntos de datos grandes.

> [!important] Comportamiento por pasada
> - En la **primera pasada**, el elemento mas grande queda al final.
> - Despues de la **segunda pasada**, el segundo elemento mas grande queda en su posicion correcta, y asi sucesivamente.

```
function bubbleSort(array)
    n = length(array)
    for i = 0 to n - 2
        for j = 0 to n - 2 - i
            if array[j] > array[j + 1]
                swap(array[j], array[j + 1])
    return array
```

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| Mejor caso | $O(n)$ — el array ya esta ordenado (con optimizacion) |
| Peor caso | $O(n^2)$ — el array esta en orden inverso |
| Caso promedio | $O(n^2)$ |

### Ejemplo visual

![[diagrams/bubble-sort-diagrama.excalidraw]]
