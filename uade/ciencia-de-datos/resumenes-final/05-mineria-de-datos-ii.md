---
materia: Ciencia de Datos
clase: 5
bloque: Minería de datos
parcial: 1
tags:
  - resumen-final
  - ciencia-de-datos
  - mineria-de-datos
  - machine-learning
  - aprendizaje-supervisado
  - aprendizaje-no-supervisado
  - eda
  - gartner
fuente: content/1-parcial/05-material-mineria-de-datos-ii.pdf
---

# Clase 5 — Introducción a la Minería de Datos II

## 1. Minería de datos y proceso KDD (repaso)

> [!quote] Definición de Fayyad et al. (1996)
> "La minería de datos es un paso en el proceso de **descubrimiento de conocimiento** en bases de datos, que consiste en la aplicación de **algoritmos específicos** para **extraer patrones previamente desconocidos**, válidos, potencialmente útiles y comprensibles a partir de los datos."

**Concepto clave:** La minería de datos es **un paso** dentro del proceso mayor **KDD** (Knowledge Discovery in Databases), no todo el proceso. Los patrones que busca deben ser **desconocidos** (no triviales), **válidos** (estadísticamente significativos), **útiles** (aportan valor) y **comprensibles** (interpretables por humanos).

El **KDD** (Fayyad, 1996) es el ciclo completo que transforma datos brutos en conocimiento:

| # | Etapa | Resultado |
|---|---|---|
| 1 | **Selección** | Datos seleccionados |
| 2 | **Preproceso** (limpieza) | Datos preprocesados |
| 3 | **Transformación** | Datos transformados |
| 4 | **Minería de datos** | Patrones |
| 5 | **Interpretación y evaluación** | Conocimiento |

> [!tip] Concepto para el parcial
> Minería de datos ≠ KDD. El diagrama de Fayyad tiene **flechas de retorno**: es iterativo, no estrictamente lineal.

---

## 2. Metodologías: SEMMA y CRISP-DM (repaso)

**Concepto clave:** Existen metodologías que estructuran el trabajo de minería. Las dos que retoma la clase son **SEMMA** (SAS) y **CRISP-DM** (estándar de la industria).

**SEMMA** (metodología propietaria de SAS) — 5 fases:

| Letra | Fase | Qué hace |
|---|---|---|
| **S** | Sample (Muestreo) | Seleccionar el conjunto de datos para modelado |
| **E** | Explore (Explorar) | Descubrir relaciones anticipadas/imprevistas y anomalías mediante visualización |
| **M** | Modify (Modificar) | Seleccionar, crear y transformar variables para el modelado |
| **M** | Model (Modelo) | Aplicar técnicas de modelado a las variables preparadas |
| **A** | Assess (Evaluación) | Evaluar fiabilidad y utilidad de los modelos |

**CRISP-DM** (Cross-Industry Standard Process for Data Mining) — 6 fases, **cíclico**:

1. **Entender el negocio.**
2. **Entender los datos.**
3. **Preparar los datos** (selección, preprocesamiento). ← la fase que **más tiempo consume**.
4. **Entrenamiento** (modelado).
5. **Evaluación del modelo.**
6. **Producción** (despliegue).

> [!important] Datos que suelen preguntarse
> - **CRISP-DM** = estándar de la industria, empieza y termina en el **negocio**.
> - La fase que más recursos consume es la **preparación de datos**.
> - **SEMMA** es propietaria de **SAS** y tiene enfoque técnico/de modelado.

---

## 3. Data Science Lifecycle (Microsoft)

**Concepto clave:** La clase presenta el ciclo de vida ampliado de Microsoft, que hace explícitas etapas que las metodologías clásicas dejan implícitas.

Flujo: **Business Understanding** → **Data Acquisition & Understanding** → **Modeling** → **Deployment** → **Customer Acceptance (End)**, con retornos entre etapas.

| Etapa | Sub-actividades destacadas |
|---|---|
| **Data Acquisition & Understanding** | Data Source (on-premise vs cloud), Pipeline (streaming vs batch), Environment (small/medium/big data), Wrangling/Exploration & Cleaning |
| **Modeling** | **Feature Engineering** · Model Training (algoritmos, ensemble, tuning, retraining) · Model Evaluation (cross-validation, A/B testing) |
| **Deployment** | Model Store, Web Services, Intelligent Applications; scoring y **performance monitoring** |

> [!note] Aporte del modelo de Microsoft
> Agrega explícitamente **Feature Engineering** y un **despliegue** con monitoreo continuo del rendimiento, algo que CRISP-DM menciona de forma más genérica.

---

## 4. Análisis Exploratorio de Datos (EDA) y sus tipos (repaso)

**Concepto clave:** El EDA es el **embudo** que va de los *datos de la realidad (raw data)* a las *conclusiones*. Sus cuatro objetivos según la clase: **análisis descriptivo**, **descubrir patrones**, **identificar anomalías/outliers** y **encontrar relaciones**.

El EDA se clasifica por **cuántas variables** analiza y si usa **gráficos**:

| Tipo | Variables | Gráfico | Ejemplo de la clase |
|---|---|---|---|
| **Univariante No Gráfico** | Una | No | Edad de clientes: media = 35, mediana = 34, desvío = 7, mín = 18, máx = 65 |
| **Univariante Gráfico** | Una | Sí | Ingreso mensual: **histograma** (distribución) y **boxplot** (outliers) |
| **Multivariante No Gráfico** | Dos o más | No | Edad y gasto mensual: correlación de **Pearson = 0.65** (positiva moderada); tabla de contingencia |
| **Multivariante Gráfico** | Dos o más | Sí | Ingreso vs. gasto: **scatter plot** coloreado por género |
| **Otros gráficos multivariantes** | Múltiples | Sí | **Heatmap** de correlaciones, **gráfico de burbujas** (3ª variable = tamaño), **gráfico 3D**, **treemap** |

> [!tip] Regla mental
> **Univariante** = 1 variable · **Multivariante** = 2+ variables. **No gráfico** = estadísticos · **Gráfico** = visualización.

---

## 5. Evaluación de herramientas: Cuadrante Mágico de Gartner

**Concepto clave:** Ante la pregunta *"¿cómo se eligen las herramientas analíticas?"*, la clase usa el **Cuadrante Mágico de Gartner**: un informe que evalúa y compara a los principales proveedores de software ubicándolos en un gráfico de **dos ejes**.

| Eje | Qué mide |
|---|---|
| **Eje X — Completitud de visión** | Innovación, estrategia de producto, visión de mercado, diferenciación y capacidad de responder a tendencias futuras (AutoML, MLOps, IA generativa) |
| **Eje Y — Capacidad de ejecución** | Calidad y madurez del producto, facilidad de uso, soporte, ecosistema, base de clientes e implementación exitosa |

Los proveedores caen en **cuatro categorías**:

| Categoría | Perfil | Ejemplos (BI) |
|---|---|---|
| **Líderes** | Alta ejecución + visión amplia | Microsoft Power BI, Tableau, Qlik |
| **Visionarios** | Innovación fuerte, ejecución aún no tan sólida | — |
| **Retadores** | Buena ejecución práctica, menor innovación estratégica | — |
| **Jugadores de nicho** | Soluciones enfocadas en mercados específicos o de alcance limitado | — |

> [!info] Dos cuadrantes distintos
> Gartner publica cuadrantes **separados** según el propósito:
> - **Analytics & BI Platforms** — herramientas de análisis y business intelligence.
> - **Data Science & Machine Learning (DSML) Platforms** — plataformas para el ciclo de vida completo de ciencia de datos y ML (ej. Databricks, Dataiku, DataRobot, además de los hyperscalers).

---

## 6. Programación tradicional vs. Machine Learning

**Concepto clave:** El aprendizaje automático **invierte el flujo** de la programación tradicional. Es la diferencia central para entender por qué se usa ML en minería de datos.

| | **Programación tradicional** | **Machine Learning** |
|---|---|---|
| **Entradas** | Reglas + Datos | **Respuestas** (answers) + Datos |
| **Salida** | Respuestas | **Reglas** (el modelo) |

> [!important] Idea para recordar
> En la programación clásica el humano escribe las reglas; en ML el algoritmo **aprende las reglas** a partir de ejemplos ya resueltos (datos + respuestas conocidas). Esa "regla aprendida" es el modelo.

---

## 7. Tipos de análisis: descriptivo vs. predictivo

**Concepto clave:** Dentro de la minería, los análisis se dividen en **descriptivos** y **predictivos** según su objetivo.

| | **Descriptivo** | **Predictivo** |
|---|---|---|
| **Objetivo** | Identificar patrones, relaciones o estructuras subyacentes en los datos existentes | Usar datos históricos para inferir sobre datos futuros o valores desconocidos |
| **Qué produce** | Resume y caracteriza las propiedades generales de los datos | Predice el valor de un atributo específico (variable objetivo) a partir de predictores |
| **No busca** | Predecir un valor | Solo describir |
| **Se asocia a** | Aprendizaje **no supervisado** | Aprendizaje **supervisado** (machine learning) |

---

## 8. Aprendizaje supervisado vs. no supervisado

**Concepto clave:** Es la distinción central de la clase, ligada a si los datos están **etiquetados** o no.

**Aprendizaje supervisado:** consiste en proporcionar al modelo **suficientes ejemplos etiquetados** para hacer predicciones precisas. Todos sus algoritmos necesitan **datos etiquetados**: hay que decirle al modelo la respuesta correcta de cada muestra (ej. mostrarle imágenes ya rotuladas como "vaca", "gato", "perro" para que luego clasifique nuevas).

**Aprendizaje no supervisado:** se le da a la máquina una gran cantidad de información **sin etiquetar**, se formula una pregunta y se la deja **descubrir por sí misma** la respuesta (ej. dadas imágenes de perros sin etiqueta, agruparlas por tipo). Es la base del **clustering**.

| | **Supervisado** | **No supervisado** |
|---|---|---|
| **Datos** | Etiquetados (con respuesta) | Sin etiquetar |
| **Tipo de análisis** | Predictivo | Descriptivo |
| **Tarea típica** | Clasificación / regresión | Agrupamiento (clustering) |
| **Ejemplo** | Clasificar animal en vaca/gato/perro | Descubrir cuántos grupos de perros hay |

---

## 9. Variable objetivo (target)

**Concepto clave:** La presencia o ausencia de una **variable objetivo (Y / target)** es lo que distingue formalmente ambos enfoques.

- En **supervisado** el dataset tiene predictores (X₁, X₂, … Xₚ) **más** una columna **Y (target)**: el modelo aprende a predecir Y.
- En **no supervisado** solo hay predictores (X₁, X₂, … Xₚ) y **no hay target**: el modelo busca estructura en los datos por sí solo.

> [!tip] Truco visual de la clase
> En la tabla, si aparece la **columna Y resaltada** → supervisado (hay *Target*). Si esa columna está **vacía** → no supervisado (*No Target*).

---

## 10. Proceso de aprendizaje y conjuntos de datos

**Concepto clave:** Un proyecto de ML tiene dos momentos: **construir/validar** el modelo y luego **aplicarlo**.

**1) Proceso de aprendizaje:**
`Datos crudos → Limpiar datos → Feature Engineering → Set de datos de entrenamiento → Modelo predictivo → (Set de datos de validación) → Modelo predictivo validado`

**2) Proceso de aplicación:**
`Nuevo set de datos → Modelo predictivo validado → Resultado de la predicción`

> [!warning] Por qué se separan los datos
> El modelo se entrena con el **set de entrenamiento** y se comprueba con un **set de validación** distinto. Validar con datos que el modelo no vio durante el entrenamiento es lo que permite confiar en que generaliza y no solo "memorizó".

---

## 11. Técnicas de minería (taxonomía)

**Concepto clave:** La clase organiza las técnicas en un árbol según su propósito: **verificar** hipótesis conocidas o **descubrir** conocimiento nuevo.

| Rama | Sub-rama | Técnicas |
|---|---|---|
| **Verificación** | — | SQL, OLAP, Análisis Estadístico, AED |
| **Descubrimiento** | **Descripción** | Visualización, **Clustering**, Reglas de Asociación, PCA |
| **Descubrimiento** | **Predicción → Regresión** | Árboles de Regresión, Método Bayesiano, KNN |
| **Descubrimiento** | **Predicción → Clasificación** | Árboles de Decisión, Método Bayesiano, **Random Forest**, KNN |

> [!note] Cómo encaja todo
> **Verificación** = confirmar algo que ya se sospecha (consultas, OLAP). **Descubrimiento** = encontrar patrones nuevos, ya sea describiéndolos (clustering, reglas de asociación) o prediciendo (regresión para valores numéricos, clasificación para categorías).

---

## Mapa de conceptos de la clase

- **Minería de datos** = paso del **KDD** que aplica algoritmos para extraer patrones desconocidos, válidos, útiles y comprensibles.
- **Metodologías:** SEMMA (SAS) y CRISP-DM (estándar de industria, cíclico, preparación = fase más costosa); Microsoft agrega **Feature Engineering** y monitoreo en su Data Science Lifecycle.
- **EDA:** univariante/multivariante × gráfico/no gráfico; embudo de raw data a conclusiones.
- **Elección de herramientas:** **Cuadrante Mágico de Gartner** → ejes *completitud de visión* (X) y *capacidad de ejecución* (Y); categorías: Líderes, Visionarios, Retadores, Jugadores de nicho. Cuadrantes separados de **BI & Analytics** y **DSML**.
- **Programación tradicional** (reglas + datos → respuestas) vs **ML** (respuestas + datos → **reglas/modelo**).
- **Análisis descriptivo** (patrones, no supervisado) vs **predictivo** (predecir target, supervisado).
- **Supervisado** = datos **etiquetados**, hay **variable target (Y)**, clasificación/regresión. **No supervisado** = sin etiquetas, **sin target**, clustering.
- **Proceso de ML:** entrenamiento (con feature engineering) + **validación** con datos distintos → modelo validado → aplicación sobre datos nuevos.
- **Técnicas:** Verificación (SQL, OLAP, estadística, AED) vs Descubrimiento → Descripción (clustering, reglas de asociación, PCA) y Predicción → Regresión / Clasificación (árboles, Bayesiano, KNN, Random Forest).
