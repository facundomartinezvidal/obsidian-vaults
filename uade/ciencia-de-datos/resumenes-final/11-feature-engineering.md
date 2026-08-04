---
materia: Ciencia de Datos
clase: 11
bloque: Feature engineering
parcial: 2
tags:
  - resumen-final
  - ciencia-de-datos
  - feature-engineering
  - encoding
  - escalado
  - normalizacion
fuente: content/2-parcial/material/11-feature-engineering.pdf
---

# Clase 11 — Feature engineering

## 1. ¿Qué es una feature?

> [!quote] Definición
> En Machine Learning, una **feature** (característica) es una **propiedad individual medible** de los datos que se utiliza como **entrada para un modelo**.

**Concepto clave:** las features son la **representación numérica o codificada** de las variables originales, procesadas para que los algoritmos puedan aprender patrones a partir de ellas. El **feature engineering** es el paso del pipeline que va *después* de limpiar los datos y *antes* de entrenar: transforma los datos crudos en el set de entrenamiento que alimenta al modelo.

El proceso de **selección y transformación** de features es fundamental para el rendimiento de cualquier modelo de ML: un buen modelo con malas features rinde mal.

> [!tip] Dónde encaja en el pipeline
> Datos crudos → **limpiar datos** → **feature engineering** → set de entrenamiento → modelo predictivo → validación. Esta clase se ocupa del bloque de feature engineering.

---

## 2. Feature vs Variable vs Columna

**Concepto clave:** son **el mismo concepto** visto desde tres disciplinas distintas. Cambia el nombre, no la idea.

| Disciplina / contexto | Término habitual | Qué representa | Ejemplo |
|---|---|---|---|
| Base de datos (SQL, ETL, DWH) | **Columna** | Unidad de datos dentro de una tabla estructurada | La columna `edad` en la tabla `clientes` |
| Estadística tradicional | **Variable** | Atributo que puede tomar distintos valores entre individuos o casos | Variable "edad" medida en una muestra |
| Minería de datos / ML / IA | **Feature** (característica) | Representación numérica o codificada de una variable, usada por un algoritmo | `edad` normalizada, etc. |

> [!note] Regla mental
> **Columna** (dónde vive el dato) = **Variable** (qué mide la estadística) = **Feature** (cómo la consume el modelo).

---

## 3. Tipos de variables

**Concepto clave:** antes de transformar una variable hay que saber **de qué tipo es**, porque cada tipo requiere un tratamiento distinto (encoding, escalado, discretización).

| Tipo | Subtipo | Descripción | Ejemplo |
|---|---|---|---|
| **Categórica (cualitativa)** | **Nominal** | No tienen orden. Son etiquetas o categorías | "Color": rojo, verde, azul |
| | **Ordinal** | Tienen un orden lógico, pero las diferencias no son numéricas | "Nivel educativo": básico < medio < superior |
| **Numérica (cuantitativa)** | **Discreta** | Valores enteros contables | "Cantidad de hijos": 0, 1, 2, 3 |
| | **Continua** | Puede tomar cualquier valor dentro de un rango | "Altura": 1.72 m, 1.85 m |

> [!warning] Cuidado con el "orden inyectado"
> En una variable **ordinal** (Excelente > Bueno > Malo) el orden es real y sí querés que el modelo lo aproveche. En una **nominal** (Perro, Gato, Vaca) no hay orden: si la codificás con números enteros le estás **inyectando un orden falso** al modelo. Ese es el error central que el encoding busca evitar (ver §7-8).

---

## 4. Discretización (binning)

> [!quote] Definición
> **Discretizar** una variable continua significa **dividir su rango de valores posibles en intervalos (categorías)** y asignar cada observación a uno de esos intervalos.

**Concepto clave:** es el proceso de convertir una variable **numérica continua** en una variable **categórica ordinal**. Ejemplo: `Edad` (continua) → `Grupo etario` (0–17 = Menor de edad, 18–64 = Adulto, 65+ = Adulto mayor).

**Ventajas de discretizar:**

| Ventaja | Por qué |
|---|---|
| Simplificar modelos o interpretación | Ayuda a analizar o visualizar tendencias sin requerir precisión numérica |
| Manejar no linealidades | Algunos algoritmos (como árboles de decisión) funcionan mejor con categorías o umbrales |
| Reducir ruido | Agrupar valores similares suaviza variaciones pequeñas e irrelevantes |
| Facilitar comunicación | "Ingresos altos / medios / bajos" es más comprensible que cifras exactas |

**Métodos de discretización:**

| Método | Descripción | Ejemplo |
|---|---|---|
| **Por intervalos iguales** (equal-width) | Divide el rango total en intervalos del mismo tamaño | Edades 0–100 → 5 intervalos de 20 años |
| **Por frecuencia igual** (equal-frequency / cuantiles) | Cada grupo contiene aprox. la misma cantidad de observaciones | Quintiles de ingresos (20% cada uno) |
| **Por criterio experto o dominio** | Basado en conocimiento o reglas de negocio | "<18 = menor", "18–65 = adulto", ">65 = mayor" |
| **Basado en aprendizaje** (data-driven) | Usa algoritmos para encontrar cortes óptimos | `DecisionTreeDiscretizer`: el modelo define los límites donde cambian las predicciones |

---

## 5. Continuización

**Concepto clave:** es el **proceso opuesto** a la discretización. Según el contexto se lo llama *continuización*, *reconversión a variable continua* o, más formalmente, **codificación numérica continua** ("continuous encoding"). Consiste en transformar variables categóricas en **representaciones numéricas continuas** que preserven relaciones semánticas.

**Cuándo se usa la continuización:**

| Situación | Detalle |
|---|---|
| Un modelo requiere entradas numéricas | Muchos algoritmos (regresión, redes neuronales, PCA) no trabajan con categorías puras |
| Reconstruir valores aproximados | Si una variable fue discretizada por bins, se reemplaza cada categoría por el **valor medio de su intervalo** |
| Simulaciones o proyecciones | Se asignan valores continuos representativos a clases discretas para generar escenarios cuantitativos |

---

## 6. One-Hot Encoding (variables dummy)

> [!quote] Definición
> **One-Hot Encoding** (codificación "uno a uno" o "codificación binaria categórica") es una técnica que **transforma variables categóricas (no numéricas) en un conjunto de variables binarias (0 o 1)**, una por cada categoría posible.

**Cómo funciona (3 pasos):**
1. Se identifican todas las categorías únicas de la variable categórica.
2. Se crea una nueva columna binaria (0/1) por cada categoría.
3. Para cada fila, **solo la columna correspondiente a su categoría vale 1**; el resto es 0.

**Ejemplo:**

| Categoría | X₀ | X₁ | X₂ |
|---|---|---|---|
| Cool | 1 | 0 | 0 |
| Cooler | 0 | 1 | 0 |
| Coolest | 0 | 0 | 1 |

**Para qué sirve:**

| Objetivo | Detalle |
|---|---|
| Convertir datos categóricos en numéricos | La mayoría de los algoritmos (regresión, redes neuronales, SVM) solo entienden números |
| Evitar interpretaciones ordinales falsas | A diferencia de Label Encoding (1, 2, 3…), el One-Hot evita que el modelo interprete un "orden" donde no lo hay |
| Facilitar cálculo de distancias/pesos | En modelos con métricas (KNN, clustering) los valores binarios permiten medir similitudes correctamente |
| Preservar independencia entre categorías | Cada categoría se trata como una **dimensión independiente** |

> [!note] Ventaja y desventaja
> **Ventaja:** no impone orden artificial entre categorías.
> **Desventaja:** **aumenta la dimensionalidad** del dataset (una columna nueva por cada categoría).

---

## 7. Label Encoding vs One-Hot Encoding

**Concepto clave:** son las dos formas de codificar una variable categórica en números. La diferencia clave es si **inyectan o no un orden artificial**.

| | **Label Encoding** | **One-Hot Encoding** |
|---|---|---|
| Qué hace | Asigna un número entero a cada categoría | Crea una columna binaria por categoría |
| Orden | **Preserva un orden artificial** | **No impone orden** |
| Ejemplo | Rojo=0, Verde=1, Azul=2 | Rojo=[1,0,0], Verde=[0,1,0] |
| Riesgo / costo | El modelo puede interpretar 2 > 1 > 0 (falso) | Más columnas, pero sin sesgo de orden |

> [!warning] El problema del orden
> Label encoding puede **inducir un orden artificial** que el modelo interprete incorrectamente (ej.: `cold=0, warm=2, hot=1` sugiere que warm > hot, lo cual es falso). One-Hot evita este problema porque cada categoría vive en su propia dimensión. Como regla: **ordinal → Label Encoding puede servir; nominal → One-Hot**.

### Multicolinealidad y la "dummy trap"

**Concepto clave:** la **multicolinealidad** ocurre cuando las variables dummy creadas por One-Hot Encoding son **linealmente dependientes** (la suma de todas las columnas siempre da 1). Es decir, una columna es deducible a partir de las otras.

**Solución:** eliminar una columna. Con N categorías, **N−1 columnas alcanzan**.

| Categoría | X₀ | X₁ | X₂ (drop) |
|---|---|---|---|
| A | 1 | 0 | 0 |
| B | 0 | 1 | 0 |
| C | 0 | 0 | 1 |

> [!tip] Para el parcial
> Se elimina una columna (parámetro `drop_first=True`) para evitar la **"dummy trap"** o **multicolinealidad perfecta**. Si conocés A y B, C queda determinada, así que la tercera columna es redundante.

---

## 8. Escalado de datos

**Concepto clave:** el escalado es una técnica para **normalizar el rango de las variables independientes (features)** de modo que **todos los atributos tengan un rango similar** después del proceso.

> [!important] Por qué es esencial
> Algoritmos como **SVM, K-Means y PCA** son **sensibles a la magnitud** de las variables: si una feature va de 0 a 1 y otra de 0 a 1.000.000, la segunda domina el cálculo de distancias. El escalado pone a todas en pie de igualdad.

Los cuatro métodos que se ven (nombres de scikit-learn):

| Método | Qué hace | Rango / efecto | Outliers | Cuándo usarlo |
|---|---|---|---|---|
| **MinMaxScaler** (Normalización) | Comprime todos los datos entre **0 y 1** | Preserva la forma de la distribución original | **No** reduce su importancia | Buen método para **empezar a probar** |
| **StandardScaler** (Estandarización) | Resta la media y divide por la desviación estándar (**z-score**) | Media = 0, desvío = 1; ~68% de los valores entre −1 y 1 | No distorsiona distancias relativas | Buena **segunda opción** tras MinMax |
| **RobustScaler** | Resta la **mediana** y divide por el **rango intercuartil (IQR, 25%–75%)** | No escala a un intervalo fijo | **Diluye el efecto** de los outliers | Cuando hay outliers y se quiere reducir su influencia |
| **Normalizer** | Escala cada **fila/punto** para que el vector tenga **longitud euclidiana 1** (lo proyecta a un círculo/esfera) | Importa la **dirección (ángulo)**, no la longitud | — | Poco usado; solo cuando importa la dirección |

> [!note] MinMax vs Standard vs Robust vs Normalizer
> Los tres primeros escalan **por columna** (feature). El **Normalizer** es el distinto: escala **por fila** (cada observación), no por variable. Por eso casi nunca se usa en tabular clásico.

---

## 9. Escalado vs Normalización (estandarización): diferencias

**Concepto clave:** aunque se usan de forma intercambiable, la diapositiva contrasta el **escalado acotado** (tipo MinMax) contra la **normalización/estandarización** (tipo StandardScaler / z-score).

| Criterio | **Escalado** (MinMax) | **Normalización / Estandarización** (z-score) |
|---|---|---|
| Rango de salida | Estrictamente acotado (ej. [0, 1] o [−1, 1]) | Sin límite estricto (teóricamente infinito; casi todo cae entre −3 y 3) |
| Media y varianza | Varían según el conjunto de datos | Media = 0 y desvío estándar = 1 |
| Forma de la distribución | Mantiene la forma **exacta** de la original | Centra la distribución y ajusta la dispersión respecto al promedio |
| Sensibilidad a outliers | **Muy sensible**: un solo valor extremo comprime el resto en un rango diminuto | **Más robusta**: los atípicos afectan media/desvío, pero no destruyen la escala del resto |

---

## 10. Train / test split

**Concepto clave:** consiste en **dividir el dataset en dos (o más) subconjuntos** para poder medir el modelo con datos que **no vio durante el entrenamiento**.

| Subconjunto | Para qué |
|---|---|
| **Entrenamiento (train set)** | Entrenar el modelo: aprende los patrones a partir de estos datos |
| **Prueba (test set)** | Evaluar el rendimiento con **datos no vistos** |

El objetivo no es solo ajustar el modelo a los datos conocidos, sino **evaluar si puede predecir correctamente sobre datos nuevos**.

> [!warning] Por qué no entrenar y evaluar con los mismos datos
> Si entrenaras y evaluaras con el mismo conjunto:
> - El modelo **memorizaría los datos** (overfitting).
> - No sabrías si realmente **generaliza** bien.

**En scikit-learn** — `train_test_split` separa por defecto **80% train / 20% test**:

```python
from sklearn.model_selection import train_test_split
# shuffle=True mezcla los datos antes de dividir
X_train, X_test, y_train, y_test = train_test_split(
    iris_dataset['data'],
    iris_dataset['target'],
    random_state=0)
```

**Parámetros importantes:**
- **`test_size`**: proporción del dataset para test (default 0.2).
- **`random_state`**: semilla para **reproducibilidad**.
- **`shuffle`**: mezclar los datos antes de dividir (default True).

> [!note] A veces se agrega un tercer set
> Un **conjunto de validación (validation set)** (10–20%) se usa para **ajustar hiperparámetros sin tocar el test set**. Ver §14.

---

## 11. Validación cruzada (K-fold)

**Concepto clave:** la **validación cruzada K-fold** divide el dataset en **K subconjuntos (folds) iguales**. El modelo se entrena **K veces**, usando cada fold como conjunto de test una vez, y se **promedian los K resultados**.

**Flujo:** dividir en K folds → entrenar con K−1 folds → testear con 1 fold → promediar K resultados.

**Ventajas de K-fold:**
- **Todos los datos** se usan tanto para entrenamiento como para testing.
- **Reduce la varianza** en la estimación del rendimiento.
- Más **robusto** que un único train/test split, sobre todo con datasets pequeños.
- Valor común de K: **5 o 10**.

```python
from sklearn.model_selection import KFold, cross_val_score
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kf)
print(f"Scores: {scores}, Promedio: {scores.mean():.2f}")
```

### Stratified K-fold

**Concepto clave:** la variante **Stratified k-folds** divide el dataset en K folds de modo que **cada fold conserve (casi) el mismo porcentaje de clases minoritarias y mayoritarias** que el conjunto completo.

> [!tip] Cuándo usar Stratified
> Es la opción correcta ante **desbalanceo de clases**: garantiza que ningún fold quede sin ejemplos de la clase minoritaria. En scikit-learn: `StratifiedKFold`.

> [!note] Situaciones a considerar al dividir datos
> - **Pocos datos:** con datasets pequeños cada muestra es valiosa → evaluar el % del split o usar K-folding para maximizar el uso de los datos.
> - **Desbalanceo de clases:** surge cuando una o más clases están **menos representadas**. Puede dar modelos con **alta accuracy pero baja capacidad de detectar la clase minoritaria** → usar *stratified sampling* o métricas apropiadas.

---

## 12. Generalización, Overfitting y Underfitting

**Concepto clave:** el fin último de un modelo es **generalizar** — predecir bien sobre datos nuevos. Overfitting y underfitting son los dos modos de fallar.

| Estado | Definición |
|---|---|
| ✅ **Generalización** | Modelo que realiza **predicciones correctas en datos no vistos** anteriormente |
| ❌ **Overfitting** (sobreajuste) | Modelo demasiado cercano a las **particularidades del set de entrenamiento**: funciona para ese set pero **no es generalizable a nuevos datos** |
| ⚠️ **Underfitting** (subajuste) | Modelo **demasiado simple**, no puede capturar la **estructura subyacente** de los datos |

**Casos extremos:**

| | **Underfitting extremo** | **Overfitting extremo** |
|---|---|---|
| Complejidad | Modelo demasiado simple | Modelo demasiado complejo |
| Comportamiento | No captura ningún patrón; predice siempre la clase mayoritaria | Memoriza cada dato de entrenamiento |
| Accuracy | ~ proporción de la clase mayoritaria | **100% en train**, muy bajo en test |

**Diagnóstico por error (train vs test):**

| | Underfitting | Buena generalización | Overfitting |
|---|---|---|---|
| Ajuste visual | Línea recta que no sigue los datos | Curva suave que sigue la tendencia | Curva que pasa por cada punto |
| Error en train | Alto | Bajo | Bajo |
| Error en test | Alto | Bajo | **Alto** |
| Qué captura | No captura la tendencia | El patrón subyacente | El **ruido** |

> [!important] La clave para el parcial
> - **Underfitting** = error alto en train **y** test.
> - **Overfitting** = error bajo en train, **alto en test** (la señal delatora).
> - El objetivo es el **punto intermedio**: suficientemente complejo para capturar patrones, pero no tanto que memorice el ruido.

---

## 13. Sesgo y varianza (bias-variance)

**Concepto clave:** todo error de un modelo se descompone en tres partes. La fórmula que hay que recordar:

> [!quote] Descomposición del error
> **Error Total = Bias² + Variance + Error Irreducible**

| Componente | Qué es |
|---|---|
| **Bias (Sesgo)** | Diferencia entre la predicción esperada del modelo y los valores verdaderos. Error por **suposiciones demasiado simples** → el modelo no captura la complejidad real (lleva a **underfitting**) |
| **Variance (Varianza)** | Error por **alta sensibilidad** del modelo a las fluctuaciones de los datos de entrenamiento (lleva a **overfitting**) |
| **Error Irreducible** | No se puede reducir con ningún algoritmo. También llamado **ruido**: proviene de variables desconocidas, un conjunto de features incompleto o una mala definición del problema |

**Relación con el tipo de algoritmo:**

| Perfil | Complejidad | Ejemplos de algoritmos |
|---|---|---|
| **Baja varianza / alto bias** | Menos complejos, estructura rígida (paramétricos/lineales) | Regresión lineal, Naïve Bayes |
| **Bajo bias / alta varianza** | Más complejos, estructura flexible (no lineales/no paramétricos) | Árboles de decisión, K-vecinos (KNN) |

> [!tip] El trade-off
> Bajar el sesgo (modelo más complejo) suele **subir la varianza**, y viceversa. No se pueden minimizar los dos a la vez. El objetivo es el **equilibrio óptimo** entre sesgo y varianza que **minimice el error total**. La analogía del "tiro al blanco": alto bias = tiros lejos del centro pero agrupados; alta varianza = tiros dispersos.

---

## 14. Métricas de evaluación: Precision vs Recall

**Concepto clave:** al evaluar clasificación, la combinación de **Precision** (cuán confiables son los positivos que predice) y **Recall** (cuántos positivos reales detecta) describe el comportamiento del modelo sobre una clase.

| Precision \ Recall | **Alto Recall** | **Bajo Recall** |
|---|---|---|
| **Alta Precision** | ✅ El modelo maneja **perfectamente** esa clase | ⚠️ No detecta la clase muy bien, pero cuando lo hace es **altamente confiable** |
| **Baja Precision** | ⚠️ Detecta bien la clase pero **incluye muestras de otras clases** | ❌ **No logra clasificar** la clase correctamente |

> [!warning] Efecto del desbalanceo
> Con un dataset desbalanceado suele ocurrir **alta precisión en la clase mayoritaria** y **bajo recall en la clase minoritaria**: el modelo "juega a lo seguro" con la clase abundante y se pierde la rara. Por eso la accuracy sola engaña ante desbalanceo.

---

## 15. Set de Entrenamiento, Validación y Test

**Concepto clave:** división típica de un dataset en **tres** subconjuntos para separar el aprendizaje, el ajuste de hiperparámetros y la evaluación final.

| Subconjunto | Proporción típica | Para qué |
|---|---|---|
| **Entrenamiento (Train)** | 60–70% | Entrenar el modelo (ajustar los pesos) |
| **Validación (Validation)** | 15–20% | Ajustar **hiperparámetros** y detectar overfitting **durante** el entrenamiento |
| **Test** | 15–20% | Evaluar el rendimiento **final** con datos nunca vistos |

> [!important] La regla de oro
> La validación es crucial para ajustar hiperparámetros **sin "contaminar"** el set de test. El **set de test debe usarse una sola vez, al final**. Si lo usás para tomar decisiones sobre el modelo, deja de ser una medida honesta de generalización.

---

## Mapa de conceptos de la clase

- **Feature** = variable = columna: propiedad medible que entra al modelo, ya codificada numéricamente. El **feature engineering** va entre limpiar datos y entrenar.
- **Tipos de variable:** categórica (nominal / ordinal) y numérica (discreta / continua). El tipo decide la transformación.
- **Discretización** (binning): continua → categórica ordinal (equal-width, equal-frequency, criterio experto, data-driven). **Continuización**: el proceso inverso.
- **Encoding categórico:**
  - **One-Hot** → una columna binaria por categoría; no impone orden; sube la dimensionalidad.
  - **Label** → un entero por categoría; **inyecta orden artificial** (riesgo en nominales).
  - **Multicolinealidad / dummy trap** → se soluciona con `drop_first=True` (N−1 columnas).
- **Escalado** (esencial para SVM, K-Means, PCA): **MinMaxScaler** (0–1), **StandardScaler** (z-score, media 0 desvío 1), **RobustScaler** (mediana + IQR, robusto a outliers), **Normalizer** (por fila, poco usado).
- **Escalado vs normalización:** acotado y sensible a outliers vs media 0/desvío 1 y más robusto.
- **Train/test split** (80/20 en sklearn): evaluar sobre datos no vistos; `test_size`, `random_state`, `shuffle`.
- **Validación cruzada K-fold** (K=5 o 10): usa todos los datos, reduce varianza. **Stratified K-fold** conserva proporciones de clase → desbalanceo.
- **Generalización vs overfitting** (bajo train / alto test) **vs underfitting** (alto en ambos). Meta: el punto intermedio.
- **Bias-variance:** Error Total = Bias² + Variance + Error Irreducible. Alto bias → underfitting; alta varianza → overfitting; trade-off inevitable.
- **Precision vs Recall:** las 4 combinaciones; el desbalanceo da alta precisión en mayoritaria y bajo recall en minoritaria.
- **Train / Validation / Test** (60-70 / 15-20 / 15-20): el test se toca **una sola vez, al final**.
