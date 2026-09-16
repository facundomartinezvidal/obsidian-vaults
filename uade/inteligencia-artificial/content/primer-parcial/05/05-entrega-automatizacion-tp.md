---
tipo: entrega
materia: Inteligencia Artificial Aplicada
clase: "05"
fecha: 2026-08-31
actividad: "[[05-actividad-automatizacion-tp.docx]]"
estado: final
---

# Del problema al plan — Entrega clase 05

**Materia:** Inteligencia Artificial Aplicada · **Clase:** 05 (2026-08-31)
**Actividad:** Del problema al plan — identificación de herramientas de IA y no-code para el proyecto de TP
**Integrantes:** `[COMPLETAR: nombres del grupo]`
**Proyecto:** CoPostulante — asistente de postulación a ofertas laborales

---

## 1. Idea del proyecto

**Nombre:** CoPostulante.

**Problema que resuelve.** Postularse bien a una oferta laboral exige adaptar el CV a ese aviso en particular: leer los requisitos, decidir qué habilidades y experiencias mostrar, reescribir el resumen profesional, investigar a la empresa y redactar una carta de presentación puntual. Ese trabajo se hace manualmente y una oferta por vez, por lo que consume entre 30 y 60 minutos por postulación. Como es lento y tedioso, en la práctica ocurre una de dos cosas: se envía un CV genérico, o —aun cuando se intenta adaptarlo— no se termina reflejando lo que la empresa realmente pide. Quedan afuera habilidades o experiencias que la persona sí tiene y que coincidían con el aviso, o no se usan las palabras clave que buscan los filtros automáticos. El resultado es un CV que no muestra la correspondencia real entre el candidato y el puesto, y que por eso cae en el primer filtro (sistema ATS o revisión inicial de Recursos Humanos).

**Usuario objetivo.** Persona en búsqueda activa de empleo que se postula a varias ofertas por semana. En el caso concreto del grupo: estudiantes avanzados y perfiles junior del área de sistemas que aplican a puestos de desarrollo. El usuario carga una sola vez su información profesional —experiencia, proyectos, formación, habilidades y logros— y la reutiliza en cada postulación.

**Cómo se hace hoy, sin el asistente.** El proceso es manual y secuencial: (1) leer el aviso e identificar los requisitos; (2) abrir el CV base y editarlo, reordenando habilidades, reescribiendo el resumen y eligiendo qué experiencia mostrar; (3) buscar la empresa en Google o LinkedIn para conocer su rubro, tamaño y actividad; (4) escribir la carta de presentación desde cero. El tiempo total ronda los 30 a 60 minutos por postulación, con resultados inconsistentes: cuando hay apuro, se saltean pasos y la carta queda genérica o la empresa sin investigar.

**Criterios de éxito (Definition of Done de la v1).** Dado el enlace de una oferta —o su texto pegado— y el perfil ya cargado, el asistente produce en menos de 5 minutos:

- un **CV adaptado** al aviso, que resalta las habilidades y experiencias del perfil que coinciden con lo solicitado;
- una **carta de presentación** personalizada a la empresa y al puesto;
- una **ficha en HTML** con los datos básicos de la empresa (actividad, rubro, tamaño, ubicación) y un resumen de la correspondencia entre el perfil y la oferta.

Se considera exitoso si:

- el material queda utilizable con menos de 10 minutos de retoque por parte del usuario;
- todo el contenido del CV y de la carta proviene del perfil cargado, sin datos inventados;
- cuando la oferta pide algo que el perfil no contiene, el asistente lo señala como *brecha* (gap) en lugar de completarlo por su cuenta.
