---
clase: 02
tema: Prompt Battle — Entrega
fecha_limite: 2026-08-17T23:59:00
tipo: entrega
asistentes: [Copilot CLI, Claude, Gemini]
tema_elegido: Asistente IA para estudiantes académicos
---

# Clase 2 — Entrega: Prompt Battle

Ver consigna completa en [[02-actividad-prompt-battle]].

**Tema elegido:** asistente IA para estudiantes académicos (variante del problema base).

## Nivel 1 — Prompt pobre

**Prompt usado:** *"Quiero hacer un asistente IA para estudiantes académicos"*

### Respuesta — Copilot CLI

Hizo 3 preguntas guiadas (AskUserQuestion) antes de responder:
- ¿Qué construir primero? → Definir idea, usuarios y funcionalidades
- ¿A qué estudiantes dirigido? → Universitarios de cualquier carrera
- ¿Función principal? → Acompañar el estudio y explicar temas

Luego propuso:

> Un asistente IA para universitarios que explique contenidos de forma personalizada, acompañe la preparación de exámenes y ayude a aprender activamente, sin resolver tareas de forma automática.

MVP: explicar temas con ejemplos/analogías según carrera, preguntas diagnósticas previas, ejercicios graduales con feedback, resúmenes/flashcards/planes de repaso, simulacros de parcial/oral, detección de lagunas de conocimiento.

Flujo: materia y tema → evaluación de nivel (2-3 preguntas) → explicación → práctica → corrección y registro.

Reglas: citar fuentes, distinguir hechos de interpretaciones, no inventar bibliografía, priorizar enseñar razonamiento sobre respuestas listas.

Diferencial: modo "Socrático" — guía con pistas en vez de dar la solución.

### Respuesta — Claude

Respondió directo, sin preguntas previas:

- Explicación de temas con ejemplos.
- Organización: fechas de entregas/exámenes, cronogramas de estudio.
- Generación de resúmenes de apuntes largos.
- Práctica: preguntas de repaso/quizzes.
- Corrección de trabajos con feedback.

Pasos de construcción sugeridos: definir nivel educativo, elegir modelo/API, diseñar interfaz, decidir si integra contenido propio del estudiante (RAG) o solo conocimiento general, considerar privacidad de datos académicos.

Cerró ofreciendo profundizar en arquitectura técnica o enfoque pedagógico.

### Respuesta — Gemini

Respondió directo, extensa, con foco técnico:

**Capacidades clave:** sintetizador de documentos (PDFs), tutor en modo Socrático, generador de material de estudio (flashcards, exámenes), formateador de citas (APA/IEEE/Vancouver/Chicago).

**Stack tecnológico** — dos opciones:
- *Low-code:* Google AI Studio, Custom GPTs, Dify.ai, Flowise.
- *Código propio:* backend Python/Node, LangChain/LlamaIndex, Gemini API (contexto largo), base de datos vectorial (Pinecone/ChromaDB/Qdrant).

**Hoja de ruta:** definir system prompt → implementar RAG → construir UI (Streamlit/Gradio o React/Next.js) → pruebas con estudiantes.

### Comparación Nivel 1

| | Copilot | Claude | Gemini |
|---|---|---|---|
| Estilo | Preguntó antes, luego propuesta MVP estructurada | Directo, panorama corto | Directo, muy extenso, stack técnico completo |
| Profundidad técnica | Baja (foco producto/UX) | Media (pasos genéricos) | Alta (RAG, LangChain, vector DB, LLM específico) |
| Estructura | Clara: usuario, MVP, flujo, reglas, diferencial | Lista simple + próximos pasos | Headers, roadmap visual, opciones A/B |
| Supuestos / alucinación | Bajo — preguntó en vez de asumir | Medio — asumió alcance genérico | Alto — asumió RAG/PDFs sin que se pidiera |

**Pregunta rápida (¿qué diferencias encontraron?):** Gemini fue el que más asumió — saltó directo a stack técnico completo (RAG, LangChain, vector DB) sin preguntar nivel del usuario ni alcance del proyecto. Copilot fue el más conservador, prefirió preguntar antes de proponer. Claude quedó en un punto medio: no preguntó, pero tampoco asumió complejidad técnica alta.

## Nivel 2 — Prompt mejorado

**Prompt usado:**

> Estoy queriendo realizar un sistema que organice materias, detecte riesgos académicos y recomiende acciones de estudio a estudiantes universitarios, necesito que tomes el rol de ingeniero de software y arquitecto de soluciones digitales y desarrolles una aplicación que sea simple de adoptar y utilizar. La aplicación debe cumplir las siguientes restricciones:
> - No debe utilizar fuentes externas, solo bibliografía que provea la universidad
> - Debe basarse en el programa de la materia en cuestión
> Quiero que me devuelvas la arquitectura y un plan de desarrollo en formato pdf, utilizando diagramas, gráficos, etc cuando sea necesario

Elementos presentes: rol (ingeniero de software / arquitecto), contexto (sistema académico), objetivo (arquitectura + plan de desarrollo), restricciones (sin fuentes externas, basado en programa de materia), formato (PDF con diagramas). Falta explícitamente: usuario destinatario detallado y criterios de calidad — igual el prompt ya se acerca a nivel 3.

### Respuesta — Gemini

Nombró el sistema **SADRE** (Sistema de Gestión Académica, Detección de Riesgo y Recomendación de Estudio). Estructura completa:

1. **Visión de diseño:** filosofía "Zero-Setup Dashboard" — carga centralizada de syllabus/bibliografía, trazabilidad 100% académica (cada recomendación cita capítulo/página), modelo de riesgo ponderado.
2. **Arquitectura (diagrama ASCII):** capa presentación (Next.js PWA) → API Gateway/Auth (NestJS + JWT) → tres motores (Riesgo Académico, RAG, Gestor de Syllabus) → capa de datos (PostgreSQL + Qdrant/PgVector).
3. **Componentes clave:**
   - Ingestor Cátedra: pipeline de conocimiento cerrado, parsea programa y bibliografía, bloquea fuentes externas.
   - Motor de Riesgo Académico: fórmula $IRA = W_1 \cdot D_{días} + W_2 \cdot (10 - N_{prom}) + W_3 \cdot \Delta T_{estudio}$ (índice de riesgo 0-100%).
   - Motor de Recomendación Adaptativo: traduce riesgo en acciones citando bibliografía oficial.
4. **Plan de desarrollo:** mencionado pero no desarrollado (placeholder vacío en la respuesta — *"Desglose cronológico estructurado por fases"* sin contenido real).
5. **Matriz tecnológica:** tabla con frontend (Next.js), backend (NestJS), DB relacional (PostgreSQL), vector DB (Qdrant/PgVector), motor RAG (LlamaIndex/LangChain), con justificación de cada elección.
6. **PDF:** no generó el archivo — devolvió instrucciones manuales (Ctrl+P desde el navegador, activar "gráficos de fondo", renombrar a `SADRE_Arquitectura_y_Plan_de_Desarrollo.pdf`).

**Incumplimientos detectados:** no entregó PDF real (pidió que el usuario lo genere manualmente), plan de desarrollo quedó como placeholder sin contenido, mencionó un "Explorador Interactivo" que no está presente en la respuesta en texto plano.

## Nivel 3 — Prompt profesional

**Prompt usado:** rol (ingeniero de software, buenas prácticas/clean code), contexto (estudiantes terciarios, público 18-30 años), objetivo (organizar materias, detectar riesgos, recomendar acciones), restricciones completas (sin info sensible innecesaria, sin diagnósticos, sin decisiones automáticas, viable para universidad, privacidad/seguridad, sin fuentes externas, basado en programa de materia), criterios de calidad (concreta, viable, clara, justificable, orientada a implementación real), formato (PDF con diagramas, 8 secciones fijas: problema, propuesta, arquitectura, funcionalidades, riesgos, controles de seguridad, ejemplo de interacción, recomendaciones), autoverificación explícita. Cumple los 8 requisitos de la consigna.

### Respuesta — Gemini

Documento completo, respeta las 8 secciones pedidas. Ver [[02-nivel3-gemini-arquitectura]] o `02-nivel3-gemini-arquitectura.pdf`.

Puntos fuertes: arquitectura hexagonal/clean architecture bien justificada, tabla de riesgos con impacto y mitigación, controles de seguridad concretos (RBAC, cifrado TLS 1.3/AES-256, SSO institucional, derecho al olvido), ejemplo de interacción con diagrama de flujo textual claro, plan de desarrollo en 4 fases con semanas concretas.

**Incumplimiento persistente:** pese a que el prompt exige autoverificación explícita ("antes de entregar la respuesta, verificá si cumpliste todos los requisitos"), Gemini volvió a no generar el PDF — devolvió una nota sugiriendo `pandoc` o impresión de navegador. Mismo error que en Nivel 2, no corregido a pesar de la instrucción de autochequeo. PDF final generado manualmente (exportado desde el .md).

### Respuesta — Copilot CLI

Generó PDF real directamente: `02-nivel3-copilot-arquitectura.pdf` (10 páginas, cumple formato sin intervención manual — diferencia clave frente a Gemini en los tres niveles). Contenido fuerte y bien redactado: problema con criterios de éxito medibles (60%/40%/70%), límites de producto explícitos ("no clínico", "no decisor"), propuesta con flujo de valor y ejemplo de regla explicable, arquitectura BFF + SSO OIDC/SAML + PostgreSQL cifrado, funcionalidades separadas por estudiante/cátedra con sección "Fuera del MVP".

**Incumplimiento grave detectado:** el documento **corta después de la sección 4 (Funcionalidades del MVP)**. Faltan por completo las secciones 5 a 8 exigidas explícitamente en el prompt: **Riesgos, Controles de seguridad, Ejemplo de interacción y Recomendaciones de implementación**. Pese a que el prompt pedía autoverificación antes de entregar, el documento quedó incompleto — mismo patrón de incumplimiento que Gemini, pero al revés: Copilot cumple el formato (PDF real) e incumple el contenido completo; Gemini cumple el contenido completo e incumple el formato.

## Parte competitiva

### Tabla de evaluación

Evaluado sobre la respuesta Nivel 3 de cada asistente (versión final, con restricciones y autoverificación).

**Asistente A = Copilot CLI · Asistente B = Gemini**

| Criterio | Asistente A (Copilot) | Asistente B (Gemini) |
|---|---|---|
| Comprensión del problema | 5/5 | 4/5 |
| Cumplimiento de instrucciones | 2/5 | 3/5 |
| Calidad técnica | 4/5 | 5/5 |
| Claridad | 5/5 | 4/5 |
| Nivel de detalle | 3/5 | 5/5 |
| Capacidad de detectar riesgos | 1/5 | 5/5 |
| Utilidad de la respuesta | 3/5 | 4/5 |
| **TOTAL** | **23/35** | **30/35** |

**Justificación breve:**
- Copilot: comprensión del problema y claridad sobresalientes (límites de producto muy bien definidos, métricas de éxito concretas), pero el documento queda **incompleto** — sin sección de Riesgos, por eso el 1/5 en esa fila arrastra el total hacia abajo. Cumplimiento de instrucciones bajo porque faltan 4 de 8 secciones obligatorias del prompt.
- Gemini: mayor calidad técnica y nivel de detalle (arquitectura hexagonal, fórmula de riesgo, tabla de mitigación completa, controles de seguridad concretos), cubre las 8 secciones pedidas. Pierde puntos en cumplimiento porque no generó el PDF pedido pese a la autoverificación explícita en el prompt.

**Ganador (parte competitiva): Gemini**, por diferencia de 7 puntos — el incumplimiento de Gemini (formato de salida) es subsanable con una herramienta externa de exportación; el incumplimiento de Copilot (contenido faltante) no se puede completar sin volver a generar la respuesta, y afecta directamente la utilidad del entregable para el objetivo pedido (detectar riesgos académicos era parte central del enunciado).

## Preguntas finales

**1. ¿Qué cambió entre el prompt 1, el prompt 2 y el prompt 3?**

El Nivel 1 ("quiero hacer un asistente IA para estudiantes académicos") dejó todo el criterio a cada asistente: cada uno definió solo, sin coincidir, el alcance, el usuario y la profundidad técnica — de ahí que Copilot preguntara antes de responder y Gemini se fuera directo a un stack técnico completo sin que nadie se lo pidiera. El Nivel 2 agregó rol, restricciones concretas (sin fuentes externas, basado en el programa de la materia) y formato de salida (PDF con diagramas): las respuestas se volvieron específicas a un dominio (RAG cerrado, arquitectura en capas) pero todavía sin estructura fija. El Nivel 3 fijó las 8 secciones obligatorias, los criterios de calidad y pidió autoverificación explícita: ahí se pudo medir objetivamente cumplimiento, porque el prompt dejó de ser interpretable — cualquier sección faltante es un incumplimiento verificable, no una diferencia de estilo.

**2. ¿El mejor prompt produjo necesariamente la mejor respuesta? ¿Por qué?**

No. El prompt Nivel 3 fue el más completo y específico de los tres, y sin embargo **ningún asistente lo cumplió al 100%**: Gemini ignoró la restricción de formato (PDF) tres veces seguidas, incluso con la instrucción explícita de autoverificarse antes de entregar; Copilot cumplió el formato pero entregó un documento cortado, sin la mitad de las secciones pedidas. Un prompt bien construido reduce la ambigüedad y permite detectar incumplimientos con precisión, pero no garantiza que el modelo los respete — cada asistente tiene sus propios límites de ejecución (capacidad de generar archivos, seguimiento de instrucciones largas, autochequeo real vs. autochequeo simulado) que el prompt no puede forzar por sí solo.

**3. ¿Qué diferencias observaste entre los asistentes de IA?**

- **Copilot CLI:** conservador al inicio (pregunta antes de asumir), respuestas claras y bien acotadas, capaz de generar el archivo PDF real solicitado — pero con tendencia a truncar contenido extenso antes de completar todas las secciones pedidas.
- **Gemini:** el más técnico y detallado de los tres en todos los niveles (RAG, arquitecturas en capas, fórmulas de riesgo, tablas de mitigación), tiende a asumir alcance y complejidad sin preguntar, y repitió el mismo incumplimiento de formato (no generar el PDF) en los tres niveles pese a que se le pidió explícitamente y se le dio instrucción de autoverificación.
- **Claude (Nivel 1 únicamente):** punto intermedio — ni preguntó como Copilot ni asumió tanta complejidad técnica como Gemini.

**4. ¿El resultado depende más del modelo utilizado o de la calidad del prompt? Justificar con evidencia obtenida durante la actividad.**

De los dos, **depende más del modelo** en esta actividad puntual: el prompt Nivel 3 fue idéntico para Copilot y Gemini, con restricciones y autoverificación explícitas, y aun así cada uno falló en un aspecto distinto y consistente con su comportamiento en los niveles anteriores — Gemini nunca generó el PDF en ningún nivel (falla de ejecución/capacidad, no de comprensión del prompt) y Copilot mostró la misma tendencia a acotar/resumir contenido ya en el Nivel 1 (respuestas más cortas y estructuradas) que terminó truncando el documento en el Nivel 3. La calidad del prompt sí importa — sin las restricciones y el formato explícito del Nivel 3 no hubiera sido posible detectar estos incumplimientos con precisión — pero no alcanzó para corregir limitaciones propias de cada asistente.
