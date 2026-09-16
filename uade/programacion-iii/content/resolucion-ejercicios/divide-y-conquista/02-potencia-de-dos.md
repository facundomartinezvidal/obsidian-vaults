---
paradigma: divide-y-conquista
ejercicio: 2
complejidad: O(log n)
---

# Ejercicio 2 — Potencia aⁿ con n potencia de 2

Diseñar un algoritmo que calcule aⁿ cuando n es una potencia de 2.

## a) Estrategia (Divide y Conquista)

- **División:** un solo subproblema, `power(a, n/2)` (n/2 es entero exacto porque n es potencia de 2)
- **Caso base:** n == 1 → devuelve `a`
- **Combinación:** `half * half`

## b) Pseudocódigo

> [!note] Estilo previo — pendiente de adaptar a [[convencion-pseudocodigo]]

```
function power(a: number, n: int): number
    if n == 1
        return a

    half = power(a, n / 2)
    return half * half
```

Llamada inicial: `power(a, n)`

## c) Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**.
