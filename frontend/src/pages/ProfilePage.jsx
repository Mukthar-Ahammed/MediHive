import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'



const  ProfilePage=()=> {

  const {authUser,isUpdatingProfile,UpdateProfile}=useAuthStore()
  const [selectedImage,setSelectedImage]=useState(null)

  const handleImageUpload=async(e)=>{

    const file=e.target.files[0];
    if (!file) return;
    const reader=new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async() =>{
      const base64Image=reader.result;
      setSelectedImage(base64Image)
      await UpdateProfile({profilepic:base64Image})
     
    }

  }
  return (
    <div className='h-screen bg-grey pl-10'> 
      <div className='w-max h-screen flex  items-center'>
        <div className='w-220 h-180 ml-89 flex flex-col items-center text-white'>
          <h1 className='font-bold text-6xl  text-teal-500 '>Profile</h1>
            <div className='relative'>
              <img
                src={selectedImage||authUser.profilepic || "/avatar.png"}
                alt="profile"
                className='size-32 rounded-full border-4 object-cover mt-13 border-white'
              />
              <label
              htmlFor='avatar-upload'
              className={`
                absolute bottom-0 right-0
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer
                transition-all duration-200
                ${isUpdatingProfile ?"animate-pulse pointer-events-none":""}
              `}
              >
              <Camera className='w-7 h-7  text-teal-500'/>
              <input
              type='file'
              id='avatar-upload'
              className='hidden'
              accept='image/*'
              disabled={isUpdatingProfile}
              onChange={handleImageUpload}  
              />
            </label>
            </div>
            <p className='text-sm text-green-500 mt-8  pl-3 font-semibold'>
                {isUpdatingProfile ? "Uploading...":""}
            </p>
        </div>
      <div className=' flex flex-col absolute top-113 left-173'>
        <div className='text-black  font-semibold'>
              Username 
              <div className='w-70 h-10 border-teal-500 border-2 rounded-3xl mt-3'>
                  <p className='pl-3 pt-1.5 font-semibold'>{authUser?.username}</p>
              </div>
        </div>
        <div className='text-black flex-col font-semibold mt-6'>
              Email 
              <div className='w-70 h-10 border-teal-500 border-2 rounded-3xl mt-3'>
                  <p className='pl-3 pt-1.5 font-semibold'>{authUser?.email}</p>
              </div>
        </div>
      </div>
      <div className=' flex flex-col absolute top-180 left-173 '>
        <h1  className='text-3xl text-teal-500 font-bold ml-6'>Account Status</h1>

        <p className='text-green-500  mt-6 font-semibold ml-26'>Active</p>

      </div>
      </div>
      
    </div>
  )
}

export default ProfilePage
