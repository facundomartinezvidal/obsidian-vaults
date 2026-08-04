---
materia: Ciencia de Datos
tema: 2
bloque: Data Warehousing
tags:
  - resumen-final
  - ciencia-de-datos
  - data-warehouse
  - olap
  - data-lake
  - data-mesh
  - data-vault
---

# Tema 2 — Arquitectura y almacenamiento de datos

## 1. Tubería de datos y ETL vs ELT

Una tubería de datos, o *data pipeline*, es un flujo continuo y automatizado de procesamiento que conduce los datos desde su fuente hasta su destino, transformándolos de un estado bruto en un resultado útil. Conviene subrayar que un pipeline no se limita a transformar: también abarca el análisis, el modelado y el envío de la información a múltiples destinos, idealmente en tiempo real y de manera escalable. Este recorrido se articula en cuatro etapas encadenadas:

- **Ingesta** — define de qué fuente provienen los datos, con qué estructura y a qué velocidad llegan.
- **Almacenamiento** — decide si el repositorio será centralizado o distribuido, relacional (SQL) o no relacional (NoSQL) y cómo se gestiona la replicación.
- **Procesamiento** — determina el tipo de datos, la ventana temporal considerada y la naturaleza de los resultados.
- **Reporte** — establece la forma de visualización, la interacción esperada y el tiempo de respuesta admisible.

Dentro de este esquema, la distinción entre ETL y ELT es uno de los puntos que más suele preguntarse, y la clave para diferenciarlos está en *dónde* ocurre la transformación:

- **ETL (Extract, Transform, Load)** — los datos se transforman en un servidor intermedio antes de llegar al destino, lo que resulta ideal cuando la privacidad es crítica y exige anonimización, o cuando el destino dispone de poca capacidad de cómputo.
- **ELT (Extract, Load, Transform)** — carga primero los datos crudos en el destino y los transforma allí, aprovechando la potencia de motores modernos como BigQuery o Snowflake; por esa razón constituye la tendencia actual en Ciencia de Datos.

A la ubicación de la transformación se suma la decisión sobre la latencia y la frecuencia, que depende de qué tan "fresca" deba estar la información:

- **Batch (por lotes)** — se ejecuta en intervalos definidos —cada hora, cada noche— y resulta eficiente para grandes volúmenes de datos históricos.
- **Streaming (tiempo real)** — actúa apenas se generan los datos, como en las transacciones bancarias o los sensores IoT, y requiere infraestructuras como Kafka o AWS Kinesis.

Entre las herramientas mencionadas en clase para implementar estos flujos figuran Microsoft Fabric, SSIS (Integration Services) y dbt, que orquesta transformaciones SQL mediante funciones como `ref()` y `source()`.

## 2. El Data Warehouse: definición, objetivos y arquitectura

Ralph Kimball definió el Data Warehouse (DWH) en *The Data Warehouse Toolkit* (1996) como "una copia de los datos transaccionales específicamente estructurada para consulta y análisis". De esa definición se desprenden los cuatro rasgos que lo caracterizan:

- **Orientado al usuario final** — se construye desde sus necesidades, de modo que analistas y ejecutivos accedan con facilidad a los datos para decidir.
- **Orientado a la dimensión** — los datos se organizan alrededor de hechos —como las ventas— y de dimensiones que aportan contexto, como el cliente, el producto o el tiempo.
- **Accesible y optimizado** — está pensado para consultas rápidas, para lo cual se modela en esquemas estrella o copo de nieve que facilitan la navegación y el análisis.
- **Incremental** — se desarrolla de forma modular, incorporando poco a poco nuevas áreas de negocio, como ventas, marketing o inventario.

En términos de flujo, el DWH recibe datos de fuentes operacionales (CRM, ERP, Supply Chain) que atraviesan un proceso ETL antes de quedar disponibles para los usuarios finales a través de análisis OLAP, minería de datos y reporting.

La construcción de un DWH se justifica por tres objetivos centrales que se refuerzan entre sí:

- **Integración** — consolida datos de múltiples fuentes heterogéneas en un único repositorio, eliminando los silos de información y ofreciendo una vista unificada del negocio.
- **Historial de datos** — mantiene un registro completo a lo largo del tiempo, lo que habilita el análisis temporal, de evolución y las comparativas.
- **Soporte a decisiones** — provee información consolidada y estructurada que permite decidir de forma informada y ágil.

Ahora bien, el DWH no es únicamente la base de datos, sino un conjunto de componentes que trabajan de manera coordinada:

- **Proceso ETL** — extrae, transforma y carga la información desde los sistemas operacionales.
- **SQL** — es el lenguaje estándar para consultar y manipular los datos ya cargados.
- **Metadata** — entendida como "datos sobre los datos", documenta definiciones, linaje y calidad.
- **Capa de datos (*data layer*)** — organiza el almacenamiento.
- **Gobernanza y seguridad** — sus políticas velan por la calidad y la protección de la información.
- ***Data access tools*** — las herramientas de BI, reporting y análisis ponen todo ese trabajo a disposición de los usuarios finales.

## 3. Modelado dimensional: hechos y dimensiones

Los modelos de un DWH están diseñados específicamente para el análisis y el reporting, es decir, optimizados para consultas analíticas y para comprender tendencias a lo largo del tiempo. Este propósito se sostiene sobre dos tipos de tabla complementarios:

- **Tabla de hechos (*fact table*)** — es la tabla central del modelo y contiene las métricas o eventos de negocio que se quieren analizar, combinando claves foráneas hacia las dimensiones con medidas numéricas; suele tener muchas filas, como ocurre con las ventas o las visitas web.
- **Tablas de dimensiones (*dimension tables*)** — almacenan los atributos que aportan contexto a los hechos —cliente, producto, tiempo, ubicación—, son de carácter descriptivo y resultan menos propensas a cambiar.

La regla mental para no confundirlas es directa: los hechos son lo que se mide, esto es, los números; las dimensiones son el contexto, es decir, el quién, el qué, el cuándo y el dónde. Si se trata de un número que se suma, es un hecho; si es una etiqueta por la que se agrupa o se filtra, es una dimensión.

## 4. Estrategias de diseño: Top-Down vs Bottom-Up

Históricamente han convivido dos filosofías para construir un DWH, asociadas a los dos autores de referencia de la disciplina:

- **Top-Down (Bill Inmon, 1992)** — propone construir desde el inicio un Data Warehouse empresarial completo y normalizado. Su ventaja reside en la integridad y la consistencia a nivel empresarial junto con una menor redundancia, aunque a costa de mayor tiempo, mayor costo y una necesidad más alta de recursos y planificación.
- **Bottom-Up (Ralph Kimball, 1996)** — plantea construir primero *Data Marts* específicos por área que luego se integran entre sí. Esto permite una implementación rápida con resultados tempranos y un menor riesgo y costo inicial, si bien puede generar inconsistencias entre Data Marts y una mayor redundancia.

En los proyectos actuales predomina el enfoque Bottom-Up de Kimball, precisamente por su agilidad y por su capacidad de entregar valor con rapidez.

## 5. Esquemas de modelado: Estrella, Copo de Nieve y Data Vault

Para plasmar el modelo dimensional existen tres esquemas de referencia. El esquema estrella y el de copo de nieve parten ambos de la lógica de hechos y dimensiones, mientras que Data Vault constituye una tercera metodología, concebida para la trazabilidad y la integración de múltiples fuentes.

El **esquema estrella** (*star schema*) organiza una tabla de hechos central rodeada por varias tablas de dimensiones, con relaciones habitualmente de uno a muchos entre hechos y dimensiones. Al tratarse de tablas no normalizadas, ofrece alta performance a cambio de cierta redundancia de datos. En el ejemplo trabajado en clase, la tabla `Fact_Sales` aparece rodeada por `DIM_Company`, `DIM_Sales_Type`, `DIM_Sales_Rep`, `Dim_Time` y `DIM_Product`, y contiene las claves foráneas hacia cada dimensión junto con medidas como `Items_sold` y `Sales_amount`. Su balance de ventajas y desventajas es el siguiente:

- **Ventajas** — las consultas resultan más simples —menos *joins* y mejor rendimiento— y su lógica es intuitiva para los usuarios de negocio.
- **Desventajas** — introduce redundancia al duplicar datos descriptivos en las dimensiones y exige mayor esfuerzo de mantenimiento cuando cambian atributos jerárquicos como categorías o regiones.

El **esquema copo de nieve** (*snowflake schema*) es similar al estrella, pero normaliza las dimensiones descomponiéndolas en sub-dimensiones. Siguiendo el mismo ejemplo, `Dim_Time` se despliega en `DIM_Week`, `DIM_Month` y `DIM_Year`; `DIM_Product` en `DIM_Product_Type` y `DIM_Product_Category`; y `DIM_Company` pasa a referenciar `DIM_Industry`. Su contrapartida frente al estrella es la inversa:

- **Ventajas** — la normalización reduce la redundancia y mejora el mantenimiento ante cambios en los atributos jerárquicos.
- **Desventajas** — vuelve las consultas más complejas —más *joins* y peor performance— y resulta menos intuitivo, pudiendo degradar el rendimiento en el análisis OLAP.

Finalmente, **Data Vault**, creado por Dan Linstedt, es una metodología pensada para entornos empresariales complejos, con múltiples fuentes, cambios frecuentes y una necesidad de trazabilidad histórica completa con fines de auditoría. Su estructura se apoya en tres componentes:

- ***Hubs*** — representan las entidades centrales del negocio —Cliente, Producto, Pedido—, donde cada fila corresponde a una clave de negocio única.
- ***Links*** — modelan las relaciones entre hubs, como "Cliente compra Producto", capturando así los procesos y conexiones.
- ***Satélites*** — almacenan los atributos descriptivos e históricos de hubs o links, versionados para el seguimiento temporal.

Esta arquitectura logra una clara separación de preocupaciones al aislar los datos descriptivos de las relaciones, escala con facilidad porque permite incorporar nuevas fuentes sin remodelar lo existente, garantiza una auditoría completa mediante la trazabilidad de todos los cambios y ofrece flexibilidad para adaptarse a nuevos requisitos de negocio.

La siguiente tabla sintetiza los tres esquemas, comparación genuinamente tabular por tratarse de alternativas equivalentes evaluadas sobre los mismos criterios:

| Esquema | Normalización | Rendimiento y uso |
|---|---|---|
| **Estrella** | Desnormalizado | Simple y rápido, con redundancia; el más usado en la práctica |
| **Copo de Nieve** | Normalizado | Prolijo y sin redundancia, pero con más *joins* y más lento |
| **Data Vault** | Basado en Hubs/Links/Satélites | Auditoría y flexibilidad total ante múltiples fuentes que cambian mucho |

## 6. Implementación según Kimball: los seis pasos

La metodología de Kimball ofrece una receta paso a paso para diseñar un modelo dimensional, y es precisamente el método que corresponde aplicar en el práctico del parcial. El proceso se ordena en seis pasos encadenados:

1. **Seleccionar el proceso de negocio** — acotar el alcance a un fenómeno medible y repetible como "ventas de productos" o "envíos logísticos".
2. **Declarar la granularidad** — definir el detalle más bajo que registrará el modelo —por ejemplo, una fila por venta individual y no por mes ni por producto agregado—, decisión crítica porque condiciona tanto las dimensiones como las medidas.
3. **Identificar las dimensiones** — las que aportan contexto a las medidas, como `Dim_Fecha`, `Dim_Producto` y `Dim_Cliente` en el caso de ventas, asignando una clave primaria a cada una.
4. **Identificar las medidas o hechos** — los valores numéricos que se analizarán —cantidad vendida, precio unitario, total de la venta—, procurando que sean agregables y semánticamente claros.
5. **Crear la tabla de hechos** — debe contener las claves foráneas hacia las dimensiones y las medidas numéricas, pero ningún atributo descriptivo, ya que estos pertenecen a las dimensiones.
6. **Conectar los elementos y dibujar el diagrama** — con los hechos en el centro y las dimensiones alrededor, de modo que las flechas vayan siempre desde la clave primaria de cada dimensión hacia la clave foránea correspondiente en la tabla de hechos.

## 7. OLAP: procesamiento analítico en línea

OLAP (Online Analytical Processing) es una tecnología optimizada para realizar análisis complejos a gran velocidad. A diferencia de las bases transaccionales u OLTP, permite consultar los datos desde distintas perspectivas de manera multidimensional, lo que se materializa en el concepto de cubo. El cubo OLAP es el resultado de un proceso que toma datos de bases relacionales —de una única dimensión, propias del mundo OLTP—, los transforma y los almacena en bases multidimensionales. En el ejemplo de clase, el cubo combinaba las dimensiones Producto (vino o agua), Mercado (provincia o ciudad) y Tiempo (años 1999 a 2001), de manera que cada celda del cubo representa un dato.

Sobre esa estructura multidimensional se aplican cuatro operaciones que suelen ser objeto de examen:

- ***Drill-Down*** — desglosa la información para ver más detalle, por ejemplo pasando de "país" a "ciudad".
- ***Roll-Up*** — realiza el movimiento inverso, agregando datos al subir en la jerarquía, como al pasar de ventas por "día" a ventas por "año".
- ***Slice*** — "rebana" el cubo seleccionando una sola dimensión para un subconjunto, como las ventas de un único año.
- ***Dice*** — extrae un subcubo cruzando varias dimensiones a la vez, por ejemplo las ventas de "zapatillas" en "Buenos Aires" durante el "Q1".

Conviene tener presente que la diapositiva intercambia las etiquetas de Drill-Down y Roll-Up respecto de la definición estándar, por lo que lo prudente es retener la lógica: Drill-Down implica más detalle y Roll-Up implica más agregación.

La tecnología OLAP admite tres variantes según cómo gestione el almacenamiento:

- **MOLAP (Multidimensional)** — emplea cubos preprocesados en una base de datos especializada y está optimizado para el análisis rápido.
- **ROLAP (Relational)** — opera directamente sobre bases relacionales mediante SQL, generando las consultas de forma dinámica en tiempo real.
- **HOLAP (Hybrid)** — combina ambos enfoques, apoyándose en cubos preprocesados para los agregados y en SQL para el detalle.

Todo este esquema se inscribe, según la última diapositiva, en una arquitectura de tres capas: una capa inferior (*bottom tier*) con las fuentes y bases operacionales que alimentan el Data Warehouse y sus Data Marts; una capa intermedia (*middle tier*) ocupada por el servidor OLAP; y una capa superior (*top tier*) donde residen las herramientas de minería de datos, reporting, análisis y consulta.

## 8. Otras arquitecturas modernas

Más allá del DWH clásico, han surgido enfoques modernos de almacenamiento y organización de datos que conviene conocer. El primero de ellos es la tabla plana o *One Big Table* (OBT), que consiste en una única tabla donde se mezclan hechos y atributos de dimensiones en un solo dataset, evitando así los *joins*. En su versión más simple, la *flat table*, resulta típica de prototipos, reportes rápidos o exportaciones a Excel, y ofrece la ventaja de la simplicidad para el usuario final a costa de la redundancia y de una escasa escalabilidad. El término moderno One Big Table, popular en data lakes y en BigQuery, combina en una sola tabla todas las entidades necesarias para el análisis y se genera mediante procesos ETL/ELT que "desnormalizan" las dimensiones alrededor de una tabla de hechos; su gran fortaleza es el excelente rendimiento en consultas analíticas gracias a la reducción de *joins*, aunque implica un elevado consumo de espacio y dificulta el mantenimiento de la calidad cuando cambian los atributos.

Un segundo enfoque es el Data Lake, un repositorio centralizado que almacena grandes volúmenes de datos en bruto (*raw data*) conservando su formato nativo. Soporta datos estructurados como tablas o CSV, semiestructurados como JSON, XML o logs, y no estructurados como imágenes, videos o textos, lo que lo hace apto para casos tan diversos como logs de aplicaciones, imágenes médicas, datos de sensores IoT, redes sociales o PDFs; sus tecnologías características incluyen Hadoop (HDFS), Amazon S3, Azure Data Lake y Databricks. La diferencia con el Data Warehouse, que suele preguntarse, es conceptual: el DWH guarda datos limpios y estructurados, organizados en modelos dimensionales para el análisis, bajo un esquema *schema-on-write*; el Data Lake, en cambio, conserva datos sin transformar o mínimamente procesados en su formato nativo, aplicando el esquema recién al momento de leerlos (*schema-on-read*).

El tercer enfoque, el Data Mesh, no es una tecnología sino una arquitectura organizacional y filosófica que propone descentralizar el manejo de datos, asignando su propiedad a los equipos de dominio del negocio, como marketing, ventas o logística. Se sostiene sobre cuatro principios:

- **Datos como producto** — cada dominio gestiona sus datos como un producto de calidad con documentación, APIs y contratos claros.
- **Propiedad descentralizada** — responsabiliza a cada área de su *data product* y elimina los cuellos de botella centralizados.
- **Infraestructura de autoservicio** — ofrece una plataforma común para publicar y consumir datos sin depender de un equipo central.
- **Gobernanza federada** — aplica estándares comunes de seguridad y calidad de manera distribuida.

La distinción de fondo es clara: tanto el Data Warehouse como el Data Lake son centralizados, ya que concentran todo en un único repositorio, mientras que el Data Mesh es descentralizado, porque cada dominio administra sus propios data products.

## 9. Análisis de requerimientos

El diseño de un DWH exige, antes de cualquier construcción, un análisis exhaustivo de las necesidades, las fuentes y los objetivos del negocio, que es lo que en última instancia garantiza el éxito del proyecto. Este análisis se despliega en cinco pasos encadenados:

1. **Identificar a los stakeholders** — usuarios finales, analistas, ejecutivos y equipos técnicos.
2. **Recopilar requerimientos** — sus requerimientos de negocio y necesidades de información, mediante encuestas y entrevistas.
3. **Análisis de fuentes** — identifica los sistemas operacionales, bases de datos, APIs y archivos disponibles.
4. **Definir los KPIs** — los indicadores clave de rendimiento y las métricas de negocio relevantes.
5. **Documentación** — reúne las especificaciones técnicas, los modelos de datos y los procesos ETL.