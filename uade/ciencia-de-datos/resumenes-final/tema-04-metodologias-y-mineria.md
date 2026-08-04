---
materia: Ciencia de Datos
tema: 4
bloque: Minería de datos
tags:
  - resumen-final
  - ciencia-de-datos
  - mineria-de-datos
  - kdd
  - crisp-dm
  - semma
  - gartner
---

# Tema 4 — Metodologías de proyectos de datos y Minería

## Minería de datos y el proceso KDD

Conviene despejar desde el inicio una confusión frecuente: la minería de datos no equivale al proceso completo de análisis, sino que constituye un único paso dentro de un ciclo más amplio conocido como KDD (*Knowledge Discovery in Databases*). La definición canónica de Fayyad et al. (1996) resulta clarificadora al respecto: la minería de datos es "un paso en el proceso de descubrimiento de conocimiento en bases de datos, que consiste en la aplicación de algoritmos específicos para extraer patrones previamente desconocidos, válidos, potencialmente útiles y comprensibles a partir de los datos". De esta formulación se desprenden cuatro exigencias sobre los patrones buscados:

- **Desconocidos** — no triviales ni evidentes a simple vista.
- **Válidos** — significativos y confiables en términos estadísticos.
- **Útiles** — que aporten valor concreto.
- **Comprensibles** — interpretables por un ser humano.

La distinción operativa es sencilla de recordar: la minería es el paso en que se aplican los algoritmos, mientras que el KDD abarca todo el ciclo que va de los datos brutos al conocimiento.

El propio KDD, tal como lo formula Fayyad, representa ese ciclo de vida completo que transforma datos en bruto en conocimiento accionable, y se despliega en seis etapas encadenadas:

1. **Selección de datos** — delimitar el subconjunto relevante para el problema.
2. **Limpieza y preparación** (preproceso) — corregir errores, valores faltantes y ruido hasta obtener datos preprocesados.
3. **Transformación** — reducir o reformatear los datos para adecuarlos al análisis.
4. **Minería de datos** propiamente dicha — aplicar los algoritmos que extraen los patrones.
5. **Evaluación e interpretación de patrones** — valorar esos hallazgos y convertirlos en conocimiento.
6. **Presentación del conocimiento** — comunicar los resultados obtenidos.

Es importante subrayar que el diagrama original de Fayyad incluye flechas de retorno entre etapas: el proceso es iterativo y admite volver sobre pasos anteriores, de modo que no debe entenderse como estrictamente lineal.

## SEMMA y CRISP-DM: dos metodologías de referencia

Sobre la base conceptual del KDD surgieron metodologías más operativas para conducir proyectos de minería. La primera de ellas, **SEMMA**, es una propuesta propietaria de SAS de marcado sesgo técnico y de modelado, que guía al analista a través de cinco fases cuyas iniciales dan nombre al acrónimo:

- ***Sample*** (muestreo) — selecciona el conjunto de datos con que se trabajará.
- ***Explore*** (explorar) — comprende esos datos descubriendo relaciones esperadas e imprevistas, así como anomalías, apoyándose en la visualización.
- ***Modify*** (modificar) — selecciona, crea y transforma variables como preparación para el modelado.
- ***Model*** (modelar) — aplica las técnicas de modelado sobre las variables ya preparadas.
- ***Assess*** (evaluar) — juzga la fiabilidad y la utilidad de los modelos obtenidos.

Como se advierte, SEMMA se concentra en el trabajo del analista con los datos y omite deliberadamente cualquier fase explícita de comprensión del negocio.

Esa carencia es justamente lo que subsana **CRISP-DM** (*Cross-Industry Standard Process for Data Mining*), la metodología que se ha consolidado como estándar de facto por ser la más utilizada en la industria. Se trata de un marco estructurado pero flexible, aplicable a cualquier sector, de naturaleza cíclica y con una particularidad decisiva: empieza y termina en el negocio. Sus seis fases son:

1. **Entender el negocio** (*Business Understanding*) — comprender los objetivos y requisitos desde la perspectiva del negocio y traducirlos en un problema de minería de datos.
2. **Entender los datos** (*Data Understanding*) — recopilación inicial, familiarización con las fuentes, identificación de problemas de calidad y primeras ideas.
3. **Preparar los datos** (*Data Preparation*) — selección, limpieza, construcción, integración y formateo; merece una mención especial porque es la fase que más tiempo consume, ya que se estima que absorbe entre el 70 y el 80 % del esfuerzo total del proyecto.
4. **Modelado** (*Modeling*) — seleccionar técnicas, generar escenarios de prueba y construir y ajustar los modelos.
5. **Evaluación** (*Evaluation*) — verificar que el modelo cumpla los objetivos de negocio y detectar problemas de modelado.
6. **Despliegue** (*Deployment*) — llevarlo a producción, planificar su monitoreo y mantenimiento y producir los informes finales.

De cara al parcial conviene retener tres ideas: que CRISP-DM es el estándar más usado en la industria, que la preparación de datos es la fase más costosa en tiempo (70-80 %) y que el ciclo abre y cierra en el negocio.

## Comparación de metodologías y el ciclo de Microsoft

Aunque KDD, SEMMA y CRISP-DM abordan un mismo problema —extraer conocimiento de los datos—, lo hacen desde orígenes y con énfasis distintos, como resume el siguiente cuadro:

| | **KDD** | **SEMMA** | **CRISP-DM** |
|---|---|---|---|
| Origen | Académico (Fayyad, 1996) | SAS (propietaria) | Estándar de industria |
| Enfoque | Descubrimiento de conocimiento | Técnico / modelado | Negocio + técnico |
| Negocio explícito | Escaso | No | Sí (fases 1 y 6) |
| Nº de etapas | 6 (+ selección) | 5 | 6 |

El **Data Science Lifecycle de Microsoft** puede leerse como una extensión de esta tradición que hace explícitas ciertas etapas que las metodologías clásicas dejaban implícitas. Su flujo recorre las fases de *Business Understanding*, *Data Acquisition & Understanding*, *Modeling*, *Deployment* y *Customer Acceptance* como cierre, con retornos entre ellas al igual que el KDD. En la adquisición y comprensión de datos incorpora decisiones concretas de arquitectura, como el origen de datos (on-premise frente a nube), el tipo de pipeline (streaming frente a batch), el dimensionamiento del entorno según el volumen de datos, y las tareas de *wrangling*, exploración y limpieza. La fase de modelado desagrega explícitamente el **feature engineering**, el entrenamiento del modelo (con algoritmos, ensembles, ajuste de hiperparámetros y reentrenamiento) y su evaluación mediante validación cruzada y pruebas A/B. Finalmente, el despliegue contempla un *Model Store*, servicios web y aplicaciones inteligentes, junto con el *scoring* y el monitoreo continuo del rendimiento. El aporte diferencial de este modelo radica precisamente en volver explícitos el feature engineering y un despliegue con monitoreo permanente, aspectos que CRISP-DM menciona de manera más genérica.

## Programación tradicional frente a Machine Learning

Comprender por qué el aprendizaje automático se ha vuelto central en la minería exige advertir que invierte el flujo de la programación tradicional. En la programación clásica, el programador aporta las reglas y los datos, y el sistema produce las respuestas; el conocimiento del dominio está codificado por el humano en forma de reglas explícitas. El machine learning invierte esa relación: recibe como entrada las respuestas (los ejemplos ya resueltos) junto con los datos, y produce como salida las reglas. Dicho de otro modo, en lugar de que una persona escriba las reglas, el algoritmo las aprende a partir de casos con solución conocida, y esa regla aprendida es lo que llamamos modelo.

## Análisis descriptivo frente a predictivo

Dentro de la minería, los análisis se distinguen según su objetivo en descriptivos y predictivos. El análisis **descriptivo** busca identificar patrones, relaciones o estructuras subyacentes en los datos existentes; resume y caracteriza las propiedades generales del conjunto sin pretender anticipar ningún valor, y se asocia naturalmente al aprendizaje no supervisado. El análisis **predictivo**, en cambio, utiliza datos históricos para inferir sobre datos futuros o valores desconocidos: su meta es predecir el valor de un atributo específico —la variable objetivo— a partir de un conjunto de predictores, y se vincula al aprendizaje supervisado propio del machine learning. La oposición es, por tanto, doble: describir lo que ya está en los datos frente a estimar lo que aún no se conoce.

## Elección de herramientas: el Cuadrante Mágico de Gartner

Frente a la pregunta práctica de cómo seleccionar las herramientas analíticas, la referencia habitual es el Cuadrante Mágico de Gartner, un informe que evalúa y compara a los principales proveedores de software ubicándolos sobre un gráfico de dos ejes:

- **Completitud de visión** (eje horizontal) — mide la innovación, la estrategia de producto, la visión de mercado, la diferenciación y la capacidad de anticiparse a tendencias futuras como AutoML, MLOps o IA generativa.
- **Capacidad de ejecución** (eje vertical) — evalúa la calidad y madurez del producto, su facilidad de uso, el soporte, el ecosistema, la base de clientes y el historial de implementaciones exitosas.

El cruce de ambos ejes reparte a los proveedores en cuatro categorías:

- **Líderes** — combinan alta ejecución con visión amplia (en BI, por ejemplo, Microsoft Power BI, Tableau y Qlik).
- **Visionarios** — de fuerte innovación pero ejecución aún no consolidada.
- **Retadores** — con buena ejecución práctica pero menor innovación estratégica.
- **Jugadores de nicho** — soluciones enfocadas en mercados específicos o de alcance limitado.

Cabe notar que Gartner publica cuadrantes separados según el propósito: uno de *Analytics & BI Platforms*, orientado a herramientas de análisis y business intelligence, y otro de *Data Science & Machine Learning Platforms* (DSML), dedicado a las plataformas que cubren el ciclo de vida completo de la ciencia de datos y el ML, donde aparecen actores como Databricks, Dataiku o DataRobot junto a los grandes proveedores de nube.

## Taxonomía de técnicas de minería

Las técnicas de minería pueden organizarse en un árbol según su propósito, que se bifurca en dos ramas: verificar hipótesis ya conocidas o descubrir conocimiento nuevo.

- **Verificación** — agrupa las herramientas que confirman algo que ya se sospecha: consultas SQL, análisis OLAP, análisis estadístico y análisis exploratorio de datos.
- **Descubrimiento** — persigue patrones inéditos y se subdivide a su vez en dos propósitos:
	- **Describir** — visualización, clustering, reglas de asociación y análisis de componentes principales (PCA).
	- **Predecir** — sigue la misma lógica que el análisis descriptivo-predictivo ya visto: la predicción de valores numéricos corresponde a la **regresión** (árboles de regresión, métodos bayesianos, KNN, entre otros), mientras que la predicción de categorías corresponde a la **clasificación** (árboles de decisión, métodos bayesianos, Random Forest y KNN).

De este modo, la taxonomía enlaza de manera coherente con la distinción entre análisis descriptivo y predictivo y con los tipos de aprendizaje.