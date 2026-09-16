---
paradigma: parcial-20-10-2023
ejercicio: 1
tecnica: greedy
complejidad: O(n log n)
estado: completo
---

# Ejercicio 1 — Inversiones financieras

Una financiera ofrece distintos tipos de inversión, cada uno con una rentabilidad asegurada y un tope máximo en $ a invertir. Ejemplo: Inversión A (150%, tope $800.000), B (120%, tope $1.000.000), C (180%, tope $500.000), D (165%, tope $1.100.000).

Dado un monto de ahorros a invertir, diseñar un algoritmo que decida en cuáles inversiones invertir y cuánto monto en cada una, con el objetivo de maximizar la rentabilidad.

## Estrategia (Greedy)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Las `N` inversiones disponibles |
| Función selección | La inversión con mayor rentabilidad |
| Función factibilidad | Que no se supere el monto total de ahorros disponibles, **y** que la inversión puntual no haya alcanzado su propio tope |
| Función solución | Se hayan recorrido todas las inversiones posibles o se haya distribuido todo el monto de ahorros |
| Función objetivo | Maximizar la rentabilidad obtenida |

## Pseudocódigo

```
ALGORITMO INVERSION
Entrada: I: Vector<Inversion>, A: entero
Salida: R: Vector<real>

  Ordenar(I)          // de forma descendente por rentabilidad
  R <- []
  montoActual <- A
  indice <- 0
  mientras montoActual > 0 Y indice < LONGITUD(I)
    si montoActual > I[indice].monto
      R[indice] <- I[indice].monto
      montoActual <- montoActual - R[indice]
    sino
      R[indice] <- montoActual
      montoActual <- montoActual - R[indice]
    fin si
    indice <- indice + 1
  fin mientras

  devolver R
```

## Complejidad temporal

El algoritmo es **iterativo** (no recursivo), así que no hay recurrencia ni Master Theorem: se suma el costo de cada bloque.

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Ordenar(I)` | O(n log n) | ordenamiento por comparación de las n inversiones, según rentabilidad |
| bucle `mientras` | O(n) | recorre a lo sumo las n inversiones una vez, costo constante por iteración |

Sumando `O(n log n) + O(n)`, domina el ordenamiento:

**T(n) = O(n log n)**
