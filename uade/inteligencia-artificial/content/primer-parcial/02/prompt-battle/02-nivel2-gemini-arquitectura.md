# SADRE — Sistema de Gestión Académica, Detección de Riesgo y Recomendación de Estudio

> Arquitectura y plan de desarrollo — respuesta de Gemini, Nivel 2 (Prompt Battle, Clase 2)

Rol: Ingeniero de Software y Arquitecto de Soluciones Digitales.

La solución opera bajo un entorno de **RAG cerrado** (*Retrieval-Augmented Generation*), limitado exclusivamente al programa analítico y la bibliografía oficial provista por la universidad.

## 1. Visión y Enfoque de Diseño

Filosofía **"Zero-Setup Dashboard"** para adopción inmediata:

- **Carga Centralizada:** el estudiante o la facultad suben el programa (Syllabus) y los PDFs de la bibliografía oficial.
- **Trazabilidad 100% Académica:** cada recomendación de estudio cita explícitamente el capítulo, sección o documento del programa de la materia.
- **Modelo Deliberativo de Riesgo:** algoritmo ponderado que combina hitos del calendario, tiempo de estudio registrado y evaluaciones previas.

## 2. Arquitectura del Sistema

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                           CAPA DE PRESENTACIÓN                         │
 │           Next.js 14 Web App / Progressive Web App (PWA)               │
 └──────────────────────────────────┬─────────────────────────────────────┘
                                    │ HTTP / REST / WebSockets
 ┌──────────────────────────────────▼─────────────────────────────────────┐
 │                            API GATEWAY & AUTH                          │
 │                      Node.js (NestJS) + JWT / OAuth2                   │
 └───────────────┬──────────────────┬────────────────────┬────────────────┘
                 │                  │                    │
 ┌───────────────▼────────┐ ┌───────▼───────────┐ ┌──────▼────────────────┐
 │  MOTOR DE RIESGO ACAD. │ │ MOTOR DE RAG      │ │  GESTOR DE SYLLABUS    │
 │ (Risk Assessment Engine)│ │ (LlamaIndex / RAG)│ │  (Plan de Cursada)     │
 └───────────────┬────────┘ └───────┬───────────┘ └──────┬────────────────┘
                 │                  │                    │
 ┌───────────────▼──────────────────▼────────────────────▼────────────────┐
 │                             CAPA DE DATOS                              │
 │   PostgreSQL (Usuarios, Notas, Tiempos) | Qdrant / PgVector (Vectores)│
 └────────────────────────────────────────────────────────────────────────┘
```

### Componentes Clave

1. **Ingestor Cátedra (Closed Knowledge Pipeline)**
   - Parsea el **Programa de la Materia** (cronograma, unidades, pesos de evaluación).
   - Procesa la **Bibliografía Oficial** en fragmentos (*chunks*) indexados vectorialmente.
   - **Filtro de Aislamiento:** bloquea web search o fuentes abiertas; sólo responde con contexto de los documentos cargados.

2. **Motor de Algoritmo de Riesgo Académico**

   Define el *Índice de Riesgo Académico (IRA)* del estudiante en una escala de 0 a 100%:

   $$IRA = (W_1 \cdot D_{días}) + (W_2 \cdot (10 - N_{prom})) + (W_3 \cdot \Delta T_{estudio})$$

   - $D_{días}$: proximidad temporal al próximo examen parcial.
   - $N_{prom}$: promedio actual de notas / quizzes en la materia.
   - $\Delta T_{estudio}$: brecha entre horas recomendadas por programa vs. horas reales registradas.

3. **Motor de Recomendación Adaptativo**

   Transforma el riesgo detectado en un plan de acción guiado por la bibliografía oficial (ej. *"Se detectó riesgo alto en Unidad 3. Revisar Capítulo 4, pp. 45-62 del libro base de la cátedra"*).

## 3. Plan de Desarrollo y Hoja de Ruta

> Nota: la respuesta original de Gemini dejó esta sección como placeholder, sin desglose real de fases.

## 4. Matriz Tecnológica Recomendada

| Capa / Componente | Tecnología Seleccionada | Justificación |
|---|---|---|
| Frontend | React / Next.js (PWA) | Permite instalar la App en smartphones sin pasar por App Stores, ideal para estudiantes. |
| Backend API | Node.js (NestJS) | Tipado fuerte con TypeScript, arquitectura modular escalable. |
| Base de Datos Relacional | PostgreSQL | Manejo estructurado de materias, calificaciones, alumnos y logs de estudio. |
| Vector DB | Qdrant o PgVector | Búsqueda semántica ultra-rápida sobre los fragmentos de la bibliografía oficial. |
| Motor de RAG | LlamaIndex / LangChain | Control estricto del *system prompt* para prohibir alucinaciones o fuentes externas. |

---

**Incumplimientos detectados respecto al prompt (restricción de formato PDF):** el asistente no generó el archivo PDF solicitado — devolvió instrucciones manuales de exportación (Ctrl+P desde navegador) en vez de un entregable. El plan de desarrollo quedó sin contenido.
