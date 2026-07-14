---
tags:
  - algoritmos
  - greedy
---

# Mochila Fraccionaria (Greedy)

Dada una mochila con capacidad maxima de peso $P$ y $n$ objetos donde cada objeto $i$ tiene un valor $V_i > 0$ y un peso $P_i > 0$, **maximizar el valor total** sin exceder $P$.

A diferencia de la [[../programacion-dinamica/mochila-01|mochila 0-1]] (DP), los objetos pueden **fraccionarse**: $0 \leq X_i \leq 1$. El valor incluido es $X_i \cdot V_i$ y el peso es $X_i \cdot P_i$.

> [!important] Por que aca Greedy si funciona
> Como los objetos se pueden cortar, podemos saturar la mochila siempre que quede capacidad. El criterio **valor/peso** es optimo porque cada unidad de peso aporta el maximo valor posible.

## Elementos del problema

| Elemento | En la mochila fraccionaria |
| ---- | ----------- |
| **Candidatos** | Los $n$ objetos disponibles |
| **Seleccion** | Objeto con mayor relacion $V_i / P_i$ |
| **Factibilidad** | Tomar fraccion $X_i = \min(1, (P - accum) / P_i)$ |
| **Solucion** | Mochila llena o sin objetos restantes |
| **Objetivo** | Maximizar $\sum X_i \cdot V_i$ |

## Algoritmo

```
function knapsack(items, max_weight)
    n = length(items)
    result = new array[n]

    // ordenar por valor/peso descendente: aporta mas valor por unidad de peso
    sort(items, key = value / weight, descending = true)

    for i = 0 to n - 1
        result[i] = 0

    accum = 0
    i = 0
    while accum < max_weight and i < n
        result[i] = min(1, (max_weight - accum) / items[i].weight)
        accum = accum + result[i] * items[i].weight
        i = i + 1

    return result
```

## Complejidad

- Ordenamiento: $\Theta(n \log n)$
- Inicializacion + ciclo: $\Theta(n)$

$$T(n) = \Theta(n \log n)$$

El costo total esta dominado por el sort.

## Ejemplo

Valores $[4, 7, 2, 5]$, pesos $[3, 5, 4, 4]$, capacidad $P = 10$.

Ordenando por $V_i / P_i$:

| Objeto | $V$ | $P$ | $V/P$ |
| ---- | --- | --- | ----- |
| 1 | 7 | 5 | 1.4 |
| 0 | 4 | 3 | 1.33 |
| 3 | 5 | 4 | 1.25 |
| 2 | 2 | 4 | 0.5 |

Greedy toma:
- Objeto 1 entero: $X_1 = 1$, peso = 5, valor = 7
- Objeto 0 entero: $X_0 = 1$, peso = 8, valor = 11
- Objeto 3 fraccion: $X_3 = (10 - 8) / 4 = 0.5$, peso = 10, valor = $11 + 2.5 = 13.5$

Valor total: **13.5** (optimo).

## Por que el criterio funciona (idea de prueba)

Sea $S^*$ una solucion optima. Si en $S^*$ no se tomo primero el objeto con mejor $V/P$, podemos intercambiar peso de uno peor por peso del mejor sin reducir el valor (de hecho, lo aumenta o lo deja igual). Es un argumento de intercambio (exchange argument).

> [!warning] Solo aplica a la version fraccionaria
> En la version [[../programacion-dinamica/mochila-01|0-1]] (objetos enteros), greedy con $V/P$ **no es optimo**. Hay que usar DP.
