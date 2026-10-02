import { useState } from "react"

// ANTES DE USAR CUSTOM HOOKS USANDO USESTATE

const Counter = () => {
  const [contador, setContador] = useState(99)

  const decrement = () => setContador(contador - 1)

  const increment = () => setContador(contador + 1)

  return (
    <div className="bg-slate-200 p-4 border">
      <h3 className="text-2xl">Contador</h3>

      <div className="flex gap-2">
        <button className="bg-blue-400 px-3 py-2" onClick={decrement}>-</button>
        <strong className="text-2xl">{contador}</strong>
        <button className="bg-blue-400 px-3 py-2" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default Counter