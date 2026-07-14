---
tags:
  - algoritmos
  - ordenamiento
  - fundamentos
---

# Insertion Sort

- Algoritmo de ordenamiento simple.
- Funciona de manera similar a como se ordenan **cartas en la mano**.

> [!info] Como funciona
> 1. Comenzar con el **segundo elemento** del array y compararlo con los elementos anteriores.
> 2. **Insertar** el elemento en su posicion correcta dentro del subarray ordenado a su izquierda.
> 3. **Repetir** este proceso para cada elemento del array hasta que este completamente ordenado.

```
function insertionSort(array)
    n = length(array)
    for i = 1 to n - 1
        key = array[i]
        j = i - 1
        while j >= 0 and array[j] > key
            array[j + 1] = array[j]
            j = j - 1
        array[j + 1] = key
    return array
```

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| Mejor caso | $O(n)$ — el array ya esta ordenado |
| Peor caso | $O(n^2)$ — el array esta en orden inverso |
| Caso promedio | $O(n^2)$ |

### Ejemplo visual

![[diagrams/insertion-sort-diagrama.excalidraw]]
