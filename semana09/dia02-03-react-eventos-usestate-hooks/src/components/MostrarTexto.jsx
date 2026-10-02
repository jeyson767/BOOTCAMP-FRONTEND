import { useState } from "react"

const MostrarTexto = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        Mostrar / Ocultar
      </button>

      {visible && <p>Hola a todos 🤪</p>}
    </div>
  )
}

export default MostrarTexto