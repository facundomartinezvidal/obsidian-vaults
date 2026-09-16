---
paradigma: greedy
ejercicio: 2
complejidad: O(n log n)
estado: completo
---

# Ejercicio 3 — Mezclado de cintas

Dado un conjunto de `n` cintas con `nᵢ` registros ordenados cada una, se quieren mezclar de a pares hasta lograr una única cinta ordenada. La secuencia en la que se hace la mezcla determina la eficiencia del proceso (mezclar dos cintas de tamaño `a` y `b` cuesta `a + b` movimientos). Diseñar un algoritmo que busque la solución óptima minimizando el número total de movimientos.

Ejemplo: cintas A (30), B (20), C (10).
- Opción A: mezclar A con B (50 mov.) y el resultado con C (60 mov.) → total 110.
- Opción B: mezclar C con B (30 mov.) y el resultado con A (60 mov.) → total 90 (mejor).

## a) Estrategia (Greedy)

<!-- Completar la tabla. Pensar: ¿qué es un "candidato" acá? ¿cuál es el criterio de selección en cada paso? ¿cuándo termina el algoritmo? -->

| Elemento               | Definición                               |
| ---------------------- | ---------------------------------------- |
| Conjunto de candidatos | las cintas pendientes de fusionar (empieza con las `n` originales; en cada paso se sacan dos y entra la cinta resultante de fusionarlas) |
| Función selección      | elegir las dos cintas de **menor tamaño** (cantidad de registros) |
| Función factibilidad   | no hay: cualquier par de cintas pendientes se puede fusionar |
| Función solución       | queda una sola cinta                     |
| Función objetivo       | minimizar la cantidad total de movimientos |

**Por qué funciona el criterio elegido:** cada registro se mueve una vez por cada fusión en la que participa (directa o indirectamente) su cinta. Una cinta fusionada temprano queda "arrastrada" en todas las fusiones posteriores, mientras que una fusionada al final solo se mueve una vez. Por eso conviene que sean las cintas **más chicas** las que se fusionen primero: así el costo de moverse muchas veces recae sobre pocos registros (los de las cintas chicas) y no sobre los de las cintas grandes.

## b) Pseudocódigo

<!-- Seguir la convención de la cátedra: ALGORITMO NOMBRE, Entrada/Salida tipadas, ← para asignar, = para comparar,
     si/sino/fin si, mientras/fin mientras, para/fin para, devolver, comentarios con //, todo en español.
     Pista de estructura de datos: para elegir repetidamente "las dos cintas más chicas" de forma eficiente,
     ¿qué estructura de datos ya conocés que te resuelve eso en O(log n) por operación? -->

```
ALGORITMO MEZCLAR_CINTAS
Entrada: cintas Conjunto<Cinta>
Salida: c Cinta
	ColaPrioridad Q <-- iniColaPrioridad(cintas)
	n <-- longitud(Q) 
	para i=1 hasta n-1
		x <-- sacarMinimo(Q)
		y <-- sacarMinimo(Q)
		nodo <-- iniNodo(x, y)
		setPesoNodo(nodo, x.peso + y.peso)
		insertColaPrioridad(Q, nodo)
	fin para
	Cinta c <-- sacarMinimo(Q)
	devolver c

```

## c) Complejidad temporal

<!-- Descomponer en bloques (como en greedy-02): construcción de la estructura de datos elegida,
     costo de cada extracción/inserción, cuántas veces se repite el bucle principal. -->

| Bloque                        | Costo        | Justificación |
| ----------------------------- | ------------ | ------------- |
| `iniColaPrioridad(cintas)`    | O(n log n)   | construir el heap insertando las n cintas iniciales (o O(n) si se usa build-heap, según implementación) |
| `longitud(Q)`                 | O(1)         | lectura directa del tamaño |
| bucle `para i = 1 hasta n-1`  | n − 1 veces  | una fusión menos que la cantidad de cintas: cada vuelta reduce el heap en 1 |
| `sacarMinimo(Q)` (x2) + `insertColaPrioridad` por vuelta | O(log n) | cada operación de heap cuesta O(log n); son 3 operaciones por vuelta, constante no afecta el orden |

Costo total: `O(n log n)` (construcción) + `(n-1) · O(log n)` (bucle) = `O(n log n) + O(n log n)` → domina el mismo orden.

**T(n) = O(n log n)**
