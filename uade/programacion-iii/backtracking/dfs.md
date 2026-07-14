---
tags:
  - algoritmos
  - backtracking
  - grafos
---

# DFS — Busqueda en Profundidad

_Depth-First Search_. Recorrido de grafo (o arbol) que **avanza tan lejos como puede** por una rama antes de retroceder. Usa una **pila** (explicita o implicita via recursion).

## Idea

1. Empezar en un nodo origen $s$.
2. Visitarlo y tomar uno de sus adyacentes.
3. Realizar DFS desde ese adyacente. Cuando termine, continuar con el siguiente adyacente.

DFS es la estrategia natural detras del [[backtracking|backtracking]]: explora hasta el fondo, podando cuando no puede continuar.

## Algoritmo recursivo

```
function dfs(G, s)
    visited = new array[G.vertices.length]
    for each v in G.vertices
        visited[v] = false

    dfsVisit(G, s, visited)

function dfsVisit(G, v, visited)
    visited[v] = true
    process(v)

    for each w in G.neighbors(v)
        if not visited[w]
            dfsVisit(G, w, visited)
```

## Algoritmo no recursivo (con pila)

```
function dfsIterative(G, s)
    visited = new array[G.vertices.length]
    stack = empty
    push(stack, s)

    while stack not empty
        v = pop(stack)

        if not visited[v]
            visited[v] = true
            process(v)

            for each w in G.neighbors(v)
                if not visited[w]
                    push(stack, w)
```

## Complejidad

- Cada vertice se procesa una sola vez: $O(|V|)$.
- Cada arista se examina una vez (en grafo dirigido) o dos veces (no dirigido): $O(|E|)$.

$$T = O(|V| + |E|)$$

## Aplicaciones

- Recorrer todos los nodos alcanzables desde $s$.
- Detectar ciclos.
- Ordenamiento topologico (DAG).
- Componentes conexas / fuertemente conexas (Tarjan, Kosaraju).
- Backtracking sobre el arbol de decisiones.

## DFS vs [[bfs|BFS]]

| | DFS | BFS |
| ---- | ---- | ---- |
| **Estructura** | Pila | Cola FIFO |
| **Recorre** | Profundo primero | Por niveles |
| **Memoria** | $O(\text{altura})$ | $O(\text{ancho maximo})$ |
| **Camino mas corto** | No (en aristas) | Si (en aristas sin peso) |
| **Aplica a** | Backtracking, ordenamiento topologico | Caminos minimos sin peso, broadcast |
