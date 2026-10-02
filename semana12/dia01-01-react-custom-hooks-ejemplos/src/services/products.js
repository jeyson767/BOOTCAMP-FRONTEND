export const fetchProducts = async () => { // Retorna una promesa
  const response = await fetch('https://dummyjson.com/products')

  return await response.json()
}