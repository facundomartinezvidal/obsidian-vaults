---
tags:
  - algoritmos
  - programacion-dinamica
  - grafos
---

# Floyd-Warshall

- Dado un grafo dirigido con pesos positivos, encontrar el **camino minimo entre todos los pares** de vertices.
- A diferencia de Dijkstra (un solo origen), Floyd calcula **todos contra todos**.

**Idea:** Para cada vertice intermedio $k$, verificar si pasar por $k$ mejora el camino de $i$ a $j$.

**Recurrencia:**

$$M_k[i][j] = \min(M_{k-1}[i][j], \; M_{k-1}[i][k] + M_{k-1}[k][j])$$

```
function floydWarshall(G)
    n = vertexCount(G)
    // M[i][j] = weight of edge (i,j), or infinity if it does not exist
    M = copy(G)

    // for each intermediate vertex k
    for k = 0 to n - 1
        // for each source i
        for i = 0 to n - 1
            // for each destination j
            for j = 0 to n - 1
                // if going through k improves the path from i to j, update it
                if M[i][k] + M[k][j] < M[i][j]
                    M[i][j] = M[i][k] + M[k][j]

    return M
```

> [!example] Ejemplo
> ```
> Grafo original:         Resultado Floyd:
> [0   1   ∞  ∞]         [0  1  4  7]
> [∞   0   3  ∞]         [9  0  3  6]
> [7   2   0   3]        [6  2  0  3]
> [3   ∞   8   0]        [3  4  7  0]
> ```

**Complejidad temporal:** $\Theta(n^3)$
**Complejidad espacial:** $O(n^2)$ (se puede actualizar in-place)
