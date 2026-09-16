---
paradigma: integrador
ejercicio: 6
tecnica: divide-y-conquista
complejidad: O(log n)
estado: completo
---

# Ejercicio 6 — Valor inmediato inferior a X

Dada una secuencia `S` de enteros positivos no repetidos ordenados en forma creciente y un valor `X` dado, indicar cuál es el valor inmediato inferior a `X` que se encuentra en `S`.

Por ejemplo, dada la secuencia `S={2,3,5,7,9,12,15,17}`, si `X` es `11`, el valor a devolver es `9`, y si `X` fuese `15`, el valor a devolver es `12`.

## a) Técnica

Divide y Conquista: `S` está ordenado, así que en cualquier posición `mitad` se puede decidir con una sola comparación (`S[mitad]` contra `X`) de qué lado puede estar la respuesta y descartar la otra mitad. Es una variante de búsqueda binaria adaptada a "encontrar el predecesor" (el mayor valor `< X`, exista o no `X` en `S`) en vez de "existe `X`".

## b) Estrategia

| Elemento | Definición |
|----------|------------|
| Caso base | `inicio > fin` (rango vacío): no queda nada para revisar, se devuelve el `mejorCandidato` acumulado hasta ahora |
| División del problema | Si `S[mitad] < X`, `mitad` es un candidato válido, pero puede haber uno mejor (más grande, más cerca de `X`) a la derecha → buscar en `(mitad+1, fin)`, actualizando `mejorCandidato` a `S[mitad]`. Si `S[mitad] ≥ X` (incluye igual), `mitad` no sirve y tampoco nada a su derecha (`S` es creciente) → buscar en `(inicio, mitad-1)` sin modificar `mejorCandidato` |
| Resolución recursiva | Se resuelve el subproblema elegido, arrastrando `mejorCandidato` (actualizado o sin modificar según corresponda) |
| Combinación de subsoluciones | No hay combinación real: se devuelve directo el resultado del subproblema. `BUSQUEDA` (la función pública) solo dispara la llamada al auxiliar `BUSQUEDAAUX` con `mejorCandidato` inicial en `0` |

**Por qué funciona el criterio elegido:** se busca el mayor valor de `S` que sea `< X`. En cualquier posición `mitad`, si `S[mitad] < X`, ese valor es un candidato válido, pero como `S` es creciente puede haber uno más grande (más cerca de `X`) a la derecha — nunca a la izquierda, porque todo lo que hay a la izquierda es menor que `S[mitad]`. Si `S[mitad] ≥ X` (esto incluye el caso `S[mitad] = X`, que se descarta porque se pide el valor *estrictamente* inferior a `X`), ni `mitad` ni nada a su derecha puede ser la respuesta (todo es `≥ S[mitad] ≥ X`), así que la respuesta, si existe, está a la izquierda. Como en cada paso se guarda el mejor candidato visto antes de seguir buscando, nunca se pierde un candidato válido aunque después se descarte esa zona del vector.

## c) Pseudocódigo

```
ALGORITMO BUSQUEDA
Entrada: S: Vector<entero>, X: entero
Salida: entero

  devolver BUSQUEDAAUX(S, 1, longitud(S), X, 0)


ALGORITMO BUSQUEDAAUX
Entrada: S: Vector<entero>, inicio: entero, fin: entero, X: entero, mejorCandidato: entero
Salida: entero

  si inicio > fin
    devolver mejorCandidato
  sino
    mitad <- (inicio + fin) / 2
    si S[mitad] < X
      devolver BUSQUEDAAUX(S, mitad + 1, fin, X, S[mitad])
    sino
      devolver BUSQUEDAAUX(S, inicio, mitad - 1, X, mejorCandidato)
    fin si
  fin si
```

`0` es el centinela de "no hay predecesor" (`S` son enteros positivos, así que `0` nunca es un valor real de `S`). El `0` inicial lo fija `BUSQUEDA` — quien invoca el algoritmo solo llama `BUSQUEDA(S, X)`.

## d) Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

En cada llamada a `BUSQUEDAAUX` se calcula `mitad` y se hace una comparación (costo constante), y se descarta una mitad del rango: solo queda un subproblema de tamaño `n/2`. `BUSQUEDA` solo agrega una llamada inicial de costo O(1).

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**
