---
paradigma: simulacro-primer-parcial
ejercicio: 4
tecnica: grafos-kruskal
complejidad: O(n²)
estado: completo
---

# Ejercicio 4 — Cooperativa agrícola (árbol de recubrimiento mínimo)

Una cooperativa agrícola posee `n` parcelas. Existe la posibilidad de construir canales de riego entre pares de parcelas, cada uno con un costo de construcción. La cooperativa necesita garantizar que todas las parcelas puedan recibir agua desde cualquier otra (directa o indirectamente) con costo total de construcción mínimo.

Diseñar un algoritmo que determine cuáles son los tramos de canales que se deben construir.

## a) Técnica

Kruskal o Prim, usado **como caja negra** (síntesis de la clase, `06-arboles-recubrimiento-prim-kruskal.pdf`). Justificación:

- Se busca conectar todas las parcelas con costo mínimo, sin ciclos → árbol de recubrimiento mínimo.
- Grafo **no dirigido** (un canal de riego no tiene sentido de circulación única).
- El costo del canal viene dado directo por el enunciado → es el peso de la arista, sin transformar.
- Entre Kruskal y Prim no hay una razón de complejidad para elegir uno u otro acá: el pseudocódigo de la síntesis para **ambos** arma su cola/estructura recorriendo todos los pares de vértices (`para cada v1... para cada v2...`), así que los dos terminan en O(n²) sin importar si el grafo es disperso o denso (a diferencia de las versiones de libro optimizadas con union-find o colas de prioridad sobre aristas). Elijo **Kruskal** de forma arbitraria — Prim resolvería con la misma complejidad.

## b) Estrategia (Greedy — Kruskal)

| Elemento | Definición |
|----------|------------|
| Conjunto de candidatos | Todos los canales posibles entre parcelas, con su costo |
| Función selección | Elegir el canal candidato de **menor costo** |
| Función factibilidad | El canal es factible si sus dos parcelas están en subárboles distintos (si ya están conectadas directa o indirectamente, se descarta — formaría ciclo) |
| Función solución | Se evaluaron todos los canales candidatos |
| Función objetivo | Minimizar el costo total de los canales elegidos, conectando todas las parcelas |

Armado del grafo de entrada `G`:

- **Nodos**: las parcelas.
- **Aristas**: todos los canales posibles entre pares de parcelas.
- **Peso de cada arista**: el costo de construcción dado por el enunciado.
- **Salida de interés**: `Kruskal(G)` devuelve `R: grafo solución` con las aristas del árbol de recubrimiento mínimo — esos son los canales a construir.

## c) Pseudocódigo

```
ALGORITMO COOPERATIVA
Entrada: P: Vector<Parcela>, C: Vector<Canal>   // Canal = (tramoA, tramoB, peso)
Salida: G': Grafo<real>

  G <- inicializarGrafo()
  para i = 1 hasta longitud(P)
    agregarVertice(G, P[i])
  fin para

  para i = 1 hasta longitud(C)
    agregarArista(G, C[i].tramoA, C[i].tramoB, C[i].peso)
  fin para

  G' <- Kruskal(G)

  devolver G'
```
## d) Complejidad temporal

El algoritmo es **iterativo**, se suma el costo de cada bloque.

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `para` que arma vértices de `G` | O(n) | una vuelta por parcela |
| `para` que arma aristas de `G` | O(a) | una vuelta por canal, `a ≤ n²` |
| `Kruskal(G)` | O(n²) | caja negra — costo ya establecido por su propia implementación (`para cada v1... para cada v2...` recorre todos los pares de vértices) |

Sumando `O(n) + O(a) + O(n²)`, y como `a` es a lo sumo `O(n²)`, domina `Kruskal`:

**T(n) = O(n²)**
