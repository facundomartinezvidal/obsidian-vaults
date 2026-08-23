---
clase: 02
tema: Generación de contenido aplicada a mi carrera — Entrega
fecha_limite: 2026-08-17T23:59:00
tipo: entrega
asistentes: [Claude]
tema_elegido: Landing page para empresa de desarrollo de software (Exelior)
---

# Clase 2 — 2da Actividad: Entrega

## Escenario elegido

- **Carrera:** Ingeniería Informática / Desarrollo de software
- **Organización:** Exelior — empresa de desarrollo de software a medida
- **Audiencia:** no especificada en el prompt (asumida por la IA — ver auditoría)
- **Producto final elegido:** Opción C — Contenido comercial → landing page

## 1. Prompt inicial (Nivel 1 — "Hacelo vos, IA")

> "haceme una landing page para mi empresa de desarrollo de software exelior"

**Asistente:** Claude (Claude Design / artifact)
**Archivo generado:** [[02-nivel1-claude-landing-exelior.html]]

### Resultado generado

Landing page completa de una sola página, secciones:

- **Nav:** logo EXELIOR, links (Servicios, Cómo trabajamos, Casos), CTA "Agendar reunión"
- **Hero:** título "Software a medida para PyMEs que ya no entran en un Excel", copy sobre apps para pedidos/stock/clientes/remitos, CTAs "Agendar una reunión de 30 min" / "Ver casos"
- **Barra de confianza:** "Reunión sin costo · Diagnóstico escrito en 48h · Presupuesto cerrado por etapa"
- **Tabla "Cómo trabajamos, en números"** (formato tipo ficha técnica, HOJA 01 · REV. 2026): primera versión usable (4 semanas), presupuesto cerrado, entregas cada 2 semanas, código 100% del cliente
- **Qué hacemos:** 3 servicios — Sistemas de gestión, Portales de clientes, Rescate de sistemas
- **Cómo trabajamos:** 4 pasos — Diagnóstico, Prototipo, Construcción, Puesta en marcha
- **Casos:** 1 caso destacado (distribuidora, 30 personas, 900 pedidos/mes) + 3 mini-casos (metalúrgica, estudio contable, constructora) + testimonio de cliente
- **Hablemos:** formulario de contacto (nombre/empresa, email/teléfono) + CTAs "Agendar reunión" / "Escribir por WhatsApp"
- **Footer:** datos de contacto (email, teléfono)

## 2. Auditoría del resultado

> "La IA generó el contenido. Ahora nosotros somos responsables del contenido."

### Problemas de contenido (2)

1. **Casos de éxito y testimonio inventados.** Los 4 casos (distribuidora de 30 personas/900 pedidos, metalúrgica, estudio contable de 400 clientes, constructora) y la cita del "Gerente de operaciones, distribuidora de alimentos" son ficticios, presentados con formato de casos reales. Exelior no tiene historial (el prompt no lo aportó) — publicar esto tal cual es publicidad engañosa.
2. **Datos de contacto placeholder sin marcar.** `hola@exelior.com` y `+54 9 11 0000 0000` son valores inventados por la IA. Si no se reemplazan antes de publicar, la landing queda con datos de contacto falsos.

### Problemas de comunicación (2)

1. **Tagline con tono potencialmente ofensivo.** "Software a medida para PyMEs que ya no entran en un Excel" es ingenioso pero puede leerse como una crítica al modo de trabajo del cliente ("manejás mal tu negocio"), lo cual es un riesgo según la sensibilidad del segmento.
2. **Registro inconsistente.** La tabla "HOJA 01 · REV. 2026" usa jerga de control documental/versionado técnico que no encaja con el tono conversacional y cercano del resto de la página — ruido para un dueño de PyME no técnico.

### Problema de audiencia (1)

El prompt no especificó audiencia. Claude asumió unilateralmente "PyMEs" como público objetivo. Una empresa de desarrollo de software podría apuntar a otros segmentos (startups, corporativos, equipos técnicos B2B) — la IA redujo el alcance del negocio sin que se lo pidieran.

### Afirmación a verificar (1)

Los compromisos de tiempo concretos — "primera versión usable: 4 semanas", "diagnóstico escrito en 48h" — son promesas casi contractuales. Deberían verificarse contra la capacidad real del equipo de Exelior antes de publicarlas, ya que generan una expectativa comercial concreta frente al cliente.

## 3. Prompt profesional (Nivel 2)

Prompt autocontenido, listo para pegar en un chat nuevo (sin contexto previo):

> Actuá como copywriter y diseñador web especializado en landing pages B2B para empresas de software.
>
> Exelior es una empresa de desarrollo de software a medida recién formada, sin clientes ni casos de éxito todavía. Necesito una landing page para su lanzamiento.
>
> La audiencia son dueños y gerentes de PyMEs (10-100 empleados) que hoy gestionan su operación con planillas de Excel o sistemas desactualizados, y están evaluando tercerizar el desarrollo de un sistema a medida. No son técnicos.
>
> El objetivo es que el visitante entienda en menos de 10 segundos qué hace Exelior y agende una reunión de diagnóstico gratuita. El mensaje central: Exelior desarrolla software a medida (sistemas de gestión, portales de clientes, modernización de sistemas viejos), con presupuesto cerrado por etapa y entregas revisables cada 2 semanas.
>
> Restricciones:
> - No inventes casos de éxito, testimonios ni cifras de clientes reales — todavía no los tengo. Si incluís una sección de "casos", marcala explícitamente como ejemplo ilustrativo ("así se vería un proyecto típico"), nunca como cliente real.
> - No inventes datos de contacto (email, teléfono) — dejá placeholders marcados como `[COMPLETAR]`.
> - No prometas plazos concretos ("4 semanas", "48 horas") como garantía fija — usá lenguaje de rango o condicional ("depende del alcance", "se estima en el diagnóstico").
>
> Tono: profesional y cercano, sin ironía ni frases que puedan sonar como una crítica al modo de trabajo actual del cliente. Evitá jerga técnica de control documental (versionado, "REV.", "HOJA 01").
>
> Formato: landing page de una sola página en HTML, con hero, sección de servicios, sección de cómo se trabaja (proceso en pasos) y sección de contacto con formulario. Sin sección de casos reales.
>
> Criterios de calidad: copy específico al problema del cliente (no genérico), sin afirmaciones no verificables, con una única llamada a la acción principal clara.
>
> Antes de entregar la respuesta, verificá si cumpliste todos los requisitos, en particular que no haya casos/testimonios inventados presentados como reales, ni datos de contacto ficticios. Si detectás incumplimientos, corregilos antes de presentar la respuesta final.

## 4. Segunda generación (iteraciones)

**Archivo generado (Iteración 1):** [[02-nivel2-claude-landing-exelior.html]]

### Iteración 1 — resultado

Landing rediseñada siguiendo el prompt profesional:

- **Hero:** "Desarrollamos el sistema que hoy tenés repartido en planillas", badge "Para PyMEs de 10 a 100 empleados", CTA única "Agendar diagnóstico gratuito", panel lateral "Señales de que te conviene un sistema propio" (4 puntos de dolor concretos)
- **Qué desarrollamos:** 3 servicios con detalle específico (Sistemas de gestión, Portales de clientes, Modernización de sistemas)
- **Cómo trabajamos:** 4 etapas (Diagnóstico → Propuesta → Desarrollo → Puesta en marcha), sin promesas de plazo fijo — explícitamente aclara que la duración depende del alcance
- **3 tarjetas de honestidad:** "Somos nuevos y lo decimos" (reconoce que no tienen cartera de clientes), "Hablamos sin tecnicismos", "Nada de esto te ata"
- **Contacto:** formulario + `[COMPLETAR]` en email/teléfono/ubicación — sin datos falsos
- **Footer:** "Contacto: [COMPLETAR]"

### Verificación contra el prompt profesional

| Restricción del prompt | Cumplida |
|---|---|
| Sin casos/testimonios inventados | ✅ — reemplazado por sección honesta "Somos nuevos" |
| Sin datos de contacto falsos | ✅ — `[COMPLETAR]` en todos los campos |
| Sin promesas de plazo fijo | ✅ — lenguaje condicional explícito |
| Tono sin ironía/crítica al cliente | ✅ — headline neutro |
| Sin jerga de control documental | ✅ — eliminada la tabla tipo ficha técnica |
| Audiencia definida (PyMEs 10-100 empleados) | ✅ — badge explícito en el hero |
| Una sola CTA principal | ✅ — "Agendar diagnóstico" consistente en nav/hero/footer |

Los 6 problemas detectados en la auditoría del Nivel 1 quedaron resueltos.

### Iteración 2 — pedido de mejora específica

Lo único mejorable: la sección de transparencia ("Somos nuevos y lo decimos") queda diluida entre otras dos tarjetas de beneficios genéricos, cuando es el dato más importante para generar confianza con una audiencia escéptica.

> Prompt de iteración 2:
> "La landing quedó muy bien. Un ajuste: la aclaración de que Exelior es una empresa nueva sin cartera de clientes está enterrada como una tarjeta más entre otras dos. Movela justo debajo del hero, como su propio bloque destacado (no una feature más), y reformulala como una aclaración directa y honesta — no como un value prop de venta."

**Archivo generado (Iteración 2):** [[02-nivel2.1-claude-landing-exelior.html]]

### Iteración 2 — resultado

Cumplió el pedido con precisión: la aclaración de transparencia ahora es un bloque propio, destacado (borde lateral + fondo diferenciado), ubicado inmediatamente debajo del hero — antes de la sección de servicios. Copy reformulado en tono directo:

> "Nos formamos este año y todavía no tenemos clientes ni proyectos terminados para mostrarte. Preferimos decirlo acá y no que lo descubras después: en esta página no vas a encontrar testimonios ni casos de éxito, porque no los tenemos. Lo que sí podemos ofrecerte es una forma de trabajo que reduce el riesgo de tu lado: etapas con precio cerrado y algo funcionando para revisar cada dos semanas. Así nos evaluás por lo que entregamos y no por lo que prometemos."

La grilla de tarjetas inferior quedó con solo 2 (Hablamos sin tecnicismos / Nada de esto te ata), sin diluir el mensaje de transparencia entre features genéricos. Con esto se completan las 2 iteraciones mínimas pedidas por la consigna.

## 5. Cambio de asistente

Mismo prompt profesional (Nivel 2) ejecutado en **Lovable**.

**Archivo generado:** [[02-nivel2-lovable-landing-exelior.html]]

### Resultado

Landing con estilo SaaS comercial clásico: hero con mockup de dashboard + foto de equipo trabajando, CTA azul "Solicitar reunión de diagnóstico", 3 servicios, 4 pasos de trabajo ("Así trabajamos en Exelior"), sección de contacto sobre fondo oscuro con formulario, footer con `[COMPLETAR EMAIL]` / `[COMPLETAR: Ciudad, País]`.

### Verificación contra el prompt profesional

| Restricción del prompt | Cumplida |
|---|---|
| Sin casos/testimonios inventados | ✅ — no incluye sección de casos |
| Sin datos de contacto falsos | ✅ — `[COMPLETAR EMAIL]`, `[COMPLETAR: Ciudad, País]` |
| Sin promesas de plazo fijo | ✅ — habla de cadencia de revisión (cada 15 días), no de duración total del proyecto |
| Tono sin ironía/crítica al cliente | ⚠️ parcial — "Su empresa creció, sus sistemas también deberían" es más aspiracional que irónico, pero roza el mismo mecanismo retórico de v1 de Claude |
| Sin jerga de control documental | ✅ |
| Audiencia definida (PyMEs 10-100 empleados) | ❌ — menciona "PyMEs que superaron sus planillas de Excel" pero no explicita el rango de tamaño pedido en el prompt |
| Una sola CTA principal | ✅ — "Agendar diagnóstico" / "Solicitar reunión" consistente |

**Diferencia clave con Claude:** Lovable resuelve la ausencia de casos por *omisión* (simplemente no los incluye). Claude, en su Iteración 2, va más allá y lo convierte en una *declaración explícita de transparencia* ("somos nuevos y lo decimos"), lo cual responde mejor al objetivo de generar confianza con una audiencia escéptica.

### ¿El mismo prompt produjo el mismo resultado?

No. Ambos cumplieron las restricciones centrales (sin casos falsos, sin contacto inventado, sin promesas de plazo fijo), pero difieren en:

- **Estructura visual:** Lovable usa fotografía/mockups (estética SaaS comercial); Claude es tipográfico y minimalista, sin imágenes, con un panel de "señales de dolor" en el hero.
- **Manejo de la falta de casos:** Claude lo declara explícitamente (transparencia activa); Lovable lo omite en silencio.
- **Precisión de audiencia:** Claude explicita "PyMEs de 10 a 100 empleados" (dato pedido en el prompt); Lovable lo generaliza.

### ¿Cuál usarías profesionalmente?

La versión de **Claude (Iteración 2)**, por la decisión de contenido: convertir "no tenemos clientes todavía" en un bloque de transparencia activa es más efectivo para el objetivo declarado (generar confianza en una audiencia escéptica que evalúa tercerizar desarrollo) que omitirlo sin más, como hizo Lovable. La resolución visual de Lovable es más pulida (fotografía, mockups), pero en una landing de una empresa nueva sin trayectoria, el copy estratégico pesa más que el acabado estético. Ideal: contenido de Claude + producción visual de Lovable.

## Producto final

**1. Prompt inicial (pobre):**
> "haceme una landing page para mi empresa de desarrollo de software exelior"

**2. Prompt profesional:** ver sección [[#3. Prompt profesional (Nivel 2)]] — rol de copywriter/diseñador B2B, contexto de empresa nueva sin clientes, audiencia (PyMEs 10-100 empleados), objetivo, mensaje, restricciones explícitas contra casos/testimonios/contacto inventados y promesas de plazo fijo, tono, formato, criterios de calidad y verificación.

**3. Resultado final elegido:** [[02-nivel2.1-claude-landing-exelior.html]] (Claude, Iteración 2)

Se elige esta versión sobre el Nivel 1, la Iteración 1 y la versión de Lovable porque es la única que convierte la ausencia de casos de éxito en una declaración de transparencia activa ("Exelior es una empresa nueva... preferimos decirlo acá y no que lo descubras después"), ubicada como bloque propio inmediatamente debajo del hero. Cumple el 100% de las restricciones del prompt profesional (sin casos/testimonios/contacto inventados, sin promesas de plazo fijo, audiencia explícita, sin jerga técnica).

**4. Reflexión** (qué cambió entre el primer y el último resultado):

El Nivel 1 (prompt de una línea) generó una landing visualmente completa pero con 6 problemas de fondo: casos y testimonios de clientes inventados, datos de contacto falsos, una audiencia asumida sin pedirlo y promesas de plazo presentadas como garantía. El prompt profesional no mejoró la redacción — cambió la responsabilidad: al explicitar restricciones (no inventar clientes, no inventar contacto, no prometer plazos fijos) y pedir verificación, la IA dejó de rellenar huecos de información con datos plausibles pero falsos, y en su lugar señaló lo que faltaba (`[COMPLETAR]`) o lo transformó en un argumento de venta honesto. El salto de calidad real no fue estético: fue la eliminación de afirmaciones no verificables.

## Para responder

> "Si una IA puede generar contenido en 10 segundos… ¿qué valor aporta un profesional?"

El valor no está en generar el texto o el HTML — eso ya lo demostró el Nivel 1 en segundos. Está en la auditoría: detectar que los "casos de éxito" eran inventados, que los datos de contacto eran falsos, que la audiencia fue asumida sin pedirlo y que las promesas de plazo comprometían a la empresa sin base real. Ninguno de esos problemas es técnico — son de criterio, contexto de negocio y responsabilidad legal/reputacional, y ahí es donde un profesional sigue siendo insustituible: la IA no sabe que Exelior no tiene clientes todavía; quien conoce el negocio sí.
