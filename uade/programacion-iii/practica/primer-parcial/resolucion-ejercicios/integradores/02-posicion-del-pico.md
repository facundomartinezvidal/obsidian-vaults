---
paradigma: integrador
ejercicio: 2
tecnica: divide-y-conquista
complejidad: O(log n)
estado: completo
---

# Ejercicio 2 — Posición del pico en un vector bitónico

Dado un vector de `n` elementos `[1…n]` donde una parte se encuentra ordenada en forma estrictamente creciente hasta un valor `p`, y en forma estrictamente decreciente luego de `p`, diseñar un algoritmo que encuentre la posición del valor `p`. El valor NO es dato, sino que se debe determinar a través del algoritmo.

Ejemplo: si tenemos el vector `[1,3,5,2,1,-1]`, el valor de `p` es `5` y la posición a devolver es `3`. Otro ejemplo: `[-3,-1,0,2,7,9,5,4,1,-2]`, el valor `p` sería `9` y la posición a devolver es `6`.

## a) Técnica

Divide y Conquista: el vector es bitónico (crece y después decrece), así que en cualquier posición `mitad` se puede decidir, con dos comparaciones, de qué lado del pico se está parado, y descartar la mitad del vector donde el pico no puede estar. Es la misma idea que búsqueda binaria, adaptada a este problema.

## b) Estrategia

| Elemento | Definición |
|----------|------------|
| Caso base | `inicio = fin` (rango de un solo elemento): ese elemento es el pico |
| División del problema | Si `mitad` está en el borde izquierdo del vector o `S[mitad] > S[mitad-1]` (todavía ascendiendo o no hay vecino izquierdo real), y además `mitad` está en el borde derecho o `S[mitad] > S[mitad+1]`, entonces `mitad` es el pico. Si asciende pero no es pico, el pico está a la **derecha** (`mitad+1, fin`). Si no asciende (`S[mitad] ≤ S[mitad-1]`), el pico está a la **izquierda** (`inicio, mitad-1`) |
| Combinación de subsoluciones | No se combinan: se devuelve directo el resultado del único subproblema que se evaluó |

**Por qué funciona el criterio elegido:** el vector garantiza que existe exactamente un `p` tal que es estrictamente creciente antes y estrictamente decreciente después. En cualquier posición `mitad`, si `S[mitad] > S[mitad-1]` (o no hay vecino izquierdo), todavía no se pasó el pico o se está justo en él ⇒ el pico está en `[mitad, fin]`. Si en cambio `S[mitad] ≤ S[mitad-1]`, ya se pasó el pico ⇒ está en `[inicio, mitad-1]`. En ningún caso se descarta el lado donde puede estar `p`, así que la invariante "`p` está en `[inicio,fin]`" se mantiene en cada llamada, y el rango se reduce a la mitad cada vez.

## c) Pseudocódigo

```
ALGORITMO ENCONTRARP
Entrada: S: Vector<entero>, inicio: entero, fin: entero
Salida: entero

  si inicio = fin
    devolver inicio
  sino
    mitad ← (inicio + fin) / 2
    si mitad = 1 || S[mitad] > S[mitad - 1]
      si mitad = longitud(S) || S[mitad] > S[mitad + 1]
        devolver mitad
      fin si
      devolver ENCONTRARP(S, mitad + 1, fin)
    sino
      devolver ENCONTRARP(S, inicio, mitad - 1)
    fin si
  fin si
```

Llamada inicial: `EncontrarP(S, 1, n)`

## d) Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

En cada llamada se calcula `mitad` y se hacen a lo sumo dos comparaciones (costo constante), y se descarta una mitad del vector: solo queda un subproblema de tamaño `n/2`.

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**
