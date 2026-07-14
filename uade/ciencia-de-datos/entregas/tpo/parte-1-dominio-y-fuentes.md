# TPO — Parte 1: Selección del Dominio del Negocio

**Asignatura:** Ciencia de Datos (3.4.217) — UADE
**Dominio elegido:** No-show de turnos médicos (candidato 4 — ver [[criterios-eleccion-dominio]])
**Audiencia:** Gerencia Comercial y Técnica

---

## 1. Descripción del dominio

Un **centro de salud ambulatorio** (clínica u hospital) atiende pacientes por turnos
programados. El circuito es: el paciente solicita un turno (presencial, telefónico o web),
se le asigna fecha y hora con un profesional, y el día indicado asiste — o no.

La agenda del profesional es el recurso central del negocio: cada franja horaria tiene un
costo fijo (el tiempo del médico) y una capacidad limitada. La gestión eficiente de esa
agenda determina cuántos pacientes se atienden y con qué nivel de espera.

## 2. Problemática

El **ausentismo a turnos médicos** (*no-show*) ronda el **20–30%** de los turnos otorgados.
Cuando un paciente no asiste y no avisa:

- La franja horaria queda **ociosa**: una hora del profesional que igual se paga.
- Otro paciente que **sí habría asistido** no pudo ocupar ese lugar → más lista de espera.

Es un **doble costo**: recurso médico desperdiciado + peor acceso para el resto. Hoy el
centro no sabe *de antemano* quién va a faltar, así que no puede hacer nada al respecto.

## 3. Propuesta de valor

Predecir, **en el momento de agendar**, la probabilidad de que cada paciente falte a su
turno, para accionar sobre los de mayor riesgo:

- **Recordatorios dirigidos** (SMS / llamado) a quienes más probablemente falten.
- **Sobreturnos controlados** en franjas de alto riesgo de ausentismo.

**Resultado para el negocio:** menor ausentismo, mejor uso de la agenda y reducción de la
lista de espera — sin sumar recursos. Cada no-show evitado recupera una hora de atención.

## 4. Fuentes de datos

### Fuente principal — Medical Appointment No Shows (Kaggle)

- **Origen:** [Kaggle](https://www.kaggle.com/datasets/joniarroba/noshowappointments) — turnos reales de salud pública de Brasil.
- **Volumen:** +110.000 turnos (filas).
- **Variables (14):** edad, género, barrio, fechas de agendamiento y de turno, comorbilidades
  (diabetes, hipertensión, alcoholismo, discapacidad), si recibió SMS, beca social (*Bolsa Família*),
  y la variable objetivo: **asistió / no asistió**.
- **Por qué sirve:** dataset limpio, masivo y documentado, con la variable a predecir ya
  etiquetada. Mezcla variables categóricas y numéricas → permite mostrar EDA y feature engineering.

### Fuente secundaria — Clima por fecha (expectativa superadora)

- **Origen:** dataset/API meteorológico histórico (ej. clima diario por ciudad y fecha).
- **Integración:** se cruza por la **fecha del turno** (cada turno ya tiene fecha) → trivial.
- **Por qué sirve:** permite analizar si la lluvia o la temperatura inciden en el ausentismo.
  Cumple el requisito superador de **"varias fuentes de datos distintas"**.

> ⚠️ **A confirmar con el docente:** ¿cruzar el dataset principal con clima por fecha cuenta
> como "varias fuentes de datos distintas" para la expectativa superadora? (pregunta 5 del
> archivo de criterios).

---

## Qué hay que detallar en la Parte 1 (checklist)

La consigna pide una **"descripción concisa pero descriptiva"** del dominio. Para esta parte
hay que dejar cerrado:

| Punto | Qué responde | Estado |
|---|---|---|
| **Dominio** | ¿De qué negocio hablamos? ¿Cómo funciona el circuito de turnos? | ✅ §1 |
| **Problemática** | ¿Qué duele y cuánto cuesta? (cuantificar el ausentismo) | ✅ §2 |
| **Propuesta de valor** | ¿Qué gana el negocio si lo resolvemos? | ✅ §3 |
| **Fuente principal** | Origen, volumen, variables, calidad, por qué sirve | ✅ §4 |
| **Fuente secundaria** | Cuál, cómo se integra, qué aporta (superadora) | ✅ §4 |

Pendiente de validar con el docente: clima como segunda fuente (ver nota en §4).
