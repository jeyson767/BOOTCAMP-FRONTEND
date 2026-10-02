// 01 - Componente base usando function

// function App() {
//   return <h1>Hola React.js</h1>
// }

// const App = () => {
//   return <h1>Hola React.js</h1>
// }

// ¿Qué es un componente?
// * Es una función, devuelve JSX, todo componente en su nombre empieza con mayúscula

// Partes de un componente:
// 1. Imports (Si los hay)
// 2. Lógica (variables, hooks, functions)
// 3. Return -> JSX
// 4. Export (Nos sirve para crear un módulo de ES)

// Reglas básicas de un componente:
// * Un solo elemente padre
// * Es recomendable que la función tenga el mismo nombre del archivo. Ej. App.jsx -> App

// 02 - Componente usando múltiples líneas

// function App() {
//   return (
//     <div>
//       <h1>React.js</h1>
//       <p>Estamos aprendiendo sobre componentes.</p>
//     </div>
//   )
// }

// 03 - Componente usando Fragments (<></>)

// function App() {
//   return (
//     <>
//       <h1>React.js</h1>
//       <p>Estamos aprendiendo sobre componentes.</p>
//     </>
//   )
// }

// 04 - Extensiones de VSCODE para usar con React.js
// ES7+ React/Redux/React-Native snippets
// https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

// Snippets para crear componentes (rfc, rafce)

// snippet: rfc

// function App() {
//   return (
//     <div>App</div>
//   )
// }

// snippet: rafce

// const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// 05 - Anidar componentes dentro de otros

// function ComponenteSaludo() {
//   return <h4>Hola a todos!</h4>
// }

// function ComponenteDespedida() {
//   return <h4>Adios a todos!</h4>
// }

// const App = () => {
//   return (
//     <section>
//       <h3>Componentes anidados</h3>

//       <ComponenteSaludo />

//       <ComponenteDespedida />
//     </section>
//   )
// }


// 06 - Importando componentes externos

// import ComponenteSaludo from "./components/ComponenteSaludo"
// import ComponenteDespedida from "./components/ComponenteDespedida.jsx"

// // TODO: Crear el componente ComponenteDespedida en su propio archivo e importarlo en el componente App

// const App = () => {
//   return (
//     <section>
//       <h3>Componenentes externos</h3>

//       <ComponenteSaludo />

//       <ComponenteDespedida />
//     </section>
//   )
// }

// 07 - Usando expresiones con JSX -> "{}"

// import nombreExportado, { frutas, curso } from "./modulo.js"

// const App = () => {
//   // Lógica del componente
//   const suma = 8 + 9
//   const nombre = 'Victor'

//   // Comentario en React.js van dentro del cuerpo de la función
//   /* Otro comentario multilínea dentro del cuerpo de la función */

//   return (
//     <section>
//       <h1>Usando expresiones con jsx</h1>

//       <p>{suma}</p>
//       <p>{1 + 2 * 9 ** 2}</p>
//       <p>{nombre}</p>

//       <p>Hola {nombre}</p>
//       <p>{`Hola ${nombre}`}</p>

//       {/* Comentario en React.js dentro del JSX */}

//       <p>{frutas}</p>
//       <p>{nombreExportado}</p>
//       <p>{JSON.stringify(curso)}</p>
//       <p>{curso.nombre}</p>
//       <p>{curso.nota}</p>
//     </section>
//   )
// }

// export default App

// 09 - Propiedades de un componente (Ahora el componente será reutilizable)

// const BienvenidaPersonalizada = (props) => {
//   return <h3>Hola {props.nombre}, tu edad es {props.edad ?? '0'} años.</h3>
// }

// const App = () => {
//   return (
//     <section>
//       <h4>Propiedades de un componente</h4>

//       <BienvenidaPersonalizada nombre="Victor" edad="40" />
//       <BienvenidaPersonalizada nombre="Sofia" edad="33" />
//       <BienvenidaPersonalizada nombre="Sofia" />
//     </section>
//   )
// }

// export default App

// 10 - Propiedades de un componente (Con destructuring)

const BienvenidaPersonalizada = ({ nombre, edad, color = 'rojo' }) => {
  return <h3>Hola {nombre}, tu edad es {edad ?? '0'} años, y tu color favorito es el {color}</h3>
}

const App = () => {
  return (
    <section>
      <h4>Propiedades de un componente (Con destructuring)</h4>

      <BienvenidaPersonalizada nombre="Victor" edad={40} color="Amarillo" />
      <BienvenidaPersonalizada nombre="Sofia" edad={33} />
      <BienvenidaPersonalizada nombre="Sofia" />
    </section>
  )
}

export default App