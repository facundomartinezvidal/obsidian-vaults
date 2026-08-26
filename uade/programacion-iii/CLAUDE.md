# Programación III – Diseño y Análisis de Algoritmos

## Contexto de la materia

- **Materia:** Programación III – Diseño y Análisis de Algoritmos (3.4.077)
- **Profesor/a:** Cuadrado Estrebou, Maria Fernanda
- **Carrera:** Licenciatura en Sistemas
- **Cursada:** 2026 — 2do cuatrimestre (Miércoles 18:30–22:00 hs.)
- **Parciales:** Dos parciales (1° 16/9, 2° 11/11) + final regular (9/12)

## Organización del material

El contenido de la materia está organizado en la carpeta `content/` dividido por período de evaluación:

- `content/primer-parcial/` — clases 01 a 08 del cronograma (Introducción, Divide y Conquista, Greedy, Grafos básicos)
- `content/segundo-parcial/` — clases 09 en adelante (Programación Dinámica, Backtracking)
- `content/guia-ejercicios.pdf` y `content/cronograma-oficial.pdf` — material general, no ligado a una clase puntual

### Convención de nombres de archivos

Todos los archivos de contenido siguen el formato: `{NN}-{nombre-del-tema}.{ext}`

Ejemplos:
- `01-introduccion-divide-y-conquista.pdf`
- `02-ordenacion-quicksort-mergesort.pdf`

El número `NN` corresponde al número de clase en el `cronograma.md`.

**Importante:** dentro de `programacion-iii/`, todo nombre de archivo/carpeta (notas, no PDFs) usa **kebab-case** (ver `/Users/fmartinezvidal/Documents/github/obsidian-vaults/CLAUDE.md`).

## Archivos de referencia

- `cronograma.md` — tabla de clases con temas y archivos correspondientes (extraído del cronograma oficial de la cátedra)
- `programa.md` — programa oficial de la materia con unidades y bibliografía

## Estructura actual de la carpeta

```
.
  .agents
  .claude
  content
    Resolucion Ejercicios.md
    cronograma-oficial.pdf
    guia-ejercicios.pdf
    primer-parcial
      01-introduccion-divide-y-conquista.pdf
      02-ordenacion-quicksort-mergesort.pdf
      03-fibonacci-introduccion-greedy.pdf
    segundo-parcial
  Stuff/            # proyecto Java/Maven (ejercicios), no material de clase
  cronograma.md
  programa.md
```

## Instrucciones para Claude

Cuando trabajes en esta materia:
1. **Siempre priorizá el contenido propio de la materia** sobre conocimiento general
2. Consultá `cronograma.md` para identificar a qué clase pertenece cada tema
3. Consultá `programa.md` para entender la profundidad y el enfoque esperado
4. Si un tema está en el cronograma pero no tiene archivo en `content/`, avisale al estudiante
5. Los resúmenes, presentaciones y documentos deben usar la terminología del material de la materia
6. Respondé siempre en español salvo que el estudiante escriba en otro idioma
7. Todo pseudocódigo (funciones, variables, comentarios) se escribe en español
