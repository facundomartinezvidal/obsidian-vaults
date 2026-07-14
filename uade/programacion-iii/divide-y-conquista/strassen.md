---
tags:
  - algoritmos
  - divide-and-conquer
---

# Multiplicacion de Matrices (Strassen)

- El metodo tradicional para multiplicar dos matrices de $N \times N$ requiere $N^3$ multiplicaciones → $O(n^3)$.
- **Strassen** reduce esto a **7 multiplicaciones** de submatrices de $N/2 \times N/2$ en vez de 8, a cambio de mas sumas y restas.
- Solo funciona cuando $N$ es **potencia de 2**.

> [!important] Idea clave
> En vez de hacer 8 multiplicaciones de submatrices (metodo tradicional), Strassen calcula 7 productos ($m_1$ a $m_7$) usando combinaciones inteligentes de sumas y restas de las submatrices. Con esos 7 productos arma el resultado.

**Las 7 multiplicaciones:**

Dadas las submatrices $A_{11}, A_{12}, A_{21}, A_{22}$ y $B_{11}, B_{12}, B_{21}, B_{22}$:

$$m_1 = (A_{11} + A_{22})(B_{11} + B_{22})$$
$$m_2 = (A_{21} + A_{22}) \cdot B_{11}$$
$$m_3 = A_{11} \cdot (B_{12} - B_{22})$$
$$m_4 = A_{22} \cdot (B_{21} - B_{11})$$
$$m_5 = (A_{11} + A_{12}) \cdot B_{22}$$
$$m_6 = (A_{21} - A_{11})(B_{11} + B_{12})$$
$$m_7 = (A_{12} - A_{22})(B_{21} + B_{22})$$

**El resultado se arma con:**

$$C_{11} = m_1 + m_4 - m_5 + m_7$$
$$C_{12} = m_3 + m_5$$
$$C_{21} = m_2 + m_4$$
$$C_{22} = m_1 + m_3 - m_2 + m_6$$

```
function matrixProduct(A, B)
    // base case: 2x2 matrices
    if size(A) == 2
        // direct multiplication
        return product2x2(A, B)
    else
        // --- DIVIDE: split each matrix into 4 submatrices ---
        A11, A12, A21, A22 = split(A)
        B11, B12, B21, B22 = split(B)

        // --- CONQUER: compute the 7 Strassen products ---
        m1 = matrixProduct(add(A11, A22), add(B11, B22))
        m2 = matrixProduct(add(A21, A22), B11)
        m3 = matrixProduct(A11, subtract(B12, B22))
        m4 = matrixProduct(A22, subtract(B21, B11))
        m5 = matrixProduct(add(A11, A12), B22)
        m6 = matrixProduct(subtract(A21, A11), add(B11, B12))
        m7 = matrixProduct(subtract(A12, A22), add(B21, B22))

        // --- COMBINE: assemble the result matrix using additions ---
        C11 = add(subtract(add(m1, m4), m5), m7)
        C12 = add(m3, m5)
        C21 = add(m2, m4)
        C22 = add(subtract(add(m1, m3), m2), m6)

        return compose(C11, C12, C21, C22)
```

**Ejemplo:** $\begin{pmatrix} 3 & 5 \\ 7 & 1 \end{pmatrix} \cdot \begin{pmatrix} 2 & 4 \\ 3 & 1 \end{pmatrix}$

$m_1 = (3+1)(2+1) = 12$, $m_2 = (7+1) \cdot 2 = 16$, $m_3 = 3(4-1) = 9$
$m_4 = 1(3-2) = 1$, $m_5 = (3+5) \cdot 1 = 8$, $m_6 = (7-3)(2+4) = 24$, $m_7 = (5-1)(3+1) = 16$

$C_{11} = 12+1-8+16 = 21$, $C_{12} = 9+8 = 17$, $C_{21} = 16+1 = 17$, $C_{22} = 12+9-16+24 = 29$

$$\begin{pmatrix} 21 & 17 \\ 17 & 29 \end{pmatrix}$$

**Complejidad temporal:**

| Metodo | Complejidad |
| ---- | ----------- |
| Tradicional | $O(n^3)$ — 8 multiplicaciones de submatrices |
| Strassen | $\Theta(n^{2.8})$ — 7 multiplicaciones de submatrices |

> [!info] Recurrencia de Strassen
> $T(n) = 7T(n/2) + 12n^2$ → $a=7, b=2, k=2$ → $a > b^k$ (7 > 4) → $\Theta(n^{\log_2 7}) \approx \Theta(n^{2.8})$
