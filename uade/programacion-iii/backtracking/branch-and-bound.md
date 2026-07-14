---
tags:
  - algoritmos
  - backtracking
---

# Branch and Bound

Tecnica para problemas de **optimizacion** que extiende backtracking con una **cota** (_bound_) que permite podar ramas que no pueden mejorar la mejor solucion conocida hasta el momento.

## Idea

- **Branch**: dividir el problema en subproblemas (como en backtracking).
- **Bound**: para cada subproblema, calcular una cota (superior si es minimizar, inferior si es maximizar) del mejor valor posible en esa rama.
- **Poda**: si la cota del subproblema es peor que la mejor solucion conocida, **descartar** toda la rama sin explorarla.

Backtracking podaba por **factibilidad** (rama no puede contener solucion valida). Branch and Bound poda tambien por **optimalidad** (rama no puede contener solucion **mejor**).

## Estrategias de exploracion

| Estrategia | Estructura | Caracteristica |
| ---- | ----------- | ----------- |
| **FIFO-BB** | Cola FIFO | Como BFS: explora por niveles |
| **LIFO-BB** | Pila | Como DFS: profundidad primero |
| **LC-BB** (_least-cost_) | Cola de prioridad | Explora primero la rama con mejor cota |

LC-BB suele ser mas eficiente porque tiende a encontrar buenas soluciones rapido, lo que ajusta la cota y permite mas poda.

## Template generico (minimizacion)

```
function branchAndBound(problem)
    pq = newMinPriorityQueue()
    bestSolution = null
    bestValue = +infinito

    insert(pq, (initialState, lowerBound(initialState)))

    while pq not empty
        (state, bound) = extractMin(pq)

        // poda por cota: ya no puede mejorar
        if bound >= bestValue
            continue

        if isSolution(state)
            if value(state) < bestValue
                bestValue = value(state)
                bestSolution = state
            continue

        for each child in branch(state)
            b = lowerBound(child)
            if b < bestValue
                insert(pq, (child, b))

    return bestSolution
```

## Aplicaciones tipicas

- **Mochila 0-1**: cota = mochila fraccionaria (la fraccionaria siempre es $\geq$ la 0-1).
- **TSP** (problema del viajante): cota basada en MST o en aristas minimas por vertice.
- **Programacion entera**: cota = relajacion del problema lineal.
- **Job scheduling**.

## Complejidad

En peor caso sigue siendo **exponencial** (recorre todo el arbol). Pero en la practica las podas reducen drasticamente la exploracion. Su eficiencia depende de:
1. **Calidad de la cota**: cuanto mas ajustada, mas se poda.
2. **Orden de exploracion**: encontrar buenas soluciones rapido ajusta `bestValue`.

## Branch and Bound vs Backtracking

| | Backtracking | Branch and Bound |
| ---- | ---- | ---- |
| **Objetivo** | Encontrar solucion(es) factibles | Encontrar solucion **optima** |
| **Poda por** | Factibilidad | Factibilidad + cota de optimalidad |
| **Necesita** | Funcion de rechazo | Funcion de rechazo + funcion cota |
| **Estructura tipica** | Pila / recursion (DFS) | Pila / cola / cola de prioridad |
