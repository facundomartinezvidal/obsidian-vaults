---
tipo: indice
---

# Resolución de ejercicios

Resoluciones de la guía de ejercitación (`content/guia-ejercicios.pdf`), un archivo por ejercicio. Cada uno sigue el formato de la cátedra: **a)** estrategia, **b)** pseudocódigo, **c)** complejidad temporal.

- [[convencion-pseudocodigo]]

## Divide y Conquista

| # | Ejercicio | Complejidad |
|---|-----------|-------------|
| 1 | [[01-secuencia-ordenada]] — ¿secuencia ordenada alfabéticamente? | O(n) |
| 2 | [[02-potencia-de-dos]] — aⁿ con n potencia de 2 | O(log n) |
| 3 | [[03-punto-fijo]] — índice k con A[k]=k | O(log n) |
| 4 | [[04-kesimo-menor]] — k-ésimo menor | O(n) prom. / O(n²) peor |

## Greedy

| # | Ejercicio | Complejidad |
|---|-----------|-------------|
| 1 | [[01-planificacion-tareas-plazo-fijo]] — planificación con plazo fijo | O(n²) |
| 2 | [[02-minimizar-tiempo-espera]] — orden de atención de procesos | O(n log n) |
| 3 | [[03-mezclado-de-cintas]] — mezclado óptimo de cintas | O(n log n) |
| 4 | [[04-problema-del-mecanico]] — reparaciones, minimizar tiempo medio de espera | O(n log n) |

## Grafos

| # | Ejercicio | Complejidad |
|---|-----------|-------------|
| 1 | [[01-cuadras-minimas-escuela-gimnasio]] — cuadras mínimas entre escuela y gimnasio (Dijkstra, caja negra) | O(n²) |
| 2 | [[02-camino-minimo-con-escala]] — ciudades alcanzables con escala (Dijkstra) | O(n²) |

## Ejercicios Integradores (clase 07)

Basados en `07-repaso-ejercicios-integradores.pdf`. Acá la técnica no está dada — primero hay que identificarla (ver [[plantilla-ejercicio-integrador]]).

| # | Ejercicio | Técnica | Complejidad |
|---|-----------|---------|-------------|
| 1 | [[01-maximizar-actividades-compatibles]] — máx. actividades compatibles | Greedy | O(n log n) |
| 2 | [[02-posicion-del-pico]] — posición del pico en vector bitónico | Divide y Conquista | O(log n) |
| 6 | [[06-valor-inmediato-inferior]] — valor inmediato inferior a X | Divide y Conquista | O(log n) |
| 5 | [[05-salon-de-convenciones]] — salón de convenciones, actividades sin superponer | Greedy | O(n log n) |
| 7 | [[07-maximizacion-de-archivos]] — maximizar archivos guardados en un disco | Greedy | O(n log n) |
| — | [[plantilla-ejercicio-integrador]] (ejercicio 8, F1 Mónaco, en progreso) | Grafos (Dijkstra) | — |

## Simulacro Primer Parcial

Basados en `content/primer-parcial/simulacro-primer-parcial.pdf`. Igual que los integradores, la técnica no está dada.

| # | Ejercicio | Técnica | Complejidad |
|---|-----------|---------|-------------|
| 1 | [[01-problema-logistica]] — punto de rotación en arreglo | Divide y Conquista | O(log n) |
| 2 | [[02-sistema-de-riego]] — árbol de recubrimiento mínimo, riego entre campos | Grafos (Kruskal) | O(n²) |
| 3 | [[03-carga-de-camiones]] — mochila fraccionaria | Greedy | O(n log n) |
| 4 | [[04-cooperativa-agricola]] — árbol de recubrimiento mínimo, canales de riego (Tema 2) | Grafos (Kruskal) | O(n²) |
| 5 | [[05-transporte-de-logistica]] — mochila fraccionaria (Tema 2) | Greedy | O(n log n) |
