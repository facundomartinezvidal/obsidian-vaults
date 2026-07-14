---
tags:
  - algoritmos
  - backtracking
  - juegos
---

# Algoritmo Min-Max

Tecnica de backtracking para encontrar la **mejor movida** en un juego de **dos jugadores, suma cero, informacion perfecta** (ajedrez, ta-te-ti, otelo).

Asume que ambos jugadores juegan **optimamente**:
- El jugador **MAX** intenta **maximizar** el puntaje.
- El jugador **MIN** intenta **minimizarlo**.

## Idea

Se construye un **arbol de juego** alternando niveles MAX y MIN:
- Las **hojas** son estados terminales (victoria, derrota, empate) o se llega a una profundidad maxima y se aplica una funcion de evaluacion $h$.
- Los nodos **internos** propagan el valor:
  - Nodo MAX → toma el **maximo** de los hijos.
  - Nodo MIN → toma el **minimo** de los hijos.

La movida elegida desde la raiz es la que conduce al hijo con mejor valor para MAX.

## Algoritmo

```
function minMax(state, depth, maximizingPlayer)
    if depth == 0 or isTerminal(state)
        return evaluate(state)

    if maximizingPlayer
        best = -infinito
        for each move in legalMoves(state)
            child = applyMove(state, move)
            value = minMax(child, depth - 1, false)
            best = max(best, value)
        return best
    else
        best = +infinito
        for each move in legalMoves(state)
            child = applyMove(state, move)
            value = minMax(child, depth - 1, true)
            best = min(best, value)
        return best
```

Para obtener **la movida** (no solo el valor) se modifica la funcion para devolver tambien la jugada que produjo el mejor valor.

## Funcion de evaluacion

Cuando no se puede llegar a hojas terminales (arboles enormes), se corta a profundidad fija y se aplica una **heuristica** $h$ que estima que tan bueno es el estado.

Ejemplo ta-te-ti: $h = (\text{lineas abiertas para MAX}) - (\text{lineas abiertas para MIN})$.

## Complejidad

Sea $b$ el factor de ramificacion (movidas legales promedio) y $d$ la profundidad:

$$T(d) = O(b^d)$$

Exponencial. Por eso es clave la [[alfa-beta|poda alfa-beta]], que en el mejor caso reduce a $O(b^{d/2})$.

## Ejemplos clasicos

- **Ta-te-ti**: arbol de $\sim 9!$ nodos, manejable.
- **Juego de los corchos** (planteado en clase): pieza pasa de jugador a jugador y se busca optimizar el resultado.
- **Ajedrez**: factor de ramificacion ~35, profundidad practica con poda + heuristica.

## Suposiciones del modelo

- Dos jugadores que se alternan.
- Suma cero: lo que gana uno lo pierde el otro.
- Informacion perfecta: ambos ven el estado completo.
- Deterministico: no hay azar.

Para juegos con azar (Backgammon) se usa Expectimax. Para informacion imperfecta (Poker) se necesitan otras tecnicas.
