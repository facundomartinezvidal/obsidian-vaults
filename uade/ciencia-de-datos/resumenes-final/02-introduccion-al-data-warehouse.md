---
materia: Ciencia de Datos
clase: 2
fecha: 2026-03-20
bloque: Data Warehousing
parcial: 1
tags:
  - resumen-final
  - ciencia-de-datos
  - data-warehouse
  - modelo-dimensional
  - olap
fuente: content/1-parcial/02-material-data-warehouse.pdf
---

# Clase 2 — Introducción al Data Warehouse

## 1. Tubería de datos (Data Pipeline) y ETL vs ELT

**Concepto clave:** Un **pipeline** es un flujo continuo y **automatizado** de procesamiento que lleva los datos desde la fuente hasta el destino, transformándolos de estado bruto a resultado útil. No es solo transformar: incluye análisis, modelado y envío a múltiples destinos en tiempo real y de forma escalable.

**Cuatro etapas del pipeline:**
1. **Ingesta** — fuente de datos, estructuras, velocidad.
2. **Almacenamiento** — centralizado o distribuido, SQL o NoSQL, replicación.
3. **Procesamiento** — tipo de datos, ventana temporal, tipo de resultados.
4. **Reporte** — tipo de visualización, interacción esperada, tiempo de respuesta.

> [!important] ETL vs ELT (¡suele preguntarse!)
> La diferencia está en **dónde** se transforma.
> - **ETL (Extract, Transform, Load):** se transforma en un servidor intermedio **antes** de llegar al destino. Ideal cuando la **privacidad es crítica** (anonimización) o el destino tiene poca capacidad de cómputo.
> - **ELT (Extract, Load, Transform):** se cargan los datos crudos al destino y se transforman **allí**, aprovechando motores modernos (BigQuery, Snowflake). Es la **tendencia actual** en Data Science.

**Latencia y frecuencia (según qué tan "fresca" deba estar la info):**
- **Batch (lotes):** corre en intervalos (cada hora, cada noche). Eficiente para grandes volúmenes históricos.
- **Streaming (tiempo real):** procesa apenas se generan los datos (transacciones bancarias, sensores IoT). Requiere Kafka o AWS Kinesis.

**Herramientas de ejemplo (de la clase):** Microsoft Fabric, SSIS (Integration Services), dbt (SQL con `ref()`/`source()`).

---

## 2. ¿Qué es un Data Warehouse?

> [!quote] Definición de Kimball
> "Una copia de los datos transaccionales específicamente estructurada para consulta y análisis." — Ralph Kimball, *The Data Warehouse Toolkit* (1996)

**Cuatro rasgos de un DWH (según la clase):**
1. **Construido desde las necesidades del usuario final** — el objetivo es que analistas y ejecutivos accedan fácil a los datos para decidir.
2. **Orientado a la dimensión** — los datos se organizan alrededor de **hechos** (ej: ventas) y **dimensiones** (cliente, producto, tiempo).
3. **Accesible y optimizado para consultas rápidas** — se modela en esquemas estrella o copo de nieve para facilitar navegación y análisis.
4. **Incremental** — se desarrolla de forma modular, agregando poco a poco áreas de negocio (ventas, marketing, inventario).

**Diagrama típico (flujo):** fuentes (CRM, ERP, Supply Chain) → **ETL** → **Data Warehouse** → usuarios (OLAP Analysis, Data Mining, Reporting).

---

## 3. Objetivos del Data Warehouse

| Objetivo | Qué hace | Beneficio |
|---|---|---|
| **Integración** | Consolida datos de múltiples fuentes heterogéneas en un único repositorio, eliminando **silos de información** | Vista unificada del negocio |
| **Historial de datos** | Mantiene registro histórico completo a lo largo del tiempo | Análisis temporal, de evolución y comparativas |
| **Soporte a decisiones** | Provee información consolidada y estructurada para decidir | Decisiones informadas y ágiles |

---

## 4. Arquitectura y componentes del DWH

**Concepto clave:** El DWH no es solo la base; es un conjunto de componentes que trabajan juntos.

- **ETL** — extracción, transformación y carga desde fuentes operacionales.
- **SQL** — lenguaje estándar para consultar y manipular datos en el warehouse.
- **Metadata** — "datos sobre los datos": definiciones, **linaje**, calidad.
- **Data Layer** — capa de datos.
- **Gobernanza y Seguridad** — políticas de gobernanza, seguridad y calidad de datos.
- **Data Access Tools** — herramientas de BI, reporting y análisis para usuarios finales.

---

## 5. Modelado dimensional — Hechos y Dimensiones

**Concepto clave:** Los modelos del DWH están **diseñados para análisis y reporting**, optimizados para consultas analíticas y para entender tendencias en el tiempo. Se apoyan en dos tipos de tabla.

| Tipo de tabla | Qué contiene | Ejemplo | Características |
|---|---|---|---|
| **Tabla de Hechos** (Fact Table) | Métricas o eventos de negocio que se quieren analizar. **Claves foráneas** a las dimensiones + **medidas numéricas** | Ventas, visitas web | Central; muchas filas |
| **Tablas de Dimensiones** (Dimension Tables) | Atributos que dan **contexto** a los hechos | Cliente, Producto, Tiempo, Ubicación | Descriptivas, menos propensas a cambiar |

> [!tip] Regla mental
> Los **hechos** = lo que medís (números). Las **dimensiones** = el contexto (el quién/qué/cuándo/dónde). Si es un número que sumás → hecho. Si es una etiqueta por la que agrupás/filtrás → dimensión.

---

## 6. Estrategias de diseño — Top-Down vs Bottom-Up

**Concepto clave:** Dos filosofías históricas para construir el DWH, de los dos autores de referencia.

| | **Top-Down** — Bill Inmon (1992) | **Bottom-Up** — Ralph Kimball (1996) |
|---|---|---|
| **Enfoque** | Construir un DWH empresarial completo y **normalizado** desde el inicio | Construir **Data Marts** específicos por área, que luego se integran |
| **Ventajas** | Integridad y consistencia a nivel empresarial · menor redundancia | Implementación rápida y resultados tempranos · menor riesgo y costo inicial |
| **Desventajas** | Mayor tiempo y costo · requiere más recursos y planificación | Posible inconsistencia entre Data Marts · mayor redundancia |

> [!important] Recomendación de la clase
> El enfoque **Bottom-Up de Kimball** es más popular en proyectos actuales por su **agilidad** y entrega de valor rápido.

---

## 7. Esquema Estrella (Star Schema)

**Concepto clave:** Una **tabla de hechos central** rodeada por varias tablas de dimensiones. Las relaciones hechos↔dimensiones son típicamente de **uno a muchos**. Tablas **no normalizadas**, alta performance, con redundancia de datos.

**Ejemplo de la clase (`Fact_Sales`):** rodeada por `DIM_Company`, `DIM_Sales_Type`, `DIM_Sales_Rep`, `Dim_Time`, `DIM_Product`. La fact tiene las FK a cada dimensión + medidas (`Items_sold`, `Sales_amount`).

| ✅ Ventajas | ❌ Desventajas |
|---|---|
| Consultas más simples (menos joins, mejor performance) | Mayor redundancia (datos descriptivos duplicados en dimensiones) |
| Intuitivo para usuarios de negocio | Mayor esfuerzo de mantenimiento si cambian atributos jerárquicos (categorías, regiones) |

---

## 8. Esquema Copo de Nieve (Snowflake Schema)

**Concepto clave:** Similar al estrella, pero las dimensiones se **normalizan** en sub-dimensiones. Más complejo, reduce redundancia, pero las consultas pueden requerir más joins.

**Ejemplo de la clase:** `Dim_Time` se descompone en `DIM_Week`, `DIM_Month`, `DIM_Year`; `DIM_Product` en `DIM_Product_Type` y `DIM_Product_Category`; `DIM_Company` referencia a `DIM_Industry`.

| ✅ Ventajas | ❌ Desventajas |
|---|---|
| Menos redundancia (datos normalizados, sin duplicación) | Consultas más complejas (más joins, peor performance) |
| Mejor mantenimiento ante cambios en atributos jerárquicos | Menos intuitivo; puede degradar rendimiento en análisis OLAP |

> [!tip] Estrella vs Copo de Nieve (para el parcial)
> **Estrella** = desnormalizado, simple, rápido, redundante → el más usado en la práctica.
> **Copo de Nieve** = normalizado, prolijo, sin redundancia, pero más joins y más lento.

---

## 9. Implementación según Kimball (los 6 pasos)

**Concepto clave:** La receta paso a paso para diseñar un modelo dimensional. **Este es el método a aplicar en el práctico del parcial.**

1. **Seleccionar el proceso de negocio** — acotar el alcance. Ej: "Ventas de productos" o "Envíos logísticos". *Tip: proceso medible y repetible.*
2. **Declarar el nivel de granularidad** — definir el nivel más bajo de detalle. Ej: una fila **por venta individual**, no por mes ni por producto agregado. *Crítico: determina dimensiones y medidas.*
3. **Identificar las dimensiones** — el "contexto" de las medidas. Ej para Ventas: `Dim_Fecha`, `Dim_Producto`, `Dim_Cliente`. *Clave primaria en cada dimensión.*
4. **Identificar las medidas (hechos)** — los valores numéricos que se analizan. Ej: cantidad vendida, precio unitario, total venta. *Medidas agregables y semánticas.*
5. **Crear la tabla de hechos** — debe contener: claves foráneas a dimensiones + medidas numéricas + **sin atributos descriptivos** (esos van en las dimensiones).
6. **Conectar y dibujar el diagrama** — hechos en el centro, dimensiones alrededor. Las flechas van de la **PK de cada dimensión → FK en la tabla de hechos**.

---

## 10. OLAP — Online Analytical Processing

**Concepto clave:** Tecnología optimizada para análisis complejos a gran velocidad. A diferencia de las bases transaccionales (**OLTP**), OLAP permite consultar los datos desde diferentes perspectivas de forma **multidimensional** (concepto de **Cubo**).

**Cubo OLAP:** proceso que toma datos de bases relacionales (una única dimensión, OLTP), los transforma y almacena en bases multidimensionales. Ejemplo de la clase: cubo con dimensiones **Producto** (vino/agua), **Mercado** (provincia/ciudad) y **Tiempo** (años 1999–2001); cada celda es un dato.

> [!important] Operaciones OLAP (¡muy preguntadas!)
> - **Drill-Down** — desglosar para ver **más detalle** (de "país" a "ciudad"). *(Nota: la diapo intercambia las etiquetas de Drill-Down/Roll-Up respecto de la definición estándar; quedate con la lógica: Drill-Down = más detalle, Roll-Up = más agregado.)*
> - **Roll-Up** — agregar subiendo en la jerarquía (de ver ventas por "día" a verlas por "año").
> - **Slice** — "rebanar": seleccionar **una sola dimensión** para un subconjunto (ej: ventas de *solo* el año X).
> - **Dice** — "dado": seleccionar un **subcubo cruzando varias dimensiones** (ej: ventas de "zapatillas" en "Buenos Aires" durante "Q1").

**Tipos de OLAP:**
- **MOLAP** (Multidimensional) — usa cubos preprocesados en BD especializada, optimizado para análisis rápido.
- **ROLAP** (Relational) — sobre BD relacionales (SQL), genera consultas dinámicamente en tiempo real.
- **HOLAP** (Hybrid) — combina ambos: cubos preprocesados para agregados + SQL para el detalle.

**Arquitectura completa (última diapo, "próxima clase"):** modelo de 3 capas.
- **Bottom Tier:** Data Sources + Operational Databases → **Data Warehouse** + Data Marts.
- **Middle Tier:** **OLAP Server**.
- **Top Tier:** Data Mining, Reporting Tool, Analysis Tool, Query Tool.

---

## 11. Análisis de requerimientos

**Concepto clave:** El diseño de un DWH requiere un análisis exhaustivo de necesidades, fuentes y objetivos del negocio para garantizar el éxito. Cinco pasos:

1. **Identificar stakeholders** — usuarios finales, analistas, ejecutivos, equipos técnicos.
2. **Encuestas y entrevistas** — recopilar requerimientos de negocio y necesidades de información.
3. **Análisis de fuentes** — identificar sistemas operacionales, BD, APIs y archivos.
4. **Definir KPIs** — indicadores clave de rendimiento y métricas de negocio.
5. **Documentación** — especificaciones técnicas, modelos de datos y procesos ETL.
