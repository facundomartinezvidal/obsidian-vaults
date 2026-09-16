---
paradigma: simulacro-primer-parcial
ejercicio: 5
tecnica: greedy
complejidad: O(n log n)
estado: completo
---

# Ejercicio 5 — Transporte de logística (mochila fraccionaria)

Una empresa transportista tiene un camión de carga con capacidad máxima `C` kg. Hay `N` productos en el depósito, cada uno con peso `p_i` y valor económico `v_i`. Los productos pueden particionarse.

Diseñar un algoritmo que indique qué productos transportar para maximizar el valor económico, sin superar `C`.

## Estrategia (Greedy)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Los `N` productos en el almacén |
| Función selección | Los productos de mayor relación valor/peso |
| Función factibilidad | Verificar que el producto no haya superado la capacidad máxima `C`, sino particionarlo |
| Función solución | Hasta haber recorrido todos los candidatos o haber llegado a la capacidad máxima |
| Función objetivo | Maximizar el beneficio obtenido de los productos sumados al camión |

## Pseudocódigo

```
ALGORITMO TRANSPORTE
Entrada: P: Vector<Producto>, C: entero
Salida: R: Vector<real>

  Ordenar(P)          // segun valor/peso, de mayor a menor

  R <- []
  i <- 0
  suma <- 0
  mientras i < longitud(P) Y suma < C
    R[i] <- MIN(1, (C - suma) / P[i].peso)
    suma <- suma + R[i] * P[i].peso
    i <- i + 1
  fin mientras

  devolver R
```

## Complejidad temporal

El algoritmo es **iterativo**, se suma el costo de cada bloque.

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Ordenar(P)` | O(n log n) | ordenamiento por comparación de los n productos, según valor/peso |
| bucle `mientras` | O(n) | recorre a lo sumo los n productos una vez, costo constante por iteración |

Sumando `O(n log n) + O(n)`, domina el ordenamiento:

**T(n) = O(n log n)**
