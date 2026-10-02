export const fetchProducts = async () => { // Retorna una promesa
  const response = await fetch('https://dummyjson.com/products')

  return await response.json()
}

export const getProduct = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  // const response = await fetch('https://dummyjson.com/products/' + id) // ❌ No es seguro

  return await response.json()
}