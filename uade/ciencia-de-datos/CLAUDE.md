# Ciencia de Datos (3.4.217)

Materia de la Lic. en Gestión de TI — UADE, FAIN/DETIN. 1er cuatrimestre 2026.
Comisión 6423 — Viernes 07:45–11:45 — Docente: Santiago Gabriel Martin.

## Estado de la cursada

- **1er parcial (24/04): APROBADO** ✅
- Foco actual: **2do parcial (26/06)** + **TPO**
- Ronda de presentación del TPO: aún sin definir (19/06 o 03/07)

## Cronograma

| Fecha | Clase | Tema / Actividad |
|---|---|---|
| 13/03 | 1 | Presentación. El problema de las decisiones |
| 20/03 | 2 | Data Warehousing. Modelo dimensional. Cubos OLAP |
| 27/03 | 3 | Diseño de modelos dimensionales. Calidad de datos |
| 03/04 | — | Feriado |
| 10/04 | 5 | Gobierno de datos. DSS |
| 17/04 | 6 | Análisis exploratorio de datos (EDA) |
| 24/04 | 7 | **PRIMER PARCIAL** ✅ aprobado |
| 01/05 | — | Feriado |
| 08/05 | 9 | Minería de datos: tipos y metodologías |
| 15/05 | 10 | Aprendizaje supervisado. Árboles de decisión |
| 22/05 | 11 | Aprendizaje no supervisado. Clustering |
| 29/05 | 12 | Introducción a la IA |
| 05/06 | 13 | Práctica de Data Mining. Repaso general |
| 12/06 | 14 | Tableros de control. Mejores prácticas |
| 19/06 | 15 | Presentación TPO — 1era ronda |
| 26/06 | 16 | **SEGUNDO PARCIAL** |
| 03/07 | 17 | Presentación TPO — 2da ronda |
| 10/07 | 18 | Recuperatorio y final adelantado |
| 17/07 | 19 | Final regular |
| 24/07 | 20 | Final desdoblado |

## Programa por bloques

### Bloque 1 — Fundamentos + Data Warehousing (→ 1er parcial, ya rendido)
Data Science, DIKW, Big Data 5V, BI vs DS · Pipelines/ETL, DWH, modelado dimensional (Kimball, Estrella/Copo de Nieve/Data Vault), OLAP · Calidad de datos (proactivo/reactivo) · Gobierno de datos, DSS (descriptivo/diagnóstico/predictivo/prescriptivo) · KDD, CRISP-DM, SEMMA · EDA, pandas
**Material:** `content/1-parcial/` (01 a 06)

### Bloque 2 — Minería de datos + ML (→ 2do parcial 26/06)
OKRs vs KPI (clase 6.1) → `content/2-parcial/material/06.1-okrs-vs-kpis.pdf` · Árboles de decisión (clase 7; Entropía, Gini, ID3/C4.5/CART, overfitting) → `content/2-parcial/material/07-arboles-de-decision.pdf` · Random Forest (clase 8; bagging) → `content/2-parcial/material/08a-random-forest.pdf` · Métricas de clasificación (clase 8; confusion matrix, accuracy/precision/recall/F1, ROC/AUC) → `content/2-parcial/material/08b-metricas-de-clasificacion.pdf` · Modelos de regresión (clase 9) → `content/2-parcial/material/09-modelos-de-regresion.pdf` · Aprendizaje no supervisado / Clustering (clase 10; K-Means, codo, silueta) → `content/2-parcial/material/10-aprendizaje-no-supervisado.pdf` + práctica `content/2-parcial/practicas/01-clustering-clientes-mayoristas.pdf` (resuelta en `entregas/ejercicio-clustering-clientes-mayoristas.ipynb`) · Feature engineering (clase 11) → `content/2-parcial/material/11-feature-engineering.pdf` · Introducción a la IA (clase 12) → `content/2-parcial/material/12-introduccion-a-la-ia.pdf` + práctica integradora `content/2-parcial/practicas/02-breast-cancer-ml.pdf` (AED + Random Forest + K-Means sobre Breast Cancer Wisconsin) · Tableros de control → sin material aún

## TPO (grupal, obligatorio)

Proyecto end-to-end: dominio de negocio + dataset + hipótesis. Audiencia: gerencia comercial y técnica. Exposición 15 min, todos con rol.
**Debe incluir:** descripción del dominio y propuesta de valor · diagrama de arquitectura (pipeline) · EDA · técnica de minería + modelo · conclusión (data viz + storytelling) · **aplicación funcional interactiva**.
**Suma:** varias fuentes de datos, metodologías ágiles, GitHub.
⚠️ Grupo sin TPO funcional el día de entrega = desaprobado.
**Consigna completa:** `consigna-tpo.pdf`

## Evaluación

2 parciales + TPO + recuperatorio (10/07). El 1er parcial fue: 7 teóricas (1 pto c/u) + 1 práctico de modelado dimensional Kimball + SQL (3 ptos). Régimen de aprobación detallado: no figura en el programa.

## Bibliografía

No figura bibliografía oficial en el programa. Autores de referencia en el material: Kimball, Inmon, Linstedt (Data Vault), Fayyad (KDD), Tukey (EDA), Conway.

## Estructura

```
ciencia-de-datos/
├── programa.pdf       # programa + cronograma
├── consigna-tpo.pdf   # consigna del TPO
├── content/
│   ├── 1-parcial/     # 01-material-introduccion-data-science … 06-material-okrs-vs-kpis (solo material)
│   └── 2-parcial/     # presentaciones y prácticas separadas por subcarpeta
│       ├── material/  # numerado por nº de clase del slide: 06.1-okrs-vs-kpis … 12-introduccion-a-la-ia
│       └── practicas/ # 01-clustering-clientes-mayoristas, 02-breast-cancer-ml
├── entregas/          # ejercicios resueltos y entregables (notebooks, informes)
└── parciales/
    └── 1-parcial/     # temas 1 y 2 + apunte.md (qué entró)
```

Convención de nombres: en `2-parcial/material/` el prefijo `NN-` es el **número de clase que figura en la diapositiva** (no el orden de archivo); la clase 8 tiene dos presentaciones → `08a-` y `08b-`. En `2-parcial/` el tipo lo da la subcarpeta (`material/` = presentaciones, `practicas/` = consignas de práctica); `practicas/` y `1-parcial/` siguen numerados por orden de cursada (`1-parcial/` conserva el prefijo `NN-material-descripcion.ext`).
