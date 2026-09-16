---
paradigma: simulacro-primer-parcial
ejercicio: 3
tecnica: greedy
complejidad: O(n log n)
estado: completo
---

# Ejercicio 3 — Carga de camiones (mochila fraccionaria)

Una empresa de logística debe cargar un camión de capacidad máxima `W` kg. Hay `N` productos en el depósito, cada uno con peso `p_i` y valor económico `v_i`. Los productos pueden particionarse.

Diseñar un algoritmo que indique qué productos transportar para maximizar el valor económico, sin superar `W`.

## Estrategia (Greedy)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Los `N` productos del depósito |
| Función selección | Los productos de mayor relación valor/peso |
| Función factibilidad | Validar que el producto no supere el peso `W` del camión, sino ingresar una fracción del mismo |
| Función solución | Hasta recorrer todos los `N` productos o que el camión haya llegado al peso `W` |
| Función objetivo | Maximizar el beneficio obtenido de los productos sumados al camión |

## Pseudocódigo

```
ALGORITMO CAMION
Entrada: W: entero, P: Vector<Producto>
Salida: R: Vector<real>

  R <- []
  Ordenar(P)          // segun valor/peso, de mayor a menor

  i <- 0
  suma <- 0
  mientras i < longitud(P) Y suma < W
    R[i] <- MIN(1, (W - suma) / P[i].peso)
    suma <- suma + R[i] * P[i].peso
    i <- i + 1
  fin mientras

  devolver R
```

## Complejidad temporal

El algoritmo es **iterativo** (no recursivo), así que no hay recurrencia ni Master Theorem: se suma el costo de cada bloque.

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Ordenar(P)` | O(n log n) | ordenamiento por comparación de los n productos, según valor/peso |
| bucle `mientras` | O(n) | recorre a lo sumo los n productos una vez, costo constante por iteración (un `MIN`, una suma, un incremento) |

Sumando `O(n log n) + O(n)`, domina el ordenamiento:

**T(n) = O(n log n)**
