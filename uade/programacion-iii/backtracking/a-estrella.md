---
tags:
  - algoritmos
  - backtracking
  - grafos
---

# Algoritmo A*

Busqueda informada que combina el costo acumulado ($g$) con una **heuristica** ($h$) que estima cuanto falta al objetivo. Cada nodo se evalua con:

$$f(v) = g(v) + h(v)$$

- $g(v)$ = costo acumulado desde el origen hasta $v$.
- $h(v)$ = estimacion (heuristica) del costo de $v$ al objetivo.

Es esencialmente [[ucs|UCS]] + heuristica. Si $h(v) = 0$ para todo $v$, A* se reduce a UCS / Dijkstra.

## Condiciones sobre la heuristica

Para que A* devuelva el optimo:
- **Admisible**: $h(v) \leq h^*(v)$ donde $h^*(v)$ es el costo real al objetivo. Nunca sobreestima.
- **Consistente** (monotona): $h(v) \leq \text{cost}(v, w) + h(w)$ para toda arista $(v, w)$. Implica admisibilidad.

Heuristica consistente → A* nunca necesita reabrir un nodo cerrado.

## Algoritmo

```
function aStar(G, s, goal, h)
    g = new map
    g[s] = 0
    parent = new map

    open = newMinPriorityQueue()
    insert(open, (s, h(s)))

    closed = new set

    while open not empty
        v = extractMin(open)

        if v == goal
            return reconstructPath(parent, goal)

        closed.add(v)

        for each w in G.neighbors(v)
            tentative_g = g[v] + G.weight(v, w)

            if w in closed and tentative_g >= g[w]
                continue

            if w not in open or tentative_g < g[w]
                parent[w] = v
                g[w] = tentative_g
                f_w = tentative_g + h(w)
                insert(open, (w, f_w))

    return null
```

## Complejidad

En el peor caso es exponencial. En la practica depende mucho de la calidad de la heuristica:
- Heuristica perfecta ($h = h^*$): explora solo el camino optimo.
- Heuristica = 0: equivale a Dijkstra, $O((|V| + |E|) \log |V|)$.

## Ejemplos de heuristicas

| Problema | Heuristica admisible |
| ---- | ----------- |
| Camino en grilla | Distancia Manhattan, Euclidiana |
| 8-puzzle | Numero de fichas fuera de lugar / Distancia Manhattan total |
| Pathfinding | Distancia en linea recta |

## A* vs UCS vs Dijkstra

| | Dijkstra | UCS | A* |
| ---- | ---- | ---- | ---- |
| **Costo considera** | $g$ a todos | $g$ a goal | $g + h$ a goal |
| **Heuristica** | No | No | Si |
| **Optimo** | Si | Si | Si (con $h$ admisible) |
| **Eficiencia** | $O((V + E) \log V)$ | Igual a Dijkstra | Mejor en practica con buena $h$ |
