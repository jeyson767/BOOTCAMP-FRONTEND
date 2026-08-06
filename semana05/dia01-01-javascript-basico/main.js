// la siguiente linea imprime en la consola del navegador el texto hola javacripct!
console.log('Hola Javascript!')


//1. comentarios, javascript ignora estas lineaas y sirve para explicar el codigo

// esto es un comentario de una linea

/*
Esto es un comentario de varias lineas
*/

//2. tipos de datos

// primitivos basicos:

// 2.1. Number (numeros)

// Ejemplos: 123, 34.89, -67, 0

console.log(20)
console.log(typeof 20)
console.log(123)
console.log(typeof 34.89)
console.log(-57)
console.log(typeof 57)
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_SAFE_INTEGER)

//2.2. string (texto)

console.log("jeyson")
console.log(typeof "jeyson")
console.log('jeyson')
console.log(typeof 'jeyson')

//2.3 boolean (verdadero o falso)

console.log(true)
console.log(false)

//2.4 undefined, no tiene valor aun

let x // estoy declarando una variable
console.log(x)

// 2.5 null intencionalmente esta vacio

let nombre = null
console.log(nombre)

// ejercicio, verificar que tipo de datos devuelve las siguientes lineas

console.log(typeof 10)
console.log(typeof "hola")
console.log(typeof true)
console.log(typeof undefined)
console.log(typeof nulll)

// 3. variables (guardar datos)

const pi = 3.141599
console.log(pi)
// pi = 4.98888
// no se puede reaccinar variables 

//let (pueden cambiar los valores durante la ejecucion del programa)
let edad = 20

console.log(edad)
edad=25
console.log(edad)

//4. operadores matematicos

console.log(1 + 3)
console.log(6 - 5)
console.log(2 * 8)
console.log(2 / 8)
console.log(10 / 2)
console.log(7 % 2) // me da el residuo
console.log(3 ** 2) // potencia

//ejercicio : dados dos variables, a con valor 10 y b con valor 3. realiza una operacion que permita obtener el residuo de la division entre a y b. luego muestra el resultado en consola

const a = 10
const b = 3

const residuo = a % b 
console.log(residuo) // 1

//5. comparaciones

//igualdad debil ==
console.log(1 == "1") // true solo compara sus valores

//igualdad estricta === (recomendacion: usar siempre)
console.log(1 === "1") // false (compara el valor y el tipo de dato)

// 6. operadores logicos (AND, OR , NEGACION)

console.log( true && false) //false
console.log(true || false ) //true
console.log(!true) //false

//ejercicios
//1. Definir las variables para hallar el área de un triángulo. Base = 10, Altura = 5. Imprimir el resultado en la consola.

const base = 10
const altura = 5

const area = (base * altura) / 2

console.log("El área del triangulo es:", area) //25

//7. concatenacion (unir texto)

let nombre2 = "victor"
let edad2 = 39

console.log("Hola " + nombre2 + " tu edad es: " + edad2)

// mejor forma de concatenar (template strings) - backtrick (alt gr + })

console.log(`Hola ${nombre2}, tienes ${edad2} años`) //manera mas facil de concatener

// 8. Condicionales (if)

let numero = 4

if (numero % 2 === 0) { // si es verdadera la condicion se ejecuta el bloque entre las llaves
    console.log('Es par')
}

let nota = 13

if (nota >= 13) {
    console.log('Aprobado')
} else {
    console.log('Desaprobado')
}

let heroe = 'spiderman'

if (heroe === 'batman') {
    console.log('hola soy bruce')
} else if (heroe === 'spiderman') {
    console.log('hola soy peter parker')
} else if (heroe === 'iroman') {
    console.log('hola soy tony')
} else {
    console.log('no soy un heroe 😅')
}

//9. estructuras repetitivas (FOR, WHILE, DO WHILE)

// FOR (SIRVE PARA REPETIR UNA O VARIAS INSTRUCCIONES)

// EJERCICIO: IMPRIMIR EN CONSOLA LOS NUMEROS DEL 0 AL 9

for (let i = 0 ; i < 10; i++) {
    console.log(i)
}

// while

let j = 0

while (j < 10) {
    console.log('while', j)
    //❌loop infinito
    j++
}

// EJERCICIOS

// 2. Dado un número, mostrar "par y mayor a 10", "par y menor o igual a 10", "Impar"

// 3. Dado un número entero, escribe un programa que:
// - Muestre "fizzbuzz" si el número es divisible entre 3 y 5.
// - Muestre "fizz" si el número es divisible solo entre 3.
// - Muestre "buzz" si el número es divisible solo entre 5.
// - En cualquier otro caso, debe mostrar el mismo número.

// EJERCICIO 1
let num = 5
if (num % 2 === 0) {
    if (num > 10) {
        console.log("par y mayor a 10")
    } else {
        console.log("par y menor o igual a 10")
    }
} else {
    console.log("impar")
}

// EJERCICIO 2
let num2 = 15
if (num2 % 3 === 0 && num2 % 5 === 0) {
    console.log("fizzbuzz")
} else if (num2 % 3 === 0) {
    console.log("buzz")
} else {
    console.log(num2)
}

// FUNCION

// UNA FUNCION ES UN BLOQUE DE CODIGO REUTILIZABLE QUE HACE UNA TAREA ESPECIFICA

// ENTRADA -> [LOGICA] -> SALIDA CON EL RESULTADO

// FUNCION BASICA

function saludar() {
    console.log('hola funciones!')
}

saludar() //ejecutar la funcion

function saludarconnombre(nombre) {
    console.log('hola '+ nombre)
}

saludarconnombre('jeyson')
saludarconnombre()

// funciones que retornan valores

function sumar(a, b) {
    const suma = a + b

    return suma
}

console.log(sumar(2, 3))

// ejercicios

function esPar(numero) {
    return numero % 2 === 0
}

console.log(esPar(4)) //true
console.log(esPar(7)) //false


// Ejercicios

// 1. Crear una función que reciba un número y devuelva el doble de ese número por consola
function mostrarDoble(numero) {
    console.log(numero * 2);
}
// Ejemplo de uso:
mostrarDoble(5); // Imprime: 10

// 2. Crear una función que reciba dos números y devuelva el mayor por consola
function mostrarMayor(a, b) {
    if (a > b) {
        console.log(a);
    } else if (b > a) {
        console.log(b);
    } else {
        console.log("Ambos números son iguales:", a);
    }
}

// Ejemplos de uso:
mostrarMayor(8, 15); // Imprime: 15
mostrarMayor(20, 3);  // Imprime: 20

// 3. Reutilizar el ejercicio de fizzBuzz usando funciones de tal forma que puedan llamarlo de la siguiente manera. Ej. fizzBuzz(15) -> fizzbuzz
function fizzBuzz(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        console.log("fizzbuzz");
    } else if (num % 3 === 0) {
        console.log("fizz");
    } else if (num % 5 === 0) {
        console.log("buzz");
    } else {
        console.log(num);
    }
}

// Ejemplos de uso:
fizzBuzz(15); // Imprime: fizzbuzz
fizzBuzz(9);  // Imprime: fizz
fizzBuzz(10); // Imprime: buzz
fizzBuzz(7);  // Imprime: 7

function doble(numero) {
    return numero * 2
}

console.log(doble(8))
console.log(doble(3))

//11. cadena texto
// propiedad .length

let miNombre = 'jeyson'

console.log(miNombre[0]) //j
console.log(miNombre[1]) //e
console.log(miNombre[2]) //y

//metodos importantes de la cadenas de texto
console.log(miNombre.toLowerCase()) //jeyson
console.log(miNombre.toUpperCase()) //JEYSON
console.log(miNombre.includes()) //true

// EJERCICIOS:

// 1. Dado un string, crear una función llamada evaluarTexto que devuelva: "Largo" si tiene más de 10 caracteres y "Corto" si tiene 10 o menos.
function evaluarTexto(texto) {
    if (texto.length > 10) {
        return "Largo";
    } else {
        return "Corto";
    }
}

// Ejemplos de uso:
console.log(evaluarTexto("Desarrollo"));  // 10 caracteres -> "Corto"
console.log(evaluarTexto("Programación")); // 12 caracteres -> "Largo"

// 2. Dado un string, crear una función llamada invertirTexto que devuelve el texto invertido. Ej. hola -> aloh
function invertirTexto(texto) {
    return texto.split('').reverse().join('');
}

// Ejemplos de uso:
console.log(invertirTexto("hola"));     // Imprime: aloh