# RADAR — Especificación de diseño de la presentación (Parcial II)

Cómo se debe ver cada slide. Reglas, convenciones y sistema de diseño, derivados de la identidad real del producto RADAR (`radar-app/desing-system` y `radar.css`). Acompaña a `presentacion-storytelling-design.md` (contenido) — este documento define la **forma**.

Contexto de uso: deck proyectado en un aula, defensa oral de 10 min, audiencia = docente + curso. Debe leerse a distancia, sentirse como un producto fintech real (no un template académico) y mantener una sola voz visual de la slide 1 a la 12.

---

## 1. Fundamento de marca

RADAR es una app de finanzas personales. Su identidad ya existe y la presentación debe ser una extensión de la app, no un sistema nuevo. Tres rasgos definen la marca y deben estar presentes en el deck:

- **Azul RADAR** como color de producto (confianza, calma financiera).
- **Números en tipografía monoespaciada** — el gesto de firma: toda cifra de dinero o dato se compone en mono con numerales tabulares. Es lo que hace que el deck "se sienta RADAR".
- **Verde / rojo semánticos** para el lenguaje del dinero (entra / sale, te deben / debés), usados solo con ese significado.

**Riesgo estético deliberado (uno solo):** un motivo de *barrido de radar* — anillos concéntricos finos con un sweep sutil — como elemento de fondo en portada (slide 1) y cierre (slide 12). Justificación: el nombre del producto es RADAR; "ver lo que no ves" es la promesa. Aparece dos veces, nunca en slides de contenido, para no competir con los datos.

---

## 2. Sistema de diseño

### 2.1 Color (tema oscuro, proyección)

El deck usa el **tema oscuro** del design system: lee mejor proyectado, da contraste a las capturas de la app y aporta el aire premium de fintech.

| Rol | Token | Hex | Uso |
|-----|-------|-----|-----|
| Fondo base | `--bg-0` | `#0A0F1A` | fondo de toda slide |
| Superficie / tarjeta | `--bg-1` | `#0F1724` | tarjetas, bloques de dato |
| Superficie elevada | `--bg-2` | `#17202F` | tarjeta sobre tarjeta, callouts |
| Borde / control | `--bg-4` | `#2B3A54` | bordes finos, divisores |
| Texto alta jerarquía | `--fg-1` | `#F4F7FB` | títulos |
| Texto secundario | `--fg-2` | `#B8C3D4` | cuerpo |
| Texto terciario | `--fg-3` | `#7E8AA0` | captions, fuentes, pies |
| **Primario RADAR** | `--radar-500` | `#0077B6` | rellenos de marca, barras, énfasis |
| Acento claro | `--radar-300` | `#4FB3DC` | acento sobre fondo oscuro, líneas activas |
| **Acento ámbar** | `--amber-500` | `#F59E0B` | un único dato/idea por slide (lo que el ojo busca primero) |
| Dinero entra / positivo | `--money-in` | `#10B981` | "te deben", métricas buenas, hipótesis validadas |
| Dinero sale / negativo | `--money-out` | `#EF4444` | "debés", problema, hipótesis no validadas |

**Reglas de color:**
- Máximo **un acento ámbar por slide**. El ámbar marca el dato protagonista; si todo es ámbar, nada lo es.
- Verde y rojo **solo** con su significado de dinero/validación. Nunca como decoración.
- El azul RADAR es el color "neutro de marca": estructura, líneas, fondos de tarjeta activa.
- Contraste mínimo texto/fondo 4.5:1 (cuerpo) y 3:1 (títulos grandes). `--fg-3` nunca para texto chico crítico.

### 2.2 Tipografía

| Rol | Familia | Peso | Tamaño en slide* | Uso |
|-----|---------|------|------------------|-----|
| Display / título de slide | **Inter** | 700 | 40–56 pt | título principal |
| Subtítulo | Inter | 600 | 24–28 pt | bajada |
| Cuerpo / bullets | Inter | 400–500 | 18–22 pt | contenido |
| Caption / fuente | Inter | 400 | 12–14 pt | pies, fuentes, créditos |
| **Números y datos** | **JetBrains Mono** | 500–700 | según jerarquía | toda cifra: %, $, NPS, conteos |

*Tamaños de proyección, no de pantalla. Mínimo legible a 6 m: 18 pt para cuerpo.

**Convenciones tipográficas:**
- Tracking de títulos: `-0.015em` (compacto, moderno). Tracking de etiquetas/eyebrows: `+0.04em` mayúsculas.
- Numerales **tabulares** (`tnum`, `lnum`) en toda cifra para que "70%", "80%", "+36" alineen y se sientan de instrumento de medición.
- Sentence case en títulos y botones (no Title Case, no MAYÚSCULAS salvo eyebrows cortos).
- Una sola idea tipográfica de jerarquía: título grande, una bajada, datos en mono. Sin cuatro tamaños compitiendo.

### 2.3 Grilla, espaciado y composición

- **Formato:** 16:9. Grilla de 12 columnas, margen de seguridad generoso (≈8% por lado). Nada de texto tocando bordes.
- **Espaciado** en escala de 8 px (8/16/24/32/48/64). Componer con `gap`, no con márgenes sueltos.
- **Una idea por slide.** Si una slide necesita dos respiraciones, son dos slides.
- **Regla de aire:** mínimo 40% de la slide vacía. El vacío es jerarquía, no espacio desperdiciado.
- **Alineación:** todo a una grilla. Datos numéricos alineados a la derecha o centrados en su tarjeta; texto a la izquierda.

### 2.4 Superficies, radios y profundidad

- Radios del sistema: tarjetas `--r-lg` (20 px), chips/badges `--r-pill`, controles `--r-md` (14 px). Consistencia total: nunca mezclar radios arbitrarios.
- Profundidad por **superficie + borde fino** (`--bg-1` con borde `--bg-4` 1 px), no por sombras pesadas. Solo el elemento héroe puede llevar `--glow-brand` (halo azul sutil).
- Sin gradientes salvo el motivo radar y, opcionalmente, un velo azul muy sutil al pie de la portada.

### 2.5 Iconografía e imágenes

- Íconos: línea, grosor uniforme (estilo Lucide — el que ya usa la app). Tamaño y peso consistentes en todo el deck.
- **Capturas de la app:** siempre dentro de un marco de teléfono (mockup), nunca recortadas a sangre. Sombra suave, leve inclinación solo si refuerza foco. Las capturas son evidencia, deben verse nítidas y reales.
- Logos de terceros (Mercado Pago, Ualá, bancos) en escala de gris o monocromo azulado en la slide del problema: son "ruido", no marcas a promocionar.

### 2.6 Tratamiento de datos (firma del deck)

Las cifras son protagonistas en RADAR. Convención obligatoria:
- Cifra grande en **JetBrains Mono**, peso 600–700, en `--fg-1` o ámbar si es el dato héroe.
- Etiqueta debajo, Inter 400, `--fg-3`, sentence case, corta.
- Una métrica = una tarjeta `--bg-1`. Nunca más de 4 tarjetas de métrica en una slide.
- Porcentajes con barra o anillo cuando el "cuánto" importa (validación, adopción). El relleno usa azul RADAR; verde/rojo solo si el dato es semánticamente bueno/malo.

### 2.7 Motion (si el medio lo permite)

- Transición entre slides: un único tipo, suave (`--ease-out`, ~300 ms). Sin volteretas.
- **Un momento orquestado:** el barrido de radar en la portada que "revela" el título, y su eco en el cierre. Nada más se anima salvo, opcionalmente, la aparición secuencial de las 3 métricas en la slide 10.
- Respetar `prefers-reduced-motion`: si está activo, todo aparece estático.

---

## 3. Reglas y convenciones de slide (checklist transversal)

1. **Una idea por slide.** Título = la idea. Si no entra en un título, sobra contenido.
2. **Jerarquía en 3 niveles máximo:** título → contenido → pie. Nada compite con el título.
3. **Un solo acento por slide** (el ámbar). Es el punto donde quiero que vaya el ojo.
4. **Los bullets son disparadores, no oraciones.** ≤ 8–10 palabras. El relato va en la boca del orador, no en la slide.
5. **Datos siempre en mono y tabulares.** Toda cifra se compone igual en las 12 slides.
6. **Consistencia espacial:** título en la misma zona y tamaño en todas las slides de contenido. El espectador no debe "reubicarse" cada slide.
7. **Color con significado:** verde/rojo = dinero/validación; azul = marca/estructura; ámbar = foco. Nunca decorativo.
8. **Legibilidad a 6 metros:** cuerpo ≥ 18 pt, contraste alto, máximo ~5 líneas por slide.
9. **Las capturas son evidencia**, no relleno: enmarcadas, nítidas, con foco en lo que se narra.
10. **Coherencia narrativa visual:** los 3 personajes (Lucía/Franco/Magalí) usan el mismo estilo de retrato/ícono cada vez que aparecen (slides 2, 9, 12).

---

## 4. Plantillas de layout (reutilizables)

- **A — Portada/Cierre:** centrado, motivo radar de fondo, logo + título display + bajada. Máximo aire.
- **B — Statement:** título grande a la izquierda (50–60% ancho), apoyo visual a la derecha. Para slides 4 y 8.
- **C — Tres bloques:** tira de 3 tarjetas iguales. Para causas (slide 3), personajes (slide 2/9).
- **D — Métricas:** grilla de 2–4 tarjetas de dato en mono. Para slides 5, 10.
- **E — Diagrama:** lienzo central con el esquema (capas, flujo). Para slides 6, 7.
- **F — Dos columnas:** hecho / próximo. Para slide 11.

---

## 5. Dirección visual por slide

### Slide 1 — Portada · Layout A
Fondo `--bg-0` con motivo de **barrido de radar** (anillos concéntricos `--radar-700` + línea de barrido `--radar-300`). Logo RADAR centrado, título display "El gestor de gastos que ve lo que vos no ves" en Inter 700, bajada de materia/grupo en `--fg-3`. El barrido revela el título al entrar (único momento de motion fuerte). Sobrio, premium, oscuro.

### Slide 2 — La escena · Layout C
Tres tarjetas `--bg-1` iguales, una por persona: retrato/ícono consistente, nombre + edad en mono, una frase de situación en `--fg-2`. Abajo, a todo el ancho, la pregunta **"¿En qué se me fue la plata?"** en display, con el "?" en ámbar. El ojo cae en la pregunta.

### Slide 3 — El problema real · Layout C + datos
Mitad superior: 3 bloques de causa (íconos línea, título corto, una línea). Mitad inferior: 4 cifras de contexto en mono tabular (`70% · 80% · 60% · +100%`), una en ámbar (la más impactante, ej. inflación +100%). Fuentes BCRA · GSMA · Statista en caption `--fg-3` al pie. Opcional: logos de billeteras en gris dispersos detrás de las causas.

### Slide 4 — Marco conceptual · Layout B
Título "El problema no es anotar gastos" grande a la izquierda; "Es construir visibilidad financiera" como bajada en azul claro. A la derecha, los 4 conceptos como tarjetas apiladas o cuadrícula 2×2, cada uno con una palabra-ancla en negrita y una línea de apoyo. Slide de "peso intelectual": más aire, menos densidad, tono sobrio.

### Slide 5 — Lo que el campo confirmó · Layout D
Cifra héroe en mono: **31** respuestas. Debajo, barra segmentada 4 / 3 / 2 con código de color (verde validadas, `--fg-3` parciales, rojo no validadas). Callout en `--bg-2`: "Lo que se invalida también enseña". Honestidad visual: no esconder el rojo, mostrarlo como aprendizaje.

### Slide 6 — La solución RADAR · Layout E
Mockup de teléfono con el dashboard a un lado; los 4 ejes como lista con íconos al otro. Eyebrow "La idea" en ámbar mayúsculas tracking ancho. Subtítulo "Simplicidad con inteligencia". Primer momento donde aparece la app real → debe verse impecable.

### Slide 7 — Cómo lo construimos · Layout E (diagrama)
Diagrama de **3 capas** en el centro: Front (Expo/RN) → Edge Function (OCR · Groq/LLaMA-4) → Supabase (Postgres + RLS). Flechas finas `--radar-300`. Abajo, dos cifras en mono: `20` HU · `29` tests. Estética técnica pero limpia; la capa de integración (OCR) resaltada en azul porque es la estrella. *(Diagrama generable con `/u-flow:diagram`.)*

### Slide 8 — El WAO · Layout B
La slide de mayor impacto visual. Secuencia de 3 capturas enmarcadas: foto del ticket → datos detectados (resaltados en verde al autocompletarse) → gasto guardado. Título "Sacás la foto. RADAR hace el resto." Si hay demo en vivo, esta slide es el telón de fondo. Máximo protagonismo a la imagen, texto mínimo.

### Slide 9 — La experiencia · Layout C (eco de slide 2)
Vuelven Lucía/Franco/Magalí, mismas tarjetas que slide 2 pero ahora en estado "resuelto": un check verde, la pantalla que cierra su dolor. Cierra visualmente el bucle abierto al inicio. "La emoción no es entusiasmo: es alivio" como remate en `--fg-2`.

### Slide 10 — Lo que dijeron los usuarios · Layout D
Tablero de métricas: tarjetas en mono con `25` beta · `80%` <30 s · `NPS +36` · `80%` adoptaría. La métrica más fuerte (NPS o adopción) en ámbar. Aparición secuencial suave si hay motion. Verde para las métricas positivas de adopción.

### Slide 11 — Dónde estamos · Layout F (dos columnas)
Columna izquierda "Funcionando hoy" (checks verdes: registro, OCR, compartidos, multimoneda). Columna derecha "Próximo sprint" (Analytics IA, en `--fg-3`/ámbar, con el dato `60% lo pidió`). Roadmap honesto y legible de un vistazo. Sin esconder lo no terminado.

### Slide 12 — Cierre · Layout A (eco de portada)
Mismo motivo radar que la slide 1, ahora con los 3 personajes tranquilos junto al logo. "RADAR ve lo que vos no ves" + "¿Preguntas?". El barrido vuelve a pasar una vez: cierra el círculo. Calma, síntesis, sin datos nuevos.

---

## 6. Errores a evitar (anti-patrones)

- Mezclar tema claro y oscuro entre slides.
- Más de un acento ámbar por slide.
- Cifras en Inter en vez de mono (rompe la firma).
- Capturas recortadas a sangre o pixeladas.
- Verde/rojo decorativos.
- Bullets que son párrafos.
- Radios y tamaños de título inconsistentes entre slides.
- El motivo radar en slides de contenido (solo portada y cierre).
