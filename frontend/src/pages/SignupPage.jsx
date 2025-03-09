import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidecomp from '../components/sidecomp.jsx'
import toast from 'react-hot-toast'

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const {signup, isSigningUp} = useAuthStore()

  const validateForm = () => {
    if(!data.username.trim()) return toast.error("Full name is required")
    if(!data.email.trim()) return toast.error("Invalid email")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return toast.error("Invalid email format");
    if(!data.password) return toast.error("Password is required")
    if(data.password.length<6) return toast.error("Password require minimum 6 charchter")

    return true
 }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success=validateForm()
    if(success==true) signup(data)
  }

  return (
    <div className="flex h-screen bg-white font-mono">
  
      {/* Left side */}
      <div className="w-1/2 p-4  flex flex-col items-center justify-center">
        <h1 className="text-5xl text-black font-bold pb-18">Get Started</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-xs ">
          {/* For username */}
          <input
            type="text"
            name="username"
            value={data.username}
            placeholder="Username"
            className="w-full bg-white  border-teal-500 border-3  rounded-md placeholder-xs p-2 mb-4"
            onChange={(e) =>
              setFormData({ ...data, username: e.target.value })
            }
          />
          {/* For email */}
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
              className="w-full bg-white  border-teal-500 border-3  rounded-md placeholder-xs p-2 mb-4"
              onChange={(e) =>
                setFormData({ ...data, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/3 transform -translate-y-1/2 "
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6 text-gray-500" />
              ) : (
                <Eye className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
          <button type='submit' className="btn text-black w-full p-2 font-bold bg-teal-500 rounded-md  mt-2" disabled={isSigningUp}>
            {isSigningUp ?(
              <>
              <Loader2 className="w-5 h-5 animate-spin ml-35" />
              </>
            ):(
              "Create Account"
            )}
            </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-base-content/60 text-black font-bold">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary text-teal-500 font-bold">
              Sign in
            </Link>

          </p>
        </div>
      </div>
      {/* Right side */}
     <Sidecomp/>
      
    </div>
  )
}

export default SignupPage
