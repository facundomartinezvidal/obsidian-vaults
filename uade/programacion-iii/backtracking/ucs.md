---
tags:
  - algoritmos
  - backtracking
  - grafos
---

# UCS — Uniform Cost Search

_Busqueda de costo uniforme_. Generalizacion de [[bfs|BFS]] para grafos con **costos arbitrarios no negativos** en las aristas. En lugar de una cola FIFO usa una **cola de prioridad minima** ordenada por **costo acumulado** desde el origen.

Es esencialmente [[../greedy/dijkstra|Dijkstra]] cuando se busca el camino al objetivo en lugar de a todos los nodos.

## Idea

En cada paso, **expandir el nodo con menor costo acumulado** desde el origen.

1. Encolar $(s, 0)$.
2. Desencolar el nodo $v$ con menor costo $g(v)$.
3. Si $v$ es objetivo, devolver el camino.
4. Para cada vecino $w$, encolar $(w, g(v) + \text{cost}(v, w))$.
5. Repetir.

## Algoritmo

```
function ucs(G, s, goal)
    visited = new set
    pq = newMinPriorityQueue()
    insert(pq, (s, 0, [s]))

    while pq not empty
        (v, g_v, path) = extractMin(pq)

        if v == goal
            return path

        if v in visited
            continue

        visited.add(v)

        for each w in G.neighbors(v)
            if w not in visited
                insert(pq, (w, g_v + G.weight(v, w), path + [w]))

    return null
```

## Complejidad

Con heap binario:

$$T = O((|V| + |E|) \log |V|)$$

## UCS vs BFS vs Dijkstra

| | BFS | UCS | Dijkstra |
| ---- | ---- | ---- | ---- |
| **Costos** | Uniformes (no usados) | Arbitrarios $\geq 0$ | Arbitrarios $\geq 0$ |
| **Estructura** | Cola FIFO | Cola de prioridad | Cola de prioridad |
| **Objetivo** | Un nodo o todos | Un nodo (target) | Todos los nodos desde $s$ |
| **Garantia** | Camino con min aristas | Camino con min costo a goal | Costos minimos a todos |

UCS termina apenas encuentra el objetivo; Dijkstra calcula distancias a todos los vertices.

## Limitacion

UCS expande nodos en orden de costo acumulado, **sin considerar** que tan cerca estan del objetivo. Si el espacio de busqueda es grande, puede explorar mucho innecesariamente. Para mejorar esto se usa una heuristica → [[a-estrella|A*]].
