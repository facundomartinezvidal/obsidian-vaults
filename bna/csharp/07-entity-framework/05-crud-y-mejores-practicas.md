---
tags:
  - csharp
  - entity-framework
---

# CRUD con Entity Framework — mejores prácticas

Ver también: [[01-creacion-de-modelos]], [[02-creacion-de-contexto]], [[03-inyeccion-de-contexto]], [[05-programacion-asincrona]]

## Create

```csharp
public async Task<Usuario> CrearUsuario(Usuario usuario)
{
    _dbContext.Usuarios.Add(usuario);
    await _dbContext.SaveChangesAsync();
    return usuario;
}
```

- `Add` marca la entidad como `Added` en el tracker — no toca la DB todavía
- `SaveChangesAsync()` — recién ahí ejecuta el `INSERT`. Sin este llamado, no persiste nada
- Tras `SaveChangesAsync`, EF completa el `Id` autogenerado en el objeto (si es Identity)

## Read

```csharp
// Un registro por PK
Usuario usuario = await _dbContext.Usuarios.FindAsync(id);

// Un registro con filtro custom
Usuario usuario = await _dbContext.Usuarios
    .FirstOrDefaultAsync(u => u.Email == email);

// Lista con filtro
List<Usuario> activos = await _dbContext.Usuarios
    .Where(u => u.Activo)
    .ToListAsync();
```

- `FindAsync` — busca por Primary Key, primero revisa el tracker en memoria antes de ir a la DB (más rápido si ya está cargada)
- `FirstOrDefaultAsync` / `Where` — para cualquier otro filtro, siempre vía LINQ

### Solo lectura — `AsNoTracking()`

```csharp
List<Usuario> usuarios = await _dbContext.Usuarios
    .AsNoTracking()
    .ToListAsync();
```

Si el resultado **no se va a modificar** (ej: listar para mostrar en pantalla), `AsNoTracking()` evita que EF guarde una copia de cada entidad para detectar cambios — menos memoria, más rápido. Buena práctica default para queries de solo lectura.

### Cargar relaciones — `Include`

```csharp
Usuario usuario = await _dbContext.Usuarios
    .Include(u => u.Cuentas)
    .FirstOrDefaultAsync(u => u.Id == id);
```

Sin `Include`, la propiedad de navegación (`Cuentas`) queda vacía/null (a menos que sea `virtual` con lazy loading habilitado, ver [[01-creacion-de-modelos]]). `Include` = eager loading, trae la relación en la misma query (evita N+1).

## Update

```csharp
public async Task ActualizarUsuario(int id, string nuevoNombre)
{
    Usuario usuario = await _dbContext.Usuarios.FindAsync(id);
    if (usuario is null) throw new KeyNotFoundException();

    usuario.Nombre = nuevoNombre;
    await _dbContext.SaveChangesAsync();
}
```

- No hace falta `Update()` explícito si la entidad ya está trackeada (vino de `Find`/`FirstOrDefault` sin `AsNoTracking`) — EF detecta el cambio de propiedad solo y genera el `UPDATE` en `SaveChangesAsync`
- Si la entidad viene "desconectada" (ej: llegó por API, no fue leída de este `DbContext`), hace falta adjuntarla y marcarla modificada:

```csharp
_dbContext.Usuarios.Update(usuario);   // marca todas las propiedades como modificadas
await _dbContext.SaveChangesAsync();
```

## Delete

```csharp
public async Task EliminarUsuario(int id)
{
    Usuario usuario = await _dbContext.Usuarios.FindAsync(id);
    if (usuario is null) throw new KeyNotFoundException();

    _dbContext.Usuarios.Remove(usuario);
    await _dbContext.SaveChangesAsync();
}
```

`Remove` marca la entidad como `Deleted` — el `DELETE` se ejecuta recién en `SaveChangesAsync`.

## Mejores prácticas

- **Async siempre** (`FindAsync`, `ToListAsync`, `SaveChangesAsync`) — no bloquear el thread mientras se espera la DB, ver [[05-programacion-asincrona]]
- **`AsNoTracking()`** en toda query de solo lectura
- **No exponer las entities de EF directo en la API** — mapear a DTOs (ver [[00-dto-y-models|dto-y-models]]). Evita over-posting, referencias circulares al serializar, y desacopla el contrato de API del esquema de DB
- **Repository detrás de interface** en vez de `DbContext` inyectado directo en cada service (ver [[03-inyeccion-de-contexto]]) — más testeable
- **Un solo `SaveChangesAsync()` por operación de negocio**, no uno por cada cambio — agrupa varios `Add`/`Remove`/modificaciones en la misma transacción implícita
- **Validar existencia antes de operar** (`if (entidad is null) ...`) — `Find`/`FirstOrDefault` devuelven `null`, no tiran excepción solos
- **Evitar N+1**: usar `Include` para relaciones que se van a necesitar, en vez de acceder a la navegación dentro de un loop (dispara una query por iteración)
- **No hacer `SaveChanges` dentro de un loop** — acumula los cambios y guardalos una sola vez al final

## Resumen

- Create: `Add` + `SaveChangesAsync`
- Read: `Find`/`FirstOrDefault`/`Where` + `AsNoTracking` si es solo lectura, `Include` para relaciones
- Update: modificar propiedades de una entidad trackeada + `SaveChangesAsync` (o `Update()` si está desconectada)
- Delete: `Remove` + `SaveChangesAsync`
- Buenas prácticas: async end-to-end, `AsNoTracking` en lecturas, DTOs en vez de entities en la API, repository pattern, evitar N+1, un `SaveChanges` por operación
