---
paradigma: divide-y-conquista
ejercicio: 3
complejidad: O(log n)
---

# Ejercicio 3 — Índice k con A[k] = k

Sea A[1..n], n≥1, un vector de enteros diferentes y ordenados crecientemente (algunos valores pueden ser negativos). Diseñar un algoritmo que devuelva un índice natural k, 1≤k≤n, tal que A[k]=k, siempre que tal índice exista.

## a) Estrategia (Divide y Conquista)

Dada la naturaleza del problema se puede diseñar una resolución por Divide y Conquista siguiendo la siguiente estrategia:

**Caso Base**
1. Si `inicio > fin` (no queda rango para evaluar), no existe tal k, se devuelve -1.
2. Si tomamos el valor ubicado a la mitad de A, verificamos si `A[k] = k`: si coincide, ya tenemos el resultado.

**Subproblemas**
1. Si `A[k] > k`, buscamos en la mitad izquierda.
2. Si `A[k] < k`, buscamos en la mitad derecha.

**Combinación**
1. En este caso en particular se deberá devolver en forma directa el resultado del subproblema evaluado dado que solo uno de ellos se ejecutará.

## b) Pseudocódigo

```
ALGORITMO BUSCARPUNTOFIJO
Entrada: A: Vector<entero>, inicio:entero, fin:entero
Salida: entero
  si inicio > fin
    devolver -1
  sino
    k ← (inicio + fin) / 2
    si A[k] = k
      devolver k
    sino
      si A[k] < k
        devolver BuscarPuntoFijo(A, k + 1, fin)
      sino
        devolver BuscarPuntoFijo(A, inicio, k - 1)
      fin si
    fin si
  fin si
```

Llamada inicial: `BuscarPuntoFijo(A, 1, n)`

## c) Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

En cada llamada se descarta una mitad del vector y solo queda un subproblema de tamaño n/2, más el trabajo constante de calcular `medio` y comparar `A[medio]` con `medio`.

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**.
