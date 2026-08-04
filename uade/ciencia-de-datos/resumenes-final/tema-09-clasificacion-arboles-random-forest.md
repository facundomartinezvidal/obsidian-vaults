---
materia: Ciencia de Datos
tema: 9
bloque: Aprendizaje supervisado
tags:
  - resumen-final
  - ciencia-de-datos
  - arboles-de-decision
  - random-forest
  - entropia
  - gini
  - bagging
  - ensemble
---

# Tema 9 — Aprendizaje supervisado: Clasificación (Árboles de Decisión y Random Forest)

## Los árboles de decisión

Un árbol de decisión es un modelo de aprendizaje supervisado que predice una variable objetivo encadenando preguntas sencillas, de modo que cada respuesta acerca progresivamente a la conclusión. La analogía habitual es la del médico que atiende a un paciente con fiebre: antes de diagnosticar, pregunta cuánto tiempo lleva con ella y si hay dolor de cabeza, y cada respuesta va reduciendo las posibilidades hasta llegar a la decisión final. Ese mismo encadenamiento es el que realiza el árbol —¿fiebre? → sí → ¿dolor? → sí → gripe; no → resfriado; y si no hay fiebre → descansar—. Esta lógica lo convierte en la puerta de entrada natural al machine learning: se lee como un diagrama de flujo, no exige matemática compleja para interpretarlo y constituye la base de modelos más potentes como Random Forest.

Su estructura se organiza en tres tipos de elementos:

- **Nodo raíz (root)**: la primera pregunta del árbol; contiene el atributo que mejor separa los datos según la métrica de impureza elegida.
- **Nodos internos**: decisiones intermedias que dividen los datos en ramas según los posibles valores del atributo evaluado; esas ramas son precisamente las conexiones que salen de cada nodo, una por cada valor posible.
- **Nodos hoja (leaf)**: contienen la predicción final —una clase en clasificación o un valor numérico en regresión— y ya no se dividen más.

En el ejemplo del clima, un árbol con raíz ¿Cielo? deriva por una rama hacia ¿Humedad? (que termina en hojas Jugar = Sí / Jugar = No) y por otra hacia ¿Viento? (hoja Jugar = Sí).

Los árboles predicen tanto categorías como valores numéricos; lo que cambia es el tipo de variable objetivo y lo que devuelve la hoja. En clasificación la variable objetivo es discreta y la hoja entrega la clase mayoritaria de los ejemplos que llegan a ella (¿jugar tenis? → Sí/No, tipo de flor → Setosa/Versicolor/Virginica). En regresión la variable objetivo es continua y la hoja devuelve el promedio de los valores de los ejemplos que la alcanzan (precio de una casa, temperatura máxima, tiempo de entrega).

## Cómo elige el árbol la mejor pregunta

El algoritmo no adivina: busca en cada nodo la pregunta (atributo) que mejor separe los datos en grupos más puros u homogéneos, entendiendo por "mejor separación" la que deja menos mezcla de clases en cada rama resultante. El proceso repite tres pasos:

1. **Evaluar** cada atributo disponible calculando cuánto mejora la pureza al dividir por él.
2. **Elegir** el atributo con mayor Ganancia de Información (o menor Gini).
3. **Dividir y repetir** el mismo procedimiento de forma recursiva en cada subconjunto hasta que las hojas sean puras.

Este es un enfoque codicioso (greedy) de divide y vencerás: en cada nodo se toma la mejor decisión local sin mirar varios pasos hacia adelante, una estrategia simple, rápida y sorprendentemente efectiva en la mayoría de los casos prácticos.

Para hacer concretos estos cálculos, la clase recurre al dataset clásico "¿Jugar Tenis?", el ejemplo didáctico más difundido en la literatura de ML (Russell & Norvig, 2020). Se trata de 14 días descritos por cuatro atributos climáticos —Cielo, Temperatura, Humedad y Viento— con los que se busca predecir si se juega o no. De los 14 registros, 9 corresponden a "Sí" y 5 a "No". El atributo Cielo, clave para el ejemplo, se distribuye así: Soleado (2 Sí, 3 No), Nublado (4 Sí, 0 No) y Lluvia (3 Sí, 2 No).

## Entropía y Ganancia de Información

La entropía mide la incertidumbre o "desorden" de un nodo respecto a la variable objetivo mediante la fórmula

`H(S) = − Σ pi · log₂(pi)`

donde `pi` es la proporción de la clase `i` en el nodo. La escala es intuitiva: cuando H = 0 el nodo es puro (todos los ejemplos pertenecen a la misma clase) y cuando H = 1 hay máximo desorden (distribución 50 % / 50 %). Aplicada al dataset completo (9 Sí, 5 No sobre 14):

```
p_Sí = 9/14 = 0.643
p_No = 5/14 = 0.357
H(S) = −(0.643 · log₂ 0.643 + 0.357 · log₂ 0.357)
H(S) ≈ 0.940
```

El valor H(S) ≈ 0.940 no es ni 0 ni 1: indica un desorden moderado, y es justamente esa incertidumbre la que se busca reducir dividiendo el conjunto.

La Ganancia de Información (IG) es el criterio que decide qué atributo ocupa cada nodo, midiendo cuánta entropía se reduce al dividir por un atributo dado:

`IG(S, A) = H(S) − Σ (|Sv| / |S|) · H(Sv)`

Es decir, la entropía antes de dividir menos la entropía ponderada después; cuanto mayor sea la IG, mejor es el atributo. Para el atributo Cielo, cada valor aporta su propia entropía: Soleado (2 Sí, 3 No) tiene H = 0.971, Nublado (4 Sí, 0 No) tiene H = 0 por ser un nodo puro, y Lluvia (3 Sí, 2 No) tiene H = 0.971. La entropía ponderada residual y la ganancia resultan:

```
H_Cielo = (5/14)·0.971 + (4/14)·0 + (5/14)·0.971 = 0.693
IG(Cielo) = 0.940 − 0.693 = 0.247
```

Al comparar todos los atributos, Cielo obtiene la mayor ganancia (0.247), seguido por Humedad (0.151), Viento (0.048) y Temperatura (0.029). Por eso Cielo se convierte en el nodo raíz, la primera pregunta del árbol.

Con este criterio, el algoritmo ID3 —basado en entropía y ganancia de información— construye el árbol recursivamente siguiendo estos pasos:

1. **Medir la incertidumbre total** del sistema, H(S) = 0.940.
2. **Calcular la ganancia** de cada atributo y seleccionar el que más reduce la entropía, que resulta ser Cielo con IG = 0.247, y fijarlo como raíz.
3. **Ramificar** según los valores de Cielo y repetir el proceso en cada rama: para Nublado todos los ejemplos dicen "Sí", de modo que la rama termina en una hoja pura sin necesidad de seguir; para Soleado quedan cinco días ambiguos que la Humedad resuelve (Alta → No, Normal → Sí); y para Lluvia los cinco días restantes se dirimen por el Viento (Fuerte → No, Débil → Sí).

El árbol final equivale a un conjunto de reglas Si-Entonces legibles extraídas automáticamente de los datos:

- Si **Cielo = Nublado**, entonces Jugar = Sí.
- Si **Cielo = Soleado**, Jugar depende de la Humedad (Normal → Sí, Alta → No).
- Si **Cielo = Lluvia**, depende del Viento (Débil → Sí, Fuerte → No).

## El índice de Gini y su comparación con la entropía

El índice de Gini es una medida de impureza alternativa que cuantifica la probabilidad de clasificar mal un elemento elegido al azar según la distribución de clases del nodo:

`Gini = 1 − Σ pi²`

Su escala va de 0 (nodo puro, todos los ejemplos iguales) a 0.5 (máxima impureza en un reparto 50/50), un rango más estrecho que el de la entropía. Sobre el mismo dataset (9 Sí, 5 No):

```
p_Sí = 9/14 = 0.643 ; p_No = 5/14 = 0.357
Gini = 1 − (0.643² + 0.357²)
Gini = 1 − (0.413 + 0.127)
Gini ≈ 0.459
```

Gini resulta atractivo porque es más rápido de calcular al no usar logaritmos, funciona muy bien en la práctica —la diferencia de precisión con la entropía es mínima— y es el criterio por defecto de scikit-learn (`criterion='gini'`); como contrapartida, tiende a favorecer divisiones que generan subconjuntos de tamaños más desiguales. Ambas métricas persiguen lo mismo —evaluar qué tan "limpia" es una división— y se distinguen sobre todo en rango, costo y sesgo:

| Característica | Entropía | Índice de Gini |
|---|---|---|
| Rango | 0 → 1 | 0 → 0.5 |
| Costo computacional | Mayor (usa logaritmos) | Menor (sin logaritmos) |
| Sensibilidad | Más sensible a cambios en proporciones | Ligeramente sesgada a particiones grandes |
| Uso típico | ID3, C4.5, CART (opción) | CART por defecto, scikit-learn |

En la mayoría de los problemas reales la diferencia de precisión entre ambos criterios es mínima: Gini es algo más rápido y la entropía a veces produce árboles más balanceados. En scikit-learn la elección se hace con `criterion='gini'` o `'entropy'`.

## Algoritmos clásicos: ID3, C4.5 y CART

Los tres algoritmos de referencia representan la evolución histórica de los árboles de decisión. ID3 (1986) fue el pionero: emplea Ganancia de Información basada en entropía para seleccionar atributos, construye árboles multiclase (más de dos ramas por nodo) y crece de forma codiciosa hasta obtener hojas puras. Sus limitaciones son claras —solo admite atributos categóricos, no maneja valores faltantes y tiende al sobreajuste porque crece hasta la pureza total sin poda—, pero su impacto fue enorme: demostró que un enfoque codicioso simple podía aprender reglas interpretables a partir de datos ruidosos, sentó las bases de toda la familia y popularizó la Ganancia de Información en machine learning, con un núcleo —dividir recursivamente por el atributo más informativo— que sigue vigente.

C4.5 evolucionó a partir de ID3 incorporando el manejo de atributos continuos mediante umbrales dinámicos (ordena los valores y prueba puntos medios como fronteras, por ejemplo Edad ≤ 30.5 frente a Edad > 30.5), la poda (pruning) para reducir el sobreajuste eliminando ramas sin valor estadístico —el árbol crece completo y luego se recorta para mejorar la generalización—, y la conversión del árbol en un conjunto de reglas Si-Entonces más compacto y comprensible que el árbol original; sumó además el peso de atributos para reflejar costos distintos (útil, por ejemplo, cuando ciertas pruebas médicas son más caras), y es uno de los algoritmos más citados en la historia del data mining. CART, por su parte, genera siempre árboles binarios (solo dos ramas por nodo: sí/no, ≤/>), lo que simplifica la estructura y, ante categóricos con muchos valores, busca la mejor partición binaria; usa Gini en clasificación y MSE (error cuadrático medio) en regresión, donde la hoja devuelve el promedio del subconjunto. Es la base de scikit-learn, que implementa una versión optimizada de CART en `DecisionTreeClassifier` y `DecisionTreeRegressor` con `criterion='gini'` por defecto en clasificación y `'squared_error'` en regresión, aunque no soporta variables categóricas directamente y exige codificarlas numéricamente. El siguiente cuadro resume sus diferencias:

| | Métrica | Ramas | Numéricos | Poda |
|---|---|---|---|---|
| ID3 | Ganancia (Entropía) | Multiclase | No | No |
| C4.5 | Ratio de ganancia | Multiclase | Sí (umbrales) | Sí |
| CART | Gini / MSE | Binarias | Sí | Sí |

## El sobreajuste y los límites del árbol

Un árbol muy profundo memoriza el conjunto de entrenamiento en lugar de aprender patrones generales: funciona a la perfección con los datos conocidos pero falla con datos nuevos. Un árbol sin podar suele alcanzar entropía nula en todas sus hojas, con uno o dos ejemplos por hoja, y logra una precisión del 100 % en entrenamiento que se derrumba a alrededor del 60 % en prueba, señal de que aprendió "de memoria" el ruido y las excepciones. Un árbol podado, en cambio, limita la profundidad máxima y exige un mínimo de muestras por hoja, sacrificando algo de precisión en entrenamiento (cerca del 85 %) para sostener un desempeño mucho mejor en prueba (alrededor del 82 %), porque captura patrones generales transferibles a datos nuevos. De ahí la advertencia central: una precisión perfecta en entrenamiento no es buena señal, sino un indicio típico de overfitting; lo que importa es el rendimiento sobre datos nuevos. Para contenerlo se recurre a `max_depth` para limitar la profundidad, `min_samples_leaf` y `min_samples_split` para exigir un mínimo de muestras, y a la poda posterior al entrenamiento.

Este defecto se enmarca en el balance general del modelo. A su favor, los árboles ofrecen varias ventajas:

- **Interpretabilidad**: son altamente interpretables, se leen como diagramas de flujo.
- **Poco preprocesamiento**: no necesitan normalización ni escalado.
- **Versatilidad**: funcionan con datos numéricos y categóricos.
- **Velocidad**: resultan rápidos de entrenar y consultar.
- **Selección implícita de variables**: ignoran atributos irrelevantes.

En su contra, arrastran limitaciones importantes:

- **Sobreajuste**: son propensos al overfitting si no se podan.
- **Inestabilidad**: pequeños cambios en los datos pueden alterar el árbol por completo.
- **Sesgo**: tienden a favorecer atributos con muchas categorías.
- **Menor precisión**: quedan por debajo de los métodos de ensamble.
- **Predicciones escalonadas**: poco aptos para capturar tendencias suaves en regresión.
- **Sin aprendizaje parcial**: incorporar datos nuevos exige reentrenar desde cero.

Precisamente esa combinación de menor precisión e inestabilidad es la que motiva el salto hacia Random Forest, un ensamble que promedia muchos árboles para ganar precisión y estabilidad.

Antes de dar ese salto, conviene ver cómo se materializa un árbol en Python. Scikit-learn implementa la versión optimizada de CART y permite entrenar y visualizar un árbol en pocas líneas:

```python
# Importar librerías
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# Crear y entrenar el modelo
clf = DecisionTreeClassifier(
    criterion='entropy',   # o 'gini'
    max_depth=3,           # evitar sobreajuste
    random_state=42
)
clf.fit(X_train, y_train)

# Visualizar el árbol
plt.figure(figsize=(12, 8))
plot_tree(clf, feature_names=features, class_names=classes, filled=True)
plt.show()
```

En la práctica conviene controlar la complejidad con `max_depth`, evitar hojas con muy pocos datos mediante `min_samples_leaf=5`, comparar ambos criterios (`'gini'` y `'entropy'`) con validación cruzada, recurrir a `export_text()` para obtener reglas legibles sin gráficos y recordar siempre codificar las variables categóricas a numéricas antes de entrenar.

## Del árbol al bosque: Random Forest

Random Forest es un algoritmo de Ensemble Learning que combina múltiples árboles de decisión para producir predicciones más robustas y precisas que las de un árbol individual. El nombre resume sus dos ideas centrales: lo aleatorio (aleatoriedad en los datos y en las características) y el bosque (muchos árboles en lugar de uno). Es un algoritmo versátil que sirve tanto para clasificación —donde el bosque vota por la clase mayoritaria, por ejemplo para distinguir spam de correo legítimo o un tumor benigno de uno maligno— como para regresión, donde promedia las predicciones numéricas para estimar el precio de una casa o una temperatura futura. Su gran fortaleza, y el argumento clave para el parcial, es que reduce el overfitting inherente a un solo árbol: promedia el resultado de muchos modelos individualmente débiles para construir uno fuerte.

La motivación es directa. Un árbol individual es interpretable y rápido, pero tiende a sobreajustarse al ruido de los datos de entrenamiento, y Random Forest nace justamente para corregir esa debilidad combinando muchos árboles. Donde el árbol único ofrece alta interpretabilidad —reglas lógicas del tipo "si-entonces"— y gran velocidad, el bosque sacrifica algo de interpretabilidad (es un conjunto de cientos de árboles) y resulta más costoso, aunque paralelizable. El problema del árbol es que un modelo profundo memoriza el dataset en lugar de generalizar; la solución del bosque es entrenar cientos de árboles independientes y combinarlos por votación o promedio, de modo que el error de un árbol se cancela con el acierto de otros. Vale aquí la analogía del comité de expertos: un grupo toma mejores decisiones que un solo especialista, porque aunque cada árbol se equivoque a veces, la mayoría suele acertar y los errores individuales se compensan.

Ese comportamiento se apoya en dos fuentes de aleatoriedad:

- **Bagging (Bootstrap Aggregating)**: combina dos pasos que le dan nombre. El bootstrap crea muchos subconjuntos de datos por muestreo con reemplazo: del dataset original de N muestras se generan B subconjuntos del mismo tamaño seleccionando aleatoriamente N muestras con reemplazo, de modo que algunas se repiten dentro del subconjunto mientras otras quedan afuera —las muestras out-of-bag (OOB)—; así cada árbol ve un conjunto de datos ligeramente diferente, lo que fuerza diversidad. El aggregating, por su parte, combina las predicciones de los árboles entrenados sobre esos subconjuntos (votación en clasificación, promedio en regresión). El mecanismo por el que reduce el overfitting es preciso: un solo árbol sobreajusta porque su predicción depende demasiado de las particularidades y el ruido de sus datos de entrenamiento, pero al promediar muchos árboles entrenados sobre muestras bootstrap distintas el ruido aleatorio de cada uno se cancela y sobrevive únicamente la señal común; menos varianza equivale a menos overfitting y mejor generalización.
- **Selección aleatoria de predictores (feature randomness)**: en cada división (split), en lugar de evaluar todas las variables disponibles en cada nodo, el algoritmo elige un subconjunto aleatorio de m predictores y busca la mejor división solo dentro de él; ese subconjunto es distinto en cada nodo y en cada árbol. Su utilidad radica en la decorrelación: si una variable es extremadamente dominante, no aparecerá en todos los árboles —a veces queda fuera del subconjunto sorteado—, de modo que los árboles dejan de parecerse entre sí y aprenden patrones alternativos en lugar de depender siempre del mismo predictor, dando lugar a un bosque más diverso y con menor varianza.

En conjunto, el bagging introduce aleatoriedad en las filas (qué muestras ve cada árbol) y la feature randomness en las columnas (qué variables considera cada split); juntas garantizan árboles distintos e independientes, condición necesaria para que sus errores se cancelen al agregarlos.

El entrenamiento del bosque combina ambas fuentes en cuatro pasos que aprovechan la independencia de los árboles:

1. **Definir los parámetros**: número de árboles (`n_estimators`), características por split (`max_features`) y profundidad máxima (`max_depth`).
2. **Generar la muestra bootstrap**: para cada árbol se toman N observaciones con reemplazo, dejando datos out-of-bag.
3. **Construir cada árbol**: sorteando en cada nodo m características y dividiendo por la mejor según el criterio de impureza (Gini o entropía), sin podar el árbol.
4. **Repetir para todos los árboles**: un cómputo que puede paralelizarse en múltiples núcleos de CPU porque los árboles son independientes.

La ausencia de poda es deliberada: a diferencia de un árbol individual, donde la poda evita el overfitting, en Random Forest es precisamente la agregación de múltiples árboles sin podar la que reduce la varianza; cada árbol sobreajusta, pero el conjunto no.

Una vez entrenado el bosque, predecir una nueva instancia consiste en hacerla pasar por todos los árboles y combinar sus salidas según la tarea. En clasificación cada árbol vota por una clase y gana la mayoría, aunque también puede usarse la probabilidad promedio de cada clase; en regresión se promedia el valor numérico predicho por todos los árboles, y esa media reduce el impacto de predicciones atípicas individuales. Así, ante una instancia X = [x₁, x₂, …, xₙ], cada árbol emite su predicción (Árbol 1 → Clase A, Árbol 2 → Clase B, Árbol 3 → Clase A, …) y la salida final surge de la mayoría o el promedio: donde un árbol se equivoca, otros diversos suelen acertar, y esa cancelación de errores mediante la agregación de modelos independientes es la clave del éxito del método.

Estas propiedades explican por qué Random Forest es uno de los algoritmos más utilizados tanto en competencias (Kaggle) como en producción industrial:

- **Menos overfitting**: reduce drásticamente el sobreajuste frente a un solo árbol.
- **Escalabilidad**: maneja miles de variables sin necesidad de eliminación previa de características.
- **Importancia de características (feature importance)**: indica qué variables influyen más en la predicción.
- **Robustez**: tolera valores faltantes y ruido en los datos de entrada.

Su popularidad proviene, en definitiva, del equilibrio entre rendimiento, interpretabilidad y facilidad de uso.