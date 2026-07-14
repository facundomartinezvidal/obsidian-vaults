# Seminario de Integración Profesional (SIPI)

## Sobre la materia

El Seminario de Integración Profesional es una materia integradora de UADE donde cada grupo define una problemática real y construye un proyecto completo a lo largo del cuatrimestre, aplicando metodologías como Design Thinking, Océano Azul y MVP.

- **Materia:** Seminario de Integración Profesional (código 3.4.211 — DETIN, FAIN)
- **Curso:** 565668 | **N° de clase:** 15764
- **Horario:** Lunes Noche 18:30–22:00 (20 semanas, 68 hs)
- **Docentes:** Ing. Juan Carlos Montero (adjunto) | Ing. Julieta Viarengo
- **Año:** 2026 — 1er Cuatrimestre

## Equipo — Grupo 02

| Legajo | Nombre | E-Mail |
|--------|--------|--------|
| 1156810 | Martinez Vidal Facundo | fmartinezvidal@uade.edu.ar |
| 11159922 | Mayán Jonathan | jmayan@buenosaires.gob.ar |
| 1156320 | Moreno Inaki | imoreno@uade.edu.ar |

## Proyecto: RADAR — Gestor de Gastos

El producto se llama **RADAR**. Es una plataforma digital (móvil y web) que centraliza el seguimiento de gastos personales y compartidos para jóvenes adultos con vida financiera digital activa.

### La Problemática

**¿Qué problema se intenta resolver?**

Jóvenes adultos (18–35 años) con vida financiera digital activa no pueden hacer un seguimiento claro de sus gastos personales. Sus transacciones están distribuidas entre múltiples billeteras y cuentas, involucran más de una moneda, y una parte importante ocurre en contextos de gasto compartido. Esto genera descontrol financiero, falta de visibilidad sobre el gasto real y dificultad para tomar decisiones económicas informadas.

**Las tres causas principales:**

1. **Fragmentación financiera** — el dinero está distribuido entre Mercado Pago, Ualá, bancos tradicionales, digitales y plataformas internacionales en dólares. Impide tener una visión unificada del flujo de dinero.

2. **Baja trazabilidad del gasto cotidiano** — el usuario realiza múltiples transacciones diarias (cafés, transporte, apps) pero no las registra, no las recuerda y no las analiza. Genera desconexión entre lo que se gasta y lo que se cree gastar.

3. **Gestión informal de gastos compartidos** — salidas, alquiler, compras grupales se manejan con WhatsApp, notas o de memoria. Genera deudas no saldadas y falta de trazabilidad.

**¿Por qué las herramientas actuales no resuelven esto?**
Las soluciones existentes tienen exceso de complejidad, mala experiencia móvil, no contemplan gastos compartidos y dependen de planillas manuales.

### Contexto

- Más del 70% de los adultos en Argentina usa medios de pago electrónicos habitualmente (BCRA)
- Inflación superior al 100% anual en períodos recientes obliga a manejar más de una moneda
- Más del 80% de LATAM accede a internet desde móvil (GSMA)
- Más del 60% de los jóvenes realiza gastos grupales al menos una vez por semana (Statista)

### Perfiles de Usuario

- **Perfil 1 — El estudiante que comparte departamento** (21 años): divide alquiler, expensas y compras con compañeros, coordina por WhatsApp, siempre hay deudas pendientes.
- **Perfil 2 — El joven profesional que sale seguido** (28 años): trabaja, tiene ingresos estables pero llega justo a fin de mes, usa múltiples medios de pago, intentó Excel y lo abandonó.
- **Perfil 3 — El que maneja pesos y dólares** (32 años): trabaja de forma independiente, parte de sus ingresos en dólares, necesita controlar en qué moneda gasta.

### La Solución (RADAR)

Plataforma digital accesible desde celular y web con tres ejes:

1. **Seguimiento personal unificado** — registro rápido de gastos, categorización, visualización mensual sin importar desde qué billetera se realizó la transacción.

2. **Gestión de gastos compartidos** — registrar gastos entre varias personas, calcular automáticamente quién le debe qué a quién, saldar deudas de forma simple. Reemplaza el sistema informal de WhatsApp.

3. **Soporte multi-moneda** — registro en pesos y dólares, conversión automática según tipo de cambio para comparar el gasto real en una sola unidad.

4. **IA e integración con WhatsApp** — análisis de patrones de gasto, recomendaciones personalizadas, y registro conversacional desde WhatsApp para reducir la fricción.

### Hipótesis del Problema

- Los jóvenes adultos (18–35 años) no tienen claridad sobre en qué gastan su dinero al final del mes, incluso pagando de forma digital.
- Al pagar digitalmente no perciben el impacto económico de cada transacción (cashless effect).
- El dinero distribuido en múltiples plataformas impide tener una visión unificada del estado financiero.
- Los gastos compartidos ocurren al menos una vez por semana y se resuelven de forma informal.
- Las herramientas actuales son complejas, no contemplan gastos compartidos o no se adaptan al uso móvil cotidiano.

## Estructura de notas

Archivos en kebab-case con prefijo `NN-tipo-descripcion`, ordenados por la cursada.

- `content/cronograma/` — cronogramas oficiales y material de cátedra transversal: `01-cronograma-v1.pdf`, `02-cronograma-r2.pdf`, `03-cronograma-rfinal.pdf` (vigente), `04-sugerencia-marco-conceptual.pdf`
- `content/parcial-1/` — material clases 1–6: MVP, Segmento, Selección de Problema, Pensamiento Lateral / Paradoja de la Maleta, Design Thinking, Mapa de Empatía, Taller de Oratoria, Océano Azul
- `content/parcial-2/` — material clases 8+: Business Model Canvas, Agile+Scrum+Kanban, Taller Madera de Líder
- `entregas/parcial-1/` — `01-entrega-segmentacion-usuarios.md` y `presentacion-parcial-1/` (deck web HTML + CSS + assets RADAR)
- `entregas/parcial-2/` — `01-entrega-bmc.pdf` (Business Model Canvas), `02-entrega-radar-avances-bmc-costos.pdf`
- `transcripts-classes/` — transcripciones de clases (`clase-9.docx`)

## Recursos del proyecto

- **MVP (código):** repo `radar-app` en `/Users/fmartinezvidal/Documents/github/radar-app` — app cross-platform Expo SDK 54 + React Native + TypeScript + Supabase. Usa OpenSpec (`openspec/`) y trabaja por Historias de Usuario (HU). Es el MVP construido para el TP.
- **TP (documentación):** Google Drive del grupo, una carpeta por entrega (`Entrega 1`…`Entrega7`). La entrega vigente del 2do parcial es **`Entrega7`**:
  - `Documentación` (Google Doc) — documento principal del TP
  - `ppt-contenido` (Google Doc) — contenido del PPT Story Telling
  - `2026-Proyecto Modelo SIP – TURNIFY.docx` — modelo de cátedra (referencia)

## Instrucciones para Claude

- **Siempre revisar el contenido de la materia** en `content/` antes de ayudar con cualquier entregable o tarea de SIPI. Los PDFs contienen el cronograma exacto, criterios de evaluación y requisitos de cada entrega.
- El cronograma oficial vigente es `content/cronograma/03-cronograma-rfinal.pdf`; versiones previas en la misma carpeta (`01-cronograma-v1.pdf`, `02-cronograma-r2.pdf`).
- Antes de crear o editar un entregable, verificar la fecha de entrega y qué se evalúa según el cronograma.

## Cronograma de entregas

| Fecha | Clase | Entregable |
|-------|-------|------------|
| 20/04 | 7 | **Primer Parcial**: Problema, Research, Insight, Empatía, Idea, Benchmarking, Elevator Pitch (presentación escrita + oral) |
| 01/06 | 13 | **Sprint Review Coaching #01**: estado real del MVP, evidencia de construcción, Sprint Review, semáforo de riesgo. Solo seguimiento + taller de retrospectivas |
| 08/06 | 14 | **Sprint Review Coaching #02 (Pre-Parcial)**: recordatorio del MVP, qué problema resuelve, flujo principal (1 min), Demo Funcional Front/Back/BDD/Integración (5 min) |
| 15/06 | 15 | Feriado |
| 22/06 | 16 | **Segundo Parcial**: Presentación Story Telling. Entrega Demo Versión Completa. Defensa: Marco Conceptual (5 min) + MVP (10 min) + Validación (5 min) |
| 29/06 | 17 | **Recuperatorio y Final Adelantado**: simulacro The Pitch orientado a la solución + entrega de documentación final |
| 06/07 | 18 | Libre |
| 13/07 | 19 | **Final Regular**: The Pitch + Demo — Presentación Final |
| 20/07 | 20 | **Final Desdoblado**: The Pitch + Demo — Presentación Final |

## Convenciones

- Nombres de archivos y carpetas en **kebab-case**
- Cada entregable tiene su propia nota vinculada con `[[wikilinks]]`
- Drive del grupo: https://drive.google.com/drive/u/0/folders/1zbmTdoFdyhfCWRE9h3RumeAemSUTfLFK
