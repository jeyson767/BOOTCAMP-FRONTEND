import { useCounter } from "../hooks/useCounter"

const CounterConCustomHooks = () => {
  const { contador, decrement, increment } = useCounter()

  return (
    <div className="bg-slate-200 p-4 border">
      <h3 className="text-2xl">Contador (Custom hooks)</h3>

      <div className="flex gap-2">
        <button className="bg-blue-400 px-3 py-2" onClick={decrement}>-</button>
        <strong className="text-2xl">{contador}</strong>
        <button className="bg-blue-400 px-3 py-2" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default CounterConCustomHooks