# Proceso de Desarrollo de Software

## Contexto de la materia

- **Materia:** Proceso de Desarrollo de Software
- **Profesor/a:** Stricagnoli Matias Damian
- **Carrera:** Licenciatura en Sistemas
- **Cursada:** 2026 — 2° cuatrimestre (martes 18:45 a 22:15 hs.)
- **Parciales:** Dos parciales (1° parcial clase 8, 2° parcial clase 16) + final regular

## Organización del material

El contenido de la materia está organizado en la carpeta `content/` dividido por período de evaluación:

- `content/primer-parcial/` — clases 01 a 08 del cronograma (introducción, POO, bad smells, GRASP, SOLID, patrones de diseño)
- `content/segundo-parcial/` — clases 09 a 18 (patrones de diseño, Clean Architecture, CQRS, presentación TP)

Archivos ya organizados y renombrados con `/u-student:organize` (clases 3-9 todavía sin material subido).

Además hay tres archivos en la raíz de la materia (no van a `content/`, no están atados a una clase puntual):
- `00-cronograma-fuente.docx` — cronograma oficial fuente (ya volcado en `cronograma.md`)
- `00-tp-skillswap.docx` — enunciado del Trabajo Práctico Obligatorio (backend Java, Hibernate/JPA, MySQL, sin Spring Boot)
- `00-mysql-connector-j-9.7.0.zip` — dependencia para el TP, no es material de estudio

### Convención de nombres de archivos

Todos los archivos de contenido siguen el formato: `{NN}-{nombre-del-tema}.{ext}`

Ejemplos:
- `01-introduccion.pptx`
- `05-patrones-de-diseno.pptx`
- `08-parcial-modelo.docx`

El número `NN` corresponde al número de clase en el `cronograma.md`.

## Archivos de referencia

- `cronograma.md` — tabla de clases con temas y archivos correspondientes (extraído del cronograma oficial)
- `programa.md` — unidades temáticas **inferidas del cronograma** (no se encontró programa oficial separado); reemplazar si aparece uno

## Estructura actual de la carpeta

```
.
  00-cronograma-fuente.docx
  00-mysql-connector-j-9.7.0.zip
  00-tp-skillswap.docx
  CLAUDE.md
  content
    primer-parcial
      01-ejercicio-1.docx
      01-ejercicio-1.mdj
      01-introduccion.pptx
      02-poo-diagrama-de-clases.pptx
    segundo-parcial
      10-composite.zip
      10-decorator.zip
      10-patrones-de-diseno.pptx
      10-restaurante.docx
      10-stock-y-precios.docx
      11-clean-architecture.pptx
      11-flip-flop.docx
      11-for-sale.docx
      11-state.zip
      12-cqrs.pptx
      12-garbarisi-resolucion.docx
      12-garbarisi.docx
      12-magiccafeobserver.zip
      12-netflix.zip
      12-youtube.zip
      13-factory.zip
      13-magiccafefactory.zip
      13-modulo-exportador-resolucion.docx
      13-modulo-exportador.docx
      13-presentacion-tp.mdj
      13-presentacion-tp.pptx
      14-examen-final-modelo.docx
      14-examen-modelo.docx
      15-examen-final-modelo.docx
      16-examen-final-modelo.docx
      16-examen-modelo.docx
  cronograma.md
  programa.md
```

## Instrucciones para Claude

Cuando trabajes en esta materia:
1. **Siempre priorizá el contenido propio de la materia** sobre conocimiento general
2. Consultá `cronograma.md` para identificar a qué clase pertenece cada tema
3. Consultá `programa.md` para entender la profundidad y el enfoque esperado (recordar: es inferido, no oficial)
4. Si un tema está en el cronograma pero no tiene archivo en `content/`, avisale al estudiante
5. Los resúmenes, presentaciones y documentos deben usar la terminología del material de la materia
6. Respondé siempre en español salvo que el estudiante escriba en otro idioma
7. `0. TP_PDS_SkillSwap.docx` es el Trabajo Práctico Obligatorio — tenerlo en cuenta para `/u-student:write`, `/u-student:study` y `/u-student:tp-reviewer`
8. Si el estudiante trabaja desde una carpeta sin `CLAUDE.md`, recomendá correr `/u-student:init` para configurar el workspace de la materia
