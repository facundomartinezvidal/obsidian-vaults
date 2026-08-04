---
materia: Ciencia de Datos
tema: 11
bloque: Evaluación de modelos
tags:
  - resumen-final
  - ciencia-de-datos
  - metricas
  - matriz-de-confusion
  - precision
  - recall
  - f1
  - roc
  - auc
  - mse
  - rmse
  - r2
---

# Tema 11 — Evaluación de modelos y métricas

## Métricas de clasificación

La evaluación de un clasificador parte de la matriz de confusión, una tabla que enfrenta las predicciones del modelo contra los valores reales y de la cual se derivan todas las métricas posteriores. En clasificación binaria adopta la forma de una matriz 2×2 cuyas cuatro celdas registran cada combinación posible entre lo predicho y lo real.

|  | Predicted: Sí | Predicted: No |
|---|---|---|
| Actual: Sí | TP (True Positive) | FN (False Negative) |
| Actual: No | FP (False Positive) | TN (True Negative) |

Cada celda representa una combinación distinta entre lo predicho y lo real:

- **TP (True Positive)** — acierto: el modelo predijo positivo y el caso efectivamente lo era.
- **TN (True Negative)** — acierto: el modelo predijo negativo sobre un caso realmente negativo.
- **FP (False Positive)** — error de Tipo I: falsa alarma, el modelo predice positivo sobre un caso negativo.
- **FN (False Negative)** — error de Tipo II: un caso positivo pasa desapercibido.

La nomenclatura resulta transparente si se lee cada sigla en dos tiempos: la primera letra indica si el modelo acertó (True o False) y la segunda, qué clase predijo (Positive o Negative). La suma de las cuatro celdas equivale al total de observaciones, los aciertos se ubican en la diagonal principal (TP + TN) y los errores quedan fuera de ella (FP + FN).

Un detector de spam evaluado sobre 100 correos servirá de hilo conductor para instanciar cada métrica. Sobre ese conjunto el modelo produjo TP = 40 (spam detectado correctamente), TN = 45 (correos legítimos bien clasificados), FP = 10 (correos legítimos marcados como spam) y FN = 5 (spam que llegó igualmente a la bandeja de entrada), lo que arroja 85 aciertos frente a 15 errores.

La métrica más inmediata es la exactitud o accuracy, que mide la proporción de predicciones correctas sobre el total mediante Accuracy = (TP + TN) / (TP + TN + FP + FN). En el ejemplo del spam da (40 + 45) / 100 = 0.85, es decir un 85 % de aciertos. Su rango va de 0 a 1, donde 1.0 representa un modelo perfecto y 0.5 equivale a lanzar una moneda. Su gran virtud es la interpretabilidad: resume el rendimiento en un único número intuitivo incluso para audiencias no técnicas. Sin embargo, resulta engañosa ante datos desbalanceados y oculta tanto el tipo de error como el costo asimétrico entre FP y FN. El caso clásico es la detección de fraude con un 95 % de casos legítimos: un modelo trivial que siempre prediga "No fraude" alcanza un 95 % de accuracy sin detectar un solo fraude. Por eso la exactitud nunca debe leerse aislada, sino junto a la precision, el recall y el F1.

La precision mide la calidad de las predicciones positivas y responde a la pregunta de cuántos de los casos etiquetados como positivos lo eran realmente, mediante Precision = TP / (TP + FP). En el detector de spam da 40 / (40 + 10) = 0.80: de cada diez correos marcados como spam, ocho lo son de verdad y dos son falsas alarmas. Una precision alta implica pocos falsos positivos, de modo que cuando el modelo afirma "positivo" casi siempre acierta. Conviene priorizarla cuando el costo de un falso positivo es elevado, como al acusar erróneamente de plagio, en filtros de contenido o en sistemas de recomendación.

El recall —también llamado sensibilidad, cobertura o True Positive Rate (TPR)— mide qué proporción de los casos realmente positivos logró detectar el modelo, según Recall = TP / (TP + FN). En el ejemplo da 40 / (40 + 5) = 0.889, esto es, detecta el 88.9 % del spam real y deja escapar el 11.1 % restante (cinco correos). Un recall alto se traduce en pocos falsos negativos, y su prioridad se impone cuando no detectar un positivo tiene consecuencias graves, como no diagnosticar una enfermedad o no advertir un ataque de seguridad.

Precision y recall se hallan en tensión: no pueden maximizarse simultáneamente, y el punto de equilibrio se regula desplazando el umbral de clasificación. Elevar el umbral vuelve al modelo más conservador, que solo predice positivo cuando está muy seguro, lo que aumenta la precision a costa del recall; bajarlo lo vuelve más liberal, con predicciones positivas ante poca evidencia, ganando recall pero perdiendo precision. Cuál sacrificar depende del costo del error:

- **Priorizar recall** cuando no detectar un positivo (FN) es lo grave, como en la detección de una enfermedad, donde dejar pasar un caso es peor que una falsa alarma (FP).
- **Priorizar precision** cuando una falsa alarma (FP) es lo costoso, como en el filtrado de spam, donde bloquear un correo legítimo resulta más dañino que dejar pasar spam (FN).

La combinación de ambas describe el comportamiento del modelo sobre cada clase: precision y recall altos indican un manejo perfecto de la clase; precision alta con recall bajo señala un modelo que detecta poco pero es muy confiable cuando actúa; precision baja con recall alto detecta bien pero contamina con muestras de otras clases; y ambas bajas revelan que el modelo no logra clasificar esa clase. Este juego explica por qué el desbalanceo suele producir alta precisión en la clase mayoritaria y bajo recall en la minoritaria —el modelo "juega a lo seguro" con la clase abundante y se pierde la rara—, reforzando que la accuracy por sí sola engaña.

El F1-Score reconcilia ambas métricas al calcular su media armónica mediante F1 = 2 × (Precision × Recall) / (Precision + Recall), buscando un valor único que refleje el equilibrio entre precisión y cobertura. Con los valores del spam (Precision = 0.80, Recall = 0.889), resulta 2 × (0.80 × 0.889) / (0.80 + 0.889) = 1.422 / 1.689 = 0.842. Su rango también va de 0 a 1, alcanzando 1.0 solo con precision y recall perfectos y cayendo a 0 si alguna de las dos se anula; al ser una media armónica penaliza con fuerza a los modelos que sobresalen en una métrica pero flaquean en la otra, lo que lo vuelve especialmente valioso con clases desbalanceadas. En el ejemplo, la cercanía entre accuracy (85 %), precision (80 %), recall (88.9 %) y F1 (84.2 %) sugiere un conjunto relativamente balanceado.

Mientras las métricas anteriores se calculan sobre un umbral fijo, la curva ROC (Receiver Operating Characteristic) evalúa el clasificador a lo largo de todos los umbrales posibles, graficando el True Positive Rate en el eje Y contra el False Positive Rate en el eje X, ambos entre 0 y 1. El TPR coincide con el recall (TPR = TP / (TP + FN)) y el FPR se define como FPR = FP / (FP + TN). La curva se construye tomando las probabilidades que el modelo asigna a cada instancia, variando el umbral de 0 a 1 y registrando el par (FPR, TPR) resultante en cada punto. Cada punto de la curva corresponde entonces a un umbral distinto: la diagonal representa un clasificador aleatorio sin habilidad ("No Skill"), un buen modelo se ubica por encima de ella y el rendimiento mejora cuanto más se aproxima la curva a la esquina superior izquierda. El AUC (Area Under the Curve) condensa toda esa información en una métrica única, el área bajo la curva ROC (AUC = ∫ ROC curve), con valor entre 0 y 1.

| AUC | Interpretación |
|---|---|
| 1.0 | Clasificador perfecto (separa todas las clases correctamente) |
| 0.5 | Clasificador aleatorio (como lanzar una moneda) |
| 0.0 | Clasificador invertido (peor que aleatorio, invierte predicciones) |

La principal ventaja del AUC es su independencia del umbral, lo que permite comparar modelos de forma directa, y admite además una lectura probabilística: equivale a la probabilidad de que el modelo asigne una puntuación más alta a un positivo que a un negativo elegidos al azar.

## Métricas de regresión

Cuando la variable a predecir es continua, la evaluación deja de basarse en aciertos y errores discretos para medir la magnitud del error entre los valores reales $y_i$ y los predichos $\hat{y}_i$ (en las fórmulas del material, el predicho se nota $x_i$). Cada métrica cuantifica ese error con un rasgo propio:

- **MSE** = $\dfrac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{n}$ — promedia los errores al cuadrado, por lo que penaliza con mayor severidad las desviaciones grandes, aunque queda expresado en unidades al cuadrado, lo que dificulta su interpretación.
- **RMSE** = $\sqrt{\dfrac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{n}}$ — como raíz del MSE, recupera las mismas unidades que la variable Y y es, por eso, una de las métricas más utilizadas.
- **MAE** = $\dfrac{\sum_{i=1}^{n}\lvert y_i - \hat{y}_i \rvert}{n}$ — promedia los valores absolutos de los errores y también se lee en las unidades de Y, con la ventaja de ser más robusto frente a outliers que el MSE y el RMSE, precisamente porque no eleva los errores al cuadrado.

El coeficiente de determinación, R² = 1 − (SS_res / SS_tot), donde SS_res es la suma de los errores al cuadrado del modelo y SS_tot la varianza total de los datos respecto de su media, mide qué proporción de la varianza de la variable dependiente queda explicada por el modelo. Su formulación equivalente es $R^2 = 1 - \dfrac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \mu_y)^2}$. Se aplica sobre todo en regresión, aunque algunos clasificadores probabilísticos lo reporten, y su valor teórico va de −∞ a 1, que se interpreta por tramos:

- **R² = 1** — predicción perfecta.
- **R² ≈ 0.95** — excelente: explica el 95 % de la variabilidad.
- **R² ≈ 0.70** — aceptable.
- **R² ≈ 0.30** — pobre.
- **R² = 0** — no explica nada más que la media.
- **R² < 0** — modelo peor que predecir simplemente el promedio.

Su principal limitación es que aumenta al incorporar variables aunque sean irrelevantes, por lo que para comparar modelos con distinto número de predictores conviene recurrir al R² ajustado, R²_adj = 1 − [(1 − R²)(n − 1) / (n − p − 1)], que penaliza la complejidad del modelo.