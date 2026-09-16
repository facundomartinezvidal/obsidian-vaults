---
paradigma: divide-y-conquista
ejercicio: 4
complejidad: O(n) promedio / O(n²) peor caso
---

# Ejercicio 4 — k-ésimo menor de una secuencia

Dada una secuencia de números no ordenada, determinar cuál es el valor k-ésimo menor de la misma (se entiende que el valor k se recibe como entrada del algoritmo). El algoritmo deberá tener una complejidad temporal en el caso promedio de O(n), pudiendo tener mayor complejidad en el peor de los casos.

## a) Estrategia (Divide y Conquista)

Dada la naturaleza del problema se puede diseñar una resolución por Divide y Conquista siguiendo la siguiente estrategia:

**Caso Base**
1. Si `inicio = fin` (queda un solo elemento), se devuelve directamente ese elemento como resultado.

**Subproblemas**
1. Se particiona el vector alrededor de un pivote (igual que en QuickSort), quedando el pivote en su posición final `p`.
2. Si `k = p`, el pivote es el elemento buscado.
3. Si `k < p`, se busca el k-ésimo menor en la mitad izquierda.
4. Si `k > p`, se busca el k-ésimo menor en la mitad derecha.

**Combinación**
1. Solo se ejecuta uno de los subproblemas (el lado donde cae `k`), por lo que se devuelve en forma directa su resultado — a diferencia de QuickSort completo, acá no hace falta combinar ambos lados.

## b) Pseudocódigo

Reutiliza el mismo `Pivot` de QuickSort:

```
ALGORITMO PIVOT
Entrada: S: Vector<entero>, inicio:entero, fin:entero
Salida: p: entero
  entero p ← S[inicio]
  entero k ← inicio + 1
  entero l ← fin
  mientras S[k] ≤ p Y k < fin
    k ← k + 1
  fin mientras
  mientras S[l] > p
    l ← l - 1
  fin mientras
  mientras k < l
    aux ← S[k]
    S[k] ← S[l]
    S[l] ← aux
    mientras S[k] ≤ p
      k ← k + 1
    fin mientras
    mientras S[l] > p
      l ← l - 1
    fin mientras
  fin mientras
  aux ← S[inicio]
  S[inicio] ← S[l]
  S[l] ← aux
  devolver l


ALGORITMO SELECCIONARKESIMO
Entrada: S: Vector<entero>, inicio:entero, fin:entero, k:entero
Salida: entero
  si inicio = fin
    devolver S[inicio]
  sino
    p ← Pivot(S, inicio, fin)
    si k = p
      devolver S[p]
    sino
      si k < p
        devolver SeleccionarKesimo(S, inicio, p - 1, k)
      sino
        devolver SeleccionarKesimo(S, p + 1, fin, k)
      fin si
    fin si
  fin si
```

Llamada inicial: `SeleccionarKesimo(S, 1, n, k)`

## c) Complejidad temporal

Recurrencia (caso promedio, partición balanceada): T(n) = T(n/2) + O(n)

Por Master Theorem: a=1, b=2, f(n)=O(n) → k=1.

Comparando a=1 contra b^k=2^1=2: a < b^k → cae en el caso T(n) = O(n^k) = **O(n)**.

Peor caso (pivote siempre malo, ej. vector ya ordenado): T(n) = T(n-1) + O(n) → **O(n²)**.
