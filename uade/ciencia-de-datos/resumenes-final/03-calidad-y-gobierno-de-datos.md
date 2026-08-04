---
materia: Ciencia de Datos
clase: 3
fecha: 2026-03-27
bloque: Data Warehousing / Calidad y Gobierno
parcial: 1
tags:
  - resumen-final
  - ciencia-de-datos
  - calidad-de-datos
  - gobierno-de-datos
  - data-vault
  - data-lake
fuente: content/1-parcial/03-material-calidad-y-gobierno-de-datos.pdf
---

# Clase 3 — Calidad de Datos y Gobierno de Datos

## 1. Data Vault (Dan Linstedt)

**Concepto clave:** Metodología de modelado creada por **Dan Linstedt** para entornos empresariales complejos con **múltiples fuentes**, **cambios frecuentes** y necesidad de **trazabilidad histórica completa** (auditoría). Es el tercer modelo junto a Estrella y Copo de Nieve.

**Estructura básica — 3 componentes:**

| Componente | Qué contiene | Detalle |
|---|---|---|
| **Hubs** | Las **entidades centrales del negocio** (Cliente, Producto, Pedido) | Cada fila = una clave de negocio única |
| **Links** | Las **relaciones entre hubs** (ej: "Cliente compra Producto") | Modelan procesos y conexiones |
| **Satélites** | Los **atributos descriptivos e históricos** de hubs o links | Versionados para seguimiento temporal |

**Características clave:**
- **Separación de preocupaciones** — datos descriptivos separados de las relaciones.
- **Escalabilidad** — fácil incorporar nuevas fuentes sin remodelar.
- **Auditoría completa** — trazabilidad histórica de todos los cambios.
- **Flexibilidad** — adaptable a cambios en requisitos de negocio.

> [!tip] Para el parcial
> **Estrella** = rápido y simple para consultas. **Copo de Nieve** = normalizado, menos redundancia. **Data Vault** = auditoría + flexibilidad total ante múltiples fuentes que cambian mucho.

---

## 2. Flat Table / One Big Table (OBT)

**Concepto clave:** Una tabla "plana" que mezcla **hechos + atributos de dimensiones en un único dataset** (sin joins).

- **Flat Table** — típica en prototipos, reportes rápidos o exportaciones a Excel.
  - ✅ Ventaja: simplicidad para el usuario final (no requiere joins).
  - ❌ Desventaja: redundancia y poca escalabilidad.
- **One Big Table (OBT)** — término moderno, popular en data lakes y BigQuery. Combina en una sola tabla todas las entidades necesarias para el análisis; se genera con procesos ETL/ELT que "desnormalizan" dimensiones alrededor de una tabla de hechos.
  - ✅ Ventaja: excelente rendimiento para consultas analíticas (menos joins).
  - ❌ Desventaja: mucho consumo de espacio y dificultad para mantener la calidad cuando cambian atributos.

---

## 3. Data Lake

**Concepto clave:** Repositorio centralizado que almacena grandes volúmenes de datos **en bruto (raw data)** en su **formato nativo**.

- **Tipos de datos soportados:** estructurados (tablas, CSV), semiestructurados (JSON, XML, logs), no estructurados (imágenes, videos, textos).
- **Ejemplos:** logs de aplicaciones, imágenes médicas, datos de sensores IoT, redes sociales, PDFs.
- **Tecnologías típicas:** Hadoop (HDFS), Amazon S3, Azure Data Lake, Databricks.

> [!important] Data Lake vs Data Warehouse (¡suele preguntarse!)
> - **Data Warehouse:** datos **limpios, estructurados**, organizados en modelos dimensionales para análisis. (Schema-on-write)
> - **Data Lake:** datos **sin transformar** o mínimamente procesados, en formato nativo. (Schema-on-read)

---

## 4. Data Mesh

**Concepto clave:** **No es una tecnología**, sino una **arquitectura organizacional y filosófica**. Propone **descentralizar el manejo de datos**, asignando la propiedad a los equipos de dominio del negocio (marketing, ventas, logística).

**Principios clave:**
1. **Datos como producto** — cada dominio gestiona sus datos como un producto de calidad, con documentación, APIs y contratos claros.
2. **Propiedad descentralizada** — cada área es responsable de su data product, eliminando cuellos de botella centralizados.
3. **Infraestructura de autoservicio** — plataforma común para publicar y consumir datos sin depender de un equipo central.
4. **Gobernanza federada** — estándares comunes de seguridad y calidad, aplicados de manera distribuida.

> [!note] Diferencia clave
> **DW y Data Lake = centralizados** (todo en un repositorio). **Data Mesh = descentralizado** (cada dominio administra sus propios data products).

---

## 5. Definición de Calidad de Datos

> [!quote] Wang y Strong (1996) — *What Data Quality Means to Data Consumers*
> "La calidad de los datos se define como aquellos datos que son **aptos para ser utilizados según las necesidades de los consumidores** de la información."

**Tres ideas centrales de la definición:**
- **Enfoque en el usuario** — la calidad se mide desde la perspectiva del **consumidor** de la información, no solo desde lo técnico.
- **Aptitud para uso** (*fitness for use*) — los datos deben ser **adecuados para el propósito** específico que se requiere.
- **El contexto importa** — la calidad es **relativa al contexto** y a las necesidades de negocio específicas.

---

## 6. Criterios de Calidad (el "qué")

**Concepto clave:** Los **criterios** son las características abstractas o requisitos que los datos deben cumplir para ser "de alta calidad". Son el **"qué"** queremos evaluar. (Las **métricas** son el "cuánto" → sección 7.)

| Criterio | Definición |
|---|---|
| **Exactitud** | Grado en que los datos reflejan la realidad o fuente confiable |
| **Integridad** | Los datos deben ser exhaustivos; información incompleta puede ser inservible |
| **Pertinencia** | Los datos deben proporcionar lo que necesitás con un propósito claro |
| **Coherencia** | Los datos no deben contradecirse entre fuentes |
| **Accesibilidad** | Grado en que los datos están disponibles y utilizables cuando se necesitan |
| **Relevancia** | Idoneidad, valor e importancia que aportan los datos a los propósitos |

---

## 7. Métricas de Calidad (el "cuánto")

**Concepto clave:** Las métricas son la **implementación cuantitativa** de los criterios: el cálculo, fórmula o algoritmo que da un valor numérico.

| Métrica | Definición | Cómo se mide |
|---|---|---|
| **Completitud** | Grado en que **todos los atributos del dato están presentes**; mide ausencia de nulos/faltantes | `(Registros completos / Total) × 100` |
| **Coherencia** | Grado en que una pieza única de dato tiene el **mismo valor** a través de múltiples conjuntos | Validación cruzada entre fuentes |
| **Validez** | Fiabilidad: integridad y exactitud según **reglas de negocio** definidas | Conformidad con reglas y formatos |
| **Unicidad** | Todos los valores distintos aparecen **solo una vez** | Detección y eliminación de duplicados |
| **Integridad** | Correctitud y completitud, incluyendo **relaciones entre entidades** | Integridad referencial mantenida |
| **Vigencia** | Si los datos están disponibles cuando se requieren y **actualizados** | Freshness / actualidad de datos |

> [!tip] Criterio vs Métrica (concepto que puede caer)
> **Criterio = qué** querés lograr (abstracto). **Métrica = cuánto** lo lográs (número). Ej: criterio "integridad" → métrica "completitud = 98%".

---

## 8. Tipos de datos que afectan la calidad

| Tipo | Qué es | Ejemplo |
|---|---|---|
| **Datos no útiles** | Generados por la operación pero **sin finalidad** específica ni valor | Logs de sistema sin propósito analítico, campos de formulario nunca usados |
| **Datos "sucios"** | **Inválidos o incorrectos** que al usarse generan daño importante | Direcciones mal escritas, teléfonos inválidos, valores fuera de rango |
| **Datos no estructurados** | Disponibles pero **no preparados para su uso**; deben "enriquecerse" | PDFs sin metadatos, imágenes sin etiquetar, texto libre sin procesar |

> [!warning] Impacto en el negocio
> Estos datos problemáticos generan **decisiones erróneas**, pérdida de oportunidades, **costos operativos** incrementados y daño a la reputación. La identificación temprana es clave.

---

## 9. Gestión de la Calidad — Reactivo vs Proactivo

**Concepto clave:** Dos enfoques complementarios para gestionar la calidad.

| **Aspectos Reactivos (Correcciones)** | **Aspectos Proactivos (Prevención)** |
|---|---|
| Acciones **después de detectar** un problema; reparan datos ya defectuosos | Acciones **antes de que ocurran** los problemas; previenen errores desde el origen |
| Limpieza de duplicados en bases de clientes | Definir reglas de validación al cargar datos |
| Corrección de registros incompletos | Estandarizar formatos (fechas ISO, emails) |
| Normalización de direcciones mal escritas | Implementar catálogo de datos con definiciones |
| Monitoreo con reportes de inconsistencias | Capacitar usuarios en captura correcta |

> [!important] Rol de la gobernanza
> La **gobernanza de datos** establece el marco que **equilibra ambos enfoques**: expectativas de calidad, responsabilidades, políticas, estándares y procesos de mejora continua. (Conecta con la sección 13.)

---

## 10. Estrategias — Valores Faltantes

| Estrategia | Cuándo usarla | Detalle |
|---|---|---|
| **1. Eliminación** | < 5% de datos faltantes · variable objetivo ausente | Riesgo de pérdida de información |
| **2. Imputación simple** | Rellenar con un estadístico | **Media** (distribuciones normales), **Mediana** (datos sesgados), **Moda** (categóricas) |
| **3. Imputación predictiva** | Máxima precisión | Algoritmos **KNN / Regresión**; mayor costo computacional |

---

## 11. Estrategias — Valores Duplicados

| Estrategia | Qué hace |
|---|---|
| **Clave primaria y timestamp** | Mantener solo el registro **más reciente** por marca de tiempo, para claves primarias idénticas |
| **Fuzzy Matching y Golden Record** | Identificar similitudes (ej: **Levenshtein** 95%+) y consolidar en un "Registro Maestro" (**Golden Record**) usando distancias de edición |
| **Deduplicación por agrupación** | Agrupar duplicados y crear un **registro sintético** con la mejor información disponible de cada uno |

---

## 12. Estrategias — Valores Atípicos (Outliers)

> [!info] Definición de Outlier
> Datos que se **alejan drásticamente** del comportamiento normal.

| Estrategia | Qué hace | Detalle |
|---|---|---|
| **Trimming (recorte)** | Eliminar valores extremos | Rango percentil P1–P99; reduce tamaño de muestra |
| **Winsorización** | **Reemplazar** extremos por límites | Ajuste a bigotes del diagrama de caja; mantiene los registros originales |
| **Transformación logarítmica** | Reducir el impacto de valores altos | Preserva todos los registros; maneja asimetría de datos |

> [!tip] Diferencia clave
> **Trimming elimina** filas; **Winsorización y log transforman** pero **conservan** todas las filas.

---

## 13. Gobierno de Datos — Marco estratégico

> [!quote] Definición
> Conjunto de **políticas, procesos, roles y tecnologías** que aseguran que los datos sean gestionados como un **activo estratégico**.

- **Objetivo:** garantizar que los datos sean **confiables, consistentes, accesibles y seguros**, alineados con las necesidades del negocio.
- **Idea central:** el gobierno de datos transforma los datos de un recurso pasivo a un **activo estratégico** que impulsa la toma de decisiones.

**Relación con la calidad de datos:**
- **Define criterios** — estándares de calidad (exactitud, completitud, consistencia) para toda la organización.
- **Métricas e indicadores** — KPIs medibles para evaluar y monitorear la calidad de forma continua.
- **Responsabilidades claras** — roles definidos: **Data Owners**, **Data Stewards**, **CDO** (Chief Data Officer).
- **Mejora continua** — procesos de monitoreo y ciclos de mejora.

---

## 14. Componentes y Beneficios del Gobierno

**Componentes clave:**
- **Políticas y estándares** — reglas claras sobre definición, uso, seguridad y calidad.
- **Roles y responsabilidades** — quién mantiene la calidad: Data Steward, CDO, Data Owners.
- **Procesos** — detección, corrección y prevención de problemas.
- **Tecnología de soporte** — herramientas de data quality, **data catalog** y **lineage** (linaje).

**Beneficios esperados:**
- **Mejora en la toma de decisiones** — datos confiables → decisiones más acertadas.
- **Reducción de costos** — menos duplicidad, menos errores operativos.
- **Cumplimiento normativo** — facilita GDPR, Ley de Protección de Datos y otras regulaciones.
- **Confianza organizacional** — impulsa la confianza en los datos como activo estratégico.

---

## Mapa de conceptos de la clase

- **Arquitecturas:** **Data Vault** (Hubs/Links/Satélites, Linstedt, auditoría) · **Flat Table/OBT** (una sola tabla, sin joins) · **Data Lake** (raw, formato nativo) · **Data Mesh** (descentralizado, datos como producto).
- **Calidad (Wang & Strong):** aptitud para uso desde el consumidor.
- **Criterios (qué):** exactitud, integridad, pertinencia, coherencia, accesibilidad, relevancia.
- **Métricas (cuánto):** completitud, coherencia, validez, unicidad, integridad, vigencia.
- **Datos problemáticos:** no útiles, sucios, no estructurados.
- **Gestión:** reactivo (corregir) vs proactivo (prevenir).
- **Estrategias:** faltantes (eliminación/imputación) · duplicados (golden record) · outliers (trimming/winsorización/log).
- **Gobierno:** políticas + roles (CDO, Data Steward, Data Owner) + procesos + tecnología (catalog, lineage). Datos = activo estratégico.
