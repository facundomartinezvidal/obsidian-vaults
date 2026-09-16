---
paradigma: integrador
ejercicio: 5
tecnica: greedy
complejidad: O(n log n)
estado: completo
---

# Ejercicio 5 — Salón de convenciones

Durante un sábado un salón de convenciones tiene muchos pedidos para hacer distintas actividades en su única sala. Cada una de esas actividades le cobra al público y por consiguiente tiene una recaudación mayor o menor dependiendo de la calidad de esta, aunque el teatro recibe un pago único por cada actividad, independientemente de la recaudación y duración. Cada actividad tiene un horario de comienzo y de finalización que se debe respetar. El horario de trabajo del salón es de 8hrs a 20hrs en forma corrida. Diseñar un algoritmo que seleccione cuáles actividades aceptar para ese sábado, maximizando la ganancia del salón, y teniendo en cuenta que las actividades no se pueden superponer.

## a) Técnica

Greedy: el salón cobra lo mismo por actividad sin importar su recaudación o duración, así que maximizar la ganancia del salón es lo mismo que maximizar la **cantidad** de actividades aceptadas sin que se superpongan — mismo problema que el ejercicio 1 ([[01-maximizar-actividades-compatibles]]), con otro nombre.

## b) Estrategia

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Conjunto de actividades |
| Función selección | Seleccionar la actividad con menor hora de finalización |
| Función factibilidad | Verificar que la hora de comienzo y la hora de finalización de la actividad estén dentro del horario en que está abierto el local. También verificar que la hora de comienzo de la actividad candidata sea mayor o igual al **fin** de la última actividad ya aceptada |
| Función solución | Todas las actividades se hayan recorrido, o hasta que superen el plazo de cierre del local |
| Función objetivo | Maximizar las ganancias |

**Por qué funciona el criterio elegido:** como el salón cobra lo mismo por actividad, maximizar la ganancia equivale a maximizar la cantidad de actividades aceptadas — mismo problema que [[01-maximizar-actividades-compatibles]], con la restricción extra de que toda actividad debe caer dentro de `[inicio, fin]` (horario del local). Esa restricción no cambia el argumento: sea `a` la actividad factible (dentro del horario) de menor `f` entre las candidatas. Si una solución óptima no la incluye pudiendo hacerlo, reemplazar por `a` cualquier otra actividad que sí eligió en su lugar (que tiene `f` mayor o igual) no aumenta el tiempo ocupado y dentro del horario sigue siendo factible, así que nunca empeora. Repitiendo el argumento sobre las actividades restantes, ordenar por `f` ascendente y aceptar toda la que sea compatible con la última aceptada y entre en el horario es óptimo.

## c) Pseudocódigo

```
ALGORITMO SeleccionarActividadesSalon
Entrada: A: Vector<Actividad>, inicio: entero, fin: entero
Salida: S: Vector<Actividad>

  Ordenar(A)                     // ascendente por hora de finalización
  ultimoF <- inicio
  S <- []
  i <- 0
  continuar <- verdadero

  mientras i < longitud(A) & continuar
    si A[i].f > fin
      continuar <- falso
    sino
      si A[i].c >= inicio & A[i].c >= ultimoF
        S.append(A[i])
        ultimoF <- A[i].f
      fin si
      i <- i + 1
    fin si
  fin mientras

  devolver S
```

## d) Complejidad temporal

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Ordenar(A)` | O(n log n) | ordenamiento (mergesort) de las n actividades por `f` |
| `mientras` | O(n) | en el peor caso recorre las n actividades una vez (con el corte por `flag`, puede terminar antes) |

`O(n log n) + O(n)` → domina el ordenamiento:

**T(n) = O(n log n)**
