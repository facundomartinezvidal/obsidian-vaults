---
materia: Ciencia de Datos
tema: 3
bloque: Calidad y Gobierno
tags:
  - resumen-final
  - ciencia-de-datos
  - calidad-de-datos
  - gobierno-de-datos
---

# Tema 3 — Calidad y Gobierno de datos

## Qué significa que los datos tengan calidad

La calidad de datos se define desde la noción de aptitud para uso (*fitness for use*): según Wang y Strong (1996), los datos son de calidad cuando resultan aptos para ser utilizados de acuerdo con las necesidades de los consumidores de la información. Esta definición desplaza el eje desde lo puramente técnico hacia el usuario, y establece tres ideas que se refuerzan entre sí. En primer lugar, la calidad se mide desde la perspectiva de quien consume la información, no desde la sola corrección técnica del dato. En segundo lugar, "aptitud para uso" implica que los datos deben ser adecuados al propósito específico que se persigue: un mismo dato puede ser suficiente para una tarea e insuficiente para otra. Y en tercer lugar, la calidad es relativa al contexto y a las necesidades de negocio, de modo que no existe un estándar absoluto sino uno que depende del uso previsto. Estas ideas son la base sobre la que después se articulan los criterios que definen qué evaluar, las métricas que determinan cuánto se cumple y, en última instancia, el gobierno de datos que fija esos estándares para toda la organización.

## Criterios y métricas: el qué y el cuánto

Conviene distinguir dos planos que suelen confundirse. Los **criterios** son las características abstractas o requisitos que los datos deben cumplir para considerarse de alta calidad; responden al "qué" queremos lograr. Las **métricas**, en cambio, son la implementación cuantitativa de esos criterios: el cálculo, fórmula o algoritmo que traduce cada requisito en un valor numérico y responde al "cuánto" se logra. Un criterio de integridad, por ejemplo, se hace medible a través de una métrica de completitud expresada como porcentaje ("completitud = 98 %"). Los criterios son, por tanto, el objetivo, y las métricas el instrumento que permite verificar su grado de cumplimiento de forma objetiva y comparable.

Entre los criterios habituales se encuentran los siguientes:

- **Exactitud**: grado en que los datos reflejan la realidad o una fuente confiable.
- **Integridad**: exige que los datos sean exhaustivos, ya que la información incompleta puede resultar inservible.
- **Pertinencia**: reclama que los datos aporten lo necesario con un propósito claro.
- **Coherencia**: impide que los datos se contradigan entre distintas fuentes.
- **Accesibilidad**: refiere a que estén disponibles y sean utilizables cuando se los necesita.
- **Relevancia**: valora la idoneidad, el valor y la importancia que los datos aportan a los fines perseguidos.

La tabla siguiente resume cómo cada criterio se operacionaliza en una métrica concreta y en una forma de medición:

| Métrica | Qué mide (criterio asociado) | Cómo se mide |
|---|---|---|
| Completitud | Presencia de todos los atributos del dato; ausencia de nulos o faltantes | `(Registros completos / Total) × 100` |
| Coherencia | Que una misma pieza de dato conserve el mismo valor en múltiples conjuntos | Validación cruzada entre fuentes |
| Validez | Fiabilidad según reglas de negocio definidas (integridad y exactitud) | Conformidad con reglas y formatos |
| Unicidad | Que cada valor distinto aparezca una sola vez | Detección y eliminación de duplicados |
| Integridad | Correctitud y completitud, incluyendo relaciones entre entidades | Integridad referencial mantenida |
| Vigencia | Disponibilidad y actualización de los datos cuando se requieren | *Freshness* o actualidad del dato |

## Datos que degradan la calidad

No todos los datos aportan valor, y algunos tipos son directamente problemáticos y deben identificarse tempranamente:

- **Datos no útiles**: los que la operación genera sin una finalidad analítica específica ni valor, como los logs de sistema sin propósito o los campos de formulario que nunca se utilizan.
- **Datos sucios**: inválidos o incorrectos, cuyo uso puede provocar un daño importante; direcciones mal escritas, teléfonos inválidos o valores fuera de rango son ejemplos típicos.
- **Datos no estructurados**: están disponibles pero no preparados para su uso, de modo que requieren enriquecimiento previo; es el caso de PDFs sin metadatos, imágenes sin etiquetar o texto libre sin procesar.

El impacto de arrastrar estos datos no es menor: derivan en decisiones erróneas, pérdida de oportunidades, mayores costos operativos y daño reputacional, razón por la cual su detección temprana resulta clave.

## Gestión de la calidad: enfoque reactivo y proactivo

La calidad se gestiona mediante dos enfoques complementarios. El enfoque **reactivo** actúa mediante correcciones después de detectar un problema, reparando datos ya defectuosos; el enfoque **proactivo** actúa mediante prevención, antes de que los problemas ocurran, atacando el error en su origen. Ambos son necesarios, y es el gobierno de datos el que establece el marco que los equilibra, definiendo expectativas de calidad, responsabilidades, políticas, estándares y procesos de mejora continua.

| Reactivo (corregir) | Proactivo (prevenir) |
|---|---|
| Limpieza de duplicados en bases de clientes | Definir reglas de validación al cargar datos |
| Corrección de registros incompletos | Estandarizar formatos (fechas ISO, emails) |
| Normalización de direcciones mal escritas | Implementar un catálogo de datos con definiciones |
| Monitoreo con reportes de inconsistencias | Capacitar a los usuarios en la captura correcta |

## Estrategias de remediación

Las acciones correctivas más frecuentes se organizan según el tipo de problema que atacan: valores faltantes, valores duplicados y valores atípicos.

Ante **valores faltantes** la decisión oscila entre eliminar registros o imputar valores, según el porcentaje de ausencias y la precisión requerida. Las alternativas más frecuentes son:

- **Eliminación**: razonable cuando los faltantes representan menos del 5 % de los datos o cuando falta la propia variable objetivo, aunque conlleva el riesgo de perder información.
- **Imputación simple**: rellena el hueco con un estadístico —la media para distribuciones normales, la mediana para datos sesgados y la moda para variables categóricas.
- **Imputación predictiva**: cuando se busca máxima precisión, se estiman los valores mediante algoritmos como KNN o regresión, a costa de un mayor esfuerzo computacional.

Frente a los **valores duplicados** el objetivo es alcanzar la unicidad detectando y consolidando registros repetidos, de modo de conservar la mejor información en un registro maestro. Las estrategias habituales son:

- **Clave primaria y *timestamp***: estrategia básica que mantiene solo el registro más reciente cuando las claves primarias son idénticas.
- ***Fuzzy matching***: cuando los duplicados no son exactos, identifica similitudes mediante distancias de edición (por ejemplo, una coincidencia de Levenshtein del 95 % o más) y consolida los registros en un Golden Record.
- **Deduplicación por agrupación**: junta los duplicados y construye un registro sintético con la mejor información disponible de cada uno.

Los **valores atípicos** u *outliers* son datos que se alejan drásticamente del comportamiento normal, y pueden eliminarse o transformarse según convenga descartar filas o conservarlas ajustando el valor extremo. Las técnicas más usadas son:

- ***Trimming*** o recorte: elimina los valores extremos, típicamente fuera del rango percentil P1–P99, con la consecuencia de reducir el tamaño de la muestra.
- **Winsorización**: reemplaza los extremos por límites —ajustándolos a los bigotes del diagrama de caja— y mantiene los registros originales.
- **Transformación logarítmica**: reduce el impacto de los valores altos y maneja la asimetría de los datos preservando todas las observaciones.

La diferencia práctica es clara: el *trimming* elimina filas, mientras que la winsorización y la transformación logarítmica corrigen el valor pero conservan todas las filas.

## Gobierno de datos

El gobierno de datos es el conjunto de políticas, procesos, roles y tecnologías que aseguran que los datos se gestionen como un activo estratégico, con el objetivo de que sean confiables, consistentes, accesibles y seguros, y estén alineados con las necesidades del negocio. Su idea central es transformar los datos de un recurso pasivo a un activo estratégico que impulsa la toma de decisiones.

El gobierno es, además, el marco que da coherencia a todo lo anterior. Es él quien define los criterios y estándares de calidad —exactitud, completitud, consistencia— para toda la organización, quien fija los KPIs e indicadores medibles que permiten evaluar y monitorear la calidad de forma continua, y quien asigna responsabilidades claras a través de roles definidos. Entre esos roles se destacan:

- **Data Owners**: responsables de los dominios de datos.
- **Data Stewards**: encargados de mantener la calidad en el día a día.
- **CDO** (*Chief Data Officer*): lidera la estrategia de datos a nivel organizacional.

Sobre esa base se articulan los procesos de detección, corrección y prevención de problemas y los ciclos de mejora continua.

Cuatro componentes sostienen este marco:

- **Políticas y estándares**: fijan reglas claras sobre definición, uso, seguridad y calidad.
- **Roles y responsabilidades**: establecen quién mantiene la calidad.
- **Procesos**: ordenan la detección, corrección y prevención.
- **Tecnología de soporte**: aporta las herramientas de *data quality*, el *data catalog* y el *lineage* o linaje que permiten rastrear el origen y las transformaciones de los datos.

De un gobierno bien implementado se esperan beneficios concretos:

- **Mejores decisiones**: sustentadas en datos confiables.
- **Reducción de costos**: por menor duplicidad y menos errores operativos.
- **Cumplimiento normativo más simple**: frente a marcos como el GDPR o la Ley de Protección de Datos.
- **Confianza organizacional creciente**: en los datos entendidos como activo estratégico.