---
materia: Ciencia de Datos
clase: 4
fecha: 2026-04-17
bloque: Minería de datos / EDA
parcial: 1
tags:
  - resumen-final
  - ciencia-de-datos
  - mineria-de-datos
  - kdd
  - crisp-dm
  - semma
  - eda
fuente: content/1-parcial/04-material-mineria-de-datos-y-eda.pdf
---

# Clase 4 — Introducción a la Minería de Datos y Análisis Exploratorio de Datos (EDA)

## 1. ¿Qué es la Minería de Datos?

> [!quote] Definición de Fayyad et al. (1996)
> "La minería de datos es un paso en el proceso de **descubrimiento de conocimiento** en bases de datos, que consiste en la aplicación de **algoritmos específicos** para **extraer patrones previamente desconocidos**, válidos, potencialmente útiles y comprensibles a partir de los datos."

**Cuatro ideas clave de la definición:**
1. **Parte de un proceso mayor** — es solo **un paso** dentro del proceso **KDD**, no el proceso completo.
2. **Patrones desconocidos** — busca patrones no triviales, que no son evidentes a simple vista.
3. **Válidos estadísticamente** — los patrones deben ser estadísticamente significativos y confiables.
4. **Útiles y comprensibles** — deben aportar valor y ser interpretables por humanos.

> [!tip] Concepto para el parcial
> Minería de datos ≠ KDD. La **minería** es el paso de aplicar algoritmos; el **KDD** es todo el ciclo (de datos brutos a conocimiento).

---

## 2. Proceso KDD (Knowledge Discovery in Databases)

**Concepto clave:** El KDD (Fayyad, 1996) representa el **ciclo de vida completo** de la ciencia de datos: transforma datos brutos en **conocimiento accionable**. La minería de datos es solo uno de sus pasos.

**Las 6 etapas (en orden):**

| # | Etapa | Qué hace |
|---|---|---|
| 1 | **Selección de datos** | Elegir el subconjunto de datos relevante → *datos seleccionados* |
| 2 | **Limpieza y preparación** (preproceso) | Corregir errores, faltantes, ruido → *datos preprocesados* |
| 3 | **Transformación de datos** | Reducción / reformateo de datos → *datos transformados* |
| 4 | **Minería de datos** | Aplicar algoritmos para extraer *patrones* |
| 5 | **Evaluación de patrones** | Interpretar y evaluar los patrones hallados |
| 6 | **Presentación del conocimiento** | Comunicar el *conocimiento* resultante |

> [!note] Ciclo iterativo
> El diagrama de Fayyad muestra flechas de retorno: se puede volver a etapas anteriores. No es estrictamente lineal.

---

## 3. Metodología SEMMA (SAS)

**Concepto clave:** Metodología **propietaria de SAS** para minería de datos; guía al analista por un proceso estructurado de descubrimiento de patrones. Acrónimo de sus 5 fases:

| Letra | Fase | Qué hace |
|---|---|---|
| **S** | **Sample** (Muestreo) | Seleccionar el conjunto de datos para modelado |
| **E** | **Explore** (Explorar) | Comprender los datos: descubrir relaciones anticipadas e imprevistas y anomalías mediante visualización |
| **M** | **Modify** (Modificar) | Seleccionar, crear y transformar variables como preparación para el modelado |
| **M** | **Model** (Modelo) | Aplicar técnicas de modelado a las variables preparadas |
| **A** | **Assess** (Evaluación) | Evaluar los resultados: fiabilidad y utilidad de los modelos |

---

## 4. Metodología CRISP-DM

**Concepto clave:** **CRISP-DM** (Cross-Industry Standard Process for Data Mining) es el **estándar de facto** más usado en la industria: marco estructurado y flexible, aplicable a cualquier sector. Es **cíclico**.

**Las 6 fases:**

| # | Fase | Qué hace |
|---|---|---|
| 1 | **Entender el negocio** (Business Understanding) | Comprender objetivos y requisitos desde la perspectiva de negocio, y convertirlos en un problema de minería de datos |
| 2 | **Entender los datos** (Data Understanding) | Recopilación inicial, familiarización, identificación de problemas de calidad, primeras ideas |
| 3 | **Preparar los datos** (Data Preparation) | Selección, limpieza, construcción, integración y formateo. **Consume ~70-80% del tiempo del proyecto** |
| 4 | **Entrenamiento / Modelado** (Modeling) | Seleccionar técnicas, generar escenarios de prueba, construir y ajustar modelos |
| 5 | **Evaluación del modelo** (Evaluation) | Evaluar que el modelo cumple los objetivos de negocio; detectar problemas de modelado |
| 6 | **Producción / Despliegue** (Deployment) | Implementar en producción, planificar monitoreo y mantenimiento, informes finales |

> [!important] Datos que suelen preguntarse
> - **CRISP-DM** = estándar de la industria (el más usado).
> - La fase que **más tiempo consume** es la **preparación de datos** (~70-80%).
> - Empieza y termina en el **negocio** (entender el negocio → desplegar para el negocio).

---

## 5. Comparación de metodologías

| | **KDD** | **SEMMA** | **CRISP-DM** |
|---|---|---|---|
| Origen | Académico (Fayyad, 1996) | SAS (propietaria) | Estándar de industria |
| Enfoque | Descubrimiento de conocimiento | Técnico / modelado | Negocio + técnico |
| Incluye negocio explícito | No tanto | No | **Sí** (fase 1 y 6) |
| Nº de etapas | 6 (+ selección) | 5 | 6 |

> [!note] Ciclo de vida ampliado (Microsoft)
> La clase muestra el **Data Science Lifecycle** de Microsoft: Business Understanding → Data Acquisition & Understanding → Modeling (Feature Engineering, Model Training, Model Evaluation) → Deployment → aceptación del cliente. Agrega explícitamente **Feature Engineering** y el despliegue con Model Store / Web Services / Intelligent Applications.

---

## 6. Análisis Exploratorio de Datos (EDA)

> [!quote] Definición de John Tukey (1977)
> "El análisis exploratorio de datos es una **actitud, un estado mental y un conjunto de herramientas** para examinar datos **antes** de aplicar métodos estadísticos confirmatorios."

**Para qué sirve el EDA (4 objetivos según la clase):**
1. **Análisis descriptivo** — resumir los datos.
2. **Descubrir y entender patrones**.
3. **Identificar anomalías y valores atípicos** (outliers).
4. **Encontrar relaciones** entre variables.

El EDA es el **embudo** que va de los *datos de la realidad (raw data)* a las *conclusiones*.

> [!info] Definición del NIST
> El EDA es un enfoque que emplea técnicas (principalmente **gráficas**) para: (1) maximizar la **visión** del conjunto de datos, (2) descubrir **estructuras subyacentes**, (3) extraer **variables importantes**, (4) detectar **valores atípicos y anomalías**, (5) probar **supuestos subyacentes**.

---

## 7. Tipos de EDA

**Concepto clave:** El EDA se clasifica según **cuántas variables** analiza (una vs. varias) y si usa **gráficos o no**.

| Tipo | Nº variables | Gráfico | Qué hace | Ejemplo de la clase |
|---|---|---|---|---|
| **1. Univariante No Gráfico** | Una | No | Estadísticos resumen de una sola variable (tendencia central, dispersión) | Media de edad = 45.2 años, desvío estándar = 12 años |
| **2. Univariante Gráfico** | Una | Sí | Visualizar forma y distribución de esa variable | **Histograma** de prescripciones por hora → picos a las 10 AM y 5 PM |
| **3. Multivariante No Gráfico** | Dos o más | No | Relación entre variables mediante coeficientes | **Matriz de correlación**: r = 0.85 entre edad y costo (relación lineal fuerte) |
| **4. Multivariante Gráfico** | Dos o más | Sí | Visualizar cómo interactúan variables | **Gráfico de dispersión (scatter)**: dosis vs. eficacia, coloreado por grupo → detectar *clusters* |
| **5. Otros gráficos multivariantes** | Múltiples | Sí | Técnicas avanzadas para muchas dimensiones | **Mapa de calor (heatmap)**, **gráfico de burbujas** (3ª variable = tamaño) |

> [!tip] Regla mental
> **Univariante** = 1 variable · **Multivariante** = 2+ variables. **No gráfico** = números/estadísticos · **Gráfico** = visualización.

---

## 8. Gráficos típicos de EDA

**Ejemplos de gráficos (de la clase):**
- **Histograma** — distribución/frecuencia de una variable.
- **Gráfico de caja (box plot)** — mediana, cuartiles, outliers (los "bigotes").
- **Gráfico de dispersión (scatter plot)** — relación entre dos variables numéricas.
- **Gráfico de burbujas** — como el scatter, pero el tamaño de la burbuja es una 3ª variable.
- **Treemap** — composición jerárquica por áreas.

> [!note] Elegir el gráfico según el objetivo (adelanto de visualización)
> La clase adelanta un árbol de decisión para elegir visualización según **qué se desea mostrar**:
> - **Comparación** → barras / líneas.
> - **Relación** → dispersión (2 variables) o burbujas (3 variables).
> - **Distribución** → histograma / dispersión.
> - **Composición** → torta, barras apiladas, treemap.

---

## Mapa de conceptos de la clase

- **Minería de datos** (Fayyad) = paso del KDD que aplica algoritmos para extraer patrones desconocidos, válidos, útiles.
- **KDD** = ciclo completo (6 etapas): selección → limpieza → transformación → minería → evaluación → presentación.
- **SEMMA** (SAS) = Sample, Explore, Modify, Model, Assess.
- **CRISP-DM** = estándar de industria (6 fases): negocio → datos → **preparación (70-80% del tiempo)** → modelado → evaluación → producción. Cíclico.
- **EDA** (Tukey) = examinar datos antes de la estadística confirmatoria; descriptivo, patrones, outliers, relaciones.
- **Tipos de EDA:** univariante/multivariante × gráfico/no gráfico.
- **Gráficos:** histograma, box plot, scatter, burbujas, heatmap, treemap.
