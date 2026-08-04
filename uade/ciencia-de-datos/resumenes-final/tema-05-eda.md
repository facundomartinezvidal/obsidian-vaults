---
materia: Ciencia de Datos
tema: 5
bloque: EDA
tags:
  - resumen-final
  - ciencia-de-datos
  - eda
  - visualizacion
---

# Tema 5 — Análisis Exploratorio de Datos (EDA)

## Qué es el EDA y para qué sirve

El análisis exploratorio de datos constituye la etapa en que se examinan los datos antes de aplicar métodos estadísticos confirmatorios. Funciona como un embudo que conduce de los datos crudos de la realidad (raw data) hacia las conclusiones, filtrando y ordenando la información en el camino. La definición clásica es la de John Tukey (1977), para quien el EDA no es solo una técnica sino una actitud, un estado mental y un conjunto de herramientas destinado a examinar los datos precisamente antes de recurrir a la estadística confirmatoria. En una línea complementaria, el NIST lo caracteriza como un enfoque que emplea técnicas fundamentalmente gráficas orientadas a maximizar la visión sobre el conjunto de datos, descubrir sus estructuras subyacentes, extraer las variables importantes, detectar valores atípicos y anomalías, y probar los supuestos que sostienen el análisis posterior.

Estas definiciones se traducen en cuatro objetivos prácticos que guían el trabajo exploratorio:

1. **Análisis descriptivo** — resumir los datos mediante estadísticos que sinteticen su comportamiento.
2. **Descubrir patrones** — identificar y entender las regularidades presentes en la información.
3. **Detectar anomalías** — encontrar los valores atípicos (outliers) que puedan distorsionar los resultados.
4. **Hallar relaciones** — establecer los vínculos que conectan a unas variables con otras.

En conjunto, estos propósitos convierten al EDA en el paso que da sentido a los datos antes de modelarlos.

## Tipos de EDA

El EDA se organiza según dos criterios simples y combinables: cuántas variables se analizan a la vez y si el análisis se apoya o no en gráficos. Respecto de la cantidad de variables, el enfoque es univariante cuando se estudia una sola y multivariante cuando intervienen dos o más. Respecto del soporte, es no gráfico cuando la evidencia se expresa mediante números y estadísticos, y gráfico cuando se recurre a la visualización. El cruce de ambos ejes define las cuatro modalidades básicas, a las que se suma una categoría adicional de técnicas gráficas avanzadas para muchas dimensiones.

| Modalidad | Nº variables | Gráfico | Qué hace y ejemplos de la clase |
|---|---|---|---|
| Univariante no gráfico | Una | No | Estadísticos de resumen de una variable, como tendencia central y dispersión. Por ejemplo, edad de clientes con media 35, mediana 34, desvío 7, mínimo 18 y máximo 65. |
| Univariante gráfico | Una | Sí | Visualiza la forma y distribución de una variable, como el histograma de prescripciones por hora que revela picos a las 10 AM y 5 PM, o el histograma y boxplot del ingreso mensual. |
| Multivariante no gráfico | Dos o más | No | Cuantifica relaciones mediante coeficientes, como una matriz de correlación con r = 0.85 entre edad y costo, o un Pearson = 0.65 entre edad y gasto mensual, además de tablas de contingencia. |
| Multivariante gráfico | Dos o más | Sí | Muestra cómo interactúan las variables, como un scatter de dosis contra eficacia coloreado por grupo para detectar clusters, o ingreso contra gasto coloreado por género. |
| Otros gráficos multivariantes | Múltiples | Sí | Técnicas para muchas dimensiones, como heatmaps de correlaciones, gráficos de burbujas (una tercera variable en el tamaño), gráficos 3D y treemaps. |

## Gráficos típicos y cómo elegirlos

Cada tipo de gráfico responde a un objetivo distinto, de modo que la elección de la visualización depende de qué se desea mostrar más que de una preferencia estética. Los principales gráficos y su uso son:

- **Histograma** — muestra la distribución y frecuencia de una variable.
- **Gráfico de caja (box plot)** — resume mediana, cuartiles y outliers a través de sus bigotes.
- **Gráfico de dispersión (scatter plot)** — expone la relación entre dos variables numéricas.
- **Gráfico de burbujas** — amplía la dispersión cuando el tamaño de cada punto codifica una tercera variable.
- **Mapa de calor (heatmap)** — representa la intensidad de una relación, típicamente correlaciones.
- **Treemap** — expone la composición jerárquica de un conjunto mediante áreas.

De esta correspondencia entre objetivo y visualización surge una guía práctica de decisión según lo que se quiera comunicar:

- **Comparación** — barras o líneas.
- **Relación** — dispersión para dos variables, burbujas para tres.
- **Distribución** — histograma.
- **Composición** — gráfico de torta, barras apiladas o treemap.