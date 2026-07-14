---
tags:
  - algoritmos
  - programacion-dinamica
---

# Fibonacci (DP — Bottom-Up)

Ejemplo motivador que muestra por que DP es mejor que la recursion naive ([[fibonacci-recursivo|S&C naive]] tiene $\Theta(2^n)$).

**Recurrencia:**

$F(0) = 0, \quad F(1) = 1, \quad F(n) = F(n-1) + F(n-2)$

**DP (bottom-up):** $\Theta(n)$ — calcula cada valor una sola vez y lo guarda.

```
function fibonacci(n)
    if n <= 1
        return n

    table = new array[n + 1]
    table[0] = 0
    table[1] = 1

    // fill the table from left to right
    for i = 2 to n
        // use already-computed values
        table[i] = table[i - 1] + table[i - 2]

    return table[n]
```

> [!example] Ejemplo: F(6)
> `tabla = [0, 1, 1, 2, 3, 5, 8]` → F(6) = 8
> Cada valor se calculo una sola vez.

**Complejidad temporal:** $\Theta(n)$
**Complejidad espacial:** $O(n)$
