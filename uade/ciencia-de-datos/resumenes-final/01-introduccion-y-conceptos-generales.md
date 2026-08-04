---
materia: Ciencia de Datos
clase: 1
fecha: 2026-03-13
bloque: Fundamentos
parcial: 1
tags:
  - resumen-final
  - ciencia-de-datos
  - fundamentos
fuente: content/1-parcial/01-material-introduccion-data-science.pdf
---

# Clase 1 — Introducción y Conceptos Generales

## 1. ¿Qué es la Ciencia de Datos?

**Concepto clave:** Es un **área interdisciplinaria** que usa métodos científicos, procesos, algoritmos y sistemas para **extraer conocimiento e *insights*** de datos **estructurados y no estructurados**.

**Desarrollo:** La ciencia de datos no es una sola disciplina, sino la combinación de tres mundos que históricamente iban separados: la **programación**, la **estadística** y el **conocimiento del negocio (dominio)**. Su objetivo no es "jugar con datos" sino resolver problemas reales y tomar **decisiones basadas en evidencia**. La revista *Harvard Business Review* la popularizó al llamar al Data Scientist *"the sexiest job of the 21st century"*, justamente porque combina perfiles que antes no convivían en la misma persona.

**Áreas de aplicación (ejemplos de la clase):** e-commerce, salud, finanzas, manufactura, educación y logística. En cada una el patrón es el mismo: hay datos que, bien explotados, generan ventaja competitiva.

---

## 2. Los tres pilares — Diagrama de Venn de Drew Conway

**Concepto clave:** La Ciencia de Datos vive en la **intersección de tres círculos**.

| Pilar | Qué aporta | Ejemplo concreto |
|---|---|---|
| **Computación / Informática** (Computer Science) | Programación, manipulación de datos, herramientas para procesar grandes volúmenes | Escribir un script en Python que limpia 10M de filas |
| **Matemática y Estadística** (Math & Statistics) | Modelar, analizar patrones, validar hipótesis, extraer insights significativos | Correr un test estadístico para saber si una diferencia es real o azar |
| **Conocimiento del Negocio** (Domain Knowledge) | Entender el dominio/industria para contextualizar hallazgos y generar valor | Saber que en retail diciembre siempre sube: el pico no es una anomalía |

**Desarrollo — las intersecciones importan (¡suele caer en parcial!):**
- **Computación + Estadística = Machine Learning.** Sabés programar y sabés estadística, pero *no* el negocio → riesgo de resolver el problema equivocado.
- **Computación + Negocio = "Software Skills" / zona de peligro.** Podés programar cosas que suenan bien pero sin rigor estadístico → conclusiones falsas.
- **Estadística + Negocio = Traditional Research (investigación tradicional).** El análisis clásico de siempre, sin las herramientas modernas de cómputo.
- **Centro (los tres) = Data Science.** Solo cuando confluyen los tres se hace verdadera ciencia de datos.

> [!tip] Ejemplo mental
> Un modelo que predice con 99% de exactitud que "los clientes que compraron ayer volverán a comprar" es inútil si el negocio ya lo sabía. Sin el pilar de **negocio**, la técnica no genera valor.

---

## 3. La Pirámide DIKW (Dato → Información → Conocimiento → Sabiduría)

**Concepto clave:** Es una **jerarquía** donde cada nivel agrega contexto y valor sobre el anterior. Se lee de abajo hacia arriba.

```
              ▲  SABIDURÍA   → aplicar con juicio y ética; decisión estratégica
             ▲▲  CONOCIMIENTO → patrones y comprensión; ¿cómo? ¿qué es mejor?
            ▲▲▲  INFORMACIÓN  → datos con contexto; qué, quién, cuándo
           ▲▲▲▲  DATO         → hecho bruto sin procesar
```

**Desarrollo con el ejemplo de la clase (edades de alumnos):**

| Nivel | Definición | Responde | Ejemplo de la clase |
|---|---|---|---|
| **Dato** | Representación simbólica (numérica, alfabética). Hecho bruto **sin procesar, sin contexto**. No da valor por sí solo. | — | `25, 30, 22, 28, 35` (números aislados) |
| **Información** | Conjunto de datos **con contexto y significado**, que interesan a alguien por un fin. Base para el análisis. | Qué, quién, cuándo | "Edades de los estudiantes de la clase de Ciencia de Datos en UADE" |
| **Conocimiento** | Habilidad de **transformar la información** para obtener un beneficio; implica comprensión de **patrones**. Permite predicciones y decisiones. | ¿Cómo? | "El promedio de edad es 26.25 años → es un grupo joven" |
| **Sabiduría** | Conocimiento aplicado con **juicio**, de forma ética y estratégica. Orienta decisiones a largo plazo. | ¿Por qué? ¿Qué es mejor? | "Ajustar el plan de estudios para incluir más ejemplos prácticos dirigidos a profesionales jóvenes" |

> [!important] Madurez organizacional
> Las empresas pueden evaluar en qué nivel de la pirámide operan. **La mayoría se queda en dato e información.** Las organizaciones más maduras alcanzan conocimiento y sabiduría, y por eso toman decisiones estratégicas basadas en *insights* profundos. Esto conecta directo con la idea de valor de Big Data (sección 4).

---

## 4. Big Data — Las 5 V

**Concepto clave:** Big Data se caracteriza por cinco propiedades. Las primeras 4 son "características"; la quinta (**Valor**) es el **objetivo final**.

| V | Qué es | Ejemplos / desafíos de la clase |
|---|---|---|
| **Volumen** (Volume) | Cantidad masiva de datos. Se mide en petabytes y exabytes. | Facebook: 300+ PB · YouTube: 500 h/min · IoT: 50B dispositivos |
| **Velocidad** (Velocity) | Rapidez con que se generan y deben procesarse; requiere tiempo real. | Trading en microsegundos · sensores IoT en tiempo real · 8.9 usuarios/seg |
| **Variedad** (Variety) | Diferentes formatos: estructurados, semiestructurados, no estructurados. | SQL/Excel · JSON · videos |
| **Veracidad** (Veracity) | Calidad y confiabilidad: precisión, consistencia, integridad. | Desafíos: datos incompletos, info inconsistente, fuentes no confiables |
| **Valor** (Value) | **Beneficio empresarial** obtenido del análisis. Es el objetivo final. | Mejora decisiones · optimiza procesos · ventaja competitiva |

**Desarrollo — cómo se relacionan (según la clase):**
- **Volumen + Velocidad** → exigen **infraestructura escalable** y procesamiento distribuido.
- **Variedad + Veracidad** → necesitan **herramientas flexibles** y procesos de **limpieza robustos**.
- **Las 5 V = Valor** → el éxito depende de **gestionar bien las 4 V** para generar valor. Si tenés mucho volumen pero baja veracidad, el resultado no sirve.

> [!tip] Frase para el parcial
> "El objetivo final de Big Data no es acumular datos, sino **generar valor** a partir de ellos."

---

## 5. Tipos de datos

**Concepto clave:** Un científico de datos debe poder trabajar con **los tres tipos**, porque los proyectos reales combinan varios.

| Tipo | Definición | Ejemplos | Herramientas |
|---|---|---|---|
| **Estructurados** | Formato predefinido, filas y columnas, esquema rígido, fácilmente consultables | Bases relacionales (SQL), Excel, tablas de clientes/productos/ventas | SQL, MySQL, PostgreSQL, Oracle, SQL Server |
| **No estructurados** | Sin formato predefinido, difíciles de almacenar y procesar. **Representan el 80% de los datos empresariales** | Texto libre (emails, docs), imágenes, videos, audio, redes sociales | NoSQL, MongoDB, Hadoop, Spark, NLP |
| **Semiestructurados** | Sin esquema rígido, pero con etiquetas/marcadores que organizan jerárquicamente | JSON, XML, CSV con inconsistencias, logs de sistemas | JSON, XML, APIs REST, MongoDB |

> [!important] Dato que suele preguntarse
> El **80% de los datos de una empresa son no estructurados**. Por eso las herramientas modernas (Python con Pandas/NumPy, R) apuntan a procesar datos de cualquier formato, no solo tablas.

---

## 6. Business Intelligence (BI)

**Concepto clave:** BI (Inteligencia de Negocios) es el conjunto de **estrategias, tecnologías y prácticas** que permiten recopilar, analizar y transformar datos en **información útil para la toma de decisiones**.

**Componentes clave de BI (el pipeline que se ve en toda la materia):**
1. **Fuentes de datos** — ERP, CRM, sistemas operacionales, bases transaccionales.
2. **Procesos ETL/ELT** — Extracción, Transformación y Carga de datos.
3. **Data Warehouse** — repositorio centralizado de datos históricos estructurados.
4. **Herramientas de visualización** — dashboards interactivos, reportes.
5. **Usuarios de negocio** — analistas, gerentes, ejecutivos que deciden.

**Objetivos de BI:** dar visión clara del negocio, detectar oportunidades, anticiparse a cambios del mercado, decidir con datos, monitorear KPIs.

**Beneficios (ejemplos de la clase):** optimización operativa, reducción de gastos, mejores decisiones, mayor eficiencia (automatización), control del rendimiento (KPIs/dashboards), conocimiento del cliente, reacción inmediata ante crisis, optimización del ROI → todo se traduce en **ventaja competitiva sostenible**.

> [!note] Conexión con el resto de la materia
> Los componentes de BI (ETL → DWH → visualización) son exactamente los temas de las clases 2 y 3. Esta clase te da el "para qué" antes del "cómo".

---

## 7. Ciencia de Datos vs Business Intelligence

**Concepto clave:** No compiten, se **complementan**. La diferencia central es el **enfoque temporal**.

| Dimensión | **Business Intelligence** | **Data Science** |
|---|---|---|
| Enfoque temporal | **Pasado y presente** — analiza datos históricos | **Prospectivo** — predice el futuro |
| Preguntas que responde | ¿Qué pasó? ¿Por qué pasó? ¿Cuándo ocurrió? | ¿Qué pasará? ¿Cómo optimizar? ¿Qué acciones tomar? |
| Herramientas | Dashboards, reporting, SQL, OLAP, Tableau, Power BI | Machine Learning, Python, R, estadística avanzada, algoritmos |
| Objetivo | **Monitorear el rendimiento** y generar informes operativos | **Descubrir patrones ocultos** y generar predicciones |

> [!important] Complementariedad (concepto que suele cerrar el parcial)
> En organizaciones maduras ambas conviven: **BI aporta el contexto histórico** que necesita **Data Science para predecir mejor**. Juntas cubren la decisión completa: entender el pasado (BI) y anticipar el futuro (DS).

---

