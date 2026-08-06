---
tags:
  - csharp
  - programacion-asincrona
---

# Síncrono vs asíncrono — diferencias

Ver también: [[00-que-es-programacion-asincrona]], [[01-task]]

## Comparación

| | Síncrono | Asíncrono |
|---|---|---|
| Ejecución | secuencial, cada línea espera a la anterior | puede "pausar" una operación y seguir con otra cosa mientras espera |
| Hilo durante espera (I/O) | bloqueado, sin hacer nada | liberado, disponible para otro trabajo |
| Palabras clave | ninguna especial | `async`, `await`, `Task`/`Task<T>` |
| Tipo de retorno típico | `T` directo | `Task<T>` |
| Escalabilidad (servidor) | limitada — se queda sin hilos rápido bajo carga | alta — mismo hardware atiende más requests simultáneos |
| Complejidad del código | más simple de leer/seguir | requiere entender `await`, manejo de excepciones en `Task` (ver [[01-task]]) |

## Código lado a lado

```csharp
// SÍNCRONO
public Usuario ObtenerUsuario(int id)
{
    var usuario = _dbContext.Usuarios.Find(id);   // bloquea el hilo hasta que la DB responde
    return usuario;
}

// ASÍNCRONO
public async Task<Usuario> ObtenerUsuarioAsync(int id)
{
    var usuario = await _dbContext.Usuarios.FindAsync(id);   // libera el hilo mientras espera
    return usuario;
}
```

Llamarlos:

```csharp
// sync: bloquea hasta terminar
Usuario u = ObtenerUsuario(5);

// async: no bloquea el hilo mientras espera, pero el código que espera el resultado
// también necesita "esperar" con await
Usuario u = await ObtenerUsuarioAsync(5);
```

## Por qué asíncrono no es "más rápido" en sí

Para **una sola operación**, async no la hace correr más rápido — el trabajo real (la query a la DB) tarda lo mismo. La diferencia está en **qué hace el hilo mientras espera**: en sync, nada (bloqueado); en async, puede atender otro request. El beneficio aparece con **concurrencia** — muchos requests al mismo tiempo — no en una ejecución aislada.

## Cuándo usar cada uno

- **Asíncrono**: casi siempre, para cualquier operación I/O-bound en backend (DB, HTTP, archivos) — es el estándar en ASP.NET Core actual
- **Síncrono**: cálculo puro en CPU sin I/O, o código simple donde no hay ganancia real (ej: scripts cortos, consola simple)

## Convención de nombres

Métodos async terminan en `Async` por convención (`ObtenerUsuarioAsync`) — ayuda a identificar de un vistazo que devuelve `Task`/`Task<T>` y necesita `await`.

## Resumen

- Sync bloquea el hilo durante la espera, async lo libera
- Async no acelera una operación aislada — mejora la capacidad de manejar muchas a la vez
- En backend real: async es el default para I/O (DB, HTTP, archivos)
- Convención: sufijo `Async` en el nombre del método
