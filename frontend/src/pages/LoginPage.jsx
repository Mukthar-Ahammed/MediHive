import React from 'react'
import Sidecomp from '../components/sidecomp'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

function LoginPage() {

const [showPassword, setShowPassword] = useState(false)
  const [data, setFormData] = useState({
    email: '',
    password: '',
  })

/*const validateForm=()=>{

    if(!data.email.trim()) return toast.error("Invalid email")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return toast.error("Invalid email format");
    if(!data.password) return toast.error("Password is required")
    if(data.password.length<6) return toast.error("Password require minimum 6 charchter")

    return true

}*/
const{isLoggingIn,login}=useAuthStore()

const handleSubmit=(e)=>{
  e.preventDefault()
  login(data)
  
 // validateForm()
}


  return (
    <div className="flex h-screen bg-white font-mono">
    {/* Left side */}
    <div className='w-1/2 flex items-center justify-center mb-15'>
      <form  onSubmit={handleSubmit} className='fixed'>
        <input
            type="email"
            name="email"
            value={data.email}
            placeholder="you@example.com"
            className="w-full bg-white  border-teal-500 border-3  rounded-md placeholder-xs p-2 mb-4"
            onChange={(e) =>
              setFormData({ ...data, email: e.target.value })
            }
          />
                  {/* For password */}
        <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={data.password}
              placeholder="Password"
              className="w-70 bg-white border-teal-500 border-3  rounded-md placeholder-xs p-2 mb-4"
              onChange={(e) =>
                setFormData({ ...data, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/3 transform -translate-y-1/2 "
            >
              {showPassword ? ( <EyeOff className="h-6 w-6 text-gray-500" />) : (<Eye className="h-6 w-6 text-gray-500" />)}
            </button>
          </div>
          <button type='submit' className="btn text-black w-full p-2 font-bold bg-teal-500 rounded-md  mt-2" disabled={isLoggingIn}>
            {isLoggingIn ?(
              <>
              <Loader2 className="w-5 h-5 animate-spin ml-30" />
              </>
            ):(
              "Login"
            )}
            </button>
        </form>
        <div className=' mt-70 text-white flex  fixed' >
           <Link to="/signup" className="link link-primary text-teal-500 text-center font-bold">
              Sign up ?
            </Link>
        </div>

    </div>  
    {/* Right side */}
   <Sidecomp/>
  </div>
  )
}

export default LoginPage
