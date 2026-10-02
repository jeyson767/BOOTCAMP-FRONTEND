import { useCartStore } from "../store/cart"

const ShoppingCart = () => {
  const { cart, clearCart, removeFromCart } = useCartStore()

  const total = cart.reduce((accumulator, product) => {
    const qty = product.quantity
    const price = product.price
    const subTotal = qty * price

    return accumulator + subTotal
  }, 0)

  return (
    <section className="w-56 p-2">
      <h3 className="text-2xl mb-2 text-center relative">
        Shopping Cart
        <div className="bg-red-600 text-white w-6 h-6 text-base rounded-full absolute right-0 top-0">
          {cart.length}
        </div>
      </h3>

      <div className="mb-2">
        <button
          className="bg-red-400 p-2 min-w-36 rounded-lg cursor-pointer text-white font-bold hover:bg-red-500 duration-300 w-full"
          onClick={clearCart}
        >
          Limpiar carrito
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {cart.map(product => {
          return (
            <li
              key={product.id}
              className="flex flex-col gap-2 font-bold bg-slate-200 p-2 rounded-lg shadow"
            >
              <span>{product.title}</span>
              <span>S/{product.price} (Qty: {product.quantity})</span>
              <button
                className="bg-red-400 p-2 rounded-lg cursor-pointer text-white font-bold hover:bg-red-500 duration-300"
                onClick={() => removeFromCart(product.id)}
              >
                ❌
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 pt-4 font-bold bg-amber-100 px-4 py-2 flex justify-between rounded-lg">
        <strong>TOTAL:</strong> <span>S/ {total.toFixed(2)}</span>
      </div>

      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}

    </section>
  )
}

export default ShoppingCart