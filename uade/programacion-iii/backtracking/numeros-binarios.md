---
tags:
  - algoritmos
  - backtracking
---

# Numeros binarios de n bits

- Imprimir todos los numeros binarios de $n$ bits para un $n$ dado como parametro.
- Hay exactamente $2^n$ combinaciones posibles.
- Se construye una solucion bit a bit: en cada posicion $k$ del vector se prueban los candidatos $\{0, 1\}$ y se recursa sobre el subarbol resultante.

## Modelo de backtracking

- **Estado:** vector `solution[0..n-1]` parcialmente completado hasta la posicion $k$.
- **Candidatos:** $\{0, 1\}$ para cada posicion.
- **Rechazo:** no hay poda — todo prefijo es valido.
- **Solucion:** cuando $k = n$ el vector representa un numero binario completo y se imprime.
- **Arbol:** binario completo de altura $n$, con $2^n$ hojas.

```
function printBinaries(n)
    solution = new array[n]
    backtrack(solution, 0, n)

function backtrack(solution, k, n)
    // solution complete, one of the 2^n leaves reached
    if k == n
        print(solution)
        return

    // try each candidate for position k
    for bit = 0 to 1
        solution[k] = bit
        backtrack(solution, k + 1, n)
```

> [!example] Ejemplo: n = 3
>
> Recorrido en preorden del arbol de decisiones:
>
> ```
> 000
> 001
> 010
> 011
> 100
> 101
> 110
> 111
> ```
>
> Total: $2^3 = 8$ hojas.

**Complejidad temporal:** $O(n \cdot 2^n)$ — $2^n$ hojas, cada impresion cuesta $O(n)$.
**Complejidad espacial:** $O(n)$ — profundidad de la recursion y tamaño del vector.
