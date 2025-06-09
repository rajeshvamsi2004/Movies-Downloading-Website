import React from 'react'
import './Cinema.css'
import { useNavigate } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
const Add = () => {
  const a=useNavigate();
  return (
    <div className='Add'>
      <button onClick={()=>a('/2015')}>Home</button>
      <IoHomeOutline size={10} style={{position: 'absolute', top: "5px", left: "1px"}}  />
      <button onClick={()=>a('/about')}>About</button>
      <FaUser size={10} style={{position: 'absolute', top: "5px", left: "65px"}} />
      <button onClick={()=>a('/Loginpage')}>LogOut</button>
      <IoIosLogOut size={10} style={{position: 'absolute', top: "5px", left: "130px"}} />
    </div>
  )
}

export default Add
