---
paradigma: simulacro-primer-parcial
ejercicio: 2
tecnica: grafos-kruskal
complejidad: O(n²)
estado: completo
---

# Ejercicio 2 — Sistema de riego (árbol de recubrimiento mínimo)

Se desea conectar `n` campos agrícolas mediante un sistema de riego. Existen posibles conexiones (tramos) entre pares de campos, cada una con un costo de inversión. El objetivo es que todos los campos queden conectados (directa o indirectamente) con el costo total mínimo.

Diseñar un algoritmo que determine cuáles son los tramos que se deben realizar.

## a) Técnica

Kruskal, usado **como caja negra** (ya definido en la síntesis de la clase, `06-arboles-recubrimiento-prim-kruskal.pdf` — no se reescribe su lógica interna). Justificación:

- Se busca conectar todos los nodos con costo mínimo, sin ciclos → árbol de recubrimiento mínimo.
- El grafo es **no dirigido** (una conexión de riego no tiene sentido de circulación, a diferencia de Dijkstra que pedía dirigido).
- El costo del tramo ya viene dado por el enunciado como dato directo → es el peso de la arista, sin necesidad de transformarlo (a diferencia del ejercicio de Colapinto, donde había que convertir velocidad a tiempo).
- Entre Kruskal y Prim no hay diferencia de salida (los dos devuelven `R: grafo solución` armado con `agregarArista`) ni de complejidad: el pseudocódigo de la síntesis para ambos arma su estructura recorriendo todos los pares de vértices (`para cada v1... para cada v2...`), así que los dos terminan en O(n²) sin importar si el grafo es disperso o denso. Elijo **Kruskal** de forma arbitraria — Prim resolvería igual de bien, con la misma complejidad.

## b) Estrategia (Greedy — Kruskal)

| Elemento               | Definición                                                                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conjunto de candidatos | Todos los tramos posibles entre campos, con su costo                                                                                                 |
| Función selección      | Elegir el tramo candidato de **menor costo**                                                                                                         |
| Función factibilidad   | El tramo es factible si sus dos campos están en subárboles distintos (si ya están conectados directa o indirectamente, se descarta — formaría ciclo) |
| Función solución       | Se evaluaron todos los tramos candidatos                                                                                                             |
| Función objetivo       | Minimizar el costo total de los tramos elegidos, conectando todos los campos                                                                         |

Armado del grafo de entrada `G`:

- **Nodos**: los campos agrícolas.
- **Aristas**: todos los tramos posibles entre pares de campos, sin filtrar ninguno (a diferencia de Colapinto, acá no hay tramos a excluir de antemano).
- **Peso de cada arista**: el costo de inversión dado directamente por el enunciado.
- **Salida de interés**: `Kruskal(G)` devuelve `R`, un **grafo solución** (no una lista de aristas suelta — así lo define el algoritmo de la síntesis: `Entrada: G: grafo de origen / Salida: R: grafo solución`) con los mismos vértices que `G` y las aristas del árbol de recubrimiento mínimo. Las aristas de `R` son directamente los tramos a realizar.

## c) Pseudocódigo

```
ALGORITMO ArmarGrafoRiego
Entrada: Campos: Vector<entero>, Tramos: Vector<Tramo>   // Tramo = (campoA, campoB, costo)
Salida: G: Grafo<real>

  G ← inicializarGrafo()
  para cada c ∈ Campos
    agregarVertice(G, c)
  fin para
  para cada t ∈ Tramos
    agregarArista(G, t.campoA, t.campoB, t.costo)   // grafo no dirigido
  fin para
  devolver G


ALGORITMO TramosRiego
Entrada: G: Grafo<real>   // ya armado con ArmarGrafoRiego
Salida: R: Grafo<real>   // arbol de recubrimiento minimo

  R ← Kruskal(G)
  devolver R
```

## d) Complejidad temporal

El algoritmo es **iterativo**, se suma el costo de cada bloque.

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `ArmarGrafoRiego` | O(n + a) | recorre los `n` campos y los `a` tramos una vez cada uno |
| `Kruskal(G)` | O(n²) | caja negra — costo ya establecido por su propia implementación (`para cada v1... para cada v2...` recorre todos los pares de vértices) |

Sumando `O(n + a) + O(n²)`, y como `a` es a lo sumo `O(n²)`, domina `Kruskal`:

**T(n) = O(n²)**
