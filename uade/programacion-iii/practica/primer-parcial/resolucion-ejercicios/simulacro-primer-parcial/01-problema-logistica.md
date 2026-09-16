---
paradigma: simulacro-primer-parcial
ejercicio: 1
tecnica: divide-y-conquista
complejidad: O(log n)
estado: completo
---

# Ejercicio 1 — Problema de logística (punto de rotación)

Arreglo `T[1..n]` originalmente ordenado, rotado en un punto desconocido `k`. Ejemplo: `[2,5,8,12,15,20]` → `[12,15,20,2,5,8]`, `k=4`.

Diseñar un algoritmo que determine `k`.

## Estrategia (Divide y Conquista)

**Caso base:** `inicio = fin` (un solo elemento) → ese elemento es `k`.

**Subproblema:** `mitad = (inicio + fin) / 2`.
- Si `T[mitad] > T[fin]` → `k` está a la derecha: buscar en `(mitad+1, fin)`.
- Si `T[mitad] <= T[fin]` → `k` está en `mitad` o a la izquierda: buscar en `(inicio, mitad)`.

**Combinación:** no hay — se descarta el subproblema no elegido.

## Pseudocódigo

```
ALGORITMO LOGISTICA
Entrada: S: Vector<entero>, inicio: entero, fin: entero
Salida: entero

si inicio = fin
	devolver inicio
sino
	mitad ← (inicio + fin) / 2
	si S[mitad] > S[fin]
		devolver LOGISTICA(S, mitad + 1, fin)
	sino
		devolver LOGISTICA(S, inicio, mitad)
	fin si
fin si
```

## Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

Cada llamada hace trabajo constante (calcular `mitad` y una comparación) y genera **un solo** subproblema de tamaño `n/2` (se descarta el otro).

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**
