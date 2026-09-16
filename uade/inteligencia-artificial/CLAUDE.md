# Inteligencia Artificial Aplicada

## Contexto de la materia

- **Materia:** Inteligencia Artificial Aplicada
- **Profesor/a:** Ruiz Matias Gabriel
- **Carrera:** Licenciatura (optativa)
- **Cursada:** 2026 — 2do cuatrimestre, Lunes 18:45–22:15hs
- **Parciales:** Dos parciales + Final (presentación de TPO)

## Organización del material

El contenido está organizado en `content/` dividido por período de evaluación:

- `content/primer-parcial/` — clases 01 a 06 (hasta 1° Parcial, clase 07)
- `content/segundo-parcial/` — clases 08 a 14 (hasta 2° Parcial, clase 15)
- `content/final/` — clase 16 en adelante (Unidad 6, TPO, recuperatorio, final)

### Convención de carpetas y nombres

Cada clase tiene su propia carpeta dentro de `content/primer-parcial/` o `content/segundo-parcial/`, nombrada con el número de clase `NN` (según `cronograma.md`). Todos los archivos de esa clase (slides, notas, resúmenes) van dentro, manteniendo el prefijo `{NN}-{nombre-del-tema}.{ext}`.

Ejemplo:
```
content/primer-parcial/01/
  01-presentacion-materia.pptx
  01-introduccion-ia-impacto-profesional.pptx
  01-notas-clase.md
  01-resumen-clase.md
```

## Archivos de referencia

- `cronograma.md` — tabla de clases con temas y archivos correspondientes
- `programa.md` — unidades y bibliografía (bibliografía pendiente de completar)
- `cronograma-original.docx` — documento fuente original del cronograma (archivo, no editar)

## Estructura actual de la carpeta

```
.
  content
    final
    presentaciones/
      primer-parcial/
        01-introduccion-ia-impacto-profesional.pptx
        01-presentacion-materia.pptx
        02-tipos-de-prompt.pptx
        03b-ecosistema-genai.pptx
        04-herramientas-ia-productividad.pptx
      segundo-parcial/
    primer-parcial
      01/
        01-notas-clase.md
        01-resumen-clase.md
        Actividad grupal - Desarrollo de Software.pdf
        Clase 1- Actividad en clase.pdf
        Presentacion IA Desarrollo.html
      02/
        prompt-battle/
          02-actividad-prompt-battle.md
          02-entrega-prompt-battle.md
          02-entrega-prompt-battle.pdf
          02-nivel2-copilot-arquitectura.pdf
          02-nivel2-gemini-arquitectura.md
          02-nivel3-copilot-arquitectura.pdf
          02-nivel3-gemini-arquitectura.md
          02-nivel3-gemini-arquitectura.pdf
        generacion-contenido/
          02-actividad-generacion-contenido.md
          02-entrega-generacion-contenido.md
          02-generacion-contenido-carrera.pdf
          02-nivel1-claude-landing-exelior.html
          02-nivel2-claude-landing-exelior.html
          02-nivel2-lovable-landing-exelior.html
          02-nivel2.1-claude-landing-exelior.html
      05/
        05-actividad-automatizacion-tp.docx
        05-entrega-automatizacion-tp.md
    segundo-parcial
  cronograma-original.docx
  cronograma.md
  programa.md
```

Las presentaciones (`.pptx`) de todas las clases viven en `content/presentaciones/{primer-parcial,segundo-parcial}/`, separadas de las notas/resúmenes/entregas que quedan dentro de la carpeta de cada clase en `content/{primer-parcial,segundo-parcial}/NN/`.

## Instrucciones para Claude

Cuando trabajes en esta materia:
1. **Siempre priorizá el contenido propio de la materia** sobre conocimiento general
2. Consultá `cronograma.md` para identificar a qué clase pertenece cada tema
3. Consultá `programa.md` para entender la profundidad y el enfoque esperado
4. Si un tema está en el cronograma pero no tiene archivo en `content/`, avisale al estudiante
5. Los resúmenes, presentaciones y documentos deben usar la terminología del material de la materia
6. Respondé siempre en español salvo que el estudiante escriba en otro idioma
7. Bibliografía en `programa.md` está pendiente — si el estudiante la consigue, actualizarla ahí
