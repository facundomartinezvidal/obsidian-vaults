---
paradigma: grafos
ejercicio: 2
complejidad: O(n²)
estado: completo
---

# Ejercicio 2 — Ciudades alcanzables con escala (Dijkstra)

Dado un GrafoTDA `G` dirigido, cuyos nodos representan la ciudad de Buenos Aires y las ciudades capitales de las provincias de la Argentina, y las aristas entre esos nodos los tiempos de vuelo entre las ciudades. Determinar cuáles ciudades conviene ser alcanzadas desde la ciudad de Buenos Aires a través de otra ciudad, y no en forma directa. Suponer que el tiempo de demora de aterrizaje es despreciable.

## a) Algoritmo a aplicar

Se aplica **Dijkstra**: el grafo es dirigido, todas las aristas tienen peso positivo (tiempos de vuelo) y se busca el camino de costo mínimo desde **un único origen** (Buenos Aires) hacia todos los demás nodos — exactamente el problema que resuelve Dijkstra.

| Elemento | Definición |
| --- | --- |
| Conjunto de candidatos | las ciudades del grafo, excepto Buenos Aires (el origen) |
| Función selección | en cada iteración, la ciudad pendiente con menor costo acumulado desde Buenos Aires; se marca como visitada y su costo queda confirmado como mínimo |
| Función factibilidad | comparar si pasar por la ciudad seleccionada mejora el costo ya conocido (directo o no) hacia cada ciudad pendiente |
| Función solución | haber procesado todas las ciudades candidatas |
| Función objetivo | grafo con el costo del camino mínimo desde Buenos Aires a cada una de las demás ciudades |

Una vez obtenido ese grafo de costos mínimos, una ciudad `p` **conviene alcanzarla con escala** cuando el costo mínimo hallado es menor que el vuelo directo BA→p (o cuando ni siquiera existe vuelo directo pero sí hay camino).

## b) Pseudocódigo

```
ALGORITMO CONVIENE_CON_ESCALA
Entrada: G Grafo<entero>, origen entero
Salida: Vector<Par<entero, cadena>> resultado
    Grafo<entero> A ← DIJKSTRA(G, origen)
    Vector<Par<entero, cadena>> resultado
    para cada p ∈ Vertices(G) \ {origen}
        si existeArista(G, origen, p)
            directo ← pesoArista(G, origen, p)
            optimo ← pesoArista(A, origen, p)
            si directo > optimo
                agregar(resultado, (p, "conviene con escala"))
            sino
                agregar(resultado, (p, "conviene directo"))
            fin si
        sino
            si existeArista(A, origen, p)
                agregar(resultado, (p, "conviene con escala"))
            sino
                agregar(resultado, (p, "no existe camino"))
            fin si
        fin si
    fin para
    devolver resultado
```

**Nota:** `optimo` nunca puede ser mayor que `directo`, porque el vuelo directo ya es en sí mismo un camino candidato que Dijkstra tuvo en cuenta. Por eso la comparación `directo > optimo` alcanza para detectar la mejora: si son iguales, el directo ya era el óptimo; si `optimo` es menor, es porque el camino mínimo pasó por otra ciudad.

## c) Complejidad temporal

| Bloque | Costo | Justificación |
| --- | --- | --- |
| `DIJKSTRA(G, origen)` | O(n²) | dos `mientras` anidados que iteran O(n) veces cada uno, con operaciones de grafo en O(1) (grafo representado con matriz de adyacencia) |
| `para cada p ∈ Vertices(G) \ {origen}` | O(n) | recorre una vez cada ciudad, con `existeArista`/`pesoArista` en O(1) |

Costo total: `O(n²)` (Dijkstra) + `O(n)` (comparación final) → domina `O(n²)`.

**T(n) = O(n²)**, siendo `n` la cantidad de ciudades (Buenos Aires + capitales de provincia).
