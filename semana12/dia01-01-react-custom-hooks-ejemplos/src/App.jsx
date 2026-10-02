import Counter from "./components/Counter"
import CounterConCustomHooks from "./components/CounterConCustomHooks"

import ProductList from "./components/ProductList"
import ProductListConCustomHooks from "./components/ProductListConCustomHooks"

const App = () => {
  return (
    <main className="m-4">
      <h1 className="text-2xl text-center py-4">Custom hooks</h1>

      <p className="">Es una función de Javascript que reutiliza lógica de React entre diferentes componentes.</p>

      <ul className="list-disc list-inside">
        <li>No es un componente ❌</li>
        <li>No devuelve JSX necesariamente</li>
        <li>Es un función que puede utilizar otros hooks (useState, useEffect, customHooks, etc).</li>
      </ul>

      <Counter />

      <CounterConCustomHooks />

      <ProductList />

      <ProductListConCustomHooks />
    </main>
  )
}

export default App