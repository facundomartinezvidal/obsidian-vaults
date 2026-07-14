---
tags:
  - algoritmos
  - programacion-dinamica
---
# Programacion Dinamica

Es una tecnica que resuelve problemas descomponiendolos en **subproblemas mas pequenos del mismo tipo**, igual que [[divide-y-conquista|Divide and Conquer]].

La diferencia clave: en D&C los subproblemas son **independientes**, en DP los subproblemas **se repiten** (se superponen). DP **almacena** las soluciones ya calculadas para no repetir trabajo.

> [!important] Principio de optimalidad
> La solucion optima de un problema es una combinacion de soluciones optimas de sus subproblemas. Si este principio no se cumple, DP no se puede usar.

## DP vs Divide & Conquer vs Greedy

| | Divide & Conquer | Programacion Dinamica | Greedy |
| ---- | ----------- | ----------- | ----------- |
| **Subproblemas** | Independientes | Se superponen (se repiten) | No descompone |
| **Estrategia** | Top-down recursivo | Bottom-up con tabla | Iterativo, elige el mejor local |
| **Recalcula** | Si (ineficiente si se repiten) | No (almacena resultados) | No aplica |

## Pasos para resolver con DP

1. Formular la solucion como una **decision** entre soluciones mas pequenas.
2. Expresar la solucion como una **recurrencia**.
3. Llenar una **tabla** de soluciones parciales de abajo hacia arriba (bottom-up).
4. **Reconstruir** el resultado recorriendo la tabla.

## Template generico Top-Down (memoizacion)

Recursion con cache: se resuelve de arriba hacia abajo y se guarda cada resultado la primera vez que se calcula.

```
function dp(state)
    if isBaseCase(state)
        return baseValue(state)

    // evita recalcular subproblemas ya resueltos
    if memo[state] != null
        return memo[state]

    best = initialValue
    for each decision in choices(state)
        sub = dp(transition(state, decision))
        best = combine(best, cost(decision) + sub)

    memo[state] = best
    return best
```

## Template generico Bottom-Up (tabulacion)

Iterativo: se llena la tabla desde los casos base hacia el problema original.

```
function dp(n)
    table = new array[n + 1]

    // --- CASO BASE ---
    table[0] = baseValue

    // --- LLENADO DE LA TABLA ---
    for i = 1 to n
        best = initialValue
        for each decision in choices(i)
            prev = table[transition(i, decision)]
            best = combine(best, cost(decision) + prev)
        table[i] = best

    return table[n]
```

## Top-Down vs Bottom-Up

| | Top-Down (memoizacion) | Bottom-Up (tabulacion) |
| ---- | ----------- | ----------- |
| **Estrategia** | Recursivo + cache | Iterativo llenando tabla |
| **Orden** | Bajo demanda (lazy) | Todos los estados en orden |
| **Ventaja** | Solo calcula lo necesario | Sin overhead de recursion |
| **Desventaja** | Overhead de pila recursiva | Calcula estados que podrian no usarse |

## Algoritmos

| Algoritmo | Problema | Tabla | Complejidad |
| ---- | ----------- | ----------- | ----------- |
| [[fibonacci-dp\|Fibonacci]] | F(n) | 1D: $n$ | $\Theta(n)$ |
| [[coin-change\|Cambio]] | Min monedas para valor V | 2D: $n \times V$ | $O(n \cdot V)$ |
| [[mochila-01\|Mochila 0-1]] | Max valor con peso P | 2D: $n \times P$ | $O(n \cdot P)$ |
| [[floyd-warshall\|Floyd-Warshall]] | Caminos minimos todos-todos | 2D: $n \times n$ | $\Theta(n^3)$ |
| [[lcs\|LCS]] | Subsecuencia comun mas larga | 2D: $m \times n$ | $\Theta(m \cdot n)$ |
| [[lis\|LIS]] | Subsecuencia creciente mas larga | 1D: $n$ | $\Theta(n^2)$ |
