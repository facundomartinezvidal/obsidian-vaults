# Documento de Arquitectura y Plan de Desarrollo

> Sistema de gestión académica, detección de riesgo y recomendación de estudio — respuesta de Gemini, Nivel 3 (Prompt Battle, Clase 2)
> Rol: Ingeniero de Software enfocado en buenas prácticas y desarrollo limpio.

---

## 1. Problema

Los estudiantes de educación superior enfrentan dificultades recurrentes en la gestión de su trayectoria académica:

* **Desorganización temporal y de contenidos:** dificultad para coordinar entregas, parciales y lecturas requeridas según el programa oficial de cada asignatura.
* **Detección tardía del riesgo académico:** falta de visibilidad previa sobre situaciones críticas (p. ej., acumulación de faltas, correlatividades en riesgo o promedio insuficiente para promocionar) antes de que la condición sea irreversible.
* **Falta de foco en el estudio:** pérdida de tiempo consultando material no oficial o desalineado con la planificación explícita de los docentes.

En el ámbito universitario, una solución efectiva debe resolver estos puntos sin sobrecargar la infraestructura existente ni exponer datos personales sensibles.

---

## 2. Propuesta de Solución

Desarrollo de un **Asistente de Gestión e Orientación Académica** (Mobile First / Web Progressive) para estudiantes universitarios de 18 a 30 años, enfocado en la simplicidad de uso y el cumplimiento de estándares de desarrollo limpio (*Clean Code / Clean Architecture*).

### Principios del Diseño

* **Orientado a Recomendar, No a Decidir:** el sistema calcula métricas objetivas de avance e identifica desviaciones respecto del programa, sugiriendo acciones recomendadas. La decisión final e interpretación corresponden siempre al estudiante.
* **Restricción Estricta de Contenido:** el motor de recomendaciones se nutre exclusivamente de los programas oficiales ingresados/importados y la bibliografía provista por la universidad (repositorio institucional / bibliotecas digitales).
* **Minimización de Datos:** no requiere ni almacena información personal sensible (salud, datos biométricos, situación socioeconómica, etc.).

---

## 3. Arquitectura Conceptual

Arquitectura en Capas Limpia (*Clean Architecture / Hexagonal Architecture*) para aislar la lógica de negocio de los detalles tecnológicos (interfaces, frameworks y bases de datos).

```
+-----------------------------------------------------------------------+
|                       Capa de Presentación                            |
|             (React / Flutter Mobile App & Web App)                    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                   Capa de API Gateway & Seguridad                     |
|           (Autenticación JWT, Rate Limiting, CORS, HTTPS)             |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    Capa de Casos de Uso (Dominio)                     |
|  [Gestión Materias]  [Detector de Riesgos]  [Recomendador Bibliográfico] |
+-----------------------------------------------------------------------+
            |                                             |
            v                                             v
+-----------------------+                     +-------------------------+
| Capa de Datos (ORM)   |                     | Motor de Búsqueda RAG   |
| (PostgreSQL / Redis)  |                     | (ChromaDB / PGVector)   |
+-----------------------+                     +-------------------------+
            |                                             |
            +----------------------+----------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    Fuentes Oficiales Universitarias                   |
|         (Programas de Materia en PDF / Bibliotecas Digitales)         |
+-----------------------------------------------------------------------+
```

### Componentes Clave

1. **Frontend (App Móvil/Web):** interfaz limpia, reactiva e intuitiva (navegación por pestañas: *Mis Materias*, *Riesgos/Progreso*, *Agenda/Recomendaciones*).
2. **Core API Service (Node.js / Go):** implementa reglas del dominio (cálculo de notas, correlatividades, porcentajes de asistencia y cronogramas).
3. **Indexador de Bibliografía y Programas (Servicio Vectorial / Búsqueda Semántica):** parsea los PDFs oficiales de programas y bibliografía. Permite buscar unidades temáticas y sugerir capítulos o textos exactos según fechas lectivas.
4. **Base de Datos Relacional (PostgreSQL):** almacena materias, comisiones, entregas, calificaciones e hitos del programa.
5. **Caché y Cola de Tareas (Redis):** manejo de sesiones de usuario y cálculo asincrónico de alertas.

---

## 4. Funcionalidades Principales

### A. Gestión y Mapeo del Programa Oficial

* Carga/sincronización del programa de la materia (unidades, bibliografía obligatoria, cronograma de exámenes).
* Seguimiento visual del progreso por unidad temática y fechas clave.

### B. Detector de Riesgos Académicos (Basado en Reglas Deterministas)

* **Regla de Asistencia:** alerta si la asistencia acumulada se acerca al límite mínimo de regularidad definido por el programa.
* **Regla de Evaluaciones:** semáforo de estado (Verde / Amarillo / Rojo) según la nota requerida para promoción o regularidad frente a las notas obtenidas.
* **Correlatividades:** advertencia previa sobre el impacto de reprobar una materia en las inscripciones del siguiente cuatrimestre.

### C. Recomendador de Estudio Centrado en Bibliografía Oficial

* Generación de itinerarios de lectura semanal ajustados al calendario académico de la universidad.
* Enlace directo a capítulos y textos específicos de la biblioteca digital o repositorios oficiales de la institución.

---

## 5. Riesgos del Proyecto y Mitigación

| Riesgo Identificado | Impacto | Estrategia de Mitigación |
|---|---|---|
| Alucinación o sugerencia de fuentes externas por IA | Alto | Prohibir consultas a APIs abiertas de IA generativa sin restricción. Usar arquitectura RAG estricta limitada únicamente a documentos indexados del repositorio universitario. |
| Rechazo o baja adopción por complejidad de carga | Alto | Ofrecer carga automatizada mediante ingesta de programas en PDF pre-configurados por la universidad. |
| Pérdida o filtración de datos de rendimiento académico | Medio | Cifrado en tránsito (TLS 1.3) y en reposo (AES-256). Autenticación mediante Identity Provider (IdP) institucional (OAuth2/OIDC). |
| Diagnóstico o etiquetado subjetivo no deseado | Medio | No emplear clasificaciones psicológicas o de rendimiento personal ("estudiante deficiente"). Mostrar únicamente porcentajes matemáticos y requisitos de norma. |

---

## 6. Controles de Seguridad y Privacidad

1. **Minimización y Anonimización de Datos:** solo se almacenan identificadores anónimos de usuario (`user_id` Hash UUID), código de materia, calificaciones e hitos. No se solicitan ni guardan DNI, dirección, datos biométricos, ni información médica.
2. **Cumplimiento Normativo (GDPR / Leyes Locales de Protección de Datos):** consentimiento explícito de uso. Funcionalidad de exportación y eliminación definitiva de la cuenta e historial académico a demanda del estudiante (*Derecho al Olvido*).
3. **Aislamiento de Entorno:** las consultas bibliográficas no salen de la red o tenant institucional habilitado.
4. **Control de Acceso Basado en Roles (RBAC):** los estudiantes solo acceden a sus propios registros. Ningún otro estudiante puede visualizar notas o estadísticas ajenas.

---

## 7. Ejemplo de Interacción

```
[Estudiante ingresa a la materia "Algoritmos y Estructuras de Datos"]
                             |
                             v
+--------------------------------------------------------------------+
| PANEL DE ESTADO ACADÉMICO                                          |
| - Regularidad actual: 75% Asistencia (Mínimo requerido: 75%)        |
| - Promedio parciales: 5.5 / 10                                     |
+--------------------------------------------------------------------+
                             |
                             v
[SISTEMA EVALÚA REGLAS DE DOMINIO (SIN TOMAR DECISIONES AUTOMÁTICAS)]
                             |
                             v
+--------------------------------------------------------------------+
| ALERTA DE RIESGO (Informativa):                                    |
| "Tenés 1 falta disponible antes de perder la regularidad."         |
| "Para promocionar necesitás al menos 7.0 en el Parcial 2."         |
+--------------------------------------------------------------------+
                             |
                             v
+--------------------------------------------------------------------+
| RECOMENDACIÓN DE ESTUDIO (Basada en el Programa Oficial):           |
| "Próximo tema: Arboles Binarios (Semana 8)"                        |
| Lectura sugerida: Capítulo 5, 'Estructuras de Datos' (Autor, Año) |
| [Enlace a Biblioteca Digital Universitaria]                        |
+--------------------------------------------------------------------+
```

---

## 8. Recomendaciones de Implementación y Stack Tecnológico

### Stack Técnico Recomendado

* **Frontend:** React Native (Expo) o Flutter para desarrollo multiplataforma móvil y soporte PWA Web.
* **Backend:** Node.js (TypeScript) con NestJS (promueve arquitectura limpia y patrones SOLID).
* **Base de Datos:** PostgreSQL con extensión `pgvector` para la búsqueda semántica de bibliografía.
* **Autenticación:** integración Single Sign-On (SSO) con SAML 2.0 / OIDC de la universidad.

### Plan de Desarrollo (Fases)

1. **Fase 1: Módulo Core y Modelado de Datos (Semanas 1-4)** — configuración de la arquitectura en capas, módulo de gestión de materias, calificaciones y reglas de cálculo.
2. **Fase 2: Motor de Ingesta de Programas y Búsqueda (Semanas 5-8)** — parser de PDF de programas oficiales, indexación semántica restringida a bibliografía institucional.
3. **Fase 3: Módulo de Alertas y Recomendador (Semanas 9-12)** — motor de reglas de riesgo (asistencia, calificaciones, correlativas), generador de recomendaciones de estudio ajustado al calendario.
4. **Fase 4: Auditoría de Seguridad y Piloto (Semanas 13-16)** — pruebas de penetración (DAST/SAST), verificación del cumplimiento de privacidad, despliegue piloto en un conjunto acotado de asignaturas.

---

**Incumplimiento detectado respecto al prompt (restricción de formato PDF):** el asistente no generó el archivo PDF solicitado — devolvió una nota indicando herramientas de conversión (`pandoc`, impresión de navegador, editores Markdown) en vez de entregar el documento. Pese a que el prompt incluía instrucción explícita de autoverificación ("antes de entregar la respuesta, verificá si cumpliste todos los requisitos"), no corrigió este incumplimiento.
