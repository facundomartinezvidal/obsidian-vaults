---
tags:
  - algoritmos
  - backtracking
---

# Problema de las $n$ Damas

Ubicar $n$ damas en un tablero de $n \times n$ casillas (con $n \geq 4$) de manera que **ninguna este en el radio de accion de otra**. La dama en ajedrez se mueve a cualquier casilla en su misma fila, columna o diagonal.

Por lo tanto, las damas deben ubicarse **una por fila y una por columna**.

## Representacion

Vector $S[0..n-1]$ donde $S[i]$ indica en que columna esta la dama de la fila $i$. Cada $S[i]$ es un numero de $0$ a $n-1$.

Esto **garantiza** que no hay dos damas en la misma fila (por la indexacion). Hace falta verificar:
1. **Columnas distintas**: $S[i] \neq S[j]$.
2. **Diagonales libres**: una dama en $(i, S[i])$ ataca casillas con $i \pm k$ filas y $S[i] \pm k$ columnas. Dos damas $(i, S[i])$ y $(e, S[e])$ comparten diagonal si $|S[i] - S[e]| = |i - e|$.

## Modelo de backtracking

| Elemento | En n-damas |
| ---- | ----------- |
| **Estado** | Vector $S$ parcialmente lleno hasta fila $e$ |
| **Candidatos** | Columnas $0, 1, \dots, n-1$ para la fila $e$ |
| **Rechazo** | Conflicto en columna o diagonal con damas previas |
| **Solucion** | $e = n - 1$ y `damaOK` |

## Algoritmo

```
function queens(S, e)
    ok = false
    S[e] = 0

    while S[e] < n and not ok
        if queenOk(S, e)
            if e == n - 1
                ok = true
            else
                ok = queens(S, e + 1)

        if not ok
            S[e] = S[e] + 1

    return ok

function queenOk(S, e)
    for i = 0 to e - 1
        // misma columna o misma diagonal
        if S[i] == S[e] or |S[i] - S[e]| == |i - e|
            return false
    return true
```

`queenOk(S, e)` verifica que la dama recien colocada en la fila $e$ no entre en conflicto con las anteriores. Se llama con `queens(S, 0)`.

## Complejidad

- `queenOk` recorre las filas previas: $O(n)$.
- Arbol de exploracion: $a = n$ candidatos por nivel, profundidad $n$.

$$T(n) = O(n^{n+1})$$

Pesimo en peor caso, pero la poda (`queenOk`) reduce drasticamente el arbol real.

## Ejemplo $n = 4$

El arbol explora:
1. Fila 0: dama en columna 0.
2. Fila 1: prueba col 0 (mismo col, ✗), col 1 (diagonal, ✗), col 2 (ok), col 3 (ok).
3. Tomando col 2 en fila 1: fila 2 → todas las columnas atacadas → backtrack.
4. Tomando col 3 en fila 1: fila 2 → solo col 1 ok. Fila 3 → solo col 2 ok... pero conflicto. Backtrack.
5. Vuelve, prueba dama 0 en col 1: encuentra solucion $\{1, 3, 0, 2\}$.

Solucion final para $n=4$: una dama por fila en columnas $(1, 3, 0, 2)$.
