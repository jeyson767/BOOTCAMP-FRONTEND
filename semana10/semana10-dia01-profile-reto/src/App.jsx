import Profile from "./components/Profile"

const App = () => {
  return (
    <div>
      
      <Profile nombre="Victor" role="Frontend" />
      <Profile nombre="Lili" role="UX/UI" />
      <Profile nombre="Angela" role="Backend" />
      <Profile nombre="Mariana" role="Fullstack" />

    </div>
  )
}

export default App