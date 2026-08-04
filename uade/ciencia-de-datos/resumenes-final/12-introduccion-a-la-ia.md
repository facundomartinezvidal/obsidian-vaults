---
materia: Ciencia de Datos
clase: 12
bloque: Introducción a la IA
parcial: 2
tags:
  - resumen-final
  - ciencia-de-datos
  - inteligencia-artificial
  - machine-learning
  - deep-learning
fuente: content/2-parcial/material/12-introduccion-a-la-ia.pdf
---

# Clase 12 — Introducción a la Inteligencia Artificial

## 1. ¿Qué es la inteligencia?

**Concepto clave:** Antes de definir inteligencia *artificial* hay que definir **inteligencia**. La clase parte de dos miradas complementarias: una **general** (diccionario) y una **computacional** (McCarthy).

> [!quote] Diccionario Vox
> **Facultad de comprender**, capacidad mayor o menor de saber o aprender. Conjunto de todas las funciones que tienen por objeto el conocimiento (**sensación, asociación, memoria, imaginación, entendimiento, razón, conciencia**).

> [!quote] Perspectiva computacional (John McCarthy, pionero de la IA)
> "Es la **parte computacional** de la capacidad de alcanzar objetivos en el mundo real."

**Componentes clave de la inteligencia (según la clase):**

| Componente | Qué es |
|---|---|
| **Percepción** | Capacidad de observar el entorno |
| **Razonamiento** | Capacidad de procesar información |
| **Aprendizaje** | Proceso de adaptarse y mejorar |
| **Acción** | Alcanzar objetivos |

---

## 2. Las cuatro perspectivas de la IA

**Concepto clave:** La IA se estudia según **dos ejes** que se cruzan: qué imita el sistema (**pensar** vs. **actuar**) y contra qué patrón se mide (**humanamente** vs. **racionalmente**). De ese cruce salen los **cuatro campos** de la IA.

| | **Humanamente** (imita al humano) | **Racionalmente** (hace lo correcto) |
|---|---|---|
| **Piensan** | **Piensan humanamente** — modelar procesos cognitivos humanos; se apoya en psicología cognitiva y neurociencia | **Piensan racionalmente** — lógica formal: razonar de manera correcta y consistente |
| **Actúan** | **Actúan humanamente** — comportarse de manera indistinguible de un humano (Prueba de Turing) | **Actúan racionalmente** — enfoque **más adoptado en la IA moderna**: el agente racional |

**Ejemplos de cada campo (de la clase):**
- **Piensan humanamente** → modelos que simulan memoria humana o percepción.
- **Actúan humanamente** → chatbots, robots humanoides, asistentes conversacionales.
- **Piensan racionalmente** → sistemas de demostración automática de teoremas, motores de inferencia.
- **Actúan racionalmente** → robots autónomos, agentes de planificación, vehículos autónomos.

> [!tip] Concepto para el parcial
> El eje **pensar / actuar** y el eje **humano / racional** definen los 4 campos. El enfoque que domina la **IA moderna** es **actuar racionalmente** (el **agente racional**), porque no requiere replicar cómo piensa un humano, solo maximizar el desempeño.

---

## 3. La Prueba de Turing (actuar humanamente)

**Concepto clave:** Propuesta por **Alan Turing en 1950**, busca una **definición operacional** de inteligencia basada en la **incapacidad de diferenciar** un humano de una máquina. La máquina **supera** la prueba si un evaluador humano **no puede distinguir** si las respuestas provienen de una persona o de una computadora.

**Capacidades que la máquina necesita para superarla:**

| Sigla | Capacidad |
|---|---|
| **NLP** | Procesamiento de lenguaje natural |
| **KR** | Representación de conocimiento |
| **Razonamiento** | Razonamiento automático (*automated reasoning*) |
| **ML** | Machine learning (aprendizaje) |

> [!note] Prueba Global de Turing
> La versión **global** agrega capacidades **físicas** al test: **Visión Computacional** (percibir y reconocer objetos a través de una cámara) y **Robótica** (manipulación física de objetos y movimiento). Incluye la posibilidad de que el evaluador **pase objetos por una ventana** para probar esas capacidades físicas.

> [!quote] Definición clásica de IA
> "La IA es el campo que estudia la creación de **máquinas que realicen funciones que hasta el momento requieren la inteligencia que tiene una persona**."

---

## 4. Modelando el pensamiento humano (pensar humanamente)

**Concepto clave:** Para darle a un programa la capacidad de **pensar**, primero hay que determinar **cómo piensan los humanos**. La clase plantea **tres enfoques** para capturar el pensamiento humano.

| Enfoque | Qué hace | Rasgo |
|---|---|---|
| **Introspección** | Capturar los **propios pensamientos** observando conscientemente los procesos mentales internos | Método subjetivo pero valioso |
| **Experimentos psicológicos** | **Observar a las personas** en acción: comportamiento, tiempos de reacción, patrones de respuesta | Basado en evidencia empírica |
| **Simulación cerebral** | Simular el **funcionamiento del cerebro**, modelando redes neuronales y procesos biológicos | Aproximación neurocientífica |

> [!note] Proceso de validación
> Una vez que se tiene información suficiente, se **expresa la teoría en un programa de computadora**. Si el programa **coincide con el comportamiento humano**, podría operar efectivamente en su lugar. **Ejemplo:** el **Blue Brain Project**, que busca modelar digitalmente el cerebro de un mamífero a nivel neuronal.

---

## 5. Lógica y razonamiento formal (pensar racionalmente)

**Concepto clave:** Este campo se guía por la **ley de pensamiento de Aristóteles**, considerada la "manera correcta de pensar": un proceso de razonamiento **irrefutable**. La idea central es realizar **inferencias correctas a partir de hipótesis correctas**, asegurando la **validez lógica** de las conclusiones.

> [!example] Silogismo
> Los **silogismos** son estructuras de argumentación que llegan a conclusiones correctas partiendo de premisas correctas:
> > "Sócrates es un hombre;
> > todos los hombres son mortales;
> > ∴ Sócrates es mortal."
>
> El estudio de estas leyes dio origen a la **lógica formal**.

**Tipos de lógica (de la clase):**

| Tipo | Idea |
|---|---|
| **Lógica Booleana** | Verdadero / Falso |
| **Lógica de Primer Orden** | Cuantificadores |
| **Lógica Temporal** | Tiempo y secuencias |
| **Lógica Difusa** | Teoría probabilística (grados de verdad) |

> [!info] Aplicación: Sistemas Expertos
> Los **motores de inferencia** aplican reglas lógicas **"SI… ENTONCES…"** para diagnosticar o recomendar acciones. Ejemplo clásico: **MYCIN**, sistema de diagnóstico médico que usaba reglas lógicas para identificar infecciones bacterianas.

---

## 6. Agentes inteligentes (actuar racionalmente)

**Concepto clave:** Es el **enfoque más adoptado en la IA moderna**. Estudia el diseño de **agentes inteligentes**: entidades que **perciben su entorno** y **actúan para maximizar sus objetivos**.

**Un agente es algo que razona.** Sus atributos, que lo diferencian de un programa convencional:
- **Percibir su entorno** — captar información del mundo exterior.
- **Adaptarse a los cambios** — modificar su comportamiento según el contexto.
- **Alcanzar objetivos diferentes** — trabajar hacia múltiples metas.

> [!important] Qué es un agente racional
> Un **agente racional** es aquel que actúa para alcanzar:
> - **El mejor resultado** → maximización de objetivos.
> - **El mejor resultado esperado** → bajo **incertidumbre**.
>
> En síntesis: **maximiza su desempeño esperado** dado lo que percibe del entorno.

---

## 7. Tipos de agentes (ejemplos prácticos)

**Concepto clave:** Los agentes forman una **escala de complejidad creciente**: van desde simples reactores sin memoria hasta sistemas que **aprenden y se adaptan**, siempre buscando maximizar su desempeño.

| Tipo de agente | Ejemplo | Propiedad distintiva |
|---|---|---|
| **Agente Simple** | Termostato (percibe temperatura, compara con umbral, activa/desactiva calefacción) | Reacción directa, **sin memoria** |
| **Agente con Estado** | Aspiradora robot (mapea el entorno, planifica rutas, evita obstáculos, recarga batería) | Mantiene un **modelo interno del mundo** |
| **Agente Basado en Objetivos** | Programa de ajedrez (evalúa millones de jugadas, elige la de mayor probabilidad de victoria) | Busca **secuencias de acciones óptimas** |
| **Agente Basado en Utilidad** | Asistente virtual inteligente (maximiza la satisfacción del usuario según múltiples factores) | Optimiza tiempo, personaliza interacciones, aprende preferencias |
| **Agente que Aprende** | Sistema de recomendación (mejora sus sugerencias con feedback implícito y explícito) | **Ciclo Observar → Aprender → Adaptar** |

> [!tip] Concepto para el parcial
> La diferencia entre **agente simple** y **agente con estado** es la **memoria / modelo interno**: el simple reacciona al estímulo del momento; el de estado recuerda el mundo. El **basado en utilidad** no solo cumple la meta, sino que **maximiza una función de satisfacción** entre varias metas posibles.

---

## Mapa de conceptos de la clase

- **Inteligencia** = facultad de comprender (Vox) / parte computacional de alcanzar objetivos en el mundo real (McCarthy). Componentes: **percepción, razonamiento, aprendizaje, acción**.
- **Cuatro campos de la IA** = cruce de dos ejes: **pensar/actuar** × **humanamente/racionalmente**.
  - **Actuar humanamente** → Prueba de Turing.
  - **Pensar humanamente** → modelar el pensamiento humano.
  - **Pensar racionalmente** → lógica formal.
  - **Actuar racionalmente** → agente racional (**el más usado en la IA moderna**).
- **Prueba de Turing** (Turing, 1950) = el evaluador no distingue humano de máquina. Requiere **NLP, KR, razonamiento, ML** (+ visión y robótica en la versión global).
- **Pensar humanamente** = introspección, experimentos psicológicos, simulación cerebral (ej. Blue Brain Project).
- **Pensar racionalmente** = ley de Aristóteles, silogismos, lógica formal (booleana, primer orden, temporal, difusa) → **sistemas expertos** con reglas SI…ENTONCES (MYCIN).
- **Agente inteligente** = percibe el entorno y actúa para **maximizar objetivos** (mejor resultado / mejor resultado esperado bajo incertidumbre).
- **Tipos de agentes** (complejidad creciente): simple → con estado → basado en objetivos → basado en utilidad → que aprende.
