---
tags:
  - algoritmos
  - greedy
---

# Greedy (algoritmos voraces)

Tecnica de diseño que construye la solucion a partir de **decisiones parciales** basadas en la informacion disponible en el momento. No considera los efectos de sus decisiones en el futuro y **nunca reconsidera** una decision ya tomada.

Se usa para problemas de **optimizacion** (maximizar o minimizar una magnitud). Son muy eficientes, pero hay que **demostrar formalmente su correccion**: el criterio local no siempre lleva al optimo global. Como dice la catedra: son "cortos de vista".

> [!important] Cuando funciona Greedy
> Solo si el problema cumple la **propiedad de eleccion greedy**: una solucion optima global se puede construir tomando la mejor decision local en cada paso. Si no se cumple, hay que usar [[programacion-dinamica|Programacion Dinamica]] o [[../backtracking/backtracking|Backtracking]].

## Los 5 elementos de un algoritmo Greedy

| Elemento | Que es |
| ---- | ----------- |
| **Conjunto de candidatos** | Objetos disponibles para incluir en la solucion |
| **Funcion de seleccion** | Criterio para elegir el mejor candidato |
| **Funcion de factibilidad** | Verifica si un candidato puede incluirse sin romper la solucion |
| **Funcion solucion** | Verifica si el conjunto actual resuelve el problema |
| **Objetivo** | Magnitud a maximizar o minimizar |

## Template generico

```
function greedy(candidates)
    solution = empty

    while candidates not empty and not isSolution(solution)
        x = select(candidates)
        candidates = candidates - {x}

        if feasible(solution + {x})
            solution = solution + {x}

    if isSolution(solution)
        return solution
    return null
```

## Greedy vs Divide & Conquer vs DP

| | Divide & Conquer | Programacion Dinamica | Greedy |
| ---- | ----------- | ----------- | ----------- |
| **Subproblemas** | Independientes | Se superponen | No descompone |
| **Estrategia** | Top-down recursivo | Bottom-up con tabla | Iterativo, elige el mejor local |
| **Reconsidera** | No aplica | Explora todas las opciones | **Nunca** reconsidera |
| **Optimo** | Si | Si (si cumple optimalidad) | Solo si cumple propiedad greedy |

## Cuidado: el criterio local no siempre da el optimo

Mismo criterio greedy ("agarrar la moneda mas grande que entra") funciona en un sistema monetario pero falla en otro:

- **Thurgau (Suiza)** — denominaciones $\{500, 200, 100, 50, 20, 10, 5, 1\}$ centavos → greedy da **optimo**.
- **Loch Ness pre-1971** — sistema raro (libra, corona, media corona, florin, chelin, 6/3/1 peniques) → greedy **no es optimo**. Para pagar 1£ 48p greedy usa 4 monedas, el optimo es 3 (1£ + 2 florines).

Ver [[cambio|Problema del Cambio]] para el detalle.

## Algoritmos

| Algoritmo | Problema | Complejidad |
| ---- | ----------- | ----------- |
| [[cambio\|Cambio de monedas]] | Min monedas para pagar V | $\Theta(v)$ |
| [[mochila-fraccionaria\|Mochila fraccionaria]] | Max valor con peso limite | $\Theta(n \log n)$ |
| [[huffman\|Codigo de Huffman]] | Compresion optima por frecuencias | $O(n \log n)$ |
| [[matrimonios-estables\|Matrimonios estables]] | Emparejamiento estable (Gale-Shapley) | $O(n^2)$ |
| [[dijkstra\|Dijkstra]] | Caminos minimos desde un origen | $O(n^2)$ |
| [[prim\|Prim]] | Arbol de recubrimiento minimo (MST) | $O(n^2)$ |
| [[kruskal\|Kruskal]] | Arbol de recubrimiento minimo (MST) | $O(\|E\| \log \|E\|)$ |
