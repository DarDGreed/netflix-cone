import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser"

const SignupPage = () => {
  const { searchParams } = new URL(document.location)
  const emailValue = searchParams.get("email")

  const [email, setEmail] = useState(emailValue)
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")

const {signup} = useAuthStore()

  const handleSignup = (e) => {
    e.preventDefault()
    signup({email,username,password})
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex flex-col justify-center items-center mt-20 mx-3">
        <div className="flex flex-col max-w-md w-full p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-white text-center text-2xl font-bold mb-4">Sign Up</h1>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
              <input className="w-full px-3 py-2 mt-1 border border-gray-700 text-white rounded bg-transparent focus:outline-none focus:ring" type="email" placeholder="you@example.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300 block">Username</label>
              <input className="w-full px-3 py-2 mt-1 border border-gray-700 text-white rounded bg-transparent focus:outline-none focus:ring" type="text" placeholder="johndoe" id="username" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
              <input className="w-full px-3 py-2 mt-1 border border-gray-700 text-white rounded bg-transparent focus:outline-none focus:ring" type="password" placeholder="******" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Signup
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already have and account? {" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
            Sign in
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SignupPage