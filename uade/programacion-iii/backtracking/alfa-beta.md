---
tags:
  - algoritmos
  - backtracking
  - juegos
---

# Poda Alfa-Beta

Mejora del algoritmo [[min-max|Min-Max]] que **descarta ramas** del arbol de juego que **no pueden afectar** la decision final. Da el mismo resultado que Min-Max pero explora menos nodos.

## Idea

Se mantienen dos valores que acotan lo que cada jugador puede garantizar:
- $\alpha$ = **mejor valor garantizado para MAX** hasta el momento.
- $\beta$ = **mejor valor garantizado para MIN** hasta el momento.

En cada nodo:
- Si **$\alpha \geq \beta$**, podar: la rama actual no puede mejorar la decision ya tomada en niveles superiores.

## Por que funciona

- En un nodo **MAX**, $\alpha$ solo puede crecer. Si encuentra un valor $\geq \beta$ (donde $\beta$ es el limite impuesto por el MIN de arriba), MIN nunca va a permitir llegar aca → se poda el resto.
- Simetricamente en MIN.

## Algoritmo

```
function alphaBeta(state, depth, alpha, beta, maximizingPlayer)
    if depth == 0 or isTerminal(state)
        return evaluate(state)

    if maximizingPlayer
        value = -infinito
        for each move in legalMoves(state)
            child = applyMove(state, move)
            value = max(value, alphaBeta(child, depth - 1, alpha, beta, false))
            alpha = max(alpha, value)

            // beta cutoff: MIN no permitiria llegar aca
            if alpha >= beta
                break
        return value
    else
        value = +infinito
        for each move in legalMoves(state)
            child = applyMove(state, move)
            value = min(value, alphaBeta(child, depth - 1, alpha, beta, true))
            beta = min(beta, value)

            // alpha cutoff: MAX no permitiria llegar aca
            if alpha >= beta
                break
        return value
```

Llamada inicial: `alphaBeta(root, maxDepth, -infinito, +infinito, true)`.

## Complejidad

Sea $b$ el factor de ramificacion y $d$ la profundidad:

- **Peor caso** (orden de movidas pesimo): $O(b^d)$, igual que Min-Max sin poda.
- **Mejor caso** (orden ideal, mejor movida primero): $O(b^{d/2})$.

En la practica, con buen **ordenamiento de movidas** (probar primero las mas prometedoras), se acerca a $b^{d/2}$, lo que **duplica** la profundidad alcanzable en el mismo tiempo.

## Mejoras adicionales

- **Move ordering**: probar primero movidas que likely sean buenas (capturas en ajedrez, jaques).
- **Iterative deepening**: profundizar gradualmente, reutilizando info para mejorar el ordenamiento.
- **Transposition tables**: cachear estados ya evaluados.

## Relacion con Min-Max

Alfa-beta y Min-Max devuelven **exactamente el mismo valor en la raiz**. La unica diferencia es que alfa-beta evita explorar nodos que no pueden cambiar la decision. **No es una aproximacion**: es Min-Max optimizado.
