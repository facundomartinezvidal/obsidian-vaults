---
materia: Ciencia de Datos
tema: 7
bloque: Machine Learning
tags:
  - resumen-final
  - ciencia-de-datos
  - machine-learning
  - overfitting
  - bias-variance
  - validacion-cruzada
---

# Tema 7 — Fundamentos del Aprendizaje Automático

## 1. Programación tradicional vs. Machine Learning

El aprendizaje automático invierte el flujo de la programación tradicional, y esa inversión es la clave para entender por qué se recurre a él en la minería de datos. En la programación clásica el ser humano escribe las reglas y, junto con los datos, obtiene respuestas como salida. En machine learning ocurre lo contrario: se parte de ejemplos ya resueltos —datos acompañados de sus respuestas conocidas— y el algoritmo aprende por sí mismo las reglas que los relacionan. Esa "regla aprendida" es precisamente el modelo. Dicho de otro modo, mientras la programación tradicional recibe reglas y datos para producir respuestas, el aprendizaje automático recibe respuestas y datos para producir reglas.

## 2. Aprendizaje supervisado y no supervisado

La distinción central del aprendizaje automático depende de si los datos están etiquetados o no, lo que equivale formalmente a la presencia o ausencia de una variable objetivo (Y o *target*). El aprendizaje supervisado consiste en proporcionar al modelo suficientes ejemplos etiquetados para que realice predicciones precisas: hay que indicarle la respuesta correcta de cada muestra, como cuando se le muestran imágenes ya rotuladas como "vaca", "gato" o "perro" para que luego clasifique casos nuevos. El aprendizaje no supervisado, en cambio, entrega a la máquina una gran cantidad de información sin etiquetar, se le formula una pregunta y se la deja descubrir por sí misma la respuesta —por ejemplo, agrupar imágenes de perros por tipo sin conocer sus etiquetas—; es la base del *clustering*.

Lo que separa formalmente ambos enfoques es la variable objetivo. En el aprendizaje supervisado el dataset contiene predictores (X₁, X₂, … Xₚ) más una columna Y que actúa como *target*, y el modelo aprende a predecir ese Y; en el no supervisado solo existen los predictores, no hay *target*, y el modelo debe encontrar estructura en los datos por su cuenta. Un truco visual útil es mirar si en la tabla de datos aparece la columna Y: si está presente hay supervisión, y si está ausente estamos ante un problema no supervisado.

| | Supervisado | No supervisado |
|---|---|---|
| Datos | Etiquetados (con respuesta) | Sin etiquetar |
| Variable objetivo | Presente (Y / *target*) | Ausente |
| Tipo de análisis | Predictivo | Descriptivo |
| Tarea típica | Clasificación / regresión | Agrupamiento (*clustering*) |
| Ejemplo | Clasificar un animal en vaca/gato/perro | Descubrir cuántos grupos de perros hay |

## 3. Análisis descriptivo vs. predictivo

Dentro de la minería, los análisis se dividen en descriptivos y predictivos según su objetivo, y cada uno se asocia naturalmente con uno de los tipos de aprendizaje anteriores. El análisis descriptivo busca identificar patrones, relaciones o estructuras subyacentes en los datos existentes: resume y caracteriza sus propiedades generales sin pretender predecir ningún valor, y se corresponde con el aprendizaje no supervisado. El análisis predictivo, por su parte, utiliza datos históricos para inferir sobre datos futuros o valores desconocidos, prediciendo el valor de un atributo específico —la variable objetivo— a partir de los predictores, y se corresponde con el aprendizaje supervisado propio del machine learning.

## 4. Proceso de aprendizaje: conjuntos Train / Validation / Test

Un proyecto de machine learning atraviesa dos momentos bien diferenciados. Primero está el proceso de aprendizaje, que parte de los datos crudos, los limpia, aplica ingeniería de características y con ello construye el conjunto de entrenamiento sobre el que se ajusta un modelo predictivo, que luego se valida hasta obtener un modelo validado. Después viene el proceso de aplicación, en el que un nuevo conjunto de datos se pasa por ese modelo ya validado para obtener el resultado de la predicción. Para poder confiar en el modelo, la evaluación debe hacerse siempre con datos que no participaron del entrenamiento.

Con ese fin, los datos se dividen habitualmente en tres subconjuntos con roles distintos, de modo que queden separados el aprendizaje, el ajuste de hiperparámetros y la evaluación final:

- **Entrenamiento (*train*, 60–80 %)** — es donde el modelo aprende los patrones y ajusta sus pesos; equivale a estudiar para el examen.
- **Validación (*validation*, 10–20 %)** — sirve para ajustar los hiperparámetros y detectar sobreajuste durante el entrenamiento, a la manera de un examen de práctica.
- **Prueba (*test*, 10–20 %)** — se reserva para medir el rendimiento final sobre datos nunca vistos, como el examen final.

La variante más simple prescinde de la validación y divide solo en *train* y *test* —en scikit-learn, `train_test_split` separa por defecto en 80 % y 20 %—; el conjunto de validación se incorpora precisamente cuando hace falta ajustar hiperparámetros sin tocar el *test*.

En scikit-learn, la división básica se realiza así:

```python
from sklearn.model_selection import train_test_split
# shuffle=True mezcla los datos antes de dividir
X_train, X_test, y_train, y_test = train_test_split(
    iris_dataset['data'],
    iris_dataset['target'],
    random_state=0)
```

Los parámetros relevantes son `test_size`, que fija la proporción destinada a prueba (0.2 por defecto); `random_state`, la semilla que garantiza la reproducibilidad; y `shuffle`, que mezcla los datos antes de dividir (activo por defecto). La razón de todo este cuidado es directa: si se entrenara y evaluara sobre el mismo conjunto, el modelo tendería a memorizar los datos —es decir, a sobreajustar— y no habría forma de saber si realmente generaliza. De ahí la regla de oro: el conjunto de test debe usarse una sola vez, al final. La validación existe para ajustar hiperparámetros sin "contaminar" el test, y en cuanto este último se emplea para tomar decisiones sobre el modelo deja de ser una medida honesta de generalización. Mirar el test antes de la evaluación final equivale a hacer trampa.

## 5. Validación cruzada: K-fold y Stratified K-fold

La validación cruzada K-fold divide el dataset en K subconjuntos (*folds*) de igual tamaño y entrena el modelo K veces, usando en cada iteración un *fold* distinto como conjunto de test y los K−1 restantes para entrenar, para finalmente promediar los K resultados; los valores habituales de K son 5 o 10. Frente a un único *split*, esta técnica ofrece varias ventajas:

- **Aprovechamiento total de los datos** — cada muestra se usa tanto para entrenar como para evaluar, lo que resulta especialmente valioso en datasets pequeños.
- **Menor varianza de la estimación** — al promediar sobre K resultados, la medición del rendimiento se vuelve más robusta y menos dependiente de una partición afortunada o desafortunada.

Que reduzca la varianza de la estimación no es un detalle menor: conecta directamente con el problema de la generalización, porque una medición inestable a partir de una única partición puede llevar a sobrevalorar o subestimar la capacidad real del modelo.

```python
from sklearn.model_selection import KFold, cross_val_score
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kf)
print(f"Scores: {scores}, Promedio: {scores.mean():.2f}")
```

La variante *Stratified K-fold* construye los *folds* de modo que cada uno conserve aproximadamente el mismo porcentaje de clases minoritarias y mayoritarias que el conjunto completo. Es la opción correcta ante el desbalanceo de clases, ya que garantiza que ningún *fold* quede sin ejemplos de la clase minoritaria (`StratifiedKFold` en scikit-learn). Estas consideraciones cobran especial peso en dos situaciones. Cuando hay pocos datos, cada muestra es valiosa y conviene revisar cuidadosamente el porcentaje del *split* o recurrir a K-folding para maximizar el uso de la información disponible. Y cuando existe desbalanceo de clases —una o más clases claramente menos representadas—, un modelo puede exhibir una accuracy alta y, sin embargo, una escasa capacidad para detectar la clase minoritaria, por lo que corresponde aplicar muestreo estratificado o métricas más apropiadas que la simple exactitud.

## 6. Generalización, overfitting y underfitting

El fin último de un modelo es generalizar, esto es, predecir correctamente sobre datos no vistos anteriormente; toda la maquinaria de validación descrita hasta aquí existe justamente para responder si el modelo aprendió o simplemente memorizó, y si funcionará con datos reales. Frente a esa meta hay dos formas de fallar. El sobreajuste (*overfitting*) se produce cuando el modelo se ciñe demasiado a las particularidades del conjunto de entrenamiento: funciona bien sobre él pero no generaliza a datos nuevos porque, en el fondo, los ha memorizado, ruido incluido. El subajuste (*underfitting*) es el problema opuesto: un modelo demasiado simple que no logra capturar la estructura subyacente de los datos y por eso rinde mal en todas partes.

La forma práctica de diagnosticar cada estado es comparar el error en entrenamiento con el error en prueba, lo que arroja tres señales características:

- **Underfitting** — error alto tanto en *train* como en *test*: la línea de ajuste ni siquiera sigue la tendencia de los datos, y en su versión extrema no captura ningún patrón y se limita a predecir la clase mayoritaria.
- **Buena generalización** — error bajo en ambos conjuntos, con una curva suave que sigue el patrón subyacente.
- **Overfitting** — error bajo en *train* pero alto en *test* (la señal delatora), porque la curva pasa por cada punto y termina modelando el ruido; en su versión extrema alcanza el 100 % de accuracy en entrenamiento y se derrumba en prueba.

Esta lectura enlaza de manera natural con la validación de la sección anterior: es precisamente el error sobre datos no vistos —vía *test* o validación cruzada— el que revela el overfitting que el error de entrenamiento oculta. El objetivo, por tanto, es el punto intermedio: un modelo suficientemente complejo para capturar los patrones pero no tanto como para memorizar el ruido.

## 7. Sesgo y varianza (bias-variance)

Todo error de un modelo puede descomponerse en tres componentes, según la expresión que conviene retener:

$$\text{Error Total} = \text{Bias}^2 + \text{Varianza} + \text{Error Irreducible}$$

Cada término de esa descomposición tiene un origen y una consecuencia propios:

- **Sesgo (*bias*)** — diferencia entre la predicción esperada del modelo y los valores verdaderos; proviene de suposiciones demasiado simples que impiden capturar la complejidad real del problema y conduce, en consecuencia, al underfitting.
- **Varianza (*variance*)** — sensibilidad del modelo a las fluctuaciones de los datos de entrenamiento; cuando es alta deriva en overfitting, y es la misma inestabilidad que la validación cruzada busca atenuar al promediar sobre varios *folds*.
- **Error irreducible** — el ruido que ningún algoritmo puede eliminar, originado en variables desconocidas, un conjunto de *features* incompleto o una mala definición del problema.

Estos componentes se reflejan en el tipo de algoritmo elegido. Los modelos menos complejos y de estructura rígida —paramétricos o lineales, como la regresión lineal o Naïve Bayes— tienden a presentar baja varianza y alto sesgo. Los modelos más flexibles y de mayor capacidad —no lineales o no paramétricos, como los árboles de decisión o K-vecinos (KNN)— muestran el perfil inverso, con bajo sesgo y alta varianza. De ahí surge el compromiso inevitable: reducir el sesgo volviendo el modelo más complejo suele aumentar la varianza, y a la inversa, de modo que no es posible minimizar ambos a la vez. La meta es el equilibrio que minimice el error total, idea que suele ilustrarse con la analogía del tiro al blanco, donde el alto sesgo agrupa los disparos lejos del centro y la alta varianza los dispersa por todo el tablero.