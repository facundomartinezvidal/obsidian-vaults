---
tags:
  - algoritmos
  - greedy
  - grafos
---

# Algoritmo de Prim (MST)

Dado un grafo no dirigido y conexo con costos $G = (V, A)$, encuentra un **arbol de recubrimiento minimo** (MST, _minimum spanning tree_): un subgrafo $G' = (V, A')$ con $A' \subseteq A$ que es arbol y tiene **costo total minimo**.

> [!note] MST no es unico
> Si hay aristas con el mismo peso, pueden existir multiples MST. Prim y [[kruskal|Kruskal]] dan resultados que pueden diferir, pero ambos validos.

## Elementos del problema

| Elemento | En Prim |
| ---- | ----------- |
| **Candidatos** | Vertices aun no incluidos en el arbol |
| **Seleccion** | Vertice con la arista de costo minimo al arbol ya construido |
| **Factibilidad** | Cualquiera (depende de la implementacion) |
| **Solucion** | Todos los vertices fueron incluidos |
| **Objetivo** | Minimizar el costo total del arbol |

## Estrategia

Empezar con un vertice cualquiera. En cada paso, agregar al arbol el vertice no incluido cuya arista al arbol existente sea de menor peso. Repetir hasta incluir los $n$ vertices.

## Estructuras auxiliares

- Matriz de adyacencia $L[i][j]$ con $L[i][i] = -1$.
- `nearest[i]` = vertice del arbol mas cercano al vertice $i$.
- `minDist[i]` = distancia minima de $i$ al nodo `nearest[i]`.
- Si $i$ ya esta en el arbol, $\text{minDist}[i] = -1$.

## Algoritmo

```
function prim(n, L)
    T = empty

    // inicializo: el vertice 1 ya esta en el arbol
    for i = 0 to n - 1
        nearest[i] = 0
        minDist[i] = L[0][i]

    // ciclo greedy: n - 1 aristas para completar el arbol
    repeat n - 1 times
        min = infinito

        // busco el vertice mas proximo al arbol
        for j = 1 to n - 1
            if 0 <= minDist[j] < min
                min = minDist[j]
                k = j

        T = T + {(nearest[k], k)}

        // marco k como incluido
        minDist[k] = -1

        // recalculo distancias al arbol con el nuevo vertice k
        for j = 1 to n - 1
            if L[j][k] < minDist[j]
                minDist[j] = L[j][k]
                nearest[j] = k

    return T
```

## Complejidad

- Inicializacion: $\Theta(n)$
- Ciclo externo: $n - 1$ iteraciones
- Ciclo interno (buscar minimo + actualizar): $\Theta(n)$ cada uno

$$T(n) = \Theta(n^2)$$

Con heap binario y lista de adyacencias: $O(|E| \log n)$.

## Cuando conviene Prim

- Grafos **densos** (muchas aristas, $|E| \approx n^2$) → mejor que Kruskal porque $\Theta(n^2)$ vs $O(n^2 \log n)$.
- Implementacion simple con matriz de adyacencia.

Para grafos dispersos, ver [[kruskal|Kruskal]].
