---
tags:
  - algoritmos
  - greedy
---

# Matrimonios Estables (Gale-Shapley)

Dadas dos partes con $n$ miembros cada una y listas de **preferencias** completas, encontrar un **emparejamiento estable**.

En el ejemplo de la catedra: $n$ hombres $M = \{m_1, \dots, m_n\}$ y $n$ mujeres $F = \{f_1, \dots, f_n\}$. Cada uno tiene una lista con todos los del otro grupo ordenados por preferencia.

## Definiciones

- **Emparejamiento**: subconjunto de pares $(m, f) \in M \times F$ donde cada persona aparece **a lo sumo una vez** (sin poligamia).
- **Emparejamiento perfecto**: cada persona aparece **exactamente una vez** (sin celibato).
- **Inestabilidad**: existen dos parejas $(m, f)$ y $(m', f')$ tales que $m$ prefiere $f'$ sobre $f$ **y** $f'$ prefiere $m$ sobre $m'$. Tentacion de fugarse.
- **Emparejamiento estable**: perfecto **y** sin inestabilidades.

## Idea clave: etapa de compromiso

No se puede aceptar la primera propuesta sin reconsiderar porque podria aparecer un hombre mejor ranqueado despues. La solucion es introducir un **estado intermedio: compromiso**, no matrimonio. Las mujeres pueden romper el compromiso si llega una propuesta mejor.

## Elementos del problema

| Elemento | En matrimonios estables |
| ---- | ----------- |
| **Candidatos** | Las mujeres (segun el orden de preferencia de cada hombre) |
| **Seleccion** | Cada hombre libre propone a la mujer mas alta de su lista a la que **aun no propuso** |
| **Factibilidad** | Ningun hombre propone dos veces a la misma mujer; solo los libres proponen |
| **Solucion** | Nadie queda libre |
| **Objetivo** | Emparejamiento estable |

## Algoritmo

```
function kikimuris(M, F)
    while exists man m in M such that m is free
           and m has not proposed to all women yet
        f = highest ranked woman in m's list to whom m has not proposed

        if f is free
            commit(m, f)
        else
            // f esta comprometida con m' actualmente
            m_prime = current partner of f

            if f prefers m over m_prime
                // f rompe con m' y se compromete con m
                commit(m, f)
                m_prime becomes free
            // si prefiere a m', m sigue libre y propondra a la siguiente

    return current commitments
```

## Analisis: terminacion

Sea $\mathcal{P}(t)$ la cantidad de pares $(m, f)$ tales que $m$ ya le propuso matrimonio a $f$.

En cada iteracion, algun hombre propone a una mujer a la que **no le habia propuesto antes** → $\mathcal{P}(t+1) > \mathcal{P}(t)$.

Como solo hay $n^2$ pares posibles, el algoritmo termina en a lo sumo $n^2$ iteraciones.

$$T(n) = O(n^2)$$

## Analisis: correccion

**El emparejamiento es perfecto.** Si al final algun hombre $m$ esta libre, hay al menos una mujer a la que no propuso. Pero si esta libre es porque todas lo rechazaron o lo descomprometieron → todas estan comprometidas. Para que esto pase hacen falta $n$ hombres comprometidos, lo cual contradice que $m$ este libre.

**No hay inestabilidades.** Supongamos dos parejas $(m, f)$ y $(m', f')$ con $m$ prefiriendo $f'$ sobre $f$. Como $m$ ranquea a $f'$ antes que a $f$, $m$ le propuso primero a $f'$. Si $f'$ termino con $m'$ en lugar de $m$, es porque prefiere a $m'$ sobre $m$. No hay inestabilidad.

## Caracter greedy

El algoritmo es greedy:
- **Candidatos**: lista de mujeres ordenada por preferencia.
- **Seleccion**: la mejor de la lista entre las no propuestas.
- **Sin reconsideracion** desde el lado masculino: ningun hombre repite propuesta.

> [!warning] Sesgo del algoritmo
> El emparejamiento producido es **optimo para los hombres** (cada hombre obtiene la mejor pareja posible entre todos los emparejamientos estables) y **pesimo para las mujeres** (cada mujer obtiene la peor pareja posible entre todos los emparejamientos estables). La catedra lo señala como machista: las preferencias de las mujeres no se tienen en cuenta para seleccionar.
