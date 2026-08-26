---
paradigma: greedy
ejercicio: 2
complejidad: O(n log n)
---

# Ejercicio 2 — Minimizar tiempo de espera

Un procesador debe atender `n` procesos. Se conoce de antemano el tiempo `tᵢ` que necesita cada uno. Determinar en qué orden atenderlos para minimizar la suma de los tiempos que los procesos están en el sistema (espera + ejecución).

Ejemplo `n = 3`, tiempos `(5, 10, 3)`: el orden `p3, p1, p2` da `3 + (3+5) + (3+5+10) = 29`, que es el mínimo.

## a) Estrategia (Greedy)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Los `n` procesos, cada uno con su tiempo de ejecución `tᵢ` |
| Función selección | Elegir el proceso pendiente de **menor** tiempo de ejecución |
| Función factibilidad | Siempre verdadera: cualquier proceso pendiente puede agregarse a la secuencia, no hay ninguna restricción que violar |
| Función solución | Todos los procesos ya están en la secuencia (conjunto de candidatos vacío) |
| Función objetivo | Minimizar `T = Σ_{k=1}^{n} (n − k + 1)·t₍ₖ₎`, la suma de los tiempos de finalización |

**Por qué el menor primero:** si se atiende en el orden `p₍₁₎, …, p₍ₙ₎`, el tiempo de finalización del `k`-ésimo es `F_k = Σ_{j=1}^{k} t₍ⱼ₎`. En la suma total `T = Σ F_k`, el tiempo `t₍ₖ₎` aparece `(n − k + 1)` veces: el primero pesa `n`, el último pesa `1`. Para minimizar, el tiempo más chico va en la posición de mayor peso ⇒ orden ascendente por `tᵢ`.

## b) Pseudocódigo

```
ALGORITMO MINIMIZAR_TIEMPO_ESPERA
Entrada: P: Vector<Proceso>   // Proceso = (id, t) enteros; t > 0
Salida:  R: Vector<entero>    // R[k] = id del proceso atendido en la posición k

  Ordenar(P)                  // por tiempo t, de menor a mayor

  para k = 1 hasta n
    R[k] ← P[k].id
  fin para

  devolver R
```

Notas:

- El `id` hace falta porque `Ordenar(P)` cambia las posiciones: después del ordenamiento, `P[k]` ya no es el proceso `k` original.
- No hay `si esFactible(...)`: la función factibilidad es siempre verdadera, así que el candidato se agrega directo.
- El `para` que copia a `R` se podría omitir devolviendo `P` ordenado; se deja para respetar la firma `Salida: Vector<entero>`.
- Si el enunciado pidiera además el valor mínimo `T`, se agrega un `para` que acumula `Σ Fₖ` recorriendo `P` ya ordenado.

## c) Complejidad temporal

Algoritmo iterativo, se suma el costo de cada bloque:

| Bloque | Costo | Justificación |
|--------|-------|---------------|
| `Ordenar(P)` | O(n log n) | ordenamiento por comparación de los n procesos |
| `para` que copia a `R` | O(n) | un recorrido de los n procesos |

`O(n log n) + O(n)` → domina el ordenamiento:

**T(n) = O(n log n)**
