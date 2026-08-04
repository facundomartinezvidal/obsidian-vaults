---
materia: Ciencia de Datos
clase: 8
bloque: Aprendizaje supervisado
parcial: 2
tags:
  - resumen-final
  - ciencia-de-datos
  - random-forest
  - bagging
  - ensemble
fuente: content/2-parcial/material/08a-random-forest.pdf
---

# Clase 8 — Random Forest

## 1. ¿Qué es Random Forest?

**Concepto clave:** Random Forest es un algoritmo de **Ensemble Learning** (aprendizaje por conjuntos) que **combina múltiples árboles de decisión** para producir predicciones más **robustas y precisas** que las de un árbol individual. El nombre resume sus dos ideas centrales: *"Random"* (aleatoriedad en los datos y en las características) y *"Forest"* (un bosque, es decir, muchos árboles).

Es un algoritmo **versátil**: sirve tanto para **clasificación** como para **regresión**.

| Tarea | Qué predice | Cómo agrega el bosque | Ejemplo |
|---|---|---|---|
| **Clasificación** | Categorías discretas | El bosque **vota** por la clase mayoritaria | ¿spam o no? ¿tumor benigno o maligno? |
| **Regresión** | Valores continuos | El bosque **promedia** las predicciones numéricas | precio de una casa, temperatura futura |

> [!tip] Fortaleza principal (para el parcial)
> La gran ventaja de Random Forest es que **reduce el *overfitting*** inherente a un solo árbol: promedia el resultado de muchos modelos débiles (árboles) para construir uno fuerte.

---

## 2. Del árbol de decisión al bosque

**Concepto clave:** Un árbol de decisión individual es interpretable y rápido, pero tiene un defecto grave: **tiende a sobreajustarse (overfitting)** al ruido de los datos de entrenamiento. Random Forest nace justamente para corregir esa debilidad **combinando muchos árboles**.

| | **Árbol individual** | **Random Forest** |
|---|---|---|
| Interpretabilidad | Alta: sigue reglas lógicas tipo *"si-entonces"* | Menor (es un conjunto de cientos de árboles) |
| Velocidad | Rápido de entrenar y de consultar | Más costoso, pero paralelizable |
| **Problema / solución** | **Problema:** tiende a **sobreajustarse** al ruido | **Solución:** el error de un árbol se cancela con el acierto de otros |
| Comportamiento | Un árbol profundo **memoriza** el dataset en lugar de generalizar | Entrena **cientos de árboles** independientes y combina por **votación o promedio** |

> [!note] Analogía del comité de expertos
> Un **comité de expertos** toma mejores decisiones que un solo experto. Aunque cada árbol se equivoque a veces, la mayoría suele acertar: los errores individuales se compensan entre sí.

---

## 3. Bagging: Bootstrap Aggregating

**Concepto clave:** El **bagging** (contracción de *Bootstrap Aggregating*) es la **primera fuente de aleatoriedad** de Random Forest. Consiste en dos pasos que dan nombre a la técnica: **bootstrap** (crear muchos subconjuntos de datos por muestreo con reemplazo) y **aggregating** (combinar las predicciones de los árboles entrenados sobre esos subconjuntos).

**Cómo funciona el flujo:**

1. Del **dataset original** de N muestras se generan B subconjuntos: *Muestra 1, Muestra 2, … Muestra B*.
2. Con cada subconjunto se entrena un árbol distinto: *Árbol 1, Árbol 2, … Árbol B*.
3. Todos los árboles convergen en un paso de **agregación** (votación para clasificación, promedio para regresión).

### 3.1 Bootstrap (muestreo con reemplazo)

Cada subconjunto se crea seleccionando aleatoriamente **N muestras con reemplazo** desde el dataset original (mismo tamaño que el original). Como el muestreo es *con reemplazo*:

- Algunas muestras **se repiten** dentro del subconjunto.
- Otras **quedan afuera**: son las muestras **out-of-bag (OOB)**.

El resultado es que cada árbol ve un conjunto de datos **ligeramente diferente**, lo que fuerza diversidad entre los árboles.

### 3.2 Aggregating (agregación) y reducción de varianza

**Concepto clave:** Promediar (o votar) las predicciones de modelos entrenados sobre datos ligeramente distintos **estabiliza el resultado** y evita el sobreajuste a puntos específicos. Este es el mecanismo por el que el bagging **reduce la varianza** del modelo.

> [!important] Por qué el bagging reduce el overfitting
> Un solo árbol sobreajusta porque su predicción depende demasiado de las particularidades (ruido) de *sus* datos de entrenamiento. Al promediar muchos árboles entrenados sobre muestras bootstrap distintas, el **ruido aleatorio de cada árbol se cancela** y sobrevive solo la **señal común**. Menos varianza = menos overfitting = mejor generalización.

---

## 4. Aleatoriedad en las características (Feature Randomness)

**Concepto clave:** La **segunda fuente de aleatoriedad** es la **selección aleatoria de predictores en cada división (split)**. En lugar de evaluar **todas** las variables disponibles en cada nodo, el algoritmo elige un **subconjunto aleatorio de *m* predictores** y busca la mejor división solo dentro de ese subconjunto. Este subconjunto es **diferente en cada nodo y en cada árbol**, lo que fuerza diversidad.

> [!note] ¿Por qué funciona la aleatoriedad de características?
> - **Decorrelación:** si una variable es **extremadamente dominante**, no aparecerá en todos los árboles (a veces queda fuera del subconjunto sorteado). Así los árboles dejan de parecerse entre sí.
> - Los árboles aprenden **patrones alternativos** en lugar de depender siempre del mismo predictor.
> - Resultado: un bosque más **diverso** y un modelo con **menor varianza**.

> [!tip] Las dos fuentes de aleatoriedad (clave del algoritmo)
> 1. **Bagging / bootstrap** → aleatoriedad en las **filas** (qué muestras ve cada árbol).
> 2. **Feature randomness** → aleatoriedad en las **columnas** (qué variables considera cada split).
> Juntas garantizan que los árboles sean **distintos e independientes**, condición necesaria para que sus errores se cancelen al agregarlos.

---

## 5. Proceso del algoritmo

**Concepto clave:** El entrenamiento de Random Forest se resume en cuatro pasos que combinan las dos fuentes de aleatoriedad y aprovechan que cada árbol se entrena de forma **independiente**.

| # | Paso | Qué hace |
|---|---|---|
| 1 | **Definir parámetros** | Elegir número de árboles (`n_estimators`), características por split (`max_features`) y profundidad máxima (`max_depth`) |
| 2 | **Muestreo bootstrap** | Para cada árbol, generar una muestra bootstrap: N muestras con reemplazo (quedan datos out-of-bag) |
| 3 | **Construir cada árbol** | En cada nodo, sortear *m* características y dividir usando la mejor según el criterio de impureza (**Gini** o **Entropía**). **No se poda** el árbol |
| 4 | **Repetir y paralelizar** | Repetir los pasos 2-3 para todos los árboles. Como son **independientes**, el entrenamiento se puede **paralelizar** en múltiples núcleos de CPU |

> [!tip] Clave didáctica: por qué no se poda
> A diferencia de un árbol individual (donde la poda evita el overfitting), Random Forest **no requiere poda**: la **agregación de múltiples árboles sin podar** es precisamente lo que reduce la varianza. Cada árbol individual sobreajusta, pero el conjunto no.

---

## 6. Predicción: votación y promedio

**Concepto clave:** Una vez entrenado el bosque, para predecir una **nueva instancia** el dato pasa por **todos los árboles** y sus salidas se combinan según el tipo de tarea.

| Tarea | Mecanismo de agregación |
|---|---|
| **Clasificación** | Cada árbol **vota** por una clase; gana la clase con **más votos** (mayoría). También puede usarse la **probabilidad promedio** de cada clase |
| **Regresión** | Se **promedia** el valor numérico predicho por todos los árboles; la media reduce el impacto de predicciones atípicas individuales |

**Flujo de agregación:** *Nueva instancia X = [x₁, x₂, …, xₙ]* → pasa por cada árbol (Árbol 1 → Clase A, Árbol 2 → Clase B, Árbol 3 → Clase A, …) → **Predicción final** (mayoría o promedio).

> [!important] Cancelación de errores
> Donde un árbol se equivoca, otros árboles diversos suelen acertar. La **agregación de múltiples modelos independientes** es la clave del éxito de Random Forest.

---

## 7. Ventajas principales

**Concepto clave:** Random Forest combina buen rendimiento con facilidad de uso, lo que lo convierte en uno de los algoritmos más utilizados tanto en competencias (Kaggle) como en producción industrial.

- **Reduce el overfitting** drásticamente frente a un solo árbol de decisión.
- **Maneja miles de variables** sin necesidad de eliminación previa de características.
- **Importancia de características (feature importance):** mide qué variables son más influyentes en la predicción.
- **Robusto ante valores faltantes** y ante ruido en los datos de entrada.

> [!info] Dato clave
> Su popularidad viene del **equilibrio entre rendimiento, interpretabilidad y facilidad de uso**.

---

## Mapa de conceptos de la clase

- **Random Forest** = algoritmo de **Ensemble Learning**: combina muchos árboles de decisión → predicción más robusta. Sirve para **clasificación** (votación) y **regresión** (promedio).
- **Problema que resuelve:** un árbol individual **sobreajusta (overfitting)**; el bosque promedia muchos modelos y **reduce la varianza**.
- **Dos fuentes de aleatoriedad:**
  1. **Bagging (Bootstrap Aggregating):** muestreo **con reemplazo** de las filas → cada árbol ve datos distintos; muestras no usadas = **out-of-bag**.
  2. **Feature randomness:** subconjunto aleatorio de *m* predictores en **cada split** → decorrelaciona los árboles.
- **Agregación:** clasificación → **voto mayoritario**; regresión → **promedio**. Los errores individuales se **cancelan**.
- **Proceso:** definir parámetros (`n_estimators`, `max_features`, `max_depth`) → bootstrap → construir árboles (Gini/Entropía, **sin poda**) → repetir y **paralelizar**.
- **Por qué no se poda:** la agregación de árboles sin podar es lo que baja la varianza.
- **Ventajas:** menos overfitting, maneja muchas variables, feature importance, robusto ante faltantes y ruido.
