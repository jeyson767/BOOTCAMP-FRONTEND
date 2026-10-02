import { useState } from 'react'

const App = () => {
  const [peso, setPeso] = useState(70)
  const [altura, setAltura] = useState(175)

  const handlePeso = (event) => {
    // console.log(event.target.value)
    setPeso(event.target.value)
  }

  // TODO: Actualicen la altura en la etiqueta del rango "Altura: 0 cm" usando el estado altura.

  const handleAltura = (event) => {
    setAltura(event.target.value)
  }

  const imc = peso / ((altura /100) ** 2)

  const imcDecimal = imc.toFixed(2)

  // TODO: Según el IMC mostrar los siguientes valores:
  // Menor a < 18.5 -> Bajo peso
  // Menor a 18.5 - 24.9 -> Peso saludable
  // Menor a 25.0 - 29.9 -> Sobrepeso
  // Menor a > 30.0 -> Obesidad

  const imcResultado = () => {
    if (imcDecimal < 18.5) return 'Bajo peso'
    if (imcDecimal < 25) return 'Peso saludable'
    if (imcDecimal < 30) return 'Sobrepeso'

    return 'Obesidad'
  }

  return (
    <section className="w-[400px] bg-slate-200 p-4 mt-8 mx-auto rounded-md">
      <h1 className="text-3xl text-sky-600 text-center font-bold">IMC APP</h1>

      <div className="pt-4">
        <h3 className="font-bold">Peso: {peso} kg</h3>
        <input
          type="range"
          min="50"
          max="200"
          className="w-full"
          onChange={handlePeso}
        />
      </div>

      <div className="pt-4">
        <h3 className="font-bold">Altura: {altura} cm</h3>
        <input
          type="range"
          min="50"
          max="200"
          className="w-full"
          onChange={handleAltura}
        />
      </div>

      <p className="font-bold mt-4">Tu IMC es {imcDecimal}</p>

      <p className="font-bold text-2xl">ESTADO de IMC: {imcResultado()}</p>

      <p>
        {/* Renderizado condicional ( NO es recomendable pero se puede usar, lo dejo como ejemplo) */}
        {imcDecimal < 18.5 && 'Bajo peso'}
        {imcDecimal >= 18.5 && imcDecimal < 25 && 'Peso saludable'}
        {imcDecimal >= 25 && imcDecimal < 30 && 'Sobrepeso'}
        {imcDecimal >= 30 && 'Obesidad'}
      </p>
    </section>
  )
}

export default App