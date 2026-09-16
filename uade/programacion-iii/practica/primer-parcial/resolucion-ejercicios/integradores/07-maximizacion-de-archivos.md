---
paradigma: integrador
ejercicio: 7
tecnica: greedy
complejidad: O(n log n)
estado: completo
---

# Ejercicio 7 — Maximización de archivos

Sean `n` programas `P1, ..., Pn` que hay que almacenar en un disco. El programa `Pi` requiere `Si` GB de espacio y la capacidad del disco es `D` GB. Realizar un algoritmo que maximice la cantidad de archivos a guardar en el disco.

## a) Técnica

Greedy: maximizar la *cantidad* de programas guardados (no un valor asociado) sujeto a una única restricción de capacidad se resuelve óptimo eligiendo siempre el programa más chico disponible que todavía entra.

## b) Estrategia

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Conjunto de n programas |
| Función selección | Seleccionar los programas con menor tamaño |
| Función factibilidad | Verificar que el programa seleccionado más la suma acumulada de peso no supere la capacidad del disco |
| Función solución | Se recorrieron todos los programas, o el siguiente programa ya no entra en el espacio que queda del disco |
| Función objetivo | Maximizar la cantidad de archivos a guardar en el disco |

**Por qué funciona el criterio elegido:** sea `S` una solución óptima que no elige el programa `a` de menor tamaño, pudiendo hacerlo (`a` entra en el espacio libre de `S`). Si `S` no incluye a `a`, o bien le sobra espacio para agregarlo (entonces `S` no era óptima, se le puede sumar `a` y mejorarla), o bien eligió en su lugar algún programa `b` de tamaño mayor o igual (`tamaño(b) ≥ tamaño(a)`, porque `a` es el más chico disponible). Cambiar `b` por `a` en `S` no aumenta el espacio usado (como mucho lo reduce, porque `tamaño(a) ≤ tamaño(b)`) y mantiene la misma cantidad de programas — nunca empeora, y puede liberar espacio para sumar otro más. Por lo tanto siempre existe una solución óptima que incluye al programa más chico, y el mismo argumento se repite sobre los programas restantes ⇒ elegir siempre el de menor tamaño que todavía entra es óptimo.

## c) Pseudocódigo

```
ALGORITMO MaximizarArchivo
Entrada: P: Vector<Programa>, capacidadDisco: entero
Salida: S: Vector<Programa>

Ordenar(P) //ordenamos de manera ascendente por peso del programa, MergeSort
S <- []
pesoAcumulado <- 0
i <- 0
mientras i < longitud(P) & pesoAcumulado + P[i].peso <= capacidadDisco
	pesoAcumulado <- pesoAcumulado + P[i].peso
	S.append(P[i])
	i <- i + 1
fin mientras

devolver S
```

## d) Complejidad temporal

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Ordenar(P)` | O(n log n) | ordenamiento (mergesort) de los n programas por tamaño |
| `mientras` | O(n) | en el peor caso recorre los n programas una vez |

`O(n log n) + O(n)` → domina el ordenamiento:

**T(n) = O(n log n)**
