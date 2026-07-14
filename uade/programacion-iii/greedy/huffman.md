---
tags:
  - algoritmos
  - greedy
---

# Codigo de Huffman

Construye un **codigo binario de longitud variable sin prefijos** que minimiza la cantidad de bits necesarios para codificar un mensaje dadas las **frecuencias** de cada simbolo.

## Tipos de codigos

- **Longitud fija**: todas las palabras de codigo tienen la misma longitud. Ej: $\{A, B, C, D, E, F\}$ con 3 bits cada uno → $A \to 000, B \to 001, \dots$
- **Longitud variable**: distintas palabras tienen distinta longitud. Ej: $A \to 0, B \to 101, C \to 100, D \to 111, E \to 1101, F \to 1100$.
- **Sin prefijos**: ninguna palabra de codigo es prefijo de otra. Garantiza decodificacion unica leyendo de izquierda a derecha.

> [!example] Ahorro con Huffman
> Mensaje de 10000 simbolos con frecuencias (en cientos): $A:45, B:13, C:12, D:16, E:9, F:5$.
> - Longitud fija: $30000$ bits.
> - Huffman: $22400$ bits. ~25% de ahorro.

## Idea

Construir un **arbol binario** de abajo hacia arriba comenzando por las hojas (simbolos). En cada paso se combinan los dos nodos con menor frecuencia en un nuevo nodo padre cuya frecuencia es la suma.

- Cada nodo interno tiene clave igual a la suma de las frecuencias de sus hijos.
- El camino raiz → hoja da el codigo: rama izquierda = 0, rama derecha = 1.
- Simbolos mas frecuentes quedan mas cerca de la raiz (codigo mas corto).

## Elementos del problema

| Elemento | En Huffman |
| ---- | ----------- |
| **Candidatos** | Nodos del bosque (inicialmente, una hoja por simbolo) |
| **Seleccion** | Los dos nodos con menor frecuencia |
| **Factibilidad** | Siempre factible mientras queden $\geq 2$ candidatos |
| **Solucion** | Queda un solo arbol |
| **Objetivo** | Minimizar la longitud total ponderada del codigo |

## Estructura auxiliar: cola de prioridad minima

Operaciones (bien implementadas con heap binario):
- `insert(Q, x)` → $\Theta(\log n)$
- `extractMin(Q)` → $\Theta(\log n)$

## Algoritmo

```
function huffman(symbols)
    n = length(symbols)

    // cola de prioridad minima sobre las frecuencias
    Q = initMinPriorityQueue()
    for each symbol in symbols
        insert(Q, symbol)

    for i = 1 to n - 1
        x = extractMin(Q)
        y = extractMin(Q)

        z = newNode()
        left(z) = x
        right(z) = y
        freq(z) = freq(x) + freq(y)

        insert(Q, z)

    return extractMin(Q)
```

## Complejidad

- Construccion de la cola: $\Theta(n)$.
- Ciclo: $n - 1$ iteraciones, cada una con 2 `extractMin` + 1 `insert`, todas $\Theta(\log n)$.

$$T(n) = O(n \log n)$$

## Ejemplo construccion

Simbolos con frecuencias: $\langle F:5, E:9, C:12, B:13, D:16, A:45 \rangle$.

1. Combinar $F, E$ → $X_1: 14$. Cola: $\langle C:12, B:13, X_1:14, D:16, A:45 \rangle$
2. Combinar $C, B$ → $X_2: 25$. Cola: $\langle X_1:14, D:16, X_2:25, A:45 \rangle$
3. Combinar $X_1, D$ → $X_3: 30$. Cola: $\langle X_2:25, X_3:30, A:45 \rangle$
4. Combinar $X_2, X_3$ → $X_4: 55$. Cola: $\langle A:45, X_4:55 \rangle$
5. Combinar $A, X_4$ → $X_5: 100$ (raiz).

Codigo resultante:
$$A \to 0,\; B \to 101,\; C \to 100,\; D \to 111,\; E \to 1101,\; F \to 1100$$
