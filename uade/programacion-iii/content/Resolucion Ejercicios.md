## Ejercicio 1

Diseñar un algoritmo que determine si una secuencia de n caracteres está ordenada alfabéticamente.

### a) Estrategia (Divide y Conquista)

- **División:** partir el arreglo en dos mitades, `[lo, mid)` y `[mid, hi)`
- **Caso base:** subarreglo de 0 o 1 elementos → trivialmente ordenado
- **Combinación:** el arreglo completo está ordenado si ambas mitades están ordenadas AND el borde entre ellas respeta el orden (`arr[mid-1] <= arr[mid]`)

### b) Pseudocódigo

```
function isOrdered(arr: char[], lo: int, hi: int): boolean
    if hi - lo <= 1
        return true

    mid = (lo + hi) / 2
    leftOk  = isOrdered(arr, lo, mid)
    rightOk = isOrdered(arr, mid, hi)

    return leftOk and rightOk and arr[mid - 1] <= arr[mid]
```

Llamada inicial: `isOrdered(arr, 0, length(arr))`

### c) Complejidad temporal

Recurrencia: T(n) = 2·T(n/2) + O(1)

Por Master Theorem: a=2, b=2, f(n)=O(1) → k=0.

Comparando a=2 contra b^k=2^0=1: a > b^k → cae en el caso T(n) = O(n^(log_b a)) = **O(n^(log_2 2))**.

## Ejercicio 2

Diseñar un algoritmo que calcule aⁿ cuando n es una potencia de 2.

### a) Estrategia (Divide y Conquista)

- **División:** un solo subproblema, `power(a, n/2)` (n/2 es entero exacto porque n es potencia de 2)
- **Caso base:** n == 1 → devuelve `a`
- **Combinación:** `half * half`

### b) Pseudocódigo

```
function power(a: number, n: int): number
    if n == 1
        return a

    half = power(a, n / 2)
    return half * half
```

Llamada inicial: `power(a, n)`

### c) Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**.

## Ejercicio 3

Sea A[1..n], n≥1, un vector de enteros diferentes y ordenados crecientemente (algunos valores pueden ser negativos). Diseñar un algoritmo que devuelva un índice natural k, 1≤k≤n, tal que A[k]=k, siempre que tal índice exista.

### a) Estrategia (Divide y Conquista)

Dada la naturaleza del problema se puede diseñar una resolución por Divide y Conquista siguiendo la siguiente estrategia:

**Caso Base**
1. Si `inicio > fin` (no queda rango para evaluar), no existe tal k, se devuelve -1.
2. Si tomamos el valor ubicado a la mitad de A, verificamos si `A[k] = k`: si coincide, ya tenemos el resultado.

**Subproblemas**
1. Si `A[k] > k`, buscamos en la mitad izquierda.
2. Si `A[k] < k`, buscamos en la mitad derecha.

**Combinación**
1. En este caso en particular se deberá devolver en forma directa el resultado del subproblema evaluado dado que solo uno de ellos se ejecutará.

### b) Pseudocódigo

```
ALGORITMO BUSCARPUNTOFIJO
Entrada: A: Vector<entero>, inicio:entero, fin:entero
Salida: entero
  si inicio > fin
    devolver -1
  sino
    k ← (inicio + fin) / 2
    si A[k] = k
      devolver k
    sino
      si A[k] < k
        devolver BuscarPuntoFijo(A, k + 1, fin)
      sino
        devolver BuscarPuntoFijo(A, inicio, k - 1)
      fin si
    fin si
  fin si
```

Llamada inicial: `BuscarPuntoFijo(A, 1, n)`

### c) Complejidad temporal

Recurrencia: T(n) = T(n/2) + O(1)

En cada llamada se descarta una mitad del vector y solo queda un subproblema de tamaño n/2, más el trabajo constante de calcular `medio` y comparar `A[medio]` con `medio`.

Por Master Theorem: a=1, b=2, f(n)=O(1) → k=0.

Comparando a=1 contra b^k=2^0=1: a = b^k → cae en el caso T(n) = O(n^k · log n) = O(n^0 · log n) = **O(log n)**.

## Ejercicio 4

Dada una secuencia de números no ordenada, determinar cuál es el valor k-ésimo menor de la misma (se entiende que el valor k se recibe como entrada del algoritmo). El algoritmo deberá tener una complejidad temporal en el caso promedio de O(n), pudiendo tener mayor complejidad en el peor de los casos.

### a) Estrategia (Divide y Conquista)

Dada la naturaleza del problema se puede diseñar una resolución por Divide y Conquista siguiendo la siguiente estrategia:

**Caso Base**
1. Si `inicio = fin` (queda un solo elemento), se devuelve directamente ese elemento como resultado.

**Subproblemas**
1. Se particiona el vector alrededor de un pivote (igual que en QuickSort), quedando el pivote en su posición final `p`.
2. Si `k = p`, el pivote es el elemento buscado.
3. Si `k < p`, se busca el k-ésimo menor en la mitad izquierda.
4. Si `k > p`, se busca el k-ésimo menor en la mitad derecha.

**Combinación**
1. Solo se ejecuta uno de los subproblemas (el lado donde cae `k`), por lo que se devuelve en forma directa su resultado — a diferencia de QuickSort completo, acá no hace falta combinar ambos lados.

### b) Pseudocódigo

Reutiliza el mismo `Pivot` de QuickSort:

```
ALGORITMO PIVOT
Entrada: S: Vector<entero>, inicio:entero, fin:entero
Salida: p: entero
  entero p ← S[inicio]
  entero k ← inicio + 1
  entero l ← fin
  mientras S[k] ≤ p Y k < fin
    k ← k + 1
  fin mientras
  mientras S[l] > p
    l ← l - 1
  fin mientras
  mientras k < l
    aux ← S[k]
    S[k] ← S[l]
    S[l] ← aux
    mientras S[k] ≤ p
      k ← k + 1
    fin mientras
    mientras S[l] > p
      l ← l - 1
    fin mientras
  fin mientras
  aux ← S[inicio]
  S[inicio] ← S[l]
  S[l] ← aux
  devolver l


ALGORITMO SELECCIONARKESIMO
Entrada: S: Vector<entero>, inicio:entero, fin:entero, k:entero
Salida: entero
  si inicio = fin
    devolver S[inicio]
  sino
    p ← Pivot(S, inicio, fin)
    si k = p
      devolver S[p]
    sino
      si k < p
        devolver SeleccionarKesimo(S, inicio, p - 1, k)
      sino
        devolver SeleccionarKesimo(S, p + 1, fin, k)
      fin si
    fin si
  fin si
```

Llamada inicial: `SeleccionarKesimo(S, 1, n, k)`

### c) Complejidad temporal

Recurrencia (caso promedio, partición balanceada): T(n) = T(n/2) + O(n)

Por Master Theorem: a=1, b=2, f(n)=O(n) → k=1.

Comparando a=1 contra b^k=2^1=2: a < b^k → cae en el caso T(n) = O(n^k) = **O(n)**.

Peor caso (pivote siempre malo, ej. vector ya ordenado): T(n) = T(n-1) + O(n) → **O(n²)**.
