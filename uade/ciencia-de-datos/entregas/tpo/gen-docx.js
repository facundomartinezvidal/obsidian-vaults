const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign
} = require("docx");
const fs = require("fs");

const ACCENT = "2E5A8C";
const GRAY = "595959";

// ---- helpers ----------------------------------------------------------------
const H = (text, level) => new Paragraph({
  heading: level,
  spacing: { before: 240, after: 120 },
  children: [new TextRun({ text, bold: true, color: level === HeadingLevel.HEADING_1 ? ACCENT : "000000" })],
});

const P = (runs, opts = {}) => new Paragraph({
  spacing: { after: 120, line: 276 },
  alignment: opts.align,
  children: (Array.isArray(runs) ? runs : [new TextRun({ text: runs })]),
});

const bullet = (text, bold) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 60, line: 276 },
  children: typeof text === "string"
    ? [new TextRun({ text, bold })]
    : text,
});

const r = (text, opts = {}) => new TextRun({ text, ...opts });

const cell = (children, opts = {}) => new TableCell({
  width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
  shading: opts.header ? { type: ShadingType.CLEAR, fill: ACCENT } : (opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined),
  verticalAlign: VerticalAlign.CENTER,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: (Array.isArray(children) ? children : [children]),
});

const cellText = (text, opts = {}) => cell(
  new Paragraph({ children: [new TextRun({ text, bold: opts.header || opts.bold, color: opts.header ? "FFFFFF" : "000000" })] }),
  opts
);

const table = (rows) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: {
    top: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
  },
  rows,
});

// ---- document content -------------------------------------------------------
const children = [];

// Portada simple
children.push(new Paragraph({ spacing: { before: 1200 } }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 120 },
  children: [r("Trabajo Práctico Obligatorio", { bold: true, size: 44, color: ACCENT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 480 },
  children: [r("Ciencia de Datos (3.4.217) — UADE", { size: 28, color: GRAY })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 120 },
  children: [r("Partes 1 y 2 — Selección del Dominio del Negocio y Desarrollo de la Hipótesis", { bold: true, size: 26 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 720 },
  children: [r("Dominio: No-show de turnos médicos  ·  Audiencia: Gerencia Comercial y Técnica", { italics: true, size: 22, color: GRAY })],
}));

// =============================== PARTE 1 ====================================
children.push(H("Parte 1 — Selección del Dominio del Negocio", HeadingLevel.HEADING_1));

children.push(H("1. Descripción del dominio", HeadingLevel.HEADING_2));
children.push(P("Un centro de salud ambulatorio (clínica u hospital) atiende pacientes por turnos programados. El circuito es: el paciente solicita un turno (presencial, telefónico o web), se le asigna fecha y hora con un profesional, y el día indicado asiste — o no."));
children.push(P("La agenda del profesional es el recurso central del negocio: cada franja horaria tiene un costo fijo (el tiempo del médico) y una capacidad limitada. La gestión eficiente de esa agenda determina cuántos pacientes se atienden y con qué nivel de espera."));

children.push(H("2. Problemática", HeadingLevel.HEADING_2));
children.push(P([
  r("El "), r("ausentismo a turnos médicos", { bold: true }), r(" ("), r("no-show", { italics: true }),
  r(") ronda el "), r("20–30%", { bold: true }), r(" de los turnos otorgados. Cuando un paciente no asiste y no avisa:"),
]));
children.push(bullet("La franja horaria queda ociosa: una hora del profesional que igual se paga."));
children.push(bullet("Otro paciente que sí habría asistido no pudo ocupar ese lugar, lo que aumenta la lista de espera."));
children.push(P([
  r("Es un "), r("doble costo", { bold: true }),
  r(": recurso médico desperdiciado más peor acceso para el resto. Hoy el centro no sabe de antemano quién va a faltar, así que no puede anticiparse."),
]));

children.push(H("3. Propuesta de valor", HeadingLevel.HEADING_2));
children.push(P("Predecir, en el momento de agendar, la probabilidad de que cada paciente falte a su turno, para accionar sobre los de mayor riesgo:"));
children.push(bullet("Recordatorios dirigidos (SMS o llamado) a quienes más probablemente falten."));
children.push(bullet("Sobreturnos controlados en franjas de alto riesgo de ausentismo."));
children.push(P([
  r("Resultado para el negocio: ", { bold: true }),
  r("menor ausentismo, mejor uso de la agenda y reducción de la lista de espera, sin sumar recursos. Cada no-show evitado recupera una hora de atención."),
]));

children.push(H("4. Fuentes de datos", HeadingLevel.HEADING_2));
children.push(P([r("Fuente principal — Medical Appointment No Shows (Kaggle)", { bold: true })]));
children.push(table([
  new TableRow({ children: [cellText("Atributo", { header: true, width: 25 }), cellText("Detalle", { header: true, width: 75 })] }),
  new TableRow({ children: [cellText("Origen", { bold: true }), cellText("Kaggle — turnos reales de salud pública de Brasil")] }),
  new TableRow({ children: [cellText("Volumen", { bold: true }), cellText("+110.000 turnos (filas)")] }),
  new TableRow({ children: [cellText("Variables (14)", { bold: true }), cellText("Edad, género, barrio, fechas de agendamiento y de turno, comorbilidades (diabetes, hipertensión, alcoholismo, discapacidad), recepción de SMS, beca social, y la variable objetivo: asistió / no asistió")] }),
  new TableRow({ children: [cellText("Por qué sirve", { bold: true }), cellText("Dataset limpio, masivo y documentado, con la variable a predecir ya etiquetada. Mezcla variables categóricas y numéricas, lo que permite mostrar EDA y feature engineering")] }),
]));
children.push(new Paragraph({ spacing: { after: 80 } }));
children.push(P([r("Fuente secundaria — Clima por fecha (expectativa superadora)", { bold: true })]));
children.push(table([
  new TableRow({ children: [cellText("Atributo", { header: true, width: 25 }), cellText("Detalle", { header: true, width: 75 })] }),
  new TableRow({ children: [cellText("Origen", { bold: true }), cellText("Dataset o API meteorológico histórico (clima diario por ciudad y fecha)")] }),
  new TableRow({ children: [cellText("Integración", { bold: true }), cellText("Se cruza por la fecha del turno (cada turno ya tiene fecha): integración trivial")] }),
  new TableRow({ children: [cellText("Por qué sirve", { bold: true }), cellText("Permite analizar si la lluvia o la temperatura inciden en el ausentismo. Cumple el requisito superador de varias fuentes de datos distintas")] }),
]));
children.push(new Paragraph({ spacing: { after: 80 } }));
children.push(P([
  r("A confirmar con el docente: ", { bold: true, color: "B45309" }),
  r("¿cruzar el dataset principal con clima por fecha cuenta como «varias fuentes de datos distintas» para la expectativa superadora?", { italics: true }),
]));

// =============================== PARTE 2 ====================================
children.push(H("Parte 2 — Desarrollo de la Hipótesis", HeadingLevel.HEADING_1));

children.push(H("Hipótesis (qué proponemos resolver)", HeadingLevel.HEADING_2));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  indent: { left: 360 },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 12 } },
  children: [r("Es posible predecir, en el momento en que se agenda un turno, qué pacientes faltarán, a partir de sus características y del contexto del turno; y usar esa predicción para reducir el costo del ausentismo mediante recordatorios dirigidos y sobreturnos.", { italics: true })],
}));

children.push(H("Audiencia (cómo le hablamos a cada uno)", HeadingLevel.HEADING_2));
children.push(bullet([r("Gerencia Comercial: ", { bold: true }), r("impacto en uso de agenda, ingresos por hora-médico recuperada, acceso de pacientes y satisfacción.")]));
children.push(bullet([r("Gerencia Técnica: ", { bold: true }), r("el modelo, el pipeline de datos y las métricas que garantizan que la predicción es confiable.")]));

children.push(H("Cómo se resuelve para entregar valor", HeadingLevel.HEADING_2));
children.push(bullet([r("Técnica: ", { bold: true }), r("clasificación binaria (asiste / no asiste) con árboles de decisión y Random Forest.")]));
children.push(bullet([r("Evaluación: ", { bold: true }), r("por el desbalanceo de clases, se mide con precision, recall, F1 y AUC, no solo accuracy (un modelo que diga «todos vienen» acertaría el 80% y sería inútil).")]));
children.push(bullet([r("Entrega de valor: ", { bold: true }), r("el modelo devuelve una probabilidad de ausencia por turno; la app sugiere la acción (recordatorio o sobreturno). Cada no-show evitado recupera una hora de agenda. Ahí está la coherencia hipótesis → conclusión que la consigna evalúa.")]));

// ---- build ------------------------------------------------------------------
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } },
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Arial", size: 30, bold: true, color: ACCENT } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Arial", size: 24, bold: true, color: "000000" } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(__dirname + "/tpo-partes-1-2.docx", buffer);
  console.log("OK: tpo-partes-1-2.docx");
});
