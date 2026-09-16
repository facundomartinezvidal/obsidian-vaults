---
paradigma: integrador
ejercicio: 1
tecnica: greedy
complejidad: O(n log n)
estado: completo
---

# Ejercicio 1 — Maximizar actividades compatibles

Se tienen `n` actividades que necesitan utilizar un recurso, tal como una sala de conferencias, en exclusión mutua. Cada actividad `i` tiene asociado un tiempo de comienzo `cᵢ` y un tiempo de finalización `fᵢ` de utilización del recurso, con `cᵢ < fᵢ`. Si la actividad `i` es seleccionada se llevará a cabo durante el intervalo `[cᵢ, fᵢ)`. Las actividades `i` y `j` son compatibles si los intervalos `[cᵢ, fᵢ)` y `[cⱼ, fⱼ)` no se superponen (es decir, `cᵢ > fⱼ` o `cⱼ > fᵢ`). El problema consiste en encontrar la cantidad máxima de actividades compatibles entre sí.

## a) Técnica

Greedy: existe un criterio de selección local (menor tiempo de finalización) que se puede demostrar que lleva al óptimo global, sin necesidad de reconsiderar decisiones ya tomadas.

## b) Estrategia

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Las `n` actividades pendientes |
| Función selección | Elegir la actividad candidata con menor tiempo de finalización `f` |
| Función factibilidad | La actividad candidata es factible si su inicio `c` es mayor que el fin `últimoF` de la última actividad ya seleccionada (`c > últimoF`) |
| Función solución | Se recorrieron todas las actividades (seleccionadas o descartadas), conjunto de candidatos vacío |
| Función objetivo | Maximizar la cantidad de actividades compatibles seleccionadas |

**Por qué funciona el criterio elegido:** sea `a` la actividad de menor `f` en el conjunto de candidatos. Existe una solución óptima que contiene a `a`: si una solución óptima `O` no la contiene, sea `b` la actividad de `O` con menor `f`; como `f_a ≤ f_b`, reemplazar `b` por `a` en `O` no genera conflicto con el resto de las actividades de `O` (todas empiezan después de `f_b ≥ f_a`), y el tamaño de la solución no cambia. Por lo tanto `a` puede agregarse sin pérdida de optimalidad. Una vez fijada `a`, el problema se reduce a resolver el mismo problema sobre las actividades compatibles con `a` (mismo argumento aplicado recursivamente) ⇒ el criterio "elegir siempre la de menor `f` compatible con lo ya elegido" es óptimo.

## c) Pseudocódigo

```
ALGORITMO ActividadesCompatibles
Entrada: A: Vector<Actividad>   // Actividad = (c, f) enteros; c < f
Salida:  R: Vector<Actividad>

  Ordenar(A)                     // ascendente por f
  ultimoF ← 0

  para i = 0 hasta longitud(A)-1
    si A[i].c > ultimoF
      ultimoF ← A[i].f
      R.append(A[i])
    fin si
  fin para

  devolver R
```

## d) Complejidad temporal

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Ordenar(A)` | O(n log n) | ordenamiento (mergesort) de las n actividades por `f` |
| `para` que recorre A | O(n) | un recorrido de las n actividades |

`O(n log n) + O(n)` → domina el ordenamiento:

**T(n) = O(n log n)**
