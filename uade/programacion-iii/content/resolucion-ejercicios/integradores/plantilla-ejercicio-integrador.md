---
paradigma: integrador
ejercicio: 8
tecnica: grafos-dijkstra
complejidad: O(n²)
estado: completo
---

# Ejercicio 8 — Tiempo mínimo Colapinto (F1 Mónaco)

Temporada de Fórmula 1, Gran Premio de Mónaco. Durante las prácticas libres, distintos sectores del trazado urbano quedaron comprometidos por manchas de aceite, piezas sueltas de carbono y áreas donde se realizan reparaciones, razón por la cual los oficiales restringen el paso de los autos. Franco Colapinto, quien debe completar una vuelta impecable desde los boxes hasta la línea de cronometraje para ajustar la telemetría del Williams, corre el riesgo de perder rendimiento o dañar el monoplaza si atraviesa uno de esos sectores.

Los datos que se tienen del circuito son los distintos puntos que lo conforman (curvas, chicanas, túneles, rectas y boxes) y entre cuáles de ellos se conectan. En esas conexiones o tramos se indican como sectores críticos por los comisarios, y Colapinto debería esquivarlos. En cada tramo se indica la velocidad máxima que puede alcanzar con su Williams.

Diseñar un algoritmo que determine el tiempo mínimo que le llevará a Colapinto ir entre boxes y la línea de cronometraje, si él evitara los tramos marcados como sectores críticos.

## a) Técnica

Dijkstra, usado **como caja negra** (ya definido en la síntesis de la clase, `05-grafos-dirigidos-dijkstra.pdf` — no se reescribe su lógica interna). Justificación de por qué aplica:

- Se busca el costo (tiempo) mínimo desde un nodo origen (boxes) a otro nodo puntual (línea de cronometraje) → problema de camino mínimo.
- Se modela el circuito como grafo **dirigido**: los autos circulan en un único sentido durante la vuelta — esto es una decisión de modelado nuestra, el enunciado no lo dice explícito, pero tiene sentido dado el contexto (carrera).
- Dijkstra requiere pesos positivos — se cumple, ver cálculo del peso abajo (una velocidad máxima siempre es positiva).

## b) Estrategia

No hace falta redefinir candidatos/selección/factibilidad/solución/objetivo de Dijkstra — son los mismos de la síntesis de la clase. Lo propio de este ejercicio es armar bien el grafo `G` de entrada:

- **Nodos**: los puntos del circuito (curvas, chicanas, túneles, rectas, boxes, línea de cronometraje).
- **Aristas**: los tramos entre esos puntos, **excluyendo** los marcados como sectores críticos (no forman parte de `G`).
- **Peso de cada arista**: el enunciado da velocidad máxima por tramo, no tiempo ni distancia. Como no se da la longitud de cada tramo, asumimos que todos los tramos tienen la misma longitud `d` (una unidad de distancia). Con eso, `tiempo(tramo) = d / velocidadMáxima(tramo)` — tomando `d=1`, el peso de cada arista queda `1 / velocidadMáxima(tramo)`. Cuanto mayor la velocidad permitida, menor el tiempo del tramo (tiene sentido físico), y el peso siempre es positivo (precondición de Dijkstra).
- **Origen**: el nodo boxes.
- **Nodo de interés**: la línea de cronometraje — de la salida de Dijkstra (que trae el costo a todos los nodos) solo se usa ese valor puntual.

## c) Pseudocódigo

```
ALGORITMO ArmarGrafoCircuito
Entrada: Puntos: Vector<entero>, Tramos: Vector<Tramo>   // Tramo = (origen, destino, velocidadMaxima, esCritico)
Salida: G: Grafo<real>

  G <- inicializarGrafo()
  para cada p ∈ Puntos
    agregarVertice(G, p)
  fin para
  para cada t ∈ Tramos
    si NO t.esCritico
      agregarArista(G, t.origen, t.destino, 1 / t.velocidadMaxima)
    fin si
  fin para
  devolver G


ALGORITMO TiempoMinimoColapinto
Entrada: G: Grafo<real>   // ya armado con ArmarGrafoCircuito
Salida: real

  A <- Dijkstra(G, boxes)
  devolver pesoArista(A, boxes, lineaDeCronometraje)
```

## d) Complejidad temporal

| Bloque | Costo | Justificación |
|--------|-------|----------------|
| `ArmarGrafoCircuito` | O(n + a) | recorre los `n` puntos una vez y los `a` tramos una vez, costo constante por cada uno |
| `Dijkstra(G, boxes)` | O(n²) | complejidad ya establecida para el algoritmo (dos ciclos anidados sobre la cantidad de vértices) |
| `pesoArista(A, boxes, lineaDeCronometraje)` | O(1) | lectura directa de una arista ya calculada |

`O(n + a) + O(n²) + O(1)` → como `a` (cantidad de tramos) es a lo sumo `O(n²)` (grafo denso), domina Dijkstra:

**T(n) = O(n²)**
