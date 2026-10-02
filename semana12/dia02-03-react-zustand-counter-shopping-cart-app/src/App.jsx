import { useEffect } from "react"
import Counter from "./components/Counter"

import ProductList from "./components/ProductList"
import ShoppingCart from "./components/ShoppingCart"
import { useState } from "react"

const App = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products')

    return await response.json()
  }

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data.products))
  }, [])

  return (
    <div className="flex flex-col gap-8 p-4">

      <section className="flex gap-2">

        <ProductList products={products} />

        <ShoppingCart />

        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

      </section>
      
      <section className="flex flex-col gap-4">
        <Counter />
        <Counter />
      </section>
    </div>
  )
}

export default App