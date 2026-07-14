---
tags:
  - algoritmos
  - backtracking
---

# Backtracking

Tecnica de **busqueda exhaustiva** sobre el arbol de posibilidades de un problema, con la mejora de **podar** subarboles que no pueden contener una solucion.

Es la opcion cuando no se conoce un algoritmo eficiente y la unica salida es explorar todas las alternativas (_brute force_), pero **mejorada** con el rechazo temprano.

## Esquema general

- Todas las posibilidades se representan en un **arbol** (un grafo conexo aciclico).
- Se recorre el arbol (usualmente en profundidad).
- Hay partes del arbol que se evitan porque no pueden contener soluciones → **poda**.
- La solucion se representa como una lista ordenada $(x_1, x_2, \dots, x_n)$ donde cada $x_i$ se elige de un conjunto de candidatos.
- A veces se buscan **todas** las soluciones; a veces alcanza con una (_estado solucion_).
- A veces **no existe** ninguna solucion.

## Elementos

| Elemento | Que es |
| ---- | ----------- |
| **Arbol $T$** | Espacio de todas las posibilidades |
| **$\text{root}(T)$** | Candidato a solucion (estado actual) |
| **$\text{reject}(\text{root}(T))$** | El candidato no puede llevar a una solucion → poda |
| **$\text{solution}(\text{root}(T))$** | El candidato **es** una solucion → aceptar |
| **$\text{children}(T)$** | Subarboles correspondientes a las siguientes decisiones |

## Template generico

```
function backtrack(T)
    if reject(root(T))
        return

    if solution(root(T))
        accept(root(T))
        return

    for each child in children(T)
        backtrack(child)
```

Se llama inicialmente con `backtrack(T, root(T))`.

## Backtracking vs DP vs Greedy

| | Backtracking | DP | Greedy |
| ---- | ----------- | ----------- | ----------- |
| **Explora** | Todas las posibilidades (con poda) | Solo subproblemas relevantes | Una decision por paso |
| **Reconsidera** | Si, vuelve atras al podar | No (memoiza) | Nunca |
| **Costo** | Exponencial en peor caso | Polinomial | Polinomial |
| **Garantiza optimo** | Si (exhaustivo) | Si (si cumple optimalidad) | Solo bajo propiedad greedy |

## Cuando usar Backtracking

- El problema **no tiene** estructura de subproblemas superpuestos (DP no aplica).
- El problema **no cumple** propiedad de eleccion greedy.
- Se aceptan tiempos exponenciales en peor caso, mitigados por poda.
- Tipicos: combinatoria, busqueda de configuraciones, juegos.

## Algoritmos (catedra)

### Problemas clasicos

| Algoritmo | Problema |
| ---- | ----------- |
| [[numeros-binarios\|Numeros binarios]] | Generar todos los binarios de $n$ bits |
| [[n-damas\|n damas]] | Ubicar $n$ damas en tablero $n \times n$ sin atacarse |
| [[suma-subconjunto\|Suma de subconjunto]] | Subconjuntos de $V$ que suman $m$ |
| [[particion-partes-iguales\|Particion en partes iguales]] | Particionar coleccion en dos con misma suma |

### Busqueda en grafos

| Algoritmo | Estrategia |
| ---- | ----------- |
| [[dfs\|DFS]] | Profundidad primero (pila / recursion) |
| [[bfs\|BFS]] | Amplitud primero (cola FIFO) |
| [[ucs\|UCS]] | Costo uniforme (cola de prioridad por costo acumulado) |
| [[a-estrella\|A*]] | Costo + heuristica admisible |

### Juegos (adversariales)

| Algoritmo | Que hace |
| ---- | ----------- |
| [[min-max\|Min-Max]] | Encuentra movida optima asumiendo adversario optimo |
| [[alfa-beta\|Poda alfa-beta]] | Min-Max con poda de ramas dominadas |

### Optimizacion

| Algoritmo | Que hace |
| ---- | ----------- |
| [[branch-and-bound\|Branch and Bound]] | Backtracking con cota de costo: poda ramas peores que el mejor conocido |
