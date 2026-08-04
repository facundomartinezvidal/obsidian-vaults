---
materia: Ciencia de Datos
tema: 12
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

# Tema 12 — Aprendizaje No Supervisado

## Naturaleza del aprendizaje no supervisado

El aprendizaje no supervisado es la rama del machine learning que trabaja con datos sin etiquetas y descubre por sí mismo los patrones y estructuras ocultas que contienen. Su rasgo distintivo, frente al aprendizaje supervisado, es la ausencia de una variable objetivo y de respuestas correctas conocidas: el algoritmo recibe únicamente los datos de entrada (X) y su tarea consiste en explorar la estructura inherente de esos datos para hallar relaciones que no resultan evidentes a simple vista. El flujo conceptual, por tanto, va de los datos (X) al algoritmo no supervisado y de allí a los patrones descubiertos, sin ninguna referencia externa que valide el resultado durante el entrenamiento.

Esta diferencia se traduce en un objetivo distinto según el enfoque. El aprendizaje supervisado parte de datos con etiquetas y respuestas conocidas y busca predecir la etiqueta *y* para nuevos datos X —abarcando técnicas como la regresión lineal, la regresión logística, los árboles de decisión, las SVM y las redes neuronales—, en una dinámica que equivale a aprender con un profesor. El no supervisado, en cambio, dispone solo de X y persigue descubrir patrones, estructuras y relaciones ocultas —con métodos como K-Means, PCA o las reglas de asociación—, en un aprendizaje por descubrimiento propio. La regla mental para distinguirlos es directa: si existe una columna objetivo que se quiere predecir, el problema es supervisado; si solo se busca agrupar, resumir o encontrar relaciones sin un objetivo definido, es no supervisado.

Las técnicas no supervisadas se organizan en tres grandes familias, cada una respondiendo a una pregunta diferente:

- **Clustering** o agrupación (K-Means, DBSCAN, clustering jerárquico): responde a "¿qué grupos existen?", dividiendo los datos en grupos naturales según la similitud entre observaciones.
- **Reducción de dimensionalidad** o compresión (PCA, t-SNE, UMAP, autoencoders): responde a "¿qué variables son clave?", reduciendo el número de variables sin perder la información relevante.
- **Reglas de asociación** o patrones frecuentes (Apriori, FP-Growth, Eclat): responden a "¿qué elementos van juntos?", descubriendo co-ocurrencias frecuentes entre variables.

Estas tres familias vertebran el resto del tema: clustering, PCA y reglas de asociación son las tres caras del análisis no supervisado que se desarrollan a continuación.

Aunque no haya etiquetas, el trabajo sigue un pipeline ordenado de seis pasos:

1. **Recolección**: reunir datos relevantes de fuentes confiables.
2. **Preparación**: limpieza, normalización y manejo de valores faltantes.
3. **Exploración inicial**: visualización y estadística descriptiva.
4. **Selección del algoritmo**: elegir el método apropiado según el problema.
5. **Entrenamiento**: ejecutar el algoritmo y ajustar sus parámetros.
6. **Evaluación**: interpretar los resultados para tomar decisiones.

Sus aplicaciones típicas abarcan la segmentación de clientes en marketing y CRM, la compresión de imágenes y reducción de ruido, los sistemas de recomendación, la detección de anomalías y fraude, el análisis de redes sociales, la bioinformática, la organización de documentos y el preprocesamiento de datos para otros modelos.

## Clustering: fundamentos y medidas

El clustering es la técnica no supervisada que agrupa un conjunto de datos en subconjuntos llamados clusters, de modo que los objetos de un mismo cluster son más similares entre sí que respecto a los de otros clusters. Su objetivo es reunir datos con características afines para facilitar la identificación de patrones dentro de cada grupo, sin conocer de antemano cuáles son esos grupos: emergen de los propios datos. Descansa sobre tres conceptos entrelazados —la similitud como medida de cercanía entre puntos, el cluster como grupo de puntos afines y la distancia como métrica que cuantifica esa similitud—, en una lógica análoga a organizar libros en estantes por temática sin conocer los títulos de antemano, agrupándolos por lo que se parecen y sin una respuesta previa.

Agrupar "lo parecido" exige una definición matemática de cercanía, que aportan las medidas de distancia. La **distancia euclidiana**, $\sqrt{\sum_{i=1}^{n}(A_i - B_i)^2}$, mide la distancia en línea recta entre dos puntos y es la métrica por defecto —la que emplea K-Means de forma nativa—, apropiada para el caso general y para datos de baja dimensión. La **distancia Manhattan**, $\sum_{i=1}^{n}\lvert A_i - B_i \rvert$, suma las diferencias absolutas recorriendo ejes perpendiculares, como caminar por las calles de una ciudad cuadriculada, y conviene en alta dimensionalidad o ante la presencia de *outliers*, porque no penaliza tan severamente los valores extremos. Cada grupo se resume además por su **centroide**, el centro geométrico o matemático del cluster, el punto de referencia que mejor representa a todos sus miembros.

La calidad de un clustering se juzga por dos criterios complementarios. La cohesión intra-cluster exige que los puntos dentro de un mismo grupo estén cercanos entre sí, mientras que la separación inter-cluster exige que grupos distintos queden bien separados. Un buen clustering maximiza a la vez la cohesión interna (grupos compactos) y la separación externa (grupos bien diferenciados). Estas dos ideas son la base de todo lo que sigue, porque tanto la inercia que sostiene el método del codo como el coeficiente de silueta se construyen sobre ellas.

## K-Means

K-Means divide los datos en K grupos, cada uno representado por su centroide, es decir, la media (*mean*) de sus puntos —de ahí su nombre—. Requiere definir K de antemano, esto es, cuántos grupos se quieren formar, y su intuición consiste en colocar K centros en el espacio para minimizar la distancia de cada punto a su centro más cercano. El procedimiento es iterativo:

1. **Definir K e inicializar los centroides**: se seleccionan K puntos al azar como centros provisionales.
2. **Asignar cada punto**: se calcula la distancia —generalmente euclídea— de cada dato a los K centroides y cada punto se une al grupo del más próximo.
3. **Recalcular los centroides**: se promedian las posiciones de los puntos de cada grupo, de modo que esa media se convierte en el nuevo centroide, que se desplaza hacia el centro real de sus miembros.
4. **Repetir**: como los centros se movieron, algunos puntos quedan más cerca de otro centroide, así que los pasos de asignación y recálculo se repiten, estabilizando cada vez más los grupos.
5. **Detenerse al converger**: el ciclo termina cuando los centroides ya no cambian de posición (grupos estables), cuando ningún punto cambia de grupo en la última iteración, o cuando se alcanza un número máximo de iteraciones fijado de antemano.

Sus ventajas explican su popularidad:

- **Simple**: fácil de implementar y de entender.
- **Escalable**: funciona bien con grandes datasets.
- **Interpretable**: produce resultados fáciles de leer.
- **Convergencia garantizada**: siempre llega a una solución estable.

Sus limitaciones, sin embargo, son igual de conocidas:

- **Requiere K**: obliga a especificar el número de grupos de antemano.
- **Sensible a la inicialización**: el resultado depende de los centroides iniciales.
- **Asume clusters esféricos** o convexos.
- **Sensible a outliers**.
- **No maneja densidades diferentes** entre grupos.

Conviene matizar que "converge siempre" no significa que alcance el mejor resultado: según los centroides iniciales aleatorios, el algoritmo puede quedar atrapado en un óptimo local, y por eso en la práctica se lo ejecuta varias veces con distintas inicializaciones para quedarse con la mejor solución.

## Elección de K: método del codo y coeficiente de silueta

El método del codo (*elbow*) es una técnica heurística para elegir K: ejecuta K-Means para varios valores de K, calcula la inercia de cada uno y busca el punto de inflexión —el "codo"— donde la mejora marginal deja de valer la pena. La inercia, también llamada SSE (suma de errores al cuadrado respecto al centroide), mide qué tan compactos o concentrados están los grupos, es decir, el nivel de desorden o la separación interna de los puntos dentro de sus propios clusters; menor inercia equivale a grupos más compactos, de modo que es la traducción cuantitativa de la cohesión intra-cluster. El procedimiento sigue cuatro pasos:

1. **Ejecutar K-Means** para K = 1, 2, 3, …, N.
2. **Calcular la inercia** de cada valor de K.
3. **Graficar** inercia contra K.
4. **Identificar el codo**: el punto donde la curva deja de bajar bruscamente y se aplana.

Funciona porque al aumentar K la inercia siempre desciende —más grupos acercan cada punto a su centroide—, pero llega un momento en que agregar clusters casi no mejora la compactación, y ese quiebre marca el K justo. En el gráfico de la clase, la curva cae fuerte de K=1 (inercia ≈ 1200) a K=2 (≈ 480) y a K=3 (≈ 220), y a partir de allí baja muy poco, de manera que el codo se ubica alrededor de K=3, el número razonable de clusters. Por ser heurístico, a veces el codo no resulta claro, y entonces conviene complementarlo con el coeficiente de silueta.

El coeficiente de silueta evalúa la calidad del clustering combinando las dos ideas fundamentales —cohesión y separación— al medir qué tan bien ubicado está cada punto en su cluster frente al cluster vecino más cercano. Para cada punto se comparan dos cantidades: **a**, la distancia media del punto a los demás puntos de su propio cluster (cohesión), y **b**, la distancia media del punto al cluster vecino más cercano (separación). Cuando el coeficiente se aproxima a +1, el punto está bien asignado, cerca de su grupo y lejos de los demás (b ≫ a); cuando ronda 0, el punto se sitúa en el límite entre dos clusters (a ≈ b), con una asignación ambigua; y cuando es negativo, el punto probablemente está mal asignado y encajaría mejor en el cluster vecino (a > b). En la práctica se calcula el coeficiente de silueta promedio de todos los puntos para distintos valores de K y se elige el K de silueta promedio más alta. La diferencia con el codo es sustantiva y explica por qué se usan juntos: el codo, basado en la inercia, mide solo la cohesión interna y ofrece un quiebre visual a veces ambiguo, mientras que la silueta mide cohesión y separación a la vez, entrega un valor de -1 a +1 por punto y un promedio comparable entre configuraciones, resultando más robusta para desempatar.

## Comparación de métodos de clustering

K-Means no es el único método disponible, y la elección depende de la forma de los clusters, de si se conoce K de antemano y de cómo se comportan los outliers y las densidades. El siguiente cuadro resume las diferencias entre los tres métodos principales:

| Característica | K-Means | Jerárquico | DBSCAN |
|---|---|---|---|
| Forma de clusters | Esféricos | Cualquiera | Cualquiera |
| ¿Necesita K? | Sí | No | No |
| Outliers | Sensible | Sensible | Los detecta (los marca como ruido) |
| Densidad | Asume uniforme | Variable | Maneja bien densidades variables |

Como criterios de selección, un dataset grande orienta hacia K-Means o DBSCAN, las formas irregulares favorecen a DBSCAN y la necesidad de una jerarquía visual mediante dendrograma inclina la balanza hacia el clustering jerárquico. La galería de scikit-learn ilustra estas diferencias: sobre datos con forma de círculos concéntricos o medias lunas, K-Means falla porque asume esferas, mientras que DBSCAN o el clustering espectral separan bien las formas no convexas.

## PCA — Análisis de Componentes Principales

El Análisis de Componentes Principales transforma variables correlacionadas en un nuevo conjunto de variables no correlacionadas llamadas componentes principales. Es la técnica insignia de la reducción de dimensionalidad, y su objetivo es disminuir el número de dimensiones conservando la máxima varianza posible de los datos originales; el ejemplo de la clase es pasar de 100 dimensiones a 2 o 3 componentes reteniendo cerca del 95% de la varianza. Responde así a la maldición de la dimensionalidad, es decir, la situación en que un dataset tiene un número excesivamente grande de variables (columnas) frente al número de observaciones (filas): en espacios de alta dimensión los datos se vuelven muy dispersos y los modelos pierden efectividad. PCA proyecta ese espacio complejo sobre un subespacio de muchas menos dimensiones (PC1, PC2, PC3…) reteniendo la mayor variabilidad posible, lo que aporta compresión e interpretabilidad —permite graficar en dos o tres dimensiones—, elimina la redundancia —los componentes no tienen correlación lineal entre sí— y mejora la eficiencia computacional, con modelos posteriores más rápidos y menos expuestos al overfitting.

Tres conceptos sostienen el método. La varianza es la medida de dispersión de los datos, y como mayor varianza significa mayor información contenida, PCA busca precisamente las direcciones de máxima varianza. La correlación mide la relación lineal entre variables en un rango de -1 a +1, de modo que variables muy correlacionadas contienen información redundante. Y la matriz de covarianza describe cómo varían las variables conjuntamente; PCA diagonaliza esta matriz para eliminar la correlación entre variables. Sobre esa base, el algoritmo procede en cinco pasos:

1. **Estandarizar los datos**: restar la media y dividir por el desvío estándar para que todas las variables queden con media 0 y varianza 1 e igual peso inicial, dado que PCA es muy sensible a las escalas.
2. **Calcular la matriz de covarianza**: la tabla cuadrada que mide la relación entre cada par de variables, donde una covarianza positiva indica que crecen juntas y una cercana a cero, ausencia de relación lineal.
3. **Calcular autovalores y autovectores** mediante descomposición matricial o SVD: los autovectores son las direcciones de los nuevos ejes o componentes, y los autovalores expresan la magnitud o importancia —la varianza— de cada dirección.
4. **Ordenar y seleccionar componentes**: se ordenan los autovectores de mayor a menor autovalor, de modo que PC1 es la dirección de máxima varianza y PC2 la segunda, ortogonal (perpendicular) a PC1 para evitar información repetida, conservando los primeros que acumulan, por ejemplo, entre el 85% y el 90% de la varianza.
5. **Proyectar los datos**: con los K autovectores elegidos se arma una matriz de proyección y se multiplican por ella los datos estandarizados, obteniendo un dataset nuevo, comprimido y sin correlación interna.

La interpretación de los resultados se apoya en varias herramientas: la varianza explicada indica la proporción de información retenida por cada componente; los *loadings* expresan la contribución de cada variable original a cada componente; y el biplot permite visualizar simultáneamente muestras y variables. Cada componente es, en el fondo, una combinación lineal de las variables originales, una suerte de "receta", como en `PC1 = 0.7·Ingreso + 0.6·Educación − 0.3·Edad + 0.2·Experiencia`. Para decidir cuántos componentes conservar se manejan varios criterios: la varianza acumulada aconseja retener componentes hasta alcanzar entre el 80% y el 95% de varianza explicada; el criterio de Kaiser propone conservar solo los de autovalor mayor que 1; la regla del codo recurre al *scree plot* para hallar el punto de inflexión; y con fines de visualización basta con dos o tres componentes. La decisión encierra un trade-off fundamental, porque más componentes retienen más información y ganan precisión, mientras que menos componentes aportan simplicidad e interpretabilidad. Sus ventajas —reduce la dimensionalidad preservando información, elimina correlación, atenúa el ruido, acelera otros algoritmos y facilita la visualización— conviven con limitaciones claras: pierde información en la reducción, los componentes pueden ser difíciles de interpretar y asume únicamente relaciones lineales.

## Reglas de asociación

Las reglas de asociación descubren relaciones interesantes entre variables en grandes bases de datos transaccionales, buscando patrones del tipo "si ocurre A, tiende a ocurrir B". Su aplicación clásica es el *Market Basket Analysis* o análisis de canasta de compra. Cada regla adopta el formato `{Antecedente} ⇒ {Consecuente}`, como en `{Pan, Manteca} ⇒ {Leche}`, que se lee "si un cliente compra pan y manteca, también compra leche". La fuerza de una regla se evalúa con tres métricas complementarias:

| Métrica | Qué mide | Fórmula | Pregunta que responde |
|---|---|---|---|
| Soporte (*support*) | Frecuencia relativa con que aparece un ítem o combinación | Soporte(A→B) = (transacciones con A y B) / (total de transacciones) | ¿Qué tan común es este evento? |
| Confianza (*confidence*) | Certeza de la regla | Confianza(A→B) = (transacciones con A y B) / (transacciones con A) | De los que compraron A, ¿qué % también llevó B? |
| Lift | Cuánto cambia la probabilidad de B sabiendo que se compró A frente a comprar B al azar | Lift(A→B) = Confianza(A→B) / Soporte(B) | ¿La asociación es real o efecto de un producto masivo? |

Con datos concretos, el soporte de `{Pañales}→{Cerveza}` resulta de dividir las transacciones que contienen ambos por el total: si en 20 de 100 tickets se compraron juntos, el soporte es 20/100 = 0.20 (20%). La confianza de esa misma regla se obtiene sobre las transacciones que contienen el antecedente: si 25 personas compraron pañales y de ellas 20 llevaron cerveza, la confianza es 20/25 = 0.80 (80%). El lift existe para corregir el sesgo de los productos muy populares: la leche, por ejemplo, es un producto masivo que casi todos compran, de modo que `{Pañales}→{Leche}` puede arrojar un 90% de confianza aunque los pañales no influyan en nada; el lift compara la confianza contra la probabilidad base de comprar el consecuente. Su lectura es directa: un lift igual a 1 indica independencia, es decir, que X e Y no están relacionados; un lift mayor que 1 señala asociación positiva —X aumenta la probabilidad de Y, y un lift de 2 significa que Y es dos veces más probable cuando ocurre X—; y un lift menor que 1 revela asociación negativa, donde X disminuye la probabilidad de Y.

El algoritmo Apriori es el procedimiento estándar para extraer estas reglas. Sus pasos son:

1. **Configurar los umbrales mínimos**: un soporte mínimo, que fija la frecuencia a partir de la cual un ítem se considera "interesante", y una confianza mínima, que establece la certeza exigida a las reglas finales.
2. **Generar y filtrar los 1-itemsets**: contar cuántas veces se compró cada producto por separado y eliminar los que no alcanzan el soporte mínimo.
3. **Combinar en 2-itemsets**: formar pares con los productos que pasaron el filtro, contar co-ocurrencias y descartar los que no llegan al soporte.
4. **Iterar hacia combinaciones mayores**: grupos de 3, 4 o más ítems, en un ciclo de combinar y podar, hasta que ninguna combinación supere el soporte o se agoten las posibilidades, quedando así los itemsets frecuentes.
5. **Extraer reglas y calcular confianza**: de cada itemset frecuente se derivan reglas candidatas y se calcula su confianza.
6. **Filtrar por confianza y calcular el lift**: se descartan las reglas por debajo del umbral de confianza y se calcula el lift para confirmar que la asociación es real.

El ejemplo didáctico de la clase, con 5 transacciones y un soporte mínimo del 40%, evalúa la regla `{Pan, Leche} ⇒ {Mantequilla}`: su soporte es 2/5 = 40%, su confianza es 2/3 = 67% y su lift es 0.67 / 0.60 = 1.11; como el lift supera 1, la asociación es positiva, y la conclusión es que los clientes que compran pan y leche tienen un 11% más de probabilidad de comprar mantequilla. Estas técnicas se aplican en retail y supermercados (disposición de productos y promociones cruzadas), e-commerce ("quien compró X también compró Y"), medicina (co-ocurrencia de síntomas), web mining, telecomunicaciones (paquetes de servicios) y banca (cross-selling).