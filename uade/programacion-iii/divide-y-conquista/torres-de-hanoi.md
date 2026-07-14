---
tags:
  - algoritmos
  - subtract-and-conquer
---

# Torres de Hanoi

- Hay 3 torres: origen (A), auxiliar (B), destino (C).
- Hay $n$ discos de distintos tamanios apilados en A, de mayor (abajo) a menor (arriba).
- Objetivo: mover todos los discos a C, moviendo de a un disco por vez, sin apoyar un disco grande sobre uno chico.

> [!important] Idea clave recursiva
> Para mover $n$ discos de A a C usando B:
> 1. Mover $n-1$ discos de A a B (usando C como auxiliar).
> 2. Mover el disco mas grande de A a C.
> 3. Mover los $n-1$ discos de B a C (usando A como auxiliar).

```
function hanoi(n, source, auxiliary, destination)
    // base case: a single disk, move it directly
    if n == 1
        move(source, destination)
        return

    // STEP 1: move n-1 disks from source to auxiliary
    hanoi(n - 1, source, destination, auxiliary)

    // STEP 2: move the largest disk from source to destination
    move(source, destination)

    // STEP 3: move n-1 disks from auxiliary to destination
    hanoi(n - 1, auxiliary, source, destination)
```

**Recurrencia:** $T(n) = 2T(n-1) + c$ → $a=2, b=1, k=0$ → $a > 1$ → $\Theta(2^n)$

**Complejidad temporal:** $\Theta(2^n)$ — con $n$ discos se necesitan $2^n - 1$ movimientos.
