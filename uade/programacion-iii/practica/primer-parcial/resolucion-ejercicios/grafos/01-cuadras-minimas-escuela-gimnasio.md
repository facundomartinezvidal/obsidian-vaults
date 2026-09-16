---
paradigma: grafos
ejercicio: 1
tecnica: dijkstra
complejidad: O(n²)
estado: completo
---

# Ejercicio 1 (guía) — Cuadras mínimas entre escuela y gimnasio

Dado un grafo `G` dirigido, cuyos nodos representan las escuelas y gimnasios de un barrio en forma numérica, y sus aristas la distancia en cuadras para llegar entre los diferentes lugares representados en el grafo. Determinar cuántas son las cuadras mínimas para llegar de la escuela `X` al gimnasio `Y` (ambos puntos están representados en el grafo).

## a) Técnica

Dijkstra: es exactamente el problema que resuelve — costo del camino mínimo desde un nodo origen a los demás, en un grafo dirigido con pesos positivos (una distancia en cuadras no puede ser negativa). Acá se usa **Dijkstra como caja negra**: ya está resuelto y definido por la cátedra (ver `05-grafos-dirigidos-dijkstra.pdf`), no hace falta redefinir ni reescribir su lógica interna — el aporte propio de este ejercicio es solamente identificar qué llamarle y qué parte de su resultado usar.

## b) Estrategia

No hace falta redefinir candidatos/selección/factibilidad/solución/objetivo — son los mismos que ya están fijados en la síntesis de Dijkstra dada en clase. Lo único propio de este ejercicio:

- El grafo `G` ya viene armado por el enunciado (nodos = escuelas/gimnasios, aristas = distancia en cuadras) — no hay que construirlo.
- El nodo origen es la escuela `X`.
- De la salida de Dijkstra (que trae el costo mínimo a **todos** los nodos) solo nos interesa el costo hacia el nodo `Y` (el gimnasio).

## c) Pseudocódigo

```
ALGORITMO CuadrasMinimas
Entrada: G: Grafo<entero>, X: entero, Y: entero
Salida: entero

  A <- Dijkstra(G, X)
  devolver pesoArista(A, X, Y)
```

`Dijkstra(G, X)` es el algoritmo ya definido en clase (Paso 1/2/3, ver apunte) — se usa tal cual, sin modificar nada. `A` es el grafo resultado que trae, para cada nodo, el costo del camino mínimo desde `X`; `pesoArista(A, X, Y)` es simplemente leer ese costo para el nodo `Y` en particular.

## d) Complejidad temporal

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `Dijkstra(G, X)` | O(n²) | complejidad ya establecida para el algoritmo (dos ciclos anidados sobre la cantidad de vértices) |
| `pesoArista(A, X, Y)` | O(1) | lectura directa de una arista ya calculada |

`O(n²) + O(1)` → domina Dijkstra:

**T(n) = O(n²)**
