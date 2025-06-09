import { useState } from "react"
import { Eighteen } from "./keys";
import { useNavigate } from "react-router-dom";

const Year=({S,E})=>{
  const navigate=useNavigate();
  const found=E.find((movie)=>movie.title.toLowerCase()===(S || "").toLowerCase())
  const handle=(movie)=>{
      navigate('/bahu',{state : movie})

  }
  
  return(
    <div className="yearimg">
      {found ? <img onClick={()=>handle(found)} src={found.image1} alt="" /> : "Search anything here"}
    </div>
  )
}
export default Year;
