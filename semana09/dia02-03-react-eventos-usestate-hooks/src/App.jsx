import Contador from "./components/Contador"
import MostrarTexto from "./components/MostrarTexto"

const App = () => {
  return (
    <section>
      <h1 className="text-2xl font-bold text-center">
        React + Eventos + useState(Hook)
      </h1>

      <MostrarTexto />
      
      <Contador />
    </section>
  )
}

export default App