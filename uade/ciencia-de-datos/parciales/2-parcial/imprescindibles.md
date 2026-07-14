---
tags: [ciencia-de-datos, imprescindibles, 2-parcial]
materia: Ciencia de Datos
parcial: 2do parcial
fecha-parcial: 2026-06-26
generado: 2026-06-25
---

# Imprescindibles — 2do Parcial (lo que tenés que poder decir sí o sí)

> [!important] Cómo es el examen (confirmado en los 2 temas reales)
> **4 teóricas** (hay que **justificar**) + **1 práctico**.
> - Las teóricas son **siempre los mismos 4 temas** (cambia el orden): minería de datos · overfitting/underfitting · K-fold vs Stratified · clustering/K-Means.
> - El práctico es **siempre matriz de confusión**: te dan TP/TN/FP/FN, calculás Exactitud/Precisión/Sensibilidad/F1 y justificás **cuál métrica importa más**.
>
> 🔴 = núcleo (cae sí o sí) · ⚪ = respaldo (puede entrar como "técnica" o justificación).

---

## 🔴 NÚCLEO DEL EXAMEN (estudiá esto primero)

### 1. Minería de datos *(Teórica 1)*
**Decir:** la minería de datos es el **proceso de descubrir patrones y conocimiento útil en grandes volúmenes de datos**. La pregunta pide 4 cosas: concepto + **una técnica** + **caso de negocio** + **pasos para implementarla**.
- **Una técnica + caso de negocio** (elegí una y desarrollala):
  - **Clustering / K-Means** → segmentación de clientes.
  - **Árboles de decisión** → scoring crediticio (aprobar/rechazar préstamo).
  - **Reglas de asociación** → market basket (qué productos se compran juntos).
- **Pasos para implementarla (metodología CRISP-DM):** comprensión del **negocio** → comprensión de los **datos** → **preparación** de datos → **modelado** → **evaluación** → **despliegue**.
- *Por qué:* la metodología es lo que ordena "los pasos"; sin ella la respuesta queda incompleta.

### 2. Overfitting / Underfitting / Generalización *(Teórica 2)*
**Decir:**
- **Overfitting (sobreajuste):** modelo **demasiado complejo** que **memoriza** el train (incluido el ruido) → error **bajo en train pero alto en test**. *Ejemplo:* árbol de decisión muy profundo.
- **Underfitting:** modelo **demasiado simple** que no capta el patrón → error **alto en train Y en test**.
- **Modelo generalizable:** el que **predice bien datos nunca vistos** → error bajo en train **y** en test.
- **Cómo se evita / detecta:** separar **train-test**, usar **cross-validation**, y **regularizar** (en árboles: poda, `max_depth`).
- *Por qué cae:* es el concepto que conecta toda la materia (validación, bias-variance, RF).

### 3. K-fold CV vs Stratified K-fold *(Teórica 3)*
**Decir:**
- **K-fold cross validation:** dividir los datos en **K folds** iguales, entrenar **K veces** usando cada fold como test una vez, y **promediar** los resultados.
- **Cuándo usarla:** para una estimación **robusta** del rendimiento, sobre todo con **datasets chicos** (aprovecha todos los datos).
- **Diferencia con Stratified K-fold:** el stratified **mantiene la proporción de clases** en cada fold → se usa con **clases desbalanceadas** (ej. 90% sanos / 10% enfermos, para que ningún fold quede sin la clase rara).
- *Por qué:* la pregunta pide explícitamente la **diferencia** — sin nombrar "proporción de clases / desbalanceo" no está completa.

### 4. Clustering + K-Means *(Teórica 4)*
**Decir:**
- **Clustering:** técnica de aprendizaje **no supervisado** que **agrupa datos sin etiquetas por similitud**, de modo que los de un mismo grupo sean parecidos entre sí (cohesión) y distintos de los otros grupos (separación).
- **K-Means (cómo funciona, 5 pasos):**
  1. Definir **K** e inicializar K centroides al azar.
  2. Asignar cada punto al **centroide más cercano** (distancia euclídea).
  3. **Recalcular** cada centroide = promedio de sus puntos.
  4. **Iterar** 2-3.
  5. **Converger** (centroides estables / nadie cambia de grupo / máx iteraciones).
- **Casos de negocio:** segmentación de clientes, agrupar productos, detección de perfiles.
- *Extra:* para elegir K → **método del codo** (graficar inercia vs K).

### 5. PRÁCTICO — Matriz de confusión *(Ejercicio 5, SIEMPRE cae)*
**Fórmulas a memorizar** (TP=verdadero positivo, FN=falso negativo, etc.):
- **Exactitud (Accuracy)** = (TP+TN) / total
- **Precisión (Precision)** = TP / (TP+FP)
- **Sensibilidad (Recall)** = TP / (TP+FN)
- **F1** = 2·(Precisión·Sensibilidad) / (Precisión+Sensibilidad)

> [!warning] La pregunta trampa: "¿cuál métrica importa más?"
> Regla: **si el costo de un Falso Positivo es despreciable y querés detectar TODOS los positivos → Sensibilidad (Recall).** Si lo caro es el Falso Positivo → Precisión.
> En **los dos temas** el FP es barato (descartar un chip funcional / bloquear una transacción legítima) y el objetivo es no perder ningún caso → la respuesta es **Sensibilidad/Recall**.

**Ejemplo resuelto — Tema 1 (chips: TP=18, FN=2, FP=10, TN=70, total=100):**
- Exactitud = (18+70)/100 = **88%**
- Precisión = 18/(18+10) = 18/28 = **64,3%**
- Sensibilidad = 18/(18+2) = 18/20 = **90%**
- F1 = 2·(0,643·0,90)/(0,643+0,90) = **75%**
- **Métrica clave: Sensibilidad** (no queremos chips defectuosos sin detectar; el FP es despreciable).

*(Practicá el Tema 2 — fraude: TP=9, FN=1, FP=12, TN=78 → Sensibilidad = 9/10 = 90%, misma lógica.)*

---

## ⚪ RESPALDO — resto de la materia (por si entra como técnica o justificación)

### Árboles de decisión
- **Decir:** modelo **supervisado** que predice con un flujo de preguntas; estructura raíz → nodos → hojas; construcción **greedy**. Hoja = clase mayoritaria (clasif) o promedio (regr).
- **Impureza:** **entropía** (desorden, 0 puro–1 caótico), **ganancia de información** (se elige el atributo con la mayor), **Gini** (prob. de error, default de sklearn).
- **Algoritmos:** ID3 (categóricos, sin poda) → C4.5 (numéricos + poda) → CART (binario, Gini/MSE).
- *Por qué importa:* es la "técnica" más fácil de desarrollar en la Teórica 1 y el ejemplo típico de overfitting.

### Random Forest
- **Decir:** **ensemble** de muchos árboles; combina **bagging** (muestras con reemplazo → reduce varianza) + **feature randomness** (subconjunto aleatorio de variables por split → decorrela los árboles). Predice por **voto mayoritario** (clasif) o **promedio** (regr).
- **No necesita poda** porque la agregación de muchos árboles ya reduce la varianza.

### Modelos de regresión
- **Decir:** predicen **valores continuos** (vs clasificación = categorías).
- **Lineal simple/múltiple** (β₀ intersección, β₁ pendiente; efecto marginal en la múltiple). **Logística** = clasificación binaria con **sigmoide** (probabilidad 0-1, umbral 0.5). **Polinómica** = relaciones no lineales (grado d).
- **Métricas:** MSE (penaliza errores grandes), RMSE (mismas unidades que Y), MAE (robusto a outliers), R² (varianza explicada, 1 = perfecto).

### Feature engineering
- **Decir:** seleccionar/transformar variables (feature = variable = columna). Tipos: nominal/ordinal, discreta/continua.
- **Encoding:** label (entero, solo ordinales) vs **one-hot** (binaria por categoría, nominales; ojo **dummy trap** → K−1 columnas).
- **Escalado** (esencial para SVM/K-Means/PCA): MinMax [0,1], Standard (z-score, media 0/desvío 1), Robust (mediana/IQR, para outliers).
- **Bias-Variance:** Error = Bias² + Varianza + Irreducible. Bias = modelo simple (underfitting); Varianza = modelo flexible (overfitting).

### Aprendizaje no supervisado (extra)
- **PCA:** reduce dimensiones conservando la **máxima varianza**; pasos: estandarizar → covarianza → autovalores/autovectores → ordenar (PC1 máx varianza) → proyectar.
- **Reglas de asociación:** `{A} ⇒ {B}`. **Soporte** (frecuencia), **Confianza** (certeza), **Lift** (>1 asociación positiva). Algoritmo **Apriori** (combinar y podar).

### Introducción a la IA
- **4 campos** (pensar/actuar × humano/racional): pensar humano (Blue Brain) · pensar racional (lógica/sistemas expertos) · actuar humano (**Turing**) · actuar racional (**agente**, el más usado hoy).
- **Prueba de Turing:** pasa si el evaluador no distingue máquina de humano (NLP, KR, razonamiento, ML; global suma visión + robótica).
- **5 tipos de agentes:** reactivo simple → con estado → basado en objetivos → basado en utilidad → que aprende.

### OKRs vs KPIs
- **OKR** = objetivo (cualitativo) + 3-5 resultados clave (medibles); óptimo **60-70%**. **KPI** = métrica de proceso existente, continua, busca **100%**. No son excluyentes.

---

## ✅ Checklist final (marcá el día antes)

**Núcleo (cae seguro):**
- [ ] Minería de datos: definición + técnica + caso de negocio + pasos (CRISP-DM)
- [ ] Overfitting vs underfitting + qué es ser generalizable
- [ ] K-fold CV: qué es, cuándo, y diferencia con Stratified (clases desbalanceadas)
- [ ] Clustering + K-Means (5 pasos) + caso de negocio + método del codo
- [ ] Matriz de confusión: 4 fórmulas + calcular + cuál métrica importa (FP barato → Recall)

**Respaldo (poder explicarlo si lo piden):**
- [ ] Árboles: entropía / Gini / ganancia de info / ID3-C4.5-CART
- [ ] Random Forest: bagging + feature randomness + por qué no poda
- [ ] Regresión: lineal / logística (sigmoide) / polinómica + MSE/RMSE/MAE/R²
- [ ] Feature engineering: encoding (label vs one-hot + dummy trap) / escalado / bias-variance
- [ ] PCA + reglas de asociación (soporte/confianza/lift, Apriori)
- [ ] IA: 4 campos + Turing + 5 agentes
- [ ] OKR vs KPI (60-70% vs 100%)
