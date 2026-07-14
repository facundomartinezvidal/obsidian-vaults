---
tags:
  - algoritmos
  - subtract-and-conquer
---

# Palindromos

- Un **palindromo** es un vector que lee igual en ambos sentidos. Ejemplo: `[1, 2, 3, 2, 1]` es palindromo, `[1, 2, 1, 1]` no.
- Algoritmo que devuelve `true` si el vector es palindromo usando **[[divide-y-conquista|Subtract & Conquer]]**.

> [!important] Idea clave
> Comparar el **primer** y **ultimo** elemento. Si son iguales, el problema se reduce a verificar si el **resto del vector** (sin los extremos) es palindromo.

```
function isPalindrome(array, low, high)
    // base case: 0 or 1 elements, it is a palindrome
    if low >= high
        return true

    // the ends do not match, not a palindrome
    if array[low] != array[high]
        return false

    // SUBTRACT: problem reduced by 2 elements (the ends)
    return isPalindrome(array, low + 1, high - 1)
```

**Recurrencia:** $T(n) = 1 \cdot T(n-2) + c$ → $a=1, b=2, k=0$ → $a = 1$ → $\Theta(n^{k+1}) = \Theta(n)$

**Complejidad temporal:** $\Theta(n)$
**Complejidad espacial:** $O(n)$ por la pila de llamadas recursivas.
