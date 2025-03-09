import React from 'react'
import { MessageSquare,Stethoscope,NotebookPen } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='w-max h-screen'>
     <div className='w-40 h-40 bg-teal-500 absolute rounded-full top-40 left-8'/>
     <div className='w-40 h-40 bg-teal-500 absolute rounded-full top-30 right-30 opacity-80'/>
     <div className='bg-black/10 backdrop-blur-lg w-screen h-90 cursor-pointer'>
        <div className='w-screen h-70 flex items-center justify-center flex-col'>
            <h1 className='text-7xl font-bold font-mono '>
              <span className='text-black'>Welcome to</span>
              <span className='text-teal-500 ml-10'>Medihive</span>
            </h1>
            <p className=' absolute top-60 font-mono font-semibold w-180 text-center'>A platform for medical students to <span className='text-green-500'>chat</span> , <span className='text-teal-500'>log rotations</span>, <span className='text-blue-500'>search medicines</span>, and use <span className='text-red-600 mr-2'>AI</span>for disease identification.</p>
        </div>
     </div>
     <div className='w-screen h-100 font-mono flex flex-row p-30 gap-35'>
      <div className='w-90 h-70  bg-black/6 backdrop-blur-lg shadow-lg hover:bg-black/10 transition duration-600 ease-in flex items-center justify-center'>
        <Link to={"/chat"}>
          <MessageSquare className='w-20 h-20 text-teal-500 '/>
        </Link>
       </div>
       <div className='w-90 h-70  bg-black/6 backdrop-blur-lg shadow-lg hover:bg-black/10 transition duration-600 ease-in flex items-center justify-center'>
        <Link to={"/analysis"}>
          <Stethoscope className='w-20 h-20 text-teal-500 '/>
        </Link>
       </div>
       <div className='w-90 h-70  bg-black/6 backdrop-blur-lg shadow-lg hover:bg-black/10 transition duration-600 ease-in flex items-center justify-center'>
        <Link to={"/log-rotation"}>
          <NotebookPen className='w-20 h-20 text-teal-500 '/>
        </Link>
       </div>
     </div>
    </div>
  )
}

export default HomePage
