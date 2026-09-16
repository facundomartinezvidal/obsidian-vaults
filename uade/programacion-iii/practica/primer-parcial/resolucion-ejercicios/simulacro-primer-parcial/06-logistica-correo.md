---
paradigma: simulacro-primer-parcial
ejercicio: 6
tecnica: divide-y-conquista
complejidad: O(log n)
estado: completo
---

# Ejercicio 6 — Logística del correo (fin de la rotación)

Arreglo `T[1..n]` originalmente ordenado, rotado en un punto desconocido. Ejemplo: `[2,5,8,12,15,20]` → `[12,15,20,2,5,8]`.

Diseñar un algoritmo que determine la posición donde **finaliza** la rotación (el último elemento de la secuencia ascendente original), en el ejemplo sería la 3.

## Estrategia (Divide y Conquista)

**Caso base:** `inicio = fin` (un solo elemento) → ese elemento es la posición buscada.

**Subproblema:** `mitad = (inicio + fin) / 2`.
- Si `T[mitad] < T[fin]` → la posición buscada está a la derecha: buscar en `(mitad+1, fin)`.
- Si `T[mitad] >= T[fin]` → la posición buscada está en `mitad` o a la izquierda: buscar en `(inicio, mitad)` (se incluye `mitad` porque todavía no se descarta que sea la respuesta).

**Combinación:** no hay — se descarta el subproblema no elegido.

## Pseudocódigo

```
ALGORITMO CORREO
Entrada: S: Vector<entero>, inicio: entero, fin: entero
Salida: entero

si inicio = fin
	devolver inicio
sino
	mitad ← (inicio + fin) / 2
	si S[mitad] < S[fin]
		devolver CORREO(S, mitad + 1, fin)
	sino
		devolver CORREO(S, inicio, mitad)
	fin si
fin si
```

## Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

Cada llamada hace trabajo constante (calcular `mitad` y una comparación) y genera **un solo** subproblema de tamaño `n/2` (se descarta el otro).

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0 (no k=1: `f(n) = O(1) = O(n⁰)`).

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**
