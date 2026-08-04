---
materia: Ciencia de Datos
tema: 8
bloque: Feature engineering
tags:
  - resumen-final
  - ciencia-de-datos
  - feature-engineering
  - encoding
  - escalado
  - normalizacion
---

# Tema 8 — Feature Engineering (preparación de datos)

## Qué es una feature y dónde encaja

En Machine Learning se denomina *feature* (característica) a toda propiedad individual medible de los datos que se utiliza como entrada para un modelo. Más precisamente, una feature es la representación numérica o codificada de una variable original, procesada de modo tal que un algoritmo pueda aprender patrones a partir de ella. El *feature engineering* es, en consecuencia, la etapa del pipeline que se ubica después de limpiar los datos y antes de entrenar: es el trabajo que transforma los datos crudos en el conjunto de entrenamiento que finalmente alimenta al modelo. El recorrido completo puede leerse como una secuencia (datos crudos → limpieza → feature engineering → set de entrenamiento → modelo predictivo → validación) en la que esta clase se ocupa específicamente del tramo de feature engineering. Su importancia es difícil de exagerar, porque la selección y transformación de las features condiciona directamente el rendimiento: incluso un buen modelo alimentado con malas features rinde mal.

Conviene aclarar que *feature*, *variable* y *columna* nombran una misma idea vista desde tres disciplinas distintas. En el mundo de las bases de datos (SQL, ETL, data warehousing) se habla de **columna**, la unidad de datos dentro de una tabla estructurada, como la columna `edad` en la tabla `clientes`. En la estadística tradicional se habla de **variable**, el atributo que puede tomar distintos valores entre individuos o casos, como la variable "edad" medida en una muestra. Y en minería de datos, ML e IA se habla de **feature**, la representación numérica o codificada de esa variable tal como la consume un algoritmo, por ejemplo la `edad` ya normalizada. La regla mental es simple: la columna indica dónde vive el dato, la variable qué mide la estadística y la feature cómo la consume el modelo; el nombre cambia, la idea no.

## Tipos de variables

Antes de transformar cualquier variable es imprescindible saber de qué tipo es, porque cada tipo exige un tratamiento distinto en materia de encoding, escalado o discretización. La clasificación se organiza en dos grandes familias y cuatro subtipos:

- **Categóricas (cualitativas)** — representan etiquetas. Se dividen en:
    - **Nominales** — no poseen orden alguno (por ejemplo el color: rojo, verde, azul).
    - **Ordinales** — tienen un orden lógico, aunque las diferencias entre categorías no sean numéricas (por ejemplo el nivel educativo: básico < medio < superior).
- **Numéricas (cuantitativas)** — representan cantidades. Se dividen en:
    - **Discretas** — toman valores enteros contables (como la cantidad de hijos: 0, 1, 2, 3).
    - **Continuas** — pueden tomar cualquier valor dentro de un rango (como la altura: 1,72 m, 1,85 m).

Esta distinción tiene una consecuencia práctica central que reaparecerá al hablar de encoding. En una variable ordinal el orden es real (Excelente > Bueno > Malo) y efectivamente se quiere que el modelo lo aproveche. En una nominal, en cambio, no existe orden alguno (Perro, Gato, Vaca): si se la codifica con números enteros se le está inyectando al modelo un orden falso. Evitar precisamente ese error es la razón de ser de las técnicas de codificación categórica.

## Discretización y continuización

Discretizar (o hacer *binning*) una variable continua significa dividir su rango de valores posibles en intervalos o categorías y asignar cada observación a uno de ellos; en otras palabras, es el proceso de convertir una variable numérica continua en una variable categórica ordinal. Un ejemplo típico es transformar la `Edad` continua en un `Grupo etario` (0–17 = menor de edad, 18–64 = adulto, 65+ = adulto mayor). Se recurre a la discretización por varias razones:

- **Simplifica los modelos y su interpretación** — permite analizar o visualizar tendencias sin depender de la precisión numérica.
- **Ayuda a manejar no linealidades** — ciertos algoritmos como los árboles de decisión trabajan mejor con categorías o umbrales.
- **Reduce el ruido** — agrupar valores similares suaviza variaciones pequeñas e irrelevantes.
- **Facilita la comunicación** — hablar de ingresos "altos, medios o bajos" resulta más comprensible que citar cifras exactas.

Existen distintos métodos para definir los cortes:

- **Por intervalos iguales (*equal-width*)** — divide el rango total en tramos del mismo tamaño, por ejemplo edades de 0 a 100 en cinco intervalos de veinte años.
- **Por frecuencia igual (*equal-frequency* o por cuantiles)** — hace que cada grupo contenga aproximadamente la misma cantidad de observaciones, como al construir quintiles de ingresos con el 20 % de los casos en cada uno.
- **Por criterio experto o de dominio** — se basa en conocimiento o reglas de negocio (menor de 18, adulto entre 18 y 65, mayor de 65).
- **Basada en aprendizaje (*data-driven*)** — emplea algoritmos para encontrar los cortes óptimos: un `DecisionTreeDiscretizer`, por caso, define los límites en los puntos donde cambian las predicciones.

La **continuización** es el proceso opuesto. Según el contexto se la llama continuización, reconversión a variable continua o, más formalmente, codificación numérica continua (*continuous encoding*), y consiste en transformar variables categóricas en representaciones numéricas continuas que preserven las relaciones semánticas. Se recurre a ella cuando un modelo requiere entradas numéricas —muchos algoritmos como la regresión, las redes neuronales o el PCA no trabajan con categorías puras—, cuando se busca reconstruir valores aproximados a partir de una variable previamente discretizada por bins (reemplazando cada categoría por el valor medio de su intervalo), o cuando en simulaciones y proyecciones se asignan valores continuos representativos a clases discretas para generar escenarios cuantitativos.

## Codificación categórica: One-Hot y Label Encoding

El **One-Hot Encoding** (también llamado codificación "uno a uno" o codificación binaria categórica) transforma una variable categórica en un conjunto de variables binarias (0 o 1), una por cada categoría posible. El procedimiento consta de tres pasos:

1. **Identificar las categorías únicas** de la variable.
2. **Crear una nueva columna binaria** por cada una de ellas.
3. **Marcar con 1** la columna correspondiente a la categoría de cada fila, dejando el resto en 0.

Así, una variable con categorías Cool, Cooler y Coolest se representa como los vectores [1,0,0], [0,1,0] y [0,0,1] respectivamente. Esta técnica cumple varios objetivos:

- **Convierte datos categóricos en numéricos** que la mayoría de los algoritmos (regresión, redes neuronales, SVM) pueden procesar.
- **Evita interpretaciones ordinales falsas** — a diferencia del Label Encoding, no sugiere ningún "orden" inexistente.
- **Facilita el cálculo de distancias y pesos** en modelos con métricas como KNN o clustering.
- **Preserva la independencia entre categorías**, tratando a cada una como una dimensión propia.

Su ventaja principal es, entonces, que no impone un orden artificial; su contrapartida es que aumenta la dimensionalidad del dataset, ya que agrega una columna por cada categoría.

El **Label Encoding** es la alternativa: asigna un número entero a cada categoría (Rojo = 0, Verde = 1, Azul = 2). La diferencia decisiva entre ambos métodos radica en si inyectan o no un orden artificial, como resume el siguiente cuadro.

| | Label Encoding | One-Hot Encoding |
|---|---|---|
| Qué hace | Asigna un número entero a cada categoría | Crea una columna binaria por categoría |
| Orden | Preserva un orden artificial | No impone orden |
| Ejemplo | Rojo = 0, Verde = 1, Azul = 2 | Rojo = [1,0,0], Verde = [0,1,0] |
| Riesgo o costo | El modelo puede interpretar 2 > 1 > 0 (falso) | Más columnas, pero sin sesgo de orden |

El riesgo del Label Encoding es que induce un orden que el modelo puede interpretar incorrectamente: si se codifica `cold = 0, warm = 2, hot = 1`, el modelo leerá que warm > hot, algo evidentemente falso. El One-Hot elimina ese problema porque cada categoría vive en su propia dimensión. De ahí la regla práctica: para variables ordinales el Label Encoding puede servir, mientras que para las nominales conviene el One-Hot.

El One-Hot, sin embargo, introduce un efecto colateral conocido como **multicolinealidad** o *dummy trap*. Como las columnas binarias generadas suman siempre 1, resultan linealmente dependientes: cualquiera de ellas puede deducirse a partir de las demás. Con N categorías, por lo tanto, bastan N−1 columnas. La solución consiste en eliminar una de las columnas (mediante el parámetro `drop_first=True`) para evitar la multicolinealidad perfecta; si se conocen las categorías A y B, la categoría C queda determinada y su columna es redundante.

## Escalado de datos

El escalado es la técnica que normaliza el rango de las variables independientes de modo que todos los atributos queden en una escala similar tras el proceso. Resulta esencial porque algoritmos como SVM, K-Means y PCA son sensibles a la magnitud de las variables: si una feature varía entre 0 y 1 y otra entre 0 y 1.000.000, la segunda dominará por completo el cálculo de distancias. El escalado pone a todas las features en pie de igualdad. Se estudian cuatro métodos, identificados por sus nombres en scikit-learn.

| Método | Qué hace | Rango o efecto | Outliers | Cuándo usarlo |
|---|---|---|---|---|
| MinMaxScaler (normalización) | Comprime los datos entre 0 y 1 | Preserva la forma de la distribución original | No reduce su importancia | Buen método para empezar a probar |
| StandardScaler (estandarización) | Resta la media y divide por el desvío estándar (z-score) | Media = 0, desvío = 1; ~68 % de los valores entre −1 y 1 | No distorsiona distancias relativas | Buena segunda opción tras MinMax |
| RobustScaler | Resta la mediana y divide por el rango intercuartil (IQR, 25 %–75 %) | No escala a un intervalo fijo | Diluye el efecto de los outliers | Cuando hay outliers y se quiere reducir su influencia |
| Normalizer | Escala cada fila para que el vector tenga longitud euclidiana 1 | Importa la dirección (ángulo), no la longitud | — | Poco usado; solo cuando importa la dirección |

Una distinción conceptual atraviesa esta tabla: los tres primeros métodos escalan por columna, es decir, actúan sobre cada feature. El Normalizer es el caso distinto, porque escala por fila —sobre cada observación— proyectando cada punto a un círculo o esfera de radio unitario; por eso casi nunca se emplea en datos tabulares clásicos, donde solo tiene sentido si lo que importa es la dirección de cada vector y no su magnitud.

## Escalado frente a normalización

Aunque en el habla cotidiana ambos términos se usan de forma intercambiable, conviene contrastar el escalado acotado (del tipo MinMax) contra la normalización o estandarización (del tipo StandardScaler o z-score). El escalado tipo MinMax produce una salida estrictamente acotada, por ejemplo en [0, 1] o [−1, 1], cuyas media y varianza dependen del conjunto de datos y que mantiene la forma exacta de la distribución original; su punto débil es que resulta muy sensible a los outliers, ya que un solo valor extremo puede comprimir todo el resto en un rango diminuto. La normalización o estandarización, en cambio, no tiene un rango de salida estrictamente limitado —es teóricamente infinito, aunque casi todos los valores caen entre −3 y 3— y garantiza una media de 0 y un desvío estándar de 1; al centrar la distribución y ajustar su dispersión respecto del promedio, resulta más robusta frente a los valores atípicos, que afectan la media y el desvío pero no destruyen la escala del resto de las observaciones.