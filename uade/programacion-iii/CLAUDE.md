# CLAUDE.md — Programacion III

## Sobre la materia

Programacion III (UADE) es una materia sobre **tecnicas de diseño de algoritmos**. El objetivo es aprender a resolver problemas complejos aplicando paradigmas algoritmicos, y analizar la complejidad temporal y espacial de cada solucion.

Los paradigmas que se estudian (siguiendo el orden del apunte de catedra):

1. **Introduccion** — Complejidad temporal, notacion asintotica, recurrencias
2. **Divide y Conquista** — Dividir el problema en subproblemas mas chicos, resolver recursivamente, combinar
3. **Greedy** — Elegir la mejor opcion local en cada paso
4. **Programacion Dinamica** — Guardar soluciones de subproblemas que se repiten
5. **Backtracking** — Explorar todas las posibilidades descartando ramas invalidas

## Estructura de carpetas

```
programacion-iii/
├── introduccion/           — Complejidad temporal, notacion asintotica
├── divide-y-conquista/     — D&C, S&C y sus algoritmos
├── fundamentos/            — Algoritmos basicos (Bubble Sort, Insertion Sort, Busqueda Lineal)
├── greedy/                 — Algoritmos Greedy
├── programacion-dinamica/  — Algoritmos de DP
├── backtracking/           — Algoritmos de Backtracking
├── playground/             — Entorno Python para probar codigo
└── contenido/              — Material oficial de la catedra (PDFs)
```

## Convenciones

- Todos los nombres de archivos y carpetas usan **kebab-case** (ej: `merge-sort.md`, `divide-y-conquista/`).
- Cada algoritmo tiene su propia nota separada.
- Los diagramas (`.excalidraw`) van dentro de una carpeta `diagrams/` dentro de la carpeta del paradigma al que pertenecen.
- Los wikilinks a diagramas incluyen la subcarpeta: `![[diagrams/merge-sort-diagrama.excalidraw]]`.
- Los wikilinks a notas usan el nombre del archivo sin extension (ej: `[[merge-sort]]`).

## Estilo de pseudocodigo

El pseudocodigo sigue un estilo academico basado en el apunte de catedra, alineado con el usado en libros como CLRS y Sedgewick. Reglas:

### Estructura
- `function nombre(parametros)` para declarar funciones — sin llaves, sin `begin/end`, solo indentacion
- `return valor` para devolver
- Sin tipos explícitos en los parametros

### Control de flujo
- `if condicion` / `else` — sin parentesis en la condicion
- `while condicion` — sin parentesis
- `for i = 0 to n - 1` — extremos inclusivos
- `for i = 0 to n - 1 step k` — cuando el paso no es 1

### Operadores
- `=` asignacion, `==` igualdad, `!=` distinto
- `<`, `>`, `<=`, `>=` comparacion
- `and`, `or`, `not` — en lugar de `&&`, `||`, `!`

### Memoria y estructuras
- `new array[n]` para crear un array de tamaño n
- `array[i]` para acceder, `length(array)` para el tamaño
- `null` para nulo, `infinito` para ∞
- `swap(array, i, j)` para intercambiar

### Nomenclatura
- **Todo el pseudocodigo siempre en ingles** — funciones, variables, comentarios
- **camelCase** para funciones: `mergeSort`, `findCandidate`, `isPalindrome`
- **snake_case** para variables: `left_half`, `max_weight`, `is_even`
- Para indices de rango siempre usar `low` y `high` (no `inicio`/`fin`)

### Comentarios
- `//` solo para explicar el **POR QUE**, no el que (el codigo ya lo dice)
- `// --- SECCION: descripcion ---` para separar las fases D&C (DIVIDE / CONQUER / COMBINE)
- Los comentarios van **siempre en su propia linea, encima** del codigo al que hacen referencia — **nunca al final de la linea** (los comentarios inline hacen que la linea sea demasiado larga y confunden la lectura)

### Ejemplo de referencia

```
function mergeSort(array)
    if length(array) < 2        // caso base
        return

    mid = length(array) / 2

    // --- DIVIDE ---
    leftHalf = new array[mid]
    for i = 0 to mid - 1
        leftHalf[i] = array[i]

    // --- CONQUER ---
    mergeSort(leftHalf)

    // --- COMBINE ---
    merge(array, leftHalf)
```

## Playground

Todo el codigo de practica en Python va en `playground/`. Los archivos siguen la convencion `snake_case` de Python (ej: `binary_search.py`, `merge_sort.py`). El entorno virtual ya esta configurado — activar con `source playground/bin/activate`.

## Reglas al trabajar en esta carpeta

- **Siempre consultar el contenido oficial** antes de crear o modificar notas. Los PDFs en `contenido/apuntes/` y `contenido/presentaciones/` son la fuente de verdad.
- Los pseudocodigos deben respetar el estilo documentado arriba y ser consistentes con el `Apunte_PrograIII.pdf`.
- Al agregar un nuevo algoritmo, crearlo en la carpeta del paradigma al que pertenece segun el apunte.
