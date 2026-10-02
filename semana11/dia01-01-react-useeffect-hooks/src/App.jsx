// useEffect: Sirve para decirle a React que después de mostrar o actualizar un componente, quiero hacer algo.

import { useEffect, useState } from "react"

export default function App() {
  const [count, setCount] = useState(0)

  // console.log('Hola a todos')

  useEffect(() => {
    // Se ejecuta en cada render
    // console.log('El componente apareció')
    console.log('El contador cambió:', count)
  })

  useEffect(() => {
    // Solo se ejecuta al aparecer el componente por primera vez
    console.log('Imprime esto solamente cuando el componente aparezca por primera vez')
  }, [])

  useEffect(() => {
    console.log('Cuando cambia count')
  }, [count])

  return (
    <div className="text-2xl">

      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>+1</button>

    </div>
  )
}
