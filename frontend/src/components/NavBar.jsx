import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { House,User,LogOut } from 'lucide-react'

function NavBar() {
  const {authUser,logout}=useAuthStore()
  return (
    <div className='w-full h-12 text-white font-bold pt-3 flex   flex-row bg-white'>
    {/*Home Icon*/}
      <Link to={"/"}>
      <div className='ml-6 '><House color="#000000"/></div>
      </Link>
    {authUser && (
      <>
      <Link to={"/Profile"}>
        <div className='absolute right-9'>
        <User color="#000000" />                                     
        </div>
      </Link>
      <div className='absolute right-22 '>
        <LogOut color="#000000"  onClick={logout}/>
        </div>
   
      </>
    )}
  </div>
  )
}

export default NavBar
