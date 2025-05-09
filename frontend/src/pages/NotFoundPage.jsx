import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white" style={{backgroundImage: `url('/404.png')`}}>
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to={"/"} >
          <img src="/netflix-logo.png" alt="netflix" className="h-8" />
        </Link>
      </header>
      <main className="text-center z-10"> 
        <h1 className="text-7xl font-semibold mb-4">Lost your way?</h1>
        <p className="mb-6 text-xl">
          Sorry, we can't find that page. You'll find lot's to explore in the home page.
        </p>
        <Link to={"/"} className="bg-white text-black py-2 px-4 rounded cursor-pointer z-200">
          Netflix Home
        </Link>
      </main>
    </div>
  )
}

export default NotFoundPage