---
tags:
  - csharp
  - programacion-asincrona
---

# Qué es programación asíncrona

## Qué es

Forma de ejecutar código donde una operación que **tarda** (leer archivo, llamar a una DB, pegarle a una API externa) **no bloquea** el hilo mientras espera — el programa puede seguir haciendo otras cosas, y retoma cuando la operación termina.

Opuesto: programación **síncrona**, donde cada línea espera a que la anterior termine antes de seguir, bloqueando el hilo mientras dura la operación lenta.

## Ejemplo — sync vs async

```csharp
// SÍNCRONO: el hilo queda bloqueado esperando la respuesta de la DB
public Usuario ObtenerUsuario(int id)
{
    var usuario = _dbContext.Usuarios.Find(id);   // hilo esperando, sin hacer nada más
    return usuario;
}

// ASÍNCRONO: el hilo se libera mientras espera, puede atender otro request
public async Task<Usuario> ObtenerUsuarioAsync(int id)
{
    var usuario = await _dbContext.Usuarios.FindAsync(id);   // libera el hilo durante la espera
    return usuario;
}
```

## Para qué sirve — por qué importa en backend

Un servidor atiende **muchos requests al mismo tiempo**, con cantidad limitada de hilos. Si cada operación lenta (DB, red, disco) bloquea un hilo entero mientras espera, el servidor se queda sin hilos libres rápido bajo carga → no puede atender más requests, aunque la CPU esté prácticamente inactiva (solo esperando I/O).

Con código asíncrono, mientras una operación espera (I/O), el hilo queda libre para atender **otro** request — mismo hardware, muchos más requests simultáneos soportados.

## Dónde se usa (I/O-bound)

Operaciones que **esperan algo externo**: queries a base de datos, llamadas HTTP a otras APIs, lectura/escritura de archivos o red. Ahí es donde asincronismo rinde — no ayuda en cálculo puro en CPU (eso es otro tema, paralelismo).

## Resumen

- Async = no bloquear el hilo mientras se espera una operación lenta (I/O)
- Sync = cada operación bloquea hasta terminar
- En backend: crítico para escalar, atender muchos requests con pocos hilos
- Se aplica en operaciones I/O-bound: DB, HTTP, archivos — no en cálculo puro CPU
