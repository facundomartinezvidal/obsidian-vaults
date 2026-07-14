---
tags:
  - algoritmos
  - greedy
  - grafos
---

# Algoritmo de Dijkstra

Dado un grafo dirigido con costos $G = (V, A)$ y un vertice origen $x \in V$, encuentra:
1. El **minimo costo** para ir desde $x$ a cualquier otro vertice $w \in V$.
2. El **camino de minimo costo** desde $x$ a cualquier otro vertice.

> [!warning] Requisito
> Los costos de las aristas deben ser **no negativos**. Si hay aristas con peso negativo, Dijkstra puede fallar. Para esos casos se usa Bellman-Ford.

## Elementos del problema

| Elemento | En Dijkstra |
| ---- | ----------- |
| **Candidatos** | Vertices del grafo sin el origen |
| **Seleccion** | Candidato con camino de minimo costo desde el origen |
| **Factibilidad** | Comparar costo directo vs costo pasando por el seleccionado |
| **Solucion** | Todos los vertices fueron visitados |
| **Objetivo** | Minimizar el costo total desde el origen |

## Estrategia

1. Marcar el origen como visitado, distancia 0.
2. Inicializar la distancia a cada vecino como el peso de la arista; el resto como $\infty$.
3. Mientras haya candidatos:
   - Seleccionar el candidato $w$ con menor distancia conocida.
   - Marcarlo como visitado.
   - **Relajar**: para cada vecino $p$ de $w$, si $\text{dist}(w) + \text{peso}(w, p) < \text{dist}(p)$, actualizar $\text{dist}(p)$.

## Algoritmo (caso 1: solo costos minimos)

```
function dijkstra(G, v)
    visited = {v}

    // grafo solucion: mismos vertices, aristas desde v con costo minimo
    dijkstra = initGraph()
    for each w in G.vertices
        dijkstra.addVertex(w)

    for each w in G.neighbors(v)
        dijkstra.addEdge(v, w, G.weight(v, w))

    candidates = G.vertices \ visited

    while candidates not empty
        // selecciono el candidato con menor costo desde v
        min = infinito
        for each u in candidates
            if dijkstra.hasEdge(v, u) and dijkstra.weight(v, u) < min
                min = dijkstra.weight(v, u)
                w = u

        visited.add(w)
        candidates.remove(w)

        // relajacion: actualizo costos pasando por w
        aux_candidates = copy(candidates)
        while aux_candidates not empty
            p = aux_candidates.choose()
            aux_candidates.remove(p)

            if G.hasEdge(w, p)
                if dijkstra.hasEdge(v, p)
                    if dijkstra.weight(v, w) + G.weight(w, p) < dijkstra.weight(v, p)
                        dijkstra.addEdge(v, p, dijkstra.weight(v, w) + G.weight(w, p))
                else
                    dijkstra.addEdge(v, p, dijkstra.weight(v, w) + G.weight(w, p))

    return dijkstra
```

## Algoritmo (caso 2: caminos minimos)

Igual al caso 1 pero al relajar se elimina la arista anterior $(v, p)$ y se agrega la arista $(w, p)$ — asi el grafo solucion contiene el **arbol de caminos minimos** desde $v$.

```
if G.hasEdge(w, p)
    if dijkstra.hasEdge(v, p)
        if dijkstra.weight(v, w) + G.weight(w, p) < dijkstra.weight(v, p)
            dijkstra.addEdge(v, p, dijkstra.weight(v, w) + G.weight(w, p))
            dijkstra.removeEdge(v, p)
    else
        dijkstra.addEdge(w, p, dijkstra.weight(v, w) + G.weight(w, p))
```

## Complejidad

Para $n$ vertices:
- Inicializacion: $\Theta(n)$
- Ciclo principal: $n$ iteraciones, cada una con $\Theta(n)$ para seleccionar el minimo + $\Theta(n)$ para relajar.

$$T(n) = \Theta(n^2)$$

Con cola de prioridad (heap binario): $O((n + |E|) \log n)$, mejor para grafos dispersos.
