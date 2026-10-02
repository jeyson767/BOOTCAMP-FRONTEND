import { useState } from "react"

const Contador = () => {
  // const contador = useState(inicializador)
  // const [valor, funcion] = useState(inicializador)

  const [contador, setContador] = useState(0)

  const increment = () => {
    setContador(contador + 1)
  }

  const decrement = () => {
    setContador(contador - 1)
  }

  return (
    <div className="bg-yellow-400 p-4 m-4">
      <h1 className="text-center text-2xl">Contador</h1>

      <div className="flex gap-4 justify-center">
        <button
          className="bg-blue-400 px-4 py-3 cursor-pointer hover:bg-blue-600"
          onClick={increment}
        >+1</button>
        <span className="bg-slate-400 px-8 py-3 text-2xl font-bold">{contador}</span>
        <button
          className="bg-blue-400 px-4 py-3 cursor-pointer hover:bg-blue-600"
          onClick={decrement}
        >-1</button>
      </div>
    </div>
  )
}

export default Contador