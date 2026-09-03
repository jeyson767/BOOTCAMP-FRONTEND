# Asincronía en JavaScript

Guía práctica para entender cómo JS maneja tareas que tardan (temporizadores, peticiones a APIs, etc.) sin bloquear el resto del programa.

---

## Índice

1. [¿Qué es la asincronía?](#qué-es-la-asincronía)
2. [Callbacks](#callbacks)
3. [Promesas](#promesas)
4. [Async / Await](#async--await)
5. [Manejo de errores](#manejo-de-errores)
6. [¿Qué es una API?](#qué-es-una-api)
7. [HTTP y sus verbos](#http--verbos-http)
8. [Formato JSON](#formato-json-javascript-object-notation)
9. [Status Codes](#status-code)
10. [Fetch: consumiendo una API real](#fetch-consumiendo-una-api-real)
11. [Ejercicios propuestos](#ejercicios-propuestos)

---

## ¿Qué es la asincronía?

JS es **single-thread** (ejecuta una cosa a la vez), pero no se queda "congelado" esperando que algo lento termine. En su lugar, delega esa tarea (a un temporizador, al navegador, a una petición de red) y sigue ejecutando el resto del código. Cuando la tarea lenta termina, su resultado se procesa.

```js
console.log('Empezando mi programa')

setTimeout(() => {
  console.log('Esta línea tardará 2 segundos o 2000ms')
}, 2000) // 2000ms <> 2 seg

console.log('Fin de mi programa')
```

**Orden real de salida:**

```
Empezando mi programa
Fin de mi programa
Esta línea tardará 2 segundos o 2000ms
```

👉 Aunque `setTimeout` está en medio del código, no bloquea las líneas siguientes.

---

## Callbacks

Un **callback** es una función que le pasamos a otra función para que la ejecute cuando termine su trabajo (como el `() => {...}` del `setTimeout`).

```js
function pedirPizza(callback) {
  console.log('Preparando la pizza...')
  setTimeout(() => {
    callback('Pizza lista 🍕')
  }, 1500)
}

pedirPizza((mensaje) => {
  console.log(mensaje)
})
```

**Problema:** cuando encadenas muchos callbacks uno dentro de otro, el código se vuelve difícil de leer. A esto se le conoce como **callback hell**:

```js
pedirPizza((pizza) => {
  cortarPizza(pizza, (rebanadas) => {
    servirPizza(rebanadas, (mensaje) => {
      console.log(mensaje) // 😵 anidamiento excesivo
    })
  })
})
```

Para resolver esto existen las **promesas**.

---

## Promesas

Una **promesa** es un objeto que representa un valor que estará disponible **ahora, más adelante, o nunca** (si algo falla).

Una promesa tiene 3 estados:

| Estado      | Significado                          |
|-------------|---------------------------------------|
| `pending`   | Aún no se resolvió ni rechazó         |
| `fulfilled` | Se resolvió con éxito (`resolve`)     |
| `rejected`  | Falló (`reject`)                      |

```js
const miPromesa = new Promise((resolve, reject) => {
  const exito = true

  setTimeout(() => {
    if (exito) {
      resolve('Todo salió bien ✅')
    } else {
      reject('Algo falló ❌')
    }
  }, 1000)
})

miPromesa
  .then((resultado) => console.log(resultado))
  .catch((error) => console.log(error))
```

- `.then()` se ejecuta si la promesa se cumple.
- `.catch()` se ejecuta si la promesa falla.
- `.finally()` se ejecuta siempre, haya fallado o no.

---

## Async / Await

`async/await` es una forma más **limpia y legible** de trabajar con promesas. Por debajo, sigue siendo una promesa, solo cambia la sintaxis.

```js
function esperar(segundos) {
  return new Promise((resolve) => setTimeout(resolve, segundos * 1000))
}

async function empezarPrograma() {
  console.log('Empezando mi programa')
  await esperar(2)
  console.log('Pasaron 2 segundos')
  console.log('Fin de mi programa')
}

empezarPrograma()
```

**Reglas clave:**

- `await` solo se puede usar **dentro de una función `async`**.
- `await` "pausa" la función (no todo el programa) hasta que la promesa se resuelva.

---

## Manejo de errores

Con `async/await` usamos `try/catch` en vez de `.catch()`:

```js
async function obtenerDatos() {
  try {
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    const datos = await respuesta.json()
    console.log(datos)
  } catch (error) {
    console.log('Ocurrió un error:', error)
  }
}

obtenerDatos()
```

---

## ¿Qué es una API?

Una **API** (Application Programming Interface) es un mensajero: lleva peticiones y trae respuestas.

Nuestra aplicación web **no habla directo con la base de datos**. Siempre habla con una API, y la API es quien habla con el backend / base de datos.

```
Cliente (Frontend) → API → Backend / Base de Datos
```

**Analogía del restaurante:**

```
Cliente → Mesero (API) → Cocina (Backend / Base de Datos)
```

El mesero (API) toma tu pedido, lo lleva a la cocina, y te trae el resultado. Tú nunca entras a la cocina directamente.

---

## HTTP + Verbos HTTP

**HTTP** (Hypertext Transfer Protocol) es el protocolo/idioma que usan las aplicaciones web para comunicarse entre cliente y servidor.

Ejemplos de URLs:

```
http://127.0.0.1:5500
http://localhost:5500
https://youtube.com
```

> 💡 `https` es lo mismo que `http` pero con una capa extra de seguridad (cifrado).

### Verbos HTTP

| Verbo    | Acción                                  | Ejemplo de uso                     |
|----------|-------------------------------------------|-------------------------------------|
| `GET`    | Obtener datos (lectura)                   | Ver la lista de productos           |
| `POST`   | Crear datos                               | Registrar un nuevo usuario          |
| `PUT`    | Actualizar datos (reemplaza todo)         | Editar un perfil completo           |
| `PATCH`  | Actualizar datos de forma parcial/atómica | Cambiar solo el email de un usuario |
| `DELETE` | Eliminar datos                            | Borrar un producto                  |

---

## Formato JSON (JavaScript Object Notation)

JSON es un formato de texto basado en la sintaxis de objetos de JS, usado para **enviar y recibir datos** entre el cliente y una API.

Objeto válido en JS:

```js
{
  nombre: 'Victor',
  edad: 39,
}
```

El mismo dato en formato **JSON**:

```json
{
  "nombre": "Victor",
  "edad": 39,
  "encendido": true,
  "favoritos": [],
  "notas": {}
}
```

**Diferencias clave con un objeto de JS:**

- Las claves (`keys`) siempre van entre comillas dobles `"..."`.
- No se permiten comas al final del último elemento (*trailing comma*).
- No se permiten funciones, `undefined`, ni comentarios dentro de un JSON.

### Convertir entre JS y JSON

```js
JSON.stringify({ name: 'Alonso' }) // Objeto JS → texto JSON: '{"name":"Alonso"}'
JSON.parse('{"name":"Alonso"}')    // Texto JSON → objeto JS: { name: 'Alonso' }
```

📌 Esto lo usarás todo el tiempo cuando trabajes con `fetch` y `localStorage`.

---

## STATUS CODE

Cuando una API responde, siempre incluye un **código de estado** que indica qué pasó con la petición.

🔗 Referencia visual y divertida: https://http.cat/

| Código | Significado         | Categoría              |
|--------|-----------------------|-------------------------|
| `200`  | Todo OK                | Éxito                   |
| `201`  | Recurso creado (POST)  | Éxito                   |
| `400`  | Error del cliente       | Petición mal formada    |
| `401`  | No autenticado           | Falta iniciar sesión    |
| `403`  | Sin permisos             | No tienes acceso        |
| `404`  | El recurso no existe     | No encontrado           |
| `500`  | Error del servidor       | Falla del backend       |

> 💡 Regla rápida: **2xx = éxito**, **4xx = error tuyo (cliente)**, **5xx = error del servidor**.

---

## Fetch: consumiendo una API real

`fetch()` es la función nativa de JS para hacer peticiones HTTP a una API. Devuelve una **promesa**.

### Con `.then()`

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((respuesta) => respuesta.json())
  .then((datos) => console.log(datos))
  .catch((error) => console.log('Error:', error))
```

### Con `async/await` (recomendado, más legible)

```js
async function obtenerPokemon(nombre) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}: no se pudo obtener el pokémon`)
    }

    const datos = await respuesta.json()
    console.log(datos)
  } catch (error) {
    console.log('Ocurrió un error:', error.message)
  }
}

obtenerPokemon('pikachu')
```

### Haciendo un POST

```js
async function crearUsuario() {
  const respuesta = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Victor',
      email: 'victor@example.com',
    }),
  })

  const datos = await respuesta.json()
  console.log(datos)
}

crearUsuario()
```

📌 Nota que `respuesta.ok` es un booleano: `true` si el status está entre 200-299, `false` en cualquier otro caso. Siempre revisa esto antes de asumir que todo salió bien.

---

## Ejercicios propuestos

1. Crea una función `async` que use `fetch` para traer datos de https://pokeapi.co/api/v2/pokemon/charizard y muestre en consola solo el nombre y el peso.
2. Simula una petición lenta con `setTimeout` dentro de una promesa, y consúmela con `async/await` usando `try/catch`.
3. Usa `fetch` para hacer un `GET` a https://jsonplaceholder.typicode.com/posts y muestra cuántos posts trajo la API (`.length`).
4. Provoca un error a propósito (por ejemplo, pidiendo un pokémon que no existe) y maneja el error mostrando un mensaje amigable en consola.
5. Investiga qué es `Promise.all()` y úsalo para pedir 2 pokémon distintos al mismo tiempo.
