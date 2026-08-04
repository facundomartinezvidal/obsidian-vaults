---
materia: Ciencia de Datos
clase: 7
bloque: Aprendizaje supervisado
parcial: 2
tags:
  - resumen-final
  - ciencia-de-datos
  - arboles-de-decision
  - entropia
  - gini
  - id3
  - c45
  - cart
  - overfitting
fuente: content/2-parcial/material/07-arboles-de-decision.pdf
---

# Clase 7 — Árboles de Decisión

## 1. ¿Qué es un Árbol de Decisión?

**Concepto clave:** Un árbol de decisión es un **modelo de aprendizaje supervisado** que predice una **variable objetivo** siguiendo un flujo de **preguntas sencillas**. Cada respuesta acerca a la decisión final.

La analogía didáctica de la clase: un médico ante un paciente con fiebre no diagnostica de inmediato, primero pregunta *¿cuánto tiempo?*, luego *¿dolor de cabeza?* Cada respuesta **reduce las posibilidades** hasta llegar a la conclusión. Ese encadenamiento de preguntas es exactamente lo que hace un árbol: por ejemplo ¿Fiebre? → Sí → ¿Dolor? → Sí → *Gripe*; No → *Resfriado*; y si no hay fiebre → *Descansar*.

> [!tip] Por qué es "la puerta de entrada al ML"
> Es intuitivo (se lee como un diagrama de flujo), no requiere matemática compleja para interpretarlo y es la base de modelos más potentes como Random Forest (clase 8).

---

## 2. Anatomía de un árbol: nodos, ramas y hojas

**Concepto clave:** Todo árbol se compone de tres tipos de elementos.

| Elemento | Qué es | Función |
|---|---|---|
| **Nodo Raíz (Root)** | La **primera pregunta** del árbol | Es el atributo que **mejor separa** los datos según la métrica de impureza |
| **Nodos Internos** | Decisiones intermedias basadas en atributos | Cada nodo divide los datos en **ramas** según los posibles valores |
| **Nodos Hoja (Leaf)** | La **predicción final** | Una clase (clasificación) o un valor numérico (regresión). **No se dividen más** |

Las **ramas** son las conexiones que salen de cada nodo, una por cada valor posible del atributo evaluado.

> [!info] Ejemplo visual de la clase
> Árbol con raíz ¿Cielo? → una rama lleva a ¿Humedad? (que termina en hojas *Jugar = Sí* / *Jugar = No*) y otra a ¿Viento? (hoja *Jugar = Sí*).

---

## 3. Clasificación vs. Regresión

**Concepto clave:** Los árboles predicen **tanto categorías como valores numéricos**; lo que cambia es el tipo de variable objetivo y lo que devuelve la hoja.

| | **Clasificación** | **Regresión** |
|---|---|---|
| Variable objetivo | **Discreta** (categorías) | **Continua** (numérica) |
| Qué devuelve la hoja | La **clase mayoritaria** de los ejemplos que llegan a ella | El **promedio** de los valores de los ejemplos que llegan a ella |
| Ejemplos | ¿Jugar tenis? → Sí/No · Tipo de flor → Setosa/Versicolor/Virginica · ¿Aprobará el examen? → Sí/No | Precio de una casa → $150.000 · Temperatura máxima → 28.5 °C · Tiempo de entrega → 3.2 días |

---

## 4. ¿Cómo elige el árbol la mejor pregunta?

**Concepto clave:** El algoritmo **no adivina**: busca la **pregunta (atributo)** que mejor separe los datos en grupos **más puros** (homogéneos). "Mejor separación" = **menos mezcla de clases** en cada rama resultante.

El proceso tiene tres pasos que se repiten:

1. **Evaluar atributos** — para cada atributo disponible, calcular cuánto mejora la pureza si se usa para dividir.
2. **Elegir el mejor** — seleccionar el atributo con la **mayor Ganancia de Información** (o menor Gini).
3. **Dividir y repetir** — aplicar el mismo proceso **recursivamente** en cada subconjunto hasta que las hojas sean puras.

> [!tip] Enfoque "Divide y Vencerás"
> Este proceso se conoce como **enfoque codicioso (greedy)**: en cada nodo elige la mejor división **local** sin mirar varios pasos adelante. Es simple, rápido y sorprendentemente efectivo en la mayoría de los casos prácticos.

---

## 5. El dataset clásico: ¿Jugar Tenis?

**Concepto clave:** Dataset histórico de **14 días** con atributos climáticos para predecir si se juega tenis. Es el ejemplo didáctico más usado en libros de ML (Russell & Norvig, 2020) y el que la clase usa para todos los cálculos.

- **Atributos:** Cielo, Temperatura, Humedad, Viento.
- **Objetivo:** predecir `¿Jugar?` a partir del clima.
- **Totales:** 14 registros → **9 "Sí"** y **5 "No"**.

Distribución del atributo **Cielo** (clave para el ejemplo): Soleado (2 Sí, 3 No), Nublado (4 Sí, 0 No), Lluvia (3 Sí, 2 No).

---

## 6. Entropía: midiendo el desorden

**Concepto clave:** La **entropía** mide la incertidumbre o "desorden" de un nodo respecto a la variable objetivo.

Fórmula:

`H(S) = − Σ pi · log₂(pi)`

donde `pi` = proporción de la clase `i` en el nodo.

**Escala de interpretación:**

| Valor | Significado |
|---|---|
| **H = 0** | Nodo **puro** (todos los ejemplos son de la misma clase) |
| **H = 1** | **Máximo desorden** (50% / 50%) |

**Cálculo paso a paso sobre el dataset completo (9 Sí, 5 No de 14):**

```
p_Sí = 9/14 = 0.643
p_No = 5/14 = 0.357
H(S) = −(0.643 · log₂ 0.643 + 0.357 · log₂ 0.357)
H(S) ≈ 0.940
```

> [!info] Interpretación
> H(S) ≈ 0.940 no es 0 ni 1: hay **algo de desorden** (moderado), por eso necesitamos dividir el conjunto para reducir esa incertidumbre.

---

## 7. Ganancia de Información

**Concepto clave:** La **Ganancia de Información (IG)** es el criterio que decide **qué atributo va en cada nodo**. Mide cuánta entropía se reduce al dividir por un atributo.

Fórmula:

`IG(S, A) = H(S) − Σ (|Sv| / |S|) · H(Sv)`

Es decir: **Entropía antes − Entropía ponderada después**. Cuanto **mayor** sea la IG, **mejor** es el atributo para dividir.

**Cálculo para el atributo "Cielo"** (3 valores):

| Valor | Distribución | Entropía |
|---|---|---|
| Soleado | 2 Sí, 3 No | H = 0.971 |
| Nublado | 4 Sí, 0 No | H = 0.000 (nodo puro) |
| Lluvia | 3 Sí, 2 No | H = 0.971 |

Entropía ponderada (residual) de Cielo:

```
H_Cielo = (5/14)·0.971 + (4/14)·0 + (5/14)·0.971 = 0.693
IG(Cielo) = 0.940 − 0.693 = 0.247
```

**Comparación de la ganancia de todos los atributos:**

| Atributo | Ganancia |
|---|---|
| **Cielo** | **0.247** |
| Humedad | 0.151 |
| Viento | 0.048 |
| Temperatura | 0.029 |

> [!important] Selección de la raíz
> **Cielo** tiene la **mayor ganancia de información**, por eso se convierte en el **nodo raíz** (la primera pregunta del árbol).

---

## 8. Construcción paso a paso del árbol (algoritmo ID3)

**Concepto clave:** Usando **ID3** (basado en Entropía y Ganancia de Información), el árbol se construye de forma recursiva.

1. **Paso 1 — Entropía del sistema:** medir la incertidumbre total del conjunto → H(S) = 0.940.
2. **Paso 2 — Ganancia por atributo:** elegir el atributo que **más reduce** la entropía (el que más "aclara" la decisión). Ejemplo: IG(Cielo) = 0.247.
3. **Paso 3 — Selección de la raíz:** comparadas las ganancias, **Cielo** gana → nodo raíz.
4. **Paso 4 — Ramificación y repetición:** se dividen los datos según los valores de Cielo y se repite el proceso en cada rama:
   - **Nublado:** todos los ejemplos dicen "Sí" → **hoja final: Sí** (nodo puro, no hace falta seguir).
   - **Soleado:** quedan 5 días con dudas; al evaluar los atributos restantes, la **Humedad** resuelve → Alta → **No**; Normal → **Sí**.
   - **Lluvia:** quedan 5 días; el **Viento** es decisivo → Fuerte → **No**; Débil → **Sí**.

**Reglas extraídas del árbol final:**

1. Si Cielo = **Nublado** → Jugar = **Sí**.
2. Si Cielo = **Soleado** y Humedad = **Normal** → Jugar = **Sí**; si Humedad = **Alta** → **No**.
3. Si Cielo = **Lluvia** y Viento = **Débil** → Jugar = **Sí**; si Viento = **Fuerte** → **No**.

> [!tip] Idea clave del ejemplo
> Un árbol es, en el fondo, un conjunto de reglas **Si-Entonces** legibles que se extraen automáticamente de los datos.

---

## 9. Índice de Gini

**Concepto clave:** El **índice de Gini** es una medida de impureza alternativa a la entropía. Mide la **probabilidad de clasificar mal** un elemento elegido al azar según la distribución de clases del nodo.

Fórmula:

`Gini = 1 − Σ pi²`

**Escala:**

| Valor | Significado |
|---|---|
| **0** | Nodo puro (todos iguales) |
| **0.5** | Máxima impureza (50/50) — rango más estrecho que la entropía |

**Ejemplo numérico (mismo dataset, 9 Sí y 5 No):**

```
p_Sí = 9/14 = 0.643 ; p_No = 5/14 = 0.357
Gini = 1 − (0.643² + 0.357²)
Gini = 1 − (0.413 + 0.127)
Gini ≈ 0.459
```

> [!tip] ¿Por qué usar Gini?
> - **Más rápido** de calcular (no usa logaritmos).
> - Funciona muy bien en la práctica; la diferencia de precisión con la entropía es mínima.
> - Tiende a favorecer divisiones que generan subconjuntos de tamaños más desiguales.
> - **Scikit-learn lo usa por defecto** (`criterion='gini'`).

---

## 10. Entropía vs. Gini

**Concepto clave:** Ambas miden qué tan "limpia" es una división; se diferencian en rango, costo y sesgo.

| Característica | **Entropía** | **Índice de Gini** |
|---|---|---|
| Rango | 0 → 1 | 0 → 0.5 |
| Costo computacional | Mayor (usa logaritmos) | Menor (sin logaritmos) |
| Sensibilidad | Más sensible a cambios en proporciones | Ligeramente sesgada a particiones grandes |
| Uso típico | ID3, C4.5, CART (opción) | CART por defecto, scikit-learn |

> [!important] Conclusión práctica
> En la mayoría de problemas reales la **diferencia de precisión entre ambos criterios es mínima**. Gini es ligeramente más rápido; la entropía a veces produce árboles más balanceados. En scikit-learn se elige con `criterion='gini'` o `'entropy'`.

---

## 11. Algoritmos clásicos: ID3, C4.5 y CART

**Concepto clave:** Los tres algoritmos representan la **evolución histórica** de los árboles de decisión.

### 11.1 ID3 (1986) — el pionero

- **Características:** usa **Ganancia de Información (Entropía)** para seleccionar atributos; construye árboles **multiclase** (más de 2 ramas por nodo); crecimiento codicioso hasta hojas puras.
- **Limitaciones:** solo atributos **categóricos** (no numéricos); no maneja valores **faltantes**; **tendencia al sobreajuste** (crece hasta pureza total, sin poda).

> [!quote] Impacto histórico
> ID3 fue **revolucionario**: demostró que un enfoque codicioso simple podía aprender reglas interpretables de datos ruidosos. Sentó las bases de toda la familia de algoritmos y popularizó la Ganancia de Información en machine learning. Su núcleo —dividir recursivamente por el atributo más informativo— sigue vigente.

### 11.2 C4.5 — la evolución de ID3

- **Atributos continuos:** define **umbrales dinámicos** para variables numéricas (ordena los valores y prueba puntos medios como fronteras). Ejemplo: Edad ≤ 30.5 vs. Edad > 30.5.
- **Poda (Pruning):** reduce el sobreajuste **eliminando ramas** sin valor estadístico; el árbol crece completo y luego se "poda" → mejor generalización.
- **Reglas "Si-Entonces":** convierte el árbol en un conjunto de reglas legibles, más compacto y comprensible que el árbol original.
- Otras mejoras: **peso de atributos** (costos distintos, útil cuando algunas pruebas son más caras, ej. diagnóstico médico). Es uno de los algoritmos **más citados** en la historia del data mining.

### 11.3 CART — Clasificación y Regresión

- **Árboles siempre binarios:** a diferencia de ID3 y C4.5, genera **solo dos ramas** por nodo (sí/no, ≤/>). Simplifica la estructura; para categóricos con muchos valores busca la mejor **partición binaria**.
- **Criterios de división:** clasificación → **Índice de Gini**; regresión → **MSE (Error Cuadrático Medio)** en lugar de entropía. La hoja de regresión devuelve el **promedio** del subconjunto.
- **Conexión con Scikit-learn:** implementa una versión optimizada de CART en `DecisionTreeClassifier` y `DecisionTreeRegressor`. Por defecto `criterion='gini'` (clasificación) y `'squared_error'` (regresión). **No soporta variables categóricas directamente** (requiere codificación numérica).

> [!info] Cuadro comparativo rápido
> | | Métrica | Ramas | Numéricos | Poda |
> |---|---|---|---|---|
> | **ID3** | Ganancia (Entropía) | Multiclase | No | No |
> | **C4.5** | Ratio de ganancia | Multiclase | Sí (umbrales) | Sí |
> | **CART** | Gini / MSE | Binarias | Sí | Sí |

---

## 12. El peligro del sobreajuste (Overfitting)

**Concepto clave:** Un árbol **muy profundo memoriza** el conjunto de entrenamiento en lugar de aprender patrones generales. Funciona perfecto con los datos conocidos, pero **falla con datos nuevos**.

| | **Árbol sin podar (Overfitting)** | **Árbol podado (Generalizable)** |
|---|---|---|
| Estructura | Entropía = 0 en todas las hojas; 1-2 ejemplos por hoja | Se limita la profundidad máxima; mínimo de muestras por hoja |
| Precisión en entrenamiento | **100%** | ~85% |
| Precisión en prueba | **~60%** | **~82%** |
| Qué aprendió | "De memoria" los datos, incluyendo ruido y excepciones | **Patrones generales** que se transfieren a datos nuevos |

> [!warning] La trampa del 100%
> Una precisión perfecta en entrenamiento **no es buena señal**: suele indicar overfitting. Lo que importa es el desempeño en **datos nuevos (prueba)**.

> [!tip] Soluciones al sobreajuste
> `max_depth` (limitar profundidad), `min_samples_leaf` (mínimo de muestras por hoja), `min_samples_split`, y **poda post-entrenamiento (pruning)**.

---

## 13. Ventajas y desventajas de los árboles

**Concepto clave:** Los árboles son interpretables y versátiles, pero inestables y propensos al sobreajuste.

| **Ventajas** | **Desventajas** |
|---|---|
| **Altamente interpretables** — se leen como diagramas de flujo | **Propensos al sobreajuste** — sobre todo si no se podan |
| **Poco preprocesamiento** — no requieren normalización ni escalado | **Inestables** — pequeños cambios en los datos cambian el árbol por completo |
| **Versátiles** — manejan numéricos y categóricos | **Sesgo** — favorecen atributos con muchas categorías |
| **Rápidos** — entrenamiento y predicción eficientes | **Menor precisión** — los métodos de ensamble (Random Forest) suelen superarlos |
| **Selección implícita** — ignoran atributos irrelevantes automáticamente | **Predicciones escalonadas** — en regresión no capturan tendencias suaves |
| | **No aprenden parcialmente** — requieren reentrenamiento completo con datos nuevos |

> [!important] Conexión con la clase 8
> La desventaja "menor precisión / inestabilidad" es justamente lo que motiva **Random Forest** (bagging de muchos árboles): un ensamble que promedia árboles individuales para ganar precisión y estabilidad.

---

## 14. Implementación en Python con Scikit-learn

**Concepto clave:** Scikit-learn implementa una **versión optimizada de CART**; con pocas líneas se entrena y visualiza un árbol.

```python
# Importar librerías
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# Crear y entrenar el modelo
clf = DecisionTreeClassifier(
    criterion='entropy',   # o 'gini'
    max_depth=3,           # evitar sobreajuste
    random_state=42
)
clf.fit(X_train, y_train)

# Visualizar el árbol
plt.figure(figsize=(12, 8))
plot_tree(clf, feature_names=features, class_names=classes, filled=True)
plt.show()
```

> [!tip] Consejos prácticos
> - Usa `max_depth` para controlar la complejidad.
> - `min_samples_leaf=5` evita hojas con muy pocos datos.
> - Prueba ambos criterios (`'gini'` y `'entropy'`) y compara con validación cruzada.
> - `export_text()` genera reglas legibles sin gráficos.
> - Recuerda **codificar variables categóricas a numéricas** antes de entrenar.

---

## Mapa de conceptos de la clase

- **Árbol de decisión** = modelo supervisado que predice siguiendo un flujo de preguntas; hojas = predicción final.
- **Anatomía:** raíz (primera pregunta) → nodos internos (divisiones) → ramas (valores) → hojas (clase mayoritaria o promedio).
- **Clasificación** (variable discreta → clase mayoritaria) vs. **Regresión** (variable continua → promedio).
- **Construcción greedy:** en cada nodo elige la mejor división local por pureza (divide y vencerás).
- **Entropía** `H = −Σ pi·log₂ pi` (rango 0→1; 0 = puro). Dataset tenis: H(S) ≈ 0.940.
- **Ganancia de Información** `IG = H(S) − Σ (|Sv|/|S|)·H(Sv)`; se elige el atributo con mayor IG → Cielo (0.247) es la raíz.
- **Gini** `= 1 − Σ pi²` (rango 0→0.5; más rápido, sin logaritmos; default de scikit-learn). Tenis: Gini ≈ 0.459.
- **Entropía vs. Gini:** diferencia de precisión mínima; Gini más barato, entropía más balanceada.
- **Algoritmos:** ID3 (Ganancia/Entropía, categórico, sin poda) → C4.5 (numéricos con umbrales, poda, reglas) → CART (binario, Gini/MSE, scikit-learn).
- **Overfitting:** árbol profundo memoriza (100% train / ~60% test); solución = poda + `max_depth` / `min_samples_leaf`.
- **Ventajas:** interpretable, poco preproceso, versátil, rápido · **Desventajas:** overfitting, inestable, sesgo, menor precisión que ensambles → antesala de **Random Forest**.
- **Python:** `DecisionTreeClassifier` / `DecisionTreeRegressor` (CART optimizado); controlar complejidad con `max_depth`.
