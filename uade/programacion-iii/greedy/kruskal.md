---
tags:
  - algoritmos
  - greedy
  - grafos
---

# Algoritmo de Kruskal (MST)

Dado un grafo no dirigido y conexo con costos $G = (V, A)$, encuentra un **arbol de recubrimiento minimo** (MST). Comparte objetivo con [[prim|Prim]] pero usa otra estrategia.

## Idea

Empezar con $n$ arboles triviales (uno por vertice) y unirlos hasta formar un solo arbol, agregando en cada paso la **arista de menor peso** que conecte dos arboles distintos.

## Elementos del problema

| Elemento | En Kruskal |
| ---- | ----------- |
| **Candidatos** | Todas las aristas del grafo |
| **Seleccion** | Arista de menor peso entre las disponibles |
| **Factibilidad** | La arista debe conectar **dos arboles distintos** (no formar ciclo) |
| **Solucion** | Queda un solo arbol |
| **Objetivo** | Minimizar el costo total del arbol |

## Estructura auxiliar: Union-Find (conjuntos disjuntos)

Cada arbol parcial se representa como un **conjunto de vertices**. Operaciones:
- `find(v)` → identificador del conjunto al que pertenece $v$.
- `union(id1, id2)` → combina los dos conjuntos.

Implementadas con union by rank + path compression dan tiempo amortizado casi $O(1)$ por operacion.

## Algoritmo

```
function kruskal(G)
    T = empty

    // cola de prioridad minima sobre las aristas, clave = peso
    Q = initMinPriorityQueue()
    Q = G.edges

    n = length(G.vertices)
    for each v in G.vertices
        initSet({v})

    // n - 1 aristas para conectar n vertices en arbol
    repeat until length(T) == n - 1
        (u, v) = Q.extractMin()

        u_set = find(u)
        v_set = find(v)

        // si pertenecen a arboles distintos, no forma ciclo
        if u_set != v_set
            union(u_set, v_set)
            T = T + {(u, v)}

    return T
```

## Complejidad

- Crear cola con $|E|$ aristas: $O(|E|)$ con `heapify`.
- Cada `extractMin`: $O(\log |E|)$.
- `find` / `union`: casi $O(1)$ amortizado.

$$T = O(|E| \log |E|)$$

Como $|E| \leq n^2$, esto es $O(|E| \log n)$.

## Ejemplo

Aristas ordenadas por peso del grafo de la catedra:
$(a,g):1, (f,g):2, (b,c):3, (c,g):3, (a,b):4, (e,g):4, (a,f):5, (c,d):5, \dots$

Proceso:
1. $(a,g):1$ → unir $\{a\}, \{g\}$. Arbol: $\{(a,g)\}$.
2. $(f,g):2$ → unir $\{f\}, \{a,g\}$. Arbol: $\{(a,g), (f,g)\}$.
3. $(b,c):3$ → unir $\{b\}, \{c\}$. Arbol agrega $(b,c)$.
4. $(c,g):3$ → unir $\{b,c\}, \{a,f,g\}$. Arbol agrega $(c,g)$.
5. $(a,b):4$ → **descartar** (mismo arbol, formaria ciclo). ✗
6. $(e,g):4$ → unir $\{e\}, \{a,b,c,f,g\}$. Arbol agrega $(e,g)$.
7. $(a,f):5$ → descartar. ✗
8. $(c,d):5$ → unir $\{d\}, \{a,b,c,e,f,g\}$. Arbol agrega $(c,d)$.

Final: 6 aristas conectan 7 vertices.

## Prim vs Kruskal

| | Prim | Kruskal |
| ---- | ---- | ---- |
| **Empieza** | Un vertice cualquiera | Aristas mas baratas |
| **Crece** | Un solo arbol | Bosque que se va uniendo |
| **Estructura** | Matriz adyacencia | Cola de prioridad + Union-Find |
| **Complejidad** | $\Theta(n^2)$ | $O(\|E\| \log \|E\|)$ |
| **Mejor para** | Grafos densos | Grafos dispersos |
