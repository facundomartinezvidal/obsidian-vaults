---
tags:
  - algoritmos
  - programacion-dinamica
---

# Subsecuencia Comun mas Larga (LCS)

- Dadas dos secuencias $X$ e $Y$, encontrar la **subsecuencia mas larga** que aparece en ambas.
- Una subsecuencia no requiere ser contigua, solo mantener el orden.

**Tabla:** $L[i][j]$ = longitud de la LCS entre $X[0..i]$ e $Y[0..j]$.

**Recurrencia:**

$$L[i][j] = \begin{cases} 0 & \text{si } i = 0 \text{ o } j = 0 \\ L[i-1][j-1] + 1 & \text{si } X[i] = Y[j] \\ \max(L[i-1][j], \; L[i][j-1]) & \text{si } X[i] \neq Y[j] \end{cases}$$

```
function lcs(X, Y)
    m = length(X)
    n = length(Y)
    dp = new matrix[m + 1][n + 1]

    for i = 0 to m
        for j = 0 to n
            // one of the sequences is empty
            if i == 0 or j == 0
                dp[i][j] = 0
            // characters match
            else if X[i] == Y[j]
                // extend the LCS from the diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1
            // characters do not match
            else
                // best result excluding one of the two
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]
```

> [!example] Ejemplo: X = "abda", Y = "abacdeb"
>
> |  |  | a | b | a | c | d | e | b |
> | --- | --- | --- | --- | --- | --- | --- | --- | --- |
> |  | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
> | a | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
> | b | 0 | 1 | 2 | 2 | 2 | 2 | 2 | 2 |
> | d | 0 | 1 | 2 | 2 | 2 | 3 | 3 | 3 |
> | a | 0 | 1 | 2 | 3 | 3 | 3 | 3 | 3 |
>
> Resultado: LCS = 3 (la subsecuencia es "abd").

**Complejidad temporal:** $\Theta(m \cdot n)$
**Complejidad espacial:** $O(m \cdot n)$
