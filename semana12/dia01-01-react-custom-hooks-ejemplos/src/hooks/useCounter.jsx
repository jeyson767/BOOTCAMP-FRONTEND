import { useState } from "react"

export const useCounter = () => {
  const [contador, setContador] = useState(99)
  
  const decrement = () => setContador(contador - 1)

  const increment = () => setContador(contador + 1)

  return {
    contador,
    decrement,
    increment
  }
}