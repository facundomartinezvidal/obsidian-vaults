---
tags:
  - csharp
  - manejo-de-errores
---

# Métodos de validación

Ver también: [[00-propuestas-para-manejo-de-errores]], [[08-validaciones-fluentvalidation]]

## Por qué

Muchas validaciones no son de formato de un DTO (eso lo cubre FluentValidation, ver [[08-validaciones-fluentvalidation]]) sino de **reglas de negocio** dentro de un service — chequeos que, si fallan, deben cortar la ejecución tirando una excepción custom (ver [[00-propuestas-para-manejo-de-errores]]). Repetir el `if (...) throw ...` en cada método ensucia la lógica de negocio.

## Guard clauses — cortar temprano

```csharp
public async Task<Usuario> ObtenerUsuario(int id)
{
    var usuario = await _repository.ObtenerPorId(id);
    if (usuario is null) throw new RecursoNoEncontradoException($"Usuario {id} no encontrado");

    return usuario;
}
```

Validar y cortar **al principio** del método, antes de seguir con la lógica — evita anidar la lógica principal dentro de un `if`, y deja claro qué precondiciones tiene que cumplir el método.

## Métodos de validación reutilizables

Cuando la misma validación se repite en varios lugares, se extrae a un método propio:

```csharp
public class UsuarioService
{
    private void ValidarExiste(Usuario usuario, int id)
    {
        if (usuario is null) throw new RecursoNoEncontradoException($"Usuario {id} no encontrado");
    }

    public async Task<Usuario> ObtenerUsuario(int id)
    {
        var usuario = await _repository.ObtenerPorId(id);
        ValidarExiste(usuario, id);
        return usuario;
    }

    public async Task EliminarUsuario(int id)
    {
        var usuario = await _repository.ObtenerPorId(id);
        ValidarExiste(usuario, id);
        await _repository.Eliminar(id);
    }
}
```

## Clase estática de validaciones — `Guard`

Para validaciones genéricas que se repiten en toda la app (no ligadas a una entidad puntual), es común centralizarlas en una clase estática:

```csharp
public static class Guard
{
    public static void ContraNulo(object valor, string nombreParametro)
    {
        if (valor is null) throw new ArgumentNullException(nombreParametro);
    }

    public static void ContraVacio(string valor, string nombreParametro)
    {
        if (string.IsNullOrWhiteSpace(valor))
            throw new ArgumentException("No puede estar vacío", nombreParametro);
    }

    public static void ContraNegativo(decimal valor, string nombreParametro)
    {
        if (valor < 0) throw new ArgumentException("No puede ser negativo", nombreParametro);
    }
}
```

```csharp
public void Transferir(decimal monto, string cuentaDestino)
{
    Guard.ContraNegativo(monto, nameof(monto));
    Guard.ContraVacio(cuentaDestino, nameof(cuentaDestino));

    // lógica de negocio, ya con los datos validados
}
```

`nameof(...)` — pasa el nombre del parámetro sin hardcodear el string, se actualiza solo si se renombra la variable.

## Validaciones nativas de .NET

.NET trae helpers ya armados para los casos más comunes (equivalentes a `Guard`, sin escribirlos a mano):

```csharp
ArgumentNullException.ThrowIfNull(usuario);
ArgumentException.ThrowIfNullOrWhiteSpace(nombre);
ArgumentOutOfRangeException.ThrowIfNegative(monto);
```

Disponibles desde .NET 6/7+ — mismo propósito que una clase `Guard` custom, sin mantenerla.

## Validación de reglas de negocio complejas

Cuando la regla no es un simple null-check sino lógica de dominio (ej: "no se puede transferir más saldo del disponible"):

```csharp
public void ValidarSaldoSuficiente(Cuenta cuenta, decimal monto)
{
    if (cuenta.Saldo < monto)
        throw new ReglaDeNegocioException("Saldo insuficiente para la operación");
}
```

Estas quedan como métodos propios del service/dominio — no tiene sentido generalizarlas en un `Guard` genérico, porque dependen del modelo de negocio específico.

## Resumen

- Guard clauses: validar y cortar (`throw`) al principio del método, antes de la lógica principal
- Validaciones repetidas → método propio dentro del service, o clase `Guard` estática para las genéricas de toda la app
- .NET trae helpers nativos (`ArgumentNullException.ThrowIfNull`, etc) que cubren los casos más comunes sin escribir una clase `Guard` propia
- Reglas de negocio complejas quedan como métodos de validación específicos del dominio, no generalizables
