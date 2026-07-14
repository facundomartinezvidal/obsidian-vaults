---
tags:
  - algoritmos
  - greedy
---

# Problema del Cambio (Greedy)

Dado un monto $v$ y un conjunto de denominaciones de monedas, encontrar la **minima cantidad de monedas** para pagar $v$.

> [!warning] Version Greedy vs version DP
> El algoritmo greedy es $\Theta(v)$ pero **no siempre da el optimo**: depende del sistema monetario. La version general garantizada esta en [[../programacion-dinamica/coin-change|Cambio (DP)]] con complejidad $O(n \cdot v)$.

## Elementos del problema

| Elemento | En el cambio |
| ---- | ----------- |
| **Candidatos** | Denominaciones de monedas disponibles |
| **Seleccion** | La moneda mas grande que no se pase del monto restante |
| **Factibilidad** | $accum + coin \leq v$ |
| **Solucion** | $accum = v$ |
| **Objetivo** | Minimizar el numero de monedas |

## Algoritmo

```
function change(v, coins)
    n = 0
    accum = 0
    i = 0

    while accum < v and i < length(coins)
        if accum + coins[i] <= v
            accum = accum + coins[i]
            n = n + 1
        else
            i = i + 1

    if i < length(coins)
        return n
    return -1
```

Asume `coins` ordenado de mayor a menor. Si recorre todas las denominaciones sin completar el monto, devuelve $-1$ (no hay solucion con criterio greedy).

## Complejidad

El ciclo itera a lo sumo hasta $v$ (porque cada moneda agrega al menos 1 unidad de la denominacion mas chica). Suponiendo que la cantidad de denominaciones es constante:

$$T(v) = \Theta(v)$$

## Correccion: cuando funciona

> [!example] Caso Thurgau (Suiza) — funciona
> Denominaciones $\{500, 200, 100, 50, 20, 10, 5, 1\}$ centavos. Pagar 8.78 francos = 878 centavos.
>
> Greedy: $5\text{fr} + 2\text{fr} + 1\text{fr} + 50\text{c} + 20\text{c} + 5\text{c} + 1\text{c} + 1\text{c} + 1\text{c}$ → optimo.

> [!fail] Caso Loch Ness pre-1971 — falla
> Denominaciones $\{1\text{£} = 240p, 60p, 30p, 24p, 12p, 6p, 3p, 1p\}$ (sistema imperial: corona, media corona, florin, chelin).
>
> Pagar **1£ 48p**:
> - Greedy: $1\text{£} + 30p + 12p + 6p$ → **4 monedas**
> - Optimo: $1\text{£} + 2 \times 12p$ ... no, mejor: $1\text{£} + 2 \times 24p$ (dos florines) → **3 monedas**
>
> Greedy se equivoca porque al elegir la moneda de 30p "sin pasarse" pierde la posibilidad de combinar dos de 24p.

## Conclusion

Greedy en el cambio es optimo si el sistema monetario es **canonico** (toda denominacion es multiplo entero de las menores). En sistemas arbitrarios, hay que usar DP.
