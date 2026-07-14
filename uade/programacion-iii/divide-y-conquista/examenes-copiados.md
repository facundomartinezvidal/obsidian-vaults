---
tags:
  - algoritmos
  - divide-and-conquer
  - ejercicios
---

# Examenes Copiados

- Dado un conjunto de $n$ examenes, exactamente un par es copia.
- Se dispone de una funcion `copia(exams, low, high)` que devuelve `true` si hay un par copiado en el grupo, pero no indica cuales son.
- Objetivo: encontrar el par copiado con la menor cantidad de llamadas a `copia`.

> [!important] Idea clave
> Si el par esta en el mismo grupo, `copia` devuelve `true`. Se divide el grupo a la mitad y se recursa sobre la mitad que contiene el par. Si el par esta dividido entre ambas mitades, se subdividen y se comparan subgrupos entre si.

```
function findCopies(exams, low, high)
    // base case: only two exams left, that is the pair
    if low + 1 == high
        return (exams[low], exams[high])

    mid = (low + high) / 2

    // check left half
    if copia(exams, low, mid)
        return findCopies(exams, low, mid)

    // check right half
    if copia(exams, mid + 1, high)
        return findCopies(exams, mid + 1, high)

    // pair is split: one copy in each half
    // subdivide both halves and compare subgroups
    mid1 = (low + mid) / 2
    mid2 = (mid + 1 + high) / 2

    if copia(exams, low, mid1) and copia(exams, mid + 1, mid2)
        return findCopies(exams, low, mid1), findCopies(exams, mid + 1, mid2)
    if copia(exams, low, mid1) and copia(exams, mid2 + 1, high)
        return findCopies(exams, low, mid1), findCopies(exams, mid2 + 1, high)
    if copia(exams, mid1 + 1, mid) and copia(exams, mid + 1, mid2)
        return findCopies(exams, mid1 + 1, mid), findCopies(exams, mid + 1, mid2)
    // else
    return findCopies(exams, mid1 + 1, mid), findCopies(exams, mid2 + 1, high)
```

**Tecnica:** Divide & Conquer.

**Complejidad:** $O(\log n)$ — en cada paso el problema se reduce a la mitad.

**Cantidad de ejecuciones de `copia` con $n = 4096$** ($\log_2 4096 = 12$):

| Caso | Ejecuciones |
| ---- | ----------- |
| Mejor caso | 12 — el par siempre cae en la misma mitad, una llamada por nivel |
| Peor caso | 60 — el par esta dividido en cada nivel, hasta 5 llamadas por nivel |
