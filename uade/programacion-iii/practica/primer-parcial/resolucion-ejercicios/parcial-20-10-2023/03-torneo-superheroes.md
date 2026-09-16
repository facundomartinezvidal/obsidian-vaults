---
paradigma: parcial-20-10-2023
ejercicio: 3
tecnica: divide-y-conquista
complejidad: O(n) promedio / O(n²) peor caso
estado: en-progreso
---

# Ejercicio 3 — Torneo de superhéroes

Juan organiza un torneo de superhéroes de Marvel. Cada superhéroe tiene un poder de ataque y uno de defensa. Dado un valor `P`, diseñar un algoritmo que determine cuáles son los `P` participantes con **menor diferencia entre ataque y defensa**. El algoritmo debe tener complejidad temporal en promedio de O(n), siendo `n` la cantidad de superhéroes.

## Estrategia (Divide y Conquista)

**Caso base:** cuando la secuencia tiene un solo elemento, se puede determinar directamente. También cuando el pivote coincide con `P`, ya se determinó la posición buscada.

**Subproblemas:**
- Si el pivote es menor a `P`, se particiona el problema recorriendo desde `pivot + 1` hasta `fin`.
- Caso contrario, se recorre desde `inicio` hasta `pivot - 1`.

**Combinación:** no hay — se va descartando el subproblema no elegido, igual que en [[04-kesimo-menor]].

## Pseudocódigo

```
ALGORITMO DIFERENCIAS
Entrada: SP: Vector<SuperHeroes>
Salida: D: Vector<objeto{id: entero, diferencia: entero}>

	D <- []
	para i=1 hasta longitud(SP)
		si SP[i].ataque > SP[i].defensa
			D[i] <- {id: i, diferencia: SP[i].ataque - SP[i].defensa}
		sino
			D[i] <- {id: i, diferencia: SP[i].defensa - SP[i].ataque}
		fin si
	fin para
	devolver D


ALGORITMO TORNEO
Entrada: D: Vector<objeto{id: entero, diferencia: entero}>, P: entero, inicio: entero, fin: entero
Salida: entero
// se asume que Pivot admite objetos {id, diferencia} y particiona en base al campo diferencia

si inicio = fin
	devolver inicio
sino
	pivot <- Pivot(D, inicio, fin)
	si pivot = P
		devolver pivot
	sino
		si pivot < P
			devolver TORNEO(D, P, pivot + 1, fin)
		sino
			devolver TORNEO(D, P, inicio, pivot - 1)
		fin si
	fin si
fin si
```

> [!warning] Pendiente
> El caso base (`devolver inicio`) solo devuelve un índice — falta que el algoritmo devuelva los `P` participantes (el tramo `D[1..P]` una vez que `pivot = P`), no un solo elemento.

## Complejidad temporal

`DIFERENCIAS` recorre `SP` una sola vez, trabajo constante por elemento: **O(n)**.

`TORNEO` tiene la misma forma que `SeleccionarKesimo` ([[04-kesimo-menor]]): un `Pivot` que cuesta `O(n)` y una única llamada recursiva (se descarta el otro lado).

Recurrencia (caso promedio, partición balanceada): T(n) = T(n/2) + O(n)

Por Master Theorem: a=1, b=2, f(n)=O(n) → k=1.

Comparando a=1 contra b^k=2^1=2: a < b^k → cae en el caso T(n) = O(n^k) = **O(n)**.

Sumando `DIFERENCIAS` (O(n)) + `TORNEO` (O(n) promedio): **T(n) = O(n)**, cumple con lo pedido en el enunciado.

Peor caso (pivote siempre malo): T(n) = T(n-1) + O(n) → **O(n²)**.
