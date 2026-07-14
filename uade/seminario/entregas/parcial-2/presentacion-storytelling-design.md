# RADAR — Brief de contenido para diseño de slides (Parcial II)

Presentación de 12 diapositivas, storytelling. Producto: **RADAR**, gestor de gastos personales y compartidos para jóvenes adultos. Tono: cercano, humano, con respaldo técnico y de datos. Identidad visual: mobile-first, limpia, moderna. A continuación, el contenido que debe ir en cada diapositiva.

---

## Diapositiva 1 — Portada

- **Título principal:** RADAR
- **Bajada:** El gestor de gastos que ve lo que vos no ves
- **Datos de pie:** Seminario de Integración Profesional · Grupo 02 · Martinez Vidal, Mayán, Moreno · Parcial II — 22/06/2026
- **Elemento visual:** logotipo RADAR centrado sobre fondo limpio. Composición minimalista, mucho aire.

---

## Diapositiva 3 — El problema real

- **Título:** No es desorden. Es un sistema fragmentado.
- **Las tres causas del problema (formato lista o tres bloques):**
  - **Fragmentación:** el dinero está repartido entre Mercado Pago, Ualá, bancos y dólares.
  - **Baja trazabilidad:** decenas de gastos cotidianos por día que nadie registra.
  - **Gastos compartidos informales:** se resuelven por WhatsApp y de memoria.
- **Datos de contexto (formato de cifras destacadas):**
  - +70% paga de forma electrónica
  - +80% accede a internet desde el móvil
  - +60% gasta en grupo cada semana
  - Inflación +100% → obliga a manejar más de una moneda
- **Fuentes (pie, letra chica):** BCRA · GSMA · Statista
- **Elemento visual:** mapa de logos de billeteras/bancos dispersos conectados con líneas hacia un centro caótico; o las cuatro cifras como números grandes.

---

## Diapositiva 4 — El marco conceptual

- **Título:** El problema no es anotar gastos
- **Subtítulo:** Es construir visibilidad financiera
- **Cuatro conceptos que enmarcan el problema (formato de cuatro tarjetas o capas):**
  - **Fragmentación financiera** — el dinero repartido impide una visión unificada.
  - **Economía conductual** — el registro manual es una fricción que rompe el hábito.
  - **Educación e inteligencia financiera** — ver para poder decidir.
  - **Jobs To Be Done** — qué "trabajo" contrata el usuario al buscar una app de gastos.
- **Elemento visual:** los cuatro conceptos representados como capas apiladas o cuadrícula 2×2.

---
## Diapositiva 6 — La solución: RADAR

- **Título:** Simplicidad con inteligencia
- **Subtítulo:** El espacio vacío entre el cuaderno y la billetera
- **Cuatro ejes de la solución (formato de cuatro features con ícono):**
  - Seguimiento personal unificado de todas las fuentes de dinero.
  - Gastos compartidos integrados — reemplaza el WhatsApp.
  - Soporte multi-moneda ARS/USD con conversión automática.
  - Inteligencia artificial + registro conversacional por WhatsApp.
- **Elemento visual:** captura de la pantalla principal de la app (dashboard) junto a los cuatro ejes.

---

## Diapositiva 7 — Cómo lo construimos

- **Título:** Tres capas, una experiencia
- **Arquitectura técnica (tres capas, formato de diagrama):**
  - **Front:** Expo + React Native — app móvil nativa real, no web adaptada.
  - **Back:** Supabase — autenticación OTP, base Postgres y seguridad a nivel de fila (RLS) por usuario.
  - **Integración:** OCR con modelo de visión LLaMA-4 sobre Groq, desplegado como Edge Function.
- **Métricas de avance (formato de cifras):**
  - 20 historias de usuario entregadas en 2 releases
  - 29 tests automáticos
- **Elemento visual:** diagrama de arquitectura en tres capas con flujo Front → Edge Function (OCR) → Base de datos.

---
## Diapositiva 10 — Lo que dijeron los usuarios

- **Título:** Lo probaron. Esto dijeron.
- **Contenido — resultados del test del MVP (formato de métricas destacadas):**
  - 25 usuarios beta · una semana de uso en su propio celular
  - 80% registró un gasto en menos de 30 segundos
  - El escaneo por foto fue la feature más valorada
  - NPS +36
  - 80% lo adoptaría como su app principal de gastos
- **Elemento visual:** tablero de métricas con tres o cuatro cifras grandes.

---
