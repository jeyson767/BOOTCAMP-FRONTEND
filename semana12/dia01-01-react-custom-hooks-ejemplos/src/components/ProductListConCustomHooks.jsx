// TODO: Listar los productos(title, description, thumbnail) de la siguiente rest api: https://dummyjson.com/products. Usando un useState, useEffect.

import { useProducts } from "../hooks/useProducts"

const ProductListConCustomHooks = () => {
  const { products } = useProducts()

  return (
    <div className="bg-green-100 p-4">
      <h2 className="text-2xl text-center py-4">Product list (Custom hooks)</h2>

      <ul>
        {products.map(product => {
          return (
            <li>
              <h4 className="font-medium">{product.title}</h4>
              <p className="font-light">{product.description}</p>
              <img src={product.thumbnail} />
            </li>
          )
        })}
      </ul>

      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
    </div>
  )
}

export default ProductListConCustomHooks