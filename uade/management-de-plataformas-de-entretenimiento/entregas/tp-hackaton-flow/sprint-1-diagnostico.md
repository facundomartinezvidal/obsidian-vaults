---
tipo: entrega
materia: Management de Plataformas de Entretenimiento
trabajo: TP Hackatón — Caso 2 FLOW
sprint: 1 — Diagnóstico e Investigación de Mercado (60 min)
consigna: ejercicios/08-consigna-hackaton-casos-locales.pdf
briefing: entregas/tp-hackaton-flow/briefing-flow.pdf
---

# Sprint 1 — Diagnóstico de mercado: FLOW

> **Qué evalúa el Sprint 1 (consigna):** recolectar datos reales, financieros y métricas locales; calidad analítica; capacidad de filtrar info seria; rigor para determinar **salud actual** y **vulnerabilidades** de la plataforma. (Sin propuesta — eso es Sprint 2.)

**Diagnóstico en una frase:** Flow es **dominante en infraestructura** (post-compra de Movistar, casi-monopolio convergente argentino) y con ventas récord, pero **financieramente tensionado** (FY2025 cerró con pérdida neta y deuda casi duplicada por la adquisición), **estancado en crecimiento de abonados** y **estructuralmente amenazado** por el cordcutting, la sensibilidad al precio y la pérdida futura de sus dos roles de intermediario (el caño y el menú).

---

## 1. Qué es Flow (modelo de negocio)

- **Definición:** mayor **integrador de contenido en bundles** de Argentina, propiedad de **Telecom**. No es un SVOD puro — es una plataforma de **TV avanzada** (TV en vivo + VOD + apps OTT integradas) montada sobre la conectividad de Telecom.
- **Origen:** lanzada a **fines de 2016 por Cablevisión (Grupo Clarín)**; Cablevisión se fusionó con Telecom en 2018. Dos modalidades: **Flow App** (OTT, sin decodificador) y **Flow Box** (set-top-box). Históricamente la base era mayor en Box (1,2 M) que en App (0,6 M) — el core sigue siendo la primera pantalla/TV (tesis San Andrés, 2018).
- **Modelo de negocio (en palabras del propio management):** Flow "**no es un negocio en sí mismo, es una capa de valor arriba de la conectividad**" (G. Hita, ex-COO). Telecom es una red **fijomóvil** que da conectividad + capas de valor. KPI rector declarado: **NPS** (Net Promoter Score), con benchmark contra Netflix. Objetivo de largo plazo: **set-top-boxless**.
- **Doble rol de intermediario:** (1) **te trae internet** (fibra) + (2) **es el menú** donde elegís qué ver.
- **Lados de la plataforma:** hogares abonados ↔ licenciantes (Disney, WBD/Max, Universal) ↔ derechos en vivo (fútbol, festivales) ↔ apps OTT ↔ anunciantes.
- **Activos de contenido propios/exclusivos:** Pack Fútbol · festivales en vivo (Lollapalooza, Cosquín Rock) · ficción local (coproducciones: *La fragilidad de los cuerpos*, *El lobista*) · **Mundial 2026 (104 partidos)**, Copa América, La Liga vía D-Sports.

---

## 2. Datos financieros y operativos (Telecom Argentina, reales)

> **Nota de fuentes:** los datos **operativos** (abonados, ARPU) son de **1H25** (6-K, junio 2025) — la Reseña Informativa de cierre no estaba disponible. Los datos **financieros** están **verificados contra los Estados Financieros auditados al 31/12/2025** (PwC, Memoria Anual Integrada, en millones de pesos constantes).

**Operativos (1H25 — Telecom 6-K):**

| Métrica                                | Valor                                   | Período  |
| -------------------------------------- | --------------------------------------- | -------- |
| Accesos de TV (Argentina)              | **3,2 M** (+2,3% vs 1H24)               | jun 2025 |
| Suscriptos a **Flow**                  | **1,6 M**                               | 1H25     |
| Suscripciones Premium                  | **1,2 M**                               | 1H25     |
| **ARPU TV** mensual (moneda constante) | **P$16.297** (+5,3% real vs 1H24)       | 1H25     |
| **ARPU banda ancha** mensual           | **P$22.538**                            | Q1 2025  |
| Accesos banda ancha                    | **4,1 M** (+1,5%); 90% contrata ≥100 Mb | Q1 2025  |

**Financieros FY2025 (auditados — Estados Financieros al 31/12/2025):**

| Métrica | FY2025 | FY2024 | Lectura |
|---|---|---|---|
| **Ventas consolidadas** | **$8.328.814 M** | $5.442.958 M | crece nominal, pero en pesos constantes el salto es por TMA |
| **Resultado neto** | **$(145.304) M** — PÉRDIDA | +$1.359.230 M (ganancia) | dio vuelta a pérdida: −$78,94 por acción |
| Atribuible a controlante | $(170.006) M | — | — |
| **Costos financieros** | **$(748.840) M** | — | peso de la deuda (TMA) y de la devaluación |
| **Préstamos totales** | **$5.572.415 M** (80% tasa fija) | $3.723.952 M | deuda casi se duplica post-TMA |
| **Llave de negocio (goodwill)** | **$4.443.998 M** | $4.436.736 M | casi todo en "UGE Telecom" → riesgo de impairment |
| Patrimonio | $6.983.308 M | $7.280.927 M | cae |
| Posición pasiva neta en USD | **US$3.312 M** | US$2.197 M | fuerte exposición cambiaria |
| **Adquisición TMA (Movistar AR)** | **US$1.245 M**, cerrada **24/02/2025** → +19,3 M líneas móviles, +1,6 M accesos internet, +400 k TV | — | bajo revisión de defensa de la competencia (ver V6) |
| Acción Telecom (BYMA) | 4Q25 máx **$3.875** (> 4Q24 $3.175); cayó a mediados (3Q25 mín $2.021) | — | recortó −20% YTD a mitad de año, recuperó al cierre |

**Lectura analítica de los números:**
- Crecimiento de abonados TV **casi nulo (+2,3%)** → mercado maduro: el negocio ya no crece por altas, crece por **ARPU y retención**.
- ARPU TV sube en términos reales (+5,3%) → capacidad de pricing, pero alta sensibilidad al precio (riesgo, ver V2).
- **2025 cerró con pérdida neta** pese a ventas récord: la compra de TMA disparó deuda y costos financieros, y la devaluación (41% > inflación 31,5%) golpeó la posición pasiva en dólares.
- La compra de TMA es el dato estructural: Telecom **absorbió a su principal competidor de telco** (Movistar) → escala convergente enorme, pero **deuda duplicada + revisión antimonopolio abierta**.

---

## 3. Posición competitiva (mercado argentino)

| Competidor                                     | Tipo               | Amenaza para Flow                                            |
| ---------------------------------------------- | ------------------ | ------------------------------------------------------------ |
| Netflix, Disney+, Max, Prime Video, Paramount+ | SVOD puro global   | fuga de catálogo (series/películas migran al streaming puro) |
| DirecTV / DGO                                  | TV satelital + OTT | compite en deportes y TV paga                                |
| Claro (América Móvil), Telecentro              | telco convergente  | competencia en bundle y conectividad                         |
| YouTube / TikTok                               | UGC / atención     | compiten por tiempo de pantalla                              |

**Cuota histórica de TV paga (2018, tesis San Andrés):** mercado concentrado — **Cablevisión 37% · DirecTV 26,6% · Telecentro 6-7%** (este último solo AMBA). *(Dato 2018, anterior a la fusión total con Telecom y a la compra de Movistar; sirve para dimensionar la posición de líder, no como cifra actual.)*

**Jugada reciente en deportes (clave para el diagnóstico):** en 2025 **Clarín vendió TyC Sports (y Carburando) al Grupo Werthein por US$25 M** (informado a la CNV) y, en paralelo, aseguró que **Telecom incorpore el Mundial 2026 a Flow** vía D-Sports (canales 109/110), junto a Copa América, Eliminatorias, Sudamericana y Mundial de Clubes. Matiz: Flow **no es dueño de TyC**; accede a los derechos por acuerdo con el ecosistema Werthein → el foso "deporte en vivo" depende de contratos renovables, no es propiedad permanente.

**Ventaja competitiva local clave:** el streaming extranjero paga en AR **IVA 21% + impuesto PAIS 8% + Ganancias 30% + IIBB 2%** (atado al dólar) → Flow factura en pesos, integrado a una factura local → **ventaja de precio + bundle** que los globales no tienen.

---

## 4. Salud actual — fortalezas (los fosos)

1. **Control de infraestructura física (fibra óptica propia).** No es revendedor: es dueño del caño. Foso real e irreplicable a corto plazo.
2. **Facturación unificada / bundle.** Internet + móvil + cable + Flow en una sola factura → **switching cost alto** (Neira: el bundle es la mayor arma anti-churn).
3. **Escala convergente post-TMA.** Tras absorber Movistar AR: ~3,2 M TV + 4,1 M banda ancha + decenas de millones de líneas móviles → base instalada gigante para hacer cross-sell.
4. **Derechos en vivo exclusivos.** Pack Fútbol, Mundial 2026, festivales (Lollapalooza, Cosquín Rock) → contenido **no desintermediable** y anti-churn.
5. **Escala y pricing.** Ventas consolidadas $8,3 billones (récord nominal), ARPU TV creciendo en términos reales. *(Atención: pese a esto, FY2025 cerró con pérdida neta — ver V6.)*

---

## 5. Vulnerabilidades / amenazas (lo que pide el diagnóstico)

| # | Vulnerabilidad | Evidencia / dato |
|---|---|---|
| V1 | **Cordcutting + fuga a streaming puro** | abonados TV casi planos (+2,3%); el catálogo no-deportivo pierde contra SVOD globales |
| V2 | **Alta sensibilidad al precio (AR)** | 70% considera caro tener +1 streaming (vs 62% Chile); 1 de cada 4 canceló una plataforma en 12 meses por aumentos (Sherlock) |
| V3 | **Guerra de precios en conectividad** | presiona ARPU y margen; el bundle se defiende bajando precio |
| V4 | **Interfaz visual tradicional** | compite con los OS de Smart TVs y celulares; mala UX vs. apps nativas |
| V5 | **Dependencia de licencias y derechos territoriales** | catálogo de ficción global prestado (Disney/WBD/Universal); el deporte llega por acuerdos renovables (Mundial vía Werthein/D-Sports, no propio); derechos atados a territorio (se bloquea fuera de AR/UY/PY). Problema histórico de Flow: "cada cosa que hace Flow es un derecho distinto" (Hita) |
| V6 | **Pérdida neta + deuda alta (FY2025)** | resultado neto $(145.304) M; préstamos $5.572.415 M (casi 2× post-TMA); costos financieros $(748.840) M; posición pasiva neta US$3.312 M en plena devaluación (41%) |
| V7 | **Riesgo regulatorio TMA (abierto, pero acotado)** | compra de Movistar bajo revisión de defensa de la competencia: CNDC emitió Informe de Objeción Preliminar; suspensión preventiva del Gobierno; Claro intentó bloquearla; audiencias sep/oct 2025; se creó la ANC (Dec. 810/2025); a feb 2026 el Estado interpuso Recurso Extraordinario Federal. **Matiz:** los analistas (Galileo, Bloomberg Línea) la ven como "hecho consumado" — el riesgo es de compromisos/desinversiones, no de caída de la operación |
| V8 | **Riesgo de impairment del goodwill** | llave de negocio $4.443.998 M concentrada en "UGE Telecom"; su recuperabilidad fue *cuestión clave de auditoría* de PwC |
| V9 | **Desafío 2028 (estructural)** | si el agente IA mata el "menú" y cae el cómputo soberano (Anthropic), Flow pierde su rol de interfaz y parte del de caño |

---

## 6. Diagnóstico aplicado con KPIs de cátedra (U4)

- **Churn:** enemigo nº1. Hoy contenido por **bundle + deporte en vivo** (switching cost) → defensivo, pero V1/V2 lo presionan.
- **ARPU:** TV P$16.297 / BA P$22.538 mensual. Creciendo real, pero techo por sensibilidad al precio.
- **Watch time / regla 70% finalización:** el deporte en vivo da watch time sostenido (no maratón) → predice **bajo churn**. La ficción global prestada es la que está en riesgo de caer bajo el 70%.
- **LTV vs. switching cost:** la fibra + factura unificada elevan el LTV al hacer costosa la baja.

**Datos a estimar/conseguir en el aula (no públicos por separado para Flow):** churn exacto de Flow, ARPU desagregado de Flow vs. TV general, % de altas vía bundle. Estimar con proxies (crecimiento +2,3%, sensibilidad 1-de-4 cancela).

---

## 7. Anclaje académico (para citar en la defensa)

Más allá de los autores de cátedra (Neira, Florida, Doctorow), el caso Flow tiene marco académico propio (tesis San Andrés, 2018):
- **Espacio Audiovisual Ampliado (Marino, 2016):** la convergencia (digitalización + Internet) rompe las lógicas de producción/distribución/consumo. Flow es la **estrategia de adaptación** de un agente tradicional a ese espacio.
- **"Aterrizaje forzado":** Flow no nace de una iniciativa comercial pura, sino de una necesidad de supervivencia. Hita: *"Si no hacíamos un cambio íbamos a la extinción como modelo de negocio."* → conecta con el cordcutting (V1).
- **Marca y audiencias como activos del medio tradicional (Accenture; Marino y Espada, 2017):** los consumidores confían más en empresas establecidas para contenido de calidad → fortaleza de Flow frente a OTT puros.
- **El deporte como "último pilar del consumo sincrónico":** *"no tienen views después, si no es en vivo"* (Hita) → fundamenta por qué el en-vivo es el foso anti-desintermediación.
- **Lógica "dudas sobre dudas" (Monzoncillo, 2011):** el sector adapta estrategias sin un modelo de negocio rentable consolidado → explica la incertidumbre estructural.

---

## Fuentes
- **Telecom Argentina — Memoria Anual Integrada y Estados Financieros al 31/12/2025** (auditados por PwC) — fuente principal de las cifras financieras FY2025 (deuda, TMA, goodwill, regulatorio, macro). PDF adjunto en esta carpeta: `estados-financieros-telecom-2025.pdf`. Online:
  - Relación con Inversores Telecom: https://inversores.telecom.com.ar
  - SEC EDGAR (filings de Telecom Argentina, CIK 0000932470): https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000932470&type=6-K
  - CNV — Comisión Nacional de Valores (Empresas → Telecom Argentina): https://www.cnv.gov.ar
- Telecom Argentina — Form 6-K 1H25 (SEC), datos operativos abonados/ARPU: https://www.sec.gov/Archives/edgar/data/0000932470/000110465925076236/tm2523065d1_6k.htm
- Convergencia — ventas Telecom +27,8% Q1 2025: https://www.convergencia.com/a-diario-extra/se-incrementaron-un-27-8-las-ventas-de-telecom-durante-el-primer-trimestre-de-2025/
- iProfesional — acción Telecom −20% 2025: https://www.iprofesional.com/finanzas/436182-acciones-telecom-se-desploman-20-por-ciento-2025-conviene-vender-comprar-o-esperar
- iProfesional — sensibilidad al precio / cancelaciones streaming AR: https://www.iprofesional.com/negocios/444250-indice-streaming-cuanto-cuestan-netflix-disney-hbo-max-y-prime-video-en-argentina
- TAVI — Flow+ bundle OTT intercambiables: https://tavilatam.com/argentina-flow-lanzo-un-plan-que-combina-tv-paga-con-dos-suscripciones-intercambiables-a-plataformas-de-streaming-y-a-packs-premium/
- **Fernández Ruiz, S. (2018). *Cablevisión Flow: una estrategia de adaptación de Cablevisión ante el Espacio Audiovisual Ampliado.* Tesis, Universidad de San Andrés** (mentor: S. Marino) — origen, modelo, competencia, problemas y derechos de Flow. PDF adjunto: `fuente-san-andres.pdf`
- El Economista — Flow emitirá el Mundial 2026; Clarín vende TyC Sports: https://eleconomista.com.ar/negocios/cambio-historico-tv-deportiva-flow-emitira-mundial-2026-clarin-vende-canal-deportes-clave-n95229
- Perfil — Clarín vendió TyC Sports al Grupo Werthein (US$25 M) y metió el Mundial en Flow: https://www.perfil.com/noticias/economia/clarin-le-vendio-tyc-sports-al-grupo-werthein-logro-meter-el-mundial-en-flow-y-le-tuerce-la-mano-a-tapia-a40.phtml
- Forbes Argentina — balance Telecom y dudas de bancos de inversión sobre la compra de Telefónica: https://www.forbesargentina.com/money/el-balance-telecom-bancos-inversion-hacen-foco-dudas-compra-telefonica-n72283
- Bloomberg Línea — ¿corre riesgo la adquisición de Telefónica por Telecom? (analistas: "hecho consumado"): https://www.bloomberglinea.com/latinoamerica/argentina/corre-riesgo-la-adquisicion-de-telefonica-por-telecom-argentina-esto-ven-analistas/
- Infocielo — Flow + D-Sports / Mundial 2026: https://www.infocielo.com/tendencias/flow-clarin-suma-d-sports-directtv-a-su-grilla-y-destraba-el-acceso-a-los-104-partidos-del-mundial
