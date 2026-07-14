---
tags:
  - algoritmos
  - programacion-dinamica
---

# Problema del Cambio (Coin Change)

- Dadas $n$ denominaciones de monedas y un valor $amount$, encontrar la **minima cantidad de monedas** para pagar $amount$.
- Greedy no siempre funciona. Ej: denominaciones {1, 4, 6}, amount=8 → Greedy da 3 monedas (6+1+1), optimo es 2 (4+4).

![[diagrams/coin-change-diagrama.excalidraw]]

**Tabla:** $C[i][j]$ = minima cantidad de monedas para pagar valor $j$ usando las primeras $i$ denominaciones.

**Recurrencia:**

$$C[i][j] = \begin{cases} 0 & \text{si } j = 0 \\ \infty & \text{si } i = 0 \text{ y } d_i > j \\ 1 + C[i][j - d_i] & \text{si } i = 0 \text{ y } d_i \leq j \\ C[i-1][j] & \text{si } i > 0 \text{ y } d_i > j \\ \min(C[i-1][j], \; 1 + C[i][j - d_i]) & \text{si } i > 0 \text{ y } d_i \leq j \end{cases}$$

```
function coinChange(denominations, amount)
    n = length(denominations)
    dp = new matrix[n][amount + 1]

    for i = 0 to n - 1
        // paying 0 always costs 0 coins
        dp[i][0] = 0

        for j = 1 to amount
            // only have the first denomination
            if i == 0
                // the coin is too large
                if denominations[i] > j
                    dp[i][j] = infinito
                // use that coin and continue with the remainder
                else
                    dp[i][j] = 1 + dp[i][j - denominations[i]]
            // have multiple denominations
            else
                // this coin does not fit, use previous ones
                if denominations[i] > j
                    dp[i][j] = dp[i - 1][j]
                // choose the minimum between using it or not
                else
                    dp[i][j] = min(dp[i - 1][j], 1 + dp[i][j - denominations[i]])

    return dp[n - 1][amount]
```

> [!example] Ejemplo: D = {6, 4, 1}, amount = 8
>
> |  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
> | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> | d=6 | 0 | ∞ | ∞ | ∞ | ∞ | ∞ | 1 | ∞ | ∞ |
> | d=4 | 0 | ∞ | ∞ | ∞ | 1 | ∞ | 1 | ∞ | 2 |
> | d=1 | 0 | 1 | 2 | 3 | 1 | 2 | 1 | 2 | 2 |
>
> Resultado: 2 monedas (dos de 4).

> [!tip] Diferencia con Mochila 0-1
> - **Cambio** mira a la **izquierda en la misma fila** (puede usar la misma moneda varias veces): $C[i][j - d_i]$
> - **Mochila** mira la **fila de arriba** (cada objeto se usa una sola vez): $V[i-1][j - peso_i]$

**Complejidad temporal:** $O(n \cdot amount)$
**Complejidad espacial:** $O(n \cdot amount)$
