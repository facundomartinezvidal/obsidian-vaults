# TPO — Criterios de elección del dominio

**Asignatura:** Ciencia de Datos (3.4.217) — UADE
**Objetivo:** comparar 5 dominios candidatos contra los requisitos de la consigna del TPO, para consultar con el docente cuál conviene.

---

## Requisitos de la consigna (resumen)

**Expectativas mínimas:**
1. Descripción del dominio, problemática y propuesta de valor
2. Diagrama de arquitectura (pipeline de datos)
3. EDA del dataset
4. Técnica de minería + modelo utilizado
5. Conclusión (data visualization + storytelling)
6. **Aplicación funcional interactiva** (sin esto = desaprobado)

**Expectativas superadoras:** creatividad · varias fuentes de datos distintas · metodologías ágiles · versionado en GitHub.

**Criterios de evaluación:** coherencia hipótesis–conclusiones · valor agregado al dominio · claridad de presentación · participación de todos.

**Audiencia:** Gerencia Comercial y Técnica. La consigna recomienda un **dominio conocido o de interés**.

---

## Candidato 1 — Churn telco/banco

> Hipótesis: "Podemos predecir qué clientes se van y retenerlos antes de que lo hagan"
> Dataset: Telco Customer Churn (Kaggle, ~7.000 filas)

| Requisito | Cómo lo cubre |
|---|---|
| Propuesta de valor | Directa y cuantificable: retener un cliente cuesta menos que adquirir uno nuevo. Storytelling comercial natural para la audiencia gerencial |
| Técnica de minería | Clasificación binaria — encaja exacto con lo visto en la materia: árboles de decisión, Random Forest, métricas (confusion matrix, precision/recall, ROC/AUC) |
| EDA | Dataset limpio y documentado, con variables categóricas y numéricas para mostrar feature engineering (one-hot encoding, escalado) |
| App funcional | Sencilla de armar: formulario con datos del cliente → probabilidad de churn + acción de retención sugerida |
| Coherencia hipótesis–conclusión | Alta: la métrica del modelo responde directamente la hipótesis |
| Riesgo | Bajo. Es el caso más usado en la literatura — menos margen para el criterio de creatividad |

**Fortaleza principal:** alineación perfecta con el contenido de la cursada (Bloque 2 completo).
**Debilidad principal:** poco original; una sola fuente de datos salvo que se enriquezca.

## Candidato 2 — Riesgo crediticio

> Hipótesis: "Podemos predecir el default antes de otorgar el préstamo"
> Dataset: German Credit / Lending Club (Kaggle)

| Requisito | Cómo lo cubre |
|---|---|
| Propuesta de valor | Obvia para la gerencia: cada default evitado es pérdida directa evitada. Permite cuantificar el costo asimétrico de los errores |
| Técnica de minería | Clasificación binaria con clases desbalanceadas — escenario ideal para lucirse con precision vs recall y el trade-off entre rechazar buenos clientes (falso positivo) y aprobar malos (falso negativo) |
| EDA | German Credit es chico (~1.000 filas) pero rico en categóricas; Lending Club es masivo y más sucio (más trabajo de limpieza para mostrar) |
| App funcional | Natural: simulador de scoring — carga de datos del solicitante → aprobar/rechazar + nivel de riesgo |
| Coherencia hipótesis–conclusión | Alta, con la discusión de métricas más sofisticada de los tres candidatos |
| Riesgo | Medio: el desbalanceo de clases exige manejo cuidadoso (visto en clase 11) — es riesgo y oportunidad a la vez |

**Fortaleza principal:** es donde mejor brillan las métricas de clasificación — el tema más fuerte del 2do parcial.
**Debilidad principal:** dominio menos cercano a la experiencia del grupo; storytelling exige entender el negocio bancario.

## Candidato 3 — Inmobiliario CABA

> Hipótesis: "Podemos detectar propiedades sub/sobrevaluadas en CABA"
> Datasets: Datos Abiertos de Buenos Aires + Properati

| Requisito | Cómo lo cubre |
|---|---|
| Propuesta de valor | Concreta y local: comprador/inversor detecta oportunidades. Dominio conocido por cualquier audiencia argentina |
| Técnica de minería | ⚠️ Punto a validar con el docente: predicción de precio es **regresión**, no clasificación. La materia enfatizó clasificación (árboles, RF, métricas) y clustering. Mitigable: discretizar precio en rangos (visto en clase 11) o clusterizar barrios/propiedades |
| EDA | El más rico de los tres: outliers reales, datos sucios, georreferenciación — EDA vistoso |
| App funcional | Atractiva: ingresás características de la propiedad → valuación estimada + mapa |
| Expectativa superadora | ✅ Única opción que cruza **dos fuentes de datos distintas** de forma natural (BA Data + Properati) — requisito superador explícito de la consigna |
| Riesgo | Alto: scraping/limpieza de Properati insume tiempo; la técnica puede no coincidir con lo enseñado |

**Fortaleza principal:** creatividad + varias fuentes — pega de lleno en las dos expectativas superadoras.
**Debilidad principal:** desalineación técnica (regresión vs clasificación) — es exactamente lo que hay que preguntarle al profe.

## Candidato 4 — No-show de turnos médicos ⭐

> Hipótesis: "Podemos predecir qué pacientes faltarán a su turno y reducir el costo del ausentismo con sobreturnos y recordatorios dirigidos"
> Dataset: [Medical Appointment No Shows](https://www.kaggle.com/datasets/joniarroba/noshowappointments) (Kaggle, +100.000 turnos reales, Brasil)

| Requisito | Cómo lo cubre |
|---|---|
| Propuesta de valor | Cuantificable en 10 segundos: cada turno perdido = hora del profesional ociosa. El modelo decide a quién enviar recordatorio o sobre quién hacer sobreturno |
| Técnica de minería | Clasificación binaria con desbalanceo ~80/20 — el escenario exacto de la clase 11 (desbalanceo de clases) y del material de métricas. Hay [estudios publicados](https://pmc.ncbi.nlm.nih.gov/articles/PMC10770919/) con árboles/RF/XGBoost sobre este mismo dataset |
| EDA | 14 variables ricas: edad, género, comorbilidades (diabetes, hipertensión), SMS recibido, fechas de agendamiento y turno — permite feature engineering (días de espera, día de semana) |
| App funcional | Datos del paciente + turno → probabilidad de ausencia → recomendación (recordatorio / sobreturno) |
| Expectativa superadora | ✅ Segunda fuente natural: **clima por fecha** (lluvia/temperatura vs ausentismo) — integración trivial porque cada turno tiene fecha |
| Riesgo | Bajo. Dataset limpio, masivo, con literatura de respaldo |

**Fortaleza principal:** combina el riesgo bajo de churn con la expectativa superadora de inmobiliario, sin el problema de regresión. Dataset 14× más grande que Telco y menos usado en presentaciones.
**Debilidad principal:** datos de Brasil, no locales. La variable accionable (SMS) compensa con storytelling.

## Candidato 5 — Deserción universitaria

> Hipótesis: "Podemos detectar alumnos en riesgo de abandono al final del 1er semestre e intervenir antes"
> Dataset: [Predict Students' Dropout and Academic Success](https://archive.ics.uci.edu/dataset/697/predict+students+dropout+and+academic+success) (UCI, ~4.400 alumnos, 36 variables)

| Requisito | Cómo lo cubre |
|---|---|
| Dominio conocido | ✅✅ El grupo lo vive en carne propia — la consigna recomienda explícitamente "dominio conocido o de interés". Nadie va a contar mejor esta historia que estudiantes |
| Propuesta de valor | Cada alumno retenido = matrícula que no se pierde; la "gerencia" es la propia universidad. Intervención temprana (tutorías, becas) dirigida por el modelo |
| Técnica de minería | Clasificación de 3 clases (dropout/enrolled/graduate) con desbalanceo. [Random Forest entre los mejores modelos](https://sshivam-singh96.medium.com/predict-students-dropout-and-academic-success-using-ensemble-learning-2b1a7bf63379) en la literatura. Hay [literatura en español](https://scielo.pt/scielo.php?script=sci_arttext&pid=S1646-98952023000300084&lng=pt&nrm=iso&tlng=es) citable |
| EDA | 36 variables: demográficas, socioeconómicas, rendimiento académico por semestre |
| App funcional | Perfil del alumno → riesgo de deserción → acción sugerida |
| Expectativa superadora | Segunda fuente: estadísticas educativas de [datos.gob.ar](https://www.argentina.gob.ar/produccion/cep/datasets-y-otros-recursos) para contextualizar con datos argentinos |
| Riesgo | Bajo-medio: multiclase es apenas más complejo que binario |

**Fortaleza principal:** el dominio más auténtico para exponer — credibilidad inmediata frente a la audiencia.
**Debilidad principal:** storytelling "comercial" más débil que no-show o churn (el negocio es una institución educativa); dataset de Portugal.

### Descartado en la investigación: HR Attrition (IBM)

Se evaluó el [dataset clásico de RRHH de IBM](https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset): solo 1.470 filas y **datos ficticios** (generados por IBM). EDA pobre frente a las alternativas y propuesta de valor inventada. No supera a ninguno de los otros candidatos.

---

## Matriz comparativa

| Criterio de la consigna | Churn | Crédito | Inmobiliario | No-show ⭐ | Deserción |
|---|---|---|---|---|---|
| Dominio conocido/de interés | ✅ | ➖ | ✅✅ | ✅ | ✅✅ |
| Propuesta de valor clara para gerencia | ✅✅ | ✅✅ | ✅ | ✅✅ | ✅ |
| Encaje con técnicas de la materia | ✅✅ | ✅✅ | ⚠️ | ✅✅ | ✅✅ |
| Riqueza del EDA | ✅ | ✅ | ✅✅ | ✅✅ | ✅ |
| Facilidad de la app funcional | ✅✅ | ✅✅ | ✅ | ✅✅ | ✅✅ |
| Varias fuentes de datos (superadora) | ➖ | ➖ | ✅✅ | ✅ | ✅ |
| Creatividad (superadora) | ➖ | ✅ | ✅✅ | ✅✅ | ✅ |
| Riesgo de ejecución | Bajo | Medio | Alto | **Bajo** | Bajo-medio |

---

## Preguntas para el docente

1. **¿Es aceptable un problema de regresión** (predicción de precio inmobiliario) **o se espera clasificación/clustering** como técnica central? Si es regresión, ¿alcanza con discretizar el precio en rangos para convertirlo en clasificación?
2. Para churn/crédito (una sola fuente principal): ¿qué tipo de **segunda fuente** sumaría para la expectativa superadora? (ej. datos demográficos públicos, índices macroeconómicos)
3. ¿La **aplicación funcional** puede ser un notebook interactivo (widgets en Colab) o se espera una app standalone (ej. Streamlit)?
4. ¿Hay preferencia por **dominio local/argentino** vs dataset internacional clásico?
5. Para no-show/deserción: ¿cruzar el dataset principal con una **fuente contextual** (clima por fecha, estadísticas de datos.gob.ar) cuenta como "varias fuentes de datos distintas" para la expectativa superadora?

## Recomendación preliminar del grupo

- **Mejor balance global:** No-show de turnos médicos (candidato 4) — riesgo bajo de churn + superadora de varias fuentes (clima) + desbalanceo de clases para lucirse con métricas. ⭐ Recomendado.
- **Si se prioriza dominio vivido:** Deserción universitaria (candidato 5) — credibilidad inmediata exponiendo, dominio que el grupo conoce de primera mano.
- **Si se prioriza seguridad máxima:** Churn (candidato 1) — el camino más pisado, alineación total con la cursada.
- **Si se prioriza nota alta vía creatividad:** Inmobiliario (candidato 3) — pero **solo si** el docente valida la técnica (pregunta 1).
- **Punto medio clásico:** Crédito (candidato 2) — valor de negocio fuerte + discusión de métricas profunda, agregando una segunda fuente para la superadora.
