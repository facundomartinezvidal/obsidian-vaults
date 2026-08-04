---
materia: Ciencia de Datos
tema: 13
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

# Tema 13 — Inteligencia Artificial

## Qué es la inteligencia

Antes de hablar de inteligencia *artificial* conviene precisar qué se entiende por inteligencia, y la clase lo hace desde dos miradas complementarias. La primera, general, es la del diccionario Vox, que la define como la facultad de comprender y la capacidad de saber o aprender, entendida como el conjunto de funciones orientadas al conocimiento: sensación, asociación, memoria, imaginación, entendimiento, razón y conciencia. La segunda, computacional, es la de John McCarthy, pionero de la disciplina, para quien la inteligencia es "la parte computacional de la capacidad de alcanzar objetivos en el mundo real".

Ambas miradas convergen en cuatro componentes que estructuran el concepto:

- **Percepción** — permite observar el entorno.
- **Razonamiento** — procesa la información percibida.
- **Aprendizaje** — adapta y mejora el comportamiento.
- **Acción** — concreta el logro de objetivos.

## Las cuatro perspectivas de la IA

La IA puede estudiarse según el cruce de dos ejes: qué imita el sistema —**pensar** o **actuar**— y contra qué patrón se mide su desempeño —**humanamente**, es decir imitando a la persona, o **racionalmente**, esto es haciendo lo correcto—. De esa combinación surgen los cuatro campos que organizan la disciplina.

| | Humanamente (imita al humano) | Racionalmente (hace lo correcto) |
|---|---|---|
| Piensan | Modelar los procesos cognitivos humanos, apoyándose en la psicología cognitiva y la neurociencia | Razonar de forma correcta y consistente mediante lógica formal |
| Actúan | Comportarse de manera indistinguible de un humano (Prueba de Turing) | Diseñar un agente racional que maximice su desempeño, enfoque dominante en la IA moderna |

Cada campo se reconoce por sus aplicaciones típicas. Los sistemas que *piensan humanamente* buscan simular capacidades como la memoria o la percepción tal como operan en las personas. Los que *actúan humanamente* se materializan en chatbots, robots humanoides y asistentes conversacionales que imitan la conducta humana. Los que *piensan racionalmente* incluyen los demostradores automáticos de teoremas y los motores de inferencia. Por último, los que *actúan racionalmente* abarcan robots autónomos, agentes de planificación y vehículos autónomos. Este último enfoque, el del agente racional, es el que domina la IA moderna, precisamente porque no exige replicar cómo piensa un ser humano, sino únicamente maximizar el desempeño frente a lo que se percibe.

## Actuar humanamente: la Prueba de Turing

Propuesta por Alan Turing en 1950, la prueba ofrece una definición operacional de inteligencia fundada en la incapacidad de distinguir un humano de una máquina: el sistema la supera si un evaluador humano no logra determinar si las respuestas provienen de una persona o de una computadora. Para lograrlo, la máquina necesita cuatro capacidades:

- **Procesamiento de lenguaje natural (NLP)** — para comunicarse.
- **Representación del conocimiento (KR)** — para almacenar lo que sabe.
- **Razonamiento automático** — para extraer conclusiones a partir de ese conocimiento.
- **Aprendizaje automático (ML)** — para adaptarse a situaciones nuevas.

La versión global del test agrega, además, capacidades físicas —visión computacional para percibir y reconocer objetos mediante una cámara, y robótica para manipular objetos y desplazarse—, e incluso contempla que el evaluador pase objetos por una ventana para poner a prueba esas destrezas. En este marco se inscribe la definición clásica de la disciplina, entendida como el campo que estudia la creación de máquinas capaces de realizar funciones que hasta el momento requieren la inteligencia propia de una persona.

## Pensar humanamente: modelar el pensamiento

Para dotar a un programa de la capacidad de pensar es preciso, primero, determinar cómo piensan los humanos, y la clase plantea tres enfoques complementarios para capturarlo:

- **Introspección** — observar conscientemente los propios procesos mentales para registrar los pensamientos internos, un método subjetivo pero valioso.
- **Experimentos psicológicos** — observar a las personas en acción (su comportamiento, tiempos de reacción y patrones de respuesta), aportando evidencia empírica.
- **Simulación cerebral** — de raíz neurocientífica, modela el funcionamiento del cerebro a partir de redes neuronales y procesos biológicos.

Reunida suficiente información, la teoría resultante se expresa en un programa de computadora; si su comportamiento coincide con el humano, ese programa podría operar efectivamente en su lugar. Un ejemplo emblemático es el Blue Brain Project, que busca modelar digitalmente el cerebro de un mamífero a nivel neuronal.

## Pensar racionalmente: lógica y razonamiento formal

Este campo se guía por la ley de pensamiento de Aristóteles, considerada la manera correcta de pensar por describir un proceso de razonamiento irrefutable: la idea es realizar inferencias correctas a partir de hipótesis correctas, garantizando así la validez lógica de las conclusiones. Su expresión canónica es el silogismo, estructura de argumentación que deriva conclusiones correctas de premisas correctas, como en el clásico "Sócrates es un hombre; todos los hombres son mortales; por lo tanto, Sócrates es mortal".

El estudio de estas leyes dio origen a la lógica formal, que se despliega en varias vertientes:

- **Lógica booleana** — opera con valores de verdadero y falso.
- **Lógica de primer orden** — incorpora cuantificadores.
- **Lógica temporal** — razona sobre el tiempo y las secuencias.
- **Lógica difusa** — de base probabilística, admite grados de verdad.

Sobre estos fundamentos se construyen los sistemas expertos, cuyos motores de inferencia aplican reglas del tipo "SI… ENTONCES…" para diagnosticar o recomendar acciones; el caso paradigmático es MYCIN, un sistema de diagnóstico médico que empleaba reglas lógicas para identificar infecciones bacterianas.

## Actuar racionalmente: agentes inteligentes

El enfoque más adoptado por la IA moderna estudia el diseño de agentes inteligentes, entidades que perciben su entorno y actúan para maximizar sus objetivos. Un agente es, en esencia, algo que razona, y lo que lo distingue de un programa convencional son tres atributos: la capacidad de percibir su entorno captando información del mundo exterior, la de adaptarse a los cambios modificando su comportamiento según el contexto, y la de perseguir objetivos diferentes trabajando hacia múltiples metas. Se llama racional al agente que actúa buscando el mejor resultado posible o, cuando opera bajo incertidumbre, el mejor resultado esperado; dicho de otro modo, aquel que maximiza su desempeño esperado a partir de lo que percibe del entorno.

Los agentes conforman una escala de complejidad creciente, desde reactores simples sin memoria hasta sistemas que aprenden y se adaptan:

1. **Agente simple** — reacciona de forma directa al estímulo del momento, sin memoria; por ejemplo, un termostato que percibe la temperatura, la compara con un umbral y activa o desactiva la calefacción.
2. **Agente con estado** — mantiene un modelo interno del mundo y recuerda información más allá del instante presente, lo que lo separa del agente simple; por ejemplo, una aspiradora robot que mapea el entorno, planifica rutas, evita obstáculos y recarga su batería.
3. **Agente basado en objetivos** — busca secuencias de acciones óptimas, como un programa de ajedrez que evalúa millones de jugadas y elige la de mayor probabilidad de victoria.
4. **Agente basado en utilidad** — va más allá de cumplir una meta: optimiza una función de satisfacción entre varias metas posibles, como un asistente virtual que personaliza interacciones, administra el tiempo y aprende las preferencias del usuario para maximizar su satisfacción.
5. **Agente que aprende** — mejora con la experiencia mediante un ciclo de observar, aprender y adaptar, como un sistema de recomendación que refina sus sugerencias a partir del feedback implícito y explícito.