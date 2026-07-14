---
title: "Apunte Parcial - Ciencia de Datos"
tags:
  - uade
  - ciencia-de-datos
  - apunte
  - parcial
---

# Apunte Parcial - Ciencia de Datos

> [!target] Objetivo
> Guía completa de estudio para el parcial, cubriendo los 7 ejes teóricos que aparecen en los temas 1 y 2, más el ejercicio práctico (modelo estrella / copo de nieve según Kimball).

## Mapa Mental

![[Mapa Mental Parcial.excalidraw]]

> [!tip] Estructura de los parciales observados
> **Teóricos (7 preguntas)**: 1) Top-Down / Bottom-Up · 2) Pipeline vs ETL · 3) Calidad de datos (enfoques) · 4) Data Vault · 5) Sistemas de toma de decisiones · 6) KDD o CRISP-DM (etapas + comparación con SEMMA) · 7) Librería Python para métricas de un dataframe.
> **Práctico (3 puntos)**: diseñar un modelo dimensional (estrella o copo de nieve) para un caso de negocio + queries.

---

## 0. Fundamentos de Ciencia de Datos (Clase #1)

### ¿Qué es la Ciencia de Datos?

> [!quote] Definición
> La ciencia de datos es un **área interdisciplinaria** que utiliza métodos científicos, procesos, algoritmos y sistemas para **extraer conocimiento y hallazgos (insights)** de datos estructurados y no estructurados.

Combina **programación, estadística y conocimiento del negocio** para resolver problemas complejos y tomar decisiones basadas en datos.

**Áreas de aplicación**: E-commerce, Salud, Finanzas, Manufactura, Educación, Logística.

> [!info] Contexto
> Harvard Business Review (2012) llamó al Data Scientist "The Sexiest Job of the 21st Century".

### Diagrama de Venn de Drew Conway — Los 3 pilares

La ciencia de datos es la **intersección** de tres dominios:

| Pilar | Descripción |
|---|---|
| **Computer Science** (Computación e Informática) | Habilidades de programación, manipulación de datos y herramientas tecnológicas para procesar grandes volúmenes |
| **Math & Statistics** (Matemática y Estadística) | Modelar, analizar patrones, validar hipótesis y extraer insights significativos |
| **Domain Knowledge** (Conocimiento del negocio) | Conocimiento profundo del dominio para contextualizar hallazgos y generar valor empresarial real |

Las intersecciones:
- **Computer Science ∩ Math & Statistics** = Machine Learning
- **Computer Science ∩ Domain Knowledge** = Software Skills (zona de peligro según Conway si falta estadística)
- **Math & Statistics ∩ Domain Knowledge** = Traditional Research
- **Los tres juntos** = **Data Science**

### Pirámide DIKW — De datos a sabiduría ⭐

> [!important] Jerarquía del conocimiento
> **D**ata → **I**nformation → **K**nowledge → **W**isdom. Cada nivel agrega contexto y valor al anterior.

| Nivel | Definición | Pregunta que responde | Ejemplo |
|---|---|---|---|
| **Dato** | Representación simbólica (numérica, alfabética) de un atributo. **Hechos brutos sin procesar, sin contexto ni significado**. | (ninguna por sí solo) | `25, 30, 22, 28, 35` (edades individuales) |
| **Información** | Conjunto de datos organizados y contextualizados que interesan a un observador por un motivo determinado. | ¿qué?, ¿quién?, ¿cuándo? | Edades de estudiantes en la clase de Ciencia de Datos en UADE |
| **Conocimiento** | Habilidad de transformar la información para obtener beneficio. Implica **comprensión de patrones**, permite predicciones y decisiones. | ¿cómo? | El promedio de edad es 26.25 años → grupo joven |
| **Sabiduría** | Conjunto de conocimientos aplicados con juicio ético y estratégico. Orienta **decisiones estratégicas de largo plazo**. | ¿por qué?, ¿qué es mejor? | Ajustar el plan de estudios para incluir más ejemplos prácticos dirigidos a profesionales jóvenes |

> [!tip] Nivel de madurez de una organización
> La mayoría de las empresas operan en los niveles de **datos e información**. Las organizaciones maduras alcanzan **conocimiento y sabiduría**, permitiendo decisiones estratégicas basadas en insights profundos.

### Contexto actual — "60 segundos en Internet" (2025)

Cada minuto se generan **2.5 quintillones de bytes de datos** en el mundo.

- 5.24B usuarios de redes sociales
- 8.9 nuevos usuarios por segundo
- 34M videos/día subidos a TikTok
- 1B videos/día en YouTube
- 510K posts/min en Facebook
- 5.9M búsquedas/min en Google
- 231M emails/min
- 41M mensajes WhatsApp/min

Esta explosión de datos representa **desafío + oportunidad** para las organizaciones.

### Big Data — Las 5 V ⭐

> [!important] Concepto clave
> Big Data se caracteriza por 5 dimensiones que deben gestionarse juntas para generar valor real.

| V | Concepto | Descripción | Ejemplo / Desafío |
|---|---|---|---|
| **Volumen** | Cantidad | Cantidad masiva de datos generados cada segundo (petabytes, exabytes) | Facebook: 300+ PB · YouTube: 500 hs/min · IoT: 50B dispositivos |
| **Velocidad** | Rapidez | Rapidez con que se generan y deben procesarse. Requiere procesamiento en tiempo real | Trading: microsegundos · Sensores IoT: tiempo real |
| **Variedad** | Formatos | Diferentes formatos: estructurados, semiestructurados y no estructurados | SQL/Excel · JSON · Videos, imágenes |
| **Veracidad** | Calidad | Calidad y confiabilidad de los datos: precisión, consistencia, integridad | Datos incompletos, inconsistentes, fuentes no confiables |
| **Valor** | Beneficio | **Objetivo final**: beneficio empresarial obtenido del análisis | Mejora de decisiones, optimización, ventaja competitiva |

> [!tip] Relación entre las V
> - **Volumen + Velocidad** → requieren infraestructura escalable y procesamiento distribuido.
> - **Variedad + Veracidad** → necesitan herramientas flexibles y procesos de limpieza robustos.
> - **Las 5V = Valor**: el éxito depende de gestionar las otras 4V para generar valor empresarial.

### Tipos de Datos ⭐

> [!important] Pregunta potencial
> Un científico de datos debe trabajar con los tres tipos. En proyectos reales, la mayoría combina estructurados y no estructurados.

| Tipo | Descripción | Ejemplos | Herramientas |
|---|---|---|---|
| **Estructurados** | Formato predefinido en filas/columnas, esquema rígido, fácilmente consultables | BD relacionales (SQL), Excel, tablas de clientes | SQL, MySQL, PostgreSQL, Oracle, SQL Server |
| **No Estructurados** | No siguen formato predefinido, difíciles de almacenar/procesar. **Representan ~80% de los datos empresariales**. | Texto libre (emails, documentos), imágenes, videos, audio, redes sociales | NoSQL, MongoDB, Hadoop, Spark, NLP |
| **Semiestructurados** | No siguen esquema rígido pero contienen etiquetas/marcadores para organizar elementos jerárquicamente | JSON, XML, CSV con inconsistencias, logs | JSON, XML, APIs REST, MongoDB |

### Business Intelligence (BI)

> [!quote] Definición
> Conjunto de **estrategias, tecnologías y prácticas** que permiten a las empresas recopilar, analizar y transformar datos en información útil para la **toma de decisiones**.

**Componentes clave**:
1. **Fuentes de Datos** — ERP, CRM, sistemas operacionales, BD transaccionales.
2. **Procesos ETL/ELT** — extracción, transformación y carga.
3. **Data Warehouse** — repositorio centralizado de datos históricos estructurados.
4. **Herramientas de Visualización** — dashboards interactivos, reportes.
5. **Usuarios de Negocio** — analistas, gerentes, ejecutivos.

**Objetivos de BI**:
- Ofrecer visión clara del negocio mediante dashboards y reportes.
- Detectar oportunidades de mejora y crecimiento.
- Anticiparse a cambios del mercado y mejorar la eficiencia.
- Facilitar la toma de decisiones basada en datos.
- Monitorear KPIs e indicadores de rendimiento.

**Beneficios**: optimización operativa, reducción de gastos, mejora en decisiones, mayor eficiencia, control del rendimiento, conocimiento del cliente, reacción inmediata, optimización del ROI, ventaja competitiva.

### Data Science vs Business Intelligence ⭐

| Dimensión | **Business Intelligence** | **Data Science** |
|---|---|---|
| **Enfoque temporal** | **Pasado y presente** (retrospectivo) | **Futuro** (prospectivo) |
| **Preguntas que responde** | ¿Qué pasó? ¿Por qué pasó? ¿Cuándo ocurrió? | ¿Qué pasará? ¿Cómo podemos optimizar? ¿Qué acciones tomar? |
| **Herramientas** | Dashboards, reporting, SQL, OLAP, Tableau, Power BI | Machine learning, Python, R, estadística avanzada, algoritmos |
| **Objetivo** | Monitorear rendimiento y generar informes operativos | Descubrir patrones ocultos y generar predicciones |
| **Tipo de analítica** | Descriptiva y diagnóstica | Predictiva y prescriptiva |

> [!tip] Complementariedad
> BI y Data Science **se complementan**: BI proporciona el contexto histórico necesario para que Data Science haga predicciones más precisas. Juntas permiten una toma de decisiones completa: desde entender el pasado hasta anticipar el futuro.

**Casos de uso**:

| BI | Data Science | Casos Integrados |
|---|---|---|
| Dashboard de ventas | Sistema de recomendación (Amazon, Netflix) | Segmentación de clientes (BI histórico + clustering) |
| Reportes financieros | Detección de fraude en tiempo real | Optimización logística (rutas históricas + predicción de tráfico) |
| Análisis de inventario | Predicción de churn (abandono de clientes) | Mantenimiento predictivo |
| KPIs operacionales | Forecast de demanda | Pricing dinámico |

### El problema de las decisiones (hilo conductor de la materia)

> [!tip] Idea conductora
> La materia está organizada alrededor del **problema de la toma de decisiones** en las organizaciones. Cada herramienta (DWH, BI, Data Mining, ML) es un **medio** para mejorar la calidad, velocidad y alcance de las decisiones según el nivel de complejidad y valor (descriptivo → diagnóstico → predictivo → prescriptivo, ver Sección 6).

---

## 1. Data Pipelines y procesos ETL/ELT

### Pipeline (Tubería de Datos)

Un **pipeline de datos** es un flujo continuo y automatizado que transforma datos desde su estado bruto hasta un resultado final útil. Incluye transformación, pero también análisis, modelado y envío a múltiples destinos en tiempo real y de forma escalable.

**Etapas de un pipeline**:

| Etapa | Descripción |
|---|---|
| **Ingesta** | Fuente de datos, estructuras, velocidad |
| **Almacenamiento** | Centralizado o distribuido, SQL/noSQL, replicación |
| **Procesamiento** | Tipo de datos, ventana temporal, tipo de resultados |
| **Reporte** | Tipo de visualización, interacción esperada, tiempo de respuesta |

> [!info] Valor al negocio
> Los pipelines permiten el **reprocesamiento de datos** y aseguran la calidad y consistencia de la información para la toma de decisiones.

### ETL vs ELT

| Enfoque | Dónde se transforma | Cuándo usarlo |
|---|---|---|
| **ETL** (Extract, Transform, Load) | En servidor intermedio antes de cargar al destino | Cuando la privacidad es crítica (anonimización) o el destino tiene poca capacidad de cómputo |
| **ELT** (Extract, Load, Transform) | Se cargan crudos al destino y se transforman allí | Tendencia actual: motores modernos como BigQuery o Snowflake permiten la transformación en el destino |

### Pipeline vs ETL (pregunta típica del parcial)

> [!important] Respuesta al parcial
> El **ETL es un tipo específico de pipeline** centrado en extraer → transformar → cargar, diseñado para poblar un Data Warehouse.
> El **pipeline** es un concepto más amplio: además de transformar, puede analizar, modelar, servir datos en streaming a múltiples destinos y orquestar todo el ciclo de vida del dato.

### Latencia y frecuencia

- **Batch (lotes)**: el pipeline corre en intervalos (cada hora, cada noche). Eficiente para grandes volúmenes históricos.
- **Streaming (tiempo real)**: los datos se procesan apenas se generan (transacciones bancarias, sensores IoT). Requiere herramientas como Kafka o AWS Kinesis.

---

## 2. Data Warehouse (DWH)

> [!quote] Definición (Kimball, 1996)
> "Una copia de los datos transaccionales específicamente estructurada para consulta y análisis."

### Características

- **Construido desde las necesidades del usuario final**: analistas y ejecutivos acceden fácilmente a los datos para decidir.
- **Orientado a la dimensión**: los datos se organizan alrededor de **hechos** (ventas) y **dimensiones** (cliente, producto, tiempo).
- **Accesible y optimizado para consultas rápidas**: modelos estrella o copo de nieve facilitan la navegación.
- **Incremental**: se desarrolla de forma modular, agregando áreas de negocio poco a poco.

### Objetivos del DWH

| Objetivo | Beneficio |
|---|---|
| **Integración** | Consolida datos de múltiples fuentes heterogéneas en un único repositorio, eliminando silos. Vista unificada del negocio. |
| **Historial de datos** | Mantiene registro histórico completo, permitiendo análisis temporales y tendencias. |
| **Soporte a Decisiones** | Provee información consolidada y estructurada para decisiones estratégicas basadas en datos. |

### Arquitectura y componentes

- **ETL**: extracción, transformación y carga desde fuentes operacionales.
- **SQL**: lenguaje estándar para consultar y manipular datos.
- **Gobernanza y Seguridad**: políticas de gobernanza, seguridad y calidad.
- **Metadata**: información sobre los datos (definiciones, linaje, calidad).
- **Data Access Tools**: herramientas de BI, reporting y análisis.

---

## 3. Estrategias de Diseño: Top-Down vs Bottom-Up ⭐

> [!important] Pregunta clave del parcial
> Ambos temas (1 y 2) preguntan por la **fortaleza principal** de una de las dos estrategias.

| | **Top-Down** (Bill Inmon, 1992) | **Bottom-Up** (Ralph Kimball, 1996) |
|---|---|---|
| **Enfoque** | Construcción de un **DWH empresarial completo y normalizado** desde el inicio | Construcción incremental de **Data Marts específicos** por área de negocio que luego se integran |
| **Ventaja principal (fortaleza)** | **Integridad y consistencia de datos a nivel empresarial** | **Implementación rápida y entrega de valor temprana** |
| Ventaja secundaria | Menor redundancia de datos | Menor riesgo y costo inicial |
| Desventaja | Mayor tiempo y costo de implementación; requiere más planificación y recursos | Posible inconsistencia entre Data Marts; mayor redundancia |

> [!tip] Recomendación del material
> El enfoque **Bottom-Up de Kimball** es más popular en proyectos actuales por su **agilidad y entrega de valor rápido**.

---

## 4. Modelado Dimensional

### Modelo Estrella (Star Schema)

**Características**: una tabla de hechos central rodeada por varias tablas de dimensiones. Relaciones 1:N entre hechos y dimensiones. Las dimensiones pueden estar **ligeramente desnormalizadas** para facilitar consultas.

| Ventajas | Desventajas |
|---|---|
| Consultas más simples (menos joins) | Mayor redundancia (datos descriptivos duplicados) |
| Intuitivo para usuarios de negocio | Mayor esfuerzo de mantenimiento si cambian atributos jerárquicos |
| Alta performance en consultas analíticas | |

### Modelo Copo de Nieve (Snowflake Schema)

**Características**: similar al estrella, pero las dimensiones están **normalizadas** en sub-dimensiones (ej. `Dim_Producto` → `Dim_Product_Category` → `Dim_Product_Type`).

| Ventajas | Desventajas |
|---|---|
| Menos redundancia (datos normalizados) | Consultas más complejas (más joins, peor performance) |
| Mejor mantenimiento si cambian jerarquías | Menos intuitivo; puede degradar análisis OLAP |

### Data Vault (Dan Linstedt) ⭐

Metodología diseñada para entornos empresariales con **múltiples fuentes, cambios frecuentes y trazabilidad histórica completa**.

> [!important] Pregunta típica del parcial (Tema 2)
> "¿Cuáles son los componentes básicos de un Data Vault? ¿Cuáles tienen similitud con elementos de un DWH tradicional?"

**Componentes básicos**:

| Componente | Función | Similitud con DWH tradicional |
|---|---|---|
| **Hubs** | Contienen las **entidades centrales del negocio** (Cliente, Producto, Pedido). Cada fila representa una clave de negocio única. | Se asemejan a las **tablas de dimensiones** del modelo estrella (representan entidades de negocio) |
| **Links** | Representan las **relaciones entre hubs** (Cliente compra Producto). Permiten modelar procesos y conexiones. | Se asemejan a la **tabla de hechos**, ya que representan las relaciones/transacciones |
| **Satélites** | Guardan los **atributos descriptivos e históricos** de hubs o links. Son versionados para seguimiento temporal. | Se asemejan a los **atributos de las dimensiones** (columnas descriptivas), pero con versionado histórico |

**Características clave**:
- **Separación de preocupaciones**: datos descriptivos separados de las relaciones.
- **Auditoría completa**: trazabilidad histórica de todos los cambios.
- **Escalabilidad**: fácil incorporación de nuevas fuentes sin remodelado.
- **Flexibilidad**: adaptable a cambios en requisitos de negocio.

### Flat Table / OBT (One Big Table)

- Tabla "plana" que mezcla hechos + atributos de dimensiones en un único dataset.
- Típica en prototipos, reportes rápidos o exportes a Excel.
- **Ventaja**: simplicidad para el usuario final (sin joins); excelente performance analítica.
- **Desventaja**: redundancia, consumo de espacio y dificultad para mantener calidad cuando cambian atributos.

### Implementación según Kimball (6 pasos) ⭐

> [!important] Clave para el práctico
> Estos 6 pasos son el marco obligatorio al diseñar un modelo estrella/copo de nieve en el ejercicio.

1. **Seleccionar el proceso de negocio** — acotar el alcance del análisis. Ej: "ventas de productos" o "envíos logísticos". Debe ser medible y repetible.
2. **Declarar el nivel de granularidad** — definir el nivel más bajo de detalle. Ej: una fila por venta individual, no por mes ni producto agregado. Es crítico porque determina dimensiones y medidas.
3. **Identificar las dimensiones** — el "contexto" de las medidas. Ej: `Dim_Fecha`, `Dim_Producto`, `Dim_Cliente`. Cada una con su clave primaria.
4. **Identificar las medidas (hechos)** — valores numéricos que se analizan. Ej: cantidad, precio unitario, total. Deben ser agregables y semánticas.
5. **Crear la tabla de hechos** — contiene claves foráneas a dimensiones + medidas numéricas. **Sin atributos descriptivos** (estos van en dimensiones).
6. **Conectar y dibujar el diagrama** — tabla de hechos en el centro, dimensiones alrededor, flechas desde PK de dimensión → FK en hechos.

Ver ejercicios resueltos:
- [[Ejercicio - Cafetería Matutinto]] (modelo estrella - Retail)
- [[Ejercicio - Hospital General UADE]] (modelo estrella - Salud)

---

## 5. OLAP (Online Analytical Processing)

**Definición**: tecnología optimizada para análisis de datos complejos a gran velocidad. A diferencia de las bases transaccionales (OLTP), OLAP permite extraer y consultar datos desde diferentes perspectivas de forma **multidimensional** (concepto de **cubo**).

### Operaciones OLAP

| Operación | Descripción |
|---|---|
| **Drill-Down** | Desglosa los datos para ver más detalle (ej. de "país" a "ciudad") |
| **Roll-Up** | Agrega los datos subiendo en la jerarquía (ej. de "día" a "año") |
| **Slice** | Rebanar: seleccionar **una sola dimensión** para crear un subconjunto (ej. ventas del año 2026) |
| **Dice** | Dado: seleccionar **un subcubo** cruzando varias dimensiones (ej. ventas de "Zapatillas" en "Buenos Aires" durante "Q1") |

> [!warning] Memotecnia
> **Drill-Down = más detalle** (bajás en la jerarquía)
> **Roll-Up = menos detalle** (subís, agregás)
> **Slice = una dimensión** (una rebanada)
> **Dice = varias dimensiones** (un cubo chico)

### Tipos de OLAP ⭐

> [!important] Pregunta típica (Tema 1)
> "¿Qué es ROLAP? ¿Cuál es la diferencia con MOLAP?"

| Tipo | Descripción | Ventaja | Desventaja |
|---|---|---|---|
| **MOLAP** (Multidimensional) | Usa **estructuras preprocesadas** (cubos). Datos almacenados en BD especializada, optimizada para análisis rápido. | Alta performance en consultas | Menos flexible ante cambios; consumo de espacio |
| **ROLAP** (Relational) | Basado en BD **relacionales (SQL)**. Genera consultas dinámicamente en tiempo real. | Escala a grandes volúmenes, flexible | Performance menor por depender de queries en vivo |
| **HOLAP** (Hybrid) | Combina MOLAP y ROLAP. Usa cubos preprocesados para agregados y SQL para detalles. | Equilibra performance y flexibilidad | Mayor complejidad de implementación |

---

## 6. Sistemas de Toma de Decisiones ⭐

> [!important] Pregunta del parcial (ambos temas)
> "En el marco de los sistemas de toma de decisiones, según el **enfoque** de los mismos, brinde una definición y ejemplo de cada enfoque."

Hay **dos formas de clasificar** los enfoques según el material:

### A) Según el nivel organizacional (pirámide)

| Nivel | Información | Conocimiento | Aplicaciones | Soluciones BI |
|---|---|---|---|---|
| **Estratégico** | Información estratégica | Conocimiento tácito | Aplicaciones estratégicas | Tablero de Mando Integral, BSC, EIS |
| **Táctico/Analítico** | Información analítica | Conocimiento explícito | Aplicaciones analíticas | Data Mining, OLAP, DW, DSS |
| **Operativo** | Información operativa | Datos e información | Aplicaciones transaccionales | MIS, ERP, Sistemas Operacionales, TPS |
| **Técnico** | Información técnica | — | Infraestructura tecnológica | Inventarios, Hardware, Software de base |

### B) Según la complejidad y valor (tipo de analítica)

| Enfoque | Pregunta que responde | Ejemplo |
|---|---|---|
| **Descriptivo** | ¿Qué pasó? (retrospectiva) | "Las ventas del Q1 cayeron 10% respecto al Q4 anterior" — reportes, dashboards |
| **Diagnóstico** | ¿Por qué pasó? | "La caída se debe a stock agotado en sucursal norte durante enero" — drill-down, análisis causal |
| **Predictivo** | ¿Qué va a pasar? | "El modelo proyecta una caída del 5% adicional en Q2 si no se actúa" — regresión, ML |
| **Prescriptivo** | ¿Qué debería hacer? | "Reabastecer la sucursal norte con 2.000 unidades antes del 15 de Q2" — optimización, simulación |

> [!tip] A medida que aumenta la complejidad, aumenta el valor: Descriptivo → Diagnóstico → Predictivo → Prescriptivo.

---

## 7. Arquitecturas Modernas

### Data Lake

**Repositorio centralizado que almacena grandes volúmenes de datos en bruto (raw) en su formato nativo.**

| Tipos soportados | Ejemplo |
|---|---|
| Estructurados | Tablas relacionales, CSV |
| Semi-estructurados | JSON, XML, logs |
| No estructurados | Imágenes, videos, textos |

**Tecnologías típicas**: Hadoop (HDFS), Amazon S3, Azure Data Lake, Databricks.

### Data Lake vs Data Warehouse

| Data Warehouse | Data Lake |
|---|---|
| Datos limpios, estructurados, organizados en modelos dimensionales para análisis | Datos sin transformar o mínimamente procesados, en formato nativo |

### Data Mesh

**No es una tecnología, sino una arquitectura organizacional y filosófica.** Propone **descentralizar el manejo de datos**, asignando la propiedad a los equipos de dominio del negocio (marketing, ventas, logística).

**Principios clave**:
1. **Datos como producto**: cada dominio gestiona sus datos como un producto con documentación, APIs y contratos claros.
2. **Propiedad descentralizada**: cada área es responsable de su data product.
3. **Infraestructura de autoservicio**: plataforma común para publicar y consumir datos sin depender de un equipo central.
4. **Gobernanza federada**: estándares comunes aplicados de forma distribuida.

**Diferencia clave**: DWH y Data Lake son **centralizados**; Data Mesh es **descentralizado**.

---

## 8. Calidad de Datos ⭐

> [!important] Pregunta del parcial (ambos temas)
> "Mencione y desarrolle los distintos enfoques en la gestión de la calidad de datos. Brinde 2 ejemplos de cada enfoque."

> [!quote] Wang y Strong (1996)
> "La calidad de los datos se define como aquellos datos que son **aptos para ser utilizados** según las necesidades de los consumidores de la información."

Tres ideas centrales:
- **Enfoque en el usuario**: la calidad se mide desde la perspectiva del consumidor, no solo desde la técnica.
- **Aptitud para uso (fitness for use)**: los datos deben ser adecuados para el propósito específico.
- **El contexto importa**: la calidad es relativa al contexto y necesidades de negocio.

### Criterios vs Métricas

- **Criterios**: características abstractas o requisitos ("el qué queremos evaluar").
- **Métricas**: implementación cuantitativa de los criterios ("el cuánto"); fórmula o algoritmo que da un valor numérico.

### Criterios de calidad

| Criterio | Descripción |
|---|---|
| **Exactitud** | Grado en que los datos reflejan la realidad o fuente confiable |
| **Integridad** | Los datos deben ser exhaustivos; información incompleta puede ser inservible |
| **Pertinencia** | Los datos deben proporcionar lo que necesitas con un propósito claro |
| **Coherencia** | Los datos no deben contradecirse entre fuentes |
| **Accesibilidad** | Grado en que los datos están disponibles y utilizables cuando se necesitan |
| **Relevancia** | Idoneidad, valor e importancia que aportan los datos |

### Métricas de calidad

| Métrica | Descripción | Cálculo/forma |
|---|---|---|
| **Completitud** | Grado en que todos los atributos están presentes | `(Registros completos / Total) × 100` |
| **Coherencia** | Mismo valor a través de múltiples conjuntos | Validación cruzada entre fuentes |
| **Validez** | Fiabilidad según reglas de negocio definidas | Conformidad con reglas y formatos |
| **Unicidad** | Valores distintos aparecen sólo una vez | Detección y eliminación de duplicados |
| **Integridad** | Correctitud y completitud; relaciones entre entidades | Integridad referencial mantenida |
| **Vigencia** | Datos disponibles cuando se requieren, actualizados | Freshness / frescura |

### Tipos de datos que afectan la calidad

- **Datos No Útiles**: se generan con la operación pero no tienen finalidad ni aportan valor (logs sin propósito analítico).
- **Datos "Sucios"**: inválidos o incorrectos que generan daño al ser usados (direcciones mal escritas, teléfonos inválidos).
- **Datos No Estructurados**: disponibles pero no preparados para uso (PDFs sin metadatos, texto libre).

### Gestión de Calidad: Enfoques (Proactivo vs Reactivo) ⭐

> [!important] Respuesta al parcial
> La calidad de datos se gestiona con **dos enfoques complementarios**: uno reactivo (después del problema) y otro proactivo (antes del problema). La gobernanza de datos establece el marco que los equilibra.

| Enfoque Reactivo (Correcciones) | Enfoque Proactivo (Prevención) |
|---|---|
| Acciones **después de detectar** un problema, enfocadas en identificar y reparar datos defectuosos | Acciones **antes de que ocurran** problemas, previniendo errores desde el origen |
| **Ej 1**: Limpieza de duplicados en bases de clientes | **Ej 1**: Definir reglas de validación al cargar datos |
| **Ej 2**: Corrección de registros incompletos (imputación) | **Ej 2**: Estandarizar formatos (fechas ISO, emails) |
| Normalización de direcciones mal escritas | Implementar catálogo de datos con definiciones |
| Monitoreo con reportes de inconsistencias | Capacitar usuarios en captura correcta |

### Estrategias frente a problemas comunes

**Valores faltantes**:
- **Eliminación**: cuando hay <5% de datos faltantes, variable objetivo ausente; riesgo de perder información.
- **Imputación simple**: media (distribuciones normales), mediana (datos sesgados), moda (categóricas).
- **Imputación predictiva**: KNN, regresión; mayor precisión pero mayor costo computacional.

**Valores duplicados**:
- **Clave primaria + timestamp**: mantener solo el registro más reciente.
- **Fuzzy matching + Golden Record**: identificar similitudes (Levenshtein ≥95%) y consolidar en un "registro maestro".
- **Deduplicación por agrupación**: crear un registro sintético con la mejor información.

**Valores atípicos (outliers)**: datos que se alejan drásticamente del comportamiento normal.
- **Trimming (recorte)**: eliminar valores extremos (P1-P99). Reduce tamaño de muestra.
- **Winsorización**: reemplazar extremos por límites (bigotes del boxplot). Mantiene registros.
- **Transformación logarítmica**: reduce impacto de valores altos; preserva registros y maneja asimetría.

---

## 9. Gobierno de Datos

**Definición**: conjunto de **políticas, procesos, roles y tecnologías** que aseguran que los datos sean gestionados como un **activo estratégico**.

**Objetivo**: garantizar que los datos sean confiables, consistentes, accesibles y seguros, alineados con las necesidades del negocio.

### Componentes clave

- **Políticas y Estándares**: reglas claras sobre definición, uso, seguridad y calidad.
- **Roles y Responsabilidades**: Data Steward, CDO (Chief Data Officer), Data Owners.
- **Procesos**: detección, corrección y prevención de problemas de calidad.
- **Tecnología de Soporte**: herramientas de data quality, data catalog y lineage.

### Beneficios

- Mejora en toma de decisiones (datos confiables → decisiones más acertadas).
- Reducción de costos (menos duplicidad, menos errores operativos).
- Cumplimiento normativo (GDPR, Ley de Protección de Datos).
- Confianza organizacional.

### Relación con Calidad de Datos

El gobierno **define criterios** (estándares aplicables a toda la organización), establece **KPIs medibles**, asigna **responsabilidades claras** e implementa **procesos de mejora continua**.

---

## 10. Minería de Datos (Data Mining)

> [!quote] Fayyad et al. (1996)
> "La minería de datos es un paso en el proceso de **descubrimiento de conocimiento** en bases de datos, que consiste en la aplicación de algoritmos específicos para **extraer patrones previamente desconocidos**, válidos, potencialmente útiles y comprensibles a partir de los datos."

Puntos clave de la definición:
- Parte de **un proceso mayor (KDD)**, no el todo.
- Busca **patrones desconocidos** (no triviales).
- Deben ser **válidos** (estadísticamente significativos).
- Han de ser **útiles** (aportan valor).
- Y **comprensibles** (interpretables por humanos).

### Proceso KDD (Knowledge Discovery in Databases) ⭐

> [!important] Pregunta del parcial (Tema 1)
> "Enumere las etapas del proceso KDD. ¿Cuál es la principal característica de las etapas? Principales diferencias de KDD vs SEMMA."

**6 etapas del KDD** (Fayyad, 1996):

1. **Selección de Datos** — se eligen los datos relevantes para el objetivo.
2. **Limpieza y Preparación (Preproceso)** — se tratan nulos, duplicados, outliers, inconsistencias.
3. **Transformación de Datos** — se normalizan, discretizan, se crean features.
4. **Minería de Datos** — aplicación de algoritmos para extraer patrones (es **solo un paso**).
5. **Evaluación de Patrones** — se valida si los patrones son significativos, útiles.
6. **Presentación del Conocimiento (Interpretación)** — se comunica a stakeholders.

**Característica principal**: es un proceso **iterativo y orientado al descubrimiento de conocimiento**, con fuerte foco en las etapas **previas a la minería** (limpieza y transformación).

### Metodología SEMMA (SAS)

Metodología propietaria de SAS; más **técnica y centrada en la herramienta**, sin foco explícito en negocio.

| Etapa | Descripción |
|---|---|
| **S - Sample** | Muestreo: selección del conjunto de datos para modelado |
| **E - Explore** | Exploración: comprensión mediante descubrimiento de relaciones y anomalías |
| **M - Modify** | Modificación: seleccionar, crear y transformar variables |
| **M - Model** | Modelado: aplicar técnicas para crear modelos |
| **A - Assess** | Evaluación: fiabilidad y utilidad de los modelos |

### Metodología CRISP-DM (estándar de la industria) ⭐

> [!important] Pregunta del parcial (Tema 2)
> "Enumere las etapas del CRISP-DM. ¿Cuál es la principal característica de las etapas? Diferencias CRISP-DM vs SEMMA."

**6 fases del CRISP-DM** (Cross-Industry Standard Process for Data Mining):

1. **Entender el Negocio** — comprender objetivos y requisitos desde perspectiva de negocio; convertir a problema de minería.
2. **Entender los Datos** — recopilación inicial, familiarización, identificación de problemas de calidad.
3. **Preparar los Datos (Selección + Preprocesamiento)** — selección, limpieza, construcción, integración. **Consume 70-80% del tiempo del proyecto.**
4. **Entrenamiento (Modelado)** — selección de técnicas, generación de escenarios de prueba, construcción y ajuste de modelos.
5. **Evaluación del Modelo** — evaluar que cumple objetivos de negocio; identificar problemas.
6. **Producción (Despliegue)** — implementación en producción, monitoreo, informes finales.

**Característica principal**: es un proceso **iterativo, cíclico y orientado al negocio**. Las flechas del diagrama son bidireccionales, permitiendo volver a fases anteriores.

### Comparación KDD vs SEMMA vs CRISP-DM ⭐

| Dimensión | **KDD** | **SEMMA** | **CRISP-DM** |
|---|---|---|---|
| Creador | Fayyad (académico, 1996) | SAS (propietario) | Consorcio industrial (1999) |
| Orientación | Descubrimiento de conocimiento | Técnica / herramienta SAS | Negocio + industria (agnóstico) |
| Inicio del proceso | Desde los datos (Selección) | Desde el muestreo (Sample) | Desde el negocio (Business Understanding) |
| Etapas | 6 (Selección → Limpieza → Transformación → Minería → Evaluación → Presentación) | 5 (Sample → Explore → Modify → Model → Assess) | 6 (Negocio → Datos → Preparación → Modelado → Evaluación → Despliegue) |
| Paso de negocio explícito | No | No | **Sí** (fase 1 obligatoria) |
| Despliegue/Producción | Implícito en "Presentación" | **No contempla** | **Sí** (fase 6) |
| Iteración | Sí, iterativo | Lineal / cíclico por herramienta | Cíclico con realimentación entre todas las fases |
| Uso actual | Base conceptual académica | Uso casi exclusivo en clientes SAS | **Estándar de facto** en la industria |

> [!tip] Diferencias clave a mencionar en el parcial
> - **KDD vs SEMMA**: KDD nace en el ámbito académico y enfatiza el **descubrimiento de conocimiento** (incluye presentación/interpretación); SEMMA es propietaria de SAS, más **técnica y operativa**, sin etapa explícita de interpretación hacia el negocio ni despliegue.
> - **CRISP-DM vs SEMMA**: CRISP-DM **incorpora la comprensión del negocio** (fase 1) y el **despliegue en producción** (fase 6), que SEMMA no contempla. CRISP-DM es agnóstica de herramienta; SEMMA está atada a SAS.

### Ciclo de vida moderno (Microsoft)

Propuesta más actual que extiende CRISP-DM: Business Understanding → Data Acquisition & Understanding → Modeling (Feature Engineering / Model Training / Model Evaluation) → Deployment → Customer Acceptance.

---

## 11. Análisis Exploratorio de Datos (EDA)

> [!quote] John Tukey (1977)
> "El análisis exploratorio de datos es una actitud, un estado mental y un conjunto de herramientas para examinar datos antes de aplicar métodos estadísticos confirmatorios."

### Definición NIST

EDA emplea variedad de técnicas (principalmente gráficas) para:
1. Maximizar la **visión** del conjunto de datos.
2. Descubrir **estructuras subyacentes**.
3. Extraer **variables importantes**.
4. Detectar **valores atípicos y anomalías**.
5. Probar **supuestos subyacentes**.

### Tipos de análisis exploratorio

Se combinan dos ejes: **cantidad de variables** (univariante / multivariante) × **representación** (gráfico / no gráfico).

| Tipo | Descripción | Ejemplo |
|---|---|---|
| **Univariante No Gráfico** | Estadística descriptiva de **una sola variable** | Media = 35, mediana = 34, desvío = 7, min = 18, max = 65 |
| **Univariante Gráfico** | Visualización de la distribución de una variable | Histograma, Boxplot (identifica outliers) |
| **Multivariante No Gráfico** | Relación entre **dos o más variables** con medidas estadísticas | Coeficiente de correlación de Pearson = 0.65 → correlación positiva moderada; tabla de contingencia |
| **Multivariante Gráfico** | Relación entre variables mediante gráficos | Scatter plot (ingreso vs gasto coloreado por género) |
| **Otros gráficos multivariantes** | Técnicas avanzadas con múltiples dimensiones | Heatmap de correlaciones, gráfico de burbujas, gráfico 3D, treemap |

### Tipos de visualizaciones según objetivo

- **Comparación**: barras (horizontal/vertical), tablas, áreas.
- **Relación**: dispersión (2 variables), burbujas (3 variables).
- **Distribución**: histograma, boxplot.
- **Composición**: barras apiladas, gráfico circular, mapa de árboles.

---

## 12. Python para métricas estadísticas ⭐

> [!important] Pregunta del parcial (ambos temas)
> "Enuncie qué librería y función de Python utilizaría para obtener métricas estadísticas de un dataframe."

### Respuesta: `pandas` y `DataFrame.describe()`

```python
import pandas as pd

# Cargar dataset en un DataFrame
df = pd.read_csv("pacientes.csv")

# Métricas estadísticas de columnas numéricas
df.describe()
```

**`df.describe()` devuelve** para cada columna numérica:

| Métrica | Significado |
|---|---|
| `count` | cantidad de valores no nulos |
| `mean` | media aritmética |
| `std` | desvío estándar |
| `min` | valor mínimo |
| `25%` | primer cuartil (Q1) |
| `50%` | mediana (Q2) |
| `75%` | tercer cuartil (Q3) |
| `max` | valor máximo |

**Variantes útiles**:
- `df.describe(include="all")` — incluye también columnas categóricas (frecuencia, valor más común, unique).
- `df.info()` — tipos de datos y nulos por columna.
- `df.corr()` — matriz de correlación entre variables numéricas (útil para EDA multivariante).
- `df.isna().sum()` — cantidad de valores faltantes por columna (completitud).

**Librerías complementarias**:
- **NumPy** — operaciones numéricas (media, desvío, percentiles).
- **SciPy.stats** — tests estadísticos.
- **Matplotlib / Seaborn** — visualizaciones (histogramas, boxplots, heatmaps).

---

## 13. Aprendizaje Supervisado vs No Supervisado

### Programación tradicional vs Machine Learning

| Programación tradicional | Machine Learning |
|---|---|
| Input: **Reglas + Datos** → Output: Respuestas | Input: **Respuestas + Datos** → Output: Reglas |

### Tipos de minería

| Tipo | Objetivo | Con etiquetas |
|---|---|---|
| **Descriptivo** | Identificar patrones, relaciones o estructuras subyacentes. Resumir y caracterizar propiedades generales. No predice, sintetiza. | Típicamente **no supervisado** |
| **Predictivo** | Usar datos históricos para construir modelos que predicen valores futuros o desconocidos. | **Supervisado** |

### Aprendizaje supervisado

Se proporcionan al modelo **datos etiquetados** (X → Y), con variable objetivo (target) conocida. El modelo aprende a predecir Y a partir de X.

### Aprendizaje no supervisado

Se proporciona información **sin etiquetar**; la máquina descubre por sí misma estructura/grupos. No hay variable target.

### Técnicas de Minería

```
Minería de Datos
├── Verificación → SQL, OLAP, Análisis Estadístico, AED
└── Descubrimiento
    ├── Descripción (no supervisado) → Visualización, Clustering, Reglas de Asociación, PCA
    └── Predicción (supervisado)
        ├── Regresión → Árboles de Regresión, Bayesiano, KNN
        └── Clasificación → Árboles de Decisión, Bayesiano, Random Forest, KNN
```

---

## 14. Evaluación de herramientas: Cuadrante Mágico de Gartner

Dos ejes para evaluar plataformas:
- **Eje X – Completitud de visión**: innovación, estrategia de producto, visión de mercado, diferenciación, capacidad para responder a tendencias futuras.
- **Eje Y – Capacidad de ejecución**: calidad del producto, facilidad de uso, soporte, ecosistema, base de clientes, implementación exitosa.

Cuatro categorías:

| | Alta ejecución | Baja ejecución |
|---|---|---|
| **Alta visión** | **Líderes** (Microsoft, Tableau, Qlik) | **Visionarios** (innovación fuerte, aún no ejecutan sólido) |
| **Baja visión** | **Retadores** (buena ejecución, menor innovación) | **Jugadores de Nicho** (soluciones limitadas) |

Existen dos cuadrantes relevantes para la materia:
- **Analytics & BI Platforms** (Tableau, Power BI, Qlik).
- **Data Science & Machine Learning Platforms (DSML)** (Databricks, Microsoft, Google, Dataiku, AWS).

---

## Mini-guía de respuesta al parcial teórico

> [!important] Cómo responder en el parcial
> Cada pregunta vale (7 preguntas = 7 puntos totales teóricos). **Justificar siempre.**

### Tema 1 — resumen de respuestas

1. **Top-Down — fortaleza**: integridad y consistencia de datos a nivel empresarial.
2. **Pipeline vs ETL**: pipeline es el concepto amplio (incluye streaming, análisis, múltiples destinos); ETL es un tipo específico con 3 etapas fijas para poblar un DWH.
3. **Enfoques de calidad de datos**: Reactivo (correcciones: limpieza de duplicados, corrección de incompletos) + Proactivo (prevención: reglas de validación, estandarización de formatos).
4. **ROLAP vs MOLAP**: ROLAP usa BD relacional con SQL en tiempo real; MOLAP usa cubos preprocesados multidimensionales; HOLAP combina ambos.
5. **Sistemas de decisiones**: Descriptivo (¿qué pasó?), Diagnóstico (¿por qué?), Predictivo (¿qué va a pasar?), Prescriptivo (¿qué hacer?).
6. **KDD**: 6 etapas (Selección → Limpieza → Transformación → Minería → Evaluación → Presentación). Iterativo, orientado al descubrimiento de conocimiento. Diferencia vs SEMMA: KDD académico/agnóstico con énfasis en interpretación; SEMMA propietaria SAS, más técnica, sin interpretación explícita.
7. **Python**: `pandas` + `df.describe()`.

### Tema 2 — resumen de respuestas

1. **Bottom-Up — fortaleza**: implementación rápida y entrega de valor temprana; menor riesgo y costo inicial.
2. **Pipeline vs ETL**: igual que Tema 1.
3. **Enfoques de calidad de datos**: igual que Tema 1.
4. **Data Vault**: Hubs (entidades centrales, similar a dimensiones), Links (relaciones, similar a tabla de hechos), Satélites (atributos descriptivos versionados, similar a columnas de dimensiones).
5. **Sistemas de decisiones**: igual que Tema 1.
6. **CRISP-DM**: 6 fases (Negocio → Datos → Preparación → Modelado → Evaluación → Producción). Iterativo, cíclico, orientado al negocio. Diferencias vs SEMMA: CRISP-DM incorpora Business Understanding (fase 1) y Deployment (fase 6) que SEMMA no tiene; CRISP-DM es agnóstica, SEMMA es SAS.
7. **Python**: `pandas` + `df.describe()`.

---

## Mini-guía para el práctico (Kimball)

> [!tip] Paso a paso para el ejercicio práctico
> 1. **Leer las preguntas de negocio** → identificar medidas y dimensiones requeridas.
> 2. **Aplicar los 6 pasos de Kimball**.
> 3. **Elegir estrella o copo de nieve** según pida el enunciado.
>    - **Tema 1** pide **Copo de Nieve** (Retail - Industria de Ventas y Abastecimiento).
>    - **Tema 2** pide **Copo de Nieve** (Industria Financiera - Atención al Cliente).
> 4. **Dibujar el diagrama**: tabla de hechos al centro, dimensiones alrededor con FKs; en copo de nieve, sub-dimensiones normalizadas.
> 5. **Detallar tablas** con campos, tipos y claves (PK/FK).
> 6. **Escribir las queries SQL** que responden cada pregunta de negocio (`GROUP BY` sobre dimensiones + `SUM/COUNT/AVG` sobre medidas).
> 7. **Validar**: cada pregunta del negocio debe poder responderse con una query al modelo.

### Checklist mental antes de entregar

- [ ] ¿La granularidad de la tabla de hechos es la más fina posible?
- [ ] ¿Todas las FKs de la tabla de hechos apuntan a una dimensión?
- [ ] ¿La tabla de hechos NO tiene atributos descriptivos (solo medidas + FKs)?
- [ ] ¿Dim_Tiempo incluye día, franja horaria, mes, año (si se piden análisis temporales)?
- [ ] En copo de nieve: ¿sub-dimensiones separadas cuando hay jerarquías claras (categoría → tipo)?
- [ ] ¿Queda una query ejemplo por cada pregunta de negocio?

### Casos resueltos para repasar

- [[Ejercicio - Cafetería Matutinto]] — modelo estrella, retail, 4 preguntas con queries
- [[Ejercicio - Hospital General UADE]] — modelo estrella, salud, 4 preguntas con queries

---

## Glosario rápido

| Término | Definición breve |
|---|---|
| **DIKW** | Data - Information - Knowledge - Wisdom: jerarquía del conocimiento |
| **Big Data (5V)** | Volumen, Velocidad, Variedad, Veracidad, Valor |
| **BI** | Business Intelligence: enfoque retrospectivo (¿qué pasó?) |
| **Data Science** | Enfoque prospectivo (¿qué pasará?) |
| **Diagrama de Conway** | CS ∩ Math/Stats ∩ Domain Knowledge = Data Science |
| **DWH** | Data Warehouse: repositorio central de datos integrados para análisis |
| **Data Mart** | Subconjunto del DWH orientado a un área de negocio específica |
| **Data Lake** | Repositorio de datos crudos en formato nativo |
| **Data Mesh** | Arquitectura organizacional descentralizada (datos como producto) |
| **OLTP** | Online Transaction Processing: base transaccional (operativa) |
| **OLAP** | Online Analytical Processing: base multidimensional (analítica) |
| **ETL / ELT** | Extract-Transform-Load / Extract-Load-Transform |
| **Granularidad** | Nivel de detalle más bajo de una tabla de hechos |
| **Hecho (fact)** | Medida numérica del proceso de negocio |
| **Dimensión** | Contexto descriptivo de los hechos |
| **KDD** | Knowledge Discovery in Databases (Fayyad, 1996) |
| **SEMMA** | Sample-Explore-Modify-Model-Assess (SAS) |
| **CRISP-DM** | Cross-Industry Standard Process for Data Mining |
| **EDA** | Exploratory Data Analysis (Tukey, 1977) |
| **KPI** | Key Performance Indicator |
| **CDO** | Chief Data Officer |
| **Data Steward** | Responsable de la calidad de datos de un dominio |
| **Golden Record** | Registro maestro consolidado tras deduplicación |
| **Linaje (lineage)** | Trazabilidad del dato desde origen hasta reporte |
