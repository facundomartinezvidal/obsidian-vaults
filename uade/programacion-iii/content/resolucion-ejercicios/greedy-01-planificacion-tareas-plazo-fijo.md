---
paradigma: greedy
ejercicio: 1
complejidad: O(n²)
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
Entrada: T: Vector<Tarea>      // Tarea = (id, g, t) enteros; g > 0, t > 0
Salida:  R: Vector<entero>     // R[j] = id de la tarea en el instante j (0 = libre)

  Ordenar(T)                   // por ganancia g, de mayor a menor

  maxPlazo ← 0
  para i = 1 hasta n
    si T[i].t > maxPlazo
      maxPlazo ← T[i].t
    fin si
  fin para

  para j = 1 hasta maxPlazo    // R[1..maxPlazo]: instantes arrancan libres
    R[j] ← 0
  fin para

  para i = 1 hasta n           // T ordenado ⇒ recorrer T = función selección
    j ← T[i].t                 // instante más tardío admisible para la tarea
    mientras j ≥ 1 Y R[j] ≠ 0  // retrocede mientras el instante esté ocupado
      j ← j - 1
    fin mientras
    si j ≥ 1                   // hay instante libre en [1, T[i].t] ⇒ factible
      R[j] ← T[i].id           // asigna la tarea a ese instante
    fin si
  fin para

  devolver R
```

Notas:

- Índices base 1 para los instantes (`R[1..maxPlazo]`).
- `T[i].t` / `T[i].g` / `T[i].id` = acceso a campo, igual que `O[objeto].peso` en `ALGORITMO MOCHILA`.
- El campo `id` es necesario porque `Ordenar(T)` cambia las posiciones: `i` ya no es el número original de la tarea.
- El `mientras` interno resuelve la **función factibilidad** y a la vez ubica la tarea: sale con `j ≥ 1` si hay lugar (y `j` es el instante), o con `j = 0` si la tarea se descarta.
- La secuencia solución del enunciado (`4,1`) se obtiene leyendo `R` de izquierda a derecha, salteando los `0`.

### Traza — ejemplo de la guía

`g = (50, 10, 15, 30)`, `t = (2, 1, 2, 1)`. Ordenado por ganancia desc: `T1`(g50,t2), `T4`(g30,t1), `T3`(g15,t2), `T2`(g10,t1). `maxPlazo = 2`, `R = [0, 0]`.

| Tarea (t) | búsqueda de instante | resultado | R |
|-----------|----------------------|-----------|---|
| T1 (t=2) | j=2 → `R[2]=0` libre | asigna en 2 | `[0, 1]` |
| T4 (t=1) | j=1 → `R[1]=0` libre | asigna en 1 | `[4, 1]` |
| T3 (t=2) | j=2 ocupado → j=1 ocupado → j=0 | descartada | `[4, 1]` |
| T2 (t=1) | j=1 ocupado → j=0 | descartada | `[4, 1]` |

Secuencia: **`4,1`** · ganancia `G = 50 + 30 = 80` (óptimo de la guía).

Poner T1 en el instante 2 (el más tardío) y no en el 1 es lo que deja libre el instante 1 para T4.

## c) Complejidad temporal

El algoritmo es **iterativo** (no recursivo), así que no hay recurrencia ni Master Theorem: se suma el costo de cada bloque.

| Bloque | Costo | Justificación |
|--------|-------|---------------|
| `Ordenar(T)` | O(n log n) | ordenamiento por comparación de las n tareas |
| `para` que calcula `maxPlazo` | O(n) | un recorrido de las n tareas |
| `para` que inicializa `R` | O(maxPlazo) | un recorrido de los `maxPlazo` instantes |
| bucle anidado | O(n · maxPlazo) | `para` externo: n vueltas (una por tarea). `mientras` interno, peor caso: retrocede desde `T[i].t` hasta 1 → hasta `maxPlazo` vueltas |

**Acotación de `maxPlazo`:** nunca se ubican más de `n` tareas, entonces los instantes mayores a `n` siempre quedan vacíos y no aportan. El `maxPlazo` efectivo es `≤ n`. Con esto:

- inicialización de `R` → O(n)
- bucle anidado → O(n²)

Sumando: `O(n log n) + O(n) + O(n) + O(n²)`. El término dominante es el bucle anidado:

**T(n) = O(n²)**

(El peor caso se da cuando todas las tareas tienen plazos grandes y los instantes se van saturando: la tarea k-ésima retrocede ~k−1 posiciones → `0 + 1 + ... + (n−1) = n(n−1)/2`.)

> Si no se acota `maxPlazo` por `n` y se lo deja como parámetro independiente `t`, la complejidad se expresa como **O(n log n + n·t)**.
