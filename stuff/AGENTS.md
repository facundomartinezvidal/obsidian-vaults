# AGENTS.md — Vault `stuff`

Guía operativa para agentes (Claude Code) trabajando en este vault Obsidian.

## Propósito del vault

`stuff` = vault de notas personales misceláneas. Actualmente alberga el módulo `registro-semanal/` (seguimiento de nutrición consciente).

## Estructura

```
stuff/
├── AGENTS.md                              # este archivo
├── Welcome.md
└── registro-semanal/
    ├── semana-N.md                        # un archivo por semana
    └── templates/
        └── registro-semanal-template.md   # plantilla base
```

## Módulo: `registro-semanal/`

### Formato

- Un archivo por semana: `semana-1.md`, `semana-2.md`, etc.
- Frontmatter obligatorio: `tipo: registro-semanal`, `semana`, `fecha-inicio`, `fecha-fin`, `tags`.
- Una sección `## <Día> (<fecha-iso>)` por día de la semana (Lunes → Domingo).
- Bullets fijos por día: **Desayuno**, **Almuerzo**, **Merienda**, **Cena**, **Síntomas digestivos**, **¿Cómo me siento hoy?**.
- Cada comida puede incluir hora entre `_( )_` y sub-bullets por item ingerido.
- Cierre de día con callout `> [!summary] Total del día`.

### Plantilla canónica

`registro-semanal/templates/registro-semanal-template.md`. Mantener sincronizada con el formato vigente.

## Regla operativa: enriquecimiento nutricional automático

**Siempre que el usuario registre una comida**, el agente debe:

1. **Identificar cada ítem ingerido** (ej. "3 huevos", "200 g arroz", "barra INTEGRA").
2. **Investigar/estimar valores nutricionales** por ítem:
    - Calorías (kcal)
    - Proteína (g)
    - Grasa (g)
    - Carbohidratos (g)
    - Cuando aplique: cafeína, fibra, sodio, micronutrientes destacables.
3. **Anotar el ítem como sub-bullet** con el formato:

    ```
    - <ítem y cantidad> — ~<kcal> kcal · <prot> g prot · <grasa> g grasa · <carbs> g carbs
    ```

4. **Agregar línea de total por comida**:

    ```
    - **Total <comida>:** ~<kcal> kcal · <prot> g prot · <grasa> g grasa · <carbs> g carbs
    ```

5. **Actualizar/crear callout `> [!summary] Total del día`** sumando todas las comidas registradas hasta el momento. Indicar "(parcial, sin cena)" o similar si faltan comidas.
6. **Marcar valores como aproximados** (`~`) — son estimaciones basadas en tablas estándar (USDA, tablas argentinas SARA, etiquetado promedio). Si el ítem es de marca específica y se conoce, usar valores de marca.
7. **Si la marca no aporta info pública** (ej. barra INTEGRA), usar promedio de barras integrales similares y aclarar.

### Convenciones

- Usar `g` para gramos, `ml` para mililitros, `kcal` para calorías.
- Hora con formato `HH:MM` o rango `HH:MM–HH:MM` dentro de `_( )_`.
- Idioma: español rioplatense.
- No inventar marcas ni etiquetar valores como exactos cuando son estimaciones.

## Base de datos: marcas conocidas (valores etiquetados reales)

Cuando el usuario mencione un ítem listado acá, **usar estos valores en lugar de estimaciones**.

### Barra INTEGRA (proteína vegetal con cobertura de chocolate semiamargo)

- **Porción:** 45 g (1 unidad)
- **Energía:** 154 kcal · 644 kJ
- **Carbohidratos:** 12 g (azúcares totales 5.8 g · azúcares añadidos 3.8 g)
- **Proteínas:** 15 g
- **Grasas totales:** 5.1 g (saturadas 1.7 g · trans 0 g)
- **Colesterol:** 0 mg
- **Fibra alimentaria:** 8 g (fuente de fibra)
- **Sodio:** 121 mg
- **Ingredientes:** crispín de proteína vegetal, cobertura de chocolate semiamargo, fibra de raíz de achicoria (inulina), avena, pasta de maní, proteína vegetal texturizada, almíbar de azúcar mascabo, proteína de arveja, maní, cacao en polvo, aroma a vainilla.
- **Alérgenos:** contiene avena, maní y soja. Puede contener trigo, cebada, centeno, almendra, nuez, avellanas, castañas de cajú y derivados de leche.

## Convenciones generales del vault

- Todos los archivos `.md` siguen Obsidian Flavored Markdown.
- Usar `[[wikilinks]]` para referencias internas.
- Frontmatter YAML válido siempre que la nota tenga metadata estructurada.
- Nombres de archivo y carpetas en kebab-case dentro de subdirectorios temáticos.

## Cuándo crear un archivo nuevo

- Nueva semana → duplicar `templates/registro-semanal-template.md` como `semana-N.md`, completar `semana`, `fecha-inicio`, `fecha-fin`.
- Nuevo módulo (ej. entrenamiento, lectura) → crear carpeta dedicada con su propio `templates/` y actualizar este AGENTS.md.
