---
tags:
  - algoritmos
  - busqueda
  - fundamentos
---

# Busqueda Lineal

- Es el algoritmo de busqueda mas simple.
- Recorre el array de forma secuencial.
- Compara el elemento buscado con cada elemento del array, uno por uno.
- Tambien conocida como "**Busqueda Secuencial**".

```
function linearSearch(array, target)
    for i = 0 to length(array) - 1
        if array[i] == target
            return i
    return -1
```

**Complejidad temporal:**

| Caso | Complejidad |
| ---- | ----------- |
| Mejor caso | $O(1)$ — el elemento esta en la primera posicion |
| Peor caso | $O(n)$ — el elemento esta al final o no existe |
| Caso promedio | $O(n)$ |

### Ejemplo visual

![[diagrams/busqueda-lineal-diagrama.excalidraw]]

### Comparacion con Busqueda Binaria

Ver [[busqueda-lineal-vs-busqueda-binaria]].
