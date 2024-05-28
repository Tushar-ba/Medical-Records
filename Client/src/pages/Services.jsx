import React from 'react'
import NavBar from '../components/NavBar'
import recordKeeper from "../../Public/recordKeeper.png"
import user from "../../Public/user-man.png"
import { Link } from 'react-router-dom'
import bg from '../../Public/bg.jpg'

const Services = () => {
  return (
    <div>
      <NavBar />
        <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col mt-[100px] w-[300px] justify-center items-center m-auto h-auto p-5 rounded-xl bg-[#F6F5F2] hover:zoom-out'>
        <Link to="/RecordKeeper" className='flex flex-col justify-center items-center'><img src={recordKeeper} alt="Record Keeper" className='max-w-[200px]'/><p className='mt-2 font-semibold bg-[#BEADFA] p-2 rounded-md'>Record Keeper</p></Link>
      </div>
      <div className='flex flex-col mt-[100px] w-[300px] justify-center items-center m-auto h-auto p-5 rounded-xl bg-[#F6F5F2]'>
        <Link to="/Patient" className='flex flex-col justify-center items-center'><img src={user} alt="Record Keeper" className='max-w-[200px]'/><p className='mt-2 font-semibold bg-[#BEADFA] p-2 rounded-md'>User</p></Link>
      </div>
    </div>

        </div>
      
  )
}

export default Services