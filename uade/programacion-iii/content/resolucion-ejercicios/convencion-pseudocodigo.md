---
tipo: convencion
---

# Convención de pseudocódigo

Todo el pseudocódigo de estas resoluciones sigue el estilo de las presentaciones de la cátedra (ej. `ALGORITMO MOCHILA`, `ALGORITMO CAMBIO`):

- Encabezado: `ALGORITMO NOMBRE`, luego `Entrada:` y `Salida:` con tipo de cada parámetro (`Vector<entero>`, `Vector<Tarea>`, `entero`, `real`, `booleano`).
- Asignación con `←`. Comparación con `=`.
- Bloques: `si <cond> … sino … fin si`, `mientras <cond> … fin mientras`, `para i = 0 hasta n-1 … fin para`.
- Retorno: `devolver <valor>`.
- Comentarios con `//`.
- Todo en español (nombres de funciones, variables y comentarios). Funciones auxiliares en CamelCase: `Ordenar(O)`, `Pivot(S, inicio, fin)`.
- Índices: se usan tanto base 0 (`para i = 0 hasta n-1`) como base 1 (`llamada inicial BuscarPuntoFijo(A, 1, n)`); elegir uno y ser consistente dentro del mismo algoritmo.

> [!warning] Pendiente
> [[divide-y-conquista-01-secuencia-ordenada]] y [[divide-y-conquista-02-potencia-de-dos]] todavía están escritos en un estilo previo (`function` / `return` / camelCase en inglés) y quedan pendientes de adaptar a esta convención.
