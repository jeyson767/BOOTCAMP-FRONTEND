import { useEffect, useState } from "react"

import { fetchProducts } from "../services/products"

export const useProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data.products))
  }, [])

  return {
    products
  }
}