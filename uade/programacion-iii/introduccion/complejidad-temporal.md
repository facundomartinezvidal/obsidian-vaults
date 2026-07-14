---
title: Complejidad Temporal
tags:
  - programacion-iii
  - algoritmos
  - complejidad
---

# Complejidad Temporal

La **complejidad temporal** mide la cantidad de **operaciones elementales** que ejecuta un algoritmo en funcion del tamaño de la entrada $n$. No mide tiempo real (segundos), sino como crece el trabajo a medida que crece la entrada.

> [!important] Principio de Invarianza
> Dos implementaciones distintas de un mismo algoritmo no difieren en mas de una **constante multiplicativa**. La eficiencia no depende de la maquina, el lenguaje ni la implementacion particular.

## Tipos de analisis

| Tipo | Descripcion |
|---|---|
| **Peor caso** | Mayor costo entre todas las instancias posibles. Es el que mas usamos — da una **cota superior** garantizada. |
| **Caso promedio** | Promedio de costos de todas las instancias. |
| **Mejor caso** | Menor costo entre todas las instancias. |

## Notacion asintotica

Describe el comportamiento de una funcion cuando $n \to \infty$, ignorando constantes y terminos de menor orden.

### Big O — $O$ (cota superior)

$f(n) \in O(g(n))$ si existen $c > 0$ y $n_0$ tal que $f(n) \leq c \cdot g(n)$ para todo $n > n_0$.

Dice: *"en el peor caso, $f$ no crece mas rapido que $g$"*.

**Propiedades:**
- $f \in O(g)$ y $f \in O(h)$ → $f \in O(\min(g, h))$
- $f_1 \in O(g)$ y $f_2 \in O(h)$ → $f_1 + f_2 \in O(\max(g, h))$
- $f_1 \in O(g)$ y $f_2 \in O(h)$ → $f_1 \cdot f_2 \in O(g \cdot h)$

### Omega — $\Omega$ (cota inferior)

$f(n) \in \Omega(g(n))$ si existen $c > 0$ y $n_0$ tal que $f(n) \geq c \cdot g(n)$ para todo $n > n_0$.

Dice: *"$f$ crece al menos tan rapido como $g$"*.

Se cumple: $f(n) \in O(g(n)) \iff g(n) \in \Omega(f(n))$

### Theta — $\Theta$ (orden exacto)

$f(n) \in \Theta(g(n))$ si $f \in O(g)$ y $f \in \Omega(g)$.

Dice: *"$f$ crece exactamente al mismo ritmo que $g$"*.

## Clases de complejidad

Ordenadas de menor a mayor crecimiento:

$$1 \subset \log(n) \subset n \subset n\log(n) \subset n^2 \subset n^k \subset 2^n \subset n!$$

| Clase | Nombre | Ejemplo | Que significa |
|---|---|---|---|
| $O(1)$ | Constante | Acceso a un array por indice | No importa el tamaño de la entrada |
| $O(\log n)$ | Logaritmica | [[busqueda-binaria\|Busqueda Binaria]] | Divide el problema a la mitad en cada paso |
| $O(n)$ | Lineal | [[busqueda-lineal\|Busqueda Lineal]], recorrer un array | Visita cada elemento una vez |
| $O(n \log n)$ | Lineal-logaritmica | MergeSort, QuickSort (promedio) | Divide y conquista con trabajo lineal por nivel |
| $O(n^2)$ | Cuadratica | Burbuja, Seleccion, Insercion | Dos bucles anidados sobre la entrada |
| $O(n^3)$ | Cubica | Multiplicacion de matrices naive | Tres bucles anidados |
| $O(2^n)$ | Exponencial | Subconjuntos, Fibonacci naive | Explora todas las combinaciones posibles |
| $O(n!)$ | Factorial | Permutaciones, fuerza bruta en TSP | Prueba todos los ordenes posibles |

> [!tip] Regla practica
> - $O(n \log n)$ o menos → **eficiente**, escala bien.
> - $O(n^2)$ → aceptable para $n$ chico (miles), lento para $n$ grande.
> - $O(2^n)$ o peor → solo viable para entradas muy pequeñas ($n < 25$).

## Como calcular la complejidad

### Operaciones elementales

| Estructura | Costo |
|---|---|
| Asignacion, expresion aritmetica/logica, acceso a vector, llamada a metodo | $O(1)$ |
| Secuencia de instrucciones | Suma de costos |
| Condicional `if/else` | Costo de la condicion + maximo entre las ramas |
| Bucle | $N \times$ costo del bloque |
| Llamada a metodo | $1$ + costo de ejecucion del metodo |

### Ejemplo: dos bucles anidados

```
for i = 0 to n-1:          // n iteraciones
    for j = 0 to n-1:      // n iteraciones
        print(A[i][j])      // O(1)
```

Total: $n \times n \times 1 = O(n^2)$

### Ejemplo: bucle que se reduce a la mitad

```
i = n
while i > 1:
    i = i / 2               // O(1)
```

El bucle se ejecuta $\log_2 n$ veces → $O(\log n)$

## Resolucion de recurrencias

Para algoritmos recursivos, la complejidad se expresa como una **recurrencia**.

### Caso por sustraccion: $T(n - b)$

$$T(n) = \begin{cases} c & \text{si } 0 \leq n < b \\ aT(n - b) + p(n) & \text{si } n \geq b \end{cases}$$

donde $p(n)$ es un polinomio de grado $k$.

$$T(n) \in \begin{cases} \Theta(n^k) & \text{si } a < 1 \\ \Theta(n^{k+1}) & \text{si } a = 1 \\ \Theta(a^{n/b}) & \text{si } a > 1 \end{cases}$$

> [!example] Factorial recursivo
> `fact(n) = n * fact(n-1)` → $a = 1$, $b = 1$, $k = 0$
>
> Como $a = 1$: $\Theta(n^{0+1}) = \Theta(n)$

### Caso por division: $T(n/b)$ — Teorema Maestro

$$T(n) = \begin{cases} c & \text{si } 0 \leq n < b \\ aT(n/b) + f(n) & \text{si } n \geq b \end{cases}$$

donde $f(n) \in \Theta(n^k)$.

$$T(n) \in \begin{cases} \Theta(n^k) & \text{si } a < b^k \\ \Theta(n^k \log n) & \text{si } a = b^k \\ \Theta(n^{\log_b a}) & \text{si } a > b^k \end{cases}$$

**Parametros:**
- $a$ = cantidad de llamadas recursivas (peor caso)
- $b$ = factor de reduccion del tamaño de entrada
- $k$ = grado del polinomio del trabajo fuera de la recursion

> [!example] MergeSort
> $T(n) = 2T(n/2) + \Theta(n)$ → $a = 2$, $b = 2$, $k = 1$
>
> Como $a = b^k$ ($2 = 2^1$): $\Theta(n^1 \log n) = \Theta(n \log n)$

> [!example] Busqueda Binaria
> $T(n) = T(n/2) + \Theta(1)$ → $a = 1$, $b = 2$, $k = 0$
>
> Como $a = b^k$ ($1 = 2^0$): $\Theta(n^0 \log n) = \Theta(\log n)$
