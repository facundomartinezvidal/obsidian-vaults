const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, TableOfContents, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const ACCENT = "1B3A6B";   // azul UADE
const GRAY = "595959";
const LIGHT = "EAF0F8";

// ---- helpers ----------------------------------------------------------------
const r = (text, opts = {}) => new TextRun({ text, font: "Calibri", ...opts });

const H1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 140 },
  children: [r(text, { bold: true, size: 30, color: ACCENT })],
});
const H2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 220, after: 100 },
  children: [r(text, { bold: true, size: 25, color: "000000" })],
});
const P = (runs) => new Paragraph({
  spacing: { after: 140, line: 300 }, alignment: AlignmentType.JUSTIFIED,
  children: Array.isArray(runs) ? runs : [r(runs)],
});
const bullet = (runs) => new Paragraph({
  bullet: { level: 0 }, spacing: { after: 80, line: 288 }, alignment: AlignmentType.JUSTIFIED,
  children: Array.isArray(runs) ? runs : [r(runs)],
});

const cellT = (text, opts = {}) => new TableCell({
  width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
  shading: opts.header ? { type: ShadingType.CLEAR, fill: ACCENT }
        : opts.alt ? { type: ShadingType.CLEAR, fill: LIGHT } : undefined,
  verticalAlign: VerticalAlign.CENTER,
  margins: { top: 70, bottom: 70, left: 120, right: 120 },
  children: [new Paragraph({ children: [r(text, { bold: opts.header || opts.bold, color: opts.header ? "FFFFFF" : "000000", size: 21 })] })],
});

const table = (rows) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: ["top", "bottom", "left", "right", "insideHorizontal", "insideVertical"].reduce((a, k) => {
    a[k] = { style: BorderStyle.SINGLE, size: 3, color: "AEBED4" }; return a;
  }, {}),
  rows,
});

// =============================== CARÁTULA ===================================
const logo = fs.readFileSync(path.join(DIR, "LogoUADE.png"));
const cover = [];
cover.push(new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER,
  children: [new ImageRun({ data: logo, type: "png", transformation: { width: 240, height: 91 } })] }));
cover.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 0 },
  children: [r("Universidad Argentina de la Empresa", { size: 24, color: GRAY })] }));
cover.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 },
  children: [r("Facultad de Ingeniería y Ciencias Exactas", { size: 22, color: GRAY })] }));

cover.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 60 },
  children: [r("Trabajo Práctico Obligatorio", { bold: true, size: 50, color: ACCENT })] }));
cover.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
  children: [r("Ciencia de Datos (3.4.217)", { size: 30, color: "000000" })] }));
cover.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 240, after: 700 },
  children: [r("Dominio del Negocio e Hipótesis", { bold: true, size: 26, color: GRAY })] }));

// Bloque de datos del grupo
const dataRow = (k, v) => new TableRow({ children: [
  new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, margins: { top: 60, bottom: 60, left: 120, right: 120 },
    shading: { type: ShadingType.CLEAR, fill: LIGHT },
    children: [new Paragraph({ children: [r(k, { bold: true, size: 21, color: ACCENT })] })] }),
  new TableCell({ width: { size: 65, type: WidthType.PERCENTAGE }, margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({ children: [r(v, { size: 21 })] })] }),
]});
cover.push(new Table({
  width: { size: 80, type: WidthType.PERCENTAGE },
  alignment: AlignmentType.CENTER,
  borders: ["top", "bottom", "left", "right", "insideHorizontal", "insideVertical"].reduce((a, k) => {
    a[k] = { style: BorderStyle.SINGLE, size: 3, color: "AEBED4" }; return a; }, {}),
  rows: [
    dataRow("Comisión", "6423 — Viernes 07:45–11:45"),
    dataRow("Docente", "Santiago Gabriel Martin"),
    dataRow("Cuatrimestre", "1.º cuatrimestre 2026"),
    dataRow("Dominio elegido", "No-show de turnos médicos"),
    dataRow("Integrantes", "[Nombre Apellido — LU] · [Nombre Apellido — LU] · [Nombre Apellido — LU]"),
    dataRow("Fecha de entrega", "[completar]"),
  ],
}));
cover.push(new Paragraph({ children: [new PageBreak()] }));

// =============================== ÍNDICE =====================================
const toc = [];
toc.push(new Paragraph({ spacing: { after: 160 }, children: [r("Índice", { bold: true, size: 30, color: ACCENT })] }));
toc.push(new TableOfContents("Tabla de contenido", { hyperlink: true, headingStyleRange: "1-2" }));
toc.push(new Paragraph({ children: [new PageBreak()] }));

// =============================== CONTENIDO ==================================
const body = [];
body.push(H1("1. Selección del Dominio del Negocio"));

body.push(H2("1.1. Descripción del dominio"));
body.push(P("Un centro de salud ambulatorio (clínica u hospital) atiende a sus pacientes mediante turnos programados. El circuito de atención es el siguiente: el paciente solicita un turno —de forma presencial, telefónica o web—, se le asigna una fecha y un horario con un profesional y, el día indicado, asiste a la consulta o no lo hace."));
body.push(P("La agenda del profesional constituye el recurso central del negocio: cada franja horaria tiene un costo fijo —el tiempo del médico— y una capacidad limitada. La gestión eficiente de esa agenda determina cuántos pacientes se atienden y con qué nivel de espera."));

body.push(H2("1.2. Problemática"));
body.push(P([
  r("El "), r("ausentismo a turnos médicos", { bold: true }), r(" (en inglés, "), r("no-show", { italics: true }),
  r(") ronda el "), r("20–30 % ", { bold: true }), r("de los turnos otorgados. Cuando un paciente no asiste y no avisa con antelación, se producen dos efectos negativos simultáneos:"),
]));
body.push(bullet("La franja horaria queda ociosa: una hora del profesional que la institución igualmente debe afrontar."));
body.push(bullet("Otro paciente que sí habría asistido no pudo ocupar ese lugar, lo que incrementa la lista de espera."));
body.push(P([
  r("Se trata, por lo tanto, de un "), r("doble costo", { bold: true }),
  r(": un recurso médico desperdiciado y un peor acceso a la atención para el resto de los pacientes. En la actualidad, la institución no dispone de información anticipada sobre quién faltará, de modo que no puede tomar ninguna acción preventiva."),
]));

body.push(H2("1.3. Propuesta de valor"));
body.push(P("La propuesta consiste en predecir, en el momento mismo de agendar el turno, la probabilidad de que cada paciente falte, con el fin de accionar sobre aquellos de mayor riesgo mediante:"));
body.push(bullet([r("Recordatorios dirigidos", { bold: true }), r(" (SMS o llamado telefónico) a los pacientes con mayor probabilidad de ausentarse.")]));
body.push(bullet([r("Sobreturnos controlados", { bold: true }), r(" en las franjas horarias de alto riesgo de ausentismo.")]));
body.push(P([
  r("Valor para el negocio: ", { bold: true }),
  r("reducción del ausentismo, mejor aprovechamiento de la agenda y disminución de la lista de espera, sin necesidad de incorporar recursos adicionales. Cada turno no perdido recupera una hora efectiva de atención."),
]));

body.push(H2("1.4. Fuentes de datos"));
body.push(P([r("Fuente principal — ", { bold: true }), r("Medical Appointment No Shows", { bold: true, italics: true }), r(" (Kaggle)", { bold: true })]));
body.push(table([
  new TableRow({ children: [cellT("Atributo", { header: true, width: 25 }), cellT("Detalle", { header: true, width: 75 })] }),
  new TableRow({ children: [cellT("Origen", { bold: true, alt: true }), cellT("Kaggle — registros reales de turnos de salud pública de Brasil.")] }),
  new TableRow({ children: [cellT("Volumen", { bold: true, alt: true }), cellT("Más de 110.000 turnos (filas).")] }),
  new TableRow({ children: [cellT("Variables (14)", { bold: true, alt: true }), cellT("Edad, género, barrio, fechas de agendamiento y de turno, comorbilidades (diabetes, hipertensión, alcoholismo, discapacidad), recepción de SMS, beca social y la variable objetivo: asistió / no asistió.")] }),
  new TableRow({ children: [cellT("Justificación", { bold: true, alt: true }), cellT("Conjunto de datos limpio, masivo y documentado, con la variable a predecir ya etiquetada. Combina variables categóricas y numéricas, lo que habilita el análisis exploratorio y la ingeniería de características.")] }),
]));
body.push(new Paragraph({ spacing: { after: 120 } }));
body.push(P([r("Fuente secundaria — ", { bold: true }), r("Clima por fecha", { bold: true }), r(" (expectativa superadora)", { bold: true })]));
body.push(table([
  new TableRow({ children: [cellT("Atributo", { header: true, width: 25 }), cellT("Detalle", { header: true, width: 75 })] }),
  new TableRow({ children: [cellT("Origen", { bold: true, alt: true }), cellT("Conjunto de datos o API meteorológica histórica (clima diario por ciudad y fecha).")] }),
  new TableRow({ children: [cellT("Integración", { bold: true, alt: true }), cellT("Se cruza por la fecha del turno —dato ya presente en la fuente principal—, por lo que la integración es directa.")] }),
  new TableRow({ children: [cellT("Justificación", { bold: true, alt: true }), cellT("Permite analizar si la lluvia o la temperatura inciden en el ausentismo, y satisface el requisito superador de utilizar varias fuentes de datos distintas.")] }),
]));
body.push(new Paragraph({ spacing: { before: 120, after: 0 }, alignment: AlignmentType.JUSTIFIED,
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: "B45309", space: 12 } }, indent: { left: 360 },
  children: [
    r("A confirmar con el docente: ", { bold: true, color: "B45309" }),
    r("¿el cruce del conjunto de datos principal con el clima por fecha se considera «varias fuentes de datos distintas» a los efectos de la expectativa superadora?", { italics: true }),
  ] }));

// =============================== PARTE 2 ====================================
body.push(H1("2. Desarrollo de la Hipótesis"));
body.push(P("Definidos el dominio y las fuentes de datos, se plantea a continuación la pregunta concreta que el proyecto busca responder y el modo en que esa respuesta se traduce en valor para la organización."));

body.push(H2("2.1. Hipótesis: qué proponemos resolver"));
body.push(new Paragraph({
  spacing: { before: 60, after: 160, line: 300 }, alignment: AlignmentType.JUSTIFIED,
  indent: { left: 360 },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 12 } },
  children: [r("Es posible predecir, en el momento en que se agenda un turno, qué pacientes faltarán a la consulta a partir de sus características y del contexto del turno; y utilizar esa predicción para reducir el costo del ausentismo mediante recordatorios dirigidos y la asignación de sobreturnos.", { italics: true })],
}));
body.push(P("La hipótesis es verificable: el modelo predictivo entregará, para cada turno, una probabilidad de ausencia que podrá contrastarse contra lo efectivamente ocurrido, y cuyo acierto se medirá con métricas objetivas (véase sección 2.3)."));

body.push(H2("2.2. Audiencia"));
body.push(P("Conforme a la consigna, la audiencia del trabajo es la Gerencia Comercial y Técnica. El mensaje se adapta a cada una:"));
body.push(bullet([r("Gerencia Comercial: ", { bold: true }), r("se enfatiza el impacto en el aprovechamiento de la agenda, los ingresos recuperados por hora-profesional, la reducción de la lista de espera y la mejora en el acceso de los pacientes.")]));
body.push(bullet([r("Gerencia Técnica: ", { bold: true }), r("se detalla el modelo de minería empleado, el pipeline de datos que lo alimenta y las métricas que garantizan la confiabilidad de la predicción.")]));

body.push(H2("2.3. Cómo se resuelve la hipótesis para la entrega de valor"));
body.push(P("La resolución se apoya en una técnica de aprendizaje supervisado de las estudiadas en la asignatura:"));
body.push(bullet([r("Técnica: ", { bold: true }), r("clasificación binaria (asiste / no asiste) mediante árboles de decisión y Random Forest. La variable objetivo es categórica de dos clases, lo que encuadra el problema como clasificación.")]));
body.push(bullet([r("Evaluación: ", { bold: true }), r("dado que las clases están desbalanceadas (aproximadamente 80 % de asistencia frente a 20 % de ausencia), el desempeño se mide con precision, recall, F1 y AUC, y no únicamente con accuracy —una métrica que, ante este desbalanceo, resultaría engañosa.")]));
body.push(bullet([r("Entrega de valor: ", { bold: true }), r("el modelo devuelve una probabilidad de ausencia por turno; sobre ella, la aplicación funcional recomienda la acción correspondiente (recordatorio o sobreturno). Cada turno no perdido recupera una hora efectiva de atención, materializando el valor propuesto para el negocio.")]));
body.push(new Paragraph({ spacing: { before: 120, after: 0 }, alignment: AlignmentType.JUSTIFIED,
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 12 } }, indent: { left: 360 },
  children: [
    r("Coherencia hipótesis–conclusión: ", { bold: true, color: ACCENT }),
    r("la métrica del modelo responde de forma directa a la hipótesis planteada, criterio que la consigna evalúa explícitamente.", { italics: true }),
  ] }));

// =============================== METODOLOGÍA ================================
body.push(H1("3. Metodología de trabajo y organización del equipo"));

body.push(H2("3.1. Enfoque metodológico"));
body.push(P("El proyecto combina una metodología de ciencia de datos con una metodología ágil de gestión:"));
body.push(bullet([r("Proceso de minería de datos — CRISP-DM: ", { bold: true }), r("el trabajo recorre sus fases (comprensión del negocio, comprensión de los datos, preparación, modelado, evaluación y despliegue), que se corresponden con las secciones de este proyecto.")]));
body.push(bullet([r("Gestión del proyecto — metodología ágil: ", { bold: true }), r("se adopta un enfoque iterativo basado en Kanban (tablero To Do / Doing / Done en GitHub Projects), con iteraciones cortas alineadas a las entregas parciales de la cátedra para revisar avances y reencauzar el trabajo.")]));
body.push(bullet([r("Versionado — GitHub: ", { bold: true }), r("todo el código del proyecto de datos (notebook de EDA y modelado, y la aplicación funcional) se versiona en un repositorio de GitHub, con commits descriptivos y trabajo por ramas.")]));
body.push(P("Esta combinación responde a las expectativas superadoras de la consigna (administración del proyecto con metodologías ágiles y versionado del código)."));

body.push(H2("3.2. Roles del equipo"));
body.push(P("Cada integrante asume un rol específico y expone su área de influencia durante la presentación, conforme lo exige la consigna. Los roles propuestos son:"));
body.push(table([
  new TableRow({ children: [cellT("Rol", { header: true, width: 32 }), cellT("Responsabilidad", { header: true, width: 48 }), cellT("Integrante", { header: true, width: 20 })] }),
  new TableRow({ children: [cellT("Líder de proyecto", { bold: true, alt: true }), cellT("Coordina el equipo y la metodología ágil; expone el dominio, la problemática y la propuesta de valor."), cellT("[Nombre]", { alt: true })] }),
  new TableRow({ children: [cellT("Ingeniero de datos", { bold: true }), cellT("Selección e ingesta de fuentes (Kaggle y fuente secundaria), limpieza y construcción del pipeline de datos."), cellT("[Nombre]")] }),
  new TableRow({ children: [cellT("Analista de datos (EDA)", { bold: true, alt: true }), cellT("Análisis exploratorio, control de calidad de datos y visualizaciones descriptivas."), cellT("[Nombre]", { alt: true })] }),
  new TableRow({ children: [cellT("Especialista en modelado", { bold: true }), cellT("Ingeniería de características, entrenamiento del modelo (árbol de decisión / Random Forest) y evaluación con métricas."), cellT("[Nombre]")] }),
  new TableRow({ children: [cellT("Desarrollador de la aplicación", { bold: true, alt: true }), cellT("Construcción de la aplicación funcional interactiva y conexión con el modelo; conclusión y storytelling."), cellT("[Nombre]", { alt: true })] }),
]));
body.push(new Paragraph({ spacing: { before: 100, after: 0 }, alignment: AlignmentType.JUSTIFIED,
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: "B45309", space: 12 } }, indent: { left: 360 },
  children: [
    r("Nota: ", { bold: true, color: "B45309" }),
    r("ajustar la cantidad de roles a la cantidad de integrantes del grupo; un integrante puede asumir más de un rol si fuera necesario.", { italics: true }),
  ] }));

// =============================== DOCUMENTO ==================================
const numFooter = new Footer({ children: [new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [r("Página ", { size: 18, color: GRAY }),
    new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY }),
    r(" de ", { size: 18, color: GRAY }),
    new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY })],
})] });

const contentHeader = new Header({ children: [new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AEBED4", space: 4 } },
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    r("Ciencia de Datos — TPO", { size: 18, color: GRAY }),
    r("\t", { size: 18 }),
    r("Dominio del Negocio e Hipótesis", { size: 18, color: GRAY, italics: true }),
  ],
})] });

const pageProps = { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } };

const doc = new Document({
  creator: "TPO Ciencia de Datos — UADE",
  title: "TPO Ciencia de Datos — Dominio del Negocio e Hipótesis",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Calibri", size: 30, bold: true, color: ACCENT }, paragraph: { spacing: { before: 320, after: 140 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Calibri", size: 25, bold: true, color: "000000" }, paragraph: { spacing: { before: 220, after: 100 } } },
    ],
  },
  sections: [
    { properties: { page: pageProps }, children: [...cover, ...toc] },
    { properties: { page: pageProps }, headers: { default: contentHeader }, footers: { default: numFooter }, children: body },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(path.join(DIR, "Trabajo Practico Obligatorio - Ciencia de Datos.docx"), buffer);
  console.log("OK: Trabajo Practico Obligatorio - Ciencia de Datos.docx");
});
