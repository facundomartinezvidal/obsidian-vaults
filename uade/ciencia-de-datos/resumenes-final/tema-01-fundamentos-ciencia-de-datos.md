---
materia: Ciencia de Datos
tema: 1
fecha: 2026-03-13
bloque: Fundamentos
parcial: 1
tags:
  - resumen-final
  - ciencia-de-datos
  - fundamentos
fuente: content/1-parcial/01-material-introduccion-data-science.pdf
---

# Tema 1 — Fundamentos de la Ciencia de Datos

## 1. Qué es la Ciencia de Datos y sus tres pilares

La ciencia de datos es un área interdisciplinaria que emplea métodos científicos, procesos, algoritmos y sistemas para extraer conocimiento e *insights* de datos estructurados y no estructurados. Más que una disciplina única, constituye la combinación de tres mundos que históricamente transcurrían por separado: la programación, la estadística y el conocimiento del negocio. Su finalidad no es "jugar con datos" sino resolver problemas reales y sostener decisiones basadas en evidencia, y precisamente esa convergencia de perfiles antes incompatibles en una misma persona explica por qué *Harvard Business Review* la popularizó al calificar al Data Scientist como *"the sexiest job of the 21st century"*. El patrón se repite en todos sus dominios de aplicación —e-commerce, salud, finanzas, manufactura, educación o logística—: en cada uno existen datos que, bien explotados, generan ventaja competitiva.

Esa combinación de tres mundos se formaliza en el diagrama de Venn de Drew Conway, según el cual la ciencia de datos vive en la intersección de tres círculos:

- **Computación o informática** — aporta la programación, la manipulación de datos y las herramientas para procesar grandes volúmenes, como escribir un script en Python que limpia diez millones de filas.
- **Matemática y estadística** — permite modelar, analizar patrones, validar hipótesis y extraer *insights* significativos, por ejemplo mediante un test estadístico que distingue si una diferencia es real o producto del azar.
- **Conocimiento del negocio o del dominio** — contextualiza los hallazgos y les otorga valor: saber que en retail diciembre siempre sube evita confundir ese pico estacional con una anomalía.

Lo decisivo del diagrama son sus intersecciones, un punto que suele evaluarse. Cada una combina solo dos pilares y, por eso, resulta incompleta:

- **Computación + estadística → *machine learning*** — produce modelos potentes, pero sin el pilar del negocio se corre el riesgo de resolver el problema equivocado.
- **Computación + negocio → "zona de peligro" o *software skills*** — se programan soluciones que suenan convincentes pero, al carecer de rigor estadístico, conducen a conclusiones falsas.
- **Estadística + negocio → investigación tradicional** — el análisis clásico de siempre, pero sin las herramientas modernas de cómputo.

Solo cuando confluyen los tres pilares en el centro se hace verdadera ciencia de datos. La importancia del pilar de negocio se aprecia con un ejemplo sencillo: un modelo que predice con 99 % de exactitud que "los clientes que compraron ayer volverán a comprar" es inútil si el negocio ya lo sabía, porque sin ese anclaje la técnica no genera valor.

## 2. La pirámide DIKW

La pirámide DIKW ordena en una jerarquía —que se lee de abajo hacia arriba— los cuatro niveles a través de los cuales el dato se transforma progresivamente en valor, agregando cada escalón contexto y sentido sobre el anterior:

1. **Dato** — representación simbólica de un hecho bruto, sin procesar ni contexto, que por sí solo no aporta valor; los números aislados `25, 30, 22, 28, 35` son un ejemplo.
2. **Información** — datos dotados de contexto y significado para un fin determinado; responde a las preguntas qué, quién y cuándo, como al enunciar que se trata de "las edades de los estudiantes de la clase de Ciencia de Datos en UADE".
3. **Conocimiento** — surge al transformar esa información para obtener un beneficio, comprendiendo patrones; responde a la pregunta cómo: advertir que el promedio de edad es de 26,25 años y que, por tanto, se trata de un grupo joven.
4. **Sabiduría** — conocimiento aplicado con juicio, de forma ética y estratégica, orientado a decisiones de largo plazo que responden al por qué y al qué es mejor, como resolver ajustar el plan de estudios para incorporar más ejemplos prácticos dirigidos a profesionales jóvenes.

Esta jerarquía también sirve para medir la madurez de una organización según el nivel en el que opera. La mayoría de las empresas se detiene en el dato y la información, mientras que las organizaciones más maduras alcanzan el conocimiento y la sabiduría y, por eso mismo, toman decisiones estratégicas fundadas en *insights* profundos, idea que enlaza directamente con la noción de valor propia de Big Data.

## 3. Big Data y las 5 V

Big Data se caracteriza por cinco propiedades, de las cuales las primeras cuatro son rasgos descriptivos y la quinta, el valor, constituye el objetivo final:

- **Volumen** — cantidad masiva de datos, medida en petabytes y exabytes, como los más de 300 PB de Facebook, las 500 horas de video subidas por minuto a YouTube o los 50.000 millones de dispositivos IoT.
- **Velocidad** — rapidez con que los datos se generan y deben procesarse, a menudo en tiempo real, como en el trading en microsegundos, los sensores IoT o los 8,9 usuarios por segundo.
- **Variedad** — distintos formatos posibles: estructurados como SQL o Excel, semiestructurados como JSON y no estructurados como los videos.
- **Veracidad** — calidad y confiabilidad de los datos en términos de precisión, consistencia e integridad; enfrenta desafíos como los datos incompletos, la información inconsistente o las fuentes poco confiables.
- **Valor** — beneficio empresarial que se obtiene del análisis, expresado en mejores decisiones, procesos optimizados y ventaja competitiva.

Estas propiedades no operan de forma aislada. El volumen y la velocidad exigen en conjunto una infraestructura escalable y procesamiento distribuido, mientras que la variedad y la veracidad demandan herramientas flexibles y procesos de limpieza robustos. La quinta V depende de gestionar bien las cuatro anteriores, de modo que un gran volumen acompañado de baja veracidad arroja un resultado inservible. En síntesis, el objetivo final de Big Data no es acumular datos sino generar valor a partir de ellos.

## 4. Tipos de datos

Los proyectos reales combinan varios tipos de datos, por lo que un científico de datos debe poder trabajar con los tres:

- **Estructurados** — formato predefinido en filas y columnas, con un esquema rígido que los vuelve fácilmente consultables, como las bases relacionales, las planillas de Excel o las tablas de clientes, productos y ventas; se gestionan con tecnologías como SQL, MySQL, PostgreSQL, Oracle o SQL Server.
- **No estructurados** — carecen de un formato predefinido y resultan difíciles de almacenar y procesar, como el texto libre de emails y documentos, imágenes, videos, audio o redes sociales; se recurre a herramientas como NoSQL, MongoDB, Hadoop, Spark o técnicas de NLP.
- **Semiestructurados** — posición intermedia: no tienen un esquema rígido pero incorporan etiquetas o marcadores que los organizan jerárquicamente, como JSON, XML, CSV con inconsistencias o logs de sistemas; se manejan con JSON, XML, APIs REST o MongoDB.

Conviene retener un dato que suele preguntarse: el 80 % de los datos de una empresa son no estructurados, razón por la cual las herramientas modernas —Python con Pandas y NumPy, o R— apuntan a procesar información de cualquier formato y no solo tablas.

## 5. Business Intelligence

La inteligencia de negocios (BI) es el conjunto de estrategias, tecnologías y prácticas orientadas a recopilar, analizar y transformar datos en información útil para la toma de decisiones. Su funcionamiento descansa en un pipeline que recorre toda la materia y que va de las fuentes al usuario de negocio:

1. **Fuentes de datos** — ERP, CRM, sistemas operacionales y bases transaccionales, que alimentan el proceso.
2. **ETL/ELT** — procesos de extracción, transformación y carga que preparan y depuran la información.
3. **Data warehouse** — repositorio centralizado de datos históricos estructurados donde se deposita la información.
4. **Visualización** — dashboards interactivos y reportes que operan sobre ese repositorio.
5. **Usuarios de negocio** — analistas, gerentes y ejecutivos que, al final del recorrido, toman las decisiones.

El propósito de BI es ofrecer una visión clara del negocio, detectar oportunidades, anticiparse a los cambios del mercado, decidir con datos y monitorear KPIs. Esto se traduce en beneficios concretos:

- **Optimización operativa** y reducción de gastos.
- **Mayor eficiencia** por automatización.
- **Control del rendimiento** y monitoreo continuo.
- **Mejor conocimiento del cliente.**
- **Reacción inmediata** ante crisis.
- **Optimización del ROI.**

Todo ello converge en una ventaja competitiva sostenible. No es casual que sus componentes —ETL, data warehouse y visualización— sean exactamente los temas de las clases 2 y 3: esta unidad ofrece el "para qué" antes del "cómo".

## 6. Ciencia de Datos frente a Business Intelligence

La ciencia de datos y el business intelligence no compiten sino que se complementan, y su diferencia central es el enfoque temporal. Mientras BI mira el pasado y el presente analizando datos históricos para responder qué pasó, por qué pasó y cuándo ocurrió, la ciencia de datos adopta una mirada prospectiva que busca predecir qué pasará, cómo optimizar y qué acciones tomar. Esa distinción se refleja en el instrumental y en el objetivo de cada una, según resume el siguiente cuadro:

| Dimensión | Business Intelligence | Data Science |
|---|---|---|
| Enfoque temporal | Pasado y presente — datos históricos | Prospectivo — predice el futuro |
| Preguntas | ¿Qué pasó? ¿Por qué? ¿Cuándo? | ¿Qué pasará? ¿Cómo optimizar? ¿Qué acciones tomar? |
| Herramientas | Dashboards, reporting, SQL, OLAP, Tableau, Power BI | Machine Learning, Python, R, estadística avanzada, algoritmos |
| Objetivo | Monitorear el rendimiento y generar informes | Descubrir patrones ocultos y generar predicciones |

En las organizaciones maduras ambas conviven de forma articulada: el contexto histórico que aporta BI es justamente el insumo que la ciencia de datos necesita para predecir mejor. Juntas cubren así la decisión completa, al entender el pasado y anticipar el futuro, y este concepto suele ser el que cierra el parcial.