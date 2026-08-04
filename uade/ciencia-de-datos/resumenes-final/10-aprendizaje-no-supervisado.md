---
materia: Ciencia de Datos
clase: 10
bloque: Aprendizaje no supervisado
parcial: 2
tags:
  - resumen-final
  - ciencia-de-datos
  - clustering
  - kmeans
  - codo
  - silueta
fuente: content/2-parcial/material/10-aprendizaje-no-supervisado.pdf
---

# Clase 10 — Aprendizaje No Supervisado

## 1. ¿Qué es el aprendizaje no supervisado?

> [!quote] Definición de la clase
> "Rama del machine learning que trabaja con **datos sin etiquetas**, descubriendo patrones y estructuras ocultas por sí mismo."

**Concepto clave:** a diferencia del aprendizaje supervisado, acá **no hay variable objetivo ni respuestas correctas conocidas**. El algoritmo recibe solo los datos de entrada (X) y su tarea es explorar la estructura inherente de esos datos.

**Características clave (según la clase):**
1. **Sin etiquetas** — no hay variable objetivo ni respuestas correctas conocidas.
2. **Descubrimiento** — explora la estructura inherente de los datos.
3. **Patrones ocultos** — encuentra relaciones no evidentes a simple vista.

El flujo conceptual es: **Datos (X) → Algoritmo no supervisado → Patrones descubiertos.**

---

## 2. Supervisado vs No supervisado

**Concepto clave:** la diferencia central está en **si los datos tienen etiquetas** (respuestas conocidas) y en el **objetivo** del modelo.

| | **Supervisado** | **No supervisado** |
|---|---|---|
| **Datos** | Con etiquetas y respuestas conocidas | Solo datos X, sin etiquetas ni respuestas |
| **Objetivo** | Predecir la etiqueta *y* para nuevos datos X | Descubrir patrones, estructuras y relaciones ocultas |
| **Ejemplos** | Regresión lineal, regresión logística, árboles de decisión, SVM, redes neuronales | K-Means, PCA, reglas de asociación |
| **Analogía** | Aprender **con un profesor** | Aprender por **descubrimiento propio** |

> [!tip] Regla mental
> Si hay una **columna objetivo** que querés predecir → supervisado. Si solo querés **agrupar / resumir / encontrar relaciones** sin objetivo definido → no supervisado.

---

## 3. Tipos de aprendizaje no supervisado

**Concepto clave:** la clase agrupa las técnicas en **tres familias**, cada una respondiendo a una pregunta distinta.

| Familia | Pregunta que responde | Qué hace | Ejemplos |
|---|---|---|---|
| **Clustering** (agrupación) | ¿Qué grupos existen? | Divide los datos en grupos naturales por similitud entre observaciones | K-Means, DBSCAN, clustering jerárquico |
| **Reducción de dimensionalidad** (compresión) | ¿Qué variables son clave? | Reduce el número de variables manteniendo la información relevante | PCA, t-SNE, UMAP, autoencoders |
| **Reglas de asociación** (patrones frecuentes) | ¿Qué elementos van juntos? | Descubre relaciones frecuentes y co-ocurrencias entre variables | Apriori, FP-Growth, Eclat |

---

## 4. Proceso general del análisis no supervisado

**Concepto clave:** aunque no haya etiquetas, el trabajo sigue un **pipeline ordenado** de 6 pasos.

| # | Paso | Qué hace |
|---|---|---|
| 1 | **Recolección** | Obtener datos relevantes de fuentes confiables |
| 2 | **Preparación** | Limpieza, normalización y manejo de valores faltantes |
| 3 | **Exploración inicial** | Visualización y estadísticas descriptivas iniciales |
| 4 | **Selección** | Elegir el algoritmo apropiado según el problema |
| 5 | **Entrenamiento** | Ejecutar el algoritmo y ajustar parámetros |
| 6 | **Evaluación** | Interpretar resultados y tomar decisiones |

> [!note] Aplicaciones típicas
> La clase menciona: segmentación de clientes (marketing/CRM), compresión de imágenes y reducción de ruido, sistemas de recomendación, detección de anomalías y fraude, análisis de redes sociales, bioinformática, organización de documentos y preprocesamiento de datos para otros modelos.

---

## 5. Clustering: fundamentos

> [!quote] Definición de la clase
> "Clustering es una técnica de **aprendizaje no supervisado** que agrupa un conjunto de datos en subconjuntos llamados **clusters** (grupos), donde los objetos en un mismo cluster son **más similares** entre sí que con los de otros clusters."

**Concepto clave:** el objetivo es **agrupar datos con características similares** para facilitar la identificación de patrones dentro de esos grupos. No sabemos de antemano cuáles son los grupos: emergen de los datos.

**Tres conceptos fundamentales:**
- **Similitud** — medida de cercanía entre puntos de datos.
- **Cluster** — grupo de puntos similares entre sí.
- **Distancia** — métrica para cuantificar la similitud.

> [!example] Analogía de la clase
> Es como **organizar libros en estantes por temática sin conocer los títulos de antemano**: los agrupás por lo que se parecen, sin una respuesta previa.

---

## 6. Conceptos fundamentales del clustering

**Concepto clave:** para agrupar "lo parecido" necesitamos una forma **matemática** de definir qué significa que dos objetos sean cercanos. Eso lo dan las **medidas de distancia** y el **centroide**.

### Medidas de distancia

| Medida | Fórmula | Idea | Cuándo usarla |
|---|---|---|---|
| **Euclidiana** | $\sqrt{\sum_{i=1}^{n}(A_i - B_i)^2}$ | Distancia en "línea recta" entre dos puntos. Es la **métrica por defecto** (la que usa K-Means de forma nativa) | Caso general, datos de baja dimensión |
| **Manhattan** | $\sum_{i=1}^{n}\lvert A_i - B_i \rvert$ | Suma de diferencias absolutas: recorre ejes perpendiculares, como caminar por calles de una ciudad cuadriculada | Alta dimensionalidad o presencia de *outliers* (no penaliza tan severamente los valores extremos) |

### Centroide

> [!info] Definición
> Un **centroide** es el centro geométrico o matemático de un grupo de puntos (cluster). Es el **punto de referencia que mejor representa** a todos los miembros de ese grupo.

### Criterios de calidad de un clustering

- **Cohesión intra-cluster:** los puntos **dentro** de un cluster deben estar cercanos entre sí.
- **Separación inter-cluster:** los clusters **diferentes** deben estar bien separados.

> [!tip] Concepto para el parcial
> Un buen clustering maximiza la **cohesión interna** (grupos compactos) y la **separación externa** (grupos bien diferenciados). Estas dos ideas son la base tanto de la inercia (codo) como del coeficiente de silueta.

---

## 7. K-Means

> [!quote] Definición de la clase
> "Algoritmo que divide datos en **K grupos**, donde cada grupo se representa por su **centroide** (media de los puntos)."

**Concepto clave:** el nombre viene de que cada cluster se resume con la **media** (*mean*) de sus puntos. Hay que **definir K de antemano** (cuántos grupos querés formar).

> [!example] Intuición de la clase
> Es como colocar **K centros** en el espacio para minimizar la distancia de cada punto a su centro más cercano.

### Algoritmo paso a paso

| # | Paso | Qué ocurre |
|---|---|---|
| 1 | **Definir K e inicializar centroides** | Se elige cuántos grupos (K) y se seleccionan **K puntos al azar** como centros provisionales |
| 2 | **Asignar cada dato al centroide más cercano** | Se calcula la distancia (generalmente euclídea) de cada punto a los K centroides; cada punto se une al grupo del centroide más cercano |
| 3 | **Recalcular los centroides** (mover el centro) | Se calcula el **promedio** de las posiciones de los puntos de cada grupo; esa media es el nuevo centroide, que "se mueve" hacia el centro real de sus miembros |
| 4 | **Iterar** (repetir pasos 2 y 3) | Como los centros se movieron, algunos puntos quedan más cerca de otro centroide → se **reasigna** y se **recalcula**. Cada iteración estabiliza más los grupos |
| 5 | **Criterio de parada** (convergencia) | El ciclo termina cuando se cumple una condición de convergencia |

> [!important] Convergencia — cuándo se detiene K-Means
> El algoritmo **ha convergido** cuando:
> - Los centroides **ya no cambian de posición** (grupos estables), **o**
> - **Ningún punto cambia de grupo** en la última iteración, **o**
> - Se alcanza un **número máximo de iteraciones** definido de antemano.

### Ventajas y limitaciones

| ✅ Ventajas | ❌ Limitaciones |
|---|---|
| **Simple** de implementar y entender | Requiere **especificar K** de antemano |
| **Escalable** a grandes datasets | **Sensible a la inicialización** de los centroides |
| Resultados **fáciles de interpretar** | Asume clusters **esféricos / convexos** |
| **Converge siempre** (aunque puede ser a un óptimo local) | **Sensible a outliers** |
| | No funciona bien con **densidades diferentes** |

> [!warning] Óptimo local
> Que K-Means "converja siempre" no garantiza el **mejor** resultado: puede quedar atrapado en un **óptimo local** según los centroides iniciales aleatorios. Por eso en la práctica se corre varias veces con distintas inicializaciones.

---

## 8. ¿Cómo elegir K? — Método del codo (elbow)

**Concepto clave:** el **método del codo** es una técnica **heurística** que ejecuta K-Means para varios valores de K, calcula la **inercia** de cada uno y busca el **punto de inflexión** ("codo") donde la mejora marginal deja de valer la pena.

> [!info] ¿Qué es la inercia (SSE)?
> La **inercia** mide qué tan **compactos o concentrados** están los grupos encontrados: es el "nivel de desorden" o la separación interna de los puntos dentro de sus propios clusters. También se conoce como **SSE** (suma de errores al cuadrado respecto al centroide). **Menor inercia = grupos más compactos.**

**Pasos del método:**
1. Ejecutar K-Means para K = 1, 2, 3, ..., N.
2. Calcular la inercia para cada valor de K.
3. Graficar **inercia vs. K**.
4. Identificar el **"codo"**: el punto donde la curva deja de bajar bruscamente y se "aplana".

**Por qué funciona:** al aumentar K la inercia siempre baja (más grupos → puntos más cerca de su centroide). Pero llega un punto donde agregar clusters casi no mejora la compactación: ese quiebre es el codo, el K "justo".

> [!example] Lectura del gráfico de la clase
> La curva cae fuerte de K=1 (inercia ≈ 1200) a K=2 (≈ 480) y a K=3 (≈ 220); a partir de ahí baja muy poco. El **codo está alrededor de K=3**: ese sería el número razonable de clusters.

> [!note] Limitación
> Es un método **heurístico**: a veces el codo **no es claro**. Se recomienda **complementarlo con el coeficiente de silueta**.

---

## 9. Coeficiente de silueta

**Concepto clave:** el **coeficiente de silueta** es una métrica que evalúa la **calidad** del clustering combinando las dos ideas clave (cohesión y separación): mide **qué tan bien ubicado está cada punto en su cluster** comparado con el cluster vecino más cercano. La clase lo propone como **complemento del método del codo** cuando el codo no es claro.

**Cómo se interpreta:** para cada punto se comparan dos cosas:
- **a** = distancia media del punto a los demás puntos de **su propio cluster** (cohesión).
- **b** = distancia media del punto al **cluster vecino más cercano** (separación).

El coeficiente de silueta de un punto se resume así:

| Valor | Significado |
|---|---|
| **Cercano a +1** | El punto está **bien asignado**: cerca de su grupo y lejos de los demás (b ≫ a) |
| **Cercano a 0** | El punto está **en el límite** entre dos clusters (a ≈ b), asignación ambigua |
| **Negativo** | El punto probablemente está **mal asignado**: estaría mejor en el cluster vecino (a > b) |

> [!tip] Uso práctico para elegir K
> Se calcula el **coeficiente de silueta promedio** de todos los puntos para distintos valores de K, y se elige el K con **silueta promedio más alta**. A diferencia del codo (que da un quiebre visual), la silueta da un **número comparable** entre configuraciones, por eso se usan juntos.

> [!important] Codo vs. silueta — para el parcial
> - **Codo (inercia/SSE):** mide **solo cohesión** interna; busca el quiebre visual. Heurístico, a veces ambiguo.
> - **Silueta:** mide **cohesión + separación**; da un valor de -1 a +1 por punto y un promedio para comparar K. Más robusto para desempatar.

---

## 10. Comparación de métodos de clustering

**Concepto clave:** K-Means no es el único método. La elección depende de la **forma** de los clusters, si conocemos K, y cómo se comportan **outliers** y **densidades**.

| Característica | **K-Means** | **Jerárquico** | **DBSCAN** |
|---|---|---|---|
| Forma de clusters | Esféricos | Cualquiera | Cualquiera |
| ¿Necesita K? | **Sí** | No | No |
| Outliers | Sensible | Sensible | **Los detecta** (los marca como ruido) |
| Densidad | Asume uniforme | Variable | **Maneja bien** densidades variables |

**Criterios de selección (según la clase):**
- **Dataset grande** → K-Means o DBSCAN.
- **Formas irregulares** → DBSCAN.
- **Jerarquía visual** (dendrograma) → clustering jerárquico.

> [!note] Comparación visual (scikit-learn)
> La clase muestra la galería de scikit-learn: sobre datos con forma de **círculos concéntricos** o **medias lunas**, K-Means falla (asume esferas) mientras que DBSCAN o el clustering espectral separan bien las formas no convexas.

---

## 11. PCA — Análisis de Componentes Principales

> [!quote] Definición de la clase
> "PCA transforma variables **correlacionadas** en un nuevo conjunto de variables **no correlacionadas** llamadas **componentes principales**."

**Concepto clave:** PCA es una técnica de **reducción de dimensionalidad**. Su objetivo es **reducir el número de dimensiones manteniendo la máxima varianza** posible de los datos originales. Ejemplo de la clase: pasar de 100 dimensiones a 2-3 componentes conservando ~95% de la varianza.

### La maldición de la dimensionalidad

> [!info] Definición
> La **alta dimensionalidad** (o *maldición de la dimensionalidad*) es cuando un dataset tiene un **número excesivamente grande de variables** (columnas) comparado con el número de observaciones (filas). En espacios de alta dimensión los datos se vuelven **muy dispersos** y los modelos **pierden efectividad**.

PCA proyecta ese espacio complejo a un **subespacio de muchas menos dimensiones** (PC1, PC2, PC3...) reteniendo la mayor variabilidad posible. Beneficios: **compresión/interpretabilidad** (graficar en 2-3D), **eliminación de redundancia** (los componentes no tienen correlación lineal entre sí) y **eficiencia computacional** (modelos posteriores más rápidos y con menor riesgo de overfitting).

### Conceptos clave: varianza y correlación

- **Varianza:** medida de **dispersión** de los datos. **Mayor varianza = mayor información** contenida. PCA busca las direcciones de máxima varianza.
- **Correlación:** medida de **relación lineal** entre variables (rango -1 a +1). Variables muy correlacionadas contienen **información redundante**.
- **Matriz de covarianza:** describe cómo varían las variables conjuntamente. PCA **diagonaliza esta matriz** para eliminar la correlación entre variables.

### Algoritmo paso a paso

| # | Paso | Qué hace |
|---|---|---|
| 1 | **Estandarizar (normalizar)** | PCA es muy sensible a las escalas. Se resta la media y se divide por el desvío estándar → todas las variables quedan con media 0 y varianza 1 (mismo peso inicial) |
| 2 | **Calcular la matriz de covarianza** | Tabla cuadrada que mide la relación entre cada par de variables (covarianza positiva = crecen juntas; cercana a cero = sin relación lineal) |
| 3 | **Calcular autovalores y autovectores** | Núcleo matemático (descomposición de la matriz o SVD). **Autovectores** = direcciones de los nuevos ejes (componentes); **autovalores** = magnitud/importancia (varianza) de cada dirección |
| 4 | **Ordenar y seleccionar componentes** | Se ordenan los autovectores de mayor a menor autovalor. PC1 = dirección de máxima varianza; PC2 = segunda dirección, **ortogonal (perpendicular)** a PC1 (evita información repetida). Se conservan los primeros que acumulan, p. ej., 85-90% de la varianza |
| 5 | **Proyectar los datos** | Con los K autovectores elegidos se arma una **matriz de proyección** y se multiplican los datos estandarizados por ella → dataset nuevo, comprimido y sin correlación interna |

> [!tip] Resumen de PCA
> PCA busca las **direcciones de máxima varianza** (autovectores/eigenvectors) y proyecta los datos sobre ellas. Los **autovalores** (eigenvalues) indican cuánta varianza captura cada componente; se eligen los de **mayor autovalor**.

### Interpretación de resultados

- **Varianza explicada:** proporción de información retenida por cada componente.
- **Loadings:** contribución de cada variable original a cada componente.
- **Biplot:** visualización simultánea de muestras y variables.
- Cada componente es una **combinación lineal** de las variables originales, como una "receta". Ejemplo: `PC1 = 0.7·Ingreso + 0.6·Educación − 0.3·Edad + 0.2·Experiencia`.

### ¿Cuántos componentes conservar?

| Criterio | Regla |
|---|---|
| **Varianza acumulada** | Conservar componentes hasta alcanzar **80-95%** de varianza explicada |
| **Criterio de Kaiser** | Conservar solo componentes con **autovalor > 1** |
| **Regla del codo** | Usar el *scree plot* para identificar el punto de inflexión |
| **Objetivo práctico** | Para visualización: **2 o 3** componentes |

> [!important] Trade-off fundamental
> **Más componentes** → más información retenida, mayor precisión. **Menos componentes** → mayor simplicidad y mejor interpretabilidad.

**Ventajas:** reduce dimensionalidad preservando información, elimina correlación, reduce ruido, acelera otros algoritmos, facilita visualización.
**Limitaciones:** **pierde información** en la reducción, los componentes pueden ser **difíciles de interpretar**, y **asume relaciones lineales** únicamente.

---

## 12. Reglas de asociación

> [!quote] Definición de la clase
> "Técnica que **descubre relaciones interesantes** entre variables en grandes bases de datos **transaccionales**."

**Concepto clave:** buscan patrones del tipo "si pasa A, tiende a pasar B". Su aplicación clásica es el **Market Basket Analysis** (análisis de canasta de compra).

- **Formato de una regla:** `{Antecedente} ⇒ {Consecuente}`.
- **Ejemplo clásico:** `{Pan, Manteca} ⇒ {Leche}` → "si un cliente compra pan y manteca, también compra leche".

### Métricas clave: soporte, confianza y lift

| Métrica | Qué mide | Fórmula | Pregunta que responde |
|---|---|---|---|
| **Soporte** (support) | Frecuencia relativa con que aparece un ítem/combinación | Soporte(A→B) = (transacciones con A y B) / (total de transacciones) | ¿Qué tan común es este evento? |
| **Confianza** (confidence) | Certeza de la regla | Confianza(A→B) = (transacciones con A y B) / (transacciones con A) | De los que compraron A, ¿qué % también llevó B? |
| **Lift** | Cuánto cambia la probabilidad de B sabiendo que se compró A, vs. comprar B al azar | Lift(A→B) = Confianza(A→B) / Soporte(B) | ¿La asociación es real o efecto de un producto masivo? |

> [!example] Ejemplos numéricos de la clase
> - **Soporte** `{Pañales}→{Cerveza}`: si en 20 de 100 tickets se compraron juntos → 20/100 = **0.20 (20%)**.
> - **Confianza** `{Pañales}→{Cerveza}`: si 25 personas compraron pañales y de esas 20 llevaron cerveza → 20/25 = **0.80 (80%)**.

> [!important] Por qué existe el Lift
> El Lift **corrige el sesgo** de productos muy populares. Ejemplo: la leche es masiva; casi todos la compran, así que `{Pañales}→{Leche}` puede dar 90% de confianza aunque los pañales **no influyan en nada**. El Lift compara la confianza contra la probabilidad base de comprar el consecuente.

| Valor de Lift | Significado | Interpretación |
|---|---|---|
| **Lift = 1** | Independencia | X e Y no están relacionados |
| **Lift > 1** | Asociación positiva | X aumenta la probabilidad de Y (lift de 2 = Y es 2× más probable cuando ocurre X) |
| **Lift < 1** | Asociación negativa | X disminuye la probabilidad de Y |

### Algoritmo Apriori (paso a paso)

| # | Paso | Qué hace |
|---|---|---|
| 1 | **Configurar umbrales mínimos** | Definir **soporte mínimo** (frecuencia para considerar un ítem "interesante") y **confianza mínima** (certeza exigida a las reglas finales) |
| 2 | **Generar y filtrar 1-itemsets** | Contar cuántas veces se compró cada producto por separado; los que **no alcanzan** el soporte mínimo se eliminan |
| 3 | **Combinar sobrevivientes (2-itemsets)** | Formar **pares** con los productos que pasaron el filtro, contar co-ocurrencias y descartar los que no llegan al soporte |
| 4 | **Iterar a combinaciones mayores** | Formar grupos de 3, 4, ... ítems ("combinar y podar") hasta que ninguna combinación supere el soporte o se agoten. Quedan los **itemsets frecuentes** |
| 5 | **Generar reglas de asociación** | De cada itemset frecuente se extraen reglas candidatas y se calcula su **confianza** |
| 6 | **Filtrar por confianza y calcular Lift** | Se descartan reglas bajo el umbral de confianza y se calcula el **Lift** para confirmar que la asociación es real |

> [!example] Ejemplo didáctico de la clase (canasta de compra, min. soporte = 40%)
> Con 5 transacciones, para la regla `{Pan, Leche} ⇒ {Mantequilla}`:
> - **Soporte** = 2/5 = **40%**
> - **Confianza** = 2/3 = **67%**
> - **Lift** = 0.67 / 0.60 = **1.11** → Lift > 1: asociación positiva.
> Conclusión: "los clientes que compran pan y leche tienen un **11% más** de probabilidad de comprar mantequilla".

> [!note] Aplicaciones
> Retail/supermercados (disposición de productos, promociones cruzadas), e-commerce ("quien compró X también compró Y"), medicina (co-ocurrencia de síntomas), web mining, telecomunicaciones (paquetes de servicios) y banca (cross-selling).

---

## Mapa de conceptos de la clase

- **Aprendizaje no supervisado** = ML con datos **sin etiquetas**; descubre patrones ocultos. Flujo: X → algoritmo → patrones.
- **Supervisado vs no supervisado** = con/sin etiqueta; predecir *y* vs. descubrir estructura.
- **Tres familias:** clustering (¿qué grupos?), reducción de dimensionalidad (¿qué variables?), reglas de asociación (¿qué va junto?).
- **Clustering** = agrupar por similitud; conceptos: similitud, cluster, distancia, **centroide**. Calidad = **cohesión intra** + **separación inter**. Distancias: **euclidiana** (default) y **Manhattan** (alta dimensión/outliers).
- **K-Means** = K grupos representados por su media/centroide. Pasos: inicializar → asignar → recalcular → iterar → converger. Requiere K; sensible a inicialización y outliers; converge (posible óptimo local).
- **Método del codo** = graficar **inercia (SSE)** vs. K y buscar el quiebre. Mide solo cohesión; heurístico.
- **Coeficiente de silueta** = -1 a +1; combina **cohesión + separación**; complementa al codo para elegir K (silueta promedio más alta).
- **Comparación:** K-Means (esféricos, necesita K), jerárquico (cualquier forma, dendrograma), **DBSCAN** (formas irregulares, detecta outliers, densidades variables).
- **PCA** = reducción de dimensionalidad conservando **máxima varianza**. Pasos: estandarizar → covarianza → autovalores/autovectores → seleccionar PCs (ortogonales) → proyectar. Criterios de K: varianza acumulada 80-95%, Kaiser (autovalor > 1), codo. Asume linealidad.
- **Reglas de asociación** = `{A}⇒{B}` en datos transaccionales. Métricas: **soporte** (frecuencia), **confianza** (certeza), **lift** (corrige sesgo de productos masivos; >1 positiva, =1 independencia, <1 negativa). Algoritmo **Apriori** = combinar y podar itemsets frecuentes.
