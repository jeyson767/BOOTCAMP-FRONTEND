import './Card.css'

// Propiedad Children: Es el contenido hijo dentro del componente

const Card = ({ children }) => {
  return (
    <section
      className="card"
      style={{ backgroundColor: 'yellow', padding: '8px' }}
    >
      <h1 className='title'>Hola React!</h1>

      <p className='description'>
        {children ?? 'Ingresa un contenido en tu componente...'}
      </p>

      <button className='button'>
        OK
      </button>
    </section>
  )
}

const CardConTailwindCSS = () => {
  return (
    <section
      className="mt-4 bg-orange-500 w-[300px] p-4 flex flex-col gap-4 rounded-md"
    >
      <h1 className='text-xl font-bold mb-2 text-center'>
        Hola React!
      </h1>

      <p className='text-center'>
        Estoy aprendiendo estilos con React.js!
      </p>

      <button className='w-full bg-blue-500 p-2 rounded-md'>
        OK
      </button>
    </section>
  )
}

const App = () => {
  return (
    <section>
      <h1 className='text-2xl text-center text-amber-700 mb-8'>
        React + css + tailwindcss
      </h1>

      <Card>
        Estoy aprendiendo estilos con React.js (CHILDREN)!
      </Card>

      <Card />

      <CardConTailwindCSS />
    </section>
  )
}

export default App