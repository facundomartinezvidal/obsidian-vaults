# Programación III – Diseño y Análisis de Algoritmos

## Contexto de la materia

- **Materia:** Programación III – Diseño y Análisis de Algoritmos (3.4.077)
- **Profesor/a:** Cuadrado Estrebou, Maria Fernanda
- **Carrera:** Licenciatura en Sistemas
- **Cursada:** 2026 — 2do cuatrimestre (Miércoles 18:30–22:00 hs.)
- **Parciales:** Dos parciales (1° 16/9, 2° 11/11) + final regular (9/12)

## Organización del material

El material está separado en dos carpetas según el tipo, y cada una dividida por período de evaluación:

- `contenido/primer-parcial/` — teoría de las clases 01 a 07 (Introducción, Divide y Conquista, Greedy, Grafos básicos)
- `contenido/segundo-parcial/` — teoría de las clases 09 en adelante (Programación Dinámica, Backtracking)
- `practica/primer-parcial/` — ejercicios resueltos y guías de práctica de temas de primer parcial
- `practica/segundo-parcial/` — ejercicios resueltos y guías de práctica de temas de segundo parcial
- `practica/guia-ejercicios-programacion-iii.pdf`, `practica/repaso-ejercicios-integradores-primer-parcial.pdf`, `practica/indice.md`, `practica/convencion-pseudocodigo.md` — material general de práctica, no ligado a un parcial puntual

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
  contenido
    primer-parcial
      01-introduccion-divide-y-conquista.pdf
      02-ordenacion-quicksort-mergesort.pdf
      03-fibonacci-introduccion-greedy.pdf
      04-continuacion-greedy-huffman.pdf
      05-grafos-dirigidos-dijkstra.pdf
      06-arboles-recubrimiento-prim-kruskal.pdf
    segundo-parcial
  practica
    guia-ejercicios-programacion-iii.pdf
    repaso-ejercicios-integradores-primer-parcial.pdf
    indice.md                                 # MOC con enlaces a todos los ejercicios
    convencion-pseudocodigo.md                # estilo de pseudocódigo de la cátedra
    primer-parcial
      ejercicios-integracion-primer-parcial.pdf
      parcial-20-10-2023.jpg                  # simulacro adicional (inversiones, golosinas, superhéroes — Greedy), pendiente de resolver
      resolucion-ejercicios/                  # una nota .md por ejercicio (a: estrategia, b: pseudocódigo, c: complejidad), agrupadas en subcarpetas por paradigma
        divide-y-conquista/
          01-secuencia-ordenada.md
          02-potencia-de-dos.md
          03-punto-fijo.md
          04-kesimo-menor.md
        greedy/
          01-planificacion-tareas-plazo-fijo.md
          02-minimizar-tiempo-espera.md
          03-mezclado-de-cintas.md
          04-problema-del-mecanico.md
        grafos/
          01-cuadras-minimas-escuela-gimnasio.md
          02-camino-minimo-con-escala.md
        integradores/
          01-maximizar-actividades-compatibles.md
          02-posicion-del-pico.md
          05-salon-de-convenciones.md
          06-valor-inmediato-inferior.md
          07-maximizacion-de-archivos.md
          plantilla-ejercicio-integrador.md
        simulacro-primer-parcial/
          01-problema-logistica.md
          02-sistema-de-riego.md
          03-carga-de-camiones.md
          04-cooperativa-agricola.md
          05-transporte-de-logistica.md
          06.md
          enunciado-simulacro.pdf
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
