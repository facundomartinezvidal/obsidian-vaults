---
tags:
  - algoritmos
  - subtract-and-conquer
---

# Fibonacci (Recursivo — S&C)

- Sucesion de Fibonacci: $F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)$
- Es **el ejemplo clasico** de por que S&C naive puede ser muy ineficiente.

```
function fibonacci(n)
    // base case: F(0) = 0, F(1) = 1
    if n <= 1
        return n

    // SUBTRACT: two calls, with n-1 and n-2
    return fibonacci(n - 1) + fibonacci(n - 2)
```

> [!warning] Problema: subproblemas repetidos
> Al calcular `fibonacci(5)` se calcula `fibonacci(3)` dos veces, `fibonacci(2)` tres veces, etc. Los subproblemas **no son independientes**, y esto da una complejidad exponencial.
> Este es el motivo por el cual se inventa la **[[programacion-dinamica|Programacion Dinamica]]**: para almacenar los subproblemas ya calculados.

**Recurrencia:** $T(n) = 2T(n-1) + c$ → $a=2, b=1, k=0$ → $a > 1$ → $\Theta(2^n)$

**Complejidad temporal:** $\Theta(2^n)$ — exponencial, inusable para $n$ grande.

Ver la version eficiente con DP: [[fibonacci-dp]].
