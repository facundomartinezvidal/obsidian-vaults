---
tags:
  - algoritmos
  - backtracking
---

# Particion en partes iguales

Dada una coleccion de $n$ numeros enteros positivos, encontrar (si existe) una particion en **dos sub-colecciones disjuntas** tales que la suma de ambas sea igual y cada elemento original pertenezca a una u otra.

## Estrategia

Empezar con todos los elementos en una sub-coleccion. Ir pasando selectivamente elementos a la otra. Verificar si las sumas son iguales.

## Representacion

Vector $s[0..n-1]$ donde $s[i] \in \{0, 1\}$:
- $s[i] = 0$ → elemento $i$ esta en la sub-coleccion **izquierda**.
- $s[i] = 1$ → elemento $i$ esta en la **derecha**.

## Modelo de backtracking

| Elemento | En particion en partes iguales |
| ---- | ----------- |
| **Estado** | Asignacion parcial de elementos a una sub-coleccion |
| **Candidatos** | $\{0, 1\}$ para cada elemento |
| **Rechazo** | (sin poda explicita en la version basica) |
| **Solucion** | $s_1 = s_2$ al completar |

## Algoritmo

```
function partition(v)
    n = length(v)
    s = initializeArray(n)
    partitionRec(v, s, 0)

function partitionRec(v, s, e)
    for i = 0 to 1
        s[e] = i

        if e == n - 1
            s1 = 0
            s2 = 0
            for j = 0 to n - 1
                if s[j] == 0
                    s1 = s1 + v[j]
                else
                    s2 = s2 + v[j]

            if s1 == s2
                print(s)
        else
            partitionRec(v, s, e + 1)
```

## Complejidad

- Arbol binario de altura $n$: $2^n$ hojas.
- En cada hoja se calcula la suma: $O(n)$.

$$T(n) = O(n \cdot 2^n)$$

Con $a = 2, b = 1, k = 1$ (recurrencia por sustraccion).

## Ejemplo

$v = (2, 5, 8, 3, 2)$, suma total = 20.

Si existe particion, cada sub-coleccion debe sumar $10$.

El arbol explora $2^5 = 32$ hojas. Cada nodo se anota con `(elemento : suma izquierda)`. Soluciones:
- $\{2, 8\}$ y $\{5, 3, 2\}$ → ambas suman 10. ✓
- $\{2, 5, 3\}$ y $\{8, 2\}$ → ambas suman 10. ✓
- (otras simetricas)

## Optimizacion posible

Si la suma total es impar, no hay solucion (poda inmediata, evita el arbol entero). Tambien se puede podar cuando una sub-coleccion ya supera la mitad.
