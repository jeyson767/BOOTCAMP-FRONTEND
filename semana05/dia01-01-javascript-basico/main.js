// La siguiente línea imprime en la consola del navegador el texrto ¡Hola Javascript!

console.log('¡Hola Javascript!')

// 1. COMENTARIOS, Javascript ignora estas líneas y sirve para explicar el código

// Esto es un comentario de una línea

/*
  Esto es un comentario
  de
  varias
  líneas
*/

// 2. TIPOS DE DATOS

// Primitivos básicos:

// 2.1. Number (números)

// Ejemplos: 123, 34.89, -67, 0

console.log(20)
console.log(typeof 20) // number
console.log(123)
console.log(typeof 123) // number
console.log(34.89)
console.log(typeof 34.89) // number
console.log(-67)
console.log(typeof -67) // number
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_SAFE_INTEGER)

// 2.2. String (Texto)

console.log("Victor")
console.log(typeof "Victor") // string
console.log('Villazón')
console.log(typeof 'Villazón') // string

// 2.3. Boolean (verdadero o falso)

console.log(true)
console.log(false)

// 2.4. undefined, no tiene valor aún

let x // Estoy declarando una variable
console.log(x)

// 2.5. null, intencionalmente está vacío

let nombre = null
console.log(nombre)

// Ejercicio, verificar que tipo de datos devuelven las siguiente líneas

console.log(typeof 10) // number
console.log(typeof "hola") // string
console.log(typeof true) // boolean
console.log(typeof undefined) // undefined
console.log(typeof null) // object 🙄 ❓ <- Este un error(bug) de JS

// 3. Variables ( Guardar datos )

// const (valores que no cambian durante la ejecución del programa)

const pi = 3.141599

console.log(pi)

// pi = 4.98888 // ❌ <- Uncaught TypeError: Assignment to constant variable.

// let ( pueden vambiar los valores durante la ejecución del programa)

let edad = 20

console.log(edad)

edad = 25

console.log(edad)

// 4. Operadores matemáticos

console.log(1 + 3)
console.log(6 - 5)
console.log(2 * 8)
console.log(2 / 8)
console.log(10 / 2)
console.log(7 % 2) // Residuo
console.log(3 ** 2) // Exponente
console.log(Math.pow(3, 2)) // Exponente

// Ejercicio: Dadas dos variables, a con valor 10 y b con valor 3. Realiza una operación que permita obtener el residuo de la división entre a y b. Luego muestra el resultado en consola.

const a = 10
const b = 3

const residuo = a % b

console.log(residuo) // 1

// 5. Comparaciones

// Igualad débil ==

console.log(1 == "1") // true (solo campara sus valores)

// Igualdad estricta === (RECOMENDACIÓN: Usar siempre)

console.log(1 === "1") // false (compara el valor y el tipo de dato)

// 6. Operadores lógicos (AND, OR, NEGACIÓN)

console.log(true && false) // false
console.log(true || false) // true
console.log(!true) // false

// EJERCICIOS

// 1. Definir las variables para hallar el área de un triángulo. Base = 10, Altura = 5. Imprimir el resultado en la consola.

// 7. Concatenación (unir textos)

let nombre2 = "Victor"
let edad2 = 39

console.log("Hola" + nombre2) // HolaVictor
console.log("Hola " + nombre2) // Hola Victor
console.log("Hola " + nombre2 + ", tienes " + edad2 + " años.") // Hola Victor, tienes 39 años.
// Mejor forma de concatenar (template strings) - backtick (alt gr + })
console.log(`Hola ${nombre2}, tienes ${edad2} años.`) // Hola Victor, tienes 39 años.

// 8. Condicionales (if)

let numero = 4

if (numero % 2 === 0) { // Si es verdadera la condición se ejecuta el bloque entre las llaves
  console.log('Es par')
}

let nota = 18

if (nota >= 13) {
  console.log('Aprobado')
} else {
  console.log('Desaprobado')
}

let heroe = 'Spiderman'

if (heroe === 'Batman') {
  console.log('Hola soy Bruce')
} else if (heroe === 'Spiderman') {
  console.log('Hola soy Peter')
} else if (heroe === 'Ironman') {
  console.log('Hola soy Tony')
} else {
  console.log('No soy un heroe 😀')
}

// TODO: Investiguen la estructura switch

// 9. ESTRUCTURAS REPETITIVAS (FOR, WHILE, DO WHILE)

// for (Sirve para repetir una o varias instrucciones)

// Ejercicio: imprimir en consola los números del 0 al 9

// console.log(0)
// console.log(1)
// console.log(2)
// console.log(3)
// console.log(4)
// console.log(5)
// console.log(6)
// console.log(7)
// console.log(8)
// console.log(9)

for (let i = 0; i < 10; i++) {
  console.log(i)
}

// while

let j = 0

while (j < 10) {
  console.log('while', j)
  
  j++
}

// do while

// TODO: investiguen la diferencia con while

// EJERCICIOS

// 2. Dado un número, mostrar "par y mayor a 10", "par y menor o igual a 10", "Impar"

// 3. Dado un número entero, escribe un programa que:
// - Muestre "fizzbuzz" si el número es divisible entre 3 y 5.
// - Muestre "fizz" si el número es divisible solo entre 3.
// - Muestre "buzz" si el número es divisible solo entre 5.
// - En cualquier otro caso, debe mostrar el mismo número.

// 10. Función

// Una función es un bloque de código reutilizable que hace una tarea

// ENTRADA -> [LÓGICA] -> SALIDA CON EL RESULTADO

// Función básica

function saludar() {
  console.log('Hola funciones!')
}

saludar() // Ejecutar la función
saludar() // Ejecutar la función
saludar() // Ejecutar la función

// Funciones con parámetros

function saludoConNombre(nombre) {
  console.log('Hola ' + nombre)
}

saludoConNombre('Victor')
saludoConNombre()

// Funciones que retornan valores

function sumar(a, b) {
  const suma = a + b

  return suma // Dvuelve solo el resultado de lo que se opere
}

console.log(sumar(2, 3))


function esPar(numero) {
  return numero % 2 === 0  // Boolean
}

console.log(esPar(4)) // true
console.log(esPar(7)) // false

// Ejercicios

// 1. Crear una función que reciba un número y devuelva el doble de ese número por consola
// 2. Crear una función que reciba dos números y devuelva el mayor por consola
// 3. Reutilizar el ejercicio de fizzBuzz usando funciones de tal forma que puedan llamarlo de la siguiente manera. Ej. fizzBuzz(15) -> fizzbuzz

function doble(numero) {
  return numero * 2
}

console.log(doble(8))
console.log(doble(3))

// 11. Cadena de texto

// Propiedad .length

console.log("Hola".length) // 4

// Acceder a caracteres, cada letra tiene una posición (empieza con 0)

let miNombre = 'Victor'

console.log(miNombre[0]) // V
console.log(miNombre[1]) // i
console.log(miNombre[2]) // c

// Métodos importantes de las cadenas de texto

console.log(miNombre.toLowerCase()) // victor
console.log(miNombre.toUpperCase()) // VICTOR
console.log(miNombre.includes('ct')) // true

// EJERCICIOS:

// 1. Dado un string, crear una función llamada evaluarTexto que devuelva: "Largo" si tiene más de 10 caracteres y "Corto" si tiene 10 o menos.
// 2. Dado un string, crear una función llamada invertirTexto que devuelve el texto invertido. Ej. hola -> aloh
