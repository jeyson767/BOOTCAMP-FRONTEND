import { Link, Outlet } from "react-router"

const LayoutBase = () => {
  return (
    <>
      <header className="bg-yellow-300 p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="font-bold">React router</h1>  

          <nav className="flex gap-4 font-medium">
            <Link to='/'>Home</Link>
            <Link to='/prueba'>Prueba</Link>
            <Link to='/products'>Products</Link>
          </nav>
        </div>   
      </header>

      <main className="container mx-auto m-6">
        <Outlet />
      </main>
    </>
  )
}

export default LayoutBase