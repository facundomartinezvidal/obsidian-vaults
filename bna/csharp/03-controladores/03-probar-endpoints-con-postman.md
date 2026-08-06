---
tags:
  - csharp
  - controladores
  - herramientas
---

# Probar endpoints con Postman

Ver también: [[02-metodos-http-en-controller]], [[00-estructura-request-response|estructura-request-response]]

## Qué es

App para armar y mandar requests HTTP a mano (sin frontend) — sirve para probar los endpoints del backend mientras se desarrollan.

## Uso básico

1. Elegir el **método HTTP** (GET, POST, etc — dropdown a la izquierda de la URL)
2. Poner la **URL** del endpoint, ej `http://localhost:5202/api/hello`
3. Click **Send**
4. Abajo aparece la **response**: status code, tiempo, tamaño, y el body

## Mandar datos

- **Query params**: pestaña `Params` — pares key/value, se agregan solos a la URL (`?key=value`)
- **Body** (para POST/PUT/PATCH): pestaña `Body` → `raw` → `JSON` — ahí se escribe el JSON que llega por `[FromBody]`
- **Headers**: pestaña `Headers` — para mandar cosas como `Authorization`

## Leer la response

- Código de color: **verde** (2xx, éxito), **rojo** (4xx/5xx, error) — ver [[01-http|http]] códigos de estado
- Body de la response abajo, en formato `Pretty`/`Raw`/`Preview`

## Por qué sirve

Permite probar el backend de forma aislada, **sin depender de un frontend** ya hecho — se prueba cada endpoint (GET, POST, con distintos params/body) directo.

## Resumen

- Postman = cliente HTTP manual, para testear API sin frontend
- Elegir método + URL + (params/body/headers si hace falta) → Send
- Status code + body de la response confirman si el endpoint anda bien
