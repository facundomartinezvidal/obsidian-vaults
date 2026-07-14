---
tags:
  - algoritmos
  - busqueda
aliases:
  - Busqueda Lineal vs Busqueda Binaria
---

# Busqueda Lineal vs Busqueda Binaria

| Aspecto                  | Busqueda Lineal                       | Busqueda Binaria                                                               |
| ------------------------ | ------------------------------------- | ------------------------------------------------------------------------------ |
| **Definicion**           | Revisa cada elemento secuencialmente  | Divide el intervalo de busqueda a la mitad repetidamente en una lista ordenada |
| **Espacio de Busqueda**  | Examina cada elemento secuencialmente | Elimina la mitad del espacio de busqueda                                       |
| **Complejidad Temporal** | $O(n)$                                | $O(\log n)$                                                                    |
| **Requerimiento I/P**    | Listas ordenadas y no ordenadas       | Requiere una lista ordenada                                                    |
| **Mejor Caso**           | $O(1)$                                | $O(1)$                                                                         |
| **Casos de Uso**         | Adecuada para conjuntos pequenos o no ordenados | Conjuntos grandes y ordenados                                         |
| **Tipo de Algoritmo**    | Iterativo                             | Puede ser iterativo o recursivo                                                |
| **Implementacion**       | Simple                                | Mas compleja de implementar                                                    |
| **Eficiencia**           | Menos eficiente para listas grandes   | Mas eficiente para listas grandes                                              |
| **Aplicacion**           | Cuando los datos cambian constantemente | Cuando los datos son relativamente estaticos o se actualizan en lotes         |
| **Uso de Memoria**       | Bajo uso de memoria                   | Bajo uso de memoria (iterativo) / Alto (recursivo)                             |
| **Pre-procesamiento**    | Ninguno                               | Ordenar los datos                                                              |

> [!tip] Cuando usar cada uno
> - Usa **[[busqueda-lineal|Busqueda Lineal]]** cuando la lista es pequena o no esta ordenada.
> - Usa **[[busqueda-binaria|Busqueda Binaria]]** cuando la lista esta ordenada y es grande.
