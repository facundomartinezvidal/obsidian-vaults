---
materia: Ciencia de Datos
clase: 9
bloque: Aprendizaje supervisado
parcial: 2
tags:
  - resumen-final
  - ciencia-de-datos
  - regresion
  - regresion-lineal
  - r2
fuente: content/2-parcial/material/09-modelos-de-regresion.pdf
---

# Clase 9 — Modelos de Regresión

## 1. ¿Qué es la Regresión?

**Concepto clave:** La **regresión** es una técnica estadística y de machine learning que modela la relación entre una **variable dependiente** (objetivo) y una o más **variables independientes** (predictoras). Su propósito es **predecir valores continuos** (números reales) o estimar el efecto de las predictoras sobre la variable objetivo.

El análisis de regresión permite entender **cómo cambia la variable objetivo** cuando se modifican las variables de entrada. Ejemplos de valores numéricos que predice: precios de viviendas, ventas y demanda, consumo energético.

| | **Regresión** | **Clasificación** |
|---|---|---|
| Qué predice | Valores **continuos** (números reales) | Categorías **discretas** (clases) |
| Ejemplo | ¿Cuál será el precio de esta casa? | ¿Es spam o no spam? |

> [!tip] Idea central
> El objetivo es encontrar una función **f(X) que aproxime Y** de la mejor manera posible, **minimizando el error** entre predicción y realidad.

---

## 2. Tipos de modelos de regresión

**Concepto clave:** La clase organiza los modelos según la naturaleza de la relación (lineal / no lineal) y el tipo de variable objetivo (continua / categórica).

| Modelo | Descripción | Ejemplo de la clase |
|---|---|---|
| **Lineal Simple** | Una sola variable predictora X. Modela relaciones lineales directas | Predecir peso a partir de la altura |
| **Lineal Múltiple** | Múltiples predictoras X₁, X₂, …, Xₖ. Captura efectos combinados | Precio de casa según tamaño, ubicación y año |
| **Polinómica** | Términos polinomiales de X. Modela curvas y relaciones no lineales | Crecimiento poblacional con tasas variables |
| **Logística** | Para clasificación binaria. Predice probabilidades con la función sigmoide | ¿Aprobará el cliente el crédito? (Sí/No) |
| **Árboles de Regresión** | Particiones recursivas del espacio de datos. Modelos **no paramétricos** | Segmentación de clientes por comportamiento |

---

## 3. Regresión lineal simple: el modelo y sus componentes

**Concepto clave:** La regresión lineal simple modela la relación entre una variable independiente **X** y una dependiente **Y** mediante una recta. La ecuación es:

$Y = \beta_0 + \beta_1 X + \varepsilon$

Cada componente tiene un significado preciso:

| Componente | Nombre | Significado |
|---|---|---|
| $\beta_0$ | **Intersección** (intercepto) | Valor de Y cuando X = 0 |
| $\beta_1$ | **Pendiente** | Cambio en Y por cada unidad de X |
| $\varepsilon$ | **Error** | Variabilidad no explicada por el modelo |

El objetivo es encontrar los valores óptimos de $\beta_0$ y $\beta_1$ que **minimicen la diferencia** entre valores observados y predichos (método de mínimos cuadrados).

> [!example] Ejemplo intuitivo (precio de una pizza)
> Modelamos el precio de una pizza (Y) según su diámetro en cm (X). Con $\beta_0 = 5$ y $\beta_1 = 1.5$:
> - Una pizza de 30 cm cuesta: $5 + 1.5 \times 30 = \$50$
> - Cada cm adicional aumenta el precio en **\$1.50** (la pendiente)
> - El precio base (diámetro 0) es **\$5** (la intersección)
> - El término $\varepsilon$ captura factores no medidos: ingredientes especiales, ubicación de la pizzería, etc.

---

## 4. Interpretación de los coeficientes

**Concepto clave:** En el modelo $Y = \beta_0 + \beta_1 X + \varepsilon$, cada coeficiente traduce el resultado matemático en un *insight* accionable.

- **β₀ — Intersección:** valor esperado de Y cuando **X = 0**. Solo tiene sentido práctico si X = 0 es un valor observable en el contexto (ej: precio base de una casa de 0 m²).
- **β₁ — Pendiente:** por cada unidad adicional en X, Y cambia en promedio **β₁ unidades**.
  - $\beta_1 > 0$ → relación **positiva**
  - $\beta_1 < 0$ → relación **negativa**
  - $\beta_1 \approx 0$ → **sin relación** lineal

> [!warning] La correlación no implica causalidad
> Si modelamos precio vs. metros cuadrados y $\beta_1 = 2500$, cada m² adicional aumenta el precio en **\$2.500** en promedio. Pero ¡cuidado!: esto **no implica causalidad**.

---

## 5. Diagnóstico de residuos y supuestos

**Concepto clave:** Los **residuos** $e_i = Y_i - \hat{Y}_i$ son las diferencias entre valores observados y predichos. Analizarlos es crucial para validar el modelo, porque de ellos dependen los supuestos de la regresión lineal.

| Supuesto | Qué exige | Cómo se detecta |
|---|---|---|
| **Linealidad** | La relación entre X e Y debe ser lineal | Gráfico de residuos vs. valores predichos |
| **Independencia** | Los residuos no deben estar correlacionados entre sí | Prueba de **Durbin-Watson** (autocorrelación) |
| **Homocedasticidad** | La varianza de los residuos debe ser constante | Forma de **embudo** en el gráfico indica heterocedasticidad |
| **Normalidad** | Los residuos deben seguir una distribución normal | **Q-Q plot** y tests de normalidad |
| **No multicolinealidad** | (Regresión múltiple) las predictoras no deben estar altamente correlacionadas | Ver sección 7 |

El **gráfico de residuos vs. valores predichos** es la herramienta principal: patrones sistemáticos (curvas, embudos) indican problemas, mientras que una **nube aleatoria** alrededor de cero confirma que los supuestos se cumplen razonablemente.

> [!important] Consecuencias de violar los supuestos
> Si se violan estos supuestos, las **inferencias estadísticas** (p-valores, intervalos de confianza) **no son válidas**.

---

## 6. Regresión lineal múltiple

**Concepto clave:** La regresión lineal múltiple extiende el modelo simple incorporando **k variables predictoras**:

$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_k X_k + \varepsilon$

En **notación matricial**: $Y = X\beta + \varepsilon$, donde X es la **matriz de diseño** con todas las observaciones.

Cada coeficiente $\beta_j$ representa el **cambio esperado en Y** por cada unidad de cambio en $X_j$, **manteniendo todas las demás variables constantes**. Esto se conoce como **efecto marginal** — captura efectos que la regresión simple no puede aislar.

> [!example] Ejemplo: precio de vivienda
> Predictoras del precio: X₁ = metros cuadrados, X₂ = número de habitaciones, X₃ = distancia al centro (km), X₄ = año de construcción.
> Si $\beta_2 = 15000$: cada habitación adicional aumenta el precio en **\$15.000**, manteniendo constantes los demás factores.

---

## 7. Multicolinealidad

**Concepto clave:** La **multicolinealidad** ocurre cuando dos o más variables predictoras están **altamente correlacionadas** entre sí, dificultando la estimación precisa de los coeficientes individuales.

| Indicadores | Soluciones |
|---|---|
| Correlación alta entre pares de variables (**r > 0.8**) | **Eliminar** variables redundantes (dejar la más relevante) |
| **VIF > 10** (Variance Inflation Factor) → multicolinealidad severa | **Combinar** variables en un índice o score |
| Coeficientes con **signos inesperados** | Usar **PCA** (Análisis de Componentes Principales) |
| Errores estándar de coeficientes **muy grandes** | Aplicar **regularización** (Ridge, Lasso) |

> [!example] Ejemplo clásico
> En un modelo de precios de autos con "longitud en cm" y "peso en kg" a la vez, ambas estarán altamente correlacionadas. El modelo no podrá determinar cuál realmente influye en el precio, produciendo coeficientes inestables e interpretaciones engañosas.

---

## 8. Selección de variables

**Concepto clave:** Elegir las predictoras adecuadas es fundamental para un modelo **parsimonioso y efectivo**. Entre modelos con rendimiento similar, preferir el más simple (**navaja de Occam**).

| Método | Cómo funciona | Característica |
|---|---|---|
| **Forward Selection** | Empezar sin variables e ir **añadiendo** la más significativa en cada paso | Se detiene cuando ninguna variable restante mejora el modelo significativamente |
| **Backward Elimination** | Empezar con **todas las variables** e ir **eliminando** la menos significativa | Más conservador: evalúa el contexto completo desde el inicio |
| **Stepwise Selection** | Combinación de ambos: en cada paso puede **añadir o eliminar** | Más flexible pero más propenso a *overfitting* |

---

## 9. Regresión logística

**Concepto clave:** Aunque se llama "regresión", la **regresión logística** se usa para **clasificación** (binaria: 0/1, Sí/No, Verdadero/Falso). La regresión lineal ordinaria no sirve aquí porque puede predecir valores **fuera del rango [0,1]**.

La salida es una **probabilidad de pertenencia a una clase**, obtenida comprimiendo el resultado lineal con la función logística:

$p = \dfrac{1}{1 + e^{-(\beta_0 + \beta_1 X)}}$

### La función sigmoide

Es el **corazón** de la regresión logística. Transforma cualquier valor real en un número **entre 0 y 1**, interpretable como probabilidad:

$\sigma(z) = \dfrac{1}{1 + e^{-z}}\quad\text{donde}\quad z = \beta_0 + \beta_1 X$

Su forma de **"S"** permite modelar decisiones binarias de manera **suave y diferenciable**, fundamental para la optimización por gradiente.

| z | σ(z) | Interpretación |
|---|---|---|
| −3 | ≈ 0.05 | 5% de probabilidad |
| −1 | ≈ 0.27 | |
| **0** | **0.50** | **Punto de corte / umbral de decisión** |
| 1 | ≈ 0.73 | |
| 3 | ≈ 0.95 | 95% de probabilidad |

> [!note] Umbral de decisión
> En $z = 0$ se decide: valores **positivos** de z favorecen la **clase 1**; valores **negativos** favorecen la **clase 0**.

### Repaso: matriz de confusión

La matriz de confusión evalúa un clasificador binario comparando **predicciones vs. valores reales**.

| | Predicción: Positivo | Predicción: Negativo |
|---|---|---|
| **Real: Positivo** | **VP** (Verdadero Positivo) | **FN** — Falso Negativo (**Error Tipo II**) |
| **Real: Negativo** | **FP** — Falso Positivo (**Error Tipo I**) | **VN** (Verdadero Negativo) |

**Métricas derivadas:**
- **Accuracy** = $(VP + VN) / \text{Total}$ — proporción total de aciertos. Puede ser **engañosa** si las clases están desbalanceadas.
- **Precision** = $VP / (VP + FP)$ — de los que predije positivo, ¿cuántos lo eran realmente?
- **Recall** = $VP / (VP + FN)$ — de los realmente positivos, ¿cuántos detecté?
- **F1-Score** = $2 \times \dfrac{Precision \times Recall}{Precision + Recall}$ — **media armónica** que equilibra ambas.

---

## 10. Regresión polinómica

**Concepto clave:** Muchas relaciones reales **no son lineales**. La regresión polinómica extiende el modelo lineal añadiendo **potencias de la variable predictora**:

$Y = \beta_0 + \beta_1 X + \beta_2 X^2 + \beta_3 X^3 + \dots + \beta_d X^d + \varepsilon$

El **grado d** del polinomio determina la flexibilidad del modelo:

| Grado | Forma que captura | Ejemplo |
|---|---|---|
| **1 (lineal)** | Recta constante | Útil cuando la relación es estable |
| **2 (cuadrático)** | Parábola — un cambio de dirección (máximo o mínimo) | Rendimiento académico vs. horas de estudio (más horas no siempre es mejor) |
| **3 (cúbico)** | Un **punto de inflexión** | Curva de crecimiento de una empresa: lento al inicio, rápido en medio, estabilización al final |
| **> 3** | Formas más complejas | — |

### Grado del polinomio y compromiso sesgo–varianza

La elección del grado implica un **equilibrio entre sesgo y varianza** (*bias-variance tradeoff*).

| Grado | Comportamiento | Sesgo / Varianza |
|---|---|---|
| **Bajo (1–2)** | Modelo **rígido**; puede **subajustar** (*underfitting*) | Alto sesgo, baja varianza |
| **Medio (3–5)** | Buen **balance** para muchas aplicaciones | Balance razonable |
| **Alto (> 5)** | Muy flexible; puede **sobreajustar** (*overfitting*), capturando ruido como si fuera señal | Bajo sesgo, alta varianza; predicciones inestables en datos nuevos |

> [!tip] Criterio práctico
> El grado óptimo se determina mediante **validación cruzada**. Aumentar el grado mientras el **error de validación** siga mejorando. Si el error de validación empieza a **subir** mientras el error de entrenamiento sigue bajando → señal de **overfitting**.

---

## 11. Árboles de regresión

**Concepto clave:** Un árbol de regresión es una **estructura jerárquica** que divide recursivamente los datos en subconjuntos más homogéneos (particiones del espacio). Es **no paramétrico** e intrínsecamente **interpretable**: se puede visualizar y seguir el camino de decisión.

**Estructura:** cada **nodo interno** representa una pregunta sobre una variable (ej: $X_1 < \text{umbral}$), cada **rama** es una respuesta, y cada **hoja** es la predicción final ($\hat{Y}$), típicamente el **promedio de Y** en esa región. El árbol aprende reglas del tipo: *"Si X₁ < 5.2 y X₂ > 3.0, entonces Ŷ = 42.5"*.

### Criterios de división

En cada nodo, el algoritmo busca la **variable y el umbral** que mejor dividen los datos:

- **Reducción de la varianza (split):** se elige la división que **maximiza la reducción de la varianza** de Y en los subconjuntos resultantes. La **ganancia** = varianza del padre − varianza ponderada de los hijos. Cuanto mayor la ganancia, mejor la división.
- **Salida continua:** la predicción de la hoja es el **promedio** de la variable objetivo de todos los datos que cayeron en ese nodo. Ej: si en una hoja caen 5 casas de precios 100k, 120k, 110k, 130k y 140k, el árbol predice el promedio **120k** para cualquier casa nueva que caiga ahí.

**Proceso del algoritmo:** (1) para cada variable $X_j$, evaluar puntos medios como umbrales; (2) calcular la ganancia de cada división; (3) seleccionar la de **mayor ganancia**; (4) repetir recursivamente hasta la condición de parada.

### Podado y regularización

Los árboles profundos tienden a **sobreajustar**. Controlar la complejidad es esencial para generalizar bien.

- **Pre-pruning** (podado preventivo): detener el crecimiento antes de que se vuelva demasiado complejo. Más eficiente computacionalmente.
- **Post-pruning** (podado retrospectivo): crecer el árbol completo y luego eliminar ramas que no contribuyen. Más preciso pero más costoso.

| Hiperparámetro | Función |
|---|---|
| `max_depth` | Profundidad máxima del árbol |
| `min_samples_split` | Mínimo de muestras para dividir un nodo |
| `min_samples_leaf` | Mínimo de muestras en un nodo hoja |
| `max_leaf_nodes` | Máximo número de nodos hoja |

> [!tip] Estrategia recomendada
> En la práctica, el **pre-pruning con validación cruzada** es lo más usado. Comenzar con valores conservadores (`max_depth`=5-10, `min_samples_leaf`=5-20) y ajustar con *grid search* o *random search*. Estos hiperparámetros actúan como **regularizadores**.

### Ventajas y limitaciones

| Ventajas | Limitaciones |
|---|---|
| Fácil de interpretar y visualizar | Propensión al **overfitting** si no se controla la profundidad |
| No requiere supuestos sobre la distribución | **Inestabilidad**: pequeños cambios en los datos → árboles muy distintos |
| Maneja automáticamente interacciones entre variables | Menor precisión predictiva que modelos más complejos |
| **Robusto a outliers** (afectan solo a su región) | Dificultad para capturar relaciones lineales suaves |
| Funciona con datos numéricos y categóricos | Tendencia a crear **regiones rectangulares** poco realistas |
| Requiere poca preparación (no necesita normalización) | Puede sesgarse hacia variables con más categorías |

---

## 12. Métricas de validación de regresión

**Concepto clave:** Para medir y comparar el desempeño de modelos de regresión de forma rigurosa se usan métricas basadas en el error entre valores reales $y_i$ y predichos $\hat{y}_i$ (en las fórmulas del material, el predicho se nota $x_i$).

| Métrica | Fórmula | Interpretación |
|---|---|---|
| **MSE** (Mean Squared Error) | $MSE = \dfrac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{n}$ | Promedio de errores al cuadrado. **Penaliza más los errores grandes**. Unidades al cuadrado |
| **RMSE** (Root Mean Squared Error) | $RMSE = \sqrt{\dfrac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{n}}$ | Raíz cuadrada del MSE. Interpretable en las **mismas unidades que Y**. Muy utilizado |
| **MAE** (Mean Absolute Error) | $MAE = \dfrac{\sum_{i=1}^{n}\lvert y_i - \hat{y}_i \rvert}{n}$ | Promedio del valor absoluto de los errores. **Más robusto a outliers** que MSE/RMSE |
| **R²** (Coeficiente de determinación) | $R^2 = 1 - \dfrac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \mu_y)^2}$ | Proporción de **varianza explicada**. $0 \le R^2 \le 1$, donde **1 es ajuste perfecto** |

> [!important] Datos que suelen preguntarse
> - **RMSE** y **MAE** se leen en las **mismas unidades** que Y; el **MSE** queda en unidades al cuadrado.
> - **MSE/RMSE penalizan más** los errores grandes; **MAE es más robusto** a outliers.
> - **R² = 1** → ajuste perfecto; **R² = 0** → el modelo no explica nada más que la media.

---

## Mapa de conceptos de la clase

- **Regresión** = predice valores **continuos** (vs. clasificación = categorías). Meta: hallar f(X) que minimice el error.
- **Lineal simple:** $Y = \beta_0 + \beta_1 X + \varepsilon$ — β₀ intersección, β₁ pendiente, ε error. Mínimos cuadrados.
- **Lineal múltiple:** $Y = \beta_0 + \beta_1 X_1 + \dots + \beta_k X_k + \varepsilon$ (matricial $Y = X\beta + \varepsilon$); coeficientes = **efecto marginal** (ceteris paribus).
- **Supuestos (residuos):** linealidad, independencia (Durbin-Watson), homocedasticidad, normalidad (Q-Q plot), no multicolinealidad.
- **Multicolinealidad:** r > 0.8 o **VIF > 10** → eliminar, combinar, PCA o regularización.
- **Selección de variables:** Forward, Backward, Stepwise (navaja de Occam).
- **Logística:** clasificación binaria vía **sigmoide** $\sigma(z) = 1/(1+e^{-z})$; umbral en z = 0 (p = 0.5). Métricas: accuracy, precision, recall, F1.
- **Polinómica:** $Y = \beta_0 + \beta_1 X + \dots + \beta_d X^d + \varepsilon$; grado d ↔ **sesgo–varianza**; grado óptimo por validación cruzada.
- **Árboles de regresión:** particiones recursivas; hoja = **promedio de Y**; split = **máxima reducción de varianza**; podado (pre/post) e hiperparámetros contra overfitting.
- **Métricas de regresión:** MSE, RMSE (mismas unidades que Y), MAE (robusto a outliers), **R²** (varianza explicada, 1 = perfecto).
