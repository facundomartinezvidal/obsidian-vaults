---
tags:
  - ejercicios
  - programacion-iii
  - divide-and-conquer
---

# Ejercicios — Divide y Conquista

## Ejercicio 1 — Secuencia ordenada alfabeticamente

**Enunciado:** Determinar si una secuencia de $n$ caracteres esta ordenada alfabeticamente.

**Tecnica:** Subtract & Conquer

**Pseudocodigo:**

```
function isOrder(characters, index) 
    // base case
    if length(characters) - 1 == index 
        return true
    
    // combine
    if characters[index] > characters[index + 1]
        return false
    
    // subtract 
    return isOrder(characters, index + 1)
```

**Partes del template S&C:**

| Parte | En el codigo |
| ---- | ----------- |
| Caso base | `length(characters) - 1 == index` → ultimo elemento, ya esta ordenado |
| Combine | Compara `characters[index]` con `characters[index + 1]` |
| Subtract | Llamada recursiva con `index + 1` (achica el problema en 1) |

**Estructura de datos:** `Vector<char>` (array de caracteres)

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO


## Ejercicio 2 — Busqueda en vector ordenado

**Enunciado:** Dado un vector de $n$ numeros naturales ordenados crecientemente, determinar si un numero $x$ dado pertenece al vector.

**Tecnica:** Divide & Conquer (Binary Search)

**Pseudocodigo:**

```
function isPresent(array, target, low, high)
    // base case
    if low > high
        return false
    
    // divide
    mid = (high + low) / 2
    
    if target == array[mid]
        return true
    
    // conquer (una sola llamada recursiva, segun la mitad)
    if target > array[mid]
        return isPresent(array, target, mid + 1, high)
    else
        return isPresent(array, target, low, mid - 1)
```

**Partes del template D&C:**

| Parte | En el codigo |
| ---- | ----------- |
| Caso base | `low > high` → rango vacio, el numero no esta |
| Divide | `mid = (high + low) / 2` → divide el rango en dos mitades |
| Conquer | Llamada recursiva en la mitad que puede contener al target |
| Combine | No hay — solo se recursa en una mitad, la respuesta viene directa |

**Estructura de datos:** `Vector<int>` (array de enteros ordenados crecientemente)

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO


## Ejercicio 3 — Calcular $a^n$ (n potencia de 2)

**Enunciado:** Calcular $a^n$ cuando $n$ es una potencia de 2.

**Tecnica:** Divide & Conquer

**Idea:** Aprovechar la propiedad $a^n = (a^{n/2})^2$ para reducir el problema a la mitad en cada paso.

**Pseudocodigo:**

```
function raiseNumber(a, n)
    // base case
    if n == 1
        return a
    
    // divide + conquer: calcula a^(n/2) recursivamente
    halfPower = raiseNumber(a, n / 2)
    
    // combine: eleva al cuadrado
    return halfPower * halfPower
```

**Partes del template D&C:**

| Parte | En el codigo |
| ---- | ----------- |
| Caso base | `n == 1` → $a^1 = a$ |
| Divide | Reducir el exponente a `n / 2` |
| Conquer | Llamada recursiva para calcular $a^{n/2}$ |
| Combine | Elevar el resultado al cuadrado: `halfPower * halfPower` |

**Estructura de datos:** ninguna especial — solo usa variables (`a`, `n`, `halfPower`).

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO

## Ejercicio 4 — Elemento Mayoritario

**Enunciado:** Dado un vector $A$ de $n$ numeros enteros, calcular el elemento mayoritario. Un elemento $x$ es mayoritario si aparece mas de $n/2$ veces. No puede haber mas de un elemento mayoritario.

**Tecnica:** Divide & Conquer

Ver algoritmo completo en [[elemento-mayoritario]].

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO

## Ejercicio 6 — Punto fijo en vector ordenado

**Enunciado:** Dado un vector $A[1..n]$ de enteros diferentes y ordenados crecientemente (algunos pueden ser negativos), encontrar un indice $k$ tal que $A[k] = k$, si tal indice existe.

**Tecnica:** Divide & Conquer (variante de Binary Search)

**Pseudocodigo:**

```
function findIndex(array, low, high)
    // base case: rango vacio, no hay punto fijo
    if low > high
        return false

    // divide: calcula el punto medio
    mid = (low + high) / 2

    if array[mid] == mid                            // encontrado
        return mid
    if array[mid] > mid                             // valor muy alto, busco a la izquierda
        return findIndex(array, low, mid - 1)
    else                                            // valor muy bajo, busco a la derecha
        return findIndex(array, mid + 1, high)
```

**Partes del template D&C:**

| Parte | En el codigo |
| ---- | ----------- |
| Caso base | `low > high` → rango vacio, no existe punto fijo |
| Divide | `mid = (low + high) / 2` → divide el rango en dos mitades |
| Conquer | Llamada recursiva en la mitad correspondiente |
| Combine | No hay — la respuesta viene directa de la recursion |

**Estructura de datos:** `Vector<int>` (array de enteros ordenados crecientemente, valores distintos)

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO


## Ejercicio 7 — Merge Sort dividiendo en 3

**Enunciado:** Dado un vector $A$ de numeros enteros, ordenarlo en forma creciente utilizando Merge Sort pero dividiendo el vector en 3 subvectores. Analizar el costo.

**Tecnica:** Divide & Conquer

**Pseudocodigo:**

```
function mergeSort3(array)
    // base case
    if length(array) < 2
        return

    // divide: partir en 3 subvectores
    t1 = length(array) / 3
    t2 = 2 * length(array) / 3

    left = []
    middle = []
    right = []

    for i = 0 to t1 - 1
        left[i] = array[i]
    for i = t1 to t2 - 1
        middle[i - t1] = array[i]
    for i = t2 to length(array) - 1
        right[i - t2] = array[i]

    // conquer: ordenar cada tercio recursivamente
    mergeSort3(left)
    mergeSort3(middle)
    mergeSort3(right)

    // combine: dos merges de 2 encadenados
    temp = new array[length(left) + length(middle)]
    merge(left, middle, temp)       // combina left + middle en temp
    merge(temp, right, array)       // combina temp + right en array

function merge(arr1, arr2, dest)
    i = 0    // puntero para arr1
    j = 0    // puntero para arr2
    k = 0    // puntero para dest

    while i < length(arr1) and j < length(arr2)
        if arr1[i] <= arr2[j]
            dest[k] = arr1[i]
            i = i + 1
        else
            dest[k] = arr2[j]
            j = j + 1
        k = k + 1

    while i < length(arr1)
        dest[k] = arr1[i]
        i = i + 1
        k = k + 1

    while j < length(arr2)
        dest[k] = arr2[j]
        j = j + 1
        k = k + 1
```

**Partes del template D&C:**

| Parte | En el codigo |
| ---- | ----------- |
| Caso base | `length(array) < 2` → 0 o 1 elemento, ya esta ordenado |
| Divide | Divide en 3 partes usando `t1 = n/3` y `t2 = 2n/3` |
| Conquer | 3 llamadas recursivas: `mergeSort3(left)`, `mergeSort3(middle)`, `mergeSort3(right)` |
| Combine | Dos merges de 2: primero left+middle, despues resultado+right |

**Estructura de datos:** `Vector<int>` (array de enteros) + arrays auxiliares (`left`, `middle`, `right`, `temp`)

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO

## Ejercicio 8 — Picos estrictos en un arreglo

**Enunciado:** Dado un arreglo $A$ de numeros enteros, $A[i]$ es un **pico estricto** si $A[i-1] < A[i] > A[i+1]$. En los extremos: $A[0]$ es pico estricto si $A[0] > A[1]$, y $A[len(A)-1]$ es pico estricto si $A[len(A)-2] < A[len(A)-1]$. Si el arreglo tiene un unico elemento, ese elemento es pico estricto. Asumiendo que $A$ contiene numeros todos distintos, encontrar al menos un pico estricto con una estrategia de divide & conquer en tiempo **menor a lineal**, si es que alguno existe.

**Tecnica:** Divide & Conquer (variante de Binary Search)

**Idea:** El maximo global de un arreglo con elementos todos distintos siempre es pico estricto. En cada paso miramos el medio y sus vecinos: si alguno de los vecinos es mayor, en esa mitad hay garantizado un pico y recursamos solo ahi.

**Pseudocodigo:**

```
function findPeakRec(array, low, high)
    if length(array) == 0
        return -1   
    // base case
    if low == high
        return low                              // un solo elemento ⇒ es pico

    // divide
    mid = (low + high) / 2

    leftOK  = (mid == 0)                   or (array[mid - 1] < array[mid])
    rightOK = (mid == length(array) - 1)   or (array[mid] > array[mid + 1])

    if leftOK and rightOK
        return mid

    // conquer: recursa en la mitad que garantiza tener un pico
    if not leftOK                               // array[mid - 1] > array[mid]
        return findPeakRec(array, low, mid - 1)
    else                                        // array[mid + 1] > array[mid]
        return findPeakRec(array, mid + 1, high)
```

**Partes del template D&C:**

| Parte | En el codigo |
| ---- | ----------- |
| Caso base | `low == high` → un solo elemento, es pico por enunciado |
| Divide | `mid = (low + high) / 2` → divide el rango en dos mitades |
| Conquer | Una sola llamada recursiva, en la mitad donde el vecino del medio es mayor |
| Combine | No hay — la respuesta viene directa de la recursion |

**Existencia del pico:** Si todos los elementos son distintos, el maximo global es pico estricto. Por lo tanto **siempre existe al menos un pico estricto** bajo las condiciones del enunciado.

**Estructura de datos:** `Vector<int>` (array de enteros, valores todos distintos)

**Codigo en Java:**

```java
// TODO
```

**Complejidad:**

- **Temporal:** TODO
- **Espacial:** TODO
