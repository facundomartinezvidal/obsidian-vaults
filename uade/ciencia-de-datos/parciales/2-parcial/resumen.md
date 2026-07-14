---
tags: [ciencia-de-datos, resumen, 2-parcial]
materia: Ciencia de Datos
parcial: 2do parcial
fecha-parcial: 2026-06-26
generado: 2026-06-25
---

# Resumen — 2do Parcial (Ciencia de Datos)

> [!info] Alcance
> Bloque 2 — Minería de datos + ML. Apunte de estudio completo, pensado para aprender desde cero y rendir. Basado en el material de cátedra (`content/2-parcial/`).

> [!warning] Material faltante
> No hay PDF de la clase 14 ("Tableros de control"); lo más cercano es `06.1-okrs-vs-kpis.pdf`. Se nombran pero no se desarrollan: coeficiente de silueta, clustering jerárquico y DBSCAN en detalle, IA débil vs fuerte y deep learning.

**Índice**
1. [[#1 · OKRs vs KPIs]]
2. [[#2 · Árboles de decisión]]
3. [[#3 · Random Forest]]
4. [[#4 · Métricas de clasificación y validación]]
5. [[#5 · Modelos de regresión]]
6. [[#6 · Aprendizaje no supervisado]]
7. [[#7 · Feature engineering]]
8. [[#8 · Introducción a la IA]]
9. [[#9 · Prácticas integradoras]]

---

## 1 · OKRs vs KPIs

### OKR (Objectives and Key Results)
Protocolo de colaboración para fijar objetivos en la organización, conectando cada meta con resultados medibles. Nació del MBO de Drucker (1954) → lo desarrolló Intel (Andy Grove) → John Doerr lo llevó a Google (1999). Tres piezas que responden tres preguntas encadenadas:

- **Objetivo** — *¿a dónde queremos llegar?* Es **cualitativo, inspirador, ambicioso y memorable**. Da dirección. No lleva números. Ej.: "Crear una experiencia de cliente memorable".
- **Resultado Clave (KR)** — *¿cómo sabemos que tenemos éxito?* Es **cuantificable, con plazo y accionable**. Se definen **3 a 5 por objetivo**. Ej.: "subir el NPS de 30 a 70".
- **Iniciativas** — *¿qué haremos?* Las acciones concretas para mover los KR.

Reglas que casi siempre caen en el parcial:
- Los OKR son **públicos** (todos ven en qué trabaja el resto) → fomentan transparencia y alineamiento.
- **No** son evaluación de desempeño ni una lista de tareas: son metas estratégicas.
- El cumplimiento óptimo es **60-70%**. Si llegás al 100%, el OKR **no era suficientemente ambicioso**. La meta es el aprendizaje y la mejora continua, no la perfección.
- Al escribirlos: el objetivo debe ser corto y memorizable; en los KR hay que **separar métrica de tarea** ("aumentar NPS de x a y" ✔ vs "hacer una encuesta" ✘).

### KPI (Key Performance Indicator)
Medida **cuantificable** que evalúa el desempeño respecto de objetivos estratégicos. A diferencia del OKR, mira **procesos que ya existen** y los monitorea de forma **continua y periódica** (mensual/trimestral). Ejemplos: ingresos mensuales, tasa de conversión, churn, tiempo de respuesta, NPS.

### OKR vs KPI (la comparación clave)

| Dimensión | OKR | KPI |
|---|---|---|
| **Propósito** | Metas ambiciosas / transformacionales | Rendimiento de procesos existentes |
| **Temporalidad** | Trimestral/anual, flexible | Continuo y periódico |
| **Ambición** | **60-70% óptimo** (estira) | **Busca 100%** (realista) |
| **Alcance** | Toda la organización, transparente | Por área/equipo/proceso |
| **Naturaleza** | Cualitativo (objetivo) + cuantitativo (KR) | Puramente cuantitativo |

⚠️ **No son excluyentes**: en la práctica se usan juntos y de forma complementaria.

**Tracking** (lo más cercano a un tablero de control en el material): se sigue cada KR con columnas *unidad / actual / target / progreso*, con **check-ins cada 2 semanas** y calificación al final del ciclo. El **NPS** (Net Promoter Score) mide la probabilidad de que un cliente recomiende la empresa, en escala **−100 a +100**.

---

## 2 · Árboles de decisión

**Qué es:** modelo de aprendizaje **supervisado** que predice siguiendo un flujo de preguntas simples, donde cada respuesta acota la decisión —como un médico que ante fiebre va preguntando (¿hace cuánto?, ¿dolor de cabeza?) y descarta diagnósticos—. Es la "puerta de entrada al ML".

**Estructura (anatomía):**
- **Nodo raíz** — la primera pregunta; el atributo que mejor separa los datos.
- **Nodos internos** — decisiones intermedias que parten los datos en ramas.
- **Hojas** — la predicción final. En **clasificación** devuelven la **clase mayoritaria** de los ejemplos que caen ahí; en **regresión**, el **promedio** de sus valores.

**Cómo se construye:** de forma **greedy** ("divide y vencerás"). En cada nodo evalúa cada atributo, mide cuánto mejora la pureza, se queda con el mejor (decisión *local*, sin mirar adelante) y repite **recursivamente** hasta que las hojas queden puras.

### Medidas de impureza (cómo elige el atributo)

- **Entropía** — mide el **desorden**: qué tan mezcladas están las clases en un nodo.
$$H(S)=-\sum_{i=1}^{n} p_i\log_2 p_i$$
  - $p_i$ = proporción de cada clase. **H=0** → nodo puro (todos iguales). **H=1** → máximo desorden (50/50).
- **Ganancia de información (IG)** — la **reducción de entropía** al dividir por un atributo (entropía antes − entropía ponderada después). El árbol elige el atributo con **mayor IG**.
$$IG(S,A)=H(S)-\sum_{v}\frac{|S_v|}{|S|}H(S_v)$$
- **Índice de Gini** — probabilidad de **clasificar mal** un elemento al azar.
$$Gini=1-\sum_{i=1}^{n} p_i^2$$
  - **0** = puro, **0.5** = máxima impureza. Más rápido que la entropía (no usa logaritmos), por eso es el **criterio por defecto de scikit-learn**. La diferencia de precisión con la entropía es mínima.

> [!example] Caso canónico "¿Jugar tenis?" (algoritmo ID3) — entendelo de memoria
> Dataset: **14 días**, **9 Sí y 5 No** → entropía inicial $H(S)=0.940$ (hay desorden, conviene dividir).
> Evaluamos el atributo **Cielo** (3 valores):
> - Soleado: 2 Sí / 3 No → H = 0.971
> - Nublado: 4 Sí / 0 No → H = 0 (¡puro!)
> - Lluvia: 3 Sí / 2 No → H = 0.971
>
> Entropía ponderada: $\frac{5}{14}(0.971)+\frac{4}{14}(0)+\frac{5}{14}(0.971)=0.693$.
> Ganancia: $IG(Cielo)=0.940-0.693=\mathbf{0.247}$ → la **mayor** de todas (Humedad 0.151, Viento 0.048, Temperatura 0.029).
> Por eso **Cielo es la raíz**. Reglas finales:
> - Cielo = Nublado → **Sí** (hoja directa)
> - Cielo = Soleado → Humedad Alta → No / Normal → Sí
> - Cielo = Lluvia → Viento Fuerte → No / Débil → Sí

### Algoritmos clásicos (van mejorando uno sobre otro)

| | ID3 | C4.5 | CART |
|---|---|---|---|
| Criterio | Ganancia (entropía) | Ganancia + mejoras | **Gini** (clasif) / **MSE** (regr) |
| Ramas | Multiclase (>2) | Multiclase | **Siempre binarias** |
| Numéricos | No | Sí (umbrales) | Sí |
| Faltantes | No | Sí | Sí |
| Poda | No | Sí | Sí |
| Tareas | Clasificación | Clasificación | Clasif. **y regresión** |

- **ID3** (1986, pionero): demostró que un enfoque greedy simple aprende reglas interpretables. Solo categóricos, sin poda → sobreajusta.
- **C4.5**: agrega **umbrales dinámicos** para variables numéricas (ej. Edad ≤ 30.5), **poda (pruning)** para generalizar mejor, y traduce el árbol a reglas SI-ENTONCES.
- **CART**: árboles **binarios** (sí/no por nodo). Gini para clasificar, **MSE** para regresión (la hoja predice el promedio). Es lo que implementa scikit-learn.

### Overfitting (sobreajuste) — concepto central
Un árbol **muy profundo memoriza** el train en vez de aprender patrones generales. Señal típica: **~100% en train pero ~60% en test**. Se combate limitando la complejidad:
- `max_depth` (profundidad máxima), `min_samples_leaf` (mínimo de muestras por hoja), `min_samples_split`, y **poda** post-entrenamiento.
- Un árbol bien regularizado baja un poco en train (~85%) pero **sube mucho en test (~82%)** → generaliza.

**Ventajas:** muy interpretables (se leen como diagrama de flujo), **no requieren escalado**, rápidos, hacen selección implícita de atributos.
**Desventajas:** propensos a overfitting, **inestables** (un cambio chico en los datos cambia todo el árbol), sesgo hacia atributos con muchas categorías, y **menos precisos que los ensambles** (→ Random Forest).

---

## 3 · Random Forest

**Qué es:** algoritmo de **ensemble learning** que combina **muchos árboles** para predecir de forma más robusta y precisa (sirve para clasificación y regresión). Idea clave: un árbol solo sobreajusta el ruido, pero **el error de uno se cancela con el acierto de otros** → "comité de expertos" mejor que un experto.

Su fuerza viene de **dos fuentes de aleatoriedad** (entender ambas es lo que distingue un 10):

1. **Bagging (Bootstrap Aggregating)** — aleatoriza los **datos**.
   - Cada árbol se entrena con una **muestra bootstrap**: N registros tomados **con reemplazo** del dataset original.
   - Como es con reemplazo, algunos registros se repiten y otros quedan afuera (**out-of-bag**).
   - Promediar modelos entrenados sobre datos algo distintos **reduce la varianza** y estabiliza.

2. **Feature randomness** — aleatoriza las **variables**.
   - En **cada split** solo se evalúa un **subconjunto aleatorio de m predictores** (distinto en cada nodo y árbol).
   - Esto **decorrelaciona** los árboles: evita que una variable dominante aparezca en todos, y los obliga a aprender patrones alternativos → bosque más diverso, menor varianza.

**Algoritmo:**
1. Fijar parámetros: `n_estimators` (nº árboles), `max_features` (features por split), `max_depth`.
2. Generar una muestra **bootstrap** por árbol.
3. Construir cada árbol eligiendo entre *m* features con criterio **Gini/entropía** — **sin podar**.
4. Repetir; los árboles son independientes → se **paralelizan**.

> [!tip] Pregunta trampa: ¿por qué RF no necesita poda?
> Porque la **agregación de muchos árboles sin podar** es justamente lo que reduce la varianza. La diversidad reemplaza a la poda.

**Predicción (agregación):** clasificación → **voto mayoritario** (o probabilidad promedio); regresión → **promedio**.

**Ventajas:** reduce el overfitting drásticamente vs un árbol, maneja miles de variables, da **importancia de características**, robusto a faltantes y ruido. Muy usado en Kaggle e industria.

---

## 4 · Métricas de clasificación y validación

**Validar = medir si el modelo generaliza** a datos nuevos, no si memorizó. *"Un modelo que no se puede validar, no se puede confiar."* Por eso se parten los datos:
- **Train (70-80%)** → el modelo aprende.
- **Validation (10-15%)** → ajustar hiperparámetros y detectar overfitting.
- **Test (10-15%)** → datos **nunca vistos**, solo para la evaluación final.
- Analogía: estudiar / examen de práctica / examen final. No "hacer trampa" mirando el test antes.

### Matriz de confusión
Compara predicciones vs realidad. Caso guía de toda la clase (detector de spam, 100 correos): **TP=40, TN=45, FP=10, FN=5**.

| | Predijo Positivo | Predijo Negativo |
|---|---|---|
| **Real Positivo** | **TP** (40) | **FN** (5) — error tipo II |
| **Real Negativo** | **FP** (10) — error tipo I | **TN** (45) |

- **TP/TN** = aciertos. **FP** = falsa alarma (error tipo I). **FN** = caso no detectado (error tipo II).
- Mnemotecnia: 1ª letra = ¿acertó? (T/F); 2ª letra = ¿qué predijo? (P/N).

### Métricas (con el caso spam)
- **Accuracy** = $\frac{TP+TN}{total}=\frac{85}{100}=$ **85%**. Proporción de aciertos.
  - ⚠️ **Engaña con clases desbalanceadas**: si el 95% es "No fraude", un modelo que **siempre dice No** logra 95% de accuracy **sin detectar ningún fraude**. Por eso nunca se mira sola.
- **Precision** = $\frac{TP}{TP+FP}=\frac{40}{50}=$ **80%**. *De lo que predije positivo, ¿cuánto era real?* Alta precision = pocos FP. **Importa cuando un FP es caro** (spam: no bloquear correos legítimos; diagnóstico de screening).
- **Recall** (sensibilidad, TPR) = $\frac{TP}{TP+FN}=\frac{40}{45}=$ **88.9%**. *De los positivos reales, ¿cuántos detecté?* Alto recall = pocos FN. **Importa cuando un FN es grave** (enfermedad: no dejar pasar un enfermo).
- **F1-Score** = $2\cdot\frac{P\cdot R}{P+R}=$ **84.2%**. Media armónica de P y R: penaliza tener una alta y la otra baja. **Muy útil con clases desbalanceadas**.

### Trade-off Precision ↔ Recall
No se pueden maximizar las dos a la vez; se regula con el **umbral de decisión**:
- **Subir el umbral** → más Precision, menos Recall (modelo conservador, solo dice positivo si está muy seguro).
- **Bajar el umbral** → más Recall, menos Precision (modelo liberal).
- Regla práctica: **enfermedad → Recall**; **spam → Precision**.

### Curva ROC y AUC
- **ROC**: grafica **TPR** (= Recall, eje Y) vs **FPR** = $\frac{FP}{FP+TN}$ (eje X) a **todos los umbrales**. Cada punto es un umbral.
- La **diagonal** = clasificador aleatorio ("no skill"); cuanto más se acerca la curva a la **esquina superior izquierda**, mejor.
- **AUC** (área bajo la curva) = un único número: **1.0** perfecto, **0.5** aleatorio, **0.0** invertido. Ventaja: **independiente del umbral**, permite comparar modelos.

---

## 5 · Modelos de regresión

**Qué es:** modela la relación entre la variable objetivo **Y** y una o más predictoras **X** para predecir **valores continuos** (vs clasificación, que da categorías). Busca una función f(X) que **minimice el error** entre predicción y realidad.

### Lineal simple
$$Y=\beta_0+\beta_1 X+\varepsilon$$
- **β₀** = intersección (valor de Y cuando X=0). **β₁** = pendiente (cuánto cambia Y por unidad de X). **ε** = variabilidad no explicada.
- β₁ > 0 → relación positiva; < 0 → negativa; ≈ 0 → sin relación.
- *Ejemplo (pizza):* β₀=5, β₁=1.5 → pizza de 30 cm = 5 + 1.5×30 = **$50**; cada cm extra suma $1.50.
- ⚠️ Una pendiente fuerte **no implica causalidad**.
- **Validar con residuos** ($e_i=Y_i-\hat Y_i$): supuestos de linealidad, independencia (Durbin-Watson), homocedasticidad (varianza constante; un "embudo" en el gráfico = problema) y normalidad (Q-Q plot).

### Lineal múltiple
$$Y=\beta_0+\beta_1X_1+\dots+\beta_kX_k+\varepsilon$$
- Cada **βⱼ = efecto marginal**: cuánto cambia Y por unidad de Xⱼ **manteniendo las demás constantes**.
- **Multicolinealidad** (problema típico): predictoras muy correlacionadas entre sí. Indicadores: r > 0.8, **VIF > 10**, coeficientes con signos raros. Vuelve inestables los coeficientes. Soluciones: eliminar/combinar variables, **PCA**, regularización (**Ridge/Lasso**).
- **Selección de variables:** Forward (ir agregando), Backward (ir quitando), Stepwise (mixto). Preferir el modelo más simple (navaja de Occam).

### Logística (¡es clasificación!)
- Pese al nombre, sirve para **clasificación binaria**: predice la **probabilidad** de pertenecer a una clase.
- La lineal no sirve porque puede dar valores fuera de [0,1]; se usa la **sigmoide**:
$$\sigma(z)=\frac{1}{1+e^{-z}},\quad z=\beta_0+\beta_1X$$
- Comprime cualquier real a [0,1]. Forma de "S". En **z=0 → 0.50** (umbral de decisión); z>0 favorece la clase 1.

### Polinómica
$$Y=\beta_0+\beta_1X+\beta_2X^2+\dots+\beta_dX^d+\varepsilon$$
- El **grado d** regula la flexibilidad: grado 2 = parábola, grado 3 = punto de inflexión.
- **Equilibrio sesgo-varianza**: grado bajo → underfitting (rígido); grado alto (>5) → overfitting (captura ruido). Grado óptimo por **validación cruzada**.

### Métricas de regresión
- **MSE** = $\frac1n\sum(y_i-\hat y_i)^2$ → promedio de errores al cuadrado; **penaliza más los errores grandes**.
- **RMSE** = $\sqrt{MSE}$ → en las **mismas unidades que Y**, más interpretable.
- **MAE** = $\frac1n\sum|y_i-\hat y_i|$ → **más robusto a outliers**.
- **R²** = $1-\frac{SS_{res}}{SS_{tot}}$ → **proporción de varianza explicada**. 1 = ajuste perfecto, 0 = igual que predecir la media.

---

## 6 · Aprendizaje no supervisado

**Qué es:** trabaja con datos **sin etiquetas**, descubriendo patrones por sí mismo. Supervisado = "aprender con profesor" (hay respuestas); no supervisado = "por descubrimiento propio". Tres familias:
- **Clustering** → ¿qué grupos existen?
- **Reducción de dimensionalidad** → ¿qué variables son clave?
- **Reglas de asociación** → ¿qué elementos van juntos?

### Clustering
Agrupa los datos en **clusters** donde los objetos de un grupo son más similares entre sí que con los de otros. Un buen agrupamiento logra **cohesión intra-cluster** (puntos cercanos dentro) + **separación inter-cluster** (grupos bien distintos).

- **Distancias** (para medir similitud):
  - **Euclidiana** $=\sqrt{\sum(A_i-B_i)^2}$ → la "línea recta", nativa de K-Means.
  - **Manhattan** $=\sum|A_i-B_i|$ → suma de diferencias absolutas; mejor con **alta dimensionalidad u outliers**.
- **Centroide** = centro geométrico (la media) de un cluster.

**K-Means — algoritmo paso a paso:**
1. Definir **K** e inicializar K centroides **al azar**.
2. Asignar cada punto al **centroide más cercano** (euclídea).
3. **Recalcular** cada centroide como el **promedio** de los puntos asignados (de ahí "Means").
4. **Iterar** pasos 2-3: al moverse los centros, algunos puntos cambian de grupo.
5. **Converger**: cuando los centroides ya no se mueven, ningún punto cambia de grupo, o se llega al máximo de iteraciones.

- **Elegir K — método del codo:** correr K-Means para K=1,2,3… y graficar la **inercia** (qué tan compactos están los grupos; cae al subir K) vs K. El **"codo"** (donde la mejora se aplana) marca el K óptimo. Heurístico; se complementa con el **coeficiente de silueta** (nombrado, sin fórmula en el material).
- ✅ simple, escalable, interpretable, **siempre converge** (puede ser a óptimo local). ❌ hay que **fijar K**, sensible a la inicialización y a outliers, asume clusters **esféricos**. (Para formas irregulares se mencionan, sin desarrollar, **clustering jerárquico** y **DBSCAN**, que además detecta outliers.)

### PCA (Análisis de Componentes Principales)
Reducción de dimensionalidad: transforma variables **correlacionadas** en **componentes principales no correlacionados**, reduciendo dimensiones pero **conservando la máxima varianza**. Combate la **maldición de la dimensionalidad** (muchas variables vs pocas observaciones → datos dispersos).

**Pasos:**
1. **Estandarizar** los datos (PCA es **muy sensible a la escala**).
2. Calcular la **matriz de covarianza**.
3. Obtener **autovalores y autovectores**: los **autovectores** son las direcciones de los nuevos ejes; los **autovalores** indican cuánta varianza captura cada uno.
4. **Ordenar**: **PC1** = dirección de máxima varianza, **PC2** = perpendicular (ortogonal) a PC1, etc.
5. **Proyectar** los datos sobre los componentes elegidos.

- ¿Cuántos conservar? varianza acumulada **80-95%**, **criterio de Kaiser** (autovalor > 1), regla del codo (scree plot), o 2-3 para visualizar.
- Limitaciones: pierde algo de info, componentes difíciles de interpretar, asume relaciones **lineales**.

### Reglas de asociación
Descubren relaciones frecuentes en datos transaccionales: `{Antecedente} ⇒ {Consecuente}` (ej. `{Pan, Manteca} ⇒ {Leche}`). Aplicación estrella: **Market Basket Analysis**. Tres métricas:
- **Soporte** = frecuencia del conjunto sobre el total de transacciones. *¿Qué tan común es?*
- **Confianza** = de los que compraron A, % que también llevó B. *Certeza de la regla.*
- **Lift** = corrige el sesgo de los productos muy populares (compara contra el azar). **=1** independencia, **>1** asociación positiva, **<1** negativa.

> [!example] Apriori — ejemplo
> Regla `{Pan, Leche} ⇒ {Mantequilla}`: Soporte = 2/5 = **40%**, Confianza = 2/3 = **67%**, Lift = 0.67/0.60 = **1.11** → asociación positiva (11% más probable comprar mantequilla).

- **Algoritmo Apriori:** fijar umbrales mínimos (soporte, confianza) → contar 1-itemsets y **podar** los poco frecuentes → combinar en pares y podar → iterar a combinaciones mayores ("combinar y podar") → generar reglas → filtrar por confianza y calcular Lift.

---

## 7 · Feature engineering

**Feature** = propiedad medible usada como entrada del modelo (= variable = columna, según se la mire desde ML / estadística / base de datos). El feature engineering —seleccionar y transformar features— es **clave para el rendimiento** y ocurre entre la limpieza de datos y el entrenamiento.

- **Tipos de variables:** categórica **nominal** (sin orden: color) / **ordinal** (con orden: nivel educativo); numérica **discreta** (enteros) / **continua** (rango).

### Transformaciones
- **Discretización (binning):** convierte una variable continua en **categórica ordinal** por intervalos (ej. edad → menor/adulto/adulto mayor). Simplifica, maneja no linealidades, reduce ruido. Métodos: ancho igual, frecuencia igual (quantiles), criterio experto, data-driven. El inverso es la **continuización**.
- **Encoding** (categóricas → números):
  - **Label Encoding:** un entero por categoría (Rojo=0, Verde=1, Azul=2). ⚠️ **Impone un orden artificial** que el modelo puede leer como 2>1>0.
  - **One-Hot Encoding:** una **columna binaria por categoría** (solo una vale 1 por fila). No impone orden, pero **aumenta la dimensionalidad**. Necesario cuando se calculan distancias (KNN, clustering).
  - **Dummy trap (multicolinealidad):** las columnas one-hot **suman 1** → son dependientes. Se evita eliminando una columna: para K categorías alcanzan **K−1** (`drop_first=True`).
- **Escalado** (lleva las features a un rango similar). ⚠️ **Esencial para SVM, K-Means y PCA** (sensibles a la magnitud):
  - **MinMaxScaler** (normalización): a **[0,1]**, preserva la forma. **No** reduce outliers.
  - **StandardScaler** (z-score) $=\frac{x-\mu}{\sigma}$: **media 0, desvío 1**. No distorsiona distancias relativas.
  - **RobustScaler**: usa mediana + rango intercuartílico (IQR) → **diluye los outliers**.

### Validación
- **Train-test split:** separa entrenamiento y prueba. Sin esto, el modelo memoriza (overfitting) y no sabés si generaliza. En sklearn: 80/20 por defecto.
- **K-fold cross validation:** divide en **K folds**, entrena K veces usando cada fold como test una vez y **promedia** → más robusto que un único split (clave con datasets chicos). K típico **5 o 10**. **Stratified K-fold** mantiene la proporción de clases en cada fold (para desbalanceo).

### Bias-Variance (generalización)
El objetivo es que el modelo **generalice** (prediga bien datos nuevos). El error se descompone:
$$\text{Error Total}=\text{Bias}^2+\text{Varianza}+\text{Error Irreducible}$$
- **Bias (sesgo):** error por suposiciones **demasiado simples** → modelos lineales, Naïve Bayes (alto bias, baja varianza).
- **Varianza:** sensibilidad a las fluctuaciones del train → árboles, KNN (bajo bias, alta varianza).
- **Error irreducible:** ruido inevitable, ningún algoritmo lo elimina.
- **Underfitting** (modelo simple → error alto en train y test) ↔ **Overfitting** (modelo complejo → bajo en train, alto en test porque memoriza el ruido). El objetivo es el **equilibrio** que minimiza el error total.

---

## 8 · Introducción a la IA

**IA** (McCarthy) = *"la parte computacional de la capacidad de alcanzar objetivos en el mundo real"*. Es el campo que crea máquinas que hacen funciones que antes requerían inteligencia humana. Componentes: **percepción, razonamiento, aprendizaje, acción**.

### Cuatro campos (pensar/actuar × humano/racional)

| | Como humanos | Racionalmente |
|---|---|---|
| **Pensar** | Modelan procesos cognitivos (Blue Brain Project) | Lógica formal correcta (sistemas expertos) |
| **Actuar** | Indistinguible de un humano (**Prueba de Turing**) | **Agente racional** (el enfoque más usado hoy) |

- **Prueba de Turing** (Alan Turing, 1950): definición operacional de inteligencia. La máquina "pasa" si un evaluador **no distingue** sus respuestas de las de un humano. Requiere **NLP, KR** (representación de conocimiento), **razonamiento automático** y **ML**. La **prueba global** suma capacidades físicas: **visión computacional** y **robótica**.
- **Pensar humanamente** (cómo piensa la gente): **introspección**, **experimentos psicológicos**, **simulación cerebral**.
- **Pensar racionalmente:** **silogismos** de Aristóteles ("Sócrates es hombre; todos los hombres son mortales → Sócrates es mortal") → lógica formal (booleana, primer orden, temporal, difusa) → **sistemas expertos** con motores de inferencia "SI… ENTONCES…" (ej. **MYCIN**, diagnóstico médico).

### Agentes inteligentes (el enfoque dominante)
Un **agente** percibe su entorno y actúa para **maximizar su desempeño esperado**. Un **agente racional** elige las acciones que llevan al mejor resultado. Tipos, de menor a mayor complejidad:
- **Reactivo simple** (termostato): reacciona, **sin memoria**.
- **Con estado** (aspiradora robot): mantiene un **modelo interno** del mundo.
- **Basado en objetivos** (programa de ajedrez): busca secuencias de acciones óptimas.
- **Basado en utilidad** (asistente virtual): **maximiza la satisfacción** considerando varios factores.
- **Que aprende** (sistema de recomendación): mejora con feedback → ciclo **observar → aprender → adaptar**.

---

## 9 · Prácticas integradoras

### Segmentación de clientes mayoristas (clustering)
Distribuidor con el gasto anual de **440 clientes**; busca perfiles de consumo ocultos más allá de `Channel` (Horeca/Minorista) y `Region`.
- **Pipeline:** tomar las **6 variables de gasto** (`Fresh`, `Milk`, `Grocery`, `Frozen`, `Detergents_Paper`, `Delicassen`) → **escalar** (clave: K-Means usa distancia euclídea y las magnitudes son dispares) → elegir **K** por codo/silueta → **K-Means** → perfilar los promedios de cada cluster → cruzar con `Channel`/`Region` (tablas de contingencia) → **nombrar comercialmente** cada cluster.

### Breast Cancer Wisconsin (ML completo)
Dataset con **30 features** de núcleos celulares; target **maligno (0) / benigno (1)**. Recorre todo el flujo:
- **AED:** `.head/.shape/.describe/.isnull`, distribución del target (¿balanceado?), boxplots por clase, **matriz de correlación** (buscar `|r|>0.9`).
- **Random Forest** (supervisado): split `test_size=0.2, random_state=42` → evaluar con **accuracy, classification_report** (precision/recall/F1) y **matriz de confusión** → discutir si es más grave un **FP o un FN** en contexto clínico → **importancia de features**.
- **K-Means** (no supervisado, sin usar etiquetas): **escalar** → `KMeans(k=2)` → comparar con etiquetas reales (`crosstab`, **ARI**: 0 aleatorio, 1 perfecto) → **PCA** a 2 componentes para visualizar.
- **Moraleja:** contrastar supervisado vs no supervisado sobre los mismos datos.

---

> [!tip] Repaso flash (lo mínimo que NO podés olvidar)
> - **Árbol** supervisado; entropía/Gini miden impureza (Gini = default sklearn); rehacé "¿Jugar tenis?" (Cielo = 0.247). ID3 → C4.5 (poda, numéricos) → CART (binario, Gini/MSE).
> - **Random Forest** = **bagging** (datos) + **feature randomness** (variables); vota/promedia; no poda.
> - **Matriz de confusión**: Precision = $\frac{TP}{TP+FP}$ (calidad), Recall = $\frac{TP}{TP+FN}$ (cobertura), F1 = media armónica. Enfermedad→Recall, spam→Precision. AUC 1/0.5/0.
> - **Logística** = clasificación con sigmoide (z=0→0.5). **R²** = varianza explicada.
> - **K-Means**: 5 pasos + codo (inercia). **PCA**: estandarizar primero → componentes que maximizan varianza.
> - **Bias-Variance**: Error = Bias² + Varianza + Irreducible. Simple→bias, flexible→varianza.
> - **OKR** 60-70% óptimo vs **KPI** busca 100%. **IA**: cuadrante pensar/actuar × humano/racional + 5 tipos de agentes.
