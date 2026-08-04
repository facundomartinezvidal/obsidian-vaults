---
materia: Ciencia de Datos
tema: 10
bloque: Aprendizaje supervisado
tags:
  - resumen-final
  - ciencia-de-datos
  - regresion
  - regresion-lineal
  - regresion-logistica
---

# Tema 10 — Aprendizaje supervisado: Regresión

## Qué es la regresión

La regresión es una técnica estadística y de aprendizaje automático que modela la relación entre una variable dependiente u objetivo y una o más variables independientes o predictoras. Su propósito es predecir valores continuos —números reales como precios de viviendas, ventas, demanda o consumo energético— y, a la vez, estimar cómo cambia la variable objetivo cuando se modifican las variables de entrada. En este sentido se distingue de la clasificación: mientras la regresión predice magnitudes continuas (por ejemplo, "¿cuál será el precio de esta casa?"), la clasificación asigna categorías discretas (por ejemplo, "¿es spam o no?"). En ambos casos el problema puede formularse como la búsqueda de una función $f(X)$ que aproxime $Y$ lo mejor posible, minimizando el error entre lo predicho y lo observado.

Los modelos de regresión se organizan según la naturaleza de la relación —lineal o no lineal— y el tipo de variable objetivo. La siguiente tabla resume las variantes que se desarrollan a lo largo del tema, desde la más simple hasta las no paramétricas.

| Modelo | Descripción | Ejemplo |
|---|---|---|
| Lineal simple | Una única predictora $X$; modela relaciones lineales directas | Predecir el peso a partir de la altura |
| Lineal múltiple | Varias predictoras $X_1, X_2, \dots, X_k$; captura efectos combinados | Precio de una casa según tamaño, ubicación y año |
| Polinómica | Términos polinomiales de $X$; modela curvas y relaciones no lineales | Crecimiento poblacional con tasas variables |
| Logística | Clasificación binaria; predice probabilidades con la función sigmoide | ¿Aprobará el cliente el crédito? (sí/no) |
| Árboles de regresión | Particiones recursivas del espacio de datos; modelo no paramétrico | Segmentación de clientes por comportamiento |

## Regresión lineal simple

La regresión lineal simple modela mediante una recta la relación entre una variable independiente $X$ y una dependiente $Y$, según la ecuación

$Y = \beta_0 + \beta_1 X + \varepsilon$

Cada término de la ecuación cumple un rol específico:

- **$\beta_0$ (intercepto)** — la intersección con el eje, es decir, el valor de $Y$ cuando $X = 0$.
- **$\beta_1$ (pendiente)** — el cambio en $Y$ por cada unidad de $X$.
- **$\varepsilon$ (error)** — la variabilidad que el modelo no explica.

Estimar el modelo consiste en encontrar los valores de $\beta_0$ y $\beta_1$ que minimizan la diferencia entre los valores observados y los predichos, tarea que resuelve el método de mínimos cuadrados.

Un ejemplo intuitivo ayuda a fijar la interpretación. Si modelamos el precio de una pizza ($Y$) según su diámetro en centímetros ($X$) con $\beta_0 = 5$ y $\beta_1 = 1.5$, una pizza de 30 cm costaría $5 + 1.5 \times 30 = \$50$. Aquí la pendiente indica que cada centímetro adicional encarece la pizza en \$1.50, el intercepto fija un precio base de \$5 (correspondiente a un diámetro nulo) y el término $\varepsilon$ recoge factores no medidos como ingredientes especiales o la ubicación de la pizzería.

Cada coeficiente traduce así el resultado matemático en un insight accionable. El intercepto $\beta_0$ solo tiene sentido práctico cuando $X = 0$ es un valor observable en el contexto, y la pendiente $\beta_1$ señala la dirección y magnitud de la relación: un valor positivo indica relación creciente, uno negativo relación decreciente y un valor cercano a cero ausencia de relación lineal. Conviene subrayar, sin embargo, que estos coeficientes describen asociación, no causalidad: si al modelar el precio de una vivienda contra sus metros cuadrados obtenemos $\beta_1 = 2500$, podemos afirmar que cada metro cuadrado adicional se asocia en promedio con \$2.500 más de precio, pero no que los metros cuadrados sean la causa de ese aumento.

## Diagnóstico de residuos y supuestos

La validez de la regresión lineal descansa sobre el análisis de los residuos, definidos como $e_i = Y_i - \hat{Y}_i$, es decir, las diferencias entre los valores observados y los predichos. De su comportamiento dependen los supuestos del modelo:

- **Linealidad** — la relación entre $X$ e $Y$ debe ser efectivamente lineal, algo que se examina en el gráfico de residuos frente a valores predichos.
- **Independencia** — los residuos no deben estar correlacionados entre sí, lo que suele verificarse con la prueba de Durbin-Watson para detectar autocorrelación.
- **Homocedasticidad** — la varianza de los residuos debe mantenerse constante; una forma de embudo en el gráfico revela lo contrario, esto es, heterocedasticidad.
- **Normalidad** — los residuos deben seguir una distribución normal, lo que se contrasta mediante un gráfico Q-Q y tests de normalidad.
- **No multicolinealidad** — supuesto propio de la regresión múltiple, que exige que las predictoras no estén altamente correlacionadas entre sí; se aborda más adelante.

El gráfico de residuos frente a valores predichos es la herramienta central de este diagnóstico: los patrones sistemáticos —curvas o embudos— delatan problemas, mientras que una nube aleatoria en torno a cero confirma que los supuestos se cumplen de forma razonable. La importancia de esta verificación no es meramente formal, porque cuando los supuestos se violan las inferencias estadísticas —p-valores e intervalos de confianza— dejan de ser válidas.

## Regresión lineal múltiple

La regresión lineal múltiple generaliza el modelo simple incorporando $k$ variables predictoras:

$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_k X_k + \varepsilon$

que en notación matricial se escribe de forma compacta como $Y = X\beta + \varepsilon$, siendo $X$ la matriz de diseño con todas las observaciones. Cada coeficiente $\beta_j$ representa el cambio esperado en $Y$ ante un incremento unitario de $X_j$ manteniendo constantes las demás variables; este efecto marginal, o interpretación ceteris paribus, permite aislar la contribución individual de cada predictora, algo que la regresión simple no puede lograr. Por ejemplo, al predecir el precio de una vivienda a partir de sus metros cuadrados, su número de habitaciones, su distancia al centro y su año de construcción, un coeficiente $\beta_2 = 15000$ para las habitaciones indica que cada habitación adicional añade \$15.000 al precio una vez fijados los restantes factores.

## Multicolinealidad y selección de variables

El uso de múltiples predictoras introduce dos cuestiones prácticas estrechamente ligadas: qué hacer cuando las variables se solapan y cómo decidir cuáles conservar. La multicolinealidad aparece cuando dos o más predictoras están altamente correlacionadas entre sí, lo que dificulta estimar con precisión sus coeficientes individuales. Se detecta a través de varias señales:

- **Correlaciones elevadas** entre pares de variables (por encima de $r > 0.8$).
- **Factor de inflación de la varianza** superior a $\text{VIF} > 10$, que indica multicolinealidad severa.
- **Signos inesperados** en los coeficientes.
- **Errores estándar** desproporcionadamente grandes.

Entre las soluciones habituales figuran:

- **Eliminar variables redundantes** conservando la más relevante.
- **Combinar** varias en un único índice o score.
- **Aplicar PCA** (análisis de componentes principales).
- **Regularizar** con técnicas como Ridge o Lasso.

El caso clásico es un modelo de precios de automóviles que incluye a la vez la longitud en centímetros y el peso en kilogramos: al estar ambas fuertemente correlacionadas, el modelo no puede discernir cuál influye realmente sobre el precio y produce coeficientes inestables e interpretaciones engañosas.

La selección de variables persigue el objetivo complementario de construir un modelo parsimonioso y eficaz, aplicando la navaja de Occam: entre modelos de rendimiento similar, se prefiere el más simple. Los tres procedimientos habituales operan de manera incremental:

- **Selección hacia adelante (forward selection)** — parte de un modelo sin variables y añade en cada paso la más significativa, deteniéndose cuando ninguna de las restantes mejora el ajuste de forma apreciable.
- **Eliminación hacia atrás (backward elimination)** — hace el recorrido inverso: comienza con todas las variables y descarta en cada paso la menos significativa, un enfoque más conservador porque evalúa el contexto completo desde el inicio.
- **Selección paso a paso (stepwise selection)** — combina ambas lógicas, permitiendo añadir o eliminar variables en cada iteración; es la más flexible, pero también la más propensa al sobreajuste.

## Regresión logística

Pese a su nombre, la regresión logística se emplea para clasificación, típicamente binaria (0/1, sí/no, verdadero/falso), y sirve de puente natural entre los modelos de regresión y las técnicas de clasificación. La regresión lineal ordinaria no es adecuada en este contexto porque puede arrojar predicciones fuera del rango $[0,1]$, incompatibles con una probabilidad. La regresión logística resuelve esto devolviendo la probabilidad de pertenencia a una clase, obtenida al comprimir el resultado lineal mediante la función logística:

$p = \dfrac{1}{1 + e^{-(\beta_0 + \beta_1 X)}}$

El corazón del método es la función sigmoide, que transforma cualquier valor real en un número entre 0 y 1 interpretable como probabilidad:

$\sigma(z) = \dfrac{1}{1 + e^{-z}}\quad\text{donde}\quad z = \beta_0 + \beta_1 X$

Su característica forma de "S" permite modelar decisiones binarias de manera suave y diferenciable, propiedad esencial para la optimización basada en gradientes. La lectura de la sigmoide es directa: valores muy negativos de $z$ producen probabilidades cercanas a cero (por ejemplo, $\sigma(-3) \approx 0.05$) y valores muy positivos probabilidades cercanas a uno ($\sigma(3) \approx 0.95$). El punto de corte se sitúa en $z = 0$, donde $\sigma(0) = 0.50$: a partir de este umbral de decisión, los valores positivos de $z$ favorecen la clase 1 y los negativos la clase 0.

## Regresión polinómica

Muchas relaciones reales no son lineales, y para capturarlas la regresión polinómica extiende el modelo lineal añadiendo potencias de la variable predictora:

$Y = \beta_0 + \beta_1 X + \beta_2 X^2 + \beta_3 X^3 + \dots + \beta_d X^d + \varepsilon$

El grado $d$ del polinomio determina la flexibilidad del modelo:

- **Grado 1** — equivale a la recta ya conocida, útil cuando la relación es estable.
- **Grado 2 (cuadrático)** — describe una parábola con un único cambio de dirección, como la relación entre horas de estudio y rendimiento académico, donde más horas no siempre implican mejores resultados.
- **Grado 3 (cúbico)** — incorpora un punto de inflexión, apropiado para curvas de crecimiento empresarial que arrancan lentas, se aceleran y luego se estabilizan.
- **Grados superiores** — permiten formas cada vez más complejas.

La elección del grado no es libre, sino que encierra un compromiso entre sesgo y varianza (bias-variance tradeoff). Los grados bajos generan modelos rígidos que tienden a subajustar (underfitting), con alto sesgo y baja varianza. Los grados intermedios suelen ofrecer un balance razonable para muchas aplicaciones. Los grados altos producen modelos muy flexibles que corren el riesgo de sobreajustar (overfitting), capturando el ruido como si fuera señal: presentan bajo sesgo pero alta varianza y predicciones inestables ante datos nuevos. El grado óptimo se determina en la práctica mediante validación cruzada, aumentándolo mientras el error de validación siga mejorando; cuando ese error empieza a subir a la vez que el de entrenamiento continúa bajando, se tiene una señal inequívoca de sobreajuste.

## Árboles de regresión

El árbol de regresión abandona el marco paramétrico de los modelos anteriores. Se trata de una estructura jerárquica que divide recursivamente los datos en subconjuntos cada vez más homogéneos, particionando el espacio de las predictoras. Al ser no paramétrico, no impone supuestos sobre la distribución de los datos, y es intrínsecamente interpretable, ya que puede visualizarse y seguirse el camino de decisión. Cada nodo interno plantea una pregunta sobre una variable (por ejemplo, $X_1 < \text{umbral}$), cada rama representa una respuesta y cada hoja entrega la predicción final $\hat{Y}$, que suele ser el promedio de $Y$ en esa región. De este modo el árbol aprende reglas del tipo "si $X_1 < 5.2$ y $X_2 > 3.0$, entonces $\hat{Y} = 42.5$".

En cada nodo el algoritmo busca la variable y el umbral que mejor separan los datos. El criterio es la reducción de la varianza: se elige la división que más disminuye la varianza de $Y$ en los subconjuntos resultantes, definiendo la ganancia como la varianza del nodo padre menos la varianza ponderada de los hijos, de modo que a mayor ganancia, mejor división. Como la salida es continua, la predicción de cada hoja es el promedio de la variable objetivo de todos los datos que caen en ella; por ejemplo, si en una hoja quedan cinco casas de precios 100k, 120k, 110k, 130k y 140k, el árbol predice 120k para cualquier vivienda nueva que llegue a esa región. El procedimiento es iterativo: para cada variable $X_j$ se evalúan puntos medios como posibles umbrales, se calcula la ganancia de cada división, se selecciona la de mayor ganancia y se repite recursivamente hasta alcanzar la condición de parada.

Los árboles muy profundos tienden a sobreajustar, por lo que controlar su complejidad resulta esencial para que generalicen bien. Este control se ejerce mediante el podado, que puede ser preventivo (pre-pruning), deteniendo el crecimiento antes de que el árbol se vuelva demasiado complejo con menor costo computacional, o retrospectivo (post-pruning), dejando crecer el árbol completo para luego eliminar las ramas que no aportan, opción más precisa pero más costosa. En la práctica se controla la complejidad a través de hiperparámetros que actúan como regularizadores: la profundidad máxima (`max_depth`), el mínimo de muestras necesarias para dividir un nodo (`min_samples_split`), el mínimo de muestras en una hoja (`min_samples_leaf`) y el número máximo de hojas (`max_leaf_nodes`). El enfoque más habitual combina pre-pruning con validación cruzada, partiendo de valores conservadores (`max_depth` entre 5 y 10, `min_samples_leaf` entre 5 y 20) y afinándolos con grid search o random search.

Los árboles de regresión ofrecen ventajas notables:

- **Interpretabilidad** — son fáciles de interpretar y visualizar.
- **Sin supuestos distribucionales** — no requieren supuestos sobre la distribución de los datos.
- **Interacciones automáticas** — manejan de forma automática las interacciones entre variables.
- **Robustez ante atípicos** — los valores extremos solo afectan a su propia región.
- **Datos mixtos** — funcionan con variables numéricas y categóricas y apenas necesitan preparación, ya que no exigen normalización.

A cambio, presentan limitaciones importantes:

- **Sobreajuste** — son propensos a él si no se controla la profundidad.
- **Inestabilidad** — pequeños cambios en los datos pueden generar árboles muy distintos.
- **Menor precisión** — suelen rendir por debajo de modelos más sofisticados.
- **Relaciones lineales** — tienen dificultad para capturar relaciones lineales suaves.
- **Regiones rectangulares** — tienden a crear particiones poco realistas.
- **Sesgo por categorías** — pueden inclinarse hacia las variables con más categorías.