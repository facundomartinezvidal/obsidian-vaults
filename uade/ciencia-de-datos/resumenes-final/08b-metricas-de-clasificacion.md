---
materia: Ciencia de Datos
clase: 8
bloque: Aprendizaje supervisado
parcial: 2
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
fuente: content/2-parcial/material/08b-metricas-de-clasificacion.pdf
---

# Clase 8 — Métricas de Validación en Modelos de Clasificación

## 1. ¿Por qué validar modelos de clasificación?

**Concepto clave:** Un modelo de **clasificación** predice etiquetas o categorías. Sin validación, no podemos confiar en sus predicciones. La **validación** mide qué tan bien el modelo **generaliza a datos nuevos** (no vistos).

**Conceptos base:**
- **Overfitting** — el modelo **memoriza** los datos de entrenamiento (no generaliza).
- **Underfitting** — el modelo es **demasiado simple** (no captura los patrones).
- **Generalización** — capacidad de predecir bien sobre **datos nuevos**.

La validación responde tres preguntas: ¿el modelo aprendió o memorizó?, ¿funcionará con datos reales?, ¿qué tan confiables son sus predicciones?

> [!important] Principio fundamental
> "Un modelo que no se puede validar, no se puede confiar." Las métricas de validación son el **puente entre el entrenamiento y la implementación en producción**.

---

## 2. Conjuntos de datos: Train, Validation y Test

**Concepto clave:** Antes de medir cualquier métrica, los datos se dividen en tres subconjuntos con roles distintos. La regla de oro: **nunca "hacer trampa" mirando el Test Set antes de la evaluación final**.

| Conjunto | Proporción | Para qué sirve | Analogía |
|---|---|---|---|
| **Train Set** | 70-80% | **Entrenar** el modelo (aprende los patrones) | Estudiar para el examen |
| **Validation Set** | 10-15% | **Ajustar hiperparámetros** y prevenir overfitting | Examen de práctica |
| **Test Set** | 10-15% | Datos **nunca vistos**, solo para la **evaluación final** | Examen final |

> [!note] Flujo de aprendizaje
> Datos crudos → limpieza → feature engineering → set de entrenamiento → modelo predictivo → (con el set de validación) → **modelo predictivo validado**. Luego, en aplicación: nuevo set de datos → modelo validado → resultado de la predicción.

---

## 3. Matriz de Confusión (Confusion Matrix)

**Concepto clave:** La **Confusion Matrix** es una tabla que compara las predicciones del modelo (columnas) contra los valores reales (filas). Es el **punto de partida** para calcular Accuracy, Precision, Recall y F1-Score. Para clasificación binaria es una matriz **2×2**.

|  | **Predicted: Sí** | **Predicted: No** |
|---|---|---|
| **Actual: Sí** | **TP** (True Positive) | **FN** (False Negative) |
| **Actual: No** | **FP** (False Positive) | **TN** (True Negative) |

**Los cuatro componentes:**

| Sigla | Nombre | Qué significa |
|---|---|---|
| **TP** | True Positive (acierto positivo) | Predice positivo y **realmente es positivo**. El modelo acertó. |
| **TN** | True Negative (acierto negativo) | Predice negativo y **realmente es negativo**. El modelo acertó. |
| **FP** | False Positive — **Error Tipo I** | Predice positivo pero **es negativo**. Falsa alarma. |
| **FN** | False Negative — **Error Tipo II** | Predice negativo pero **es positivo**. Caso no detectado. |

**Relaciones fundamentales:**
- `TP + TN + FP + FN = Total de observaciones`
- `Aciertos = TP + TN` · `Errores = FP + FN`
- La **diagonal principal** (TP, TN) son los aciertos; **fuera de la diagonal** (FP, FN) están los errores.

> [!tip] Clave memotécnica
> - **Primera letra** = ¿acertó? → **T**rue (sí) o **F**alse (no).
> - **Segunda letra** = ¿qué predijo? → **P**ositive o **N**egative.

---

## 4. Ejemplo integrador: detector de spam

**Concepto clave:** Este ejemplo (100 correos) se reutiliza en toda la clase para calcular cada métrica.

|  | **Predicted: Spam** | **Predicted: No Spam** | Total real |
|---|---|---|---|
| **Actual: Spam** | TP = 40 | FN = 5 | 45 |
| **Actual: No Spam** | FP = 10 | TN = 45 | 55 |
| **Total pred.** | 50 | 50 | 100 |

Interpretación: **TP = 40** (spam detectado correctamente), **TN = 45** (correos legítimos correctos), **FP = 10** (legítimos marcados como spam), **FN = 5** (spam que pasó desapercibido). Aciertos = 85, errores = 15.

---

## 5. Accuracy (Exactitud)

**Concepto clave:** El **Accuracy** mide la proporción de **predicciones correctas** sobre el total. Es la métrica más intuitiva y fácil de interpretar.

`Accuracy = (TP + TN) / (TP + TN + FP + FN)`

Ejemplo spam: `Accuracy = (40 + 45) / 100 = 0.85 = 85%` → el modelo acierta el 85% de las veces.

- **Rango:** de 0 a 1 (0% a 100%). `1.0` = perfecto; `0.5` = como lanzar una moneda.
- **Ventajas:** fácil de interpretar, intuitivo para no técnicos, resume el rendimiento en un solo número.
- **Desventajas:** engañoso en datos desbalanceados, no distingue tipos de error, ignora el costo de FP vs FN.

> [!warning] Limitación en datasets desbalanceados
> En detección de fraude con **95% de casos "No fraude"**, un modelo **"tonto" que siempre predice "No"** obtiene **95% de Accuracy** sin detectar ni un fraude. El Accuracy **solo no es suficiente**: siempre analizarlo junto con Precision, Recall y F1.

---

## 6. Precision (Precisión)

**Concepto clave:** La **Precision** mide la **calidad de las predicciones positivas**. Responde: "de todo lo etiquetado como positivo, ¿cuánto fue realmente positivo?"

`Precision = TP / (TP + FP)`

Ejemplo spam: `Precision = 40 / (40 + 10) = 40 / 50 = 0.80 = 80%` → de cada 10 correos marcados como spam, 8 realmente lo son y 2 son falsos positivos.

- **Rango:** de 0 a 1. `1.0` = cero falsos positivos; `0.0` = ningún acierto positivo.
- **Alta Precision = pocos FP:** cuando el modelo dice "positivo", casi siempre tiene razón.
- **¿Cuándo priorizarla?** Cuando el **costo de un FP es alto** (ej.: acusar de plagio incorrectamente, diagnóstico médico de screening, filtros de contenido, sistemas de recomendación).

> [!quote] La Precision responde
> "Si el modelo dice SÍ, ¿qué tan seguro estoy de que realmente es SÍ?"

---

## 7. Recall (Sensibilidad / Cobertura)

**Concepto clave:** El **Recall** (también llamado **Sensitivity** o **True Positive Rate, TPR**) mide la **cobertura de los casos positivos**. Responde: "de todos los casos realmente positivos, ¿cuántos detectó el modelo?"

`Recall = TP / (TP + FN)`

Ejemplo spam: `Recall = 40 / (40 + 5) = 40 / 45 = 0.889 = 88.9%` → detecta 88.9% del spam real; el 11.1% restante (5 correos) llega a la bandeja de entrada.

- **Alto Recall = pocos FN:** el modelo detecta la mayoría de los positivos reales.
- **Sinónimos:** Sensitivity, True Positive Rate (TPR), Hit Rate, Cobertura.
- **¿Cuándo priorizarlo?** Cuando **no detectar un positivo es grave** (ej.: no detectar una enfermedad, un ataque de seguridad no detectado).

---

## 8. Precision vs Recall: el trade-off

**Concepto clave:** Existe un **trade-off fundamental**: no se pueden maximizar ambas simultáneamente. Se regula moviendo el **umbral de clasificación**.

| Ajuste del umbral | Efecto | Comportamiento del modelo |
|---|---|---|
| **Aumentar umbral ↑** | Más Precision, menos Recall | Más **conservador**: solo predice positivo cuando está muy seguro |
| **Disminuir umbral ↓** | Menos Precision, más Recall | Más **liberal**: predice positivo con poca evidencia |

**¿Cuál elegir? Depende del costo del error:**

| Escenario | Priorizar | Razón |
|---|---|---|
| Detección de enfermedad | **Recall** | Peor no detectar (FN) que alarmar (FP) |
| Spam filtering | **Precision** | Peor bloquear un correo legítimo (FP) que dejar pasar spam (FN) |

---

## 9. F1-Score

**Concepto clave:** El **F1-Score** es la **media armónica** de Precision y Recall. Combina ambas métricas en un solo valor, buscando el **equilibrio** entre ellas.

`F1 = 2 × (Precision × Recall) / (Precision + Recall)`

Ejemplo spam (Precision = 0.80, Recall = 0.889):
`F1 = 2 × (0.80 × 0.889) / (0.80 + 0.889) = 1.422 / 1.689 = 0.842 = 84.2%`

- **Rango:** de 0 a 1. `1.0` = Precision y Recall perfectos; `0` = al menos una métrica es cero.
- **Penaliza** modelos con Precision alta pero Recall bajo (o viceversa).
- Es **especialmente valioso con clases desbalanceadas**, donde el Accuracy sería engañoso.

> [!note] Comparación de métricas del ejemplo
> `Accuracy = 85%` · `Precision = 80%` · `Recall = 88.9%` · `F1 = 84.2%`. Valores similares indican un **dataset relativamente balanceado**.

---

## 10. R² Score (coeficiente de determinación)

**Concepto clave:** El **R²** mide qué **proporción de la varianza** de la variable dependiente es **explicada por el modelo**. Se usa principalmente en **regresión** (valores continuos), no en clasificación (aunque algunos clasificadores probabilísticos lo reportan).

`R² = 1 − (SS_res / SS_tot)`

donde `SS_res` = suma de errores al cuadrado del modelo, y `SS_tot` = varianza total de los datos (respecto a la media).

- **Rango:** de **−∞ a 1**. `R² = 1` predicción perfecta; `R² = 0` tan bueno como predecir la media; `R² < 0` peor que predecir la media.

| Valor R² | Interpretación | Significado |
|---|---|---|
| 0.95 | Excelente | Explica el 95% de la variabilidad |
| 0.70 | Aceptable | Explica el 70% |
| 0.30 | Pobre | Solo explica el 30% |
| 0.00 | Sin valor | No explica nada más que la media |
| < 0 | Peor que nada | Peor que usar el promedio |

> [!warning] Limitación del R²
> El R² **aumenta al agregar variables** (aunque sean irrelevantes). Para comparar modelos con distinto número de predictores, usar el **R² ajustado**, que penaliza la complejidad: `R²_adj = 1 − [(1 − R²)(n − 1) / (n − p − 1)]`.

---

## 11. Curva ROC y AUC

**Concepto clave:** La **curva ROC** (Receiver Operating Characteristic) muestra el rendimiento del clasificador a **todos los umbrales posibles**, graficando TPR contra FPR.

**Ejes:**
- **Eje X = FPR** (False Positive Rate): `FPR = FP / (FP + TN)`
- **Eje Y = TPR** (True Positive Rate = Recall): `TPR = TP / (TP + FN)`
- Ambos ejes van de **0 a 1**.

**Cómo se genera:** el modelo produce probabilidades para cada instancia → se varía el umbral de 0 a 1 → para cada umbral se calcula TPR y FPR → se grafica TPR vs FPR.

**Lectura de la curva:**
- Cada punto = un **umbral diferente**.
- La **diagonal** = clasificador **aleatorio** (sin habilidad, "No Skill").
- Cuanto **más cerca de la esquina superior izquierda**, mejor el modelo.
- Un buen modelo tiene su curva **por encima de la diagonal**.

**AUC (Area Under the Curve):** mide el **área bajo la curva ROC**, dando una **métrica única** del rendimiento. `AUC = ∫ ROC curve`, con valor entre 0 y 1.

| AUC | Interpretación |
|---|---|
| **1.0** | Clasificador **perfecto** (separa todas las clases correctamente) |
| **0.5** | Clasificador **aleatorio** (como lanzar una moneda) |
| **0.0** | Clasificador **invertido** (peor que aleatorio, invierte predicciones) |

> [!tip] Ventajas del AUC
> Es **independiente del umbral**, permite **comparar modelos** y es interpretable como la **probabilidad de ranking correcto** (que el modelo puntúe más alto a un positivo que a un negativo elegidos al azar).

---

## Mapa de conceptos de la clase

- **Validación** = medir cómo **generaliza** el modelo a datos nuevos (evitar overfitting/underfitting).
- **Split de datos:** Train (70-80%) → Validation (10-15%) → Test (10-15%, nunca visto).
- **Matriz de confusión** = TP, TN, FP, FN. FP = Error Tipo I; FN = Error Tipo II. Diagonal = aciertos.
- **Accuracy** = `(TP+TN)/Total` — engañoso en datos desbalanceados.
- **Precision** = `TP/(TP+FP)` — calidad del positivo; priorizar si el **FP** es costoso.
- **Recall** = `TP/(TP+FN)` — cobertura del positivo (Sensitivity/TPR); priorizar si el **FN** es grave.
- **Trade-off** Precision ↔ Recall vía el **umbral**.
- **F1-Score** = `2·(P·R)/(P+R)` — media armónica; ideal con clases desbalanceadas.
- **R²** = `1−(SS_res/SS_tot)` — varianza explicada; métrica de **regresión** (usar R² ajustado para comparar modelos).
- **ROC** = TPR vs FPR a todos los umbrales; **AUC** = área bajo la curva (1 = perfecto, 0.5 = azar).
