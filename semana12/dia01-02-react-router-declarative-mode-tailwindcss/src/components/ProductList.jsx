// TODO: Listar los productos(title, description, thumbnail) de la siguiente rest api: https://dummyjson.com/products. Usando un useState, useEffect.

import { useEffect, useState } from "react"

import { Link } from "react-router"

const ProductList = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => { // Retorna una promesa
    const response = await fetch('https://dummyjson.com/products')

    return await response.json()
  }

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data.products))
  }, [])

  return (
    <div className="bg-amber-100 p-4">
      <h2 className="text-2xl text-center py-4">Product list</h2>

      <ul>
        {products.map(product => {
          return (
            <li>
              <h4 className="font-medium">{product.title}</h4>
              <p className="font-light">{product.description}</p>
              <Link to={`/products/${product.id}`}>Ver más</Link>
              <img src={product.thumbnail} />
            </li>
          )
        })}
      </ul>

      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
    </div>
  )
}

export default ProductList