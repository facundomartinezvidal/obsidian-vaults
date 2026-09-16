---
paradigma: greedy
ejercicio: 4
complejidad: O(n log n)
estado: completo
---

# Ejercicio 4 — Problema del mecánico

Un mecánico debe llevar a cabo `n` reparaciones urgentes, conociendo el tiempo que le va a llevar cada una (la tarea `i`-ésima tarda `tᵢ` minutos). El pago depende del nivel de satisfacción del cliente, así que hay que decidir el orden de atención para minimizar el **tiempo medio de espera**. Si `Eᵢ` es lo que espera el cliente `i`-ésimo hasta que termina su reparación, hay que minimizar:

```
T(n) = Σ Eᵢ   (i = 1 hasta n)
```

Es el mismo problema que [[02-minimizar-tiempo-espera]] (minimizar tiempo de espera de procesos): "reparación" ↔ "proceso", `tᵢ` = tiempo de reparación ↔ tiempo de ejecución, `Eᵢ` ↔ tiempo de finalización. Isomorfo, mismo criterio y misma complejidad.

## a) Estrategia (Greedy)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Las `n` reparaciones pendientes, cada una con su tiempo `tᵢ` |
| Función selección | Elegir la reparación pendiente de **menor** tiempo `tᵢ` |
| Función factibilidad | Siempre verdadera: cualquier reparación pendiente puede agregarse a la secuencia, no hay restricción que violar |
| Función solución | Todas las reparaciones ya están en la secuencia (conjunto de candidatos vacío) |
| Función objetivo | Minimizar `T(n) = Σ Eᵢ`, la suma de los tiempos de espera de los clientes |

**Por qué funciona el criterio elegido:** si se atienden en el orden `r₍₁₎, …, r₍ₙ₎`, el cliente `k`-ésimo espera `E_k = Σ_{j=1}^{k} t₍ⱼ₎` (todo lo que tardan las reparaciones atendidas antes de la suya, más la propia). En la suma total `Σ Eₖ`, el tiempo `t₍ₖ₎` aparece `(n − k + 1)` veces: el de la primera reparación pesa `n`, el de la última pesa `1`. Para minimizar la suma, el tiempo más chico tiene que ir en la posición de mayor peso ⇒ orden ascendente por `tᵢ`.

## b) Pseudocódigo

```
ALGORITMO PLANIFICAR_REPARACIONES
Entrada: R: Vector<Reparacion>   // Reparacion = (id, t) enteros; t > 0
Salida:  S: Vector<entero>       // S[k] = id de la reparación atendida en la posición k

  Ordenar(R)                     // por tiempo t, de menor a mayor

  para k = 1 hasta n
    S[k] ← R[k].id
  fin para

  devolver S
```

Notas:

- El `id` hace falta porque `Ordenar(R)` cambia las posiciones: después de ordenar, `R[k]` ya no es la reparación `k` original.
- No hay `si esFactible(...)`: la función factibilidad es siempre verdadera, el candidato se agrega directo.
- Si el enunciado pidiera además el valor de `T(n)`, se agrega un `para` que acumula `Σ Eₖ` recorriendo `R` ya ordenado.

## c) Complejidad temporal

| Bloque | Costo | Justificación |
|--------|-------|---------------|
| `Ordenar(R)` | O(n log n) | ordenamiento por comparación de las n reparaciones |
| `para` que copia a `S` | O(n) | un recorrido de las n reparaciones |

`O(n log n) + O(n)` → domina el ordenamiento:

**T(n) = O(n log n)**
