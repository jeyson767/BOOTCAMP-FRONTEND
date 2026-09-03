// console.log('Hola JS!')

// TIPOS DE DATOS PRIMITIVOS (Number, String, Boolean, null, undefined, BigInt, Symbol)

// TIPOS DE DATOS NO PRIMITIVOS Arrays(Arreglos), Objects(Objetos), Function, etc

// ARRAYS

// Un arreglo puede contener elementos de cualquier tipo: cadena, números, booleans, null, arrays, objetos, etc)

// DECLARACIÓN

const arregloVacio = []
const listaDeNumeros = [25, 36, 89, -99, 15.60]
const listaDeValores = [1, 2, 3, 'Victor', 'Villazón', 'Código', true, null, undefined]

console.log(arregloVacio)
console.log(listaDeNumeros)
console.log(listaDeValores)

// Lectura de los elementos de un arreglo

console.log(listaDeValores[0]) // 1
console.log(listaDeValores[3]) // Victor
console.log(listaDeValores[3] + ' ' + listaDeValores[4]) // VictorVillazón
console.log(listaDeValores[5]) // Código
console.log(listaDeValores[99]) // undefined

// Escritura en un arreglo

listaDeValores[3] = 'Jhoel'
listaDeValores[7] = 1689

console.log(listaDeValores)

Object.freeze(listaDeValores)
listaDeValores[8] = 'Hola a todos'
console.log(listaDeValores)

// Insertar nuevos elementos en un arreglo al final (push)

const listaDeNombres = ['Daril', 'Jhoel']

console.log(listaDeNombres)

listaDeNombres.push('Victor')
listaDeNombres.push('Carlos')

console.log(listaDeNombres)

// Remover elementos del final de un arreglo (pop)

listaDeNombres.pop()
listaDeNombres.pop()

console.log(listaDeNombres)

// Insertar un elemento en una posición determinada

listaDeNombres.splice(0, 0, 'CÓDIGO')
listaDeNombres.splice(2, 0, 'TECSUP')

console.log(listaDeNombres)

// Eliminar un elemento en un posición determinada

listaDeNombres.splice(2, 1)

console.log(listaDeNombres)

// Obtener el tamaño de nuestro arreglo

console.log(listaDeNombres.length) // 3
console.log('bienvenido'.length) // 10

// Obtener el último elemento del arreglo

console.log(listaDeNombres[3 - 1]) // Jhoel
console.log(listaDeNombres[listaDeNombres.length - 1]) // Jhoel
console.log(listaDeNombres.at(0)) // CÓDIGO
console.log(listaDeNombres.at(-1)) // Jhoel
console.log(listaDeNombres.at(-2)) // Daril

// TODO: Otras funciones - slice (Investiguen)

// MÉTODOS DE ARREGLOS (INCLUDES, FILTER, MAP, SORT, FOREACH, REDUCE)

// Método INCLUDES, nos indica si el valor que se pasa como parámetro se encuentra en el arreglo y siempre devuelve un boolean(true o false)

const lenguajes = ['javascript', 'php', 'python', 'C', 'c++', 'java', 'python']

console.log(lenguajes.includes('java')) // true
console.log(lenguajes.includes('cobol')) // false

// Método FILTER, nos ayuda a ubicar un elemento dentro de un arreglo usando una condición y devuelve un nuevo arreglo con lo que encontró.

const resultado = lenguajes.filter(function (item) {
  // return item === 'java'
  // return item === 'python'
  // return item.includes('c') || item.includes('C')
  return item.toLowerCase().includes('c')
})

console.log(resultado)

// Método MAP, evalue un arreglo, lo modifica y hay que pasarle una función. Nos devuelve un arreglo modificado. Siempre devuelve un nuevo arreglo.

console.log(lenguajes)

const nombreConTituloEspecial = lenguajes.map(function(lenguaje) {
  // Lógica para evaluar y modificar el arreglo
  // return 'hola'
  return '*' + lenguaje + '*'
})

console.log(nombreConTituloEspecial)

// Método SORT, nos ayuda a ordenar un arreglo de elementos. Muta(cambia) el arreglo original. User toSorted() en lugar de sort como recomendación.

// const ordenandoLenguajes = lenguajes.sort() // Sort muta(cambia) el arreglo original
const ordenandoLenguajes = lenguajes.toSorted()

console.log(ordenandoLenguajes)
console.log(lenguajes)

// Método FOREACH, nos ayuda a recorrer un arreglo sin tener ningpun retorno de datos

for (let index = 0; index < 10; index++) {
  console.log(index)  
}

const miArreglo = []

lenguajes.forEach(function(lenguaje) {
  console.log('#', lenguaje)
  miArreglo.push('El mejor: ' + lenguaje)
})

console.log(miArreglo)

// Método REDUCE, nos ayuda a acumular(sumar) los valores de un arreglo

const numeros = [3, 40, 102, 7, 50] // 202

// Con un FOR

let sumatoria = 0 // Acumulador

for (let i = 0; i < numeros.length; i++) {
  sumatoria = sumatoria + numeros[i]
}

console.log(sumatoria)

const sumatoriaConReduce = numeros.reduce(function(acumulador, valorActual) {
  return acumulador + valorActual
}, 0)

console.log(sumatoriaConReduce) // 202

// OBJETOS, una forma de guardar información en pares de clave: valor

// Un objeto sirve para agrupar datos relacionados en un solo lugar

/*
  {
    KEY: VALUE,
    KEY2, VALUE2,
    KEY3, VALUE3
  }
*/

const miObjetoVacio = {}

console.log(miObjetoVacio)

const persona = {
  nombre: 'Daril',
  edad: 28,
  esProgramador: true,
  "mi color favorito": 'azúl',
  coloresFavoritos: ['rosado', 'rojo', 'verde']
}

const persona2 = {
  nombre: "Victor",
  edad: 40,
  esProgramador: false
}

// Leer los campos de un objeto (notación de punto y de corchete)

console.log(persona.nombre) // Daril
console.log(persona.edad) // 28
console.log(persona2.edad) // 40
console.log(persona.estadoCivil) // undefined
console.log(persona.coloresFavoritos) // ['rosado', 'rojo', 'verde']
console.log(persona.coloresFavoritos[0]) // rosado
console.log(persona["mi color favorito"]) // azúl

// Eliminar las propiedades de un objeto

delete persona2.edad
persona2.esProgramador = undefined

console.log(persona2) // {nombre: 'Victor', esProgramador: false}

// INsertar una nueva propiedad a un objeto

persona.platilloFavorito = 'Ceviche de conchas negras'
persona['juegos favoritos'] = ['Crash Team Racing', 'Mario', 'Minecraft']

console.log(persona)