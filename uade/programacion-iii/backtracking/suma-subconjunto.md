---
tags:
  - algoritmos
  - backtracking
---

# Suma de Subconjunto (Subset Sum)

Dado un conjunto de $n$ numeros positivos $V$ y un valor $m$, **mostrar todos los subconjuntos** de $V$ cuyos elementos suman $m$.

## Representacion

Vector booleano $S[0..n-1]$ donde $S[i] \in \{0, 1\}$:
- $S[i] = 1$ → el elemento $V[i]$ esta incluido en el subconjunto.
- $S[i] = 0$ → no esta incluido.

## Modelo de backtracking

Arbol binario de altura $n$: en cada nivel se decide si incluir o no el siguiente elemento.

| Elemento | En suma de subconjunto |
| ---- | ----------- |
| **Estado** | Vector $S$ parcialmente decidido + suma actual $accSum$ |
| **Candidatos** | $\{0, 1\}$ para cada posicion |
| **Rechazo** | $accSum > m$ (ya nos pasamos) |
| **Solucion** | Etapa $= n$ y $accSum = m$ |

## Algoritmo

```
function subsetSum(V, currSol, m, stage, accSum)
    for i = 0 to 1
        currSol[stage] = i
        accSum = accSum + V[stage] * i

        if stage == n - 1
            if accSum == m
                display(currSol)
        else
            // poda: si ya sume mas que m, no sigo
            if accSum <= m
                subsetSum(V, currSol, m, stage + 1, accSum)

        // backtrack: deshago la suma para probar la otra rama
        accSum = accSum - V[stage] * i
```

Se llama con `subsetSum(V, currSol, m, 0, 0)`.

## Ejemplo

$V = \{5, 10, 6, 7\}$, $m = 11$.

El arbol binario tiene profundidad 4 (un nivel por elemento). En cada nodo se anota `(profundidad : suma acumulada)`.

Subconjuntos que suman 11:
- $\{5, 6\}$ → vector $(1, 0, 1, 0)$
- $\{11\}$ no existe en $V$; pero hay $\{5, 6\}$ y combinaciones que llegan a 11.

La poda corta cualquier rama donde la suma parcial supera 11.

## Complejidad

Sin poda: $2^n$ hojas (cada elemento puede estar o no). Con poda eficaz, en muchos casos practicos es mucho menor.

$$T(n) = O(2^n)$$

## Variante DP

Existe una version con [[../programacion-dinamica/coin-change|programacion dinamica]] si solo interesa **si existe** algun subconjunto (no enumerar todos): $O(n \cdot m)$ pseudo-polinomial.

Backtracking se usa cuando se quieren **todas** las soluciones o $m$ es muy grande.
