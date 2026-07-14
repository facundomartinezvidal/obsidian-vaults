---
tags:
  - algoritmos
  - programacion-dinamica
---
# Mochila 0-1 (Knapsack)

- $n$ objetos, cada uno con **peso** y **valor**.
- Mochila con capacidad maxima $max_weight$.
- Los objetos **no se pueden fraccionar** (se incluyen enteros o no).
- Maximizar el valor total sin exceder el peso.

![[diagrams/mochila-01-diagrama.excalidraw]]

**Tabla:** $V[i][j]$ = maximo valor considerando los primeros $i$ objetos con capacidad $j$.

**Recurrencia:**

$$V[i][j] = \begin{cases} 0 & \text{si } i = 0 \text{ y } peso_i > j \\ valor_i & \text{si } i = 0 \text{ y } peso_i \leq j \\ V[i-1][j] & \text{si } i > 0 \text{ y } peso_i > j \\ \max(V[i-1][j], \; V[i-1][j - peso_i] + valor_i) & \text{si } i > 0 \text{ y } peso_i \leq j \end{cases}$$

```
function knapsack(objects, max_weight)
    n = length(objects)
    dp = new matrix[n][max_weight + 1]

    for i = 0 to n - 1
        for j = 0 to max_weight
            // only have the first object
            if i == 0
                // does not fit in the knapsack
                if objects[i].weight > j
                    dp[i][j] = 0
                // fits, its value is the best option
                else
                    dp[i][j] = objects[i].value
            // have multiple objects
            else
                // this object does not fit, keep previous result
                if objects[i].weight > j
                    dp[i][j] = dp[i - 1][j]
                // choose the maximum between including it or not
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - objects[i].weight] + objects[i].value)

    return dp[n - 1][max_weight]
```

> [!example] Ejemplo: objetos = {(peso=1, val=10), (4, 3), (5, 5), (7, 8)}, max_weight = 8
>
> |  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
> | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> | (1,10) | 0 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
> | (4,3) | 0 | 10 | 10 | 10 | 10 | 13 | 13 | 13 | 13 |
> | (5,5) | 0 | 10 | 10 | 10 | 10 | 13 | 15 | 15 | 15 |
> | (7,8) | 0 | 10 | 10 | 10 | 10 | 13 | 15 | 15 | 18 |
>
> Resultado: valor maximo = 18 (objetos de peso 1 y 7, valores 10+8).

**Complejidad temporal:** $O(n \cdot max_weight)$
**Complejidad espacial:** $O(n \cdot max_weight)$
