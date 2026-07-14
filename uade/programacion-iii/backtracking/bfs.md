---
tags:
  - algoritmos
  - backtracking
  - grafos
---

# BFS — Busqueda en Amplitud

_Breadth-First Search_. Recorrido por **niveles**: visita el origen, despues sus adyacentes, despues los adyacentes de los adyacentes, y asi sucesivamente. Usa una **cola FIFO**.

## Idea

1. Encolar el origen $s$.
2. Desencolar un nodo, procesarlo, encolar sus adyacentes no visitados.
3. Repetir hasta vaciar la cola.

## Algoritmo

```
function bfs(G, s)
    visited = new array[G.vertices.length]
    for each v in G.vertices
        visited[v] = false

    queue = empty
    enqueue(queue, s)
    visited[s] = true

    while queue not empty
        v = dequeue(queue)
        process(v)

        for each w in G.neighbors(v)
            if not visited[w]
                visited[w] = true
                enqueue(queue, w)
```

> [!important] Marcar al encolar, no al desencolar
> Si se marca como visitado al desencolar, un mismo nodo puede encolarse multiples veces. Marcar al **encolar** evita el problema.

## Complejidad

$$T = O(|V| + |E|)$$

## Aplicaciones

- **Camino mas corto en aristas** (sin pesos o con pesos uniformes).
- Broadcast en redes.
- Capas de distancia desde un origen.
- Comprobar bipartito.
- Base de [[ucs|UCS]] y [[a-estrella|A*]] (que generalizan BFS con costos / heuristica).

## BFS y caminos minimos

Si todas las aristas tienen peso 1, BFS encuentra el camino con **menor cantidad de aristas** desde $s$ a cualquier otro vertice. Para grafos con costos no uniformes, hay que usar [[../greedy/dijkstra|Dijkstra]] o [[ucs|UCS]].

## BFS vs [[dfs|DFS]]

| | BFS | DFS |
| ---- | ---- | ---- |
| **Estructura** | Cola FIFO | Pila / recursion |
| **Orden** | Por nivel (anchura) | Por rama (profundidad) |
| **Camino minimo (aristas)** | Si | No |
| **Memoria peor caso** | $O(\text{ancho})$ | $O(\text{altura})$ |
