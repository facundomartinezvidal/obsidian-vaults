---
paradigma: greedy
ejercicio: 1
estado: en-construccion
---

# Ejercicio 1 — Planificación de tareas con plazo fijo

Se deben procesar `n` tareas en un único procesador. Cada tarea se procesa en una unidad de tiempo y debe ejecutarse en un plazo no superior a `tᵢ`. La tarea `i` produce una ganancia `gᵢ > 0` si se procesa en un instante anterior a `tᵢ`. Una solución es factible si existe al menos una secuencia `S` de tareas que se ejecuten antes de sus respectivos plazos. Una solución óptima es aquella que maximiza la ganancia `G = Σ gₛ` con `s ∈ S`.

## a) Estrategia (Greedy)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Las `n` tareas a procesar, cada una con su ganancia `gᵢ` y su plazo `tᵢ` |
| Función selección | Elegir la tarea pendiente de mayor ganancia `gᵢ` |
| Función factibilidad | La tarea `x` es factible si existe al menos un instante libre en el rango `[1, tₓ]`. Al aceptarla se la asigna al **instante libre más tardío** de ese rango, para dejar los instantes tempranos disponibles para tareas posteriores con plazo más ajustado |
| Función solución | Se terminaron de evaluar todas las tareas candidatas (no se puede cortar antes: siempre puede quedar una tarea con plazo grande que todavía entra) |
| Función objetivo | Maximizar la ganancia total `G = Σ gₛ` de las tareas planificadas |

Ordenar una sola vez las tareas por ganancia descendente al inicio evita rebuscar el máximo en cada paso: la selección pasa a ser recorrer el vector en orden.

## b) Pseudocódigo

```
ALGORITMO PLANIFICAR_TAREAS
Entrada: T: Vector<Tarea>     // cada Tarea tiene:
                              //   g: entero > 0   (ganancia)
                              //   t: entero > 0   (plazo)
Salida: R: Vector<entero>     // R[j] = identificador de la tarea que se
                              //        ejecuta en el instante j
                              //        (0 si el instante j queda libre)
```

_(cuerpo en construcción)_

## c) Complejidad temporal

_(pendiente)_
